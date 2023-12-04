import React, {useEffect, useMemo, useReducer, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";
import store from './store/store'
import { Provider } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import Login from './screens/public/Login'
import Register from './screens/public/Register'
import { AuthContext, authReducer, initialState } from './context/AuthContext';
import BoardScreen from './screens/auth/BoardScreen';
import FriendsScreen from './screens/auth/FriendsScreen';
import FriendsBoard from './screens/auth/FriendsBoard';
import SettingsScreen from './screens/auth/SettingsScreen';
import PendingScreen from './screens/auth/PendingScreen';


const Stack = createNativeStackNavigator();

export default function App(){
  const [state, dispatch] = useReducer(authReducer, initialState);


  useEffect(()=>{
    const loadToken = async () => {
      let userToken;
        console.log("Attempting to load token...");
        try {
          userToken = await SecureStore.getItemAsync("userToken");
          userId = await SecureStore.getItemAsync("userId");
          console.log('loadToken, userId: ' + userId);
        } catch (error) {
            console.error("Error loading token:", error);
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken,userId:userId });

    };
    
    loadToken();
    
  },[state.userToken])

  const authContext = useMemo(
    () => ({
    signIn: async (data) => {
      try {
        const response = await axios.post('http://localhost:8000/custom_login', {
            username: data.username,
            password: data.password
        });

        userToken = await SecureStore.setItemAsync('userToken', response.data.Authorization);

        userIdString = String(response.data.user_id)
        await SecureStore.setItemAsync('userId', userIdString);
        userId = await SecureStore.getItemAsync('userId');

        dispatch({ type: 'SIGN_IN', token: userToken,userId:userId});

        console.log('resp: ',response);

        return response;

    } catch (e) {
        console.log("Login error: " + e);
        return e
    }
      
      
    },
    signOut: async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/custom_logout',{
          'Content-Type': 'application/json',
          'Authorization': `Token ${SecureStore.getItemAsync('userToken')}`,
        })
  
        console.log("Logout successful ");
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userId');

        dispatch({ type: 'SIGN_OUT' });

        return response;
      } catch (error) {
          console.error("Logout error:", error);
      }
    },
    signUp: async (data) => {

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  }),
  []
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken==null?(
              <>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="Register" component={Register}></Stack.Screen>
              </>
             
            ):(
              <>
                <Stack.Screen name="Board" component={BoardScreen}></Stack.Screen>
                <Stack.Screen name="Pending" component={PendingScreen}></Stack.Screen>
                <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
                <Stack.Screen name="Friends" component={FriendsScreen}initialParams={{ userId:'12'}}></Stack.Screen>
                <Stack.Screen name="FriendsBoard" component={FriendsBoard}></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  )
}