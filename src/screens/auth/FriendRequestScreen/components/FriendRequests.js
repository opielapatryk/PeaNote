import { FlatList,View,Animated } from 'react-native'
import React, { useRef } from 'react'
import { renderRequests } from '../functions/renderRequests';
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../../FriendsScreen/functions/loadUser';
import {firebase} from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { cleanStoreFriends } from '../../../../store/friends/friendsSlice';

const FriendRequests = ({navigation}) => {
  const {requests} = useSelector((state)=>state.friends)
  const dispatch = useDispatch()
  const translation = useRef(new Animated.Value(0)).current;
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

        friendsRef.on('child_added', onChildAdd);
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
          friendsRef.off('child_added', onChildAdd);
          friendsRef.off('child_removed', onChildRemove);
        }

        listenOff()
      }
    }, [])
  );

  return (
    <View style={{flex:1,backgroundColor:'#FFF'}}>
       <FlatList data={requests} renderItem={({item})=>renderRequests({item},dispatch,navigation,translation)} keyExtractor={(friend, index) => friend.id || index.toString()}/>
    </View>
   
  );
}

export default FriendRequests