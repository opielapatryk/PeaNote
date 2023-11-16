import { Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import { showInfo, hideInfo,removeNote } from '../store/noteSlice';

export function Note(props){
  const {info,isNote,text} = useSelector((state)=>state.note.text)
  const dispatch = useDispatch()

  if (isNote && info) {
    return (
      <View>
        <Pressable onPress={() => {  dispatch(hideInfo()) }} style={styles.button}>
          <View>
            <Text>Cancel</Text>
          </View>
        </Pressable>
        <Pressable style={styles.note} onPress={() => {
          if (info) {
            dispatch(removeNote())
          } else {
            dispatch(showInfo())
          }
        }}>
          <View>
            <Text>{text}</Text>
          </View>
        </Pressable>
      </View>
    );
  } else if (isNote && !info) {
    return (
        <Pressable style={styles.note} onPress={() => {
          if (info) {
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