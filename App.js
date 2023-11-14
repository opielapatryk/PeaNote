// import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BoardScreen from './components/BoardScreen'
// import FriendsScreen from './components/FriendsScreen'
// import SettingsScreen from './components/SettingsScreen'
// import AddFriendScreen from './components/AddFriendScreen'
// import SignInScreen from './components/SignInScreen'
// import SignUpScreen from './components/SignUpScreen'
import Login from './app/screens/Login'
import Home from './app/screens/Home'
const Stack = createNativeStackNavigator();

// const getIsSignedIn = () => {
//   // custom logic
//   return false;
// };

// export default function App() {
//   const isSignedIn = getIsSignedIn();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//       {isSignedIn ? (
//           <>
//             <Stack.Screen name="Board" component={BoardScreen} />
//             <Stack.Screen name="Friends" component={FriendsScreen} />
//             <Stack.Screen name="Settings" component={SettingsScreen} />
//             <Stack.Screen name="AddFriend" component={AddFriendScreen} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen name="SignIn" component={SignInScreen} />
//             <Stack.Screen name="SignUp" component={SignUpScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
    
//   );
// }

import { AuthProvider,useAuth } from './app/context/AuthContext'

export default function App(){
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  )
}

export const Layout= ()=>{
  const {authState,onLogout} = useAuth()
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