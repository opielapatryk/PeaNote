import { View,Keyboard,TouchableWithoutFeedback,Image, Dimensions } from 'react-native'
import React,{ useEffect } from 'react';
import { styles } from '../../../../assets/styles/styles';
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote,removePendingNote } from '../../../../store/notes/boardSlice';
import { useFocusEffect } from '@react-navigation/native';
import { setMessage,setEmail } from '../../../../store/login/loginSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  useFocusEffect(
    React.useCallback(() => {
      return ()=>{
        dispatch(setMessage(''))
        dispatch(setEmail(''))
      }
    }, [])
  );
  const insets = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={[styles.container,{paddingBottom:insets.bottom-20}]}>
        <Image source={require('../../../../assets/images/logo.png')} style={{width:Dimensions.get('window').width/1.2,height:Dimensions.get('window').height/4,marginTop:Dimensions.get('window').height/10}}/>
      
      {/* login screen */}
      {!createAccount && <LoginBody/>}

      {/* create account screen */}
      {createAccount && <CreateAccountBody/>}
    </View>



    </TouchableWithoutFeedback>
  );
}

export default Login;