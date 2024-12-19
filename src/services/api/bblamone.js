import bblam from './base';

export const getCategoriesNews = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/news/category`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/bblamone/#getCategoriesNews',
      });
    }
  });
};

export const getNews = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/news/data`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/bblamone/#getCategoriesNews',
      });
    }
  });
};

export const getBanners = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/sildepicture`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/bblamone/#getCategoriesNews',
      });
    }
  });
};
