import {setSpinner, showSmallAlert} from 'utils';
import bblam from './base';

export const getHome = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/financial/${data.em_code}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getHome',
      });
    }
  });
};

export const getPayOffandMovement = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/financial/payoffandmovement/${data}`)
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getPayOff',
      });
    }
  });
};

export const getCustomerRiskProfile = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/customerriskprofile/${data}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getCustomerRiskProfile',
      });
    }
  });
};

export const getRiskQuestion = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/risk_question`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getRiskQuestion',
      });
    }
  });
};

export const getContribution = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/contribution/${data}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getContribution',
      });
    }
  });
};

export const getProfile = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/financial/${data}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getProfile',
      });
    }
  });
};

export const sendRiskProfile = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post('/customerriskprofile', JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        })
        .finally(() => setSpinner(false));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendRiskProfile',
      });
    }
  });
};

export const callQuestionChangeFund = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get('/agreement/t1')
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        })
        .finally(() => setSpinner(false));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#callQuestionChangeFund',
      });
    }
  });
};

export const getAutoBalance = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/show`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getAutoBalance',
      });
    }
  });
};

export const getNews = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/news`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getNews',
      });
    }
  });
};

export const getDownloadDocs = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/doucument/download`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getDownloadDocs',
      });
    }
  });
};

export const getAutoBalanceChange = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/change/auto`)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getAutoBalanceChange',
      });
    }
  });
};

export const CheckPassword = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/investment/change/confirm`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#CheckPassword',
      });
    }
  });
};

export const sendAutoBalanceChange = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/investment/insert/auto`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendAutoBalanceChange',
      });
    }
  });
};

export const getChangeFund = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/list`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendAutoBalanceChange',
      });
    }
  });
};

export const sendBirthDay = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      setSpinner(true);
      await bblam
        .post(`/member/change/birth`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        })
        .finally(() => setSpinner(false));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendAutoBalanceChange',
      });
    }
  });
};

export const sendInvestment = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      setSpinner(true);
      await bblam
        .post(`/member/investment/insert/form`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        })
        .finally(() => setSpinner(false));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendInvestment',
      });
    }
  });
};

export const getNAVReport = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/nav/list`)
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendInvestment',
      });
    }
  });
};

export const getNAVGraphMember = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/nav/graph`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getNAVGraph',
      });
    }
  });
};

export const getTransactionPending = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/step1`)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getTransactionInfo',
      });
    }
  });
};

export const getTransactionComplete = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/step2`)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getTransactigetTransactionCompleteonInfo',
      });
    }
  });
};

export const getTransactionCancel = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/step3`)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getTransactionCancel',
      });
    }
  });
};

export const getTransactionCount = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/count/switching`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getTransactionCount',
      });
    }
  });
};

export const getTransactionDetail = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/detail/${data}`)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getTransactionDetail',
      });
    }
  });
};

export const sendCancelTransaction = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/cancel/${data}`)
        .then(response => resolve(response.data))
        .catch(async error => {
          showSmallAlert('มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง');
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendCancelTransaction',
      });
    }
  });
};

export const getFAQ = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/faq`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getFAQ',
      });
    }
  });
};

export const getDeposit = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/deposit/data`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getDeposit',
      });
    }
  });
};

export const sendDeposit = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/deposit/add`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendDeposit',
      });
    }
  });
};

export const checkCustomerRiskProfile = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/checkriskverify`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#checkCustomerRiskProfile',
      });
    }
  });
};

export const checkChangeFund = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/investment/check/company`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#checkChangeFund',
      });
    }
  });
};

export const getRetirePlan1 = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/retire/get/data`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getRetirePlan1',
      });
    }
  });
};

export const sendRetirePlan1 = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/retire/calculate/step1`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendRetirePlan1',
      });
    }
  });
};

export const getRetirePlan2 = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/retire/get/assumption`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getRetirePlan2',
      });
    }
  });
};

export const sendRetirePlan2 = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/retire/calculate/step2`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendRetirePlan2',
      });
    }
  });
};

export const getRetirePlan3 = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/retire/get/asset`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getRetirePlan3',
      });
    }
  });
};

export const sendRetirePlan3 = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/retire/calculate/step3`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendRetirePlan3',
      });
    }
  });
};

export const getDepositHistory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/deposit/history`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#getDepositHistory',
      });
    }
  });
};
export const sendCancelDeposit = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/member/deposit/cancel`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/member/#sendCancelDeposit',
      });
    }
  });
};
