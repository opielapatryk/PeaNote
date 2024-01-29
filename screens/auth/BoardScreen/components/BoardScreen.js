import React,{ useEffect } from 'react';
import { Pressable,View,FlatList } from 'react-native';
import { renderNotes } from '../functions/renderNotes';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../assets/styles/styles';
import { checkThenChangeInfo } from '../functions/checkThenChangeInfo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes } from '../functions/fetchNotes';
import { KEY_EXTRACTOR_NOTES } from '../../../constants';

// Here are displayed all approved notes
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
        <FlatList numColumns={2} data={notes} renderItem={renderNotes} keyExtractor={KEY_EXTRACTOR_NOTES}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;