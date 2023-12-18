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
import {onAuthStateChanged,GoogleAuthProvider,signInWithCredential,sendEmailVerification} from 'firebase/auth'
import { FIREBASE_AUTH } from './FIrebaseConfig';
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();
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

  // const [userInfo,setUserInfo] = useState(null)
  // useEffect(()=>{
  //   const getUser = async ()=>{
  //     const userinfo = await AsyncStorage.getItem("@user")
  //     setUserInfo(userinfo)
  //   }
  //   getUser()

  //   onAuthStateChanged(FIREBASE_AUTH, async (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       await AsyncStorage.setItem("@userId", uid)
  //       const userId = await AsyncStorage.getItem("@userId")
  //       console.log('FIREBASE userID: ' + userId);
  //     } else {
  //       await AsyncStorage.removeItem("@userId")
  //       const userId = await AsyncStorage.getItem("@userId")
  //       console.log('FIREBASE userID: ' + userId);
  //     }
  //   });
  // },[])
  const [user,setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(()=>{
    const getData = async()=>{
      const userId = await AsyncStorage.getItem("@userId")
      setUserId(userId)
      onAuthStateChanged(FIREBASE_AUTH,(user)=>{
        setUser(user)
        if(user != null && user.emailVerified === false){
          sendEmailVerification(FIREBASE_AUTH.currentUser)
        }
      })
    }
    getData()
    console.log('userId: ', userId);
  },[])
  // const configureGoogleSignIn = () =>{
  //   GoogleSignin.configure({
  //     webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
  //     iosClientId:"1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com"
  //   })
  // }

  // useEffect(()=>{
  //   configureGoogleSignIn()
  // })
  // const [userInfo, setUserInfo] = useState(null);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: "1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com",
  //   webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
  // });
  // useEffect(()=>{
  //   handlesigninwithgoogle()
  //   console.log('use effect, response: ', response);
  // },[response])

  // async function handlesigninwithgoogle(){
  //   console.log('handling signin with google');
  //   const user = await AsyncStorage.getItem("@user")
  //   console.log('user: ', user);
  //   if(!user){
  //     if(response?.type === 'success'){
  //       console.log('resp.auth.token: ', response.authentication.accessToken);
  //       await getUserInfo(response.authentication.accessToken, promptAsync)
  //     }
  //   }else{
  //     setUserInfo(JSON.parse(user))
  //     console.log('json.parse(user): ', JSON.parse(user));
  //   }
  // }

  // const getUserInfo = async (token, promptAsync)=>{
  //   console.log('get user info...');
  //   if (!token) return
  //   console.log('token: ', token);
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",{
  //         headers:{Authorization: `Bearer ${token}`},
  //       }
  //     )
  //     console.log('resp: ', response.json());
  //     const user = await response.json()
  //     await AsyncStorage.setItem("@user", JSON.stringify(user))
  //     setUserInfo(user)
  //   } catch (error) {
  //     console.log('get user info error: ', error);
  //   }
  // }

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     console.log('success', response.params);
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(FIREBASE_AUTH, credential);
  //   }else{
  //     console.log('response not success');
  //   }
  // }, [response]);

  // useEffect(() => {
  //   getLocalUser();
  //   const unsub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
  //     if (user) {
  //       await AsyncStorage.setItem("@user", JSON.stringify(user));
  //       console.log(JSON.stringify(user, null, 2));
  //       setUserInfo(user);
  //     } else {
  //       console.log("user not authenticated");
  //       console.log('user: ',user);
  //     }
  //   });
  //   return () => unsub();
  // }, []);

  // const getLocalUser = async () => {
  //   try {
  //     const userJSON = await AsyncStorage.getItem("@user");
  //     const userData = userJSON ? JSON.parse(userJSON) : null;
  //     setUserInfo(userData);
  //   } catch (e) {
  //     console.log(e, "Error getting local user");
  //   } 
  // };

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='LoginFB'>
            {!userId?(
              <>
                <Stack.Screen name="LoginFB" component={LoginFB}></Stack.Screen>
                <Stack.Screen name="Register" component={Register}></Stack.Screen>
              </>
            ):(
              <>
                <Stack.Screen name="Board" component={BoardScreen}></Stack.Screen>
                <Stack.Screen name="Pending" component={PendingScreen}></Stack.Screen>
                <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
                <Stack.Screen name="Friends" component={FriendsScreen} initialParams={{ userId:'12'}}></Stack.Screen>
                <Stack.Screen name="FriendsBoard" component={FriendsBoard}></Stack.Screen>
                <Stack.Screen name="Requests" component={FriendRequests}></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  )
}