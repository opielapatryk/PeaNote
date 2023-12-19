import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { fetchNotes } from './screens/auth/logic/apiBoardScreen';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

export const loadToken = async (dispatch) => {
    let userToken;
    try {
        userToken = await SecureStore.getItemAsync("userToken");
        userId = await SecureStore.getItemAsync("userId");
    } catch (error) {
        console.error("Error loading token:", error);
    }
    dispatch({ type: 'RESTORE_TOKEN', token: userToken,userId:userId });
};

export const signOutFunc = async (dispatch) => {
    try {
      // const response = await axios.post('http://127.0.0.1:8000/custom_logout', {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Token ${SecureStore.getItemAsync('userToken')}`,
      // });

      console.log("Logout successful ");
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userId');

      dispatch({ type: 'SIGN_OUT' });

      // return response;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  export const signInFunc = async (dispatch) => {
    try {
      GoogleSignin.configure({
        webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
        iosClientId:"1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com"
      })
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      let userToken = await SecureStore.setItemAsync("userToken", JSON.stringify(userInfo.idToken))
      
      userIdString = String(userInfo.user.id);
      await SecureStore.setItemAsync('userId', userIdString);
      userId = await SecureStore.getItemAsync('userId');

      dispatch({ type: 'SIGN_IN', token: userToken, userId: userId });

    } catch (e) {
      console.log("Login error: " + e);
      return e;
    }
  };