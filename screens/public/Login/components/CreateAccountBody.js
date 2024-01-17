import React from 'react';
import {Text,TextInput} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import CreateAccountButton from './CreateAccountButton';
import CreateAccountFooter from './CreateAccountFooter';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName,setLastName,setEmail,setPassword } from '../../../../store/login/loginReducer';

const CreateAccountHeader = () => {
  const {first_name,last_name,email,password,message} = useSelector((state)=>state.login)
  
const dispatch = useDispatch()
    return (
<>
{message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
        <Text style={styles.header}>
          Create Account
        </Text>
        <Text style={styles.paragraph}>
          Let's get started by filling out the form below.
        </Text>
        <TextInput style={styles.roundTextInput} placeholder='First Name' onChangeText={text=>dispatch(setFirstName(text))} value={first_name}/>
        <TextInput style={styles.roundTextInput} placeholder='Last Name' onChangeText={text=>dispatch(setLastName(text))} value={last_name}/>
        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   
      
      <CreateAccountButton/>

      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      <LoginWithGoogleButton/>

      <CreateAccountFooter/>
      </>
    );
}

export default CreateAccountHeader;
