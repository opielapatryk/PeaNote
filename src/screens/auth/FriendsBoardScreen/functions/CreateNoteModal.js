import React,{useState, useEffect} from 'react';
import {View, Modal,Text,TextInput,Pressable,} from 'react-native';
import { styles } from '../../../../../assets/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showAddNoteModal } from '../../../../store/notes/boardSlice';
import { createNote } from './createNote';

export default ({friendEmail}) => {
    const [content,setContent] = useState("")
    const {addNoteModal} = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [modall,setModal] = useState(addNoteModal)
    
    useEffect(() => {
        setModal(addNoteModal);
      }, [addNoteModal]);

    return (
        <Modal animationType="slide" transparent={true} visible={modall}>
            <View style={styles.modalPasswordResetView}>
            <View style={styles.modalSetPasswordChild}>
                <Text style={styles.modalPasswordResetHeader}>Note for your dear friend</Text>
                <TextInput style={styles.modalPasswordResetTextInput} placeholder={'Note'} value={content} onChangeText={text=>setContent(text)} onSubmitEditing={()=>{
                    createNote(content,setContent,friendEmail)
                    setContent('')
                    dispatch(showAddNoteModal(false))
                }}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Pressable onPress={ ()=>{
                        createNote(content,setContent,friendEmail)
                        setContent('')
                        dispatch(showAddNoteModal(false))
                        }} style={styles.modalPasswordResetButtonNext}><Text style={styles.modalPasswordResetButtonNextText}>Create</Text></Pressable>
                    
                    <Pressable onPress={()=>{
                    dispatch(showAddNoteModal(false))
                    }} style={styles.editNoteBack}><Text style={styles.editNoteBackText}>Back</Text></Pressable>
                </View>
            </View>
            </View>
        </Modal>
    );
}