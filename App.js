import React, {useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/store/store'
import { Provider } from 'react-redux';
import Login from './src/screens/login/components/Login'
import BoardScreen from './src/screens/auth/BoardScreen/components/BoardScreen';
import HistoryScreen from './src/screens/auth/HistoryScreen/components/HistoryScreen';
import FriendsScreen from './src/screens/auth/FriendsScreen/components/FriendsScreen';
import FriendsBoard from './src/screens/auth/FriendsBoardScreen/components/FriendsBoard';
import UserBoard from './src/screens/auth/UserBoardScreen/components/UserBoard';
import RequestUserScreen from './src/screens/auth/RequestUserScreen/components/RequestUserScreen';
import SettingsScreen from './src/screens/auth/SettingsScreen/components/SettingsScreen';
import PendingScreen from './src/screens/auth/PendingScreen/components/PendingScreen';
import FriendRequests from './src/screens/auth/FriendRequestScreen/components/FriendRequests';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import 'expo-dev-client'
import { WEB_CLIENT_ID, IOS_CLIENT_ID} from './FIrebaseConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaProvider,initialWindowMetrics} from 'react-native-safe-area-context';
import { styles } from './assets/styles/styles';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function changeScreenOrientation() {
    ScreenOrientation.OrientationLock.PORTRAIT;
  }
  changeScreenOrientation();

  GoogleSignin.configure({
    webClientId:WEB_CLIENT_ID,
    iosClientId:IOS_CLIENT_ID
  })

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const requestUserPermission = async () =>{
    const authStatus = await messaging().requestPermission()
    const enabled = authStatus ===messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if(enabled){
      console.log('status: ',authStatus);
    }

    const token = await messaging().getToken();
    console.log('FCM token:', token);
  }

  useEffect(() => {
    requestUserPermission()

    messaging().getInitialNotification().then(async (remoteMessage)=>{
      if(remoteMessage){
        console.log('notif caused app to open from quit state: ',remoteMessage.notification);
      }else{
        console.log('else');
        console.log(remoteMessage);
      }
    })

    messaging().onNotificationOpenedApp(async (remoteMessage)=>{
      console.log('notif caused app to open from background state: ',remoteMessage.notification);
    })

    messaging().setBackgroundMessageHandler(async (remoteMessage)=>{
      console.log('message handled in background: ',remoteMessage);
    })

    const unsubscribeAuthState = auth().onAuthStateChanged(onAuthStateChanged);

    const unsubscribeMessage = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived', JSON.stringify(remoteMessage));
    });
  
    return () => {
      unsubscribeAuthState();
      unsubscribeMessage();
    };
  }, []);

  if (initializing) return null;

  function FriendStack() {
    return (
      <Stack.Navigator initialRouteName={"FriendsScreen"}>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='FriendsBoard' component={FriendsBoard} options={({ route }) => ({ title: route.params.oldnickname?route.params.oldnickname:route.params.name,headerTintColor:'black'})} />
        <Stack.Screen name='UserBoard' component={UserBoard} options={({ route }) => ({ title: route.params.oldnickname?route.params.oldnickname:route.params.name,headerTintColor:'black'})} />
        <Stack.Screen name='RequestUserScreen' component={RequestUserScreen} options={({ route }) => ({ title: route.params.oldnickname?route.params.oldnickname:route.params.name,headerTintColor:'black'})} />
        <Stack.Screen name="Requests" component={FriendRequests} options={{headerTintColor:"black",title:"Requests",}} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{title:null,headerTintColor:'black'}} />
      </Stack.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator tabBarPosition='bottom' initialRouteName={!user?"Login":"Board"} screenOptions={{tabBarIndicatorStyle:styles.tabBarIndicatorStyle,tabBarLabelStyle:styles.tabBarLabelStyle,tabBarStyle:[styles.tabBarStyle,{paddingBottom:initialWindowMetrics.insets.bottom}]}}>
              {!user || !user.emailVerified?(
                <>
                  <Tab.Screen name="Login" component={Login} options={{tabBarStyle:{display:'none'}}}></Tab.Screen>
                </>
              ):(
                <>
                  <Tab.Screen name="Board" component={BoardScreen}></Tab.Screen>
                  <Tab.Screen name="Pending" component={PendingScreen}></Tab.Screen>
                  <Tab.Screen name="Friends" component={FriendStack}></Tab.Screen>
                  <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
                </>
              )}
          </Tab.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}