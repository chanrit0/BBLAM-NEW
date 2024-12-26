/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {VictoryPie, VictoryLabel, VictoryLegend} from 'victory-native';
import Svg, {G, Polyline, Text, TSpan, Image} from 'react-native-svg';
import {numberWithCommas, ViewScale} from 'utils';
import {isTablet, COLORS, FONT_TYPE, FONT_SIZE, globalStyle} from 'styles';
import {getXOffset, getYOffset, getAverage} from 'utils/math';
import {TextMedium} from 'components/atoms';
import _ from 'lodash';

const color2 = ['#259999', '#1b3687'];
const color3 = [
  '#18385e',
  '#216789',
  '#2b4f70',
  '#99b4c9',
  '#2384a0',
  '#2577a5',
  '#789ac4',
  '#103A73',
  '#356FAF',
  '#3A7B8E',
];

export default ({
  total = 0,
  date = 'd/m/y',
  data = [],
  width = Dimensions.get('window').width,
  height = width / (isTablet ? 2 : 1.5),
  radius = (width / 2.8) * (isTablet ? 0.4 : 0.55),
  innerRadius = radius - ViewScale(25),
  isInvestNew = false,
  children,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const widthImage = ViewScale(80);
  const heightImage = ViewScale(90);

  typeof total === 'string' && (total = total.replace(/,/g, ''));

  const [color4, setColor4] = React.useState([
    '#18385e',
    '#216789',
    '#2b4f70',
    '#99b4c9',
    '#2384a0',
    '#2577a5',
    '#789ac4',
    '#103A73',
    '#356FAF',
    '#3A7B8E',
  ]);

  const [indexColor, setIndex] = React.useState(1);

  dataValue = [];
  if (data != null) {
    data.forEach(e => {
      dataValue.push(e.y > 5 ? 1 : 0);
    });
  }

  let result = 0;
  if (dataValue.length > 0) {
    result = dataValue.reduce((a, v) => (a = a * v));
  }

  if (data.length <= 0)
    return (
      <View style={globalStyle.viewOpenPopup}>
        <TextMedium color={COLORS.THIRDARY}>ไม่พบข้อมูล</TextMedium>
      </View>
    );
  else
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          {indexColor == 1 && (
            <VictoryPie
              radius={radius}
              colorScale={data.length > 2 ? color4 : color2}
              innerRadius={innerRadius}
              animate={{duration: 300}}
              origin={{x: centerX, y: centerY}}
              data={data}
              x={'x'}
              y={'y'}
              labelComponent={
                <Label
                  innerRadius={innerRadius}
                  radius={radius}
                  data={data}
                  nameKey={'x'}
                  valueKey={'y'}
                  cx={centerX}
                  cy={centerY}
                />
              }
            />
          )}

          {isInvestNew ? (
            <G
              x={width / 2 - widthImage / 2}
              y={height / 2 - heightImage / 2 - 15}>
              <Image
                href={require('assets/images/MoneyGraph.png')}
                width={widthImage}
                height={heightImage}
              />
              <G
                width={widthImage}
                height={heightImage}
                x={widthImage / 2 - 10}
                y={heightImage}>
                <Text
                  transform="translate(-195 -1054)"
                  fill="#18385E"
                  fillRule="evenodd"
                  fontFamily="FontAwesome"
                  fontSize={20}>
                  <TSpan x={195} y={1070}>
                    {'\uF063'}
                  </TSpan>
                </Text>
              </G>
            </G>
          ) : (
            <VictoryLabel
              textAnchor="middle"
              lineHeight={[1, 2.5]}
              style={[
                {
                  fontSize: ViewScale(14),
                  fontFamily: FONT_TYPE.MEDIUM,
                  fill: COLORS.PRIMARY,
                },
                {fontSize: ViewScale(10), fontFamily: FONT_TYPE.MEDIUM},
              ]}
              x={width / 2}
              y={height / 2}
              text={[
                total === ''
                  ? '0'
                  : numberWithCommas(parseFloat(total)?.toFixed(2)),
                `ณ วันที่ ${date}`,
              ]}
            />
          )}
        </Svg>
        {result == 0 && (
          <View width={width} style={{alignItems: 'center'}}>
            <View
              style={{
                width: width,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TextMedium
                numberOfLines={1}
                style={{
                  color: COLORS.RED,
                  fontFamily: FONT_TYPE.SEMI_BOLD,
                  fontSize: FONT_SIZE.BODY_3,
                }}>
                {`หมายเหตุ: `}
              </TextMedium>
              <View style={{width: width / 1.5}}>
                <TextMedium
                  numberOfLines={2}
                  style={{
                    color: COLORS.RED,
                    fontFamily: FONT_TYPE.SEMI_BOLD,
                    fontSize: FONT_SIZE.BODY_3,
                  }}>
                  {`กรณี Pie Chart แสดงข้อมูลไม่สมบรูณ์กรุณาดูตัวเลขด้านล่าง`}
                </TextMedium>
              </View>
            </View>
            <View style={{height: 10}} />
            <View
              style={{
                width: width / 1.2,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{width: width / 2.4, height: 25}}
                    onPress={() => {
                      setIndex(0);
                      let indexColor = 0;
                      let color5 = color4;

                      if (item.name == item.name) {
                        if (color5[index] == '#fff') {
                          color5[index] = color3[index];
                        } else {
                          color5[index] = '#fff';
                          indexColor = index;
                        }
                      } else {
                        color5[index] = color3[index];
                      }

                      setColor4(color5);
                      setTimeout(() => {
                        setIndex(1);
                      }, 200);
                    }}>
                    <TextMedium
                      numberOfLines={1}
                      key={index}
                      style={{
                        color: index > color3.length ? 'black' : color3[index],
                        fontFamily: FONT_TYPE.SEMI_BOLD,
                        fontSize: FONT_SIZE.BODY_3,
                      }}>
                      {` ◉ ${item.x} ${item.y} %`}
                    </TextMedium>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
};

const Label = ({
  innerRadius,
  radius,
  nameKey,
  valueKey,
  data,
  datum,
  slice: {startAngle, endAngle},
  cx,
  cy,
  index,
  ...props
}) => {
  // calculation
  const middleRadius = getAverage([innerRadius, radius]);
  const midAngle = getAverage([endAngle, startAngle]);
  const labelOffset = radius + middleRadius / 3;
  let x = cx + getXOffset(labelOffset, midAngle);
  const y = cy + getYOffset(labelOffset, midAngle);
  let xEdit = x < 0 ? x + 7 : x + -5;
  let yEdit = cy + getYOffset(labelOffset, midAngle) + 10;

  const textAnchor = cx < x ? 'start' : 'end';
  x = cx < x ? x : x - 10;

  const name = datum[nameKey];
  const value = datum[valueKey];

  fixedTo = function (number, n) {
    var k = Math.pow(10, n);
    return (Math.round(number * k) / k).toFixed(n);
  };

  return (
    <G>
      <Text
        x={x}
        y={y}
        style={{
          fontFamily: FONT_TYPE.REGULAR,
          fontSize: FONT_SIZE.BODY_3,
        }}
        textAnchor={textAnchor}
        fill={data.length > 2 ? color3[index] : color2[index]}>
        <TSpan x={x} y={y}>
          {value <= 5 ? '' : name}
        </TSpan>
        <TSpan x={x} dy={ViewScale(20)}>
          {data.length > 2 ? (
            `${value}` <= 5 ? (
              `${value}` == 0 ? (
                // `${Math.round(value)}%`
                <Text
                  x={xEdit}
                  y={yEdit}
                  style={{
                    fontFamily: FONT_TYPE.REGULAR,
                    fontSize: value === 1 ? FONT_SIZE.BODY_4 : FONT_SIZE.BODY_3,
                  }}
                  textAnchor={textAnchor}
                  fill={data.length > 2 ? color3[index] : color2[index]}>
                  {'◉'}
                </Text>
              ) : (
                <Text
                  x={xEdit}
                  y={yEdit}
                  style={{
                    fontFamily: FONT_TYPE.REGULAR,
                    fontSize: value == 1 ? FONT_SIZE.BODY_4 : FONT_SIZE.BODY_3,
                  }}
                  textAnchor={textAnchor}
                  fill={data.length > 2 ? color3[index] : color2[index]}>
                  {'◉'}
                </Text>
              )
            ) : (
              `${fixedTo(value, 2)}%`
            )
          ) : (
            `${fixedTo(value, 2)}%`
          )}
        </TSpan>
      </Text>

      <LabelLine
        cx={cx}
        cy={cy}
        data={data}
        index={index}
        middleRadius={middleRadius}
        radius={radius}
        midAngle={midAngle}
      />
    </G>
  );
};

const LabelLine = props => {
  const {cx, cy, midAngle, middleRadius, radius, data, index} = props;

  const xStart = cx + getXOffset(middleRadius, midAngle);
  const yStart = cy + getYOffset(middleRadius, midAngle);

  const offSetEnd = 2 * radius - middleRadius;
  const xEnd = cx + getXOffset(offSetEnd, midAngle);
  const yEnd = cy + getYOffset(offSetEnd, midAngle);

  return (
    <Polyline
      style={{
        fill: 'none',
        stroke: data.length > 2 ? color3[index] : color2[index],
        strokeWidth: 1,
      }}
      points={`${xStart},${yStart} ${xEnd},${yEnd}`}
    />
  );
};
