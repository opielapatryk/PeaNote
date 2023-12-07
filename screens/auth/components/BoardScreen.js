import React,{useEffect} from 'react';
import {Pressable,View,FlatList} from 'react-native';
import {Note} from '../../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../../assets/styles/styles';
import Menu from '../../../components/Menu'
import { fetchNotes, checkThenChangeInfo} from '../logic/apiBoardScreen';
const BoardScreen = ({navigation}) => {
    const {notes} = useSelector((state) => state.board);
    const dispatch = useDispatch()

    useEffect(()=>{
      fetchNotes(dispatch);
    },[])

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