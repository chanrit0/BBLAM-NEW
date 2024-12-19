// react
import React from 'react';

// custom
import {View, TouchableOpacity} from 'react-native';
import styles from '../Style';
import {Translate} from 'function';
import {ViewScale} from 'utils';

// global components
import {EmailMessage2} from 'components/Icons/Customs';
import {Container} from 'components/common';
import {TextBold, TextRegular, TextMedium} from 'components/atoms';

// recoil
import {useRecoilValue} from 'recoil';
import {userDeviceStatusState} from 'recoil-state';

export default ({email, onPress}) => {
  const userStatus = useRecoilValue(userDeviceStatusState);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <EmailMessage2 />
        <TextBold style={styles.headerText}>
          {Translate('textCheckPageConfirmEmail2')}
        </TextBold>
        <TextRegular style={[styles.DescText]}>
          {Translate('textCheckPageConfirmEmailBody')}
        </TextRegular>
      </View>
      <View style={{flex: 0, alignItems: 'center'}}>
        <TextBold style={styles.headerText}>{email}</TextBold>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* {!userStatus.isSignIn && ( */}
        <TextRegular style={styles.DescText}>
          {Translate('textCheckPageConfirmEmailDecs')}
        </TextRegular>
        {/* )} */}
      </View>
      <View style={styles.viewResendEmail}>
        <TextRegular style={styles.ResendEmail}>
          {Translate('textResendEmail1')}{' '}
        </TextRegular>
        <View style={styles.viewTouchAgain}>
          <TextRegular>{Translate('textResendEmail1_1')}</TextRegular>
          <TouchableOpacity onPress={onPress}>
            <TextMedium style={styles.ResendEmailPress}>
              {Translate('textResendEmail2')}
            </TextMedium>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewResendEmailRemindMain}>
        <TextRegular style={styles.ResendEmailRemind}>
          {Translate('textResendEmail1Remind')}
        </TextRegular>
        <View style={styles.viewResendEmailRemind}>
          <TextRegular style={styles.ResendEmailRemindDeteil}>
            {Translate('textResendEmail1RemindDeteil1')}
          </TextRegular>
          <TextRegular style={styles.ResendEmailRemindDeteil}>
            {` "${Translate('textResendEmail1RemindDeteil1_1')}" `}
          </TextRegular>
        </View>
        <TextRegular style={styles.ResendEmailRemindDeteil}>
          {Translate('textResendEmail1RemindDeteil2')}
        </TextRegular>
      </View>
    </View>
  );
};
