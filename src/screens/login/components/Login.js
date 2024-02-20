import { View,Keyboard,TouchableWithoutFeedback,Image } from 'react-native'
import React from 'react';
import { styles } from '../../../../assets/styles/styles';
import LoginBody from './LoginBody';
import CreateAccountBody from './CreateAccountBody';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = () => {
  const { createAccount } = useSelector((state)=>state.login)
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={[styles.container,{paddingBottom:insets.bottom-20}]}>
        <Image source={require('../../../../assets/images/Logo8.png')} style={styles.logo} resizeMode='contain'/>
        
        {!createAccount && <LoginBody/>}

        {createAccount && <CreateAccountBody/>}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Login;