import React from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";


export default function menu() {
  const logout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/custom_logout',{
        'Content-Type': 'application/json',
        'Authorization': `Token ${SecureStore.getItemAsync('userToken')}`,
      })

      console.log("Logout successful ");
      await SecureStore.deleteItemAsync('userToken');

      return response;
    } catch (error) {
        console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.menu}>
      <Button title='BOARD' />
      <Button title='FRIENDS' />
      <Button title='SETTINGS' />
      <Button onPress={()=>logout()} title='LOGOUT' />
    </View>
  );
}
