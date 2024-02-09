import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TextInput, Pressable,Keyboard,TouchableWithoutFeedback,Image,Dimensions, Linking,Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../assets/styles/styles';
import {checkIsAskBeforeStickingNoteFlagOff} from '../functions/checkIsAskBeforeStickingNoteFlagOff';
import {askBeforeStick} from '../functions/askBeforeStick';
import {deleteAccount} from '../functions/deleteAccount';
import {changePassword} from '../functions/changePassword';
import { HANDLE_PASSWORD_CHANGE_BUTTON_PRESS,HANDLE_USERNAME_CHANGE_BUTTON_PRESS } from '../../../constants';
import { setMyimage, setShowInput,setShowInputUsername} from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import { useFocusEffect } from '@react-navigation/native';
import { signOutAndClearReduxStore } from '../../Logout/functions/signOutAndClearReduxStore';
import {changeUsername} from '../functions/changeUsername'
import {changeProfilePhoto} from '../functions/changeProfilePhoto'
import * as ImagePicker from 'expo-image-picker'
import auth, { firebase } from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

const SettingsScreen = () => {
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [deleteAccountPressed, setDeleteAccountPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, pendingNotes } = useSelector((state) => state.board);
  const { showInput, showInputUsername,username,myimage } = useSelector((state) => state.settings);
  const { message,reduxdescription } = useSelector((state) => state.login);
  const [description, newDescription] = useState(reduxdescription);
  const [image, setImage] = useState(null)

  const dispatch = useDispatch();

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  
  useEffect(() => {
    if (image) {
      uploadImage()
      dispatch(setMyimage(image.uri))
      
    }
  }, [image]);

  const pickImage = async () => {
    await requestPermission()

    if(status.granted){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,4],
        quality: 0.1,
      });
      const source = {uri: result.assets[0].uri}


      setImage(source)
    }

    if(status.status === ImagePicker.PermissionStatus.DENIED){
      Linking.openSettings()
    }
}; 


const uploadImage = async () => {
  const EMAIL = auth().currentUser.email


  const { uri } = image;

  const compressedImageData = (await manipulateAsync(uri,[{resize:{
    height: 300, 
    width: 300
  }}],{compress:0.1,format: SaveFormat.JPEG}))

  const path = `${EMAIL}`;

  const reference = firebase.storage().ref(path);

  try {
    const response = await fetch(compressedImageData);
    const blob = await response.blob();

    await reference.put(blob);

    setImage(null)
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
} 




  useFocusEffect(
    React.useCallback(() => {
      return ()=>{
        setDeleteAccountPressed(false)
        dispatch(setShowInput(false))
        dispatch(setShowInputUsername(false))
        dispatch(setMessage(''))
      }
    }, [])
  );



  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff({ setAskBeforeStickingNoteFlag });
  }, []);

  const handlePasswordChange = () => {
    if (showInput) {
      changePassword({ setDeleteAccountPressed, newPassword, dispatch,setNewPassword });
    } else {
      HANDLE_PASSWORD_CHANGE_BUTTON_PRESS({ setDeleteAccountPressed, dispatch });
    }
  };

  const handleUsernameChange = () => {
    if (showInputUsername) {
      changeUsername({ setDeleteAccountPressed, newUsername, dispatch,setNewUsername });
    } else {
      HANDLE_USERNAME_CHANGE_BUTTON_PRESS({ setDeleteAccountPressed, dispatch });
    }
  };

  const handleDeleteAccount = () => {
    if (deleteAccountPressed) {
      deleteAccount({ notes, dispatch, pendingNotes })
    } else {
      setDeleteAccountPressed(true);
    }
  };
  const insets = useSafeAreaInsets();

  const changeDescription = async ()=>{
    const EMAIL = auth().currentUser.email

    const getUserByEmail = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()
    
      getUserByEmail.forEach((doc)=>{
        firestore()
        .collection('users')
        .doc(doc.id)
        .update({
          description: description,
        })
      })
  }

  return (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
    <View style={[styles.friendsboard,{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'white'
    }]}>
      <View>
      <View style={styles.ProfilePicGrandparent}>
      <Text style={[styles.friendsHeaderRequestText,{marginTop:20}]}>{username}</Text>
        <View style={styles.ProfilePicParent}>
          
          {myimage && <Image source={{uri: myimage}} style={styles.ProfilePic}/>}
        </View>
        </View>
        <View style={[styles.friendsHeaderRequest,{height:50}]}>
          <Text style={{textAlign:'center',fontStyle:'italic'}}>{reduxdescription}</Text>
          
        </View>
        <View style={styles.switchRow}>
          <Text style={[styles.settingsActionText,{paddingRight:10}]}>ASK BEFORE STICKING NOTE</Text>
          <Switch
            onValueChange={() => askBeforeStick({ setAskBeforeStickingNoteFlag })}
            value={askBeforeStickingNoteFlag}
          />
        </View>

        
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalPasswordResetView}>
            <View style={styles.modalPasswordResetViewChild}>
              <TextInput style={styles.modalPasswordResetTextInput} placeholder='' onChangeText={text=>newDescription(text)} multiline={true} maxLength={50}/>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={()=>{
                  changeDescription()
                  setModalVisible(false)
                }} style={styles.editNote}><Text style={styles.editNoteText}>Edit</Text></Pressable>
                <Pressable onPress={()=>{
                  setModalVisible(false)
                }} style={styles.editNoteBack}><Text style={styles.editNoteBackText}>Back</Text></Pressable>
              </View> 
            </View>
          </View>
        </Modal>

        <Pressable style={styles.friendsHeaderRequest} onPress={()=>setModalVisible(true)}>
          <Text style={styles.settingsActionText}>CHANGE DESCRIPTION</Text>
        </Pressable>

        <Pressable style={styles.friendsHeaderRequest} onPress={async ()=>{
          await pickImage()
        }}>
          <Text style={styles.settingsActionText}>CHANGE PROFILE PHOTO</Text>
        </Pressable>

        {showInput && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={message?message:"NEW PASSWORD"}
            onChangeText={text=>setNewPassword(text)}
            value={newPassword}
            secureTextEntry
            maxLength={25}
          />   
        )}

        <Pressable style={styles.friendsHeaderRequest} onPress={handlePasswordChange}>
          <Text style={styles.settingsActionText}>{showInput ? 'SET NEW PASSWORD' : 'CHANGE PASSWORD'}</Text>
        </Pressable>

        {showInputUsername && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={message?message:"USERNAME"}
            onChangeText={text=>setNewUsername(text)}
            value={newUsername}
            maxLength={25}
          />
        )}
        <Pressable style={styles.friendsHeaderRequest} onPress={handleUsernameChange}>
          <Text style={styles.settingsActionText}>{showInputUsername ? 'SET USERNAME' : 'CHANGE USERNAME'}</Text>
        </Pressable>

        <Pressable style={styles.friendsHeaderRequest} onPress={()=>signOutAndClearReduxStore(dispatch)}>
          <Text style={styles.settingsActionText}>LOGOUT</Text>
        </Pressable>
      </View>

      <Pressable style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
        <Text style={styles.removeFriendText}>
          {deleteAccountPressed ? 'CONFIRM ACCOUNT DELETE' : 'DELETE ACCOUNT'}
        </Text>
      </Pressable>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingsScreen;