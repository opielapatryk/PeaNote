import React,{useState} from 'react';
import {View, Modal,Text,TextInput,Pressable,} from 'react-native';
import auth from '@react-native-firebase/auth'
import { styles } from '../../../../assets/styles/styles';

const ResetPasswordModal = ({modalVisible,setModalVisible}) => {
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
    );
}

export default ResetPasswordModal;