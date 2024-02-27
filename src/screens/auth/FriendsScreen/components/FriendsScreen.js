import { Text,View, Pressable, TextInput,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import {findUser} from '../functions/findUser'
import {styles} from '../../../../../assets/styles/styles'
import auth from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import {setEmail,setMessage} from '../../../../store/login/loginSlice'
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../functions/loadUser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setFriendimage } from '../../../../store/settings/settingsSlice';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';
import { cleanStoreFriends, removeFriendReducer } from '../../../../store/friends/friendsSlice'

export const FriendsScreen = ({ navigation }) => {
  const {friends} = useSelector((state) => state.friends);
  const {message,email} = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const EMAIL = auth().currentUser.email

  useFocusEffect(
    React.useCallback(() => {
      loadUser(dispatch)
      const onChildAdd = () => loadUser(dispatch);
      const onChildRemove = () => {
        dispatch(cleanStoreFriends())
        loadUser(dispatch);
      };

      const listen = async ()=>{
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
      
        const friendsRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/friends`);

        friendsRef.on('child_changed', onChildAdd);
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
          friendsRef.off('child_changed', onChildAdd);
          friendsRef.off('child_removed', onChildRemove);
        }

        listenOff()
        
        dispatch(setMessage(''))
        dispatch(setEmail(''))
      }
    }, [])
  );

  useEffect(()=>{
    loadUser(dispatch)
  },[])


  const renderFriends = ({ item }) => {
    return (
      <Pressable onPress={async () =>{
        await downloadImage(item.email).then((fileUri)=>{
          dispatch(setFriendimage(fileUri));
        })
        navigation.navigate('FriendsBoard', {name:item.username, friendEmail: item.email, oldnickname:item.nickname})
      }} style={styles.friendsList}><Text style={styles.firendListText}>{item.nickname?item.nickname:item.username}</Text></Pressable>
    );
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.board,{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'white',
    }]}>
      <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('Requests')}><Text style={styles.removeFriendText}>Requests</Text></Pressable>

      <TextInput style={styles.friendsTextInput} placeholder={message?message:'Search by email or username'} onChangeText={text => dispatch(setEmail(text))} value={email} autoCorrect={false}/>

      <Pressable style={styles.friendsHeaderRequest} onPress={()=>{
        findUser(dispatch,email,navigation)}}><Text style={styles.removeFriendText}>Search</Text></Pressable>

      <FlatList data={friends} renderItem={({item})=>renderFriends({item})} keyExtractor={(friend) => friend.id}/>
    </View>
  );
}

export default FriendsScreen