import React,{ useEffect } from 'react';
import { Pressable,View,FlatList } from 'react-native';
import { renderNotes } from './apiBoardScreen';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../assets/styles/styles';
import { fetchNotes, checkThenChangeInfo } from './apiBoardScreen';
import { useFocusEffect } from '@react-navigation/native';

const BoardScreen = () => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchNotes(dispatch);
  },[])

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes(dispatch);
    }, [])
  );

  return (
    <View style={styles.flexone}>
      <Pressable onPress={() => checkThenChangeInfo(dispatch,notes)} style={styles.board}>
        <FlatList data={notes} renderItem={renderNotes} keyExtractor={note => note.id}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;