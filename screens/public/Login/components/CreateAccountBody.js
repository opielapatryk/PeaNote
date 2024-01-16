import React,{useState} from 'react';
import {Text,TextInput} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import CreateAccountButton from './CreateAccountButton';
import CreateAccountFooter from './CreateAccountFooter';
import LoginWithGoogleButton from './LoginWithGoogleButton';

const CreateAccountHeader = ({setCreateAccount}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

    return (
<>
{message !== '' && <Text style={styles.errorMessage}>{message}</Text>}
        <Text style={styles.header}>
          Create Account
        </Text>
        <Text style={styles.paragraph}>
          Let's get started by filling out the form below.
        </Text>
        <TextInput style={styles.roundTextInput} placeholder='First Name' onChangeText={setFirstName} value={first_name}/>
        <TextInput style={styles.roundTextInput} placeholder='Last Name' onChangeText={setLastName} value={last_name}/>
        <TextInput style={styles.roundTextInput} placeholder='Email' onChangeText={setEmail} value={email}/>
      <TextInput style={styles.roundTextInput} placeholder='Password' secureTextEntry onChangeText={setPassword} value={password}/>   
      
      <CreateAccountButton email={email} password={password} first_name={first_name} last_name={last_name} setMessage={setMessage}/>

      <Text style={styles.paragraph}>
        Or sign up with
      </Text>
      
      <LoginWithGoogleButton/>

      <CreateAccountFooter setCreateAccount={setCreateAccount}/>
      </>
    );
}

export default CreateAccountHeader;
