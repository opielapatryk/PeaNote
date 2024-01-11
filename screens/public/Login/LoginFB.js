import { View,TextInput,Text, Pressable } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../assets/styles/styles';
import {signInFirebase,signUpFirebase,signIn} from './apiLoginFB'
import Logo from '../../../assets/images/logo.svg';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginFB = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [createAccount,setCreateAccount] = useState(false);
  const goToCreateAccount = ()=>{
    setCreateAccount(true)
    setMessage('')
    setLastName('')
    setEmail('')
    setPassword('')
    setFirstName('')
  }
  const goToLogIn = ()=>{
    setCreateAccount(false)
    setMessage('')
    setLastName('')
    setEmail('')
    setPassword('')
    setFirstName('')
  }

  return (
    <View style={styles.container}>
      <Logo width={200} height={150}/>
      {message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
      {!createAccount && <>
        <Text style={styles.header}>Log In</Text>
      <Text style={styles.paragraph}>Please provide your credentials by filling out the form below.</Text>
      </>}
      

      {createAccount && <>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.paragraph}>Let's get started by filling out the form below.</Text>
      <TextInput style={styles.roundTextInput} placeholder='First Name' onChangeText={setFirstName} value={first_name}/>
      <TextInput style={styles.roundTextInput} placeholder='Last Name' onChangeText={setLastName} value={last_name}/>
      </>}

      <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={setEmail} value={email}/>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={setPassword} value={password}/>   
      {!createAccount && <>
        <Pressable style={styles.confirmButton} onPress={()=>signInFirebase(email,password,setMessage)}>
        <Text>
        Log In</Text>
        </Pressable>  
      </>}


        {createAccount && <>
        <Pressable style={styles.confirmButton} onPress={()=>signUpFirebase(email,password,first_name,last_name,setMessage)}> 
        <Text>
        Get Started
        </Text>
        </Pressable>  
          </>}
      
       
      <Text style={styles.paragraph}>Or sign up with</Text>
      <Pressable style={styles.continuteWithGoogle} onPress={()=>signIn(setMessage)}>
      <Ionicons name="md-logo-google" size={22} color="black" />
        <Text>
        Continue with Google</Text></Pressable>  
      {!createAccount && <>
        <View style={styles.bottomView}>
      <Pressable style={styles.pressableInBottonViewLeftLogInOn} onPress={goToCreateAccount}>
        <Text>
        Create Account</Text></Pressable>  
        <Pressable style={styles.pressableInBottonViewRightLogInOn} onPress={goToLogIn}>
        <Text>
        Log In</Text></Pressable>  
      </View>
      </>}
      {createAccount && <>
        <View style={styles.bottomView}>
      <Pressable style={styles.pressableInBottonViewLeftCreateAccountOn} onPress={goToCreateAccount}>
        <Text>
        Create Account</Text></Pressable>  
        <Pressable style={styles.pressableInBottonViewRightCreateAccountOn} onPress={goToLogIn}>
        <Text>
        Log In</Text></Pressable>  
      </View>
      </>}

    </View>
  );
}

export default LoginFB;