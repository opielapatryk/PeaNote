import { Text, Pressable,View,ActivityIndicator,Modal,TextInput } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/handlePress';
import { removeNote, changeInfo,editNoteRedux } from '../../../../store/notes/boardSlice';
import {editNote} from '../functions/editNote'
import { deleteNote } from '../functions/deleteNote';
import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/database';

export const Note = ({ id, isInfo,content,creator }) => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [isLoadingLeft,setLoadingLeft] = useState(false)
  const [isLoadingRight,setLoadingRight] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(notes.find((item) => item.id === id)?.text);
  const [localNotes, setLocalNotes] = useState(notes);
  const [nickname, setNickname] = useState()

const getNickname = async () => {
  const EMAIL = auth().currentUser.email

  const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

  const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

  const userData = snapshot.val();

  const userId = Object.keys(userData)[0];

  const friendsArray = userData[userId].friends || [];

  const approvedFriends = friendsArray.filter(friend => !friend.pending && !friend.request);

  const friend = approvedFriends.find((friend) => friend.username === creator || friend.email === creator);

  if (friend === undefined) {
    return creator;
  }

  return friend.nickname;
}

  getNickname().then((nickname)=>{
    setNickname(nickname)
  })


  return (
    <Pressable style={isInfo?styles.noteclicked:styles.note} onPress={()=>handlePress(notes,dispatch,isInfo,id)}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalPasswordResetView}>
            <View style={styles.modalPasswordResetViewChild}>
              <TextInput style={styles.modalPasswordResetTextInput} value={newContent} onChangeText={text=>setNewContent(text)}/>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={()=>{
                  editNote(newContent,notes.find((item) => item.id === id)?.text,notes.find((item) => item.id === id)?.creator)
                  setLocalNotes((prevNotes) =>
                    prevNotes.map((note) =>
                      note.id === id ? { ...note, text: newContent,isInfo:false } : note
                    )
                  );
                  dispatch(editNoteRedux({id:id,newContent:newContent}))
                  setModalVisible(false)
                  }} style={styles.editNote}><Text style={styles.editNoteText}>Edit</Text></Pressable>
                <Pressable onPress={()=>{
                  setModalVisible(false)
                  setNewContent(notes.find((item) => item.id === id)?.text)
                }} style={styles.editNoteBack}><Text style={styles.editNoteBackText}>Back</Text></Pressable>
              </View> 
            </View>
          </View>
        </Modal>
        
      {!isInfo&&<>
        <Text style={styles.noteTextHeader}>
          {nickname?nickname:localNotes.find((item) => item.id === id)?.creator}
        </Text>
        <Text style={styles.noteText}>{localNotes.find((item) => item.id === id)?.text}</Text>
        </>}
      
      {isInfo&&<>
          <Pressable style={styles.noteIsInfoTrueLeftButton} onPress={async () => {
                setLoadingLeft(true)
                await deleteNote(content,creator);
                dispatch(removeNote(id));
                setLoadingLeft(false)
              }}>
          {isLoadingLeft?<ActivityIndicator size={'large'} color={'black'}/>:<Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}remove</Text>}
          </Pressable>
          
          <View style={styles.notesIsInfoVerticalLine}></View>
          
          <Pressable style={styles.noteIsInfoTrueRightButton} onPress={() => {
              setModalVisible(true)
              dispatch(changeInfo(id))
            }}>
          {isLoadingRight?<ActivityIndicator size={'large'} color={'black'}/>:<Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}edit</Text>}
          </Pressable>
      </>}
    </Pressable>
  );
}