import React,{useState} from 'react';
import {View, Modal,Text,TextInput,Pressable,} from 'react-native';
import auth from '@react-native-firebase/auth'
import { styles } from '../../../../../assets/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../../../store/login/loginSlice';

const SetPasswordModal = () => {
    const [password,setPassword] = useState("")
    const {modal} = useSelector((state)=>state.login)
    const dispatch = useDispatch()
    const [modall,setModal] = useState(modal)
    const [message,setMessage] = useState('')
    const updatePassword = () => {
        auth().currentUser.updatePassword(password)
        .then(() => {
            dispatch(showModal(false));
            setModal(false);
        })
        .catch((error) => {
            if (error.code === 'auth/weak-password') {
                setMessage('Password must contain a capital letter, special character, and be at least 8 characters long');
            } else {
                console.error('Error updating password:', error);
            }
        });
    };
    

    return (
        <Modal animationType="slide" transparent={true} visible={modall}>
            <View style={styles.modalSetPassword}>
            <View style={styles.modalSetPasswordChild}>
                <Text style={styles.modalPasswordResetHeader}>Set new password</Text>
                <Text style={styles.modalPasswordResetParagraph}>{message}</Text>
                <TextInput style={styles.modalPasswordResetTextInput} placeholder={'Password'} value={password} secureTextEntry onChangeText={text=>setPassword(text)}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={()=>updatePassword()} style={styles.modalPasswordResetButtonNext}><Text style={styles.modalPasswordResetButtonNextText}>Accept</Text></Pressable>
                </View>
            </View>
            </View>
        </Modal>
    );
}

export default SetPasswordModal;