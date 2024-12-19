// React
import React from 'react';
import {View, StyleSheet} from 'react-native';

// custom
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {COLORS} from 'styles';

// components
import {Container} from 'components/common';
import {GraphDonut, TextMedium} from 'components/atoms';

export default ({data, total, date}) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Container>
          <TextMedium>{Translate('textOverviewInvestment')}</TextMedium>
        </Container>
      </View>
      <View style={{backgroundColor: '#FFF'}}>
        <GraphDonut data={data} total={total} date={date} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.GRAY,
    paddingVertical: ViewScale(15),
    flex: 1,
  },
});
