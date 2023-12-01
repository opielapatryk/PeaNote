import React,{useEffect,useState} from 'react';
import {ScrollView,Pressable,View,Text} from 'react-native';
import {Note} from '../../components/Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../../assets/styles';
import {changeInfo,addNote} from '../../store/boardSlice';
import Menu from '../../components/Menu'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const BoardScreen = ({navigation}) => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      const loadNotes = async () =>{
        try {
          const userToken = await SecureStore.getItemAsync('userToken');
          const currentUserId = await SecureStore.getItemAsync('userId');
          console.log(currentUserId);

          const result = await axios.get(`http://localhost:8000/api/users/${currentUserId}`,{
            headers:{
              Authorization: `Token ${userToken}`,
            }
          })

          const stickersRequest = result.data.stickersOnBoard.map(url =>
            axios.get(url)
            .then(response => response.data)
          );

          Promise.all(stickersRequest)
          .then(stickersData=>{
            stickersData.forEach(sticker => console.log(JSON.stringify(sticker)))
            stickersData.forEach(sticker => dispatch(addNote({id: sticker.id, text: sticker.content, isNote:true, isInfo:false})))
          })


          return result
        } catch (error) {
          console.log(error.message);
        }
      }
      loadNotes()
    },[])

      return (
        <View>
          <Menu navigation={navigation}/>
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
              {notes.map((note) => (
                  <Note key={note.id} id={note.id} text={note.text} isNote={note.isNote} isInfo={note.isInfo} />
              ))}
            </ScrollView>

          </Pressable>
        </View>
      );
    };


export default BoardScreen;