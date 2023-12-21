import React, {useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
import LoginFB from './screens/public/LoginFB'
import Register from './screens/public/components/Register'
import BoardScreen from './screens/auth/components/BoardScreen';
import FriendsScreen from './screens/auth/components/FriendsScreen';
import FriendsBoard from './screens/auth/components/FriendsBoard';
import SettingsScreen from './screens/auth/components/SettingsScreen';
import PendingScreen from './screens/auth/components/PendingScreen';
import FriendRequests from './screens/auth/components/FriendRequests';
import { onAuthStateChanged, sendEmailVerification} from "firebase/auth";
import { FIREBASE_AUTH } from './FIrebaseConfig';
import * as SecureStore from 'expo-secure-store';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import 'expo-dev-client'
import 'firebase/auth';
const Stack = createNativeStackNavigator();

export default function App(){
  //////////// AUTH //////////////////////////////
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
    iosClientId:"1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com"
  })

  function onAuthStateChangedd(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChangedd);
    return subscriber
  }, []);

  if (initializing) return null;

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {!user?(
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
    </Provider>
  )
}