/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {View} from 'react-native';
import styles from '../Style';
import {Table, Row, Rows} from 'react-native-table-component';
import {Translate} from 'function';

import {useRecoilValue} from 'recoil';
import {getCurrentDate, numberWithCommas} from 'utils';
import {languageState} from 'recoil-state';
import dayjs from 'dayjs';
import {EmptyData} from 'components/organisms';

export default ({data = {value: [], total: null}, isLoad}) => {
  useRecoilValue(languageState);
  dayjs.locale('th');

  const tableData =
    data.value.length !== 0
      ? data.value.map(key => [
          getCurrentDate('dayjs')
            .month(parseInt(key['month_pay']) - 1)
            .format('MMMM'),
          numberWithCommas(key['em_cb']),
          numberWithCommas(key['com_cb']),
        ])
      : [[getCurrentDate('dayjs').format('MMMM'), 0, 0]];

  const tableFooter = [
    [
      Translate('textSummaryTotal'),
      data.total !== null ? numberWithCommas(data.total?.total_em_cb) : '',
      data.total !== null ? numberWithCommas(data.total?.total_com_cb) : '',
    ],
    [
      '',
      Translate('textSummaryTotalAll'),
      data.total !== null ? numberWithCommas(data.total?.total_all) : '',
    ],
  ];

  if (!isLoad) {
    return <View />;
  } else if (data.value.length === 0 && data.total === null) {
    return <EmptyData title={Translate('textEmptyData')} />;
  } else {
    return (
      <View>
        <Table>
          <Row
            data={[
              '',
              Translate('textSaving') + `(${Translate('textBaht')})`,
              Translate('textContribution') + `(${Translate('textBaht')})`,
            ]}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={tableData} style={styles.row} textStyle={[styles.text]} />
          <Rows
            data={tableFooter}
            style={styles.rowFooter}
            textStyle={styles.text}
          />
        </Table>
      </View>
    );
  }
};
