import { Text,View, Pressable, TextInput,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import {sendFriendRequest} from '../functions/sendFriendRequest'
import {styles} from '../../../../assets/styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import {setEmail,setMessage} from '../../../../store/login/loginSlice'
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../functions/loadUser';
import { cleanStoreFriends } from '../../../../store/friends/friendsSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FriendsScreen = ({ navigation }) => {
  const {friends} = useSelector((state) => state.friends);
  const {message,email} = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      loadUser(dispatch)
      return ()=>{
        dispatch(setMessage(''))
        dispatch(setEmail(''))
      }
    }, [])
  );

  useEffect(()=>{
    loadUser(dispatch)
  },[])

  const RenderFriendsMemoized = React.memo(({ item }) => {
    return (
      <Pressable onPress={() =>navigation.navigate('FriendsBoard', {name:item.username, friendEmail: item.email, oldnickname:item.nickname})} style={styles.friendsList}><Text style={styles.firendListText}>{item.nickname?item.nickname:item.username}</Text></Pressable>
    );
  });

  const renderFriends = ({ item }) => <RenderFriendsMemoized item={item} />;

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.board,{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'white',
    }]}>
      <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('Requests')}><Text style={styles.removeFriendText}>REQUESTS</Text></Pressable>

      <TextInput style={styles.friendsTextInput} placeholder={message?message:'SEARCH BY EMAIL OR USERNAME'} onChangeText={text => dispatch(setEmail(text))} value={email} autoCorrect={false}/>

      <Pressable style={styles.friendsHeaderRequest} onPress={()=>sendFriendRequest(dispatch,email,navigation)}><Text style={styles.removeFriendText}>SEARCH</Text></Pressable>

      <FlatList data={friends} renderItem={({item})=>renderFriends({item})} keyExtractor={(friend) => friend.id}/>
    </View>
  );
}

export default FriendsScreen