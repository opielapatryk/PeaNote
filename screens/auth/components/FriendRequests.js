import { Text, Pressable,  FlatList, Animated, View} from 'react-native'
import React, {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { loadUser, removeReq,approveFriend } from '../logic/apiFriendRequests';
import {styles} from '../../../assets/styles/styles'
const FriendRequests = () => {
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
              <View style={styles.requestItem}>
              <Pressable onPress={()=>approveFriend(item,index,animatedValues)}><Text>{String(item)}</Text></Pressable>
                <Pressable onPress={()=>removeReq(item,index,animatedValues)}>
                    <Text>Remove</Text>
                </Pressable>
              </View>
            </Animated.View>
        )
      }
      const keyExtractor = (friend, index) => friend.id || index.toString();
  return (
    <FlatList data={friends} renderItem={renderFriends} keyExtractor={keyExtractor}  style={{flex: 1,
      padding: 10,
      backgroundColor: '#FFFBE4',}}/>
  );
}

export default FriendRequests