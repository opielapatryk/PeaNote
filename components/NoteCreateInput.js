import React, {useState} from 'react';
import { Button, TextInput, View } from 'react-native';
import { addNote, changeInfo } from '../store/boardSlice';
import { useDispatch, useSelector} from 'react-redux';

export default () => {
  const { notes } = useSelector((state)=>state.board)
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  return <View>
    <TextInput
      placeholder="Insert text and press button to create note"
      onChangeText={(text) => setText(text)} value={text} />
    <Button
      title="create note"
      onPress={() => {
        {
          notes.forEach(note => {
            if (note.isInfo === true) {
              dispatch(changeInfo(note.id));
            }
          });
        }
        dispatch(addNote({ id: notes.length + 1, text, isNote: true, isInfo: false }));
        setText('');
      }} />
  </View>;
}
