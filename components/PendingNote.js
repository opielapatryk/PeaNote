import { Text, View, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../logic/funcPendingNote';

export function PendingNote({ id, text, isInfo }) {
  const {pendingNotes} = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.note} onPress={()=>handlePress(pendingNotes,dispatch,isInfo,id)}>
      <View>
        <Text>{pendingNotes.find((item) => item.id === id)?.text}</Text>
      </View>
    </Pressable>
  );
}