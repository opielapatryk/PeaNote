import React,{ useEffect } from 'react';
import { Pressable,View,FlatList } from 'react-native';
import { renderNotes } from './renderNotes';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../assets/styles/styles';
import { checkThenChangeInfo } from '../functions/checkThenChangeInfo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes } from '../functions/fetchNotes';
import { MY_EMAIL } from '../../../constants';

const BoardScreen = () => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchNotes(dispatch);
    console.log('[BoardScreen.js] my email: ',MY_EMAIL);
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