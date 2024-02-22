import React from 'react';
import {Pressable, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../assets/styles/styles';
import {signIn} from '../functions/signIn'
import {useDispatch} from 'react-redux'

const LoginWithGoogleButton = () => {
  const dispatch = useDispatch()
  
    return (
      <Pressable style={styles.continuteWithGoogle} onPress={()=>signIn(dispatch)}>
        <Ionicons name="md-logo-google" size={14} color="black" />
        <Text style={{fontWeight:'600'}}>
          Continue with Google
        </Text>
      </Pressable>  
    );
}

export default LoginWithGoogleButton;