import React from 'react';
import {ScrollView,Pressable,View} from 'react-native';
import {Note} from '../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../assets/styles';
import {changeInfo} from '../../store/boardSlice';
import Menu from '../../components/Menu'
import NoteInput from '../../components/NoteCreateInput'

const BoardScreen = () => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()

      return (
        <View>
          <Menu/>
          <NoteInput/>
    
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
        </View>
      );
    };


export default BoardScreen;