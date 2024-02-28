import React from 'react';
import { Pressable, FlatList,View,Text,Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onClickChangeInfo } from '../functions/onClickChangeInfo';
import { styles } from '../../../../../assets/styles/styles'
import { renderNotes } from '../functions/renderNotes';
import { useFocusEffect } from '@react-navigation/native';
import { clearPendingInfo,showAddNoteModal } from '../../../../store/notes/boardSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AddNoteModal from '../../BoardScreen/components/AddNoteModal';
import auth from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/database'
import { fetchNotes } from '../../BoardScreen/functions/fetchNotes';

const PendingScreen = () => {
  const { pendingNotes,addNoteModal } = useSelector((state) => state.board);
  const EMAIL = auth().currentUser.email

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const onChildAdd = () => fetchNotes(dispatch);

      const listen = async ()=>{
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
      
        const notesRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/notes`);

        notesRef.on('child_added', onChildAdd);
      }

      listen()
      return ()=>{
        dispatch(clearPendingInfo());

      const listenOff = async () => {
        const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');
        const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
        const notesRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref(`users/${userId}/notes`);

        // Remove the 'child_added' listener when the component unmounts
        notesRef.off('child_added', onChildAdd);
      }

      listenOff()
      }
    }, [])
  );
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'#FFFDF3'
    }}>
      <AddNoteModal modalVisible={addNoteModal} setModalVisible={showAddNoteModal} board={"pending"}/>
      <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
      {pendingNotes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={pendingNotes} renderItem={({item})=>renderNotes({item})} keyExtractor={(note) => note.id} />
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

export default PendingScreen;

