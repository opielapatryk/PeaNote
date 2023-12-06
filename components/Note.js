import { Text, View, Pressable } from 'react-native';
import React from 'react';
import { styles } from '../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../logic/funcNote';

export function Note({ id, text, isInfo }) {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.note} onPress={()=>handlePress(notes,dispatch,isInfo,id)}>
      <View>
        <Text>{notes.find((item) => item.id === id)?.text}</Text>
      </View>
    </Pressable>
  );
}