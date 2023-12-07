import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { fetchNotes } from './screens/auth/logic/apiBoardScreen';

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
      const response = await axios.post('http://127.0.0.1:8000/custom_logout', {
        'Content-Type': 'application/json',
        'Authorization': `Token ${SecureStore.getItemAsync('userToken')}`,
      });

      console.log("Logout successful ");
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userId');

      dispatch({ type: 'SIGN_OUT' });

      return response;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  export const signInFunc = async (data,dispatch) => {
    try {
      const response = await axios.post('http://localhost:8000/custom_login', {
        username: data.username,
        password: data.password
      });

      let userToken = await SecureStore.setItemAsync('userToken', response.data.Authorization);

      userIdString = String(response.data.user_id);
      await SecureStore.setItemAsync('userId', userIdString);
      userId = await SecureStore.getItemAsync('userId');

      dispatch({ type: 'SIGN_IN', token: userToken, userId: userId });

      return response;

    } catch (e) {
      console.log("Login error: " + e);
      return e;
    }
  };