import { Text,View, Pressable, TextInput,FlatList } from 'react-native'
import React from 'react'
import {sendFriendRequest} from '../functions/sendFriendRequest'
import {styles} from '../../../../assets/styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import {setEmail,setMessage} from '../../../../store/login/loginSlice'
import { useFocusEffect } from '@react-navigation/native';

export const FriendsScreen = ({ navigation }) => {
  const {friends} = useSelector((state) => state.friends);
  const {message,email} = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      return ()=>{
        dispatch(setMessage(''))
        dispatch(setEmail(''))
      }
    }, [])
  );

  const renderFriends = ({ item }) => {
    return (
      <Pressable onPress={() =>navigation.navigate('FriendsBoard', {name:item, friendEmail: item})} style={styles.friendInList}><Text>{item}</Text></Pressable>
    );
  };

  return (
    <View style={styles.board}>
      <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('Requests')}><Text style={styles.friendsHeaderRequestText}>REQUESTS</Text></Pressable>

      <TextInput style={styles.friendsTextInput} placeholder='INSERT FRIEND EMAIL' onChangeText={text => dispatch(setEmail(text))} value={email} autoCorrect={false}/>

      <Pressable style={styles.friendsHeaderRequest} onPress={()=>sendFriendRequest(dispatch,email)}><Text style={styles.friendsHeaderRequestText}>ADD</Text></Pressable>

      <Text style={styles.friendsMessage}>{message}</Text>

      <Text style={styles.friendsFriendsHeader}>FRIENDS</Text>
      <FlatList data={friends} renderItem={renderFriends} keyExtractor={(friend) => friend}/>
    </View>
  );
}

export default FriendsScreen