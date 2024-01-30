import { Text, Pressable,View,Dimensions} from 'react-native';
import React from 'react';
import { styles } from '../../../../assets/styles/styles'
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/funcPendingNote';
import { sendNoteToBoard } from '../functions/sendNoteToBoard';
import { deleteNote } from '../functions/deleteNote';
import { removePendingNote ,addNote} from '../../../../store/notes/boardSlice';

export function PendingNote({ id, isInfo, content,creator }) {
  const {pendingNotes} = useSelector((state) => state.board);
  const dispatch = useDispatch();

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
      <Pressable style={{height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 20}} onPress={() => {
              deleteNote(id);
              dispatch(removePendingNote(id));
            }}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Click{"\n"}here{"\n"}to{"\n"}remove</Text>
      </Pressable>
<View style={{height:Dimensions.get("window").height / 8,borderLeftWidth:1,alignSelf:'center'}}></View>
        <Pressable style={{height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 25}} onPress={() => {
              sendNoteToBoard(id);
              dispatch(addNote({ id: id, text: content, isInfo: false, creator:creator}));
              dispatch(removePendingNote(id));
            }}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Click{"\n"}here{"\n"}to{"\n"}approve</Text>
        </Pressable>
      </View>
      
      </>}
    </Pressable>
  );
}
