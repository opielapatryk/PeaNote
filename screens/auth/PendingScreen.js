import React,{useEffect,useState} from 'react';
import {ScrollView,Pressable,View,Text,Button} from 'react-native';
import {Note} from '../../components/Note'
import {styles} from '../../assets/styles';
import { useDispatch, useSelector} from 'react-redux';
import {changeInfo,addNote,removeNote} from '../../store/boardSlice';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import {userLink,stickerLink} from '../../components/Constants'

const PendingScreen = () => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)

    useFocusEffect(
      React.useCallback(() => {
        const loadPendingNotes = async () => {
          try {
            const userToken = await SecureStore.getItemAsync('userToken');
            const currentUserId = await SecureStore.getItemAsync('userId');
    
            const result = await axios.get(userLink(currentUserId), {
              headers: {
                Authorization: userToken,
              }
            });
    
            const stickersRequest = result.data.pending.map(url =>
              axios.get(url)
                .then(response => response.data)
            );
    
            const stickersData = await Promise.all(stickersRequest);
            stickersData.forEach(sticker => console.log(JSON.stringify(sticker)));
            stickersData.forEach(sticker => dispatch(addNote({ id: sticker.id, text: sticker.content, isNote: true, isInfo: false })));
    
            return result;
          } catch (error) {
            console.log(error.message);
          }
        };
    
        loadPendingNotes();
    
        return () => {
          const removeNotesFromReduxStore = async (notes) => {
            await notes.map((sticker) => dispatch(removeNote(sticker.id)));
          };
    
          removeNotesFromReduxStore(notes);
        };
      }, [])
    );

    async function sendNoteToBoard(stickerID){
        try {

            let userID = await SecureStore.getItemAsync('userId');

            const resp = await axios.get(userLink(userID))
    
            let stickersOnBoard = resp.data.stickersOnBoard;
            let pending = resp.data.pending;

            stickersOnBoard.push(stickerLink(stickerID))

            let newPendingArr = await pending.filter(sticker => sticker != stickerLink(stickerID))

            const patchStickersOnBoardResp = await axios.patch(userLink(userID),{
              'stickersOnBoard': stickersOnBoard
            })

            const patchPendingStickersResp = await axios.patch(userLink(userID),{
              'pending': newPendingArr
            })

            if(patchStickersOnBoardResp.status === 200 && patchPendingStickersResp.status === 200){
                setFetched(true)
                const removeNotesFromReduxStore = async (notes) => {
                  await notes.map((sticker) => dispatch(removeNote(sticker.id)));
                };
          
                removeNotesFromReduxStore(notes);

                const loadPendingNotes = async () => {
                  try {
                    const userToken = await SecureStore.getItemAsync('userToken');
                    const currentUserId = await SecureStore.getItemAsync('userId');
            
                    const result = await axios.get(userLink(currentUserId), {
                      headers: {
                        Authorization: userToken,
                      }
                    });
            
                    const stickersRequest = result.data.pending.map(url =>
                      axios.get(url)
                        .then(response => response.data)
                    );
            
                    const stickersData = await Promise.all(stickersRequest);
                    stickersData.forEach(sticker => dispatch(addNote({ id: sticker.id, text: sticker.content, isNote: true, isInfo: false })));
            
                    return result;
                  } catch (error) {
                    console.log(error.message);
                  }
                };
            
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