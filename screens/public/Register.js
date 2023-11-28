import { View, Text, Button,TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Register = ({navigation}) => {

  const [first_name, setFirstName] = useState()
  const [last_name, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password1, setPassword1] = useState()
  const [password2, setPassword2] = useState()

  const createAccount = async () => {
    try {
      const result = await axios.post('http://localhost:8000/custom_register', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password1: password1,
        password2: password2
      });

      console.log(result.status);

      return result
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View>
      <TextInput placeholder='first name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput secureTextEntry placeholder='password' onChangeText={setPassword1} value={password1} blurOnSubmit={false}/>
      <TextInput secureTextEntry placeholder='confirm password' onChangeText={setPassword2} value={password2} blurOnSubmit={false}/>

      <Button onPress={()=>createAccount()} title='Create Account'/>
      <Button onPress={()=>navigation.navigate('Login')} title='Sign In'/>
    </View>
  )
}

export default Register