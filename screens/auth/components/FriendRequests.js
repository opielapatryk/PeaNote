import { Button, Pressable,  FlatList, Animated } from 'react-native'
import React, {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { loadUser, removeReq,approveFriend } from '../logic/apiFriendRequests';

const FriendRequests = ({ navigation }) => {
    const [friends,setFriends] = useState([])
    const animatedValues = friends.map(() => new Animated.Value(200));

    useFocusEffect(
        React.useCallback(() => {
          loadUser(setFriends)
        }, [])
      );

      const renderFriends = ({item,index}) =>{
        return (
            <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
                <Button title={String(item)} onPress={()=>approveFriend(item.id,index,animatedValues)}/>
                <Pressable onPress={()=>removeReq(item.id,index,animatedValues)}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                </Pressable>
            </Animated.View>
        )
      }
      const keyExtractor = (friend, index) => friend.id || index.toString();
  return (
    <FlatList data={friends} renderItem={renderFriends} keyExtractor={keyExtractor}/>
  );
}

export default FriendRequests