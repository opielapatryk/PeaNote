import { View,TextInput,Button,Text } from 'react-native'
import React, {useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';

export default Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder='email' onChangeText={setUsername} value={username} />
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password} />
      <Button onPress={async ()=>{
        if(username == '' || password == ''){
          setMessage('Username and password must be provided!')
        }else{
          setMessage('')

          try {
            const e = await signIn({ username, password });
      
            // Check if the response has a 'response' property before accessing 'status'
            if (e.response && e.response.status === 400) {
              setMessage('This user does not exist');
            }
          } catch (error) {
            // Handle other errors, or log the error for debugging purposes
            console.error('Error during sign-in:', error);
          }

        }
      }} title='sign in' />
      <Button onPress={()=>navigation.navigate('Register')} title='Create Account' />
      <Text>{message}</Text>
    </View>
  );
}