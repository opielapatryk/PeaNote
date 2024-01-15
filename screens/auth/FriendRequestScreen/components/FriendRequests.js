import { FlatList } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../functions/loadUser'
import { renderFriends } from './renderFriends';
import { KEY_EXTRACTOR_FRIENDS } from '../../../constants';
import { styles } from '../../../../assets/styles/styles';

const FriendRequests = () => {
  const [friends,setFriends] = useState([])

  useFocusEffect(
      React.useCallback(() => {
        loadUser(setFriends)
      }, [])
    );
      
  return (
    <FlatList data={friends} renderItem={({item,index})=>renderFriends({item,index},friends)} keyExtractor={KEY_EXTRACTOR_FRIENDS} style={styles.renderFriends}/>
  );
}

export default FriendRequests