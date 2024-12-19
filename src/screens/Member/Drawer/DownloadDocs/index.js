/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import {View, Platform, FlatList} from 'react-native';

// custom
import Header from 'components/header/HomeHeaderOnly';
import {Translate} from 'function';
import {FileManager, FontScale, setSpinner, ViewScale} from 'utils';
import {Container} from 'components/common';
import {
  ActivityIndicator,
  KeyboardDismiss,
  SafeAreaView,
  SearchBar, 
} from 'components/atoms';
import {AntDesign} from 'components/Icons';

// lib 

// data
import {COLORS} from 'styles';
import {getDownloadDocs} from 'services/api/member';
import _ from 'lodash';
import {FETCH_DATA_DELAY} from 'config';
import {EmptyData} from 'components/organisms';
import {ListThatCanWatchPDF} from 'components/Global/ListThatCanWatchPDF';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function DownloadDocs() {
  const [apiData, setApiData] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);

  const callapi = async search => {
    await getDownloadDocs({search})
      .then(response => {
        if (response.status === 'success') {
          setApiData(response.data);
          setIsServerError(false);
        } else {
          throw response;
        }
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const handleOnSearch = _.debounce(search => {
    setIsSearching(true);
    callapi(search).finally(() => setIsSearching(false));
  }, FETCH_DATA_DELAY);

  const _Download = data => () => {
    if (Platform.OS === 'android') {
      FileManager({
        path: `/member/document/pdf_doc/down?id=${data.id}`,
        title: data.title.substring(0, 85),
        type: 'download',
      });
    } else {
      FileManager({
        path: `/member/document/pdf_doc/down?id=${data.id}`,
        type: 'download',
        title: data.title,
      });
    }
  };

  const _Preview = data => () => {
    if (Platform.OS === 'android') {
      FileManager({
        path: `/member/document/pdf_doc/down?id=${data.id}`,
        title: data.title.substring(0, 85),
        type: 'preview',
      });
    } else {
      FileManager({
        path: `/member/document/pdf_doc/down?id=${data.id}`,
        type: 'preview',
        title: data.title,
      });
    }
  };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <ListThatCanWatchPDF
        title={item.doc_name}
        downloadCallback={_Download({
          title: item.doc_name,
          id: item.doc_path_download,
        })}
        previewCallback={_Preview({
          title: item.doc_name,
          id: item.doc_path_download,
        })}
        downloadIcon={
          <AntDesign
            name="download"
            color={COLORS.PRIMARY}
            size={FontScale(22)}
          />
        }
      />
    );
  };

  const keyExtractor = (key, i) => 'documentMemberId-' + i;
  const handleOnRefreshServerError = () => {
    setSpinner(true);
    callapi().finally(() => setSpinner(false));
  };

  return (
    <SafeAreaView noTop>
      <KeyboardDismiss style={{flex: 0}}>
        <Header isBackIcon={true} title={Translate('textDownloadDocs')}>
          <Container style={{flex: 0}}>
            <SearchBar onChangeText={handleOnSearch} />
          </Container>
        </Header>
      </KeyboardDismiss>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <>
          {!isSearching ? (
            <FlatList
              data={apiData}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={
                <EmptyData title={Translate('textNotFoundData')} />
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
