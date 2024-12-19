// react
import React from 'react';

// custom
import styles from '../Style';

// global components
import {PhoneMessage} from 'components/Icons/Customs';
import {Container} from 'components/common';
import {TextBold, TextRegular} from 'components/atoms';
import {Translate} from 'function';

export default ({phonenumber}) => {
  return (
    <Container style={styles.container}>
      <PhoneMessage />
      <TextBold style={styles.headerText}>
        {Translate('textCheckPageOTPTitle')}
      </TextBold>
      <TextRegular style={styles.DescText}>
        {Translate('textCheckPageOTPBody')}
      </TextRegular>

      <TextBold style={styles.headerText}>{phonenumber}</TextBold>
    </Container>
  );
};
