import { View,TextInput,Button,Text,Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../assets/styles/styles';
import { GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {signInFirebase,signUpFirebase,signIn} from '../logic/apiLoginFB'
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
  }
  const goToLogIn = ()=>{
    setCreateAccount(false)
  }

  return (
    <View style={styles.container}>
      <Logo width={200} height={200}/>
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
        <Pressable style={styles.confirmButton} onPress={()=>signInFirebase(createAccount,setCreateAccount,email,password)}>
        <Text>
        Log In</Text>
        </Pressable>  
      </>}


        {createAccount && <>
        <Pressable style={styles.confirmButton} onPress={()=>signUpFirebase(createAccount,email,password,first_name,last_name,setCreateAccount)}> 
        <Text>
        Get Started
        </Text>
        </Pressable>  
          </>}
      
       
      <Text style={styles.paragraph}>Or sign up with</Text>
      <Pressable style={styles.continuteWithGoogle} onPress={signIn}>
      <Ionicons name="md-logo-google" size={22} color="black" />
        <Text>
        Continue with Google</Text></Pressable>  
      <Text>{message}</Text>
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