import React, {useState,useEffect} from 'react';
import {Text,TextInput,View,Dimensions} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import CreateAccountButton from './CreateAccountButton';
import CreateAccountFooter from './CreateAccountFooter';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../../store/login/loginSlice';
import * as AppleAuthentication from 'expo-apple-authentication'
import auth from '@react-native-firebase/auth'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleSignin } from '../functions/appleSignin';

const CreateAccountHeader = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  const dispatch = useDispatch()
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
}, []);

    return (
<>
<View style={{gap:Dimensions.get('window').height/50,alignItems:'center'}}>
<Text style={{fontSize:20,fontWeight:'600',letterSpacing:.5}}>Create Account</Text>
<Text style={{letterSpacing:.5}}>Let's get started by filling out the form below.</Text>
{<Text style={styles.errorMessage}>{message}</Text>}
        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   
      
      <CreateAccountButton/>

      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      <LoginWithGoogleButton/>

      {isAppleLoginAvailable && 
        <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width:Dimensions.get('window').width/1.5,
          height: 45,
        }}
        onPress={appleSignin}
      />}
      </View>

      <CreateAccountFooter/>
      </>
    );
}

export default CreateAccountHeader;
