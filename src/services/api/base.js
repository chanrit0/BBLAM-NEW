import axios from 'axios';
import { promiseGetRecoil } from 'recoil-outside';
import {
  RetrieveSecureData,
  SessionExpired,
  setSpinner,
  StoreSecureData,
} from 'utils';
import { userDeviceStatusState } from 'recoil-state';
import { HOST_URL } from 'config';
import { API_VERSION } from 'config';

const HTTP_ERROR_CODE_ALLOW = [400, 428, 422, 429];

const bblam = axios.create({
  baseURL: `${HOST_URL}${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refresh = axios.create({
  baseURL: `${HOST_URL}${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

bblam.interceptors.request.use(
  async config => {
    const token = await RetrieveSecureData('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    console.log('call : ', config.url);

    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

bblam.interceptors.response.use(
  async response => {
    // console.log('response',response.data);
    
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const DeviceStatus = await promiseGetRecoil(userDeviceStatusState);

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      DeviceStatus.isSignIn
    ) {
      console.log('BBLAM: Token has been expired');
      console.log({
        errorUrl: `${originalRequest.baseURL}${originalRequest.url}`,
        sendingParams: error.config.params,
        receiveParams: error.response.params,
        sendingData: error.config.data,
        receiveData: error.response.data,
        status: error.response.status,
      });

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(access_token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
            return bblam(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      originalRequest._retry = true;

      const access_token = await refreshAccessToken();
      bblam.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return bblam(originalRequest);
    } else if (error.response.status >= 500) {
      console.log({
        errorUrl: `${originalRequest.baseURL}${originalRequest.url}`,
        sendingParams: error.config.params,
        receiveParams: error.response.params,
        sendingData: error.config.data,
        receiveData: error.response.data,
        status: error.response.status,
      });
      // showSmallAlert(Translate('textSomethingWentWrong'));
    } else if (HTTP_ERROR_CODE_ALLOW.includes(error.response.status)) {
      return Promise.reject(error.response.data);
    }
    setSpinner(false);
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  const token = await RetrieveSecureData('token');
  console.log('BBLAM: request new refresh_token...');
  try {
    if (token) {
      return refresh
        .post(
          '/refresh_token',
          JSON.stringify({
            refresh_token: token.refresh_token,
          }),
        )
        .then(response => {
          const access_token = response?.data?.access_token;
          const refresh_token = response?.data?.refresh_token;

          StoreSecureData({
            key: 'token',
            value: JSON.stringify({ access_token, refresh_token }),
          });
          processQueue(null, access_token);
          return access_token;
        })
        .catch(error => {
          console.log({ errorRefresh: error.response.data });
          SessionExpired();
          processQueue(error, null);
        })
        .finally(() => (isRefreshing = false));
    }
  } catch (error) {
    console.log(error);
  }
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export default bblam;
