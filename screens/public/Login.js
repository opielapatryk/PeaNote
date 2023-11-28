import { View,TextInput,Button } from 'react-native'
import React, {useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext';

export default Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { singIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder='email' onChangeText={setUsername} value={username} />
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password} />
      <Button onPress={()=>singIn({username,password})} title='sign in' />
      <Button onPress={()=>navigation.navigate('Register')} title='Create Account' />
    </View>
  );
}