import React, {useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
import LoginFB from './screens/public/components/LoginFB'
import BoardScreen from './screens/auth/components/BoardScreen';
import FriendsScreen from './screens/auth/components/FriendsScreen';
import FriendsBoard from './screens/auth/components/FriendsBoard';
import SettingsScreen from './screens/auth/components/SettingsScreen';
import PendingScreen from './screens/auth/components/PendingScreen';
import FriendRequests from './screens/auth/components/FriendRequests';
import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import 'expo-dev-client'
import 'firebase/auth';
import { WEB_CLIENT_ID, IOS_CLIENT_ID} from './FIrebaseConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Logout from './screens/auth/components/Logout'

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
        <Stack.Screen name={'FriendsBoard'} component={FriendsBoard} options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="Requests" component={FriendRequests} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
        <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarItemStyle:{padding:0,marginTop:10},tabBarIndicatorStyle:{backgroundColor:'#000'},tabBarLabelStyle:{letterSpacing:1, fontSize:11}}}>
            {!user?(
              <>
                <Tab.Screen name="LoginFB" component={LoginFB} options={{tabBarStyle:{display:'none'}}}></Tab.Screen>
              </>
             
            ):(
              <>
                <Tab.Screen name="Board" component={BoardScreen}></Tab.Screen>
                <Tab.Screen name="Pending" component={PendingScreen}></Tab.Screen>
                <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
                <Tab.Screen name="Friends" component={FriendStack} initialParams={{ userId:'12'}} ></Tab.Screen>
                <Tab.Screen name="Logout" component={Logout}></Tab.Screen>
                
              </>
            )}
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>
  )
}