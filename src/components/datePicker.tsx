import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  type StyleProp,
  Image,
} from 'react-native';
interface DatePickerProps {
  onDateChange: (date: Date) => void;
  modalAnimationType?: 'none' | 'slide' | 'fade'; // Optional
  buttonOneStyle?: StyleProp<any>; // Optional
  buttonTwoStyle?: StyleProp<any>; // Optional
  buttonStyle?: StyleProp<any>; // Optional
  buttonOneTitle?: string; // Optional
  buttonTwoTitle?: string; // Optional
  buttonTitle?: string; // Optional
  backgroundColor?: string; // Optional
  backgroundColorSelectedValue?: string; // Optional
  imageSize?: { width: number; height: number }; // Optional
  imageUrl?: string; // Optional
  imageUrlTwo?: string;
  textColor?: string;
  IconColor?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  onDateChange,
  modalAnimationType = 'slide',
  buttonStyle,
  buttonOneStyle,
  buttonTwoStyle,
  buttonOneTitle,
  buttonTwoTitle,
  buttonTitle = 'Select Date',
  backgroundColor = 'rgba(0, 0, 0, 0.2)', // Default value
  backgroundColorSelectedValue = 'rgba(0, 0, 0, 0.1)',
  textColor = 'black',
  imageSize = { width: 24, height: 24 }, // Apply a color tint for negative effect}, // Default size
  imageUrl, // Optional, no default
  imageUrlTwo,
  IconColor = 'black',
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [days, setDays] = useState<number[]>(
    Array.from(
      { length: getDaysInMonth(selectedYear, selectedMonth) },
      (_, i) => i + 1
    )
  );
  const yearRef = useRef<FlatList>(null);
  const monthRef = useRef<FlatList>(null);
  const dayRef = useRef<FlatList>(null);

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    setDays(
      Array.from(
        { length: getDaysInMonth(year, selectedMonth) },
        (_, i) => i + 1
      )
    );
    const index = years.indexOf(year);
    yearRef.current?.scrollToIndex({ index, animated: true });
  };
  const handleSelectMonth = (month: number) => {
    setSelectedMonth(month);
    setDays(
      Array.from(
        { length: getDaysInMonth(selectedYear, month) },
        (_, i) => i + 1
      )
    );
    const index = months.indexOf(month);
    monthRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);

    const index = days.indexOf(day);
    dayRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleConfirm = () => {
    const formattedDate =
      `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(
        selectedDay
      ).padStart(2, '0')}` + 'T23:00:00.000Z';
    onDateChange(new Date(formattedDate));
    setModalVisible(false);
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  const renderItem = (item: number, selectedValue: number, type: string) => (
    <TouchableOpacity
      style={[
        styles.item,
        {},
        item === selectedValue && {
          backgroundColor: backgroundColorSelectedValue,
          borderRadius: 5,
        },
      ]}
      onPress={() => {
        if (type === 'year') handleSelectYear(item);
        else if (type === 'month') handleSelectMonth(item);
        else handleSelectDay(item);
      }}
    >
      <Text style={{ color: textColor }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setModalVisible(true)}
      >
        <Text>{buttonTitle}</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Modal
          visible={modalVisible}
          transparent
          animationType={modalAnimationType}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              position: 'absolute', // Use absolute positioning
              bottom: 0, // Align to the bottom
              width: '100%', // Take full width
              height: '30%',
              backgroundColor: backgroundColor,
              padding: 20,
            }}
          >
            <View style={styles.Buttons}>
              <TouchableOpacity style={buttonOneStyle} onPress={handleClose}>
                {buttonOneTitle?.length ? (
                  <Text>{buttonOneTitle}</Text>
                ) : (
                  <Image
                    source={
                      imageUrl ? { uri: imageUrl } : require('../assets/x.png')
                    } // Use imageUrl or default
                    style={[imageSize, { tintColor: IconColor }]} // Use imageSize for dimensions
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={buttonTwoStyle}
                onPress={() => handleConfirm()}
              >
                {buttonTwoTitle?.length ? (
                  <Text>{buttonTwoTitle}</Text>
                ) : (
                  <Image
                    source={
                      imageUrlTwo
                        ? { uri: imageUrlTwo }
                        : require('../assets/valid.png')
                    } // Use imageUrl or default
                    style={[imageSize, { tintColor: IconColor }]} // Use imageSize for dimensions
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.modalViewDirection}>
              <FlatList
                ref={yearRef}
                data={years}
                renderItem={({ item }) =>
                  renderItem(item, selectedYear, 'year')
                }
                keyExtractor={(item) => item.toString()}
              />
              <FlatList
                ref={monthRef}
                data={months}
                renderItem={({ item }) =>
                  renderItem(item, selectedMonth, 'month')
                }
                keyExtractor={(item) => item.toString()}
              />
              <FlatList
                ref={dayRef}
                data={days}
                renderItem={({ item }) => renderItem(item, selectedDay, 'day')}
                keyExtractor={(item) => item.toString()}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewDirection: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: '5%',
  },
  item: {
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Buttons: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
  },
});

export { DatePicker };
