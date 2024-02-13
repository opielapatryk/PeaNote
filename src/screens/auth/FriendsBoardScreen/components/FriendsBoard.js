import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {createNote} from '../functions/createNote'
import {removeFriend} from '../functions/removeFriend'
import {styles} from '../../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import {ensureDirExists} from "../../BoardScreen/functions/ensureDirExists";
import {getSingleImg} from '../../BoardScreen/functions/getSingleImg';

const FriendsBoard = ({ route, navigation }) => {
  const [description, newDescription] = useState(reduxdescription);
  const { friendEmail,name,oldnickname} = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { reduxdescription } = useSelector((state) => state.login);

  const EMAIL = auth().currentUser.email

  const downloadImage = async () => {
    await ensureDirExists();

    const fileUri = await getSingleImg(friendEmail)

    dispatch(setFriendimage(fileUri));
  }

  useFocusEffect(
    React.useCallback(() => {
      const getEmailByUsername = async () =>{
        const usernameSnapshot = await firestore()
          .collection('users')
          .where('email', '==', friendEmail)
          .get();
          
          newDescription(usernameSnapshot.docs[0].data().description)
      }

      getEmailByUsername()

      downloadImage()
      
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
        {friendimage && <Image source={{uri: friendimage}} style={styles.ProfilePic}/>}
        </View>

        <View style={[styles.friendsHeaderRequest,{height:50}]}>
          <Text style={{textAlign:'center',fontStyle:'italic'}}>{description}</Text>
        </View>
        

        <TextInput style={[styles.friendsTextInput,{paddingTop:10}]} placeholder={message?message:"NEW NOTE"} value={content} onChangeText={text=>setContent(text)} autoCapitalize="sentences"
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
