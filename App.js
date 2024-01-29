import React, {useEffect,useState} from 'react'
import { StatusBar,Dimensions } from 'react-native';
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
import Logout from './screens/auth/Logout/components/Logout'

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();


export default function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
      <Stack.Navigator>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='FriendsBoard' component={FriendsBoard} options={({ route }) => ({ title: route.params.name,headerTintColor:'black'})} />
        <Stack.Screen name="Requests" component={FriendRequests} options={{headerTintColor:"black"}} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
        <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarItemStyle:{padding:0,marginTop: StatusBar.currentHeight || 40,},tabBarIndicatorStyle:{backgroundColor:'#000'},tabBarLabelStyle:{letterSpacing:1.5, fontSize:12}}}>
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
                <Tab.Screen name="Logout" component={Logout}></Tab.Screen>
              </>
            )}
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>
  )
}