import React, {useEffect, useState,useMemo, useReducer} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
import LoginFB from './screens/public/LoginFB'
import Register from './screens/public/components/Register'
import { AuthContext, authReducer, initialState } from './context/AuthContext';
import BoardScreen from './screens/auth/components/BoardScreen';
import FriendsScreen from './screens/auth/components/FriendsScreen';
import FriendsBoard from './screens/auth/components/FriendsBoard';
import SettingsScreen from './screens/auth/components/SettingsScreen';
import PendingScreen from './screens/auth/components/PendingScreen';
import FriendRequests from './screens/auth/components/FriendRequests';
import { loadToken,signOutFunc,signInFunc } from './logicApp';
import { onAuthStateChanged, sendEmailVerification} from "firebase/auth";
import { FIREBASE_AUTH } from './FIrebaseConfig';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

export default function App(){
  //////////// GOOGLE AUTH //////////////////////////////
  // SIGN IN WITH GOOGLE, CHECK USER TOKEN
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(()=>{
    loadToken(dispatch);
  },[state.userToken])

  const authContext = useMemo(
    () => ({
      signIn: ()=>signInFunc(dispatch),
      signOut: ()=>signOutFunc(dispatch)
    }),[]
  );


  ///////////// GMAIL AND PASSWORD AUTH ////////////////////
  // CREATE ACCOUNT USING EMAIL AND PASSWORD AND SEND EMAIL VERIFICATION
  useEffect(()=>{
    const getData = async()=>{
      onAuthStateChanged(FIREBASE_AUTH, async (user)=>{
        console.log(user);
        // IF ACCOUNT CREATED SEND EMAIL VERIFICATION
        if(user != null && user.emailVerified === false){
          sendEmailVerification(FIREBASE_AUTH.currentUser)
        }
        // IF ACCOUNT VERIFIED, SET TOKEN
        if(user != null && user.emailVerified === true){
          let userToken = await SecureStore.setItemAsync("userToken", JSON.stringify(user.stsTokenManager.accessToken))
      
          userIdString = String(user.uid);
          await SecureStore.setItemAsync('userId', userIdString);
          let userId = await SecureStore.getItemAsync('userId');
          dispatch({ type: 'SIGN_IN', token: userToken, userId: userId });
        }
      })
    }
    getData()
  },[])

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken==null?(
              <>
                <Stack.Screen name="LoginFB" component={LoginFB}></Stack.Screen>
                <Stack.Screen name="Register" component={Register}></Stack.Screen>
              </>
             
            ):(
              <>
                <Stack.Screen name="Board" component={BoardScreen}></Stack.Screen>
                <Stack.Screen name="Pending" component={PendingScreen}></Stack.Screen>
                <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
                <Stack.Screen name="Friends" component={FriendsScreen}initialParams={{ userId:'12'}}></Stack.Screen>
                <Stack.Screen name="FriendsBoard" component={FriendsBoard}></Stack.Screen>
                <Stack.Screen name="Requests" component={FriendRequests}></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  )
}