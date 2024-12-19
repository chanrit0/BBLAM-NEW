import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TouchableRipple } from 'react-native-paper';

export default ({
  style,
  children,
  onSelected,
  date = new Date(), // วันที่เริ่มต้น (ค่าดีฟอลต์คือวันนี้)
  minimumDate, // วันที่ต่ำสุด (สามารถส่งเป็น props)
  maximumDate, // วันที่สูงสุด (สามารถส่งเป็น props)
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date); // ใช้ initialDate เป็นวันที่เริ่มต้น

  // ฟังก์ชันเปิด/ปิด DatePicker
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  // เมื่อยืนยันวันที่ (onConfirm)
  const handleConfirm = (date) => {
    const convertedDate = new Date(
      date.getFullYear() - 543,
      date.getMonth(),
      date.getDate()
    );
    onSelected(convertedDate);
    setSelectedDate(convertedDate);
    toggleDatePicker();
  };

  // ตรวจสอบ minimumDate (ถ้าไม่ระบุให้ใช้วันนี้)
  const minDate = minimumDate ?
    new Date(
      minimumDate.getFullYear() + (Platform.OS === 'android' ? 543 : 0),
      minimumDate.getMonth(),
      minimumDate.getDate()
    ) :
    new Date(
      new Date().getFullYear() + (Platform.OS === 'android' ? 543 : 0),
      new Date().getMonth(),
      new Date().getDate()
    );

  // ตรวจสอบ maximumDate (ถ้าไม่ระบุให้เป็นอีก 10 ปีข้างหน้า)
  const maxDate = maximumDate ?
    new Date(
      maximumDate.getFullYear() + (Platform.OS === 'android' ? 543 : 0),
      maximumDate.getMonth(),
      maximumDate.getDate()
    ) :
    new Date(
      new Date().getFullYear() + 10 + (Platform.OS === 'android' ? 543 : 0),
      new Date().getMonth(),
      new Date().getDate()
    );

  return (
    <View style={style}>
      <TouchableRipple onPress={toggleDatePicker}>
        <>{children}</>
      </TouchableRipple>
      <DatePicker
        modal
        androidVariant="iosClone"
        open={isDatePickerVisible}
        date={
          new Date(
            selectedDate.getFullYear() + 543,
            selectedDate.getMonth(),
            selectedDate.getDate()
          )
        }
        locale="th-TH"
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
        minimumDate={minDate}
        maximumDate={maxDate}
        title="เลือกวันที่"
        confirmText="ยืนยัน"
        cancelText="ยกเลิก"
      />
    </View>
  );
};
