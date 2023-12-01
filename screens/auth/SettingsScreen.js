import { Text, View, Button } from 'react-native'
import React, {useContext} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector} from 'react-redux';
import {removeNote} from '../../store/boardSlice';

export default SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const { notes } = useSelector((state)=>state.board)
  const dispatch_redux = useDispatch()

    async function deleteAccount(){
      try {
        let userID = await SecureStore.getItemAsync('userId');

        const resp = await axios.delete(`http://localhost:8000/api/users/${userID}/`)

        console.log(resp.status);

        if(resp.status === 204){
          signOut()
          notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)))
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    return (
      <View>
        <Button title='ASK BEFORE STICKING NOTE'/>
        <Button title='MAKE BOARD PRIVATE'/>
        <Button title='CHANGE PASSWORD'/>
        <Button title='DELETE ACCOUNT' onPress={deleteAccount}/>
      </View>
    )
}