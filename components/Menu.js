import React, {useContext} from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';
import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector} from 'react-redux';
import {removeNote} from '../store/boardSlice';

export default function menu({ navigation }) {

  const { signOut } = useContext(AuthContext);
  const { notes } = useSelector((state)=>state.board)
  const dispatch_redux = useDispatch()
  return (
    <View style={styles.menu}>
      <Button title='BOARD' />
      {/* if ask before stick is turned on */} 
      <Button title='PENDING' onPress={() => navigation.navigate('Pending')}/>
      {/* if ask before stick is turned on */} 
      <Button title='FRIENDS' onPress={() => navigation.navigate('Friends')}/>
      <Button title='SETTINGS' onPress={() => navigation.navigate('Settings')}/>
      <Button onPress={()=>{
        signOut()
        notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)))
        }} title='LOGOUT' />
    </View>
  );
}
