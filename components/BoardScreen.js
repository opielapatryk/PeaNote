import React, {useState} from 'react';
import {ScrollView,Pressable,Button,TextInput,View} from 'react-native';
import {Note} from './Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../assets/styles';
import {addNote, changeInfo} from '../store/boardSlice';

const BoardScreen = () => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [text, setText] = useState('')

      return (
        <View>
            <View>
              <TextInput
                placeholder="Insert text and press button to create note"
                onChangeText={(text) => setText(text)} value={text}
              />
              <Button
                title="create note"
                onPress={() => {
                  dispatch(addNote({ id: notes.length + 1, text, isNote: true, isInfo: false }));
                  setText('')
                }}
              />
            </View>
    
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