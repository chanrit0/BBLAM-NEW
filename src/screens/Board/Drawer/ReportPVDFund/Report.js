// React
import React from 'react';
import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
// custom
import {FileManager, setSpinner, ViewScale} from 'utils';
// components
import {Container} from 'components/common';
import {Picker, TextMedium} from 'components/atoms';
import {ListThatCanWatchPDF} from 'components/Global/ListThatCanWatchPDF';
// lib
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import dayjs from 'dayjs';
import _ from 'lodash';
import {COLORS, SPACING} from 'styles';
import HomeHeaderOnly from 'components/header/HomeHeaderOnly';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ServerErrorPage from 'screens/Global/ServerErrorPage';

export default function Report({
  title,
  dataYear,
  data,
  calldataapi,
  isServerError,
}) {
  const {bottom} = useSafeAreaInsets();

  const Download = (id, title) => async () => {
    await FileManager({
      path: `/committee/document/pdf_doc/down?id=${id}`,
      title: title,
      type: 'download',
    });
  };

  const Preview = (id, title) => async () => {
    await FileManager({
      path: `/committee/document/pdf_doc/down?id=${id}`,
      title: title,
      type: 'preview',
    });
  };

  const renderContent = (item, index) => {
    return (
      <View key={'Report11Id' + index}>
        <ListThatCanWatchPDF
          title={item.doc_name}
          downloadCallback={Download(item.doc_path_download, item.doc_name)}
          date={item.created_at}
          previewCallback={Preview(item.doc_path_show, item.doc_name)}
        />
      </View>
    );
  };

  const handleOnRefreshServerError = () => {
    setSpinner(true);
    calldataapi().finally(() => setSpinner(false));
  };

  React.useEffect(() => {
    return () => {
      setSpinner(false);
    };
  }, []);

  return (
    <>
      <HomeHeaderOnly isBackIcon title={title}>
        <Header dataYear={dataYear} calldataapi={calldataapi} />
      </HomeHeaderOnly>
      {isServerError ? (
        <ServerErrorPage onPress={handleOnRefreshServerError} />
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottom + SPACING.FOOTER_HEIGHT,
          }}
          keyExtractor={(item, index) => 'report11Id' + index}
          renderItem={({item, index}) => renderContent(item, index)}
          ListEmptyComponent={data.length <= 0 && <EmptyData />}
        />
      )}
    </>
  );
}

function EmptyData() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ViewScale(20),
      }}>
      <TextMedium color={COLORS.THIRDARY}>ไม่พบข้อมูล</TextMedium>
    </View>
  );
}

function Header({dataYear, calldataapi}) {
  dayjs.locale('th');
  const [year, setYear] = React.useState('');
  const [month, setMonth] = React.useState('');

  const convertYear = dataYear.map(item => ({
    label: item.year,
    value: item.year,
  }));
  const convertMonth = Array(12)
    .fill(0)
    .map((item, index) => ({
      label: dayjs().month(index).format('MMMM'),
      value: dayjs().month(index).format('MM'),
    }));

  React.useEffect(() => {
    calldataapi({year, month});
  }, [year, month]);

  return (
    <View style={styles.rootHeader}>
      <Container style={styles.headerPickerContainer}>
        <View style={styles.flexRowAlignItems}>
          <TextMedium color={COLORS.WHITE} style={styles.titlePicker}>
            {'ปี'}
          </TextMedium>
          <View style={styles.pickerContainer}>
            <Picker
              containerStyle={styles.pickerStyle}
              placeholder={'ระบุปี'}
              inputContainer={{borderWidth: 0}}
              pickerStyle={{color: '#FFF'}}
              textStyle={styles.pickerTextStyle}
              iconStyle={{color: '#FFF'}}
              items={convertYear}
              onValueChange={setYear}
              value={year}
            />
          </View>
        </View>
        <View style={styles.flexRowAlignItems}>
          <TextMedium color={'#FFF'} style={styles.titlePicker}>
            {'เดือน'}
          </TextMedium>
          <View style={styles.pickerContainer}>
            <Picker
              containerStyle={styles.pickerStyle}
              inputContainer={{borderWidth: 0}}
              pickerStyle={{color: '#FFF'}}
              placeholder={'ระบุเดือน'}
              iconStyle={{color: '#FFF'}}
              textStyle={styles.pickerTextStyle}
              items={convertMonth}
              onValueChange={setMonth}
              value={month}
            />
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyDataText: {
    color: COLORS.THIRDARY,
  },
  rootHeader: {
    marginBottom: ViewScale(10),
  },
  flexRowAlignItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titlePicker: {
    marginRight: ViewScale(20),
  },
  headerPickerContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: ViewScale(20),
  },
  pickerContainer: {
    width: wp(30),
  },
  pickerStyle: {
    backgroundColor: 'rgba(111,133,195,0.26)',
    borderWidth: 0,
  },
  pickerTextStyle: {
    color: '#FFF',
  },
});
