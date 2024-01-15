import { View } from 'react-native'
import React,{ useState } from 'react';
import { styles } from '../../../../assets/styles/styles';
import Logo from '../../../../assets/images/logo.svg'
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';

const Login = () => {
  const [createAccount,setCreateAccount] = useState(true);

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