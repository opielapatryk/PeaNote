import React, {useState} from 'react';
import {ScrollView,Pressable,Button,TextInput,View,FlatList,Text} from 'react-native';
import {Note} from './Note'
import { useDispatch, useSelector} from 'react-redux';
import {styles} from '../assets/styles';
import {removeNote,addNote,showInput,hideInput} from '../store/boardSlice';
// import { setText,isNoteTrue,hideInfo ,showInfo } from '../store/noteSlice';

const BoardScreen = () => {
    const { notes,isInput } = useSelector((state)=>state.board)
    // const { id, text, isNote, isInfo } = useSelector((state) => state.note);
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [id, setId] = useState(0)
    const [isNote, setIsNote] = useState(true)
    const [info, setIsInfo] = useState(false)

    if(isInput){
        return(
        <View>
            <TextInput placeholder='Insert text and press button to create note' onChangeText={(text)=>setText(text)}>

            </TextInput>

            <Button title='create note' onPress={()=>{
                dispatch(addNote({ id: notes.length + 1,text: text, isNote:true, isInfo:false }))
                // dispatch(setText(''));
                dispatch(hideInput());
            }}/>

            <Pressable onPress={()=>{
            //  dispatch(hideInfo())
            setIsInfo(false)
             if(isInput){
                 dispatch(hideInput())
             }else{
                 dispatch(showInput())
             }
            }} style={styles.board}>

                <ScrollView>
                    {notes.map((note) => (
                        <Pressable key={note.id} onPress={()=>{
                            if (info) {
                                // dispatch(removeNote())
                                // filter notes item id !== id 
                              } else {
                                // dispatch(showInfo())
                                setIsInfo(true)
                              }
                        }}><Note key={note.id} id={note.id} text={note.text} isNote={note.isNote} isInfo={note.isInfo} /></Pressable>
                    ))}
                </ScrollView>
            </Pressable>
        </View>
    )}

    return (
        <Pressable onPress={()=>{
            // dispatch(isNoteTrue())
            console.log(notes);
            // dispatch(hideInfo())
            setIsInfo(false)
            if(isInput){
                dispatch(hideInput())
            }else{
                dispatch(showInput())
            }
        }} style={styles.board}>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={notes}
                renderItem={({ item }) => <Pressable key={item.id} onPress={()=>{
                    if (info) {
                        dispatch(removeNote())
                      } else {
                        // dispatch(showInfo())
                        setIsInfo(true)
                      }
                }}><Note key={item.id} id={item.id} text={item.text} isNote={item.isNote} isInfo={item.isInfo} /></Pressable>}
            />
        </Pressable>
    );
}


export default BoardScreen;