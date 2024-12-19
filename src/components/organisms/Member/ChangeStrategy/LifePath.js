// React
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  InteractionManager,
  Keyboard,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {COLORS, FONT_SIZE} from 'styles';
// custom
import {Translate} from 'function';
import {ViewScale, setSpinner} from 'utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// recoil
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

// components
import {Container} from 'components/common';
import {FundBox} from 'components/organisms';
import {
  Button,
  TextLight,
  TextMedium,
  DatePicker,
  TextRegular,
} from 'components/atoms';
import {useForm} from 'react-hook-form';
import {sendInvestment} from 'services/api/member';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {MaterialIcons} from 'components/Icons';
import {
  AlertFailed,
  AlertLifePath04,
  AlertLifePath05,
  // AlertLifePathNoBirthday,
} from 'components/molecules';
import _ from 'lodash';

export default ({
  data,
  callbackBack,
  choice_no,
  birth,
  dataBirthday,
  updateBirthDay,
}) => {
  const navigation = useNavigation();
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const [popupInvestment, setpopupInvestment] = React.useState(false);

  const convertdate = (() => {
    if (!_.isEmpty(dataBirthday?.birthday)) {
      const local = dataBirthday?.birthday.split('/');
      return new Date(local[2] - 543, local[1] - 1, local[0]);
    } else {
      return null;
    }
  })();

  dayjs.extend(buddhistEra);
  dayjs.locale('th');
  const [date, setDate] = React.useState(convertdate ?? new Date());
  const [selectedDate, setSelectedDate] = React.useState(
    convertdate !== null
      ? `${Translate('textBirthday')} ${dayjs(convertdate).format(
          'DD MMMM BBBB',
        )}`
      : Translate('textInputBirthDay'),
  );

  const focused = useIsFocused();

  const {handleSubmit} = useForm({
    defaultValues: {
      ti_type_change: 'change_investment',
      ti_rebalance: 4,
    },
  });

  const onSelectedDate = dataBirthday => {
    setDate(dataBirthday);
    setSelectedDate(
      `${Translate('textBirthday')} ${dayjs(dataBirthday).format(
        'DD MMMM BBBB',
      )}`,
    );
    updateBirthDay(dayjs(dataBirthday).format('DD/MM/BBBB'));
  };

  const handleOnPressLifePath04 = () => {
    navigation.navigate('Profile');
  };

  const AlertLifePathNoBirthday = ({onPress}) => (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TextMedium
        color={COLORS.THIRDARY}
        style={{
          textAlign: 'center',
        }}>
        {
          'ท่านยังไม่ได้ระบุ วัน/เดือน/ปี พ.ศ. เกิดของท่าน \nกรุณาระบุ วัน/เดือน/ปี พ.ศ. เกิดของท่าน'
        }
      </TextMedium>
      <TouchableOpacity onPress={onPress} style={{justifyContent: 'center'}}>
        <View style={styles.touchViewAlertLifePathNoBirthday}>
          <DatePicker
            onSelected={onSelectedDate}
            maximumDate={new Date()}
            date={date}>
            <View style={styles.viewTextAlertLifeParhBirthday}>
              <TextRegular style={{color: '#848484', fontSize: FONT_SIZE.BODY_2}}>
                {/* {selectedDate.toString()} */}
                {'ระบุวันเกิด xx/xx/xxxx'}
              </TextRegular>
            </View>
          </DatePicker>
        </View>
      </TouchableOpacity>
    </View>
  );

  const sendapi = handleSubmit(
    async data => {
      await sendInvestment({...data, choice_no})
        .then(response => {
          if (response.code == '02') {
            navigation.navigate('SuccessPage', {
              data: response.data,
              choice_name: response.choice_name,
              date: response.date,
            });
          } else if (response.code == '04') {
            navigation.navigate('Alert1', {
              children: (
                <AlertLifePath04
                  message={response.message}
                  onPress={handleOnPressLifePath04}
                />
              ),
              title: Translate('textConfirm2'),
            });
          } else if (response.code == '05') {
            navigation.navigate('Alert1', {
              children: <AlertLifePath05 message={response.message} />,
              title: Translate('textConfirm2'),
            });
          } else {
            navigation.navigate('Alert1', {
              children: AlertFailed(response.message),
              title: Translate('textConfirm2'),
            });
          }
        })
        .catch(error => console.log(error));
    },
    error => {
      console.log(error);
    },
  );

  const _Confirm = handleSubmit(
    data => {
      navigation.navigate('LifePathTerms', {
        goToScreen: 'CheckPassword',
        screenProps: {
          setPasswordMatch,
          goToScreen: 'ChangeStrategy',
        },
      });
    },
    error => {
      console.log(error);
    },
  );

  const total = () => {
    return data.reduce((acc, cur) => acc + parseFloat(cur.percent), 0);
  };

  React.useEffect(() => {
    if (passwordMatch === true && focused) {
      InteractionManager.runAfterInteractions(() => {
        sendapi().finally(() => {
          setSpinner(false);
          setPasswordMatch(false);
        });
      });
    }
  }, [passwordMatch, focused]);

  React.useEffect(() => {
    if (_.isEmpty(birth)) {
      navigation.navigate('Alert1', {
        children: <AlertLifePathNoBirthday onPress={handleOnPressLifePath04} />,
        title: Translate('textConfirm2'),
      });
    }
  }, []);

  return (
    <View>
      {data?.map((item, index) => (
        <FundBox
          key={'fundbox-lifepath-' + String(index)}
          RName={item.sub_code}
          name={item.sub_name}
          ratio={item.percent}
        />
      ))}
      <Container style={{flex: 0}}>
        <View style={[styles.sumContainer, {marginTop: ViewScale(0)}]}>
          <TextMedium>{'รวม'}</TextMedium>
          <View style={styles.row}>
            <TextLight style={{marginTop: ViewScale(10)}}>
              {'สัดส่วนการลงทุนที่เลือก'}
            </TextLight>
            <TextMedium>{`${total()}%`}</TextMedium>
          </View>
        </View>

        {/* Botton */}
        <View style={styles.containerFooter}>
          <Button
            title="ย้อนกลับ"
            type="border"
            style={styles.ButtonLeft}
            onPress={callbackBack}
          />
          <Button
            title="ยืนยันการทำรายการ"
            type="fill"
            disabled={_.isEmpty(birth)}
            style={styles.ButtonRight}
            onPress={() => setpopupInvestment(true)}
            // onPress={_Confirm}
          />
        </View>

        {popupInvestment === true && (
          <Overlay
            onBackdropPress={() => {
              Keyboard.dismiss();
            }}
            backdropStyle={styles.borderStyleOver}
            overlayStyle={styles.overlayStyleBox}>
            <View style={styles.viewOverlay}>
              <View style={styles.viewtextOverlay}>
                <TextMedium style={styles.textmagin5}>{birth}</TextMedium>
                <TextMedium
                  style={
                    styles.textmagin5
                  }>{`ท่านจะอยู่ในทางเลือก LIFE PATH (${choice_no})`}</TextMedium>
                <TextMedium style={[styles.textmagin5, styles.colorB3b5c4]}>
                  {'หากข้อมูลไม่ถูกต้องกรุณากด ไม่ยอมรับ'}
                </TextMedium>
              </View>
              <Button
                title="ยืนยัน"
                type="fill"
                disabled={_.isEmpty(birth)}
                style={styles.ButtonPopup}
                onPress={() => {
                  _Confirm(), setpopupInvestment(false);
                }}
              />
              <View style={styles.viewTouchCancel}>
                <TouchableOpacity onPress={() => setpopupInvestment(false)}>
                  <TextMedium style={styles.colorB3b5c4}>
                    {'ไม่ยอมรับ'}
                  </TextMedium>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  dayResult: {
    marginTop: ViewScale(10),
    backgroundColor: '#eef2f6',
    padding: ViewScale(15),
  },
  changeMethodContainer: {
    marginTop: ViewScale(20),
  },
  sumContainer: {
    backgroundColor: '#eef2f6',
    padding: ViewScale(20),
    marginTop: ViewScale(10),
  },
  containerFooter: {
    marginTop: ViewScale(35),
    marginBottom: ViewScale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ButtonLeft: {
    width: '48%',
  },
  ButtonRight: {
    width: '48%',
  },

  borderStyleOver: {
    backgroundColor: 'blue',
    opacity: 0.2,
  },
  overlayStyleBox: {
    padding: ViewScale(0),
    borderRadius: ViewScale(0),
    width: wp(90),
    justifyContent: 'center',
  },
  viewOverlay: {alignItems: 'center', justifyContent: 'center', height: '30%'},
  viewtextOverlay: {
    alignItems: 'center',
    margin: ViewScale(20),
  },
  textmagin5: {
    margin: ViewScale(5),
  },
  textmaginAndcolor: {
    margin: ViewScale(5),
    color: '#b3b5c4',
  },
  ButtonPopup: {
    width: '90%',
    marginTop: ViewScale(20),
  },
  viewTouchCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ViewScale(50),
    width: '90%',
  },
  colorB3b5c4: {color: '#b3b5c4'},
  touchViewAlertLifePathNoBirthday: {
    marginTop: ViewScale(20),
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    width: ViewScale(250),
    height: ViewScale(35),
  },
  viewTextAlertLifeParhBirthday: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
