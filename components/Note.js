import { Text, View, Pressable } from 'react-native';
import React, {useState} from 'react';
import { styles } from '../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import {changeInfo,removeNote} from '../store/boardSlice'

export function Note({ id, text, isNote, isInfo }) {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const handlePress = () => {
    if (isInfo) {
      dispatch(changeInfo(id));
      dispatch(removeNote(id));
    } else {
      dispatch(changeInfo(id));
    }
  };

  if (isNote && isInfo) {
    return (
      <Pressable style={styles.note} onPress={handlePress}>
        <View>
          <Text>{notes.find((item) => item.id === id)?.text}</Text>
        </View>
      </Pressable>
    );
  } else if (isNote && !isInfo) {
    return (
      <Pressable style={styles.note} onPress={handlePress}>
        <View>
          <Text>{notes.find((item) => item.id === id)?.text}</Text>
        </View>
      </Pressable>
    );
  }
}