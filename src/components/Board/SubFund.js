import {EmptyData} from 'components/organisms';
import {Translate} from 'function';
import React from 'react';
import {View, FlatList} from 'react-native';
import {COLORS} from 'styles';
import {ViewScale} from 'utils';
import {ListFundBoxSubFund} from './ListFundBoxSubFund';

export default function InvestmentChoice({data}) {
  return (
    <View style={{flex: 1}}>
      {data.length > 0 ? (
        data.map((item, index) => (
          <View key={'idListHomeBoard-' + index}>
            <ListFundBoxSubFund
              name={item.sub_code}
              FundName={item.sub_name}
              MemberCount={item.count_member}
              total={item.cont_sum_total}
            />
          </View>
        ))
      ) : (
        <EmptyData title={Translate('textNoData')} />
      )}
    </View>
  );
}
