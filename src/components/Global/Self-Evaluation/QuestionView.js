import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ViewScale, FontScale} from 'utils';
import {TextRegular} from 'components/atoms';
import {COLORS, FONT_SIZE, FONT_TYPE} from 'styles';
import {TouchableHighlight} from 'components/base';

export default QuestionView = ({data, index, onSelected}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const _SelectedIndex = value => {
    setSelectedIndex(value);
    onSelected(value, index);
  };

  const Question = data.question_text;
  const Answer = data.answer;

  return (
    <View>
      <TextRegular
        size={FONT_SIZE.TITLE_1}
        color={COLORS.PRIMARY}
        style={{marginTop: ViewScale(30)}}>
        {Question}
      </TextRegular>
      {/* <SegmentedControlTab
        {...SegmentedControlTabStyle}
        values={Answer}
        onTabPress={_SelectedIndex}
        selectedIndex={selectedIndex}
      /> */}
      <SegmentControl
        values={Answer}
        onTabPress={_SelectedIndex}
        selectedIndex={selectedIndex}
      />
    </View>
  );
};

const SegmentControl = ({values, onTabPress, selectedIndex}) => {
  return (
    <View style={styles.container}>
      {values &&
        values.map((item, index) => (
          <TouchableHighlight
            style={{
              marginVertical: ViewScale(5),
            }}
            key={'SegmentControl' + index}
            onPress={() => {
              onTabPress(index);
            }}>
            <View
              style={[
                styles.tabStyle,
                selectedIndex === index ? styles.activeTabStyle : null,
              ]}>
              <TextRegular
                style={[
                  styles.tabTextStyle,
                  selectedIndex === index ? styles.activeTabTextStyle : null,
                ]}>
                {item}
              </TextRegular>
            </View>
          </TouchableHighlight>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tabStyle: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    paddingVertical: ViewScale(10),
    paddingHorizontal: ViewScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTextStyle: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontSize: FONT_SIZE.BODY_1,
  },
  activeTabStyle: {
    backgroundColor: COLORS.PRIMARY,
  },
  activeTabTextStyle: {
    color: '#FFF',
  },
});

const SegmentedControlTabStyle = {
  tabsContainerStyle: {
    marginTop: ViewScale(20),
    flexDirection: 'column',
  },
  firstTabStyle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRightWidth: 1,
  },
  lastTabStyle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderLeftWidth: 1,
  },
  tabStyle: {
    borderWidth: 1,
    marginVertical: ViewScale(5),
    borderColor: COLORS.PRIMARY,
    paddingVertical: ViewScale(10),
  },
  activeTabStyle: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  tabTextStyle: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_1,
    color: COLORS.PRIMARY,
  },
};
