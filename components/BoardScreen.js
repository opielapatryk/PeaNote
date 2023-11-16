import React from 'react';
import {ScrollView,Pressable} from 'react-native';
import {Note} from './Note'
import { useDispatch} from 'react-redux';
import { hideInfo } from '../store/noteSlice';
import {styles} from '../assets/styles'

const BoardScreen = () => {
    const dispatch = useDispatch()
    return (
        <Pressable onPress={()=>dispatch(hideInfo())} style={styles.board}>
          <ScrollView>
            <Note/>
          </ScrollView>
         </Pressable>
    );
}


export default BoardScreen;
