import {Container} from 'components/common';
import React from 'react';
import {View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS, SPACING} from 'styles';
import {ViewScale} from 'utils';

export default ({
  widthCircle = ViewScale(50),
  heightCircle = ViewScale(50),
  borderRadiusCircle = ViewScale(25),
  widthSquare = ViewScale(80),
  heightSquare = ViewScale(15),
}) => {
  return (
    <SkeletonPlaceholder
      highlightColor={COLORS.LOADER_FOREGROUND}
      backgroundColor={COLORS.LOADER_BACKGROUND}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between">
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="space-between"
        marginTop={ViewScale(30)}>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          width={wp(25) - SPACING.CONTAINER_MARGIN_HORIZONTAL}>
          <SkeletonPlaceholder.Item
            width={widthCircle}
            height={heightCircle}
            borderRadius={borderRadiusCircle}
          />
          <SkeletonPlaceholder.Item
            width={widthSquare}
            height={heightSquare}
            borderRadius={2}
            marginTop={ViewScale(10)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
