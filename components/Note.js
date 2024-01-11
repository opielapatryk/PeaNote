import { Text, View, Pressable,Animated } from 'react-native';
import React from 'react';
import { styles } from '../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../logic/funcNote';

export function Note({ id, isInfo }) {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const animatedValues = notes.map(() => new Animated.Value(200));

  return (
    <Pressable style={styles.note} onPress={()=>handlePress(notes,dispatch,isInfo,id,animatedValues)}>
      <View>
        <Text style={styles.noteText}>{notes.find((item) => item.id === id)?.text}</Text>
      </View>
    </Pressable>
  );
}