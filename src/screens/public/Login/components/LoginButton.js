import React from 'react';
import {Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import {signInFirebase} from '../functions/signInFirebase';
import { useSelector,useDispatch } from 'react-redux';

const LoginButton = () => {
  const { email,password } = useSelector((state)=>state.login)
  const dispatch = useDispatch()
    return (
<>
        <Pressable style={styles.confirmButton} onPress={()=>signInFirebase(email,password,dispatch)}>
        <Text style={{fontWeight:'600'}}>
            Log In
          </Text>
        </Pressable>  
      </>
    );
}

export default LoginButton;