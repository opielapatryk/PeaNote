import { View, Text, Button,TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Register = ({navigation}) => {

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')

  const createAccount = async () => {
    function isValidEmail(email) {
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return emailRegex.test(email);
    }

    function isValidPassword(password) {
      // Password must be at least 8 characters, contain at least one number, and one uppercase letter
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    }

    if(first_name === '' || last_name === '' || email === '' || password1 === '' || password2 === ''){
      setMessage('All fields must be provided!..')
    }else if(password1 != password2){
      setMessage('Passwords must be the same!..')
    }else if(!isValidEmail(email)){
      setMessage('Email must correct!..')
    }else if(!isValidPassword(password1)){
      setMessage('Password must be at least 8 characters, contain at least one number and big character!..')
    }else{
      try {
        const result = await axios.post('http://localhost:8000/custom_register', {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password1: password1,
          password2: password2
        });
  
        console.log(result.status);
        setMessage('Account created successfuly!')
        navigation.navigate('Login')
        return result
      } catch (error) {
        console.log(error.message);
      }
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
      <Text>{message}</Text>
    </View>
  )
}

export default Register