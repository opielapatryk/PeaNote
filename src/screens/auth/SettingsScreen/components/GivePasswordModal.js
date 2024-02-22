import React,{useState} from 'react';
import {View, Modal,Text,TextInput,Pressable,} from 'react-native';
import { styles } from '../../../../../assets/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../../../store/settings/settingsSlice';
import auth from '@react-native-firebase/auth';

const GivePasswordModal = () => {
    const EMAIL = auth().currentUser.email
    const [password,setPassword] = useState("")
    const {modal} = useSelector((state)=>state.settings)
    const dispatch = useDispatch()
    const [modall,setModal] = useState(modal)
    const updatePassword = async () => {
        try {
            const credential = auth.EmailAuthProvider.credential(password,EMAIL)
            await auth().currentUser.reauthenticateWithCredential(credential)
            dispatch(showModal(false));
            setModal(false);
        } catch (error) {
            alert(error.message)
        }
    };
    

    return (
        <Modal animationType="slide" transparent={true} visible={modall}>
            <View style={styles.modalSetPassword}>
            <View style={styles.modalSetPasswordChild}>
                <Text style={styles.modalPasswordResetHeader}>Set new password</Text>
                <Text style={styles.modalPasswordResetParagraph}>Provide password to delete account</Text>
                <TextInput style={styles.modalPasswordResetTextInput} placeholder={'Password'} value={password} secureTextEntry onChangeText={text=>setPassword(text)}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={()=>updatePassword()} style={styles.modalPasswordResetButtonNext}><Text style={styles.modalPasswordResetButtonNextText}>Accept</Text></Pressable>
                </View>
            </View>
            </View>
        </Modal>
    );
}

export default GivePasswordModal;