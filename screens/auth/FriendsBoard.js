import { Text,ScrollView,Pressable } from 'react-native'
import React from 'react'
import NoteCreateInput from '../../components/NoteCreateInput';
import { Note } from '../../components/Note';
import { useDispatch, useSelector} from 'react-redux';
import { styles } from '../../assets/styles';
import {changeInfo} from '../../store/boardSlice';

export default FriendsBoard = ({ route }) => {
    const { friendId, friendName } = route.params;
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    return (
      <ScrollView>
        <Text>Welcome on {friendName?friendName:'your friend'} board</Text>
        <NoteCreateInput/>
        {/* if your board the pressable else just scrollview*/}
        <Pressable
              onPress={() => {
                  notes.map((note) => {if(note.isInfo === true){
                      dispatch(changeInfo(note.id))
                  }})
              }}
              style={styles.board}
            >
              
            <ScrollView>
              {notes.map((note) => (
                  <Note key={note.id} id={note.id} text={note.text} isNote={note.isNote} isInfo={note.isInfo} />
              ))}
            </ScrollView>

          </Pressable>
      </ScrollView>
    );
}