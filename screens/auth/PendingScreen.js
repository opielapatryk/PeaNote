import React,{useEffect,useState} from 'react';
import {ScrollView,Pressable,View,Text,Button} from 'react-native';
import {Note} from '../../components/Note'
import {styles} from '../../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import {changeInfo,addNote,removeNote} from '../../store/boardSlice';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const PendingScreen = () => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)

    // useEffect(()=>{
    //   const loadPendingNotes = async () => {
    //     try {
    //         const userToken = await SecureStore.getItemAsync('userToken');
    //         const currentUserId = await SecureStore.getItemAsync('userId');
    //         console.log(currentUserId);
  
    //         const result = await axios.get(`http://localhost:8000/api/users/${currentUserId}`,{
    //           headers:{
    //             Authorization: `Token ${userToken}`,
    //           }
    //         })
  
    //         const stickersRequest = result.data.pending.map(url =>
    //           axios.get(url)
    //           .then(response => response.data)
    //         );
  
    //         Promise.all(stickersRequest)
    //         .then(stickersData=>{
    //           stickersData.forEach(sticker => console.log(JSON.stringify(sticker)))
    //           stickersData.forEach(sticker => dispatch(addNote({id: sticker.id, text: sticker.content, isNote:true, isInfo:false})))
    //         })
  
    //         console.log('pending notes loaded: ', notes);
    //         return result
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    // }
    // loadPendingNotes()
    // },[])

    useFocusEffect(
      React.useCallback(() => {
        const loadPendingNotes = async () => {
          try {
            const userToken = await SecureStore.getItemAsync('userToken');
            const currentUserId = await SecureStore.getItemAsync('userId');
            console.log(currentUserId);
    
            const result = await axios.get(`http://localhost:8000/api/users/${currentUserId}`, {
              headers: {
                Authorization: `Token ${userToken}`,
              }
            });
    
            const stickersRequest = result.data.pending.map(url =>
              axios.get(url)
                .then(response => response.data)
            );
    
            const stickersData = await Promise.all(stickersRequest);
            stickersData.forEach(sticker => console.log(JSON.stringify(sticker)));
            stickersData.forEach(sticker => dispatch(addNote({ id: sticker.id, text: sticker.content, isNote: true, isInfo: false })));
    
            console.log('pending notes loaded: ', notes);
            return result;
          } catch (error) {
            console.log(error.message);
          }
        };
    
        // Wywołaj loadPendingNotes tylko przy wejściu na ekran
        loadPendingNotes();
    
        return () => {
          // Ta funkcja zostanie wykonana przy opuszczeniu ekranu
          const removeNotesFromReduxStore = async (notes) => {
            await notes.map((sticker) => dispatch(removeNote(sticker.id)));
          };
    
          removeNotesFromReduxStore(notes);
        };
      }, [])
    );

    const removeNotesFromReduxStore = async () => {
      await notes.map((sticker) => dispatch(removeNote(sticker.id)));
    };
    

    async function sendNoteToBoard(stickerID){
        try {

            let userID = await SecureStore.getItemAsync('userId');

            const resp = await axios.get(`http://localhost:8000/api/users/${userID}/`)
    
            let stickersOnBoard = resp.data.stickersOnBoard;
            let pending = resp.data.pending;

            stickersOnBoard.push(`http://localhost:8000/api/stickers/${stickerID}/`)
            
            console.log('pending before delete: ', pending);

            let newPendingArr = await pending.filter(sticker => sticker != `http://localhost:8000/api/stickers/${stickerID}/`)

            console.log('pending after delete: ', pending);

            const patchStickersOnBoardResp = await axios.patch(`http://localhost:8000/api/users/${userID}/`,{
              'stickersOnBoard': stickersOnBoard
            })

            const patchPendingStickersResp = await axios.patch(`http://localhost:8000/api/users/${userID}/`,{
              'pending': newPendingArr
            })

            if(patchStickersOnBoardResp.status === 200 && patchPendingStickersResp.status === 200){
                console.log('note fetched to board successfully');
                setFetched(true)
                const removeNotesFromReduxStore = async (notes) => {
                  await notes.map((sticker) => dispatch(removeNote(sticker.id)));
                };
          
                removeNotesFromReduxStore(notes);

                const loadPendingNotes = async () => {
                  try {
                    const userToken = await SecureStore.getItemAsync('userToken');
                    const currentUserId = await SecureStore.getItemAsync('userId');
                    console.log(currentUserId);
            
                    const result = await axios.get(`http://localhost:8000/api/users/${currentUserId}`, {
                      headers: {
                        Authorization: `Token ${userToken}`,
                      }
                    });
            
                    const stickersRequest = result.data.pending.map(url =>
                      axios.get(url)
                        .then(response => response.data)
                    );
            
                    const stickersData = await Promise.all(stickersRequest);
                    stickersData.forEach(sticker => console.log(JSON.stringify(sticker)));
                    stickersData.forEach(sticker => dispatch(addNote({ id: sticker.id, text: sticker.content, isNote: true, isInfo: false })));
            
                    console.log('pending notes loaded: ', notes);
                    return result;
                  } catch (error) {
                    console.log(error.message);
                  }
                };
            
                // Wywołaj loadPendingNotes tylko przy wejściu na ekran
                loadPendingNotes();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

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
                  <Button title='Approve note' onPress={()=>sendNoteToBoard(note.id)}/>
                </View>
              ))}
            </ScrollView>

          </Pressable>
        </View>
      );
    };


export default PendingScreen;