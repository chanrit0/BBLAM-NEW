import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {FontScale, isTablet, numberWithCommas, ViewScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
  VictorySharedEvents,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLabel,
} from 'victory-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  Use,
  Rect,
  ForeignObject,
} from 'react-native-svg';
import {TextRegular} from 'components/atoms';
import {EmptyData} from 'components/organisms';
import {Translate} from 'function';

export default ({
  data = [],
  min,
  max,
  date,
  width = Dimensions.get('window').width,
  height = width / (isTablet ? 2 : 1.5),
  setOnPressGraph,
}) => {
  if (data.length === 0) {
    return <EmptyData flex title={Translate('textNoData')} style={{height}} />;
  } else {
    return (
      <View>
        <View
          style={{
            position: 'relative',
            top: ViewScale(15),
            right: SPACING.CONTAINER_MARGIN_HORIZONTAL,
          }}>
          <TextRegular size={FONT_SIZE.BODY_2} style={{alignSelf: 'flex-end'}}>
            {'ข้อมูล ณ วันที่ '}
            {date}
          </TextRegular>
        </View>

        <VictoryChart
          height={height}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiBlacklist={['scatter']}
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  style={{
                    fontFamily: FONT_TYPE.REGULAR,
                    fill: COLORS.PRIMARY,
                  }}
                  labelComponent={<VictoryLabel lineHeight={1.4}/>}
                  flyoutStyle={{
                    fill: COLORS.WHITE,
                    stroke: COLORS.WHITE,
                  }}
                />
              }
              onTouchStart={() => {
                setOnPressGraph(true);
              }}
              onTouchEnd={() => {
                setOnPressGraph(false);
              }}
              labels={({datum}) => {
                let spacing_last = '';
                let spacing_first = '';
                if (datum._x >= data.length) spacing_last = '   ';
                if (datum._x <= 1) spacing_first = '   ';

                return `${spacing_first}${numberWithCommas(datum.y)} ${
                  datum.unit
                }${spacing_last}\n${spacing_first}วันที่ ${datum.x}${spacing_last}`;
              }}
            />
          }>
          <Defs>
            <LinearGradient id="areaGradient" gradientTransform="rotate(90)">
              <Stop offset="0%" stopColor="#1a3686" stopOpacity="0.3" />
              <Stop offset="60%" stopColor="#57a6e4" stopOpacity="0" />
              <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Defs>
            <LinearGradient id="strokeGradient">
              <Stop offset="0%" stopColor="#57a6e4" stopOpacity="1" />
              <Stop offset="100%" stopColor={COLORS.PRIMARY} stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <VictoryAxis
            offsetX={60}
            domain={[0, max]}
            dependentAxis
            name="victoryaxis"
            label={'ขนาดกองทุน'}
            style={{
              axisLabel: {
                fontFamily: FONT_TYPE.REGULAR,
                fontSize: FONT_SIZE.TITLE_1,
              },
              grid: {stroke: COLORS.BORDER, strokeWidth: 1},
              axis: {stroke: 'none'},
              tickLabels: {
                display: 'none',
              },
            }}
          />
          <VictoryArea
            name="area"
            interpolation="natural"
            style={{
              data: {
                fill: 'url(#areaGradient)',
                stroke: 'url(#strokeGradient)',
                strokeWidth: 3,
                strokeLinecap: 'round',
              },
            }}
            data={data}
          />
          {data.length < 2 && (
            <VictoryScatter
              style={{
                data: {
                  fill: 'white',
                  fillOpacity: 1,
                  stroke: '#2c6dc3',
                  strokeWidth: 3,
                },
                labels: {
                  fontSize: FONT_SIZE.BODY_2,
                  fontFamily: FONT_TYPE.REGULAR,
                  fill: COLORS.PRIMARY,
                  padding: 15,
                },
              }}
              name="scatter"
              size={4}
              data={data}
            />
          )}
        </VictoryChart>
      </View>
    );
  }
};
