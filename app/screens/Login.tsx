import { View, TextInput,Button } from 'react-native'
import React, { useState} from 'react'
import { useAuth} from '../context/AuthContext'
import {Note} from '../../components/Note'


export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {onLogin} = useAuth()

    const login = async()=>{
        const result = await onLogin(email,password)
        if(result&&result.error){
            console.log(result);
        }
    }
  

    const handleComponentPress = (componentName:String) => {
      // Check if the pressed component is not "Note"
      if (componentName !== 'Note') {
        // Revert the text state to the previous state
        return true
      }
    };

    return (
        <View>
         <TextInput placeholder='email' onChangeText={(text)=>setEmail(text)} value={email}/>
         <TextInput placeholder='password' secureTextEntry={true} onChangeText={(text)=>setPassword(text)} value={password}/>
         <Button onPress={login} title='sing in'/>
         <Button title='break' onPress={() => handleComponentPress('OtherComponent1')}/>
         <Note text='hej' onPress={() => handleComponentPress('Note')}/>
        </View>
    )
}