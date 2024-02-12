import { Text, Pressable,View,ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../../../assets/styles/styles'
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/funcPendingNote';
import { sendNoteToBoard } from '../functions/sendNoteToBoard';
import { deleteNote } from '../functions/deleteNote';
import { removePendingNote} from '../../../../store/notes/boardSlice';


export function PendingNote({ id, isInfo, content,creator }) {
  const {pendingNotes} = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [isLoadingLeft,setLoadingLeft] = useState(false)
  const [isLoadingRight,setLoadingRight] = useState(false)

  return (
    <Pressable onPress={()=>handlePress(pendingNotes,dispatch,isInfo,id)}>
    {!isInfo&&<>
      <View style={styles.note}>
      <Text style={styles.noteTextHeader}>{pendingNotes.find((item) => item.id === id)?.creator}</Text>
        <Text style={styles.noteText}>{pendingNotes.find((item) => item.id === id)?.text}</Text>
      </View>

      </>}

      {isInfo&&<>
      <View style={styles.noteclicked}>
        <Pressable style={styles.noteIsInfoTrueLeftButton} onPress={ async () => {
                setLoadingLeft(true)
                await deleteNote(content,creator);
                dispatch(removePendingNote(id));
                setLoadingLeft(false)
              }}>
          {isLoadingLeft?<ActivityIndicator size={'large'} color={'black'}/>:<Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}remove</Text>}
        </Pressable>

        <View style={styles.notesIsInfoVerticalLine}></View>

        <Pressable style={styles.noteIsInfoTrueRightButton} onPress={async () => {
              setLoadingRight(true);
              await sendNoteToBoard(content,creator);
              dispatch(removePendingNote(id));
              setLoadingRight(false)
            }}>
              {isLoadingRight?<ActivityIndicator size={'large'} color={'black'}/>:<Text style={styles.noteIsInfoTrueButtonsText}>Click{"\n"}here{"\n"}to{"\n"}approve</Text>}
          
        </Pressable>
      </View>
      
      </>}
    </Pressable>
  );
}
