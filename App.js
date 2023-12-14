import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
// import Login from './screens/public/components/Login'
import Register from './screens/public/components/Register'
import BoardScreen from './screens/auth/components/BoardScreen';
import FriendsScreen from './screens/auth/components/FriendsScreen';
import FriendsBoard from './screens/auth/components/FriendsBoard';
import SettingsScreen from './screens/auth/components/SettingsScreen';
import PendingScreen from './screens/auth/components/PendingScreen';
import FriendRequests from './screens/auth/components/FriendRequests';
import LoginFB from './screens/public/LoginFB';
import {User, onAuthStateChanged,sendEmailVerification} from 'firebase/auth'
import { FIREBASE_AUTH } from './FIrebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

// function InsideLayout(){
//   return(
//     <InsideStack.Navigator>
//       <InsideStack.Screen name="Board" component={BoardScreen}/>
//       <InsideStack.Screen name="Pending" component={PendingScreen}/>
//       <InsideStack.Screen name="Settings" component={SettingsScreen}/>
//       <InsideStack.Screen name="Friends" component={FriendsScreen}/>
//       <InsideStack.Screen name="FriendsBoard" component={FriendsBoard}/>
//       <InsideStack.Screen name="Requests" component={FriendRequests}/>
//     </InsideStack.Navigator>
//   )
// }

export default function App(){
  const [user,setUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
      setUser(user)
      if(user != null && user.emailVerified === false){
        sendEmailVerification(FIREBASE_AUTH.currentUser)
      }
    })
  },[])


  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='LoginFB'>
            {!user?(
              <>
                <Stack.Screen name="LoginFB" component={LoginFB} options={{headerShown:false}}></Stack.Screen>
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