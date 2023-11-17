import { Text, View, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
// import { showInfo,removeNote} from '../store/noteSlice';

// notatka przy tworzeniu powinna miec ID oraz treść

export function Note({id,text,isNote,isInfo}){
  // const {id,text,isNote,isInfo} = useSelector((state)=>state.note)
  const {notes,isInput} = useSelector((state)=>state.board)
  const dispatch = useDispatch()

  if (isNote && isInfo) {
    return (
        <Pressable style={styles.note} onPress={() => {
          if (isInfo) {
            // dispatch(removeNote())
          } else {
            // dispatch(showInfo())
          }
        }}>
          <View>
            <Text></Text>
          </View>
        </Pressable>
    );
  } else if (isNote && !isInfo) {
    return (
        <Pressable style={styles.note} onPress={() => {
          if (isInfo) {
            // dispatch(removeNote())
          } else {
            // dispatch(showInfo())

          }
        }}>
          <View>
            <Text>{notes.find((item) => item.id === id)?.text}</Text>
          </View>
        </Pressable>
    );
  }
};