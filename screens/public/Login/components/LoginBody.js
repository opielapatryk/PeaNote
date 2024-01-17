import React,{useState} from 'react';
import { Text,TextInput} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import LoginButton from './LoginButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import LoginFooter from './LoginFooter';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../../store/login/loginReducer';

const LoginHeader = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  const dispatch = useDispatch()

    return (
        <>
        {message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
        <Text style={styles.header}>
          Log In
        </Text>
        <Text style={styles.paragraph}>
          Please provide your credentials by filling out the form below.
        </Text>

        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
        <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   

        <LoginButton/>

               
      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      <LoginWithGoogleButton/>

      <LoginFooter/>
      </>
    );
}

export default LoginHeader;