import { useNavigation } from '@react-navigation/core';
import { TextRegular } from 'components/atoms';
import { AntDesign } from 'components/Icons';
import { ModalbblamoneLink, WatchlistAndPortfolio } from 'config';
import React from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZE, SPACING } from 'styles';
import { ViewScale } from 'utils';

export default ({ children, TouchableBackdrop = false, style, marginBottom }) => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  const offsetYValue = React.useRef(new Animated.Value(0)).current;
  const offsetYInterpolate = offsetYValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(offsetYValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
    ]).start();
  }, []);

  const backdropFunction = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: marginBottom,
      }}>
      <Pressable style={styles.backdrop} onPress={backdropFunction}>
        <View style={styles.container} />
      </Pressable>
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: offsetYInterpolate }],
            opacity: opacityValue,
            bottom: bottom + ViewScale(20),
          },
          style,
        ]}>
        <Content />
      </Animated.View>
    </View>
  );
};

const handlePress = url => async () => {
  const supported = await Linking.canOpenURL(url);

  console.log('supported', supported);
  if (Platform.OS == 'android') {
    await Linking.openURL(url);
  } else {
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log('error Open Url!');
    }
  }
};

const handlePressBFT = url => async () => {
  await Linking.openURL(url).catch(async err => {
    console.log('error openURL', url);
    if (err.code === 'EUNSPECIFIED') {
      if (Platform.OS == 'ios') {
        await Linking.openURL('https://apps.apple.com/th/app/bf-fund-trading/id1596873426');
      } else {
        await Linking.openURL('https://play.google.com/store/apps/details?id=com.settrade.streaming.fundplus.bblam');

      }
    } else {
      console.log(`Can't open ${url} app`);
    }
  });
};

const Content = () => {
  return (
    <View style={styles.content}>
      <View style={styles.contentColumn}>
        <View style={styles.contentButtonTop}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[0])}>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/Bualuang-iBanking.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular style={styles.contentText}>
              {'Bualuang \niBanking'}
            </TextRegular>
          </TouchableOpacity>
        </View>
        <View style={styles.contentButtonTop}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[1])}>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/Bualuang-mBanking.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular style={styles.contentText}>
              {'Bualuang \nmBanking'}
            </TextRegular>
          </TouchableOpacity>
        </View>
        <View style={styles.contentButtonTop}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[2])}>
            <View style={[styles.imageContainer, { height: '60%' }]}>
              <Image
                source={require('assets/images/PVD-Trading.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular
              style={[
                styles.contentText,
                { height: '40%', transform: [{ translateY: ViewScale(-10) }] },
              ]}>
              {'ชื้อขาย \nบัวหลวงร่วมทุน'}
            </TextRegular>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.contentButtonTop}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[3])}>
            {/*onPress={handlePress(WatchlistAndPortfolio[0])}>*/}
        {/* <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/BF-Fund-Trading.png')}
                resizeMode="contain"
                style={styles.image}
              /> */}
        {/* <AntDesign name={'staro'} color={'#1a3686'} size={20} /> */}
        {/* </View>
            <TextRegular style={styles.contentText}>
              {'BF FUND \nTRADING'} */}
        {/* {'Watchlist'} */}
        {/* </TextRegular>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.contentColumn}>
        <View style={styles.contentButtonBottom}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[4])}>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/facebook.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular style={styles.contentText}>
              {'Bualuang \nFund'}
            </TextRegular>
          </TouchableOpacity>
        </View>
        <View style={styles.contentButtonBottom}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[5])}>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/youtube.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular style={styles.contentText}>B-Youtube</TextRegular>
          </TouchableOpacity>
        </View>
        <View style={styles.contentButtonBottom}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[6])}>
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/Question-Circle.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular style={styles.contentText}>HELP</TextRegular>
          </TouchableOpacity>
        </View>
        <View style={styles.contentButtonBottom}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handlePress(ModalbblamoneLink[7])}>
            {/* onPress={handlePressBFT(ModalbblamoneLink[10])}> */}
            <View style={styles.imageContainer}>
              <Image
                source={require('assets/images/Disclaimer.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <TextRegular style={styles.contentText}>DISCLAIMER</TextRegular>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: '50%',
    justifyContent: 'flex-end',
  },
  image: {
    width: ViewScale(50),
  },
  content: { justifyContent: 'space-between', flex: 1 },
  contentColumn: { flexDirection: 'row', height: '50%' },
  contentButtonTop: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
    flex: 1,
  },
  contentText: {
    marginTop: ViewScale(5),
    fontSize: FONT_SIZE.BODY_4,
    textAlign: 'center',
    height: '50%',
  },
  TouchableOpacity: {
    flex: 1,
    alignItems: 'center',
  },
  contentButtonBottom: {
    borderRightWidth: 1,
    borderColor: COLORS.BORDER,
    flex: 1,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  modal: {
    width: '95%',
    minHeight: SPACING.ALERT_HEIGHT + ViewScale(40),
    backgroundColor: '#FFF',
    position: 'absolute',
    borderRadius: 5,
  },
  container: {
    width: '100%',
    height: '100%',
  },
});
