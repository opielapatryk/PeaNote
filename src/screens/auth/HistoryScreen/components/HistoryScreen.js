import { FlatList,View,Text} from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { styles } from '../../../../../assets/styles/styles';

const HistoryScreen = ({route}) => {
  const [notes,setNotes] = useState([])
  const { friendEmail} = route.params;

  useFocusEffect(
    React.useCallback(() => {
        const getNotes = async ()=>{
            const EMAIL = auth().currentUser.email

            const friend = await firestore().collection('users').where('email','==',friendEmail).get()

            const friendData = friend.docs[0].data()

            let notes = []

            const notesOnBoard = friendData.stickersOnBoard
            const notesPending = friendData.pending

            notesOnBoard.forEach((note) => {
                if(note.creator===EMAIL){
                    notes.push(note)
                }
            });

            notesPending.forEach((note) => {
                if(note.creator===EMAIL){
                    notes.push(note)
                }
            });
            
            console.log(notes);
            setNotes(notes)
        }
        getNotes()
    }, [])
  );

  return (
    <View style={{flex:1,backgroundColor:'#FFF'}}>
       <FlatList data={notes} renderItem={(note)=>{
        return (
            <View style={styles.noteHistoryList}>

            <Text>
                {note.item.content}
            </Text>
            </View>
        )

       }} keyExtractor={(note, index) => note.id || index.toString()}/>
    </View>
  );
}

export default HistoryScreen