import { View,TextInput,Text, Pressable } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../../assets/styles/styles';
import {signIn} from '../functions/signIn'
import { signInFirebase } from '../functions/signInFirebase';
import { signUpFirebase } from '../functions/signUpFirebase';
import Logo from '../../../assets/images/logo.svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { goToCreateAccount, goToLogIn} from '../../../constants'

const Login = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [createAccount,setCreateAccount] = useState(false);

  return (
    <View style={styles.container}>

      <Logo width={200} height={150}/>

      {message !== '' && <Text style={styles.errorMessage}>{message}</Text>}

      {/* login header */}
      {!createAccount && <>
        <Text style={styles.header}>
          Log In
        </Text>
        <Text style={styles.paragraph}>
          Please provide your credentials by filling out the form below.
        </Text>
      </>}
      
      {/* create account header and inputs */}
      {createAccount && <>
        <Text style={styles.header}>
          Create Account
        </Text>
        <Text style={styles.paragraph}>
          Let's get started by filling out the form below.
        </Text>
        <TextInput style={styles.roundTextInput} placeholder='First Name' onChangeText={setFirstName} value={first_name}/>
        <TextInput style={styles.roundTextInput} placeholder='Last Name' onChangeText={setLastName} value={last_name}/>
      </>}

      <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={setEmail} value={email}/>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={setPassword} value={password}/>   

      {/* login button */}
      {!createAccount && <>
        <Pressable style={styles.confirmButton} onPress={()=>signInFirebase(email,password,setMessage)}>
          <Text>
            Log In
          </Text>
        </Pressable>  
      </>}

      {/* create account button */}
      {createAccount && <>
        <Pressable style={styles.confirmButton} onPress={()=>signUpFirebase(email,password,first_name,last_name,setMessage)}> 
          <Text>
            Get Started
          </Text>
        </Pressable>  
      </>}
       
      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      {/* login with google button */}
      <Pressable style={styles.continuteWithGoogle} onPress={()=>signIn(setMessage)}>
        <Ionicons name="md-logo-google" size={22} color="black" />
        <Text>
          Continue with Google
        </Text>
      </Pressable>  

      {/* login footer */}
      {!createAccount && <>
        <View style={styles.bottomView}>

          <Pressable style={styles.pressableInBottonViewLeftLogInOn} onPress={()=>goToCreateAccount(setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName)}>
            <Text>
              Create Account
            </Text>
          </Pressable>  

          <Pressable style={styles.pressableInBottonViewRightLogInOn} onPress={()=>goToLogIn(setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName)}>
            <Text>
              Log In
            </Text>
          </Pressable>  

        </View>
      </>}

      {/* create account footer */}
      {createAccount && <>
        <View style={styles.bottomView}>

          <Pressable style={styles.pressableInBottonViewLeftCreateAccountOn} onPress={()=>goToCreateAccount(setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName)}>
            <Text>
              Create Account
            </Text>
          </Pressable>  

          <Pressable style={styles.pressableInBottonViewRightCreateAccountOn} onPress={()=>goToLogIn(setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName)}>
            <Text>
              Log In
            </Text>
          </Pressable>  

        </View>
      </>}

    </View>
  );
}

export default Login;