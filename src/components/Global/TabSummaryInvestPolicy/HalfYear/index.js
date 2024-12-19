/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { View } from 'react-native';
import { ListThatCanWatchPDF } from 'components/Global/ListThatCanWatchPDF';
import { FileManager } from 'utils';
import { userInfoState } from 'recoil-state';
import { useRecoilValue } from 'recoil';
import { EmptyData } from 'components/organisms';
import { Translate } from 'function';

export default ({ data }) => {
  // console.log('อันนี้ก็เอาอะไรมา',data[0].id);

  const userInfo = useRecoilValue(userInfoState);

  const Preview = (id, title) => async () => {
    const path =
      userInfo.role === 'member'
        ? `/member/pdf/fund/select?id=${id}`
        : `/committee/pdf/fund/download?id=${id}`;

    await FileManager({
      path: path,
      title: title,
      type: 'preview',
    });
  };

  const Download = (id, title) => async () => {
    const nameFile = data[0].id;
    const path =
      userInfo.role === 'member'
        ? `/member/pdf/fund/download?id=${id}`
        : `/committee/pdf/fund/download?id=${id}`;

    await FileManager({
      path: path,
      title: nameFile,
      type: 'download',
    });
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => (
          <View key={'ListThatCanWatchPDFId-' + index}>
            <ListThatCanWatchPDF
              title={item.ds_name}
              previewCallback={Preview(item.id, item.ds_name)}
              downloadCallback={Download(item.id, item.ds_name)}
            />
          </View>
        ))
      ) : (
        <EmptyData title={Translate('textNoData')} />
      )}
    </>
  );
}
