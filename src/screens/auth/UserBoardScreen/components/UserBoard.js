import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { sendFriendRequest } from '../functions/sendFriendRequest';
import { useDescription } from './useDescription';

const UserBoard = ({ route, navigation }) => {
  const { friendEmail,name,oldnickname} = route.params;
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { message } = useSelector((state) => state.login);
  const [invited, setInvited] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1,backgroundColor: '#FFF',justifyContent:"space-between"}}>
        <View style={{alignItems:'center'}}>
          <View style={styles.ProfilePicParent}>
            {friendimage && <Image source={{uri: friendimage}} style={styles.ProfilePic}/>}
          </View>

          <Text style={{textAlign:'center',fontStyle:'italic'}}>{useDescription(friendEmail)}</Text>

          <Pressable style={styles.addFriendButton} onPress={()=>sendFriendRequest(dispatch,friendEmail,navigation)}>
          <Text style={styles.removeFriendText}>{message?message:(invited?'REMOVE REQUEST':'ADD FRIEND')}</Text>
          </Pressable>  
       </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserBoard;