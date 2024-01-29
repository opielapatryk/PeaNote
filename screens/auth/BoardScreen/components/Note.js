import { Text, Pressable,View,Dimensions } from 'react-native';
import React from 'react';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { handlePress } from '../functions/handlePress';
import { removeNote } from '../../../../store/notes/boardSlice';
import {answerToNote} from '../functions/answerToNote'
import { deleteNote } from '../functions/deleteNote';

export const Note = ({ id, isInfo }) => {
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
        <Pressable style={{borderRightWidth:0,height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 20}} onPress={() => {
              deleteNote(id);
              dispatch(removeNote(id));
            }}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Click{"\n"}here{"\n"}to{"\n"}remove</Text>
      </Pressable>
          <View style={{height:Dimensions.get("window").height / 8,borderLeftWidth:1,alignSelf:'center'}}></View>
          <Pressable style={{height:Dimensions.get("window").height / 5,width:Dimensions.get('window').width / 4.4,justifyContent:'center',paddingLeft:Dimensions.get('window').width / 25}} onPress={() => {
              answerToNote();
            }}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Click{"\n"}here{"\n"}to{"\n"}answer</Text>
        </Pressable>
        </View>

      </>}
    </Pressable>
  );
}