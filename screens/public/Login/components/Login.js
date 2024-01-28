import { View } from 'react-native'
import React,{ useEffect } from 'react';
import { styles } from '../../../../assets/styles/styles';
import Logo from '../../../../assets/images/logo.svg'
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote,removePendingNote } from '../../../../store/notes/boardSlice';

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
    <View style={styles.container}>
      <Logo width={200} height={150}/>

      {/* login screen */}
      {!createAccount && <LoginBody/>}
      
      {/* create account screen */}
      {createAccount && <CreateAccountBody/>}
    </View>
  );
}

export default Login;