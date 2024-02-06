import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image,Dimensions } from 'react-native';
import {createNote} from '../functions/createNote'
import {removeFriend} from '../functions/removeFriend'
import {styles} from '../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { setMyimage } from '../../../../store/settings/settingsSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const FriendsBoard = ({ route, navigation }) => {
  const { friendEmail,name } = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const { myimage } = useSelector((state) => state.settings);

  const EMAIL = auth().currentUser.email
  const downloadImage = async (email) => {
    const fileRef = firebase.storage().ref(`/images/${email}`);
  
    fileRef.getDownloadURL().then((url)=>{
      dispatch(setMyimage(url))
    }).catch((error) => {console.log(error);});
  }


  useFocusEffect(
    React.useCallback(() => {
      downloadImage(friendEmail)
      return ()=>{
        downloadImage(EMAIL)
      }
    }, [])
  );

  return (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
      <View style={styles.friendsboard}>
      <View style={{alignItems:'center',backgroundColor:'white'}}>
        
        {myimage && <Image source={{uri: myimage}} style={{width:Dimensions.get('window').height/5,height:Dimensions.get('window').height/5,borderRadius:100,marginTop:10,marginBottom:10,resizeMode:'stretch'}}/>}

        <TextInput style={styles.friendsTextInput} placeholder={message?message:"NEW NOTE"} value={content} onChangeText={text=>setContent(text)} autoCapitalize="sentences"
          autoCorrect={false} maxLength={100} multiline/>

          <Pressable style={styles.friendsHeaderRequest} onPress={()=>createNote(content,setContent,setMessage,friendEmail,name)}><Text style={styles.removeFriendText}>CREATE NOTE</Text></Pressable>
        
      </View>


        <Pressable style={styles.deleteAccountButton} onPress={()=>removeFriend(navigation,friendEmail,name,dispatch)}><Text style={styles.deleteAccountText}>REMOVE FRIEND</Text></Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FriendsBoard;
