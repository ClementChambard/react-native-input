import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { DatePicker } from 'react-native-input';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  let [password, setPassword] = useState<string>('');
  return (
    <View style={styles.container}>
      <Text> {selectedDay?.toString()} </Text>
      <DatePicker
        onDateChange={(date: Date) => {
          setSelectedDay(date);
        }}
        buttonOneTitle={'Cancle '}
        buttonTitle="select a new date"
        buttonTwoTitle="Validate"
        buttonOneStyle={styles.box}
        buttonTwoStyle={styles.box}
        buttonStyle={styles.box}
        modalAnimationType="fade"
        backgroundColor="rgba(237, 125, 183, 0.8)"
        backgroundColorSelectedValue="rgba(158, 9, 86, 0.2)"
      />

      <DatePicker
        onDateChange={(date: Date) => {
          setSelectedDay(date);
        }}
        buttonTitle="select a new date"
        buttonStyle={styles.boxDark}
        modalAnimationType="fade"
        backgroundColor="rgb(0, 0, 0)"
        textColor="white"
        IconColor="white"
        backgroundColorSelectedValue="#1C1C1C"
      />
      <PasswordStrengthMeter
        onChangeText={setPassword}
        value={password}
        strengthFunction={(p: string) => {
          return p.length;
        }}
        maxStrength={12}
      />     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(237, 125, 183, 1)',
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  boxDark: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
