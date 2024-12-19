/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Translate} from 'function';
import {ViewScale, FontScale} from 'utils';
import _ from 'lodash';
import {TextMedium} from 'components/atoms';
import {Entypo} from 'components/Icons';
import {FONT_SIZE} from 'styles';

const colorsLevel = [
  '#228a00',
  '#56aa00',
  '#7ebd00',
  '#acd000',
  '#ffd536',
  '#fbc600',
  '#f4a12a',
  '#e82720',
];

// '#eeeeee',
// props -> type={'noarrow'}

export function ScoreLevel({
  title = '',
  score = 0,
  textSize,
  textTitleStyle,
  type, // noarrow -> มีอันเดียว
  isFull = false, // จัดเต็มสีแบบคือลือ
  containerStyle,
  boxSizeWidth,
  boxSizeHeight,
}) {
  const datas = {
    title: title,
    score: score,
    textSize: textSize,
  };

  const LevelCal = () => {
    if (datas.score >= 0 && datas.score <= 16) return 0;
    else if (datas.score >= 17 && datas.score <= 22) return 1;
    else if (datas.score >= 23 && datas.score <= 28) return 4;
    else if (datas.score >= 29 && datas.score <= 34) return 6;
    else if (datas.score >= 35) return 7;
  };

  return (
    <View
      style={[
        {
          alignItems: 'center',
          flexDirection: 'column',
        },
        containerStyle,
      ]}>
      <TextMedium
        size={datas.textSize}
        style={[{marginBottom: ViewScale(10)}, textTitleStyle]}>
        {datas.title}
      </TextMedium>
      <View>
        <Level
          pos={LevelCal()}
          type={type}
          isFull={isFull}
          boxSizeWidth={boxSizeWidth}
          boxSizeHeight={boxSizeHeight}
        />
      </View>
    </View>
  );
}

const Level = ({
  mode,
  pos,
  type,
  isFull,
  boxSizeWidth = ViewScale(15),
  boxSizeHeight = ViewScale(25),
}) => {
  let textColor = (() => {
    if (pos === 0) return colorsLevel[0];
    else if (pos > 0 && pos <= 3) return colorsLevel[1];
    else if (pos >= 4 && pos <= 5) return colorsLevel[4];
    else if (pos === 6) return colorsLevel[6];
    else return colorsLevel[7];
  })();
  let text = (() => {
    if (pos === 0) return Translate('textScoreLevelRank')[0];
    else if (pos > 0 && pos <= 3) return Translate('textScoreLevelRank')[1];
    else if (pos >= 4 && pos <= 5) return Translate('textScoreLevelRank')[2];
    else if (pos === 6) return Translate('textScoreLevelRank')[3];
    else return Translate('textScoreLevelRank')[4];
  })();

  return (
    <>
      <View style={[{flexDirection: 'row'}]}>
        {colorsLevel.map((item, index) => {
          if (type === 'noarrow') {
            if (index <= pos) {
              return (
                <View
                  key={'id' + index}
                  style={{
                    marginTop: ViewScale(10),
                    width: boxSizeWidth,
                    height: boxSizeHeight,
                    marginHorizontal: ViewScale(1),
                    backgroundColor: item,
                    // opacity: 0.3,
                  }}
                />
              );
            } else {
              return (
                <View
                  key={'id' + index}
                  style={{
                    marginTop: ViewScale(10),
                    width: boxSizeWidth,
                    height: boxSizeHeight,
                    marginHorizontal: ViewScale(1),
                    backgroundColor: item,
                    opacity: 0.3,
                  }}
                />
              );
            }
          } else {
            if (index === pos) {
              return (
                <View
                  key={'id' + index}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      // marginTop: ViewScale(10),
                      width: boxSizeWidth,
                      height: boxSizeHeight,
                      // flexGrow: 1,

                      backgroundColor: item,
                      marginHorizontal: ViewScale(1),
                    }}
                  />
                  <Entypo name="triangle-up" size={FontScale(14)} />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: ViewScale(150),
                      transform: [
                        {
                          translateY: boxSizeHeight,
                        },
                      ],
                    }}>
                    <TextMedium
                      size={FONT_SIZE.BODY_2}
                      color={textColor}
                      style={{alignSelf: 'center'}}>
                      {text}
                    </TextMedium>
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  key={'id' + index}
                  style={{
                    // marginTop: ViewScale(10),
                    // flexGrow: 1,
                    width: boxSizeWidth,
                    height: boxSizeHeight,
                    marginHorizontal: ViewScale(1),
                    backgroundColor: mode === 'gray' ? '#eeeeee' : item,
                    opacity: isFull && index <= pos ? 1 : 0.3,
                  }}
                />
              );
            }
          }
        })}
      </View>
      {type === 'noarrow' && (
        <TextMedium
          color={textColor}
          style={{alignSelf: 'center', marginTop: ViewScale(10)}}>
          {text}
        </TextMedium>
      )}
    </>
  );
};
