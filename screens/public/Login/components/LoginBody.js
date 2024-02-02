import React,{useState,useEffect} from 'react';
import { Pressable, Text,TextInput,Modal,View} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import LoginButton from './LoginButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import LoginFooter from './LoginFooter';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../../store/login/loginSlice';
import auth from '@react-native-firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

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

  async function onAppleButtonPress(){
    const nonce = Math.random().toString(36).substring(2, 10);

    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
        .then((hashedNonce) =>
            AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ],
                nonce: hashedNonce
            })
        )
        .then((appleCredential) => {
          const { identityToken } = appleCredential;
          
          const provider = new auth.OAuthProvider('apple.com');
          const credential = provider.credential({
              idToken: identityToken,
              rawNonce: nonce
          });
          return auth().signInWithCredential(credential);
      })
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
      <View style={{gap:30,alignItems:'center'}}>
      {message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
        {/* <Text style={styles.header}>
          Log In
        </Text>
        <Text style={styles.paragraph}>
          Please provide your credentials by filling out the form below.
        </Text> */}

        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={text=>dispatch(setEmail(text))} value={email}/>
        <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={text=>dispatch(setPassword(text))} value={password}/>   

        <LoginButton/>
        <Pressable onPress={() => setModalVisible(true)}><Text style={styles.paragraph}>Forgotten Password?</Text></Pressable>
               
        {/* <Text style={styles.paragraph}>
          Or sign up with
        </Text> */}
        
        <LoginWithGoogleButton/>

        {isAppleLoginAvailable && 
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.continuteWithGoogle}
        onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
        />}
      </View>
       

        <LoginFooter/>
      </>
    );
}

export default LoginHeader;