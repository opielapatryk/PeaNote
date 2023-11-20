import React from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';

export default function menu() {
  return <View style={styles.menu}>
    <Button title='BOARD' />
    <Button title='FRIENDS' />
    <Button title='SETTINGS' />
    <Button title='LOGOUT' />
  </View>;
}
