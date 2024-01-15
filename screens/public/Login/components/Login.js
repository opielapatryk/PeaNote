import { View } from 'react-native'
import React,{ useEffect,useState } from 'react';
import { MY_EMAIL } from '../../../constants';
import { styles } from '../../../../assets/styles/styles';
import Logo from '../../../../assets/images/logo.svg'
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';

const Login = () => {
  const [createAccount,setCreateAccount] = useState(true);

  useEffect(()=>{
    console.log('[Login.js] my email: ',MY_EMAIL);
  },[])

  return (
    <View style={styles.container}>
      <Logo width={200} height={150}/>

      {/* login screen */}
      {!createAccount && <LoginBody setCreateAccount={setCreateAccount}/>}
      
      {/* create account screen */}
      {createAccount && <CreateAccountBody setCreateAccount={setCreateAccount}/>}
    </View>
  );
}

export default Login;