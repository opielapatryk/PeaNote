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

const Stack = createNativeStackNavigator();

export default function App(){
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

  // const authContext = useMemo(
  //   () => ({
  //     signIn: (data)=>signInFunc(data,dispatch),
  //     signOut: ()=>signOutFunc(dispatch)
  //   }),[]
  // );
  /////////////////////////////////////////////////////////
  
  // const [user,setUser] = useState(null)
  // const [userId, setUserId] = useState(null)

  // useEffect(()=>{
  //   console.log('userId before get item: ' + userId);
  //   const getData = async()=>{
  //     let userId = await AsyncStorage.getItem("@userId")
  //     setUserId(userId)
  //     // onAuthStateChanged(FIREBASE_AUTH,(user)=>{
  //     //   setUser(user)
  //     //   console.log('user: ',user)
  //     //   if(user != null && user.emailVerified === false){
  //     //     sendEmailVerification(FIREBASE_AUTH.currentUser)
  //     //   }
  //     // })
  //   }
  //   getData()
  //   console.log('userId after get item: ' + userId);
  // },[])
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