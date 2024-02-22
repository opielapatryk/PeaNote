import React,{ useEffect } from 'react';
import { Pressable,View,FlatList,Text } from 'react-native';
import { renderNotes } from '../functions/renderNotes';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../../assets/styles/styles';
import { checkIsInfo } from '../functions/checkIsInfo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes } from '../functions/fetchNotes';
import { loadUser } from '../../FriendsScreen/functions/loadUser';
import { clearBoardInfo } from '../../../../store/notes/boardSlice';
import { setUsername,setMyimage } from '../../../../store/settings/settingsSlice';
import auth from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setDescription,setMessage,setEmail } from '../../../../store/login/loginSlice';
import {getUserDocs} from '../functions/getUserDocs'
import {downloadImage} from '../functions/downloadImage'
import { showModal } from '../../../../store/login/loginSlice';
import SetPasswordModal from './SetPasswordModal';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch()
  const EMAIL = auth().currentUser.email
  const {modal} = useSelector((state)=>state.login)


  useEffect(()=>{
    downloadImage(EMAIL).then((fileUri)=>{
      dispatch(setMyimage(fileUri));
    })
    getUserDocs().then((docs)=>{
      docs.forEach(doc => {
        dispatch(setUsername(doc.data().username))
        dispatch(setDescription(doc.data().description))
      })
    })
    fetchNotes(dispatch);
    loadUser(dispatch)
    dispatch(setMessage(''))
    dispatch(setEmail(''))
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
    <View style={{paddingTop: insets.top,backgroundColor:'#FFFDF3',flex: 1}}>
    <SetPasswordModal modalVisible={modal} setModalVisible={showModal}/>

      <Pressable onPress={() => {
        checkIsInfo(dispatch,notes)

        }} style={styles.board}>
        {notes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={notes} renderItem={({item})=>renderNotes({item})} keyExtractor={(note) => note.id}/>
      </Pressable>
    </View>
  );
};

export default BoardScreen;