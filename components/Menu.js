import React, {useContext, useState} from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { AuthProvider,useAuth, AuthContext } from '../app/context/AuthContext'
const TOKEN = 'my-jwt';


export default function menu() {
  
  const logout = async () => {
    // const TOKEN = 'token';
    // const [authState, setAuthState] = useState({
    //   token:useContext(),
    //   authenticated:null
    // })
    try {
      const token = await SecureStore.getItemAsync(TOKEN);

      const response = await axios.post('http://127.0.0.1:8000/custom_logout',{
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      })
      // const {authState} = useAuth()
      // console.log(authState);
      // console.log(useContext(authState));

        // setAuthState({
        //     token: null,
        //     authenticated: false
        // });

        // await SecureStore.deleteItemAsync(authState.token);
        // if(response.ok){
          
          console.log("Logout successful " + token);
          await SecureStore.deleteItemAsync(TOKEN);
          // navigation.navigate('Login');
        // }else {
        //   console.error('Logout failed');
        // }
    } catch (error) {
        console.error("Logout error:", error);
    }
  };

  return (
    <AuthProvider>
      <View style={styles.menu}>
          <Button title='BOARD' />
          <Button title='FRIENDS' />
          <Button title='SETTINGS' />
          <Button title='LOGOUT' onPress={logout} />
        </View>
    </AuthProvider>
  
  );
}
