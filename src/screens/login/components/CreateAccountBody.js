import React, {useState,useEffect} from 'react';
import {Text,TextInput,View,Image} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import CreateAccountButton from './CreateAccountButton';
import CreateAccountFooter from './CreateAccountFooter';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../store/login/loginSlice';
import * as AppleAuthentication from 'expo-apple-authentication'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleSignin } from '../functions/appleSignin';
import { signUpFirebase } from '../functions/signUpFirebase';

const CreateAccountBody = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  const dispatch = useDispatch()
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
}, []);

return (
    <>
      <View style={styles.createAccountBodyContainer}>
      <Image source={require('../../../../assets/images/Logo8.png')} style={styles.logo} resizeMode='contain'/>
        <Text style={styles.createAccountBodyHeader}>Create Account</Text>

        <Text style={styles.createAccountBodyParagraph}>Let's get started by filling out the form below.</Text>
        
        { <Text style={styles.errorMessage}>{message}</Text>}
        
        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email} onSubmitEditing={() => { passwordTextInput.focus()}}/>
        
        <TextInput ref={(input) => { passwordTextInput = input}} style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password} onSubmitEditing={() => signUpFirebase(email, password, dispatch)}/>   

        <CreateAccountButton/>

        <Text style={[styles.paragraph,{fontWeight:'500'}]}>
          Or sign up with
        </Text>

        <LoginWithGoogleButton/>

        {isAppleLoginAvailable && 
          <AppleButton
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.appleButton}
          onPress={appleSignin}
        />}
      </View>

      <CreateAccountFooter/>
    </>
  );
}
export default CreateAccountBody;