import { View, TextInput,Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import {API_URL, useAuth} from '../context/AuthContext'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {onLogin} = useAuth()

    useEffect(()=>{
        const testCall = async()=>{
            const result = await axios.get(`http://127.0.0.1:8000/api/users/`)
            console.log(result);
            
        }
        testCall()
    },[])

    const login = async()=>{
        const result = await onLogin(email,password)
        if(result&&result.error){
            alert(result.error)
        }
    }

    return (
        <View>
         <TextInput placeholder='email' onChangeText={(text)=>setEmail(text)} value={email}/>
         <TextInput placeholder='password' secureTextEntry={true} onChangeText={(text)=>setPassword(text)} value={password}/>
         <Button onPress={login} title='sing in'/>
        </View>
    )
}

export default Login