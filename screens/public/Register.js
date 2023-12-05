import { View, Text, Button,TextInput } from 'react-native'
import React, {useState} from 'react'
import { createAccount } from './logic/apiRegister'

const Register = ({navigation}) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')

  return (
    <View>
      <TextInput placeholder='first name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput secureTextEntry placeholder='password' onChangeText={setPassword1} value={password1} blurOnSubmit={false}/>
      <TextInput secureTextEntry placeholder='confirm password' onChangeText={setPassword2} value={password2} blurOnSubmit={false}/>
      <Button onPress={()=>createAccount(setMessage,first_name,last_name,email,password1,password2,navigation)} title='Create Account'/>
      <Button onPress={()=>navigation.navigate('Login')} title='Sign In'/>
      <Text>{message}</Text>
    </View>
  )
}

export default Register