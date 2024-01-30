import { FlatList,View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../functions/loadUser'
import { renderFriends } from '../functions/renderFriends';
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
    <View style={styles.board}>
       <FlatList data={friends} renderItem={({item})=>renderFriends({item},friends)} keyExtractor={KEY_EXTRACTOR_FRIENDS}/>
    </View>
   
  );
}

export default FriendRequests