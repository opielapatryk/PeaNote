import React,{useRef} from 'react';
import {ScrollView,Pressable,View} from 'react-native';
import {Note} from '../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../assets/styles';
import Menu from '../../components/Menu'
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes, checkThenChangeInfo } from './logic/api';

const BoardScreen = ({navigation}) => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const isMounted = useRef(true)

    useFocusEffect(
      React.useCallback(()=>{
        isMounted.current = true
      },[])
    )

    useFocusEffect(
      React.useCallback(()=>{
        if(isMounted.current){
          fetchNotes(dispatch,notes);
          isMounted.current = false
        }
      },[notes])
    );

      return (
        <View>
          <Menu navigation={navigation}/>
          <Pressable
              onPress={() => checkThenChangeInfo(dispatch,notes)}
              style={styles.board}
            >
            <ScrollView>
              {notes.map((note) => (
                  <Note key={note.id} id={note.id} text={note.text} isNote={note.isNote} isInfo={note.isInfo} />
              ))}
            </ScrollView>

          </Pressable>
        </View>
      );
    };


export default BoardScreen;