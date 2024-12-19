import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {Container} from 'components/common';
import {
  Button,
  CheckBox,
  SafeAreaView,
  TextRegular,
  TextMedium,
} from 'components/atoms';
import {ViewScale} from 'utils';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {COLORS, FONT_SIZE} from 'styles';
import {IconButton} from 'react-native-paper';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {createIconSetFromFontello} from 'react-native-vector-icons';

export default function AddFund({route}) {
  const items = route.params.items; // default data
  // console.log('items', items);
  const resetList = route.params.resetList; // update data
  const list = route.params.current_list; // current_list
  // console.log('111.111x1111.x11111', list);
  const navigation = useNavigation();
  const [disabled, setDisabled] = React.useState(false);

  const {control, setValue, handleSubmit, watch} = useForm({
    defaultValues: {
      data: items.map((item, index) =>
        list.some(list_item => list_item.sub_code === item.sub_code)
          ? {
              ...item,
              value: list.filter(item1 => item1.sub_code == item.sub_code)[0]
                .value,
              status: true,
            }
          : {...item, status: false},
      ),
    },
  });

  const {fields} = useFieldArray({control, name: 'data'});

  const [isCheckAll, setIsCheckAll] = React.useState(
    items.length === list.length ? true : false,
  );
  // const navigation = useNavigation();

  // // function
  const _CheckAll = () => {
    setIsCheckAll(!isCheckAll);
    fields.forEach((item, index) =>
      setValue(`data.${index}.status`, !isCheckAll),
    );
  };

  React.useEffect(() => {
    const data = watch('data');
    if (data.some((item, index) => item.status === false)) {
      setIsCheckAll(false);
    } else if (data.some((item, index) => item.status === true)) {
      setIsCheckAll(true);
    }

    if (data.every(item => item.status === false)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [watch()]);

  const _Confirm = handleSubmit(
    data => {
      let deleteStatusItems = data.data
        .filter(ele => ele.status !== false)
        .map(ele => {
          delete ele.status;
          return ele;
        });

      resetList(deleteStatusItems);
      navigation.goBack();
    },
    error => {
      console.log(error);
    },
  );

  return (
    <>
      <StatusBar barStyle={'dark-content'} animated />
      <SafeAreaView style={{flex: 1}}>
        <Container>
          {/* header */}
          <View style={styles.headerContainer}>
            <View style={{flex: 1}}>
              <IconButton
                icon="arrow-left"
                color={COLORS.PRIMARY}
                size={ViewScale(30)}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <TextMedium style={styles.textHeader}>{'เพิ่มกองทุน'}</TextMedium>
            <View style={{flex: 1}} />
          </View>

          <View style={{marginTop: ViewScale(30), flex: 1}}>
            {/* checkbox */}
            <FlatList
              data={fields}
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <Controller
                    control={control}
                    defaultValue={false}
                    name={`data.${index}.status`}
                    render={({field: {onChange, value}}) => (
                      <TouchableOpacity
                        style={styles.boxContainer}
                        onPress={() => {
                          onChange(!value);
                        }}>
                        <CheckBox
                          style={styles.checkboxStyle}
                          disabled={true}
                          value={value}
                        />
                        <TextMedium color={COLORS.PRIMARY}>
                          {item.sub_code}
                        </TextMedium>
                      </TouchableOpacity>
                    )}
                  />
                );
              }}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.checkall} onPress={_CheckAll}>
              <CheckBox style={styles.checkboxStyle} value={isCheckAll} />
              <TextRegular>{'เลือกทั้งหมด'}</TextRegular>
            </TouchableOpacity>

            <Button
              title="ตกลง"
              type="fill"
              onPress={_Confirm}
              disabled={disabled}
            />
          </View>
        </Container>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  checkall: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: ViewScale(20),
  },
  footer: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingTop: ViewScale(20),
    marginBottom: ViewScale(20),
  },
  boxContainer: {
    backgroundColor: '#f5f7f8',
    marginBottom: ViewScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    padding: ViewScale(10),
  },
  checkboxStyle: {
    marginRight: ViewScale(15),
    width: ViewScale(18),
    height: ViewScale(18),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: FONT_SIZE.TITLE_1,
    textAlign: 'center',
    flex: 1,
  },
});
