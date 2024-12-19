// React
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {ViewScale} from 'utils';

// components
import Button from './Button';

// lib
import {COLORS, SPACING} from 'styles';

export default function ScrollableTabView(props) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const {children} = props;
  const scrollRef = React.useRef(null);

  const _onPress = index => {
    setCurrentPage(index);
    scrollRef?.current?.scrollToIndex({
      index: index,
      viewOffset: SPACING.CONTAINER_MARGIN_HORIZONTAL,
      animated: true,
    });
  };

  return (
    <>
      <View style={styles.rootScroll}>
        <FlatList
          data={children}
          keyExtractor={(item, index) => 'itemBox-' + index}
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: 0,
            paddingHorizontal: SPACING.CONTAINER_MARGIN_HORIZONTAL,
          }}
          style={{paddingVertical: ViewScale(10)}}
          {...props}
          renderItem={({item, index}) => {
            const {label, width} = item?.props;
            return (
              <Button
                label={label}
                onPress={_onPress}
                value={currentPage}
                id={index}
                width={width}
              />
            );
          }}
        />
      </View>

      {children.map((item, index) => {
        if (currentPage === index) {
          return (
            <View key={'ChildrenRouteSceneId-' + index} style={styles.scene}>
              {item}
            </View>
          );
        }
      })}
    </>
  );
}

const styles = StyleSheet.create({
  rootScroll: {
    flexDirection: 'row',
    backgroundColor: COLORS.GRAY,
  },
  scene: {
    flex: 1,
  },
});
