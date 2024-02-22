import React,{useState, useEffect} from 'react';
import {View, Modal,Text,TextInput,Pressable,} from 'react-native';
import { styles } from '../../../../../assets/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showAddNoteModal } from '../../../../store/notes/boardSlice';
import addNoteToMyBoard from '../functions/addNoteToMyBoard';
import { fetchNotes } from '../functions/fetchNotes';

export default ({board}) => {
    const [content,setContent] = useState("")
    const {addNoteModal} = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [modall,setModal] = useState(addNoteModal)
    
    useEffect(() => {
        setModal(addNoteModal);
      }, [addNoteModal]);

    return (
        <Modal animationType="slide" transparent={true} visible={modall}>
            <View style={styles.modalSetPassword}>
            <View style={styles.modalSetPasswordChild}>
                <Text style={styles.modalPasswordResetHeader}>Write whatever you want, it's your board</Text>
                <TextInput style={styles.modalPasswordResetTextInput} placeholder={'Note'} value={content} onChangeText={text=>setContent(text)}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable onPress={async ()=>{
                    await addNoteToMyBoard(content,board)
                    fetchNotes(dispatch);
                    setContent('')
                    dispatch(showAddNoteModal(false))
                    }} style={styles.modalPasswordResetButtonNext}><Text style={styles.modalPasswordResetButtonNextText}>Add</Text></Pressable>
                </View>
            </View>
            </View>
        </Modal>
    );
}