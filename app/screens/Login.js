import { View, TextInput,Button} from 'react-native'
import React, { useState} from 'react'
import { useAuth} from '../context/AuthContext'
import BoardScreen from '../../components/BoardScreen'


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

    return (
        <View>
         {/* <TextInput placeholder='email' onChangeText={(text)=>setEmail(text)} value={email}/>
         <TextInput placeholder='password' secureTextEntry={true} onChangeText={(text)=>setPassword(text)} value={password}/>
         <Button onPress={login} title='sing in'/> */}
         <BoardScreen/>
        </View>
    )
}