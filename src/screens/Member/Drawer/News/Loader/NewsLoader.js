import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ViewScale} from 'utils';
import {Container} from 'components/common';
import styles from '../Style';

const NewsLoader = () => {
  return (
    <Container style={{flex: 0, paddingVertical: ViewScale(10)}}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item
            width={ViewScale(120)}
            height={ViewScale(100)}
            borderRadius={ViewScale(2)}
          />
          <SkeletonPlaceholder.Item marginLeft={ViewScale(5)}>
            <SkeletonPlaceholder.Item
              width={ViewScale(130)}
              height={ViewScale(20)}
              borderRadius={ViewScale(2)}
            />
            <SkeletonPlaceholder.Item
              width={ViewScale(110)}
              height={ViewScale(20)}
              marginTop={ViewScale(10)}
              borderRadius={ViewScale(2)}
            />
            <SkeletonPlaceholder.Item
              width={ViewScale(100)}
              height={ViewScale(20)}
              marginTop={ViewScale(10)}
              borderRadius={ViewScale(2)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={ViewScale(100)}
            height={ViewScale(20)}
            marginTop={ViewScale(10)}
            borderRadius={ViewScale(2)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Container>
  );
};

export default NewsLoader;
