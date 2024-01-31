import { Text, Pressable,View,Dimensions } from 'react-native';
import React from 'react';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/handlePress';
import { removeNote } from '../../../../store/notes/boardSlice';
import {answerToNote} from '../functions/answerToNote'
import { deleteNote } from '../functions/deleteNote';

export const Note = ({ id, isInfo,content,creator }) => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <Pressable onPress={()=>handlePress(notes,dispatch,isInfo,id)}>
      {!isInfo&&<>
      <View style={styles.note}>
        <Text style={styles.noteTextHeader}>{notes.find((item) => item.id === id)?.creator}</Text>
        <Text style={styles.noteText}>{notes.find((item) => item.id === id)?.text}</Text>
      </View>

        </>}
      
      {isInfo&&<>
        <View style={styles.noteclicked}>
          <Pressable style={styles.noteIsInfoTrueLeftButton} onPress={async () => {
                await deleteNote(content,creator);
                dispatch(removeNote(id));
              }}>
          <Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}remove</Text>
          </Pressable>
          
          <View style={styles.notesIsInfoVerticalLine}></View>
          
          <Pressable style={styles.noteIsInfoTrueRightButton} onPress={() => {
              answerToNote();
            }}>
          <Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}answer</Text>
          </Pressable>
        </View>
      </>}
    </Pressable>
  );
}