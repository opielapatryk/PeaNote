import { FlatList,View } from 'react-native'
import React from 'react'
import { renderRequests } from '../functions/renderRequests';
import { KEY_EXTRACTOR_FRIENDS } from '../../../constants';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch, useSelector } from "react-redux";

const FriendRequests = ({navigation}) => {
  const {requests} = useSelector((state)=>state.friends)
  const dispatch = useDispatch()
      
  return (
    <View style={styles.board}>
       <FlatList data={requests} renderItem={({item})=>renderRequests({item},dispatch,navigation)} keyExtractor={KEY_EXTRACTOR_FRIENDS}/>
    </View>
   
  );
}

export default FriendRequests