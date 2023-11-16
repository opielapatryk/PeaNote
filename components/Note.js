import { Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import { showInfo, hideInfo,removeNote } from '../store/noteSlice';

export function Note(props){
  const {text,isNote,isInfo} = useSelector((state)=>state.note)
  const dispatch = useDispatch()

  if (isNote && isInfo) {
    return (
        <Pressable style={styles.note} onPress={() => {
          if (isInfo) {
            dispatch(removeNote())
          } else {
            dispatch(showInfo())
          }
        }}>
          <View>
            <Text>{text}</Text>
          </View>
        </Pressable>
    );
  } else if (isNote && !isInfo) {
    return (
        <Pressable style={styles.note} onPress={() => {
          if (isInfo) {
            dispatch(removeNote())
          } else {
            dispatch(showInfo())
          }
        }}>
          <View>
            <Text>{text}</Text>
          </View>
        </Pressable>
    );
  }
};