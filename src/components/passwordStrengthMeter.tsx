import React, { useCallback, useState } from 'react';
import type { TextInputChangeEventData } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';
import type { TextInputContentSizeChangeEventData } from 'react-native';
import type { NativeTouchEvent } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { TextInputSelectionChangeEventData } from 'react-native';
import type { TextStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';
import type { TextInputSubmitEditingEventData } from 'react-native';
import type { TextInputScrollEventData } from 'react-native';
import type { TextInputKeyPressEventData } from 'react-native';
import type { TextInputEndEditingEventData } from 'react-native';
import type { TextInputFocusEventData } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';

interface PasswordStrengthMeterProps {
  allowFontScaling?: boolean;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  caretHidden?: boolean;
  contextMenuHidden?: boolean;
  cursorColor?: string;
  disableFullscreenUI?: boolean;
  maxLength?: number;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
  onContentSizeChange?: (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  onPressIn?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onPressOut?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onScroll?: (e: NativeSyntheticEvent<TextInputScrollEventData>) => void;
  onSelectionChange?: (
    e: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  strengthFunction?: (password: string) => number;
  maxStrength?: number;
  colorGradient?: [string];
  messages?: [string];
  value?: string;
  textInputStyle?: StyleProp<TextStyle>;
  progressBarStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

const defaultStyle = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'column',
    width: '90%',
  },
  progress: {
    marginVertical: 10,
    borderRadius: 5,
    height: 5,
  },
  message: {
    alignSelf: 'center',
  },
});

const defaultStrengthFunction = (password: string) => {
  const minLength = 8;
  const betterLength = 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-=]/.test(password);

  let strength = 0;
  if (password.length >= minLength) strength += 1;
  if (password.length >= betterLength) strength += 1;
  if (hasUppercase) strength += 2;
  if (hasLowercase) strength += 2;
  if (hasNumber) strength += 2;
  if (hasSpecialChar) strength += 2;

  return strength;
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  allowFontScaling,
  autoFocus,
  blurOnSubmit,
  caretHidden,
  contextMenuHidden,
  cursorColor,
  disableFullscreenUI,
  maxLength,
  onBlur,
  onChange,
  onChangeText,
  onContentSizeChange,
  onEndEditing,
  onPressIn,
  onPressOut,
  onFocus,
  onKeyPress,
  onLayout,
  onScroll,
  onSelectionChange,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  textAlign,
  textInputStyle,
  messageStyle,
  strengthFunction,
  maxStrength,
  colorGradient,
  messages,
  progressBarStyle,
  containerStyle,
  value,
}: PasswordStrengthMeterProps) => {
  const usedStrengthFunction = strengthFunction ?? defaultStrengthFunction;
  const actualMaxStrength = maxStrength ?? 10;

  let [message, setMessage] = useState<string>('');
  let [color, setColor] = useState<string>('#000');
  let [width, setWidth] = useState<string>('0%');

  let onChangeCallback = useCallback(
    (val) => {
      const colors = colorGradient ?? [
        'red',
        'red',
        'orange',
        'orange',
        'green',
      ];
      const messageTexts = messages ?? [
        'weak password',
        'weak password',
        'medium password',
        'medium password',
        'strong password',
      ];

      if (onChangeText) {
        onChangeText(val);
      }
      if (val.length === 0) {
        setMessage('');
        setWidth('0%');
        setColor(colors[0]);
        return;
      }
      let strength = Math.min(usedStrengthFunction(val) / actualMaxStrength, 1);
      let cid = Math.min(
        Math.floor(strength * (colors.length + 1)),
        colors.length - 1
      );
      let mid = Math.min(
        Math.floor(strength * (messageTexts.length + 1)),
        messageTexts.length - 1
      );
      let pc = Math.floor(strength * 100);
      setWidth(`${pc}%`);
      setColor(colors[cid]!);
      setMessage(messageTexts[mid]!);
    },
    [
      usedStrengthFunction,
      actualMaxStrength,
      onChangeText,
      colorGradient,
      messages,
    ]
  );

  return (
    <View style={{ ...defaultStyle.container, ...(containerStyle as object) }}>
      <TextInput
        secureTextEntry={true}
        value={value}
        allowFontScaling={allowFontScaling}
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        caretHidden={caretHidden}
        contextMenuHidden={contextMenuHidden}
        cursorColor={cursorColor}
        disableFullscreenUI={disableFullscreenUI}
        maxLength={maxLength}
        onBlur={onBlur}
        onChange={onChange}
        onChangeText={onChangeCallback}
        onContentSizeChange={onContentSizeChange}
        onEndEditing={onEndEditing}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        onLayout={onLayout}
        onScroll={onScroll}
        onSelectionChange={onSelectionChange}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textAlign={textAlign}
        style={{ ...defaultStyle.textInput, ...(textInputStyle as object) }}
      />
      <View
        style={{
          backgroundColor: color,
          width: width,
          ...defaultStyle.progress,
          ...(progressBarStyle as object),
        }}
      />
      <Text
        style={{
          color: color,
          ...defaultStyle.message,
          ...(messageStyle as object),
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export { PasswordStrengthMeter };
