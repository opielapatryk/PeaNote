import { Text, View, Pressable } from 'react-native';
import React, {useState} from 'react';
import { styles } from '../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import {changeInfo,removeNote} from '../store/boardSlice'
import axios from 'axios';

export function Note({ id, text, isNote, isInfo }) {
  // const { notes } = useSelector((state) => state.board);
  // const dispatch = useDispatch();
  const [info,setInfo] = useState(isInfo)

  const deleteNote = async () => {
    try {
      const result = await axios.delete(`http://localhost:8000/api/stickers/${id}/`)
      console.log(result.status);
      return result
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePress = () => {
    if(info){
      //remove note
      console.log(info);
      deleteNote()
    }else{
      setInfo(!info)
      console.log(info);
    }
    // {notes.forEach(note => {
    //   if(note.isInfo === true){
    //     dispatch(changeInfo(note.id));
    //   }
    // });}
    // if (isInfo) {
    //   dispatch(changeInfo(id));
    //   dispatch(removeNote(id));
    // } else {
    //   dispatch(changeInfo(id));
    // }
  };

  if (isNote && info) {
    return (
      <Pressable style={styles.note} onPress={handlePress}>
        <View>
          {/* <Text>{notes.find((item) => item.id === id)?.text}</Text> */}
          <Text>Click again to delete note</Text>
        </View>
      </Pressable>
    );
  } else if (isNote && !info) {
    return (
      <Pressable style={styles.note} onPress={handlePress}>
        <View>
          {/* <Text>{notes.find((item) => item.id === id)?.text}</Text> */}
          <Text>{text}</Text>
        </View>
      </Pressable>
    );
  }
}