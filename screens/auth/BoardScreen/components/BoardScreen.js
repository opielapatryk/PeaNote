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
import { setUsername,setMyimage } from '../../../../store/settings/settingsSlice';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const downloadImage = async () => {
    const EMAIL = auth().currentUser.email
    const fileRef = firebase.storage().ref(`/images/${EMAIL}`);
  
    fileRef.getDownloadURL().then((url)=>{
      dispatch(setMyimage(url))
    });
  }

  useEffect(()=>{
    // downloadImage();
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
  const insets = useSafeAreaInsets();
  return (
    <View style={[{
      paddingTop: insets.top,
      backgroundColor:'#FFFDF3',
      flex: 1,
    }]}>
      <Pressable onPress={() => checkThenChangeInfo(dispatch,notes)} style={styles.board}>
      {notes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={notes} renderItem={({item})=>renderNotes({item})} keyExtractor={KEY_EXTRACTOR_NOTES}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;