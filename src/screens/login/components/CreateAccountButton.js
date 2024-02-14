import React from 'react';
import {Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import { signUpFirebase } from '../functions/signUpFirebase';
import { useSelector,useDispatch } from 'react-redux';

const CreateAccountButton = () => {
  const { email,password } = useSelector((state)=>state.login)
  const dispatch = useDispatch()

  return (
    <>
      <Pressable style={styles.confirmButton} onPress={()=>signUpFirebase(email,password,dispatch)}> 
        <Text style={{fontWeight:'600'}}>Get Started</Text>
      </Pressable>  
    </>
  );
}

export default CreateAccountButton;