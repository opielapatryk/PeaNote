import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../../assets/styles/styles'
import { useSelector,useDispatch } from 'react-redux';
import { sendFriendRequest } from '../functions/sendFriendRequest';
import {removeFriendRequestFromFirestore} from '../../FriendRequestScreen/functions/removeFriendRequestFromFirestore';
import { useDescription } from './useDescription';
import { useRequest } from './useRequest';

const UserBoard = ({ route }) => {
  const { friendEmail,name,oldnickname} = route.params;
  const { friendimage } = useSelector((state) => state.settings);
  const [invite,setInvite] = useState();
  const dispatch = useDispatch()
  let invited = useRequest(friendEmail)

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