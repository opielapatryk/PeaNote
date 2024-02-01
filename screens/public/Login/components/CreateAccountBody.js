import React from 'react';
import {Text,TextInput,View} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import CreateAccountButton from './CreateAccountButton';
import CreateAccountFooter from './CreateAccountFooter';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../../store/login/loginSlice';

const CreateAccountHeader = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  
const dispatch = useDispatch()
    return (
<>
<View style={{gap:30,alignItems:'center'}}>
{message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
        {/* <Text style={styles.header}>
          Create Account
        </Text>
        <Text style={styles.paragraph}>
          Let's get started by filling out the form below.
        </Text> */}
        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   
      
      <CreateAccountButton/>

      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      <LoginWithGoogleButton/>
      </View>

      <CreateAccountFooter/>
      </>
    );
}

export default CreateAccountHeader;
