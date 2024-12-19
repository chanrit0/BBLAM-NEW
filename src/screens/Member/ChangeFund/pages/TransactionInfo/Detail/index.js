/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import Header from 'components/header/HomeHeaderOnly';
import TextHeader from 'components/header/TextHeader';
import {TextRegular, TextMedium} from 'components/atoms';
import {FONT_TYPE, COLORS, FONT_SIZE} from 'styles';
import {Container} from 'components/common';
import {TextPoints} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale, FontScale, setSpinner, isTablet} from 'utils';
import styles from './Style';
import {Ionicons, Entypo} from 'components/Icons';
import {getTransactionDetail} from 'services/api/member';

export default function index({route}) {
  const [apiData, setApiData] = React.useState(null);
  const {id} = route.params;
  const [headers, setHeader] = React.useState([]);
  const [topic, setTopic] = React.useState(null);

  const callapi = async () => {
    await getTransactionDetail(id)
      .then(response => {
        if (response.status == 'success' || response.code == '02') {
          const {header} = response.data;
          setTopic({
            topic_current: response.data.topic_current,
            topic_new: response.data.topic_new,
          });
          setHeader([
            {
              name: 'วันที่ทำรายการ',
              value: header.created_at,
            },
            {
              name: 'วิธีการสับเปลี่ยน',
              value: header.type,
            },
            {
              name: 'วันที่มีผล',
              value: header.effective_date,
            },
          ]);
          setApiData(response.data);
        }
      })
      .catch(error => console.log(error));
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  }, []);

  return (
    <>
      <Header isBackIcon={true}>
        <TextHeader title={Translate('textTransactionInfoTitle')} />
      </Header>
      {apiData !== null && (
        <Container style={{marginTop: ViewScale(20)}}>
          {headers.map((item, index) => {
            return (
              <View
                key={'listransId-' + index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: ViewScale(5),
                }}>
                <TextMedium size={FONT_SIZE.BODY_2} style={{flex: 0.3}}>
                  {item.name}
                </TextMedium>
                <TextRegular
                  size={FONT_SIZE.BODY_3}
                  color={COLORS.PRIMARY}
                  style={{flex: 0.7, textAlign: 'right'}}>
                  {item.value}
                </TextRegular>
              </View>
            );
          })}

          <View style={styles.grayBox}>
            <TextRegular size={FONT_SIZE.BODY_3} style={{flex: 1}}>
              {topic?.topic_current}
            </TextRegular>
            <Ionicons
              name="ios-arrow-forward"
              style={{
                marginHorizontal: ViewScale(10),
                fontSize: FontScale(18),
                color: COLORS.PRIMARY,
              }}
            />
            <TextMedium color={COLORS.PRIMARY} size={FONT_SIZE.BODY_3}>
              {topic?.topic_new}
            </TextMedium>
          </View>

          {/* เดิม ใหม่ row */}
          <OldNewRow data={apiData} />
        </Container>
      )}
    </>
  );
}

function OldNewRow({data}) {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: ViewScale(20),
      }}>
      <View style={{flex: 1}}>
        <TextRegular>{'เดิม'}</TextRegular>
        <View style={styles.changebox}>
          <FlatList
            data={data?.detail_current}
            keyExtractor={item => item.sub_code}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: ViewScale(5),
                  }}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <TextRegular size={FONT_SIZE.BODY_3}>
                      {item.sub_code}
                    </TextRegular>
                    <TextPoints
                      number={item.percent}
                      size={FontScale(14)}
                      suffix={'%'}
                      style={{
                        fontFamily: FONT_TYPE.MEDIUM,
                      }}
                      pointSizeSame
                    />
                  </ScrollView>
                </View>
                {index < data?.detail_current.length - 1 && (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderColor: COLORS.BORDER,
                    }}
                  />
                )}
              </>
            )}
          />
        </View>
      </View>

      <View style={{marginLeft: ViewScale(10)}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Entypo name="shuffle" size={24} color={COLORS.BORDER} />
        </View>
      </View>
      <View style={{flex: 1, marginLeft: ViewScale(10)}}>
        <TextMedium color={COLORS.PRIMARY}>{'ใหม่'}</TextMedium>
        <View style={styles.changebox}>
          <FlatList
            data={data?.detail_new}
            keyExtractor={item => item.sub_code}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: ViewScale(5),
                  }}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <TextRegular color={COLORS.PRIMARY} size={FONT_SIZE.BODY_3}>
                      {item.sub_code}
                    </TextRegular>
                    <TextPoints
                      number={item.percent}
                      size={FontScale(14)}
                      suffix={'%'}
                      style={{
                        fontFamily: FONT_TYPE.MEDIUM,
                        color: COLORS.PRIMARY,
                      }}
                      pointSizeSame
                    />
                  </ScrollView>
                </View>
                {index < data.detail_new.length - 1 && (
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderColor: COLORS.BORDER,
                    }}
                  />
                )}
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
}
