import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ViewScale} from 'utils';
import {styles} from '../components/ContentBoxNews';
import {COLORS} from 'styles';

export default () => {
  const renderItem = () => {
    let view = [];
    for (let i = 0; i < 6; i++) {
      view.push(
        <View style={styles.container} key={'ContentBoxNewsLoaderId' + i}>
          <SkeletonPlaceholder
            highlightColor={COLORS.LOADER_FOREGROUND}
            backgroundColor={COLORS.LOADER_BACKGROUND}>
            <SkeletonPlaceholder.Item flexDirection="row">
              <SkeletonPlaceholder.Item
                width={ViewScale(100)}
                height={ViewScale(100)}
                borderRadius={ViewScale(4)}
              />
              <SkeletonPlaceholder.Item flexDirection="column">
                <SkeletonPlaceholder.Item
                  width={ViewScale(120)}
                  height={ViewScale(15)}
                  borderRadius={ViewScale(2)}
                  marginLeft={ViewScale(17)}
                  marginTop={ViewScale(5)}
                />
                <SkeletonPlaceholder.Item
                  marginTop={ViewScale(15)}
                  width={ViewScale(190)}
                  height={ViewScale(10)}
                  borderRadius={ViewScale(2)}
                  marginLeft={ViewScale(17)}
                />
                <SkeletonPlaceholder.Item
                  marginTop={ViewScale(10)}
                  width={ViewScale(140)}
                  height={ViewScale(10)}
                  borderRadius={ViewScale(2)}
                  marginLeft={ViewScale(17)}
                />
                <SkeletonPlaceholder.Item
                  marginTop={ViewScale(15)}
                  width={ViewScale(70)}
                  height={ViewScale(10)}
                  borderRadius={ViewScale(2)}
                  marginLeft={ViewScale(17)}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>,
      );
    }
    return view;
  };

  return renderItem();
};
