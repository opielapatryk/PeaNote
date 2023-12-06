import React,{useRef} from 'react';
import {Pressable,View,FlatList} from 'react-native';
import {Note} from '../../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../../assets/styles/styles';
import Menu from '../../../components/Menu'
import { useFocusEffect } from '@react-navigation/native';
import { fetchNotes, checkThenChangeInfo } from '../logic/apiBoardScreen';

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
            <Pressable onPress={() => checkThenChangeInfo(dispatch,notes)} style={styles.board}>
              
            <FlatList data={notes} renderItem={({item}) => <Note id={item.id} text={item.text} isInfo={item.isInfo} />} keyExtractor={note => note.id}/>

          </Pressable>
        </View>
      );
    };


export default BoardScreen;