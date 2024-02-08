import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image,Dimensions } from 'react-native';
import {createNote} from '../functions/createNote'
import {removeFriend} from '../functions/removeFriend'
import {styles} from '../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { setMyimage } from '../../../../store/settings/settingsSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import * as FileSystem from 'expo-file-system';

const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail,name,oldnickname} = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const { myimage } = useSelector((state) => state.settings);

  const EMAIL = auth().currentUser.email

  const downloadImage = async (email) => {
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const imgFileUri = imgDir + email;
    const imgUrl = await firebase.storage().ref(email).getDownloadURL() 

    // Checks if img directory exists. If not, creates it
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        console.log("Images directory doesn't exist, creating…");
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
        console.log("Img isn't cached locally. Downloading…");
        await FileSystem.downloadAsync(imgUrl, fileUri);
      }

      dispatch(setMyimage(fileUri));
    }
    
    getSingleImg()
  }


  useFocusEffect(
    React.useCallback(() => {
      downloadImage(friendEmail)
      return ()=>{
        downloadImage(EMAIL)
      }
    }, [])
  );

  const [showInput,setShowInput] = useState(false)
  const [nickname,setNewNickName] = useState('')
  const [nicknameMessage,setNewNickNameMessage] = useState('')
  
  const handleNickNameChange = async () => {
    if (showInput) {

      const getUserByEmail = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()

      getUserByEmail.forEach((doc)=>{
        let friends = doc.data().friends

        friends.forEach((friend)=>{
          if(friend.email === friendEmail){
            
            friend['nickname'] = nickname

          }
        });

        firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends: friends,
          }).then(()=>setNewNickNameMessage('nickname changed')).catch(()=>setNewNickNameMessage('try different nickname'))

      })

      setNewNickName('')
      
      
      setTimeout(() => {
        setShowInput(false)
        setNewNickNameMessage('')
      }, 2000);
    } else {
      setShowInput(true)
    }
  };

  return (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1,
    backgroundColor: '#FFF',
    justifyContent:"space-between",}}>
      <View style={{alignItems:'center',backgroundColor:'white'}}>
        <View style={styles.ProfilePicParent}>
        {myimage && <Image source={{uri: myimage}} style={styles.ProfilePic}/>}
        </View>
        

        <TextInput style={[styles.friendsTextInput,{}]} placeholder={message?message:"NEW NOTE"} value={content} onChangeText={text=>setContent(text)} autoCapitalize="sentences"
          autoCorrect={false} maxLength={100} multiline/>

          <Pressable style={styles.friendsHeaderRequest} onPress={()=>createNote(content,setContent,setMessage,friendEmail,name)}><Text style={styles.removeFriendText}>CREATE NOTE</Text></Pressable>


          {showInput && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={nicknameMessage?nicknameMessage:"NICKNAME"}
            onChangeText={text=>setNewNickName(text)}
            value={nickname}
            maxLength={25}
          />   
        )}

        <Pressable style={styles.friendsHeaderRequest} onPress={handleNickNameChange}>
          <Text style={styles.removeFriendText}>{showInput ? 'CONFIRM' : 'SET NICKNAME'}</Text>
        </Pressable>
        
      </View>

      <View>
        <Text style={[styles.removeFriendText,{fontSize:14,marginBottom:10}]}>{oldnickname?friendEmail:''}</Text>
        
        <Pressable style={styles.deleteAccountButton} onPress={()=>removeFriend(navigation,friendEmail,name,nickname,dispatch)}><Text style={styles.removeFriendText}>REMOVE FRIEND</Text></Pressable>
      </View>
      
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FriendsBoard;
