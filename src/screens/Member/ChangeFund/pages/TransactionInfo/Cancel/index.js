import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import ServerErrorPage from 'screens/Global/ServerErrorPage';
import {getTransactionCancel} from 'services/api/member';
import {setSpinner} from 'utils';
import ListTrans from '../ListTrans';

export default function index({callback, isMounted}) {
  const navigation = useNavigation();
  const [apiData, setApiData] = React.useState([]);
  const [isServerError, setIsServerError] = React.useState(false);

  const callapi = async () => {
    await getTransactionCancel()
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          if (isMounted.current) {
            setApiData(response.data);
          }
          setIsServerError(false);
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  React.useEffect(() => {
    callback.current = callapi;
    callapi();
  }, []);

  const onPress = id => () => {
    navigation.navigate('TransactionInfoDetail', {id});
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  };

  return (
    <View style={{flex: 1}}>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {apiData.length > 0 &&
            apiData.map((item, index) => (
              <View key={'ListTransIdCancel-' + index}>
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
