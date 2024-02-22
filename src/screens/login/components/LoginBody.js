import React,{useState,useEffect} from 'react';
import { Pressable, Text,TextInput,View,Image} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import LoginButton from './LoginButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import LoginFooter from './LoginFooter';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../store/login/loginSlice';
import * as AppleAuthentication from 'expo-apple-authentication'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleSignin } from '../functions/appleSignin';
import ResetPasswordModal from './ResetPasswordModal';

const LoginBody = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  const dispatch = useDispatch()
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);
  const [modalVisible,setModalVisible] = useState(false)

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
  }, []);

  return (
    <>
    <ResetPasswordModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    
    <View style={styles.createAccountBodyContainer}>
    <Image source={require('../../../../assets/images/Logo8.png')} style={styles.logo} resizeMode='contain'/>
    
      <Text style={styles.createAccountBodyHeader}>Log In</Text>
      <Text style={styles.createAccountBodyParagraph}>Provide your credentials by filling out the form below.</Text>

      {<Text style={styles.errorMessage}>{message}</Text>}

      <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
      <View>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   
      <Pressable onPress={() => {
        setModalVisible(true)
        }}><Text style={[styles.paragraph,{marginLeft:5}]}>Forgotten Password?</Text></Pressable>
      </View>
      <LoginButton/>
              
      <Text style={[styles.paragraph,{fontWeight:'500'}]}>
        Or sign up with
      </Text>
      <LoginWithGoogleButton/>

      {isAppleLoginAvailable && 
      <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.appleButton}
      onPress={()=>appleSignin(dispatch)}
      />}
    </View>
      

      <LoginFooter/>
    </>
  );
}

export default LoginBody;