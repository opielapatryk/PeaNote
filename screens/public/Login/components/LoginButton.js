import React from 'react';
import {Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import {signInFirebase} from '../functions/signInFirebase';

const LoginButton = ({email,password,setMessage}) => {
    return (
<>
        <Pressable style={styles.confirmButton} onPress={()=>signInFirebase(email,password,setMessage)}>
          <Text>
            Log In
          </Text>
        </Pressable>  
      </>
    );
}

export default LoginButton;