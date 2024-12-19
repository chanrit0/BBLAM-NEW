/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RootScroll, Container} from 'components/common';
import {ViewScale, setSpinner} from 'utils';
import Tab from 'components/Global/TabSummaryInvestPolicy';
import {GraphAreaNav, TextRegular, TextMedium} from 'components/atoms';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {getNAVGraph} from 'services/api/committee';
import dayjs from 'dayjs';
import {useRecoilValue} from 'recoil';
import {userInfoState} from 'recoil-state';
import {getNAVGraphMember} from 'services/api/member';
import {Translate} from 'function';
import _ from 'lodash';

export default function Detail({route}) {
  dayjs.locale('th');
  const {sub_code, sub_name, tabIndex} = route.params;
  const [apiData, setApiData] = React.useState({
    graph: [],
    report: [],
  });
  const [load, setLoad] = React.useState(true);
  const [onTouchGraphStart, setOnTouchGraphStart] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(tabIndex);
  const userInfo = useRecoilValue(userInfoState);

  const callapi = async () => {
    if (userInfo.role === 'committee') {
      await getNAVGraph({sub_fund_code: sub_code})
        .then(response => {
          setApiData({
            graph: response.data.graph,
            report: response.data.report,
          });
          setLoad(false);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await getNAVGraphMember({sub_fund_code: sub_code})
        .then(response => {
          setApiData({
            graph: response.data.graph,
            report: response.data.report,
          });
          setLoad(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const CumulativeTabText = React.useMemo(() => {
    if (selectedIndex === 0) {
      return 'อัตราผลตอบแทน\nตั้งแต่ต้นปีจนถึงปัจจุบัน';
    } else if (selectedIndex === 1) {
      return 'อัตราผลตอบแทน\nย้อนหลังเฉลี่ย ต่อ 3 ปี';
    } else {
      return 'อัตราผลตอบแทน\nย้อนหลังเฉลี่ย ต่อ 5 ปี';
    }
  }, [selectedIndex]);

  React.useEffect(() => {
    setSpinner(true);
    callapi().then(() => setSpinner(false));
  }, []);

  return (
    <RootScroll
      scrollEnabled={!onTouchGraphStart}
      headerChildren={
        !load && (
          <Header
            data={apiData.graph}
            sub_code={sub_code}
            sub_name={sub_name}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setOnTouchGraphStart={setOnTouchGraphStart}
          />
        )
      }
      parallaxHeight={ViewScale(700)}
      flexContainer
      isBackIcon>
      {!load && (
        <>
          <Container style={{flex: 0}}>
            <View style={styles.returnStartYear}>
              <TextRegular>{CumulativeTabText}</TextRegular>
              <TextMedium color={COLORS.PRIMARY}>
                {`${
                  !_.isEmpty(apiData.graph[selectedIndex]?.return_fund)
                    ? parseFloat(
                        apiData.graph[selectedIndex]?.return_fund,
                      ).toFixed(2)
                    : '-'
                }% | BM ${
                  !_.isEmpty(apiData.graph[selectedIndex]?.return_bm)
                    ? parseFloat(
                        apiData.graph[selectedIndex]?.return_bm,
                      ).toFixed(2)
                    : '-'
                }%`}
              </TextMedium>
            </View>
          </Container>
          <View style={styles.tabBorder}>
            <Tab data={apiData.report} />
          </View>
        </>
      )}
    </RootScroll>
  );
}

const Header = React.memo(
  ({
    data,
    selectedIndex,
    setSelectedIndex,
    sub_code,
    sub_name,
    setOnTouchGraphStart,
  }) => {
    const convert_graph_data =
      data[selectedIndex]?.graph.length > 0
        ? data[selectedIndex]?.graph.map((item, index) => ({
            x: data[selectedIndex].dategraph[index],
            y: item,
          }))
        : data[selectedIndex]?.graph;

    let max = 0;
    let min = 0;

    if (data.length > 0) {
      max = Math.max(...data[selectedIndex]?.graph);
      min = Math.min(...data[selectedIndex]?.graph);
    }

    const [NAV, setNAV] = React.useState(
      data[selectedIndex]?.graph[data[selectedIndex]?.graph.length - 1],
    );

    return (
      <View>
        <Container>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextMedium size={FONT_SIZE.TITLE_1} color={'white'}>
              {sub_code}
            </TextMedium>
            <TextMedium size={FONT_SIZE.TITLE_1} color={'white'}>
              {`NAV ${NAV.toFixed(4)} บาท`}
            </TextMedium>
          </View>
          <View style={styles.leftContainer}>
            <TextRegular color={'white'} size={FONT_SIZE.BODY_2}>
              {sub_name}
            </TextRegular>
            <TextRegular size={FONT_SIZE.BODY_3} color={'white'}>
              {`ข้อมูล ณ วันที่ ${data[selectedIndex]?.date ?? '-'}`}
            </TextRegular>
          </View>
        </Container>
        {data.length > 0 && (
          <View
            style={{
              alignSelf: 'center',
              transform: [
                {
                  translateY: ViewScale(50),
                },
              ],
            }}>
            <TextRegular color={COLORS.WHITE} size={FONT_SIZE.TITLE_3}>
              {'NAV'}
            </TextRegular>
          </View>
        )}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: ViewScale(300),
          }}>
          {data.length > 0 && convert_graph_data.length > 0 ? (
            <GraphAreaNav
              setNAV={setNAV}
              data={convert_graph_data}
              max={max}
              min={min}
              setOnTouchGraphStart={setOnTouchGraphStart}
            />
          ) : (
            <TextMedium color={COLORS.WHITE} size={FONT_SIZE.TITLE_2}>
              {Translate('textNoData')}
            </TextMedium>
          )}
        </View>
        <View>
          <Container style={styles.dateGraphdown}>
            <View
              style={{
                backgroundColor: 'rgba(111,133,195,0.26)',
                alignSelf: 'flex-start',
                paddingHorizontal: ViewScale(10),
              }}>
              <TextRegular color={COLORS.WHITE} size={FONT_SIZE.BODY_2}>
                {_.isEmpty(data[selectedIndex]?.datetext)
                  ? '-'
                  : data[selectedIndex]?.datetext}
              </TextRegular>
            </View>
            <View>
              <SegmentedControlTab
                values={['YTD', '3YRS', '5YRS']}
                selectedIndex={selectedIndex}
                onTabPress={setSelectedIndex}
                {...SegmentedControlTabProps}
              />
            </View>
          </Container>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
  },
  dateGraphdown: {
    marginVertical: ViewScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabBorder: {
    borderColor: COLORS.BORDER,
    borderTopWidth: 0.5,
  },
  returnStartYear: {
    paddingVertical: ViewScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const SegmentedControlTabProps = {
  activeTabStyle: {
    backgroundColor: COLORS.WHITE,
  },
  activeTabTextStyle: {
    color: COLORS.PRIMARY,
  },
  firstTabStyle: {
    marginRight: ViewScale(10),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRightWidth: 1,
  },
  lastTabStyle: {
    marginLeft: ViewScale(10),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderLeftWidth: 1,
  },
  tabStyle: {
    flex: 0,
    width: ViewScale(50),
    paddingVertical: 0,
    borderColor: 'white',
    textColor: 'white',
    backgroundColor: 'transparent',
  },
  tabTextStyle: {
    color: COLORS.WHITE,
    fontFamily: FONT_TYPE.MEDIUM,
    fontSize: FONT_SIZE.BODY_3,
  },
};
