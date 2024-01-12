import { Text, View, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from './funcPendingNote';

export function PendingNote({ id, isInfo }) {
  const {pendingNotes} = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.note} onPress={()=>handlePress(pendingNotes,dispatch,isInfo,id)}>
        <Text style={styles.noteText}>{pendingNotes.find((item) => item.id === id)?.text}</Text>
    </Pressable>
  );
}