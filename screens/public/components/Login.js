import { View,TextInput,Button,Text } from 'react-native'
import React, {useContext, useState} from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { validateAndTrySignIn } from '../logic/apiLogin';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder='email' onChangeText={setUsername} value={username} />
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password} />
      <Button onPress={()=>validateAndTrySignIn(signIn,setMessage,username,password)} title='sign in' />
      <Button onPress={()=>navigation.navigate('Register')} title='Create Account' />
      <Text>{message}</Text>
    </View>
  );
}

export default Login;