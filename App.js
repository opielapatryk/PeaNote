import React, {useEffect, useMemo, useReducer,createContext,useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View,TextInput,Text,Button} from 'react-native';
import axios from "axios";
import store from './store/store'
import { Provider } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();
const Stack = createNativeStackNavigator();

export default function App(){
  const [state,dispatch] = useReducer((prevState,action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null
        };
    }
  },
  {
    isLoading:true,
    isSignout:false,
    userToken:null
  }  
  );

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

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { singIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder='email' onChangeText={setUsername} value={username} />
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password} />
      <Button onPress={()=>singIn({username,password})} title='sign in' />
    </View>
  );
}

function Home() {
  const logout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/custom_logout',{
        'Content-Type': 'application/json',
        'Authorization': `Token ${SecureStore.getItemAsync('userToken')}`,
      })

      console.log("Logout successful ");
      await SecureStore.deleteItemAsync('userToken');

      return response
    } catch (error) {
        console.error("Logout error:", error);
    }
  };

  return (
    <View>
      <Button onPress={()=>logout()} title='delete token' />
    </View>
  );
}