import React,{ useEffect } from 'react';
import { Pressable,View,FlatList,Text,Dimensions} from 'react-native';
import { renderNotes } from '../functions/renderNotes';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../../assets/styles/styles';
import { checkIsInfo } from '../functions/checkIsInfo';
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes } from '../functions/fetchNotes';
import { loadUser } from '../../FriendsScreen/functions/loadUser';
import { clearBoardInfo,showAddNoteModal } from '../../../../store/notes/boardSlice';
import { setUsername,setMyimage } from '../../../../store/settings/settingsSlice';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setDescription,setMessage,setEmail } from '../../../../store/login/loginSlice';
import {getUserDocs} from '../functions/getUserDocs'
import {downloadImage} from '../functions/downloadImage'
import { showModal,showUsernameModal } from '../../../../store/login/loginSlice';
import SetPasswordModal from './SetPasswordModal';
import SetUsernameModal from './SetUsernameModal';
import AddNoteModal from './AddNoteModal';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const { notes,addNoteModal } = useSelector((state) => state.board);
  const dispatch = useDispatch()
  const EMAIL = auth().currentUser.email
  const {modal,usernameModal} = useSelector((state)=>state.login)

  useEffect(()=>{
    const checkIfNewUser = async () => {
      const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
      const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
      const userData = snapshot.val();

      if (!userData) {
        const ref = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('/users').push();

        await ref
        .set({
          email:EMAIL,
          username:EMAIL,
          description:'',
          askBeforeStick:false,
        })

        dispatch(showUsernameModal(true));

      }
  

      downloadImage(EMAIL).then((fileUri)=>{
        dispatch(setMyimage(fileUri));
      })
  
      getUserDocs().then((user)=>{
        const userId = Object.keys(user)[0];
        const username = user[userId].username;
        const description = user[userId].description;
  
        dispatch(setUsername(username))
        dispatch(setDescription(description))
      })
  
      fetchNotes(dispatch);
      loadUser(dispatch)
      dispatch(setMessage(''))
      dispatch(setEmail(''))
    };

    checkIfNewUser();
  },[])

  useFocusEffect(
    React.useCallback(() => {
      const checkIfNewUser = async () => {
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
  
        if (userData) {
          try {
            const pushToken = await AsyncStorage.getItem('PushToken');
            if (pushToken !== null) {
              const userId = Object.keys(userData)[0];
              await usersRef.child(`${userId}/pushToken`).set(pushToken);
              console.log('Push token set in db: ',pushToken);

              //remove push token from async storage
              try {
                await AsyncStorage.removeItem('pushToken')
                console.log('Push token removed from async storage');
              } catch(e) {
                console.log('error removing push token: ', e);
              }
            }
          } catch (error) {
            console.log('BoardScreen Error: ',error);
          }

          fetchNotes(dispatch);

          const onChildAdd = () => {
            fetchNotes(dispatch)
          };
    
          const listen = async ()=>{
            const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')
            const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
            const userData = snapshot.val();
            const userId = Object.keys(userData)[0];
            firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/notes`).on('child_added', onChildAdd); 
          }
          listen()
          
          return ()=>{
            dispatch(clearBoardInfo());
            
            const listenOff = async () => {
              const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
              const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
              const userData = snapshot.val();
              const userId = Object.keys(userData)[0];
              firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/notes`).off('child_added', onChildAdd); 
            }
            listenOff()
          }
        } 
      };
      checkIfNewUser();
    }, [])
  );
  
  return (
    <View style={{paddingTop: insets.top,backgroundColor:'#FFFDF3',flex: 1}}>
      <SetPasswordModal modalVisible={modal} setModalVisible={showModal}/>
      <SetUsernameModal modalVisible={usernameModal} setModalVisible={showUsernameModal}/>
      <AddNoteModal modalVisible={addNoteModal} setModalVisible={showAddNoteModal} board={"stickersOnBoard"}/>

      <Pressable onPress={() => {
        checkIsInfo(dispatch,notes)

        }} style={styles.board}>
        {notes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={notes} renderItem={({item})=>renderNotes({item})} keyExtractor={(note) => note.id}/>
      </Pressable>

      <View style={{ position: 'absolute', bottom: Dimensions.get('window').width / 20, right: Dimensions.get('window').width / 20 }}>
        <Pressable
          onPress={() => {
            dispatch(showAddNoteModal(true));
          }}
          style={{
            width: Dimensions.get('window').width / 10,
            height: Dimensions.get('window').width / 10,
            backgroundColor: 'rgba(255, 100, 0, 0.5)',
            borderRadius: Dimensions.get('window').width / 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AntDesign name="pluscircle" size={Dimensions.get('window').width / 10} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default BoardScreen;