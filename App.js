import React, {useEffect, useMemo, useReducer} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from "axios";
import store from './store/store'
import { Provider } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import Home from './screens/auth/Home';
import Login from './screens/public/Login'
import { AuthContext, authReducer, initialState } from './context/AuthContext';

const Stack = createNativeStackNavigator();

export default function App(){
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(()=>{
    const loadToken = async () => {
      let userToken;
        console.log("Attempting to load token...");
        try {
          userToken = await SecureStore.getItemAsync("userToken");
            
        } catch (error) {
            console.error("Error loading token:", error);
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    
    loadToken();
  },[])

  const authContext = useMemo(
    () => ({
    singIn: async (data) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/custom_login', {
            username: data.username,
            password: data.password
        });

        userToken = await SecureStore.setItemAsync('userToken', response.data.Authorization);
        console.log('Token stored:', SecureStore.getItemAsync('userToken'));
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        return response;

    } catch (e) {
        console.log("Login error: " + e);
    }
      
      
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token

      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    },
  }),
  []
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken==null?(
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
            ):(
              <Stack.Screen name="Home" component={Home}></Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  )
}