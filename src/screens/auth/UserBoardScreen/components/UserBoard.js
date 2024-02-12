import React, { useState } from 'react';
import { Text, View, Pressable, Keyboard,  TouchableWithoutFeedback,Image } from 'react-native';
import {styles} from '../../../../assets/styles/styles'
import { useDispatch,useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { sendFriendRequest } from '../functions/sendFriendRequest';

const UserBoard = ({ route, navigation }) => {
  const [description, newDescription] = useState(reduxdescription);
  const { friendEmail,name,oldnickname} = route.params;
  const dispatch = useDispatch()
  const { friendimage } = useSelector((state) => state.settings);
  const { message,reduxdescription } = useSelector((state) => state.login);
  

  useFocusEffect(
    React.useCallback(() => {
      const getEmailByUsername = async () =>{
        const usernameSnapshot = await firestore()
          .collection('users')
          .where('username', '==', friendEmail)
          .get();

          if (usernameSnapshot.empty) {
            const emailSnapshot = await firestore()
              .collection('users')
              .where('email', '==', friendEmail)
              .get();

            newDescription(emailSnapshot.docs[0].data().description)
          }else{
            newDescription(usernameSnapshot.docs[0].data().description)
          }
      }
      getEmailByUsername()
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