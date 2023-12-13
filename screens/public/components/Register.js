import { View, Text, Button,TextInput } from 'react-native'
import React, {useState} from 'react'
import { createAccount } from '../logic/apiRegister'
// import { db,auth,app } from '../../../src/firebase/config'
import { createUserWithEmailAndPassword, sendEmailVerification } from '@firebase/auth'
import { async } from '@firebase/util'

const Register = ({navigation}) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')

  
  const handleSignup = async () => {
    try {
      const user = await signup(email,password1)
      if (user){
        const id = user.uid
        console.log(id);
        // await saveUserData(id,first_name,last_name)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const signup = async (email,password) => {
    try {
      const userCredentail = await createUserWithEmailAndPassword(auth,email,password)
      await emailVerification()
      const user = userCredentail.user
      console.log('user reg: ', user);
      return user
    } catch (error) {
      console.log(error);
    }
  }

  const emailVerification = async ()=>{
    const user = auth.currentUser
    try {
      await sendEmailVerification(auth.currentUser,{
        handleCodeInApp:true,
        url:'',
      }).then(()=>{
        showEmailAlert(user.email)
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <TextInput placeholder='first name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput secureTextEntry placeholder='password' onChangeText={setPassword1} value={password1} blurOnSubmit={false}/>
      <TextInput secureTextEntry placeholder='confirm password' onChangeText={setPassword2} value={password2} blurOnSubmit={false}/>
      <Button onPress={handleSignup} title='Create Account'/>
      <Button onPress={()=>navigation.navigate('Login')} title='Sign In'/>
      <Text>{message}</Text>
    </View>
  )
}

export default Register