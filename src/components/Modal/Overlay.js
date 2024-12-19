import React from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import {TextMedium} from 'components/atoms';
import {COLORS} from 'styles';

// Only Send isVisible

export default function OverlayBBLAM({
  children,
  overlayStyle, // style
  containerStyle,
  isVisible = false, // => value , true , false
  onBackdropPress, // กดที่พื้นหลังสีเทา
  ModalComponent,
  backdropStyle, // พื้นหลัง
  fullscreen, // เต็มจอ (ไม่ได้ใช้)

  callbackConfirm, // callback เมื่อกด ยืนยัน
  title = '',
}) {
  return (
    <Overlay
      overlayStyle={[styles.OverlayStyle, overlayStyle]}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      ModalComponent={ModalComponent}
      backdropStyle={[styles.backdropStyle, {backdropStyle}]}
      fullScreen={fullscreen}>
      <View style={[styles.OverlayContainer, containerStyle]}>{children}</View>
      <TouchableOpacity style={styles.fillButton} onPress={callbackConfirm}>
        <TextMedium style={styles.textButtonConfirm}>
          {title === '' ? Translate('textConfirm') : title}
        </TextMedium>
      </TouchableOpacity>
    </Overlay>
  );
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  backdropStyle: {
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.6,
  },
  OverlayContainer: {
    width: window.width - ViewScale(40),
    padding: ViewScale(20),
  },
  OverlayStyle: {
    padding: 0,
    borderRadius: 0,
    margin: ViewScale(30),
  },
  fillButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ViewScale(15),
    display: 'flex',
    alignItems: 'center',
  },
  textButtonConfirm: {
    color: 'white',
  },
});
