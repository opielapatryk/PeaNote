import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getDescription } from '../functions/getDescription';
import { removeFriendRequestFromFirestore } from '../functions/removeFriendRequestFromFirestore';
import { approveFriend } from '../functions/approveFriend'

const RequestUserScreen = ({ route, navigation }) => {
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

          <Pressable style={styles.addFriendButton} onPress={async ()=>{
            await approveFriend(friendEmail,name,dispatch)
            navigation.goBack()
            }}>
          <Text style={styles.removeFriendText}>{message?message:'Approve'}</Text>
          </Pressable>  
       </View>
       <View>
        <Pressable style={styles.deleteAccountButton} onPress={()=>{removeFriendRequestFromFirestore(friendEmail,name,dispatch)
        navigation.navigate('Requests')}}><Text style={styles.removeFriendText}>Remove Request</Text></Pressable>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RequestUserScreen;