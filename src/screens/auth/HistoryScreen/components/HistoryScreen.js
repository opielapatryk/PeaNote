import { FlatList,View,Text} from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { styles } from '../../../../../assets/styles/styles';

const HistoryScreen = ({route}) => {
  const [notes,setNotes] = useState([])
  const { friendEmail} = route.params;

  useFocusEffect(
    React.useCallback(() => {
        const getNotes = async ()=>{
            const EMAIL = auth().currentUser.email

            const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
            const usersRef = database.ref('users');
            const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
            const userData = userSnapshot.val();
            const userId = Object.keys(userData)[0];
            const USERNAME = userData[userId].username
            


            const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
            const friendData = friendSnapshot.val();
            const friendId = Object.keys(friendData)[0];
            const friendNotes = friendData[friendId].notes

            let notes = []

            friendNotes?.forEach((note) => {
                if(note.creator===EMAIL || note.creator===USERNAME){
                    notes.push(note)
                }
            });
            
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