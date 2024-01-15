import { Text, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/handlePress';

export const Note = ({ id, isInfo }) => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.note} onPress={()=>handlePress(notes,dispatch,isInfo,id)}>
        <Text style={styles.noteText}>{notes.find((item) => item.id === id)?.text}</Text>
    </Pressable>
  );
}