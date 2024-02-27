import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../../assets/styles/styles'
import { useSelector,useDispatch } from 'react-redux';
import { sendFriendRequest } from '../functions/sendFriendRequest';
import {removeFriendRequestFromFirestore} from '../../FriendRequestScreen/functions/removeFriendRequestFromFirestore';
import { useDescription } from './useDescription';
import { useRequest } from './useRequest';
import {firebase} from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { useFocusEffect } from '@react-navigation/native';

const UserBoard = ({ route,navigation }) => {
  const { friendEmail,name,oldnickname} = route.params;
  const { friendimage } = useSelector((state) => state.settings);
  const [invite,setInvite] = useState();
  const dispatch = useDispatch()
  const EMAIL = auth().currentUser.email
  let invited = useRequest(friendEmail)

  useFocusEffect(
    React.useCallback(() => {
      const onChildChange = () => {
        navigation.navigate('FriendsScreen')
        navigation.navigate('FriendsBoard', {name:name, friendEmail:friendEmail , oldnickname:oldnickname})
      };

      const onChildAdd = () => {
        navigation.navigate('FriendsScreen')
        navigation.navigate('FriendsBoard', {name:name, friendEmail:friendEmail , oldnickname:oldnickname})
      };



      const listen = async ()=>{
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
      
        const friendsRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/friends`);

        friendsRef.on('child_changed', onChildChange);
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
          friendsRef.off('child_changed', onChildChange);
        }

        listenOff()
      }
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1,backgroundColor: '#FFF',justifyContent:"space-between"}}>
        <View style={{alignItems:'center'}}>

            {friendimage && <Image source={{uri: friendimage}} style={styles.ProfilePic}/>}


          <Text style={{textAlign:'center',fontStyle:'italic'}}>{useDescription(friendEmail)}</Text>

          <Pressable style={styles.addFriendButton} onPress={invited||invite?()=>{
            removeFriendRequestFromFirestore(friendEmail,dispatch)
            setInvite(false)
          }:()=>{
            sendFriendRequest(friendEmail)
            setInvite(true)
            }}>
          <Text style={styles.removeFriendText}>{invited||invite?'Remove friend request':'Send friend request'}</Text>
          </Pressable>  
       </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserBoard;