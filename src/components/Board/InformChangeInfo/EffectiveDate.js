/* eslint-disable react-native/no-inline-styles */
// React
import React from 'react';
import { View } from 'react-native';

// custom
import { ViewScale } from 'utils';

// componenets
import { Container } from 'components/common';
import { MaterialIcons } from 'components/Icons';
import { DatePicker, TextMedium, TextRegular } from 'components/atoms';

// constant
import { COLORS, FONT_SIZE, SPACING } from 'styles';
import { Translate } from 'function';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

export default function EffectiveDate({
  onSelected,
  error,
  title = Translate('textEffectiveDateForce1'),
}) {
  const [date, setDate] = React.useState(new Date());
  const [SelectedDate, setSelectedDate] = React.useState('');

  const handleSetDate = date => {
    setDate(date);
    setSelectedDate(date);
  };

  dayjs.locale('th');
  dayjs.extend(buddhistEra);

  React.useMemo(() => {
    dayjs.extend(buddhistEra);
  }, []);

  React.useEffect(() => {
    onSelected(SelectedDate ? dayjs(SelectedDate).format('DD/MM/BBBB') : '');
  }, [SelectedDate]);

  return (
    <View style={{ paddingTop: ViewScale(15) }}>
      <Container>
        <TextMedium>{title}</TextMedium>
        <DatePicker
          minimumDate={new Date()}
          style={{
            marginTop: ViewScale(10),
          }}
          date={date}
          onSelected={handleSetDate}>
          <View
            style={{
              flex: 1,
              height: SPACING.INPUT_HEIGHT,
              borderColor: error ? COLORS.ERROR : COLORS.BORDER,
              borderWidth: 1,
              justifyContent: 'center',
              paddingLeft: ViewScale(10),
            }}>
            <TextRegular
              style={{ color: !SelectedDate ? COLORS.GRAY_3 : 'black' }}>
              {!SelectedDate
                ? 'โปรดระบุ'
                : dayjs(SelectedDate).format('DD MMMM BBBB')}
            </TextRegular>

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '12%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name="date-range"
                color={'#c3c3c3'}
                size={FONT_SIZE.TITLE_2}
              />
            </View>
          </View>
        </DatePicker>
      </Container>
    </View>
  );
}
