import { View,TextInput,Button,Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../assets/styles/styles';
import { FIREBASE_AUTH,FIREBASE_DB } from '../../FIrebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const LoginFB = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = FIREBASE_AUTH

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
  return (
    <View style={styles.container}>
      <TextInput placeholder='first_name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last_name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password}/>   
      <Button onPress={signIn} title='sign in' />
      <Button onPress={signUp} title='Create Account' />
      <Text>{message}</Text>
    </View>
  );
}

export default LoginFB;