import { AntDesign } from 'components/Icons';
import { TextBold, TextMedium, TextRegular } from 'components/atoms';
import { Translate } from 'function';
import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Dimensions,
  ScrollView,
} from 'react-native';
import { COLORS, FONT_SIZE } from 'styles';
import { FontScale, ViewScale } from 'utils';
import { Fontisto } from 'components/Icons';
import RenderHtml from 'react-native-render-html';
import TableRenderer, { tableModel } from '@native-html/table-plugin';
import WebView from 'react-native-webview';
import _ from 'lodash';

export const AlertDoSuccess = title => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(35),
    }}>
    <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {Translate('textSuccess')}
    </TextBold>
  </View>
);

export const AlertSuccess = title => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(35),
    }}>
    <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {title}
    </TextBold>
  </View>
);

export const AlertFailed = (title, detail) => (
  <View style={{ paddingVertical: ViewScale(35), alignItems: 'center' }}>
    <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
    <View style={{ paddingHorizontal: ViewScale(20) }}>
      <TextMedium style={{ marginTop: ViewScale(20), textAlign: 'center' }}>
        {title}
      </TextMedium>
      {!_.isEmpty(detail) && (
        <TextRegular style={{ marginTop: ViewScale(10), textAlign: 'center' }}>
          {detail}
        </TextRegular>
      )}
    </View>
  </View>
);

export const AlertHTML = data => {
  const systemFonts = ['Upload-Medium', 'Upload-Light'];
  const width = Dimensions.get('window').width;

  return (
    <View
      style={{
        width: '100%',
        paddingVertical: ViewScale(35),
      }}>
      <AntDesign
        name="closecircle"
        color={COLORS.ERROR}
        size={FontScale(50)}
        style={{ alignSelf: 'center' }}
      />
      <RenderHtml
        contentWidth={width * 0.85}
        source={data}
        systemFonts={systemFonts}
        tagsStyles={{
          div: { fontSize: FONT_SIZE.BODY_1 },
          td: { justifyContent: 'center' },
        }}
      />
    </View>
  );
};

export const AlertRiskProfile = (title, detail) => (
  <View style={{ paddingVertical: ViewScale(35), alignItems: 'center' }}>
    <Image source={require('assets/icons/list.png')} />
    <View style={{ paddingHorizontal: ViewScale(20) }}>
      <TextMedium color={COLORS.THIRDARY} style={{ textAlign: 'center' }}>
        {title}
      </TextMedium>
      {!_.isEmpty(detail) && (
        <TextRegular
          color={COLORS.THIRDARY}
          style={{ marginTop: ViewScale(10), textAlign: 'center' }}>
          {detail}
        </TextRegular>
      )}
    </View>
  </View>
);

export const AlertWarning = (title, detail) => (
  <View style={{ paddingVertical: ViewScale(35), alignItems: 'center' }}>
    <AntDesign
      name="exclamationcircle"
      color={COLORS.ERROR}
      size={FontScale(50)}
    />
    <View style={{ paddingHorizontal: ViewScale(20) }}>
      <TextMedium style={{ marginTop: ViewScale(20), textAlign: 'center' }}>
        {title}
      </TextMedium>
      {!_.isEmpty(detail) && (
        <TextRegular style={{ marginTop: ViewScale(10), textAlign: 'center' }}>
          {detail}
        </TextRegular>
      )}
    </View>
  </View>
);

export const AlertWarningAge = (title, detail) => (
  <View style={{ paddingVertical: ViewScale(35), alignItems: 'center' }}>
    <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
    <TextMedium style={{ marginTop: ViewScale(20), textAlign: 'center' }}>
      {Translate('textErroneous')}
    </TextMedium>
    <View style={{ paddingHorizontal: ViewScale(20) }}>
      <TextMedium style={{ marginTop: ViewScale(20), textAlign: 'center' }}>
        {title}
      </TextMedium>
      {!_.isEmpty(detail) && (
        <TextRegular style={{ marginTop: ViewScale(10), textAlign: 'center' }}>
          {detail}
        </TextRegular>
      )}
    </View>
  </View>
);

export const AlertNotLogin = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.PRIMARY} />
      <TextMedium>{Translate('textAlertHeaderLogin_BBLAMONE')}</TextMedium>
      <TextRegular
        style={{
          marginTop: ViewScale(10),
          fontSize: FONT_SIZE.BODY_2,
          color: COLORS.FOURTHDARY,
          textAlign: 'center',
        }}>
        {Translate('textAlertBodyLogin_BBLAMONE')}
      </TextRegular>
    </>
  );
};

export const AlertSessionExpired = () => {
  return (
    <TextBold
      style={{
        textAlign: 'center',
        paddingVertical: ViewScale(30),
        fontSize: FontScale(18),
      }}>
      {Translate('textSessionExpired')}
    </TextBold>
  );
};

export const AlertPasscodeMismatch = () => {
  return AlertFailed('รหัสผ่านไม่ถูกต้อง');
};

export const AlertPleaseLoginAgain = () => (
  <>
    <TextBold
      style={{
        fontSize: FontScale(18),
        textAlign: 'center',
        paddingHorizontal: ViewScale(20),
      }}>
      {'ท่านกรอกรหัสผ่านไม่ถูกต้องเกินกว่าจำนวนที่ระบบกำหนด'}
    </TextBold>
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginVertical: ViewScale(10),
      }}>
      {/* <TextRegular style={{fontSize: FontScale(16), color: '#4c637b'}}>
        {'ท่านได้ระบุผ่านหน้าจอ (Passcode) เกิน 3 ครั้ง'}
      </TextRegular> */}
      <TextRegular style={{ fontSize: FontScale(16), color: '#4c637b' }}>
        {'กรุณาเข้าสู่ระบบใหม่อีกครั้ง'}
      </TextRegular>
    </View>
  </>
);
export const AlertChangeEmailSuccess = () => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(20),
    }}>
    <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {'เปลี่ยนอีเมลสำเร็จ'}
    </TextBold>
  </View>
);

export const AlertVerifyEmailSuccess = () => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(30),
    }}>
    <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {Translate('textVerifyEmailSuccess')}
    </TextBold>
  </View>
);

export const AlertChangePasswordSuccess = () => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(30),
    }}>
    <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {'เปลี่ยนรหัสผ่านสำเร็จ'}
    </TextBold>
  </View>
);

export const AlertChangePasswordFail = ({ message }) => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(30),
    }}>
    <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {'ผิดพลาด'}
    </TextBold>
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {message}
    </TextBold>
  </View>
);

export const AlertLogoutComplete = () => (
  <TextMedium>{Translate('textLogoutComplete')}</TextMedium>
);
export const AlertDeleteComplete = () => (
  <TextMedium>{Translate('textAccountDeletedCus')}</TextMedium>
);
export const AlertLogoutFailed = () => (
  <TextMedium>{Translate('textLogoutFail')}</TextMedium>
);

export const AlertErrorPleaseTryAgain = () => (
  <TextMedium style={{ textAlign: 'center' }}>
    {Translate('textSomethingWentWrong')}
  </TextMedium>
);

export const AlertVerifyPVDSuccess = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: ViewScale(30),
        paddingHorizontal: ViewScale(20),
      }}>
      <AntDesign
        name="checkcircle"
        color={COLORS.SUCCESS}
        size={FontScale(50)}
      />
      <TextBold
        style={{
          marginTop: ViewScale(20),
          textAlign: 'center',
        }}>
        {'ท่านได้เชื่อมต่อข้อมูลกองทุน สำรองเลี้ยงชีพสำเร็จแล้ว'}
      </TextBold>
    </View>
  );
};

export const AlertVerifyPVDEmailSuccess = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: ViewScale(30),
        paddingHorizontal: ViewScale(20),
      }}>
      <AntDesign
        name="checkcircle"
        color={COLORS.SUCCESS}
        size={FontScale(50)}
      />
      <TextBold
        style={{
          marginTop: ViewScale(20),
          textAlign: 'center',
        }}>
        {'ลงทะเบียนสำเร็จ'}
      </TextBold>
      <TextMedium
        style={{
          marginTop: ViewScale(10),
          textAlign: 'center',
        }}>
        {Translate('textAlertBodyLogin_BBLAMONE2')}
      </TextMedium>
    </View>
  );
};

export const AlertVerifySuccess = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: ViewScale(20),
      }}>
      <AntDesign
        name="checkcircle"
        color={COLORS.SUCCESS}
        size={FontScale(50)}
      />
      <TextBold
        style={{
          marginTop: ViewScale(20),
        }}>
        {Translate('textRegisterSuccess')}
      </TextBold>
      <TextRegular
        style={{
          fontSize: FontScale(18),
          marginTop: ViewScale(10),
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
        }}>
        {Translate('textAlertBodyLogin_BBLAMONE')}
      </TextRegular>
    </View>
  );
};

export const AlertVerifyMemberSuccess = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: ViewScale(20),
      }}>
      <AntDesign
        name="checkcircle"
        color={COLORS.SUCCESS}
        size={FontScale(50)}
      />
      <TextBold
        style={{
          marginTop: ViewScale(20),
        }}>
        {Translate('textRegisterSuccess')}
      </TextBold>
      <TextRegular
        style={{
          fontSize: FontScale(18),
          marginTop: ViewScale(10),
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
        }}>
        {Translate('textAlertBodyLogin_BBLAMONE_MEMBER')}
      </TextRegular>
    </View>
  );
};

export const AlertWrongOTP = ({ text }) => {
  return (
    <View style={{ paddingVertical: ViewScale(30), alignItems: 'center' }}>
      <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
      <TextMedium style={{ marginTop: ViewScale(20) }}>
        {'รหัส OTP ไม่ถูกต้อง'}
      </TextMedium>
    </View>
  );
};

export const AlertVerifyFailed = () => (
  <View style={{ paddingVertical: ViewScale(30), alignItems: 'center' }}>
    <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
    <TextMedium style={{ marginTop: ViewScale(20) }}>
      {'ยืนยันตัวตนไม่สำเร็จ'}
    </TextMedium>
  </View>
);

export const AlertNotFoundForgotUsername = () => (
  <View style={{ paddingVertical: ViewScale(30), alignItems: 'center' }}>
    <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
    <TextMedium style={{ marginTop: ViewScale(20) }}>{'ไม่พบข้อมูล'}</TextMedium>
  </View>
);

export const AlertNotFoundDataRefCodeMemberNotLogin = testMessage => {
  return (
    <View
      style={{
        marginVertical: ViewScale(30),
        marginHorizontal: ViewScale(15),
        alignItems: 'center',
      }}>
      <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
      <TextMedium
        size={FONT_SIZE.TITLE_1}
        style={{ textAlign: 'center', marginTop: ViewScale(10) }}>
        {'ผิดพลาด'}
      </TextMedium>
      <TextRegular
        size={FONT_SIZE.BODY_2}
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {testMessage?.testMessage}
      </TextRegular>
    </View>
  );
};

export const AlertNotFoundDataRefCodeMember = () => {
  return (
    <View
      style={{
        marginVertical: ViewScale(40),
        marginHorizontal: ViewScale(15),
      }}>
      <TextMedium style={{ textAlign: 'center' }}>
        {Translate('textPVDConnectNotFoundDataTitleMember')}
      </TextMedium>
      <TextRegular
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {Translate('textPVDConnectNotFoundDataDescMember')}
      </TextRegular>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: ViewScale(5),
        }}>
        <AntDesign
          name={'setting'}
          color={COLORS.PRIMARY}
          size={FontScale(35)}
        />
        <TextMedium style={{ marginLeft: ViewScale(10) }} color={COLORS.PRIMARY}>
          Account Settings
        </TextMedium>
      </View>
    </View>
  );
};

export const AlertNotFoundDataRefCodeMemberOnlyPhone = () => {
  return (
    <View
      style={{
        marginVertical: ViewScale(40),
        marginHorizontal: ViewScale(15),
      }}>
      <TextMedium style={{ textAlign: 'center' }}>
        {
          'ระบบตรวจสอบพบ หมายเลขโทรศัพท์มือถือที่ได้ลงทะเบียนไว้กับนายจ้างของกองทุนสำรองเลี้ยงชีพของท่าน ไม่ตรงกับข้อมูลที่ได้ลงทะเบียน BBLAM Account ไว้'
        }
      </TextMedium>
      <TextRegular
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {
          'หากท่านประสงค์ใช้งานกรุณาติดต่อคณะกรรมการกองทุนฯ ประจำบริษัทของท่านเพื่อเปลี่ยนข้อมูล ให้ตรงกับที่ลงทะเบียนกับ BBLAM Account'
        }
      </TextRegular>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: ViewScale(5),
        }}>
        <AntDesign
          name={'setting'}
          color={COLORS.PRIMARY}
          size={FontScale(35)}
        />
        <TextMedium style={{ marginLeft: ViewScale(10) }} color={COLORS.PRIMARY}>
          Account Settings
        </TextMedium>
      </View>
    </View>
  );
};

export const AlertNotFoundDataRefCodeFundMember = () => {
  return (
    <View
      style={{
        marginVertical: ViewScale(40),
        marginHorizontal: ViewScale(15),
      }}>
      <TextMedium style={{ textAlign: 'center' }}>
        {Translate('textPVDConnectNotFoundDataTitleComittee')}
      </TextMedium>
      <TextRegular
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {Translate('textPVDConnectNotFoundDataDescComittee')}
      </TextRegular>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: ViewScale(5),
        }}>
        <AntDesign
          name={'setting'}
          color={COLORS.PRIMARY}
          size={FontScale(35)}
        />
        <TextMedium style={{ marginLeft: ViewScale(10) }} color={COLORS.PRIMARY}>
          Account Settings
        </TextMedium>
      </View>
    </View>
  );
};

export const AlertAlreadyUseRefCode = () => {
  return (
    <View
      style={{
        marginVertical: ViewScale(40),
        marginHorizontal: ViewScale(15),
      }}>
      <TextMedium style={{ textAlign: 'center' }}>
        {'ขออภัยรหัสอ้างอิงของท่านได้ถูกใช้งานไปแล้ว'}
      </TextMedium>
      <TextRegular
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {
          'โปรดเข้าสู่ระบบด้วย อีเมลหรือหมายเลขโทรศัพท์มือถือ ที่ได้ลงทะเบียนไว้'
        }
      </TextRegular>
    </View>
  );
};

export const AlertNotFoundDataRefCodeCommitteeNotLogin = testMessage => {
  return (
    <View
      style={{
        marginVertical: ViewScale(30),
        marginHorizontal: ViewScale(15),
        alignItems: 'center',
      }}>
      <AntDesign name="closecircle" color={COLORS.ERROR} size={FontScale(50)} />
      <TextMedium
        size={FONT_SIZE.TITLE_1}
        style={{ textAlign: 'center', marginTop: ViewScale(10) }}>
        {'ผิดพลาด'}
      </TextMedium>
      <TextRegular
        size={FONT_SIZE.BODY_2}
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {testMessage?.testMessage}
      </TextRegular>
    </View>
  );
};

export const AlertNotFoundDataRefCode = () => {
  return (
    <View
      style={{
        marginVertical: ViewScale(40),
        marginHorizontal: ViewScale(15),
      }}>
      <TextMedium style={{ textAlign: 'center' }}>
        {Translate('textPVDConnectNotFoundDataTitle')}
      </TextMedium>
      <TextRegular
        style={{
          textAlign: 'center',
          color: COLORS.FOURTHDARY,
          marginTop: ViewScale(15),
        }}>
        {Translate('textPVDConnectNotFoundDataDesc')}
      </TextRegular>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: ViewScale(5),
        }}>
        <AntDesign
          name={'setting'}
          color={COLORS.PRIMARY}
          size={FontScale(35)}
        />
        <TextMedium style={{ marginLeft: ViewScale(10) }} color={COLORS.PRIMARY}>
          Account Settings
        </TextMedium>
      </View>
    </View>
  );
};

export const AlertCheckYourEmail = ({ typeForgot }) => (
  <View
    style={{
      alignItems: 'center',
      marginVertical: ViewScale(30),
    }}>
    {/* <TextMedium style={{marginBottom: ViewScale(10)}}>
      {'โปรดตรวจสอบอีเมลของท่าน'}
    </TextMedium> */}
    {/* <Fontisto name={'email'} color={COLORS.PRIMARY} size={FontScale(50)} /> */}
    <TextMedium textAlign={'center'} color={COLORS.PRIMARY}>
      {typeForgot == 'email'
        ? 'ลิงก์รีเซ็ตรหัสผ่านจะถูกส่งไปยังอีเมล'
        : 'รหัส OTP จะถูกส่งไปยังหมายเลขโทรศัพท์'}
    </TextMedium>
    <TextMedium color={COLORS.PRIMARY}>
      {typeForgot == 'email' ? 'หากมีบัญชีอยู่ในระบบ' : 'หากมีบัญชีอยู่ในระบบ'}
    </TextMedium>
  </View>
);

export const AlertChangeInfoCommitteeSuccess = () => (
  <View
    style={{
      alignItems: 'center',
      paddingVertical: ViewScale(35),
    }}>
    <AntDesign name="checkcircle" color={COLORS.SUCCESS} size={FontScale(50)} />
    <TextBold
      style={{
        marginTop: ViewScale(20),
      }}>
      {'เเจ้งเปลี่ยนแปลงข้อมูลสำเร็จ'}
    </TextBold>
    <TextRegular
      size={FONT_SIZE.BODY_2}
      style={{
        marginTop: ViewScale(10),
        textAlign: 'center',
        paddingHorizontal: ViewScale(10),
      }}>
      {
        'การเเจ้งเปลี่ยนแปลงดังกล่าว\nจะมีผลเมื่อบลจ.บัวหลวง ได้ดำเนินการและ\nแจ้งผลการดำเนินการให้ท่านทราบทาง Email แล้ว'
      }
    </TextRegular>
  </View>
);

export const AlertChangeInfoCommitteeFailed = () =>
  AlertFailed('เปลี่ยนแปลงไม่สำเร็จ');

export const AlertChangeInfoCommitteeFailedFile = () =>
  AlertFailed('กรุณาเลือกชนิดไฟล์ PDF');

export const AlertNotAvaliable = () => {
  return (
    <View>
      <TextMedium>{'ขออภัย ระบบยังไม่เปิดให้บริการ'}</TextMedium>
    </View>
  );
};

export const AlertLifePath04 = ({ message, onPress }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TextMedium
        color={COLORS.THIRDARY}
        style={{
          textAlign: 'center',
        }}>
        {message}
      </TextMedium>
      <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center' }}>
        <TextMedium
          color={COLORS.PRIMARY}
          style={{
            marginTop: ViewScale(10),
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
          {'ข้อมูลสมาชิก'}
        </TextMedium>
      </TouchableOpacity>
    </View>
  );
};

export const AlertLifePathNoBirthday = ({ onPress }) => (
  <View
    style={{
      alignItems: 'center',
    }}>
    <TextMedium
      color={COLORS.THIRDARY}
      style={{
        textAlign: 'center',
      }}>
      {
        'ท่านยังไม่ได้ระบุ วัน/เดือน/ปี พ.ศ. เกิดของท่าน \nกรุณาระบุ วัน/เดือน/ปี พ.ศ. เกิดของท่าน'
      }
    </TextMedium>
    <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center' }}>
      <TextMedium
        color={COLORS.PRIMARY}
        style={{
          marginTop: ViewScale(10),
          textAlign: 'center',
          textDecorationLine: 'underline',
        }}>
        {'ข้อมูลสมาชิก'}
      </TextMedium>
    </TouchableOpacity>
  </View>
);

export const AlertLifePath05 = ({ message, onPress }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <TextMedium
        color={COLORS.THIRDARY}
        style={{
          textAlign: 'center',
        }}>
        {message}
      </TextMedium>
    </View>
  );
};
