import React,{useState,useMemo} from 'react';
import {Pressable,View,Text,Button,FlatList} from 'react-native';
import {Note} from '../../../components/Note'
import {styles} from '../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {loadPendingNotes, removeNotesFromReduxStore,sendNoteToBoard,onClickChangeInfo} from '../logic/apiPendingScreen'

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

    const renderNotes = useMemo(() => ({item}) => {
      return (
        <View>
          <Note id={item.id} text={item.text} isInfo={item.isInfo} />
          <Button title='Approve note' onPress={()=>sendNoteToBoard(item.id,setFetched,notes,dispatch,)}/>
        </View>
      )
    },[notes, dispatch])

    return (
      <View>
        <Pressable onPress={()=>onClickChangeInfo(notes,dispatch)} style={styles.board}>
          {fetched && (
              <View>
                <Text>Note has been sent to the board successfully!</Text>
              </View>
            )}
          <FlatList data={notes} renderItem={renderNotes} keyExtractor={note => note.id}/>
        </Pressable>
      </View>
      );
    };
export default PendingScreen;