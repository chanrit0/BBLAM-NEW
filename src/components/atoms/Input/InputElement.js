import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

// custom
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {isIOS, ViewScale, FontScale} from 'utils';

// components
import {Ionicons, AntDesign} from 'components/Icons';
import {TextRegular, TextBold} from 'components/atoms';

// lib
import {Input} from 'react-native-elements';
import {Controller} from 'react-hook-form';
import _ from 'lodash';
import {useRecoilValue} from 'recoil';
import {languageState} from 'recoil-state';

export default ({
  ControllerProps,
  InputProps,
  isPassword = false,
  isRequired = false,
  isConfirmPassword = false,
  isShowPasswordGUI = false,
  value = '',
  description = '',
  oldpassword = '',
  watch, // ส่ง watch หากต้องการใช้ Check Password
}) => {
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const isFull = React.useRef(false);
  const lang = useRecoilValue(languageState);

  const {label, errorMessage, ...inputprops} = InputProps;

  /**
   * require {control} -> ControllerProps
   */

  const securePasswordShow = React.useMemo(() => {
    if (isPassword) {
      if (showConfirmPassword) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [showConfirmPassword]);

  const CheckPasswordValid = data => {
    let regexFull =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$%\^\&*\)\(+=._-]).{8,}$/;
    let regexOneUpperCaseEngLetter = /[A-Z]/;
    let regexOneLowerCaseEngLetter = /[a-z]/;
    let regexOneDigit = /[0-9]/;
    let regexOneSpecialCharacter = /[!@#\$%\^\&*\)\(+=._-]/;
    let regexEightLength = /.{8,}/;

    let isPasswordValid = {
      regexFull: regexFull.test(data),
      oneUpperCaseEngLetter: regexOneUpperCaseEngLetter.test(data),
      oneLowerCaseEngLetter: regexOneLowerCaseEngLetter.test(data),
      OneDigit: regexOneDigit.test(data),
      oneSpecialCharacter: regexOneSpecialCharacter.test(data),
      eightLength: regexEightLength.test(data),
      isFull: regexFull.test(data),
    };

    isFull.current = isPasswordValid.isFull;

    return isPasswordValid;
  };

  const _errorMessage = error => {
    if (!errorMessage) {
      if (isFull.current && isPassword && !_.isEmpty(watch)) {
        if (isConfirmPassword && oldpassword !== watch) return error?.message;

        return <AntDesign name="checkcircle" color={COLORS.SUCCESS} />;
      } else {
        return error?.message;
      }
    } else {
      if (Array.isArray(errorMessage)) {
        return errorMessage.map(
          (item, index) => index < errorMessage.length && item + '\n',
        );
      } else {
        return errorMessage;
      }
    }
  };

  const _errorTextColor = () => {
    if (!errorMessage) {
      if (isFull.current && isPassword && !_.isEmpty(watch)) {
        if (isConfirmPassword && oldpassword !== watch) return COLORS.ERROR;

        return COLORS.SUCCESS;
      }
    }
    return COLORS.ERROR;
  };

  const _inputContainerStyle = error => {
    let color;
    if (!errorMessage) {
      if (!_.isEmpty(error?.message)) {
        color = COLORS.ERROR;
      } else {
        if (isFull.current && isPassword) {
          color = COLORS.SUCCESS;
        } else {
          color = null;
        }
      }
    } else {
      color = COLORS.ERROR;
    }

    return {
      borderBottomColor: color,
    };
  };

  if (value) {
    return (
      <Controller
        {...ControllerProps}
        render={({field: {value}}) => (
          <View style={styles.textOnlyContainer}>
            <TextBold
              style={{
                fontWeight: isIOS ? null : 'normal',
                fontFamily: FONT_TYPE.SEMI_BOLD,
                color: COLORS.PRIMARY,
              }}>
              {label}
              {isRequired && (
                <TextBold style={{color: COLORS.ERROR}}>*</TextBold>
              )}
            </TextBold>
            <TextBold color={COLORS.THIRDARY}>{value}</TextBold>
            <TextRegular style={styles.textDesc}>{description}</TextRegular>
          </View>
        )}
      />
    );
  } else {
    return (
      <>
        <Controller
          {...ControllerProps}
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <Input
                ref={ref =>
                  ref &&
                  ref.props &&
                  ref.setNativeProps({
                    style: {fontFamily: FONT_TYPE.REGULAR},
                  })
                }
                label={
                  <TextBold
                    style={{
                      fontWeight: isIOS ? null : 'normal',
                      fontFamily: FONT_TYPE.SEMI_BOLD,
                      color: COLORS.PRIMARY,
                    }}>
                    {label}
                    {isRequired && (
                      <TextBold style={{color: COLORS.ERROR}}>*</TextBold>
                    )}
                  </TextBold>
                }
                inputStyle={{
                  fontSize: FontScale(16),
                  height: SPACING.INPUT_HEIGHT,
                }}
                containerStyle={{paddingHorizontal: 0}}
                onChangeText={v => {
                  return isPassword
                    ? onChange(v.replace(/\s/g, ''))
                    : onChange(v);
                }}
                value={value}
                style={styles.inputRefCode}
                secureTextEntry={securePasswordShow}
                keyboardType={(() => {
                  if (isPassword) {
                    if (isIOS) {
                      return 'ascii-capable';
                    } else {
                      return showConfirmPassword
                        ? 'visible-password'
                        : 'default';
                    }
                  } else {
                    return 'default';
                  }
                })()}
                placeholderTextColor={COLORS.SECONDARY}
                errorStyle={{
                  alignSelf: 'flex-end',
                  textAlign: 'right',
                  fontFamily: FONT_TYPE.REGULAR,
                  fontSize: FontScale(16),
                  color: _errorTextColor(),
                }}
                errorMessage={_errorMessage(error)}
                inputContainerStyle={_inputContainerStyle(error)}
                rightIcon={
                  isPassword && (
                    <Ionicons
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      name={
                        !showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
                      }
                      size={ViewScale(24)}
                      color={COLORS.SECONDARY}
                    />
                  )
                }
                {...inputprops}
              />
            );
          }}
        />

        {!_.isEmpty(watch) &&
          isPassword &&
          PasswordValid(CheckPasswordValid(watch), lang, isShowPasswordGUI)}
      </>
    );
  }
};

const PasswordValid = (data, lang, isShowPasswordGUI) => {
  if (data.isFull) {
    return null;
  } else {
    if (!isShowPasswordGUI) return null;

    return (
      <View
        style={{
          width: '100%',
          height: ViewScale(80),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: ViewScale(15),
        }}>
        <View>
          <Image
            source={
              lang === 'TH'
                ? require('assets/images/eightLength.png')
                : require('assets/images/eightLength_en.png')
            }
            style={styles.imageValidation}
          />
          <View style={styles.iconValid}>
            <AntDesign
              name="checkcircle"
              type="antdesign"
              size={ViewScale(20)}
              color={data.eightLength ? COLORS.SUCCESS : COLORS.SECONDARY}
            />
          </View>
        </View>
        <View>
          <Image
            source={
              lang === 'TH'
                ? require('assets/images/oneUpperCase.png')
                : require('assets/images/oneUpperCase_en.png')
            }
            style={styles.imageValidation}
          />
          <View style={styles.iconValid}>
            <AntDesign
              size={ViewScale(20)}
              name="checkcircle"
              type="antdesign"
              color={
                data.oneUpperCaseEngLetter ? COLORS.SUCCESS : COLORS.SECONDARY
              }
            />
          </View>
        </View>
        <View>
          <Image
            source={
              lang === 'TH'
                ? require('assets/images/oneLowerCase.png')
                : require('assets/images/oneLowerCase_en.png')
            }
            style={styles.imageValidation}
          />
          <View style={styles.iconValid}>
            <AntDesign
              size={ViewScale(20)}
              name="checkcircle"
              type="antdesign"
              color={
                data.oneLowerCaseEngLetter ? COLORS.SUCCESS : COLORS.SECONDARY
              }
            />
          </View>
        </View>
        <View>
          <Image
            source={
              lang === 'TH'
                ? require('assets/images/oneSpecialChar.png')
                : require('assets/images/oneSpecialChar_en.png')
            }
            style={styles.imageValidation}
          />
          <View style={styles.iconValid}>
            <AntDesign
              size={ViewScale(20)}
              name="checkcircle"
              type="antdesign"
              color={
                data.oneSpecialCharacter ? COLORS.SUCCESS : COLORS.SECONDARY
              }
            />
          </View>
        </View>
        <View>
          <Image
            source={
              lang === 'TH'
                ? require('assets/images/oneDigit.png')
                : require('assets/images/oneDigit_en.png')
            }
            style={styles.imageValidation}
          />
          <View style={styles.iconValid}>
            <AntDesign
              size={ViewScale(20)}
              name="checkcircle"
              type="antdesign"
              color={data.OneDigit ? COLORS.SUCCESS : COLORS.SECONDARY}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textOnlyContainer: {
    marginBottom: ViewScale(15),
  },
  textDesc: {
    color: COLORS.FOURTHDARY,
    fontSize: FONT_SIZE.BODY_3,
  },
  inputRefCode: {
    width: '100%',
    height: SPACING.INPUT_HEIGHT,
    fontSize: FONT_SIZE.BODY_2,
    fontFamily: FONT_TYPE.REGULAR,
    // borderWidth: 1,
  },
  errorMessage: {
    textAlign: 'right',
    fontSize: FONT_SIZE.TITLE_1,
    fontFamily: FONT_TYPE.LIGHT,
  },
  imageValidation: {
    height: ViewScale(70),
    width: ViewScale(70),
  },
  iconValid: {
    position: 'absolute',
    top: -3,
    right: -3,
  },
  textLink: {
    color: COLORS.TEXTLINK,
    fontSize: FONT_SIZE.BODY_2,
    textDecorationLine: 'underline',
  },
});
