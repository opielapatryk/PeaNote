import { View,Keyboard,TouchableWithoutFeedback,Image } from 'react-native'
import React,{ useEffect } from 'react';
import { styles } from '../../../../assets/styles/styles';
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote,removePendingNote } from '../../../../store/notes/boardSlice';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const { createAccount } = useSelector((state)=>state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    notes.forEach(note => {
      dispatch(removeNote(note.id))
    });
    pendingNotes.forEach(note => {
      dispatch(removePendingNote(note.id))
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <LinearGradient>
        <View style={styles.container}>
          <Image source={require('../../../../assets/images/logoPeaNote.png')}/>

          {/* login screen */}
          {!createAccount && <LoginBody/>}
          
          {/* create account screen */}
          {createAccount && <CreateAccountBody/>}
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default Login;