/* eslint-disable react-hooks/rules-of-hooks */
// React
import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';

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
  TextRegular,
} from 'components/atoms';

import styles from './Style';
import {AntDesign} from 'components/Icons';

// lib
import {ListItem} from 'react-native-elements';

// data
import {COLORS, SPACING} from 'styles';

import _, {set} from 'lodash';
import {FETCH_DATA_DELAY} from 'config';
import {EmptyData} from 'components/organisms';
import {getDownloadDocsCommittee} from 'services/api/committee';
import {ListThatCanWatchPDF} from 'components/Global/ListThatCanWatchPDF';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function DownloadDocs() {
  const [apiData, setApiData] = React.useState([]);
  const [onSearch, setOnSearch] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);

  const callapi = async search => {
    await getDownloadDocsCommittee({search})
      .then(response => {
        if (response.status === 'success') {
          setApiData(response.data);
        } else {
          throw response;
        }
        setIsServerError(false);
      })
      .catch(error => {
        setIsServerError(true);
        console.log(error);
      });
  };

  const handleOnSearch = _.debounce(search => {
    setOnSearch(true);
    callapi(search).finally(() => setOnSearch(false));
  }, FETCH_DATA_DELAY);

  const _Download =
    ({id, title, filetype}) =>
    async () => {
      if (Platform.OS === 'android') {
        await FileManager({
          path: `/committee/document/pdf_doc/down?id=${id}`,
          title: title.substring(0, 85),
          type: 'download',
          filetype,
        });
      } else {
        await FileManager({
          path: `/committee/document/pdf_doc/down?id=${id}`,
          title: title,
          type: 'download',
          filetype,
        });
      }
    };

  const _Preview =
    ({id, title, filetype}) =>
    async () => {
      if (Platform.OS === 'android') {
        await FileManager({
          path: `/committee/document/pdf_doc/down?id=${id}`,
          title: title.substring(0, 85),
          type: 'preview',
          filetype,
        });
      } else {
        await FileManager({
          path: `/committee/document/pdf_doc/down?id=${id}`,
          title: title,
          type: 'preview',
          filetype,
        });
      }
    };

  React.useEffect(() => {
    setSpinner(true);
    callapi().finally(() => {
      setSpinner(false);
    });

    return () => {
      setSpinner(false);
    };
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <ListThatCanWatchPDF
        title={item.doc_name}
        downloadCallback={_Download({
          title: item.doc_name,
          id: item.doc_path_download,
          filetype: item.file_type,
        })}
        previewCallback={_Preview({
          title: item.doc_name,
          id: item.doc_path_download,
          filetype: item.file_type,
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

  const keyExtractor = (key, i) => 'documentCommitteeId-' + i;

  const handleOnRefresh = () => {
    setRefreshing(true);
    callapi().finally(() => setRefreshing(false));
  };

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
          {onSearch ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              data={apiData}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleOnRefresh}
                />
              }
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: SPACING.FOOTER_HEIGHT}}
              ListEmptyComponent={
                <EmptyData title={Translate('textNotFoundData')} />
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
