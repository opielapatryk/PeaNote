import React,{useEffect,useState,useRef} from 'react';
import {ScrollView,Pressable,View,Text} from 'react-native';
import {Note} from '../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../assets/styles';
import {changeInfo,addNote, removeNote} from '../../store/boardSlice';
import Menu from '../../components/Menu'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const BoardScreen = ({navigation}) => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const isMounted = useRef(true)

    useFocusEffect(
      React.useCallback(()=>{
        isMounted.current = true
        console.log(isMounted.current);
      },[])
    )

    useFocusEffect(
      React.useCallback(()=>{

        if(isMounted.current){
          const loadNotes = async () => {
            console.log('notes:',notes);
            await notes.map((sticker) => dispatch(removeNote(sticker.id)));
  
            try {
              const userToken = await SecureStore.getItemAsync('userToken');
              const currentUserId = await SecureStore.getItemAsync('userId');
      
              const result = await axios.get(`http://localhost:8000/api/users/${currentUserId}`,{
                headers:{
                  Authorization: userToken,
                }
              })
      
              const stickersRequest = result.data.stickersOnBoard.map(url =>
                axios.get(url)
                .then(response => response.data)
              );
      
              Promise.all(stickersRequest)
              .then(stickersData=>{
                stickersData.forEach(sticker => dispatch(addNote({id: sticker.id, text: sticker.content, isNote:true, isInfo:false})))
              })
              
              return result
            } catch (error) {
              console.log(error.message);
            }
          }
          loadNotes();
          isMounted.current = false
        }
        
      },[notes]) // should be notes
    );

      return (
        <View>
          <Menu navigation={navigation}/>
          <Pressable
              onPress={() => {
                console.log(notes);
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
              {notes.map((note) => (
                  <Note key={note.id} id={note.id} text={note.text} isNote={note.isNote} isInfo={note.isInfo} />
              ))}
            </ScrollView>

          </Pressable>
        </View>
      );
    };


export default BoardScreen;