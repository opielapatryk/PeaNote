import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { removeFriendRequestFromFirestore } from '../../FriendRequestScreen/functions/removeFriendRequestFromFirestore';
import { approveFriend } from '../functions/approveFriend'
import { getDescription } from '../../UserBoardScreen/functions/getDescription';
import auth from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/database'
import { cleanStoreFriends } from '../../../../store/friends/friendsSlice';
import { loadUser } from '../../FriendsScreen/functions/loadUser';

const RequestUserScreen = ({ route, navigation }) => {
  const [description, newDescription] = useState(reduxdescription);
  const { friendEmail,name,oldnickname} = route.params;
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { message,reduxdescription } = useSelector((state) => state.login);
  const EMAIL = auth().currentUser.email

  useFocusEffect(
    React.useCallback(() => {
      getDescription(friendEmail).then((description)=>newDescription(description))

      const onChildRemove = () => {
        dispatch(cleanStoreFriends())
        loadUser(dispatch);
        navigation.navigate('Requests')
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
  
          friendsRef.off('child_removed', onChildRemove);
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
          <Text style={{textAlign:'center',fontStyle:'italic'}}>{description}</Text>

          <Pressable style={styles.addFriendButton} onPress={async ()=>{
            await approveFriend(friendEmail,name,dispatch)
            navigation.navigate('FriendsScreen')
            navigation.navigate('FriendsBoard', {name:name, friendEmail:friendEmail , oldnickname:oldnickname})
            }}>
          <Text style={styles.removeFriendText}>{message?message:'Approve'}</Text>
          </Pressable>  
       </View>
       <View>
        <Pressable style={styles.deleteAccountButton} onPress={()=>{removeFriendRequestFromFirestore(friendEmail,dispatch)
        navigation.navigate('Requests')}}><Text style={styles.removeFriendText}>Remove Request</Text></Pressable>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RequestUserScreen;