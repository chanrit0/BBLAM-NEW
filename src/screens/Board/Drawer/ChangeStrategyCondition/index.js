import {useNavigation} from '@react-navigation/native';
import {TextMedium} from 'components/atoms';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {Translate} from 'function';
import React from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {getChangeStratgyCondition} from 'services/api/committee';
import {FONT_SIZE} from 'styles';
import {setSpinner} from 'utils';
import {ViewScale} from 'utils';

export default function ChangeStrategyCondition() {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);

  const callapi = async () => {
    await getChangeStratgyCondition({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
    })
      .then(response => {
        const message = response.data.message.replace(/ /, '$&\n');

        navigation.goBack();
        navigation.navigate('Alert1', {
          children: <Alert data={message} />,
          title: Translate('textConfirm2'),
        });
      })
      .catch(error => {
        console.log(error);
        navigation.goBack();
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  return (
    <HomeHeaderOnly
      title={'เงื่อนไขการเปลี่ยนแปลงนโยบาย / ทางเลือกการลงทุน'}
      isBackIcon
    />
  );
}

const Alert = ({data}) => {
  // เงื่อนไขการเปลี่ยนแปลงนโยบาย / ทางเลือกการลงทุน

  return (
    <View
      style={{
        paddingVertical: ViewScale(10),
      }}>
      <TextMedium style={{textAlign: 'center', fontSize: FONT_SIZE.BODY_2}}>
        {data}
      </TextMedium>
    </View>
  );
};
