// React
import React from 'react';
import { View, StyleSheet } from 'react-native';

// custom
import { Translate } from 'function';
import { ViewScale } from 'utils';

// components
import { Container } from 'components/common';
import { Tooltip, TextRegular, TextMedium } from 'components/atoms';

// lib
// import {DateTime} from 'luxon';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

// recoil
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import { userInfoState } from 'recoil-state';

import { COLORS, FONT_SIZE } from 'styles';

export default ({ data, updateBirthDay }) => {
  const userInfo = useRecoilValue(userInfoState);
  dayjs.extend(buddhistEra);
  dayjs.locale('th');

  const convertdate = (() => {
    if (!_.isEmpty(data?.birthday)) {
      const local = data?.birthday.split('/');
      return new Date(local[2] - 543, local[1] - 1, local[0]);
    } else {
      return null;
    }
  })();

  const [date, setDate] = React.useState(convertdate ?? new Date());
  const [selectedDate, setSelectedDate] = React.useState(
    convertdate !== null
      ? `${Translate('textBirthday')} ${dayjs(convertdate).format(
        'DD MMMM BBBB',
      )}`
      : Translate('textInputBirthDay'),
  );

  const onSelectedDate = date => {
    setDate(date);
    setSelectedDate(
      `${Translate('textBirthday')} ${dayjs(date).format('DD MMMM BBBB')}`,
    );
    updateBirthDay(dayjs(date).format('DD/MM/BBBB'));
  };

  React.useEffect(() => {
    setSelectedDate(
      convertdate !== null
        ? `${Translate('textBirthday')} ${dayjs(convertdate).format(
          'DD MMMM BBBB',
        )}`
        : Translate('textInputBirthDay'),
    );
  }, [data]);

  return (
    <Container style={{ flex: 0 }}>
      {/* มี 3 คอลัมน์ */}

      {userInfo?.fullname && (
        <TextMedium style={styles.Name}>{userInfo?.fullname}</TextMedium>
      )}
      {data?.fund_name && (
        <View style={styles.UnderNameContainer}>
          <TextMedium style={styles.UnderName}>{data?.fund_name}</TextMedium>
        </View>
      )}

      {/* {route.name !== 'MemberProfileDetail' && (
        <View style={styles.DatePickerContainer}>
          <DatePicker
            onSelected={onSelectedDate}
            maximumDate={new Date()}
            date={date}>
            <View style={styles.DatePickerContainerStyle}>
              <TextRegular style={styles.textDatePicker}>
                {selectedDate.toString()}
              </TextRegular>
              <MaterialIcons
                name="edit"
                style={styles.DatePickerIcon}
                size={FONT_SIZE.BODY_1}
              />
            </View>
          </DatePicker>
        </View>
      )} */}
      <View style={styles.headerline} />
      {/* name */}
      <View style={styles.dataProfileContainer}>
        <View>
          {data.info.length > 0 &&
            data.info.map((item, index) => (
              <View
                key={'NameProfileId' + index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: ViewScale(5),
                  flex: 1,
                }}>
                <TextMedium
                  style={[
                    styles.dataProfileText,
                    {
                      minWidth: ViewScale(90),
                    },
                  ]}>
                  {item[0]}
                </TextMedium>
                <TextMedium
                  color={COLORS.WHITE}
                  style={[
                    styles.dataProfileText,
                    { marginRight: ViewScale(10) },
                  ]}>
                  :
                </TextMedium>
                <TextMedium
                  color={COLORS.WHITE}
                  numberOfLines={1}
                  style={[
                    styles.dataProfileText,
                    { textAlign: 'right', flex: 1 },
                  ]}>
                  {_.isEmpty(item[1]) ? '-' : item[1]}
                </TextMedium>
              </View>
            ))}
        </View>
        {/* data */}
        <View style={styles.dataProfileRight}>
          {/* {renderData()} */}
          {/* <Tooltip
            tooltip={
              <View>
                <TextRegular style={{color: '#FFF'}} size={FONT_SIZE.BODY_3}>
                  {Translate('textTooltipProfileHeader')}
                </TextRegular>
              </View>
            }
            iconStyle={{color: '#FFF'}}
          /> */}
          <Tooltip
            iconStyle={{
              size: FONT_SIZE.BODY_2,
              color: '#FFF',
            }}
            tooltip={
              <View
                style={{
                  height: ViewScale(50),
                }}>
                <TextRegular
                  size={FONT_SIZE.BODY_2}
                  style={{ color: COLORS.WHITE }}>
                  {Translate('textTooltipProfileHeader')}
                </TextRegular>
              </View>
            }
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  DatePickerIcon: {
    color: '#FFF',
    marginLeft: ViewScale(5),
  },
  DatePickerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDatePicker: {
    color: '#FFF',
    fontSize: FONT_SIZE.BODY_2,
  },
  DatePickerContainer: {
    marginTop: ViewScale(10),
    alignSelf: 'flex-start',
  },
  Name: {
    color: '#FFF',
    fontSize: FONT_SIZE.TITLE_3,
  },
  UnderName: {
    color: '#FFF',
    fontSize: FONT_SIZE.BODY_2,
  },
  UnderNameContainer: {
    marginTop: ViewScale(10),
    backgroundColor: 'rgba(255,255,255, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: ViewScale(10),
  },
  headerline: {
    borderWidth: 0.5,
    borderColor: '#dadbdd',
    marginTop: ViewScale(15),
  },
  dataProfileLeft: {
    display: 'flex',
    flexDirection: 'column',
  },
  dataProfileMid: {
    display: 'flex',
    flexDirection: 'column',
  },
  dataProfileRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: ViewScale(8),
  },
  dataProfileText: {
    color: '#FFF',
    // marginTop: ViewScale(8),
    fontSize: FONT_SIZE.BODY_3,
  },
  dataProfileContainer: {
    marginTop: ViewScale(20),
  },
});
