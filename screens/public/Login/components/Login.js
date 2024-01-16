import { View } from 'react-native'
import React,{ useState,useEffect } from 'react';
import { styles } from '../../../../assets/styles/styles';
import Logo from '../../../../assets/images/logo.svg'
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote,removePendingNote } from '../../../../store/notes/boardSlice';

const Login = () => {
  const [createAccount,setCreateAccount] = useState(true);
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    notes.forEach(note => {
      dispatch(removeNote(note.id))
    });
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={200} height={150}/>

      {/* login screen */}
      {!createAccount && <LoginBody setCreateAccount={setCreateAccount}/>}
      
      {/* create account screen */}
      {createAccount && <CreateAccountBody setCreateAccount={setCreateAccount}/>}
    </View>
  );
}

export default Login;