import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image,Dimensions } from 'react-native';
import {styles} from '../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import * as FileSystem from 'expo-file-system';
import { sendFriendRequest } from '../functions/sendFriendRequest';

const UserBoard = ({ route, navigation }) => {
  const { friendEmail,name,oldnickname} = route.params;
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { message,reduxdescription } = useSelector((state) => state.login);
  const [description, newDescription] = useState(reduxdescription);
  const EMAIL = auth().currentUser.email

  const downloadImage = async (email) => {
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const imgFileUri = imgDir + email;
    let imgUrl 
    try {
      imgUrl = await firebase.storage().ref(email).getDownloadURL()
    } catch (error) {
      imgUrl = await firebase.storage().ref('default.jpeg').getDownloadURL()
    }

    // Checks if img directory exists. If not, creates it
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    }

    // Returns URI to our local img file
    // If our img doesn't exist locally, it downloads it
    async function getSingleImg() {
      await ensureDirExists();

      const fileUri = imgFileUri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(imgUrl, fileUri);
      }

      dispatch(setFriendimage(fileUri));
    }
    
    getSingleImg()
  }


  useFocusEffect(
    React.useCallback(() => {
      const getEmailByUsername = async () =>{
        const usernameSnapshot = await firestore()
          .collection('users')
          .where('username', '==', friendEmail)
          .get();

          if (usernameSnapshot.empty) {
            // If no user is found by email, try searching by username
            const emailSnapshot = await firestore()
              .collection('users')
              .where('email', '==', friendEmail)
              .get();
        
            if (usernameSnapshot.empty) {
              return null;
            }

            newDescription(emailSnapshot.docs[0].data().description)
            return emailSnapshot.docs[0].data().email
          }else{
            newDescription(usernameSnapshot.docs[0].data().description)
            return usernameSnapshot.docs[0].data().email
          }

          
      }

      getEmailByUsername()

    }, [])
  );


  return (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1,
    backgroundColor: '#FFF',
    justifyContent:"space-between",}}>
      <View style={{alignItems:'center',backgroundColor:'white'}}>
        <View style={styles.ProfilePicParent}>
        {friendimage && <Image source={{uri: friendimage}} style={styles.ProfilePic}/>}
       
        
        </View>

            <Text style={{textAlign:'center',fontStyle:'italic'}}>{description}</Text>

        <Pressable style={[styles.deleteAccountButton,{borderTopWidth:.17,borderColor:'lightgrey', marginTop:30,padding:10}]} onPress={()=>sendFriendRequest(dispatch,friendEmail,navigation)}><Text style={styles.removeFriendText}>{message?message:'ADD FRIEND'}</Text></Pressable>
        
        
      </View>

      <View>
        

      </View>
      
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserBoard;
