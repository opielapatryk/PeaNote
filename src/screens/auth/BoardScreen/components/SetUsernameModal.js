import React,{useState} from 'react';
import {View, Modal,Text,TextInput,Pressable,} from 'react-native';
import { styles } from '../../../../../assets/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showModal, showUsernameModal } from '../../../../store/login/loginSlice';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database'
import { setUsername } from '../../../../store/settings/settingsSlice';

const SetUsernameModal = () => {
    const [username,setUsernamee] = useState("")
    const {usernameModal} = useSelector((state)=>state.login)
    const dispatch = useDispatch()
    const [message,setMessage] = useState('')

    const updateUsername = async () => {
        const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
        const usersRef = database.ref('users');
        const isUsernameTaken = (await usersRef.orderByChild('username').equalTo(username).once('value')).exists();
    
        if(isUsernameTaken){
          setUsernamee('')
          dispatch(setMessage('Username is taken'));
        }else if(username === ''){
            dispatch(setMessage('Username cannot be empty'));
        }else{
            const EMAIL = auth().currentUser.email
            const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
            const userData = userSnapshot.val();

            if (userData) {
                const userId = Object.keys(userData)[0];
                await usersRef.child(`${userId}/username`).set(username);
                dispatch(showUsernameModal(false))
                dispatch(showModal(true))
                dispatch(setUsername(username))
            }
        };
    }
    

    return (
        <Modal animationType="slide" transparent={true} visible={usernameModal}>
            <View style={styles.modalSetPassword}>
            <View style={styles.modalSetPasswordChild}>
                <Text style={styles.modalPasswordResetHeader}>Set username</Text>
                <Text style={styles.modalPasswordResetParagraph}>{message}</Text>
                <TextInput style={styles.modalPasswordResetTextInput} placeholder={'Username'} value={username} onChangeText={text=>setUsernamee(text)} onSubmitEditing={()=>updateUsername()}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={()=>updateUsername()} style={styles.modalPasswordResetButtonNext}><Text style={styles.modalPasswordResetButtonNextText}>Accept</Text></Pressable>
                </View>
            </View>
            </View>
        </Modal>
    );
}

export default SetUsernameModal