import React,{useState} from 'react';
import { Pressable, Text,TextInput,Modal,View} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import LoginButton from './LoginButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import LoginFooter from './LoginFooter';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword } from '../../../../store/login/loginSlice';
import auth from '@react-native-firebase/auth';

const LoginHeader = () => {
  const {email,password,message} = useSelector((state)=>state.login)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [resetEmail,setResetEmail] = useState("")
  const [resetPasswordLog,setResetPasswordLog] = useState("Email")

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
        <Pressable onPress={() => setModalVisible(true)}><Text style={styles.paragraph}>Forgot password?</Text></Pressable>
               
        <Text style={styles.paragraph}>
          Or sign up with
        </Text>
        
        <LoginWithGoogleButton/>

        <LoginFooter/>
      </>
    );
}

export default LoginHeader;