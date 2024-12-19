import React from 'react';
import {View} from 'react-native';
import {TextRegular} from 'components/atoms';
import {Container} from 'components/common';
import {Translate} from 'function';
import {setSpinner, ViewScale} from 'utils';
import ListTrans from '../ListTrans';
import {COLORS, FONT_SIZE} from 'styles';
import {getTransactionComplete, getTransactionCount} from 'services/api/member';
import {useNavigation} from '@react-navigation/native';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function index({isMounted}) {
  const [apiData, setApiData] = React.useState([]);
  const [transaction_count, setTransaction_count] = React.useState(null);
  const [isServerError, setIsServerError] = React.useState(false);
  const navigation = useNavigation();

  const callapi = async () => {
    const api1 = new Promise((resolve, reject) => {
      getTransactionComplete()
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

  React.useEffect(() => {
    callapi();
  }, []);

  const onPress = id => () => {
    navigation.navigate('TransactionInfoDetail', {id});
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
    <View style={{flex: 1}}>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {/* header */}
          {transaction_count !== null && (
            <View
              style={{
                backgroundColor: '#f6f7fa',
                paddingVertical: ViewScale(10),
              }}>
              <Container style={{alignItems: 'center'}}>
                <TextRegular
                  size={FONT_SIZE.BODY_2}
                  style={{textAlign: 'center'}}>
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
            <View key={'ListTransIdComplete-' + index}>
              <ListTrans
                callbackChevron={onPress(item.id)}
                policy_investment_name={item.choice_name}
                transaction_date={item.created_at}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
}
