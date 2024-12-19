import React from 'react';
import {Dimensions, View} from 'react-native';
import {FontScale, isTablet, ViewScale} from 'utils';
import {
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
  VictoryLine,
  VictoryGroup,
  VictoryTooltip,
  VictoryLabel,
  Circle,
  VictoryVoronoiContainer,
} from 'victory-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  Use,
  Rect,
  Text,
} from 'react-native-svg';
import {COLORS, FONT_TYPE} from 'styles';
import {TextRegular} from 'components/atoms';

export default ({
  width = Dimensions.get('window').width,
  height = width / (isTablet ? 2 : 1.5),
  data = [],
  max,
  min,
  setOnTouchGraphStart,
  setNAV,
}) => {
  const sampleData = data.map(item => ({...item}));
  const [date, setDate] = React.useState(data[data.length - 1].x);

  const handleSetDate = ({datum}) => {
    setDate(datum.x);
    setNAV(datum.y);
    return `${datum.y.toFixed(4)}`;
  };

  return (
    <View>
      <VictoryChart
        height={height}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiBlacklist={['scatter1', 'area', 'scatter2']}
            labelComponent={
              <VictoryTooltip
                style={{
                  fontFamily: FONT_TYPE.REGULAR,
                  fill: COLORS.PRIMARY,
                }}
                flyoutStyle={{
                  fill: COLORS.WHITE,
                  stroke: COLORS.WHITE,
                }}
              />
            }
            onTouchStart={() => {
              setOnTouchGraphStart(true);
            }}
            onTouchEnd={() => {
              setOnTouchGraphStart(false);
            }}
            labels={handleSetDate}
          />
        }>
        <Defs>
          <LinearGradient id="areaGradient" gradientTransform="rotate(90)">
            <Stop offset="0%" stopColor="#eee" stopOpacity="0.18" />
            <Stop offset="60%" stopColor="#57a6e4" stopOpacity="0" />
            <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <VictoryAxis
          domain={[min - 5, max + 5]}
          dependentAxis
          crossAxis={false}
          style={{
            grid: {stroke: COLORS.BORDER, strokeWidth: 1},
            axis: {stroke: 'none'},
            tickLabels: {
              fill: '#FFF',
              fontFamily: FONT_TYPE.REGULAR,
            },
          }}
        />
        <VictoryGroup
          color={'black'}
          data={sampleData}
          y={d => d.y - 2}
          style={{
            data: {
              fill: 'rgba(0,0,0,0.3)',
              borderRadius: 200,
            },
            labels: {
              fontSize: FontScale(14),
              fontFamily: FONT_TYPE.REGULAR,
              fill: COLORS.PRIMARY,
              padding: 15,
            },
          }}>
          <VictoryLine
            name="line"
            interpolation="natural"
            style={{
              data: {
                strokeWidth: 3,
              },
            }}
          />
          {data.length < 20 && <VictoryScatter name="scatter1" size={5} />}
        </VictoryGroup>
        <VictoryGroup
          data={sampleData}
          style={{
            data: {
              fill: 'url(#areaGradient)',
              stroke: '#FFF',
              strokeWidth: 3,
              strokeLinecap: 'round',
            },
          }}
          labelComponent={<VictoryTooltip style={{fontSize: 30}} />}>
          <VictoryArea interpolation="natural" name="area" />
          {data.length < 20 && (
            <VictoryScatter
              name="scatter2"
              size={3}
              style={{
                data: {
                  fill: 'white',
                  borderRadius: 200,
                },
              }}
            />
          )}
        </VictoryGroup>
      </VictoryChart>
      <View
        style={{
          alignSelf: 'center',
          transform: [
            {
              translateY: ViewScale(-20),
            },
          ],
        }}>
        <TextRegular color={COLORS.WHITE}>{`Date : ${date}`}</TextRegular>
      </View>
    </View>
  );
};
