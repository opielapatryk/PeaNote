import React, {useEffect,useMemo, useReducer,useState} from 'react'
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
import auth from '@react-native-firebase/auth';
import { GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';
import { View,Text,Button } from 'react-native';
import 'expo-dev-client'
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
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

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
    iosClientId:"1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com"
  })

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber // unsubscribe on unmount
  }, []);

  // const onGoogleButtonPress = async ()=>{
  //   const {idToken} = await GoogleSignin.signIn()
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken)
  //   const user_sign_in = auth().signInWithCredential(googleCredential)
  //   user_sign_in.then((user)=>{
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }
  
  const signOut = async ()=>{
    try {
      await GoogleSignin.revokeAccess()
      await auth().signOut()
    } catch (error) {
      console.log(error);
    }
  }

  if (initializing) return null;

  // if(!user){
  //   return (
  //     <View>
  //       <GoogleSigninButton style={{width:300,height:100,marginTop:300}} onPress={onGoogleButtonPress}/>
  //     </View>
  //   )
  // }
  // return (
  //   <View style={{marginTop:300}}>
  //     <Text>{user.displayName}</Text>
  //     <Button title='Sign out' onPress={signOut}/>
  //   </View>
  // )
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
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
      </AuthContext.Provider>
    </Provider>
  )
  ///////////// LISTENING TO AUTH STATE ///////////////
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   console.log(user);
  //   return subscriber // unsubscribe on unmount
  // }, []);
  
  // if (initializing) return null;




  ///////////// GMAIL AND PASSWORD AUTH ////////////////////
  // CREATE ACCOUNT USING EMAIL AND PASSWORD AND SEND EMAIL VERIFICATION
  // useEffect(()=>{
  //   const getData = async()=>{
  //     onAuthStateChanged(FIREBASE_AUTH, async (user)=>{
  //       console.log('user: ',user);
  //       // IF ACCOUNT CREATED SEND EMAIL VERIFICATION
  //       if(user != null && user.emailVerified === false){
  //         sendEmailVerification(FIREBASE_AUTH.currentUser)
  //       }
  //       // IF ACCOUNT VERIFIED, SET TOKEN
  //       if(user != null && user.emailVerified === true){
  //         let userToken = await SecureStore.setItemAsync("userToken", JSON.stringify(user.stsTokenManager.accessToken))
      
  //         userIdString = String(user.uid);
  //         await SecureStore.setItemAsync('userId', userIdString);
  //         let userId = await SecureStore.getItemAsync('userId');
  //         dispatch({ type: 'SIGN_IN', token: userToken, userId: userId });
  //       }
  //     })
  //   }
  //   getData()
  // },[])

 
}