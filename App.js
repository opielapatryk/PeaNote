import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login'
import Home from './app/screens/Home'
import store from './store/store'
import { Provider } from 'react-redux';
import { AuthProvider,useAuth } from './app/context/AuthContext'
const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout></Layout>
      </AuthProvider>
    </Provider>
  )
}

export const Layout= ()=>{
  const {authState} = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState.authenticated?(
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
        ):(
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}