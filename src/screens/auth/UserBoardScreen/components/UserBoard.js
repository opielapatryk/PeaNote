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
  let [invite,setInvited] = useRequest(friendEmail)
  const dispatch = useDispatch()
  const EMAIL = auth().currentUser.email

  useFocusEffect(
    React.useCallback(() => {
      // check if there is pending request
      const onChildChange = () => {
        navigation.navigate('FriendsScreen')
        navigation.navigate('FriendsBoard', {name:name, friendEmail:friendEmail , oldnickname:oldnickname})
      };

      const onChildRemoved = () => {
        setInvited(false)
      }



      const listen = async ()=>{
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
      
        const friendsRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/friends`);

        friendsRef.on('child_changed', onChildChange);
        friendsRef.on('child_removed', onChildRemoved);
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
          friendsRef.off('child_removed', onChildRemoved);
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

          <Pressable style={styles.addFriendButton} onPress={invite?()=>{
            removeFriendRequestFromFirestore(friendEmail,dispatch)
            setInvited(false)
          }:()=>{
            sendFriendRequest(friendEmail,dispatch)
            setInvited(true)
            }}>
          <Text style={styles.removeFriendText}>{invite?'Remove friend request':'Send friend request'}</Text>
          </Pressable>  
       </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserBoard;