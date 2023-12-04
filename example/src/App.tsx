import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { PasswordStrengthMeter } from 'react-native-input';

export default function App() {
  let [password, setPassword] = React.useState<string>('');
  return (
    <View style={styles.container}>
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
});
