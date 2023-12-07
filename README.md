# react-native-input-Ubod

A React Native package providing two essential UI components: `PasswordStrengthMeter` and `DatePicker`. Enhance your applications with a sophisticated password strength meter and a user-friendly date picker.

## PasswordStrengthMeter 
<p align="center">
<img width="368" alt="Capture d’écran 2023-12-07 à 12 03 58" src="https://github.com/ClementChambard/react-native-input/assets/98128042/514051c1-e1f3-4488-8efb-d39df7cfcf21">
<img width="384" alt="Capture d’écran 2023-12-07 à 12 03 26" src="https://github.com/ClementChambard/react-native-input/assets/98128042/d3381416-cf6c-493f-a109-ba3560f82ba7">
</p>

## DatePicker

<p align="center">
<img width="384" alt="Capture d’écran 2023-12-07 à 12 02 08" src="https://github.com/ClementChambard/react-native-input/assets/98128042/b949b2e3-61c0-47f4-8d4b-24bd477dd38f">
<img width="362" alt="Capture d’écran 2023-12-07 à 12 01 55" src="https://github.com/ClementChambard/react-native-input/assets/98128042/8daf3d76-7a84-4665-9f70-c8cdc26ef71f">
</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [PasswordStrengthMeter](#passwordstrengthmeter)
  - [DatePicker](#datepicker)
- [Component Documentation](#component-documentation)
  - [PasswordStrengthMeter Props](#passwordstrengthmeter-props)
  - [DatePicker Props](#datepicker-props)
- [Styling and Customization](#styling-and-customization)
- [Contributing](#contributing)
- [License](#license)
- [Documentation](#documentation)

## Installation

```bash
npm install react-native-input-ubod
# or
yarn add react-native-input-ubod
```

## Usage

### PasswordStrengthMeter

```jsx
import { PasswordStrengthMeter } from 'react-native-input-ubod';

<PasswordStrengthMeter
        onChangeText={setPassword}
        value={password}
/>
```

### DatePicker

```jsx
import { DatePicker } from 'react-native-input-ubod';

<DatePicker
        onDateChange={(date: Date) => {
          setSelectedDay(date);
}} />
```
Based on the detailed prop interfaces you provided for `DatePicker` and `PasswordStrengthMeter`, I'll update the README section to accurately reflect these components.

---

## Component Documentation

### PasswordStrengthMeter Props

- `allowFontScaling` (boolean): Enables font scaling. Default: `undefined`.
- `autoFocus` (boolean): Focuses the input on component mount. Default: `undefined`.
- `blurOnSubmit` (boolean): Dismisses the keyboard on submit. Default: `undefined`.
- `caretHidden` (boolean): Hides the text input caret. Default: `undefined`.
- `contextMenuHidden` (boolean): Hides the context menu. Default: `undefined`.
- `cursorColor` (string): Sets the cursor color. Default: `undefined`.
- `disableFullscreenUI` (boolean): Disables full-screen UI on Android. Default: `undefined`.
- `maxLength` (number): Maximum character length. Default: `undefined`.
- Event callback props like `onBlur`, `onChange`, `onChangeText`, `onContentSizeChange`, `onEndEditing`, `onPressIn`, `onPressOut`, `onFocus`, `onKeyPress`, `onLayout`, `onScroll`, `onSelectionChange`, `onSubmitEditing` for various user interactions.
- `placeholder` (string): Placeholder text. Default: `undefined`.
- `placeholderTextColor` (string): Color of placeholder text. Default: `undefined`.
- `textAlign` (`'left' | 'center' | 'right'`): Text alignment. Default: `undefined`.
- `strengthFunction` (function): Custom function to calculate password strength. Default: `undefined`.
- `maxStrength` (number): Maximum strength value. Default: `undefined`.
- `colorGradient` ([string]): Color gradient for strength meter. Default: `undefined`.
- `messages` ([string]): Messages for different strength levels. Default: `undefined`.
- `value` (string): Current input value. Default: `undefined`.
- `textInputStyle` (StyleProp<TextStyle>): Style for the text input. Default: `undefined`.
- `progressBarStyle` (StyleProp<ViewStyle>): Style for the progress bar. Default: `undefined`.
- `containerStyle` (StyleProp<ViewStyle>): Style for the container. Default: `undefined`.
- `messageStyle` (StyleProp<TextStyle>): Style for the message. Default: `undefined`.
- 

### DatePicker Props

- `onDateChange` (function): Callback for date change. **Required**.
- `modalAnimationType` (`'none' | 'slide' | 'fade'`): Type of modal animation. Default: `'slide'`.
- `buttonStyle` (StyleProp<any>): Style for the button. Default: `undefined`.
- `buttonOneStyle` (StyleProp<any>): Style for the first button. Default: `undefined`.
- `buttonTwoStyle` (StyleProp<any>): Style for the second button. Default: `undefined`.
- `buttonOneTitle` (string): Title for the first button. Default: `undefined`.
- `buttonTwoTitle` (string): Title for the second button. Default: `undefined`.
- `buttonTitle` (string): General button title. Default: `'Select Date'`.
- `backgroundColor` (string): Background color. Default: `'rgba(0, 0, 0, 0.2)'`.
- `backgroundColorSelectedValue` (string): Background color for selected value. Default: `'rgba(0, 0, 0, 0.1)'`.
- `textColor` (string): Text color. Default: `'black'`.
- `imageSize` (object): Size of the image icon. Default: `{ width: 24, height: 24 }`.
- `imageUrl` (string): URL for the default image icon. Default: `undefined`.
- `imageUrlTwo` (string): URL for an alternative image icon. Default: `undefined`.
- `IconColor` (string): Color of the icon images. Default: `'black'`.


---

This README section now accurately reflects the detailed props for both components, including their default values where applicable. Adjust the content as needed to align with your package's specific features and requirements.

## Styling and Customization




Both components are highly customizable with various styling options:

```jsx
      <PasswordStrengthMeter
        onChangeText={setPassword}
        value={password}
        strengthFunction={(p: string) => {
          return p.length;
        }}
        maxStrength={12}
      />
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
```

## Contributing

We welcome contributions! Please follow our [contributing guidelines](https://github.com/ClementChambard/react-native-input/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ClementChambard/react-native-input/blob/main/LICENSE) file for details.

## Documentation

For more detailed documentation, including interactive examples and styling guides, please visit our [GitHub Documentation Page]().

---

This README file covers detailed usage, props, and basic setup for both `PasswordStrengthMeter` and `DatePicker`. Adjust the content to match the exact functionality and features of your components.
