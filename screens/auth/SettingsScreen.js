import { Text, View, Button, TextInput, Modal, Pressable } from 'react-native'
import React, {useContext,useEffect,useState} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector} from 'react-redux';
import {removeNote} from '../../store/boardSlice';
import {styles} from '../../assets/styles'

export default SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const { notes } = useSelector((state)=>state.board)
  const dispatch_redux = useDispatch()
  const [message,setMessage] = useState('')
  const [showInput,setShowInput] = useState(true)
  const [old_password,setOldPass] = useState('')
  const [new_password,setNewPass] = useState('')
  const [confirmAccountDelete,setConfirmAccountDelete] = useState(false)
  const [modalVisible, setModalVisibility] = useState(false)
  const [askBeforeStickingNoteFlag, setaskBeforeStickingNoteFlag] = useState('OFF')

    useEffect(() => {
      async function checkIsAskBeforeStickingNoteFlagOff() {
        try {
          let userID = await SecureStore.getItemAsync('userId');

          const resp = await axios.get(`http://localhost:8000/api/users/${userID}/`)
  
          const data = resp.data.askBeforeStick;

          if(data){
            setaskBeforeStickingNoteFlag('ON')
          }else{
            setaskBeforeStickingNoteFlag("OFF")
          }

          console.log(data);
        } catch (error) {
          console.log(error.message);
        }
      }
      checkIsAskBeforeStickingNoteFlagOff()
    },[])

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
      setConfirmAccountDelete(false)
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

    async function askBeforeStick(){
      try {
        let userID = await SecureStore.getItemAsync('userId');

        const resp = await axios.get(`http://localhost:8000/api/users/${userID}/`)

        const data = resp.data.askBeforeStick;

        const patchRequest = await axios.patch(`http://localhost:8000/api/users/${userID}/`,{
          'askBeforeStick': !data
        })

        if(patchRequest.status && patchRequest.status === 200){
          setModalVisibility(false)
          if(data){
            setaskBeforeStickingNoteFlag('OFF')
          }else{
            setaskBeforeStickingNoteFlag('ON')
          }
          
        }

      } catch (error) {
        if(error){
          setModalVisibility(false)
          setMessage('Something went wrong! Try againt later..')
        }
        console.log(error.message);
      }
    }
    
    return (
      showInput?(
        confirmAccountDelete?(
          <View>
            <Button title={`ASK BEFORE STICKING NOTE | ${askBeforeStickingNoteFlag}`} onPress={()=>setModalVisibility(!modalVisible)}/>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>{
              Alert.alter('Modal has been closed.');
              setModalVisibility(!modalVisible)
            }}>
              <View style={styles.modal}>
                <Button onPress={askBeforeStick} title='Confirm'/>
                <Button onPress={()=>setModalVisibility(!modalVisible)} title='hide'/>
              </View>
            </Modal>
            <Button title='CHANGE PASSWORD' onPress={()=>{
              setConfirmAccountDelete(false)
              setShowInput(false)
              setMessage('')
              }}/>
            <Button title='CONFIRM ACCOUNT DELETE' onPress={deleteAccount}/>
            <Text>{message}</Text>
          </View>
        ):(
          <View>
            <Button title={`ASK BEFORE STICKING NOTE | ${askBeforeStickingNoteFlag}`} onPress={()=>setModalVisibility(!modalVisible)}/>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>{
              Alert.alter('Modal has been closed.');
              setModalVisibility(!modalVisible)
            }}>
              <View style={styles.modal}>
                <Button onPress={askBeforeStick} title='Confirm'/>
                <Button onPress={()=>setModalVisibility(!modalVisible)} title='hide'/>
              </View>
            </Modal>
            <Button title='CHANGE PASSWORD' onPress={()=>{
              setConfirmAccountDelete(false)
              setShowInput(false)
              setMessage('')
              }}/>
            <Button title='DELETE ACCOUNT' onPress={()=>setConfirmAccountDelete(true)}/>
            <Text>{message}</Text>
          </View>
        )
      ):(
        confirmAccountDelete?(
          <View>
            <Button title={`ASK BEFORE STICKING NOTE | ${askBeforeStickingNoteFlag}`} onPress={()=>setModalVisibility(!modalVisible)}/>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>{
              Alert.alter('Modal has been closed.');
              setModalVisibility(!modalVisible)
            }}>
              <View style={styles.modal}>
                <Button onPress={askBeforeStick} title='Confirm'/>
                <Button onPress={()=>setModalVisibility(!modalVisible)} title='hide'/>
              </View>
            </Modal>
            <TextInput placeholder='old password' onChangeText={setOldPass} secureTextEntry/>
            <TextInput placeholder='new password' onChangeText={setNewPass} secureTextEntry/>
            <Button title='CONFIRM NEW PASSWORD' onPress={changePassword}/>
            <Button title='CONFIRM ACCOUNT DELETE' onPress={deleteAccount}/>
            <Text>{message}</Text>
          </View>
        ):(
          <View>
            <Button title={`ASK BEFORE STICKING NOTE | ${askBeforeStickingNoteFlag}`} onPress={()=>setModalVisibility(!modalVisible)}/>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>{
              Alert.alter('Modal has been closed.');
              setModalVisibility(!modalVisible)
            }}>
              <View style={styles.modal}>
                <Button onPress={askBeforeStick} title='Confirm'/>
                <Button onPress={()=>setModalVisibility(!modalVisible)} title='hide'/>
              </View>
            </Modal>
            <TextInput placeholder='old password' onChangeText={setOldPass} secureTextEntry/>
            <TextInput placeholder='new password' onChangeText={setNewPass} secureTextEntry/>
            <Button title='CONFIRM NEW PASSWORD' onPress={changePassword}/>
            <Button title='DELETE ACCOUNT' onPress={()=>setConfirmAccountDelete(true)}/>
            <Text>{message}</Text>
          </View>
        )
      )
    )
}