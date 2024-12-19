import {TextLight, TextMedium, TextRegular} from 'components/atoms';
import {Translate} from 'function';
import {ViewScale} from 'utils';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {COLORS, FONT_SIZE, SPACING} from 'styles';
import {MaterialIcons} from 'components/Icons';

export default ({data}) => {
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View
      style={[
        styles.headerTop,
        data.count_change <= 0 && {
          borderBottomWidth: 1,
          borderBottomColor: COLORS.BORDER,
        },
      ]}>
      <TextMedium style={styles.headerTop_text1}>
        {Translate('textChangeFundMainHistoryTitle1')}{' '}
        <TextMedium style={styles.headerTop_textStress}>
          {data.choice_rule}
        </TextMedium>{' '}
        {Translate('textTimes')}
      </TextMedium>
      {data?.date_open_status != 1 && (
        <>
          <TouchableOpacity
            style={{marginTop: ViewScale(10), alignSelf: 'center'}}
            onPress={openModal}>
            <TextRegular
              size={FONT_SIZE.BODY_2}
              color={COLORS.PRIMARY}
              style={{textDecorationLine: 'underline'}}>
              {'การเปลี่ยนแปลงนโยบายการลงทุน มีเงื่อนไข ดังนี้'}
            </TextRegular>
          </TouchableOpacity>
          <ModalComp visible={showModal} onClose={closeModal} data={data} />
        </>
      )}

      {data.count_change > 0 && (
        <TextLight style={styles.headerTop_text2}>
          {`${Translate('textChangeFundMainHistoryTitle2')} ${
            data.count_change
          }/${data.choice_rule} ${Translate('textTimes')}`}
        </TextLight>
      )}
    </View>
  );
};

const ModalComp = ({visible, onClose, data}) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={true} style={{}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
        <View
          style={{
            height: data?.date_open_status == 2 ? '15%' : '55%',
            width: '90%',
            backgroundColor: COLORS.WHITE,
            padding: ViewScale(10),
          }}>
          <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={onClose}>
            <MaterialIcons
              name={'close'}
              size={ViewScale(25)}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
          {data?.date_open_status === 2 ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextMedium size={FONT_SIZE.BODY_2} style={{textAlign: 'center'}}>
                {`สามารถเปลี่ยนทางเลือกได้ปีละ ${data?.choice_rule} ครั้ง\nขณะนี้ท่านได้ทำการเปลี่ยนทางเลือกไปแล้ว ${data?.count_change} ครั้ง`}
              </TextMedium>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}>
              <View style={{alignItems: 'center'}}>
                <TextMedium size={FONT_SIZE.BODY_3}>
                  {'สามารถเปลี่ยนทางเลือก / นโยบายการลงทุนตามช่วงเวลา'}
                </TextMedium>

                {data?.date_open.length > 0 &&
                  data?.date_open.map((item, index) => (
                    <View
                      style={styles.rowContainer}
                      key={'date_openId' + index}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <TextMedium
                          size={FONT_SIZE.BODY_3}
                          style={styles.textcol1}>
                          {`ครั้งที่ ${index + 1}`}
                        </TextMedium>
                        <View style={styles.viewcol2}>
                          <TextRegular
                            size={FONT_SIZE.BODY_3}
                            style={styles.textcol2}>
                            {'ตั้งแต่'}
                          </TextRegular>
                        </View>
                        <TextRegular
                          size={FONT_SIZE.BODY_3}
                          color={COLORS.PRIMARY}
                          style={styles.textcol3}>
                          {item.sw_start}
                        </TextRegular>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <TextRegular
                          size={FONT_SIZE.BODY_3}
                          style={styles.textcol1}>
                          {''}
                        </TextRegular>
                        <View style={styles.viewcol2}>
                          <TextRegular
                            size={FONT_SIZE.BODY_3}
                            style={styles.textcol2}>
                            {'ถึง'}
                          </TextRegular>
                        </View>
                        <TextRegular
                          size={FONT_SIZE.BODY_3}
                          color={COLORS.PRIMARY}
                          style={styles.textcol3}>
                          {item.sw_end}
                        </TextRegular>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <TextRegular
                          size={FONT_SIZE.BODY_3}
                          style={styles.textcol1}>
                          {''}
                        </TextRegular>
                        <View style={styles.viewcol2}>
                          <TextRegular
                            size={FONT_SIZE.BODY_3}
                            style={styles.textcol2}>
                            {'วันที่มีผล'}
                          </TextRegular>
                        </View>
                        <TextRegular
                          size={FONT_SIZE.BODY_3}
                          color={COLORS.PRIMARY}
                          style={styles.textcol3}>
                          {item.sw_do}
                        </TextRegular>
                      </View>
                    </View>
                  ))}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    borderBottomWidth: 1,
    padding: ViewScale(20),
    borderColor: COLORS.BORDER,
  },
  textcol1: {width: ViewScale(80)},
  textcol2: {flex: 1, marginLeft: ViewScale(20)},
  textcol3: {flex: 1, marginRight: ViewScale(0)},
  viewcol2: {flex: 1},
  headerTop: {
    paddingTop: ViewScale(20),
    paddingBottom: ViewScale(10),
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  headerTop_text1: {
    textAlign: 'center',
    fontSize: FONT_SIZE.BODY_2,
  },
  headerTop_textStress: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.BODY_1,
  },
  headerTop_text2: {
    textAlign: 'center',
    // marginLeft: SPACING.CONTAINER_MARGIN_HORIZONTAL,
    marginTop: ViewScale(20),
    color: '#4c637b',
    fontSize: FONT_SIZE.BODY_1,
  },
});
