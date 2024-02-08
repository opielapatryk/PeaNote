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
import * as FileSystem from 'expo-file-system';

const BoardScreen = () => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch()
  const EMAIL = auth().currentUser.email

  async function getUserName(){
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
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const imgFileUri = imgDir + EMAIL;
    const imgUrl = await firebase.storage().ref(EMAIL).getDownloadURL() 

    // Checks if img directory exists. If not, creates it
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    }


    // Returns URI to our local img file
    // If our img doesn't exist locally, it downloads it
    async function getSingleImg() {
      await ensureDirExists();

      const fileUri = imgFileUri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(imgUrl, fileUri);
      }

      dispatch(setMyimage(fileUri));
    }
    
    getSingleImg()
  }

  

  useEffect(()=>{
    downloadImage();
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
      <Pressable onPress={() => {
        checkThenChangeInfo(dispatch,notes)
        }} style={styles.board}>
      {notes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={notes} renderItem={({item})=>renderNotes({item})} keyExtractor={KEY_EXTRACTOR_NOTES}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;