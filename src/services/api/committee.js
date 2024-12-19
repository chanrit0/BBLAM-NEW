import {FileManager, setSpinner} from 'utils';
import bblam from './base';

export const sendChangeCommittee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type1`, data, {
          headers: {
            'Content-Type': `multipart/form-data`,
          },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeCommittee',
      });
    }
  });
};

export const sendChangeEmailCommittee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type8`, JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeEmailCommittee',
      });
    }
  });
};

export const sendChangeQuantityCommittee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type2`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeQuantityCommittee',
      });
    }
  });
};

export const sendChangeNameCommittee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type3`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeNameCommittee',
      });
    }
  });
};

export const sendChangeSignCommitee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type4`, JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeSignCommitee',
      });
    }
  });
};

export const sendChangeConditionCommittee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type5`, JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeConditionCommittee',
      });
    }
  });
};

export const sendChangeCoordinator = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type6`, JSON.stringify(data))
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeCoordinator',
      });
    }
  });
};

export const getCompanyList = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/dashboard/list/company`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getCompanyList',
      });
    }
  });
};

export const getAllCompany = data => {
  return new Promise(async (resolve, reject) => {
    try {
      setSpinner(true);
      await bblam
        .get(`/committee/dashboard/all/com`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        })
        .finally(() => setSpinner(false));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getAllCompany',
      });
    }
  });
};

export const getAlLFund = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/dashboard/all/fund`, {
          params: data,
        })
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getAlLFund',
      });
    }
  });
};

export const getFundList = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/dashboard/list/fund`, {
          params: data,
        })
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getFundList',
      });
    }
  });
};

export const getDashboard = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/dashboard`, {
          params: data,
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getDashboard',
      });
    }
  });
};

export const sendChangeCompanyName = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type7`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeCompanyName',
      });
    }
  });
};

export const sendChangeCompanyAddress = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type7`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeCompanyAddress',
      });
    }
  });
};

export const sendChangeCompanyAddressDocument = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/insert/change/type7`, data, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendChangeCompanyAddressDocument',
      });
    }
  });
};

export const getEvaluatedInfo = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/com_risk/tab1`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getEvaluationInfo',
      });
    }
  });
};

export const getNotEvaluatedInfo = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/com_risk/tab2`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getNotEvaluationInfo',
      });
    }
  });
};

export const getNAVReport = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/nav/list`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getNAVReport',
      });
    }
  });
};

export const getNAVGraph = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/nav/graph`, {params: data})
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

export const getDetailMemberList = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/member/finan/list`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getDetailMemberList',
      });
    }
  });
};

export const getCompanyInfo = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/company/all`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getCompanyInfo',
      });
    }
  });
};

export const getDetailMember = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/member/finan/information`, {params: data})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getDetailMember',
      });
    }
  });
};

export const getResignMember = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/resign`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getResignMember',
      });
    }
  });
};

export const getResignMember_M = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/member/resign`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getResignMember',
      });
    }
  });
};

export const getPVDReport11 = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/yearlist/v1`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReport11',
      });
    }
  });
};

export const getPVDReport11Data = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/report1`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReport11Data',
      });
    }
  });
};

export const getPVDReport12 = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/yearlist/v2`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReport12',
      });
    }
  });
};

export const getPVDReport12Data = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/report2`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReport12Data',
      });
    }
  });
};

export const getPVDReport13 = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/yearlist/v3`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReport13',
      });
    }
  });
};

export const getPVDReport13Data = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/report3`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReport13Data',
      });
    }
  });
};

export const getPVDReportBond = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/yearlist/v4`)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReportBond',
      });
    }
  });
};

export const getPVDReportBondData = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/document/report4`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPVDReportBondData',
      });
    }
  });
};

export const getPlanInvestment = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/investment/detail`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getPlanInvestment',
      });
    }
  });
};

export const getCountDeposit = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/deposit/checksidebar`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getCountDeposit',
      });
    }
  });
};

export const getWaitingConfirm = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/deposit/list`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getWaitingConfirm',
      });
    }
  });
};

export const getWatingApprove = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/deposit/list/waitap`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getWatingApprove',
      });
    }
  });
};

export const getApprove = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/deposit/list/approved`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getApprove',
      });
    }
  });
};

export const getDepositExcelDownload = data => {
  FileManager({
    path: `/committee/deposit/download/mobile?com_code=${data.com_code}&fund_code=${data.fund_code}`,
    title: data.title,
    filetype: data.filetype,
  });
};

export const sendCancelWaitingConfirm = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/member/cancel`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendCancelWaitingConfirm',
      });
    }
  });
};

export const sendApproveWaitingConfirm = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/member/approve`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendApproveWaitingConfirm',
      });
    }
  });
};

export const sendApproveWaitingConfirmAll = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/member/approve/all`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendApproveWaitingConfirmAll',
      });
    }
  });
};

export const sendDeposit1 = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/add`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendDeposit',
      });
    }
  });
};

export const sendDeposit2 = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/add2`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendDeposit2',
      });
    }
  });
};
export const sendDeposit3 = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/add3`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#sendDeposit3',
      });
    }
  });
};

export const getCheckDepositAccess = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/deposit/checkaccess`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#checkDepositAccess',
      });
    }
  });
};

export const getCheckDepositCheckSetting = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/deposit/setting`, {params: data})
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getCheckDepositCheckSetting',
      });
    }
  });
};

export const ChangeStatusSwitch = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .post(`/committee/deposit/changestatus`, data)
        .then(response => resolve(response.data))
        .catch(async error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#ChangeStatusSwitch',
      });
    }
  });
};

export const getChangeStratgyCondition = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/com/maxswitch`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getChangeStratgyCondition',
      });
    }
  });
};

export const getDownloadDocsCommittee = data => {
  return new Promise(async (resolve, reject) => {
    try {
      await bblam
        .get(`/committee/doucument/download`, {params: data})
        .then(response => resolve(response.data))
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      console.log({
        trycatch: error,
        path: '/services/api/committee/#getDownloadDocsCommittee',
      });
    }
  });
};
