import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {createNote} from '../functions/createNote'
import {removeFriend} from '../functions/removeFriend'
import {styles} from '../../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database'
import { useFocusEffect } from '@react-navigation/native';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';
import { setNickname } from '../../../../store/friends/friendsSlice';

const FriendsBoard = ({ route, navigation }) => {
  const [description, newDescription] = useState(reduxdescription);
  const { friendEmail,name,oldnickname} = route.params;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { reduxdescription } = useSelector((state) => state.login);

  const EMAIL = auth().currentUser.email

  useFocusEffect(
    React.useCallback(() => {
      const getDescriptionByUsername = async () =>{
        const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
        const usersRef = database.ref('users');
        const userSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
        const userData = userSnapshot.val();
        const userId = Object.keys(userData)[0];
        const description = userData[userId].description;
        newDescription(description)
      }

      getDescriptionByUsername()

      downloadImage(friendEmail).then((fileUri)=>{
        dispatch(setFriendimage(fileUri));
      })


      const onChildRemove = () => {
        navigation.navigate('FriendsScreen')
        navigation.navigate('UserBoard', {name:name, friendEmail:friendEmail , oldnickname:oldnickname})
      };

      const listen = async ()=>{
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
      
        const friendsRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/friends`);

        friendsRef.on('child_removed', onChildRemove);
      }

      listen()
      
      return ()=>{
        const listenOff = async () => {
          const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
          const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          const friendsRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/friends`);
  
          // Remove the 'child_added' listener when the component unmounts
          friendsRef.off('child_removed', onChildRemove);
        }

        listenOff()
      }
      
    }, [])
  );


  const [showInput,setShowInput] = useState(false)
  const [nickname,setNewNickName] = useState('')
  const [nicknameMessage,setNewNickNameMessage] = useState('')

  const handleNickNameChange = async () => {
    if (showInput) {

      const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
      const usersRef = database.ref('users');
      const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
      const userData = userSnapshot.val();
      const userId = Object.keys(userData)[0];
      const friends = userData[userId].friends;

      friends.forEach((friend)=>{
        if(friend.email === friendEmail){
          friend['nickname'] = nickname
        }
      });

      await usersRef.child(`${userId}/friends`).set(friends).then(()=>{
        dispatch(setNickname({friendEmail,nickname}))
        navigation.navigate('FriendsScreen')
      }).catch(()=>setNewNickNameMessage('try different nickname'));

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

        {friendimage && <Image source={{uri: friendimage}} style={styles.ProfilePic}/>}

        <View style={[styles.friendsHeaderRequest,{height:50}]}>
          <Text style={{textAlign:'center',fontStyle:'italic'}}>{description}</Text>
        </View>
        

        <TextInput style={[styles.friendsTextInput,{paddingTop:10}]} placeholder={message?message:"New note"} value={content} onChangeText={text=>setContent(text)} autoCapitalize="sentences"
          autoCorrect={false} maxLength={100} multiline/>

          <Pressable style={styles.friendsHeaderRequest} onPress={()=>createNote(content,setContent,setMessage,friendEmail)}><Text style={styles.removeFriendText}>Create note</Text></Pressable>


          {showInput && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={nicknameMessage?nicknameMessage:"Nick"}
            onChangeText={text=>setNewNickName(text)}
            value={nickname}
            maxLength={25}
          />   
        )}

        <Pressable style={styles.friendsHeaderRequest} onPress={handleNickNameChange}>
          <Text style={styles.removeFriendText}>{showInput ? 'Confirm' : 'Set nickname'}</Text>
        </Pressable>

        <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('HistoryScreen',{friendEmail:friendEmail})}>
          <Text style={styles.removeFriendText}>
            Your notes
          </Text>
        </Pressable>
        
      </View>

      <View>
        <Text style={[styles.removeFriendText,{fontSize:14,marginBottom:10}]}>{oldnickname?friendEmail:''}</Text>
        
        <Pressable style={styles.deleteAccountButton} onPress={()=>{
          removeFriend(navigation,friendEmail,name,nickname,dispatch)
          navigation.navigate('FriendsScreen')
          navigation.navigate('UserBoard', {name:name, friendEmail:friendEmail , oldnickname:oldnickname})
          }}><Text style={styles.removeFriendText}>Remove friend</Text></Pressable>
      </View>
      
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FriendsBoard;
