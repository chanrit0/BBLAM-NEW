import {TextMedium, TextRegular} from 'components/atoms';
import {Container, RootScroll} from 'components/common';
import dayjs from 'dayjs';
import {Translate} from 'function';
import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {getCheckDepositCheckSetting} from 'services/api/committee';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {isTablet, setSpinner, ViewScale} from 'utils';
import styles from './Style';

const ITEMS = ['อายุการทำงาน', 'อายุการเป็นสมาชิก', 'ตำแหน่งงาน', 'อื่นๆ'];

const ChangeAccumulateHistory = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [apiData, setApiData] = React.useState(null);

  const MonthArray = React.useMemo(() =>
    Array(12)
      .fill(0)
      .map((item, index) => [dayjs(new Date(99, index)).format('MMMM')], []),
  );

  const callSettingLasted = async () => {
    await getCheckDepositCheckSetting({
      com_code: userInfo.com_code,
      fund_code: userInfo.fund_code,
    })
      .then(response => {
        const data = response.data;
        console.log(JSON.stringify(data, undefined, 2));
        setApiData(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    setSpinner(true);
    callSettingLasted().finally(() => setSpinner(false));
  }, []);

  const renderContent = () => {
    if (apiData.type == 1) {
      return <Type1Setting data={apiData} />;
    } else if (apiData.type == 2) {
      return <Type2Setting data={apiData} />;
    } else {
      return <Type3Setting data={apiData} />;
    }
  };

  const renderMaxChangeRate = () => {
    return (
      <>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: COLORS.BORDER,
            paddingBottom: ViewScale(20),
            marginTop: ViewScale(20),
          }}>
          <Container>
            <TextMedium style={styles.title}>
              เงื่อนไขการแจ้งเปลี่ยนแปลงอัตราการจ่ายเงินสะสม
            </TextMedium>
            <View style={{marginTop: ViewScale(10)}}>
              <TextRegular
                style={[styles.text, {marginVertical: ViewScale(10)}]}>
                เปลี่ยนแปลงอัตราการจ่ายเงินสะสมได้ปีละ
                <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_3}>
                  {'   '}
                  {_.isEmpty(apiData?.max_change_rate?.value)
                    ? '-'
                    : apiData?.max_change_rate?.value}
                  {'   '}
                </TextMedium>
                ครั้ง
              </TextRegular>
            </View>
          </Container>
        </View>

        {apiData?.max_change_rate?.rule.map((item, index) => (
          <View
            style={{
              borderTopWidth: 1,
              borderColor: COLORS.BORDER,
              marginBottom: ViewScale(30),
            }}
            key={'maxChangeRateId' + index}>
            <Container>
              <TextMedium style={styles.title}>
                โดยมีความประสงค์ดังนี้
              </TextMedium>
              <TextMedium style={styles.title}>ครั้งที่ {index + 1}</TextMedium>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextRegular style={styles.text}>ตั้งแต่วันที่</TextRegular>
                <View style={[styles.input, {marginHorizontal: ViewScale(10)}]}>
                  <TextRegular style={styles.text}>
                    {item?.day_start}
                  </TextRegular>
                </View>
                <TextRegular style={styles.text}>ถึงวันที่</TextRegular>
                <View style={[styles.input, {marginHorizontal: ViewScale(10)}]}>
                  <TextRegular style={styles.text}>{item?.day_end}</TextRegular>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: ViewScale(20),
                }}>
                <View style={[styles.input, {marginRight: ViewScale(10)}]}>
                  <TextRegular style={styles.text}>
                    {MonthArray[item?.month_com - 1]}
                  </TextRegular>
                </View>
                <TextRegular style={styles.text}>ของทุกปี</TextRegular>
              </View>
              <TextRegular style={[styles.text, {marginTop: ViewScale(10)}]}>
                โดยที่อัตราเงินสะสมใหม่จะเริ่มมีผลใช้บังคับตั้งแต่รอบการจ่ายค่าจ้างประจำเดือน
              </TextRegular>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: ViewScale(20),
                }}>
                <View style={[styles.input, {marginRight: ViewScale(10)}]}>
                  <TextRegular style={styles.text}>
                    {MonthArray[item?.month_change - 1]}
                  </TextRegular>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    flex: 0.25,
                    paddingHorizontal: ViewScale(20),
                    height: SPACING.INPUT_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextRegular color={COLORS.WHITE}>
                    {item.status == '1' ? 'ปีเดียวกัน' : 'ปีถัดไป'}
                  </TextRegular>
                </View>
              </View>
            </Container>
          </View>
        ))}
      </>
    );
  };

  return (
    <RootScroll title={'การตั้งค่าล่าสุด'} flexContainer isBackIcon>
      {apiData !== null ? (
        <Container style={{flex: 0}}>
          <TextMedium style={styles.title}>
            เลือกอัตราการจ่ายเงินสะสม
          </TextMedium>
          {apiData.type == 1 && (
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              กำหนดช่วงอัตรา-สมาชิกสามารถเลือกจ่ายเงินสะสมได้ในอัตรา
            </TextRegular>
          )}
          {apiData.type == 2 && (
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              ไม่กำหนดช่วงอัตรา-สมาชิกสามารถเลือกจ่ายเงินสะสมได้ในอัตรา{' '}
              {isTablet ? '' : '\n'}
              (ของค่าจ้าง)
            </TextRegular>
          )}
          {apiData.type == 3 && (
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              มีหลายช่วงอัตรา พิจารณาถึงอายุงาน, อายุการเป็นสมาชิก, ตำแหน่งงาน
              หรืออื่นๆ
            </TextRegular>
          )}
        </Container>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextMedium color={COLORS.THIRDARY}>ไม่พบการตั้งค่าล่าสุด</TextMedium>
        </View>
      )}
      <Container style={{flex: 0}}>
        {apiData !== null && renderContent()}
      </Container>
      {apiData !== null && renderMaxChangeRate()}
    </RootScroll>
  );
};

const Type1Setting = ({data}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.input}>
        <TextRegular size={FONT_SIZE.BODY_3}>{data.min_rate}%</TextRegular>
      </View>
      <TextRegular size={FONT_SIZE.BODY_3} style={styles.inputTextMiddle}>
        {' '}
        ถึง{' '}
      </TextRegular>
      <View style={styles.input}>
        <TextRegular size={FONT_SIZE.BODY_3}>{data.max_rate}%</TextRegular>
      </View>
      <TextRegular size={FONT_SIZE.BODY_3} style={{marginLeft: ViewScale(10)}}>
        {' '}
        ของค่าจ้าง{' '}
      </TextRegular>
    </View>
  );
};

const Type2Setting = ({data}) => {
  const renderInput = () => {
    return data.rate.map((item, index) => {
      return (
        <View
          key={'TYPE2SettingId' + index}
          style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <View style={[styles.input, {paddingLeft: 0}]}>
            <TextRegular style={[styles.text, {textAlign: 'center'}]}>
              {item}%
            </TextRegular>
          </View>
          {index < data.rate.length - 1 && (
            <TextRegular style={[styles.inputTextMiddle]}> หรือ </TextRegular>
          )}
        </View>
      );
    });
  };

  return <View style={styles.inputContainer}>{renderInput()}</View>;
};
const Type3Setting = ({data}) => {
  const children_items = React.useMemo(
    () => [
      {label: 'น้อยกว่า', value: 0},
      {label: 'ตั้งแต่', value: 1},
      {label: 'ตั้งแต่ (ขึ้นไป)', value: 2},
      {label: 'น้อยกว่าหรือเท่ากับ', value: 3},
      {label: 'มากกว่า', value: 4},
      {label: 'มากกว่า (ขึ้นไป)', value: 5},
      {label: 'อื่นๆ', value: 6},
    ],
    [],
  );

  const renderContent = (item, subtype) => {
    const Cumulative = () => {
      if (item.hasOwnProperty('rate')) {
        return (
          <>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              อัตราการจ่ายเงินสะสม
            </TextRegular>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                flexWrap: 'wrap',
              }}>
              {item?.rate.map((ele, index) => (
                <>
                  <View
                    style={[
                      styles.formContentInput,
                      item?.rate.length <= 2
                        ? {flex: 1}
                        : {marginBottom: ViewScale(10)},
                    ]}>
                    <TextRegular style={styles.text}>{ele}</TextRegular>
                    <TextRegular style={styles.text}>%</TextRegular>
                  </View>
                  {index < item?.rate?.length - 1 && (
                    <View
                      style={{
                        height: SPACING.INPUT_HEIGHT,
                        justifyContent: 'center',
                      }}>
                      <TextRegular
                        style={{
                          marginHorizontal: ViewScale(10),
                          alignSelf: 'center',
                        }}
                        size={FONT_SIZE.BODY_2}>
                        {'หรือ'}
                      </TextRegular>
                    </View>
                  )}
                </>
              ))}
            </View>
          </>
        );
      } else {
        return (
          <>
            <TextRegular
              size={FONT_SIZE.BODY_3}
              style={{marginVertical: ViewScale(10)}}>
              อัตราการจ่ายเงินสะสม
            </TextRegular>
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <View style={[styles.formContentInput, {flex: 1}]}>
                <TextRegular style={styles.text}>
                  {item?.rate_start}
                </TextRegular>
                <TextRegular style={styles.text}>%</TextRegular>
              </View>
              <TextRegular
                style={[styles.text, {marginHorizontal: ViewScale(20)}]}>
                ถึง
              </TextRegular>

              <View style={[styles.formContentInput, {flex: 1}]}>
                <TextRegular style={styles.text}>{item?.rate_end}</TextRegular>
                <TextRegular style={styles.text}>%</TextRegular>
              </View>
            </View>
          </>
        );
      }
    };

    if (subtype == 3) {
      return (
        <View style={{flex: 1, padding: ViewScale(5)}}>
          <View style={[styles.formContentInput]}>
            <TextRegular numberOfLines={1} style={styles.text}>
              {item.detail_type_text}
            </TextRegular>
          </View>
          {Cumulative()}
        </View>
      );
    }

    if ([2, 5].includes(parseInt(item.detail_type))) {
      return (
        <View style={{flex: 1, padding: ViewScale(5)}}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <View
              style={[
                styles.formContentInput,
                {width: ViewScale(100), marginRight: ViewScale(10)},
              ]}>
              <TextRegular numberOfLines={1} style={styles.text}>
                {children_items[parseInt(item.detail_type) - 1].label}
              </TextRegular>
            </View>
            <View style={[styles.formContentInput, {flex: 0.5}]}>
              <TextRegular style={styles.text}>{item.start}</TextRegular>
              {subtype != 4 && (
                <TextRegular style={styles.text}>
                  {Translate('textYear')}
                </TextRegular>
              )}
            </View>
            <View
              style={[
                {flex: 1, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <TextRegular size={FONT_SIZE.BODY_3}>
                {parseInt(item.detail_type) == 2 ? 'แต่น้อยกว่า' : 'แต่ไม่เกิน'}
              </TextRegular>
            </View>
            <View style={[styles.formContentInput, {flex: 0.5}]}>
              <TextRegular style={styles.text}>{item.end}</TextRegular>
              {subtype != 4 && (
                <TextRegular style={styles.text}>
                  {Translate('textYear')}
                </TextRegular>
              )}
            </View>
          </View>
          {Cumulative()}
        </View>
      );
    } else if ([3, 6].includes(parseInt(item.detail_type))) {
      return (
        <View style={{flex: 1, padding: ViewScale(5)}}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <View
              style={[
                styles.formContentInput,
                {width: ViewScale(100), marginRight: ViewScale(10)},
              ]}>
              <TextRegular numberOfLines={1} style={styles.text}>
                {children_items[parseInt(item.detail_type) - 1].label}
              </TextRegular>
            </View>
            <View style={[styles.formContentInput, {flex: 1}]}>
              <TextRegular style={styles.text}>{item.value}</TextRegular>
              {subtype != 4 && (
                <TextRegular style={styles.text}>
                  {Translate('textYear')}
                </TextRegular>
              )}
            </View>
            <View
              style={[
                {flex: 0.4, justifyContent: 'center', alignItems: 'center'},
              ]}>
              <TextRegular style={styles.text}>ขึ้นไป</TextRegular>
            </View>
          </View>
          {Cumulative()}
        </View>
      );
    }

    return (
      <View style={{flex: 1, padding: ViewScale(5)}}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View
            style={[
              styles.formContentInput,
              {width: ViewScale(100), marginRight: ViewScale(10)},
            ]}>
            <TextRegular numberOfLines={1} style={styles.text}>
              {children_items[item.detail_type - 1].label}
            </TextRegular>
          </View>
          <View style={[styles.formContentInput, {flex: 1}]}>
            <TextRegular style={styles.text}>
              {item.detail_type == 7 ? item.detail_type_text : item.value}
            </TextRegular>
            {item.detail_type != 7 && subtype != 4 && (
              <TextRegular style={styles.text}>
                {Translate('textYear')}
              </TextRegular>
            )}
          </View>
        </View>
        {Cumulative(item)}
      </View>
    );
  };

  return (
    <View style={styles.form}>
      <View style={styles.formTitle}>
        <View style={styles.formInLeft}>
          <TextRegular style={styles.formInLeftText}>
            {ITEMS[data?.subtype - 1]}
          </TextRegular>
        </View>
      </View>

      {data?.rate_detail.map((item, index) => {
        return (
          <View style={styles.formContent} key={'FormContentId' + index}>
            {renderContent(item, data.subtype)}
          </View>
        );
      })}
    </View>
  );
};

export default ChangeAccumulateHistory;
