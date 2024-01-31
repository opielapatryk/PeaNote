import { Text, Pressable,View,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/handlePress';
import { removeNote } from '../../../../store/notes/boardSlice';
import {answerToNote} from '../functions/answerToNote'
import { deleteNote } from '../functions/deleteNote';

export const Note = ({ id, isInfo,content,creator }) => {
  const { notes } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [isLoadingLeft,setLoadingLeft] = useState(false)
  const [isLoadingRight,setLoadingRight] = useState(false)

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
                setLoadingLeft(true)
                await deleteNote(content,creator);
                dispatch(removeNote(id));
                setLoadingLeft(false)
              }}>
          {isLoadingLeft?<ActivityIndicator size={'large'} color={'black'}/>:<Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}remove</Text>}
          </Pressable>
          
          <View style={styles.notesIsInfoVerticalLine}></View>
          
          <Pressable style={styles.noteIsInfoTrueRightButton} onPress={() => {
              answerToNote();
            }}>
          {isLoadingRight?<ActivityIndicator size={'large'} color={'black'}/>:<Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}answer</Text>}
          </Pressable>
        </View>
      </>}
    </Pressable>
  );
}