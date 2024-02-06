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
import { clearBoardInfo } from '../../../../store/notes/boardSlice';
import { setUsername } from '../../../../store/settings/settingsSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const BoardScreen = () => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch()

  async function getUserName(){
    const EMAIL = auth().currentUser.email

    const getUserByEmail = await firestore()
    .collection('users')
    .where('email', '==', EMAIL)
    .get()
    
    if (!getUserByEmail.empty) {
      getUserByEmail.forEach(doc => {
        dispatch(setUsername(doc.data().username))
      })
    }
  }

  useEffect(()=>{
    getUserName();
    fetchNotes(dispatch);
    loadUser(dispatch)
  },[])

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes(dispatch);
      return ()=>{
        dispatch(clearBoardInfo());
      }
    }, [])
  );

  return (
    <View style={styles.flexone}>
      <Pressable onPress={() => checkThenChangeInfo(dispatch,notes)} style={styles.board}>
      {notes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={notes} renderItem={({item})=>renderNotes({item})} keyExtractor={KEY_EXTRACTOR_NOTES}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;