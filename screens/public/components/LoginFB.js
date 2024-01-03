import { View,TextInput,Button,Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../assets/styles/styles';
import { GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {signInFirebase,signUpFirebase,signIn} from '../logic/apiLoginFB'

const LoginFB = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [createAccount,setCreateAccount] = useState(false);

  return (
    <View style={styles.container}>
      {createAccount && <>
        <TextInput placeholder='first_name' onChangeText={setFirstName} value={first_name}/>
        <TextInput placeholder='last_name' onChangeText={setLastName} value={last_name}/>
      </>}
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password}/>   
      <Button onPress={()=>signInFirebase(createAccount,setCreateAccount,email,password)} title='sign in' />
      <Button onPress={()=>signUpFirebase(createAccount,email,password,first_name,last_name,setCreateAccount)} title='Create Account' />
      <GoogleSigninButton onPress={signIn} style={{width:300,height:50}}/>
      <Text>{message}</Text>
    </View>
  );
}

export default LoginFB;