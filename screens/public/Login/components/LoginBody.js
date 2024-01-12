import React,{useState} from 'react';
import { Text,TextInput} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import LoginButton from './LoginButton';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import LoginFooter from './LoginFooter';

const LoginHeader = ({setCreateAccount}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

    return (
        <>
        {message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
        <Text style={styles.header}>
          Log In
        </Text>
        <Text style={styles.paragraph}>
          Please provide your credentials by filling out the form below.
        </Text>

        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={setEmail} value={email}/>
        <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={setPassword} value={password}/>   

        <LoginButton email={email} password={password} setMessage={setMessage}/>

               
      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      <LoginWithGoogleButton/>

      <LoginFooter setCreateAccount={setCreateAccount} setMessage={setMessage} />
      </>
    );
}

export default LoginHeader;