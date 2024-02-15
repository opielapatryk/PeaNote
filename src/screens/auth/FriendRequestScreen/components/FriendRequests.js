import { FlatList,View,Animated } from 'react-native'
import React, { useRef } from 'react'
import { renderRequests } from '../functions/renderRequests';
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../../FriendsScreen/functions/loadUser';

const FriendRequests = ({navigation}) => {
  const {requests} = useSelector((state)=>state.friends)
  const dispatch = useDispatch()
  const translation = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      loadUser(dispatch)
    }, [])
  );

  return (
    <View style={{flex:1,backgroundColor:'#FFF'}}>
       <FlatList data={requests} renderItem={({item})=>renderRequests({item},dispatch,navigation,translation)} keyExtractor={(friend, index) => friend.id || index.toString()}/>
    </View>
   
  );
}

export default FriendRequests