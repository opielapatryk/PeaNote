import { View,TextInput,Button,Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { styles } from '../../assets/styles/styles';
import { FIREBASE_AUTH,FIREBASE_DB } from '../../FIrebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginFB = ({route,promptAsync}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = FIREBASE_AUTH
  const [myuserInfo,setUserInfo] = useState('');
  const [userError,setUserError] = useState('');


  const signIn = async () =>{
    try {
        await signInWithEmailAndPassword(auth,email, password)
    } catch (error) {
        console.log(error);
    }
  }

  const signUp = async () =>{
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password)
        const user = userCredential.user;

        await setDoc(doc(FIREBASE_DB, "users", user.uid), {
          first_name: first_name,
          last_name: last_name,
          email: email,
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        });
    } catch (error) {
        console.log(error);
    }
  }

  const configureGoogleSignIn = () =>{
    GoogleSignin.configure({
      webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
      iosClientId:"1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com"
    })
  }

  useEffect(()=>{
    configureGoogleSignIn()
  })

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      // await setDoc(doc(FIREBASE_DB, "users", userInfo.user.id), {
      //   first_name: userInfo.user.givenName,
      //   last_name: userInfo.user.familyName,
      //   email: userInfo.user.email,
      //   friends: [],
      //   friends_requests: [],
      //   askBeforeStick: false,
      //   stickersOnBoard: [],
      //   pending: []
      // });

    } catch (error) {
      setUserError(error);
    }
  };

  const logoutGoogle = async () => {
    setUserInfo(undefined)
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='first_name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last_name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password}/>   
      <Button onPress={signIn} title='sign in' />
      <Button onPress={signUp} title='Create Account' />
      <Button onPress={signInGoogle} title='signInGoogle'/>
      <Text>{message}</Text>
      <Text>{JSON.stringify(myuserInfo.user)}</Text>
      <Text>{JSON.stringify(userError)}</Text>
      <Button onPress={() => promptAsync()} title='sign in with google v2'/>
    </View>
  );
}

export default LoginFB;