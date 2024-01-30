import React,{ useEffect } from 'react';
import { Pressable,View,FlatList,Text } from 'react-native';
import { renderNotes } from '../functions/renderNotes';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../assets/styles/styles';
import { checkThenChangeInfo } from '../functions/checkThenChangeInfo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes } from '../functions/fetchNotes';
import { KEY_EXTRACTOR_NOTES } from '../../../constants';
import { loadUser } from '../../FriendsScreen/functions/loadUser';
const BoardScreen = () => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch()

  useEffect(()=>{
    fetchNotes(dispatch);
    loadUser(dispatch)
  },[])

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes(dispatch);
    }, [])
  );

  return (
    <View style={styles.flexone}>
      <Pressable onPress={() => checkThenChangeInfo(dispatch,notes)} style={styles.board}>
      {notes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={notes} renderItem={renderNotes} keyExtractor={KEY_EXTRACTOR_NOTES}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;