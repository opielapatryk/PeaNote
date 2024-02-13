import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { sendFriendRequest } from '../functions/sendFriendRequest';
import { getDescription } from '../functions/getDescription';

const UserBoard = ({ route, navigation }) => {
  const [description, newDescription] = useState(reduxdescription);
  const { friendEmail,name,oldnickname} = route.params;
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { message,reduxdescription } = useSelector((state) => state.login);
  
  useFocusEffect(
    React.useCallback(() => {
      getDescription(friendEmail).then((description)=>newDescription(description))
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1,backgroundColor: '#FFF',justifyContent:"space-between"}}>
        <View style={{alignItems:'center'}}>
          <View style={styles.ProfilePicParent}>
            {friendimage && <Image source={{uri: friendimage}} style={styles.ProfilePic}/>}
          </View>

          <Text style={{textAlign:'center',fontStyle:'italic'}}>{description}</Text>

          <Pressable style={[styles.deleteAccountButton,{borderTopWidth:.17,borderColor:'lightgrey', marginTop:30,padding:10}]} onPress={()=>sendFriendRequest(dispatch,friendEmail,navigation)}>
          <Text style={styles.removeFriendText}>{message?message:'ADD FRIEND'}</Text>
          </Pressable>  
       </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserBoard;