import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TextInput, Pressable,Keyboard,TouchableWithoutFeedback,Image, Linking,Modal,KeyboardAvoidingView,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../../assets/styles/styles';
import {checkIsAskBeforeStickingNoteFlagOff} from '../functions/checkIsAskBeforeStickingNoteFlagOff';
import {askBeforeStick} from '../functions/askBeforeStick';
import {deleteAccount} from '../functions/deleteAccount';
import {changePassword} from '../functions/changePassword';
import { setMyimage, setShowInput,setShowInputUsername,showModal} from '../../../../store/settings/settingsSlice';
import { setDescription, setMessage } from '../../../../store/login/loginSlice';
import { useFocusEffect } from '@react-navigation/native';
import { signOutAndClearReduxStore } from '../functions/signOutAndClearReduxStore'
import {changeUsername} from '../functions/changeUsername'
import * as ImagePicker from 'expo-image-picker'
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/storage'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { firebase as firebasedb} from '@react-native-firebase/database';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import GivePasswordModal from './GivePasswordModal';


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
  const EMAIL = auth().currentUser.email
  const insets = useSafeAreaInsets();
  const {modal} = useSelector((state)=>state.settings)


  const handlePasswordChange = () => {
    if (showInput) {
      changePassword({ setDeleteAccountPressed, newPassword, dispatch,setNewPassword });
    } else {
      setDeleteAccountPressed(false);
      dispatch(setShowInput(true))
      dispatch(setMessage(''));
    }
  };

  const handleUsernameChange = () => {
    if (showInputUsername) {
      changeUsername({ setDeleteAccountPressed, newUsername, dispatch,setNewUsername });
    } else {
      setDeleteAccountPressed(false);
      dispatch(setShowInputUsername(true))
      dispatch(setMessage(''));
    }
  };

  const handleDeleteAccount = () => {
    if (deleteAccountPressed) {
      deleteAccount({ notes, dispatch, pendingNotes })
      setTimeout(() => {
        setDeleteAccountPressed(false);
      }, 1000);
    } else {
      setDeleteAccountPressed(true);
    }
  };

  const changeDescription = async ()=>{
    const database = firebasedb.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');
    const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = userSnapshot.val();
    const userId = Object.keys(userData)[0];
    await usersRef.child(`${userId}/description`).set(description);
    dispatch(setDescription(description))
  }

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
    const { uri } = image;

    const compressedImageData = (await ImageManipulator.manipulateAsync(uri,[{resize:{
      height: 300, 
      width: 300
    }}],{compress:0.1,format: ImageManipulator.SaveFormat.JPEG}))

    const path = `${EMAIL}`;

    const reference = firebase.storage().ref(path);

    const response = await fetch(compressedImageData.uri);

    const blob = await response.blob();

    await reference.put(blob);

    setImage(null)
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
    if (image) {
      FileSystem.deleteAsync(FileSystem.cacheDirectory + `images/${EMAIL}`);
      uploadImage()
      dispatch(setMyimage(image.uri)) 
    }
  }, [image]);

  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff().then((resp)=>{
      setAskBeforeStickingNoteFlag(resp)
    })
  }, []);

  return (
    
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
      
<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <KeyboardAvoidingView style={[styles.friendsboard,{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'white'
    }]} behavior='position'>
            <GivePasswordModal modalVisible={modal} setModalVisible={showModal}/>  

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalPasswordResetView}>
            <View style={styles.modalPasswordResetViewChild}>
              <TextInput style={styles.modalPasswordResetTextInput} value={description} onChangeText={text=>newDescription(text)} maxLength={50} onSubmitEditing={()=>{
                changeDescription()
                setModalVisible(false)
              }}/>
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
      
      <View style={styles.ProfilePicGrandparent}>
      <Text style={[styles.friendsHeaderRequestText,{marginTop:20}]}>{username}</Text>
          
          {myimage && <Image source={{uri: myimage}} style={styles.ProfilePic}/>}
        </View>
        <View style={[styles.friendsHeaderRequest,{height:50}]}>
          <Text style={{textAlign:'center',fontStyle:'italic'}}>{reduxdescription}</Text>
          
        </View>
        <View style={styles.switchRow}>
          <Text style={[styles.settingsActionText,{paddingRight:10}]}>Ask before sticking note</Text>
          <Switch
            onValueChange={() => askBeforeStick({ setAskBeforeStickingNoteFlag })}
            value={askBeforeStickingNoteFlag}
          />
        </View>

        


        <Pressable style={styles.friendsHeaderRequest} onPress={()=>{
          newDescription(reduxdescription)
          setModalVisible(true)}}>
          <Text style={styles.settingsActionText}>Change description</Text>
        </Pressable>

        <Pressable style={styles.friendsHeaderRequest} onPress={()=>{
          pickImage()
        }}>
          <Text style={styles.settingsActionText}>Change profile photo</Text>
        </Pressable>

        {showInput && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={message?message:"New password"}
            onChangeText={text=>setNewPassword(text)}
            value={newPassword}
            secureTextEntry
            maxLength={25}
            onSubmitEditing={handlePasswordChange}
          />   
        )}

        <Pressable style={styles.friendsHeaderRequest} onPress={handlePasswordChange}>
          <Text style={styles.settingsActionText}>{showInput ? 'Set new password' : 'Change password'}</Text>
        </Pressable>

        {showInputUsername && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={message?message:"Username"}
            onChangeText={text=>setNewUsername(text)}
            value={newUsername}
            maxLength={25}
            onSubmitEditing={handleUsernameChange}
          />
        )}
        <Pressable style={styles.friendsHeaderRequest} onPress={handleUsernameChange}>
          <Text style={styles.settingsActionText}>{showInputUsername ? 'Set username' : 'Change username'}</Text>
        </Pressable>

        <Pressable style={styles.friendsHeaderRequest} onPress={handleDeleteAccount}>
        <Text style={styles.settingsActionText}>
          {deleteAccountPressed ? 'Confirm' : 'Delete account'}
        </Text>
      </Pressable>

        


      <Pressable style={styles.deleteAccountButton} onPress={()=>signOutAndClearReduxStore(dispatch)}>
          <Text style={[styles.settingsActionText,{alignSelf:'center'}]}>Logout</Text>
        </Pressable>
    </KeyboardAvoidingView>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SettingsScreen;