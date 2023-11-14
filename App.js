import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import React from 'react';
import { styles } from './assets/styles';
import { Note } from './components/Note';


export default function App() {
  return (
    <View style={styles.container}>
      <Note text={'20;00 film'}/>
      <StatusBar style="auto" />
    </View>
  );
}

