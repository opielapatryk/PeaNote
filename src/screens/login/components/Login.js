import { View,Keyboard,TouchableWithoutFeedback,Image } from 'react-native'
import React,{ useEffect } from 'react';
import { styles } from '../../../../assets/styles/styles';
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote,removePendingNote } from '../../../store/notes/boardSlice';
import { useFocusEffect } from '@react-navigation/native';
import { setMessage,setEmail } from '../../../store/login/loginSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = () => {
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const { createAccount } = useSelector((state)=>state.login)
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets();

  useEffect(() => {
    notes.forEach(note => {
      dispatch(removeNote(note.id))
    });
    pendingNotes.forEach(note => {
      dispatch(removePendingNote(note.id))
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return ()=>{
        dispatch(setMessage(''))
        dispatch(setEmail(''))
      }
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={[styles.container,{paddingBottom:insets.bottom-20}]}>
        <Image source={require('../../../../assets/images/logo.png')} style={styles.logo}/>
        
        {!createAccount && <LoginBody/>}

        {createAccount && <CreateAccountBody/>}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;