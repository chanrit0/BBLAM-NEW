// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';

// components
import {MyReturnGrid4} from 'components/molecules';
import {TextPoints, TextRegular, TextMedium} from 'components/atoms';

// lib
import {ListItem} from 'react-native-elements';
import _ from 'lodash';
import {useRecoilValue} from 'recoil';
import {languageState} from 'recoil-state';

// props -> saving, contribution, benefitSaving, benefitContribution, total

export default ({
  name = '????',
  date = 'd/m/y',
  saving = 0,
  contribution = 0,
  benefitSaving = 0,
  benefitContribution = 0,
  total = 0,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  useRecoilValue(languageState);

  const handleOnPress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.Container}>
      <ListItem.Accordion
        content={
          <View style={styles.headerContainer}>
            <TextMedium size={FONT_SIZE.BODY_2} style={styles.name}>
              {name}
            </TextMedium>
            <TextRegular>
              <TextRegular style={styles.HeaderRightText_date}>
                {Translate('textRemiitanceDateRightHeader')}
              </TextRegular>
              <TextRegular style={styles.HeaderRightText_data}>
                {date}
              </TextRegular>
            </TextRegular>
          </View>
        }
        containerStyle={styles.ListItemContainerStyle}
        isExpanded={expanded}
        onPress={handleOnPress}>
        {expanded && (
          <View style={styles.BodyContainer}>
            <MyReturnGrid4
              saving={saving}
              contribution={contribution}
              benefitSaving={benefitSaving}
              benefitContribution={benefitContribution}
            />
            <View style={styles.totalContainer}>
              <TextRegular style={styles.totaltext}>
                {Translate('textRemittacneTotal')}
              </TextRegular>
              <TextPoints
                number={total}
                style={{fontFamily: FONT_TYPE.MEDIUM}}
              />
              <TextRegular style={styles.totaltext}>
                {' '}
                {Translate('textBaht')}
              </TextRegular>
            </View>
          </View>
        )}
      </ListItem.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {flex: 1, marginRight: ViewScale(10)},
  ListItemContainerStyle: {
    minHeight: SPACING.INPUT_HEIGHT,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  HeaderRightText_data: {
    fontSize: FONT_SIZE.BODY_3,
  },
  HeaderRightText_date: {
    fontSize: FONT_SIZE.BODY_3,
  },
  Container: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_2,
    marginTop: ViewScale(10),
  },
  BodyContainer: {
    borderTopWidth: 1,
    borderTopStartRadius: ViewScale(20),
    borderTopEndRadius: ViewScale(20),
    borderTopColor: COLORS.GRAY_5,
  },
  totaltext: {
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_1,
  },
  totalContainer: {
    backgroundColor: COLORS.GRAY_5,
    padding: ViewScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
