import React from 'react';
import {View, Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch } from 'react-redux';
import { setEmail,setPassword,setCreateAccount,setMessage } from '../../../../store/login/loginSlice';

const LoginFooter = () => {
  const dispatch = useDispatch()
    return (
      <>
        <View style={styles.bottomView}>

          <Pressable style={styles.pressableInBottonViewLeftLogInOn} onPress={()=>{
            dispatch(setCreateAccount(true))
            dispatch(setEmail(''))
            dispatch(setPassword(''))
            dispatch(setMessage(''))
            }}>
            <Text>
              Create Account
            </Text>
          </Pressable>  

          <Pressable style={styles.pressableInBottonViewRightLogInOn} onPress={()=>{
            dispatch(setCreateAccount(false))
            dispatch(setEmail(''))
            dispatch(setPassword(''))
            dispatch(setMessage(''))
            }}>
            <Text>
              Log In
            </Text>
          </Pressable>  

        </View>
      </>
    );
}

export default LoginFooter;