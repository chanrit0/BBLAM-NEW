import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Ionicons} from 'components/Icons';
import {SafeAreaView, TextRegular, TextMedium} from 'components/atoms';
import {Container} from 'components/common';
import {FontScale, isTablet, ViewScale} from 'utils';
import {COLORS, FONT_SIZE, FONT_TYPE, SPACING} from 'styles';
import {Row, Table} from 'react-native-table-component';

export default ({navigation, route}) => {
  const data = route.params?.data;

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Container style={{flex: 0}}>
        <View style={styles.headerContainer}>
          <View style={{position: 'absolute', zIndex: 9}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons
                name="close"
                size={FontScale(30)}
                color={COLORS.PRIMARY}
              />
            </TouchableOpacity>
          </View>
          <TextMedium style={{flex: 1, textAlign: 'center'}}>
            ควบคุมสินทรัพย์การลงทุน
          </TextMedium>
        </View>
      </Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <View>
            <TextRegular style={{marginVertical: ViewScale(20)}}>
              {data?.title}
            </TextRegular>

            <ScrollView horizontal>
              <Table
                style={styles.table}
                borderStyle={{borderWidth: 0.5, borderColor: COLORS.BORDER_1}}>
                <Row
                  data={[
                    'บริษัทจัดการ',
                    'รหัสกองทุนย่อย',
                    `สัดส่วนการลงทุนในสินทรัพย์เสี่ยง${
                      !isTablet ? '\n' : ''
                    }หรือสินทรัพย์ทางเลือก`,
                  ]}
                  style={styles.rowHeader}
                  textStyle={styles.textRowHeader}
                  widthArr={[ViewScale(150), ViewScale(150), ViewScale(300)]}
                />
                {data?.table_1 &&
                  data?.table_1.map((item, index) => {
                    return (
                      <Row
                        key={'Table1Id' + index}
                        data={[item.com_manage, item.sub_code, item.percent]}
                        style={styles.rowContent}
                        widthArr={[
                          ViewScale(150),
                          ViewScale(150),
                          ViewScale(300),
                        ]}
                        textStyle={styles.textRowContent}
                      />
                    );
                  })}
              </Table>
            </ScrollView>
            <TextMedium size={FONT_SIZE.BODY_2}>
              {'การควบคุมสัดส่วนการลงทุนรายสินทรัพย์ และรายสมาชิก'}
            </TextMedium>
            <ScrollView horizontal>
              <Table
                style={styles.table}
                borderStyle={{borderWidth: 0.5, borderColor: COLORS.BORDER_1}}>
                <Row
                  data={[
                    'ประเภทสินทรัพย์',
                    'คำจำกัดความ',
                    `ลงทุนในสินทรัพย์ประเภทเดียวกัน\nในทุกกองทุนย่อยรวมกันต้องไม่เกิน XX% \nของเงินกองทุนของท่าน`,
                  ]}
                  style={styles.rowHeader}
                  textStyle={styles.textRowHeader}
                  widthArr={[ViewScale(150), ViewScale(150), ViewScale(300)]}
                />
                {data?.table_2 &&
                  data?.table_2.map((item, index) => {
                    return (
                      <Row
                        key={'Table2Id' + index}
                        data={[item.type_asset, item.definition, item.percent]}
                        style={styles.rowContent}
                        textStyle={styles.textRowContent}
                        widthArr={[
                          ViewScale(150),
                          ViewScale(150),
                          ViewScale(300),
                        ]}
                      />
                    );
                  })}
              </Table>
            </ScrollView>
            {data?.type == 'group' && (
              <>
                <TextMedium size={FONT_SIZE.BODY_2}>
                  {'การควบคุมสัดส่วนการลงทุนกลุ่มสินทรัพย์รายสมาชิก'}
                </TextMedium>
                <ScrollView horizontal>
                  <Table
                    style={styles.table}
                    borderStyle={{
                      borderWidth: 0.5,
                      borderColor: COLORS.BORDER_1,
                    }}>
                    <Row
                      data={[
                        'รหัสกลุ่มสินทรัพย์',
                        'ประเภทสินทรัพย์',
                        'คำจำกัดความ',
                        `ลงทุนในสินทรัพย์ประเภทเดียวกัน\nในทุกกองทุนย่อยรวมกันต้องไม่เกิน XX% \nของเงินกองทุนของท่าน`,
                      ]}
                      style={styles.rowHeader}
                      textStyle={styles.textRowHeader}
                      widthArr={[
                        ViewScale(150),
                        ViewScale(250),
                        ViewScale(150),
                        ViewScale(300),
                      ]}
                    />
                    {data?.table_3 &&
                      data?.table_3.map((item, index) => {
                        return (
                          <Row
                            key={'Table2Id' + index}
                            data={[
                              item.asset_code,
                              item.type_asset,
                              item.definition,
                              item.max_percent,
                            ]}
                            style={styles.rowContent}
                            textStyle={styles.textRowContent}
                            widthArr={[
                              ViewScale(150),
                              ViewScale(250),
                              ViewScale(150),
                              ViewScale(300),
                            ]}
                          />
                        );
                      })}
                  </Table>
                </ScrollView>
              </>
            )}
            <TextRegular size={FONT_SIZE.BODY_2}>
              <TextMedium size={FONT_SIZE.BODY_2}>หมายเหตุ </TextMedium>
              สำหรับการเปลี่ยนทางเลือกการลงทุนใหม่
              บริษัทจัดการจะดำเนินการให้ในวันคำนวณจำนวนหน่วยที่ใกล้ที่สุด
              เมื่อบริษัทจัดการได้รับเงินสะสม เงินสมทบ
              พร้อมข้อมูลที่ครบถ้วนถูกต้อง
              หากเงินลงทุนของท่านมีสัดส่วนการลงทุนในสินทรัพย์เสี่ยง หรือ
              สินทรัพย์ทางเลือกเกินอัตราส่วนที่กำหนด
              บริษัทจัดการจำเป็นต้องนำเงินลงทุนใหม่ส่วนที่เกินไปลงทุนในกองทุน
              ที่คณะกรรมการกองทุนกำหนดไว้
              เพื่อให้เงินลงทุนของท่านเป็นไปตามสัดส่วนที่กฎหมายกำหนด
            </TextRegular>
          </View>
        </Container>
        <View style={{height: SPACING.FOOTER_HEIGHT}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    marginVertical: ViewScale(20),
  },
  textRowHeader: {
    color: COLORS.WHITE,
    fontFamily: FONT_TYPE.REGULAR,
    fontSize: FONT_SIZE.BODY_2,
    marginHorizontal: ViewScale(10),
    marginVertical: ViewScale(20),
    textAlign: 'center',
  },
  textRowContent: {
    fontSize: FONT_SIZE.BODY_2,
    marginHorizontal: ViewScale(10),
    fontFamily: FONT_TYPE.REGULAR,
  },
  rowHeader: {
    backgroundColor: COLORS.PRIMARY,
  },
  rowContent: {
    height: ViewScale(60),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ViewScale(60),
  },
  textHeader: {
    fontSize: FontScale(24),
    textAlign: 'center',
    flex: 1,
  },
});
