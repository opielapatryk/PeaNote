import { createSelector } from 'reselect';

const selectBoardState = (state) => state.board;

export const selectNotes = createSelector(
  [selectBoardState],
  (board) => board.notes
);
import React,{useRef} from 'react';
import {Pressable,View,FlatList} from 'react-native';
import {Note} from '../../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../../assets/styles/styles';
import Menu from '../../../components/Menu'
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes, checkThenChangeInfo,removeNotesFromReduxStore} from '../logic/apiBoardScreen';

const BoardScreen = ({navigation}) => {
    const notes = useSelector(selectNotes);
    const dispatch = useDispatch()
    const isMounted = useRef(true)

    useFocusEffect(
      React.useCallback(()=>{
        isMounted.current = true
        return () => {
          isMounted.current = false;
        };
      },[])
    )

    useFocusEffect(
      React.useCallback(()=>{
        if(isMounted.current){
          removeNotesFromReduxStore(notes,dispatch);
          fetchNotes(dispatch);
          isMounted.current = false
        }
      },[notes,dispatch])
    );

    const renderNotes = ({item}) => {
      return (
        <Note id={item.id} text={item.text} isInfo={item.isInfo} />
      )
    }
      return (
        <View>
          <Menu navigation={navigation}/>
          <Pressable onPress={() => checkThenChangeInfo(dispatch,notes)} style={styles.board}>
            <FlatList data={notes} renderItem={renderNotes} keyExtractor={note => note.id}/>
          </Pressable>
        </View>
      );
    };


export default BoardScreen;