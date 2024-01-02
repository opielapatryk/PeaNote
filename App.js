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
const Stack = createNativeStackNavigator();


export default function App(){
  //////////// AUTH //////////////////////////////
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

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {!user?(
              <>
                <Stack.Screen name="LoginFB" component={LoginFB} options={{headerShown:false}}></Stack.Screen>
              </>
             
            ):(
              <>
                <Stack.Screen name="Board" options={{headerShown:false}} component={BoardScreen}></Stack.Screen>
                <Stack.Screen name="Pending" options={{headerTitle:'Pending notes'}} component={PendingScreen}></Stack.Screen>
                <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
                <Stack.Screen name="Friends" component={FriendsScreen}initialParams={{ userId:'12'}}></Stack.Screen>
                <Stack.Screen name="FriendsBoard" component={FriendsBoard}></Stack.Screen>
                <Stack.Screen name="Requests" options={{headerTitle:'Friends requests'}} component={FriendRequests}></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  )
}