import { FlatList,View } from 'react-native'
import React from 'react'
import { renderRequests } from '../functions/renderRequests';
import { KEY_EXTRACTOR_FRIENDS } from '../../../constants';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../../FriendsScreen/functions/loadUser';

const FriendRequests = ({navigation}) => {
  const {requests} = useSelector((state)=>state.friends)
  const dispatch = useDispatch()
      
  useFocusEffect(
    React.useCallback(() => {
      loadUser(dispatch)
      console.log(requests);
    }, [])
  );

  return (
    <View style={styles.board}>
       <FlatList data={requests} renderItem={({item})=>renderRequests({item},dispatch,navigation)} keyExtractor={KEY_EXTRACTOR_FRIENDS}/>
    </View>
   
  );
}

export default FriendRequests