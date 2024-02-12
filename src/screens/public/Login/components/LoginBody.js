import React,{useState,useEffect} from 'react';
import { Pressable, Text,TextInput,Modal,View, Dimensions} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import LoginButton from './LoginButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import LoginFooter from './LoginFooter';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../../store/login/loginSlice';
import * as AppleAuthentication from 'expo-apple-authentication'
import auth from '@react-native-firebase/auth'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleSignin } from '../functions/appleSignin';

const LoginHeader = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail,setResetEmail] = useState("")
  const [resetPasswordLog,setResetPasswordLog] = useState("Email")
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable);
}, []);

  const checkIfEmailExist = () => {
    auth().sendPasswordResetEmail(resetEmail)
    .then(() => {
      setResetPasswordLog('Check your mailbox!')
      setResetEmail('')
    })
    .catch(() => {
      setResetPasswordLog('Email address is badly formatted.')
      setResetEmail('')
    });
  }


    return (
      <>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalPasswordResetView}>
            <View style={styles.modalPasswordResetViewChild}>
              <Text style={styles.modalPasswordResetHeader}>Where should we send a reset link?</Text>
              <Text style={styles.modalPasswordResetParagraph}>Enter the email associated with your account to reset your password.</Text>
              <TextInput style={styles.modalPasswordResetTextInput} placeholder={resetPasswordLog} value={resetEmail} onChangeText={text=>setResetEmail(text)}/>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={()=>checkIfEmailExist()} style={styles.modalPasswordResetButtonNext}><Text style={styles.modalPasswordResetButtonNextText}>Send</Text></Pressable>
                <Pressable onPress={()=>setModalVisible(false)} style={styles.modalPasswordResetButtonBack}><Text style={styles.modalPasswordResetButtonBackText}>Back</Text></Pressable>
              </View>
            </View>
          </View>
        </Modal>
      <View style={{gap:Dimensions.get('window').height/50,alignItems:'center'}}>
      
      <Text style={{fontSize:20,fontWeight:'600',letterSpacing:.5}}>Log In</Text>
      <Text style={{letterSpacing:.5,fontSize:13}}>Provide your credentials by filling out the form below.</Text>

      {<Text style={styles.errorMessage}>{message}</Text>}

        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
        <View>
        <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   
        <Pressable onPress={() => setModalVisible(true)}><Text style={[styles.paragraph,{marginLeft:5}]}>Forgotten Password?</Text></Pressable>
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
        style={{
          width:Dimensions.get('window').width/1.5,
          height: 45,
        }}
        onPress={appleSignin}
      />}
      </View>
       

        <LoginFooter/>
      </>
    );
}

export default LoginHeader;