import { Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../assets/styles';

export const Note = props => {
  const [text, setInfoText] = useState(props.text);
  const [info, setInfo] = useState(false);
  const [isNote, setIsNote] = useState(true);
  const OLD_TEXT = props.text;

  if (isNote && info) {
    return (
      <View>
        <Pressable onPress={() => { setInfoText(OLD_TEXT); setInfo(false); }}>
          <View style={styles.button}>
            <Text>Cancel</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {
          if (info) {
            setIsNote(false);
          } else {
            setInfoText('Click me again to delete note');
            setInfo(true);
          }
        }}>
          <View style={styles.note}>
            <Text>{text}</Text>
          </View>
        </Pressable>
      </View>

    );
  } else if (isNote && !info) {
    return (

        <Pressable onPress={() => {
          if (info) {
            setIsNote(false);
          } else {
            setInfoText('Click me again to delete note');
            setInfo(true);
          }
        }}>
          <View style={styles.note}>
            <Text>{text}</Text>
          </View>
        </Pressable>

    );
  }
};
