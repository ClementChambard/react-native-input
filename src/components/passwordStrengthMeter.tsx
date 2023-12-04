import React from 'react';
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
  onBlur?: any;
  onChange?: any;
  onChangeText?: any;
  onContentSizeChange?: any;
  onEndEditing?: any;
  onPressIn?: any;
  onPressOut?: any;
  onFocus?: any;
  onKeyPress?: any;
  onLayout?: any;
  onScroll?: any;
  onSelectionChange?: any;
  onSubmitEditing?: any;
  placeholder?: string;
  placeholderTextColor?: string;
  readOnly?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  textInputStyle?: any;
  value?: string;
}

const PasswordStrengthMeter: React.FC<
  PasswordStrengthMeterProps
> = ({}: PasswordStrengthMeterProps) => {
  return <TextInput />;
};

export { PasswordStrengthMeter };
