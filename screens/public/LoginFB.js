import { View,TextInput,Button,Text } from 'react-native'
import React, {useState,useContext} from 'react'
import { styles } from '../../assets/styles/styles';
import { FIREBASE_AUTH,FIREBASE_DB } from '../../FIrebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

const LoginFB = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const auth = FIREBASE_AUTH

  // SIGN IN WITH EMAIL AND PASSWORD
  const signInFirebase = async () =>{
    try {
        await signInWithEmailAndPassword(auth,email, password)
    } catch (error) {
        console.log(error);
    }
  }

  const signUpFirebase = async () =>{
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password)
        const user = userCredential.user;
        await setDoc(doc(FIREBASE_DB, "users", user.uid), {
          first_name: first_name,
          last_name: last_name,
          email: email,
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        });
    } catch (error) {
        console.log(error);
    }
  }

  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput placeholder='first_name' onChangeText={setFirstName} value={first_name}/>
      <TextInput placeholder='last_name' onChangeText={setLastName} value={last_name}/>
      <TextInput placeholder='email' onChangeText={setEmail} value={email}/>
      <TextInput placeholder='password' secureTextEntry onChangeText={setPassword} value={password}/>   
      <Button onPress={signInFirebase} title='sign in' />
      <Button onPress={signUpFirebase} title='Create Account' />
      <Button onPress={signIn} title='signInGoogle'/>
      <Text>{message}</Text>
    </View>
  );
}

export default LoginFB;