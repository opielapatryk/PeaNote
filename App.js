import React, {useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
import Login from './screens/public/Login/components/Login'
import BoardScreen from './screens/auth/BoardScreen/components/BoardScreen';
import FriendsScreen from './screens/auth/FriendsScreen/components/FriendsScreen';
import FriendsBoard from './screens/auth/FriendsBoardScreen/components/FriendsBoard';
import SettingsScreen from './screens/auth/SettingsScreen/components/SettingsScreen';
import PendingScreen from './screens/auth/PendingScreen/components/PendingScreen';
import FriendRequests from './screens/auth/FriendRequestScreen/components/FriendRequests';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import 'expo-dev-client'
import { WEB_CLIENT_ID, IOS_CLIENT_ID} from './FIrebaseConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ScreenOrientation from 'expo-screen-orientation';


const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();


export default function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  changeScreenOrientation();

  GoogleSignin.configure({
    webClientId:WEB_CLIENT_ID,
    iosClientId:IOS_CLIENT_ID
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


  function FriendStack() {
    return (
      <Stack.Navigator initialRouteName={"FriendsScreen"}>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='FriendsBoard' component={FriendsBoard} options={({ route }) => ({ title: route.params.name,headerTintColor:'black'})} />
        <Stack.Screen name="Requests" component={FriendRequests} options={{headerTintColor:"black",title:"REQUESTS",headerTitleStyle:{fontSize:17,
    fontWeight:'bold',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
    letterSpacing:2}}} />
      </Stack.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName={!user?"Login":"Board"} screenOptions={{tabBarItemStyle:{padding:0,marginTop: 40,},tabBarIndicatorStyle:{backgroundColor:'black'},tabBarLabelStyle:{letterSpacing:1.5, fontSize:12}}}>
              {!user?(
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
      </Provider>
    </GestureHandlerRootView>
  )
}