import { View,TextInput,Button,Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../assets/styles/styles';
import { FIREBASE_AUTH } from '../../FIrebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
const LoginFB = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = FIREBASE_AUTH

  const signIn = async () =>{
    try {
        const resp = await signInWithEmailAndPassword(auth,email, password)
        console.log(resp);
    } catch (error) {
        console.log(error);
    }
  }

  const signUp = async () =>{
    try {
        const resp = await createUserWithEmailAndPassword(auth,email, password)
        console.log(resp);
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