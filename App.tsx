import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Navigator from './src/navigation';

function App(): JSX.Element {

  return (
    <View style={{ flex: 1 }}>
      <Navigator />
    </View>
  )
}

const styles = StyleSheet.create({

});

export default App;
