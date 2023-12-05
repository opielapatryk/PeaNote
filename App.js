import React, {useEffect, useMemo, useReducer} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store/store'
import { Provider } from 'react-redux';
import Login from './screens/public/Login'
import Register from './screens/public/Register'
import { AuthContext, authReducer, initialState } from './context/AuthContext';
import BoardScreen from './screens/auth/BoardScreen';
import FriendsScreen from './screens/auth/FriendsScreen';
import FriendsBoard from './screens/auth/FriendsBoard';
import SettingsScreen from './screens/auth/SettingsScreen';
import PendingScreen from './screens/auth/PendingScreen';
import { loadToken,signOutFunc,signInFunc } from './logicApp';

const Stack = createNativeStackNavigator();

export default function App(){
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(()=>{
    loadToken(dispatch);
  },[state.userToken])

  const authContext = useMemo(
    () => ({
    signIn: (data)=>signInFunc(data,dispatch),
    signOut: ()=>signOutFunc(dispatch)
  }),
  []
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken==null?(
              <>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="Register" component={Register}></Stack.Screen>
              </>
             
            ):(
              <>
                <Stack.Screen name="Board" component={BoardScreen}></Stack.Screen>
                <Stack.Screen name="Pending" component={PendingScreen}></Stack.Screen>
                <Stack.Screen name="Settings" component={SettingsScreen}></Stack.Screen>
                <Stack.Screen name="Friends" component={FriendsScreen}initialParams={{ userId:'12'}}></Stack.Screen>
                <Stack.Screen name="FriendsBoard" component={FriendsBoard}></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  )
}