import { View,TextInput,Button,Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../assets/styles/styles';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const LoginFB = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signInFirebase = () =>{
    try {
        auth().signInWithEmailAndPassword(email,password)
    } catch (error) {
        console.log(error);
    }
  }

  const signUpFirebase = async () =>{
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      await user.user.sendEmailVerification();
      if(user.additionalUserInfo.isNewUser){
        firestore()
        .collection('users')
        .add({
          first_name: first_name,
          last_name: last_name,
          email: email,
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        })
        .then(() => {
          console.log('User added!');
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const signIn = async ()=>{
    const {idToken} = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    const user_sign_in = auth().signInWithCredential(googleCredential)
    user_sign_in.then((user)=>{
      if(user.additionalUserInfo.isNewUser){
        firestore()
        .collection('users')
        .add({
          first_name: user.additionalUserInfo.profile.given_name,
          last_name: user.additionalUserInfo.profile.family_name,
          email: user.user.email,
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        })
        .then(() => {
          console.log('User added!');
        })
      }
    })
    .catch((error) => {
      console.log('eror: ',error);
    })
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='first_name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last_name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password}/>   
      <Button onPress={signInFirebase} title='sign in' />
      <Button onPress={signUpFirebase} title='Create Account' />
      <GoogleSigninButton onPress={signIn} style={{width:300,height:50}}/>
      <Text>{message}</Text>
    </View>
  );
}

export default LoginFB;