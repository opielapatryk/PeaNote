import { View, TextInput,Button} from 'react-native'
import React, { createContext,useContext,useState,useEffect } from "react";
import { useAuth} from '../context/AuthContext'
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

export default function Login () {
    const TOKEN = 'token';
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authState, setAuthState] = useState({
        token:null,
        authenticated:null
    })

    const login = async()=>{
        try{
            const response = await axios.post('http://127.0.0.1:8000/custom_login', {
                username: email,
                password: password
            });

            setAuthState(prevState => ({
                ...prevState,
                token: response.data.token,
                authenticated: true
            }));

            await SecureStore.setItemAsync(TOKEN, response.data.token);
            console.log(authState);
            return response;
        }catch(e){
            console.error("Login error:", e);
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