import React,{useState} from 'react';
import {ScrollView,Pressable,View,Text,Button} from 'react-native';
import {Note} from '../../components/Note'
import {styles} from '../../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import {changeInfo} from '../../store/boardSlice';
import { useFocusEffect } from '@react-navigation/native';
import {loadPendingNotes, removeNotesFromReduxStore,sendNoteToBoard} from './logic/apiPendingScreen'

const PendingScreen = () => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)

    useFocusEffect(
      React.useCallback(() => {
        loadPendingNotes(dispatch);
        return () => {
          removeNotesFromReduxStore(notes,dispatch);
        };
      }, [])
    );

    return (
      <View>
        <Pressable
            onPress={() => {
              notes.map((note) => {
                if(note.isInfo === true)
                {
                  dispatch(changeInfo(note.id))
                }
              })
            }}
            style={styles.board}
          >
          <ScrollView>
          {fetched && (
              <View>
                <Text>Note has been sent to the board successfully!</Text>
              </View>
            )}
            {notes.map((note) => (
              <View key={note.id}>
                <Note id={note.id} text={note.text} isNote={note.isNote} isInfo={note.isInfo} />
                <Button title='Approve note' onPress={()=>sendNoteToBoard(note.id,setFetched,notes,dispatch,)}/>
              </View>
            ))}
          </ScrollView>

        </Pressable>
      </View>
      );
    };
export default PendingScreen;