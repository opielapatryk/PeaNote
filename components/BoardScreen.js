import React from 'react';
import {ScrollView,Pressable, StyleSheet} from 'react-native';
import {Note} from './Note'
import { useDispatch, useSelector} from 'react-redux';
import { showInfo, hideInfo,removeNote } from '../store/noteSlice';
import {styles} from '../assets/styles'

const BoardScreen = () => {
    const {text,isNote,isInfo} = useSelector((state)=>state.note)
    const dispatch = useDispatch()
    return (
        <Pressable onPress={()=>dispatch(hideInfo())} style={styles.board}>
          <ScrollView>
            <Note text='hej'/>
          </ScrollView>
         </Pressable>
    );
}


export default BoardScreen;
