import { Text, View, Button, TextInput } from 'react-native'
import React, {useContext,useState} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector} from 'react-redux';
import {removeNote} from '../../store/boardSlice';
// import base64 from 'base-64';

export default SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const { notes } = useSelector((state)=>state.board)
  const dispatch_redux = useDispatch()
  const [message,setMessage] = useState('')
  const [showInput,setShowInput] = useState(true)
  const [old_password,setOldPass] = useState('')
  const [new_password,setNewPass] = useState('')

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

    async function changePassword(){
      try {
        const token = await SecureStore.getItemAsync('userToken')

        const resp = await axios.put(`http://localhost:8000/update_password`,{
          "old_password": old_password,
          "new_password": new_password
        },{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        })

        console.log(resp.status);

        if(resp.status && resp.status === 204){
          setMessage('Password updated!')
        }
        setShowInput(true)
        
      } catch (error) {
        if(error){
          setMessage('Something went wrong! Try provide different password!')
        }
        console.log(error.message);
      }
    }
    
    return (
      showInput?(
      <View>
        <Button title='ASK BEFORE STICKING NOTE'/>
        <Button title='MAKE BOARD PRIVATE'/>
        <Button title='CHANGE PASSWORD' onPress={()=>{
          setShowInput(false)
          setMessage('')
          }}/>
        <Button title='DELETE ACCOUNT' onPress={deleteAccount}/>
        <Text>{message}</Text>
      </View>
      ):(
      <View>
        <Button title='ASK BEFORE STICKING NOTE'/>
        <Button title='MAKE BOARD PRIVATE'/>
        <TextInput placeholder='old password' onChangeText={setOldPass} secureTextEntry/>
        <TextInput placeholder='new password' onChangeText={setNewPass} secureTextEntry/>
        <Button title='CONFIRM NEW PASSWORD' onPress={changePassword}/>
        <Button title='DELETE ACCOUNT' onPress={deleteAccount}/>
        <Text>{message}</Text>
      </View>
      )
    )
}