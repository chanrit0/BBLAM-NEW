import React from 'react';
import { View, Text, InteractionManager } from 'react-native';
import ListTrans from '../ListTrans';
import { useNavigation } from '@react-navigation/core';
import { Translate } from 'function';
import { setSpinner, ViewScale } from 'utils';
import { Container } from 'components/common';
import { TextRegular } from 'components/atoms';
import { COLORS, FONT_SIZE } from 'styles';
import {
  getTransactionCount,
  getTransactionPending,
  sendCancelTransaction,
} from 'services/api/member';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function index({ callback, isMounted }) {
  const navigation = useNavigation();
  const [apiData, setApiData] = React.useState([]);
  const [transaction_count, setTransaction_count] = React.useState(null);
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const idManage = React.useRef('');

  const callapi = async () => {
    const api1 = new Promise((resolve, reject) => {
      getTransactionPending()
        .then(response => {
          if (response.status == 'success' || response.code == '02') {
            if (isMounted.current) {
              setApiData(response.data);
            }
            resolve();
          }
        })
        .catch(error => {
          reject();
          console.log(error);
        });
    });

    const api2 = new Promise((resolve, reject) => {
      getTransactionCount()
        .then(response => {
          if (response.status == 'success' || response.code == '02') {
            if (isMounted.current) {
              setTransaction_count(response.data);
            }
            resolve();
          }
        })
        .catch(error => {
          reject();
          console.log(error);
        });
    });

    return new Promise.all([api1, api2]);
  };

  const cancelapi = id => {
    return new Promise((resolve, reject) => {
      sendCancelTransaction(id)
        .then(response => resolve(response))
        .catch(error => console.log(error));
    });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi()
      .then(() => {
        setIsServerError(false);
      })
      .catch(() => setIsServerError(true))
      .finally(() => {
        setSpinner(false);
      });
  }, []);

  React.useEffect(() => {
    if (passwordMatch) {
      InteractionManager.runAfterInteractions(() => {
        setSpinner(true);
        cancelapi(idManage.current)
          .then(() => {
            setApiData([]);
            callapi();
          })
          .then(() => callback.current())
          .finally(() => {
            setPasswordMatch(false);
            setSpinner(false);
          });
      });
    }
  }, [passwordMatch]);

  const onPress = id => () => {
    navigation.navigate('TransactionInfoDetail', { id });
  };

  const onCancel = id => () => {
    idManage.current = id;
    navigation.navigate('CheckPassword', { setPasswordMatch });
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi()
      .then(() => {
        setIsServerError(false);
      })
      .catch(() => setIsServerError(true))
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {transaction_count !== null && (
            <View
              style={{
                backgroundColor: '#f6f7fa',
                paddingVertical: ViewScale(10),
              }}>
              <Container style={{ alignItems: 'center' }}>
                <TextRegular
                  size={FONT_SIZE.BODY_2}
                  style={{ textAlign: 'center' }}>
                  {Translate('textTransactionCompleteHeader')}
                  <TextRegular size={FONT_SIZE.BODY_2}>
                    {' '}
                    {Translate('textAmount')}{' '}
                    <TextRegular size={FONT_SIZE.BODY_2} color={COLORS.PRIMARY}>
                      {transaction_count?.sw}/{transaction_count?.max_sw}
                    </TextRegular>{' '}
                    {Translate('textTimes')}
                  </TextRegular>
                </TextRegular>
              </Container>
            </View>
          )}
          {apiData.map((item, index) => (
            <View key={'ListTransIdPending-' + index}>
              <ListTrans
                callbackCancel={onCancel(item.id)}
                callbackChevron={onPress(item.id)}
                policy_investment_name={item.choice_name}
                transaction_date={item.created_at}
                hasCancelBtn
                send_date={item.send_date}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
}
