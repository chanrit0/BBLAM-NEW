import React from 'react';
import { View } from 'react-native';
import { ListCumulative } from './ListCumulative';
import { TextRegular } from 'components/atoms';
import { setSpinner, ViewScale } from 'utils';
import { Container } from 'components/common';
import _ from 'lodash';
import { sendCancelDeposit } from 'services/api/member';

export default function Pending({ data, callapi }) {
  const handleCancel = async () => {
    setSpinner(true);
    await sendCancelDeposit({ id: data.id })
      .then(callapi)
      .catch(error => console.log(error))
      .finally(() => setSpinner(false));
  };

  return (
    <View style={{ flex: 1 }}>
      {console.log('data',data)
      }
      {!_.isEmpty(data) && (
        <ListCumulative
          {...data}
          handleCancel={handleCancel}
          type={'pending'}
        />
      )}

      <Container>
        <TextRegular
          color={'#4c637b'}
          style={{
            alignSelf: 'center',
            marginTop: ViewScale(10),
            textAlign: 'center',
          }}>
          {'กรณีต้องการยกเลิก / เปลี่ยนแปลง กรุณาติดต่อกรรมการกองทุน'}
        </TextRegular>
      </Container>
    </View>
  );
}
