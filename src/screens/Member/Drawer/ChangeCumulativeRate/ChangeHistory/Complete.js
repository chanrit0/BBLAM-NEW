import {EmptyData} from 'components/organisms';
import React from 'react';
import {View} from 'react-native';
import {ListCumulative} from './ListCumulative';

export default function Complete({data}) {
  return (
    <View>
      {data.length > 0 ? (
        data.map((item, index) => (
          <View key={'ListCumulativeId-' + index}>
            <ListCumulative {...item} type={'complete'} />
          </View>
        ))
      ) : (
        <EmptyData />
      )}
    </View>
  );
}
