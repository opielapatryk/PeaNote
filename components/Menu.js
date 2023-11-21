import React, {useState} from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';
import * as SecureStore from 'expo-secure-store'

export default function menu() {
  
  const logout = async () => {
      try {
          // setAuthState({
          //     token: null,
          //     authenticated: false
          // });

          // await SecureStore.deleteItemAsync(authState.token);
          console.log("Logout successful");
      } catch (error) {
          console.error("Logout error:", error);
      }
  };

  return <View style={styles.menu}>
    <Button title='BOARD' />
    <Button title='FRIENDS' />
    <Button title='SETTINGS' />
    <Button title='LOGOUT' onPress={logout} />
  </View>;
}
