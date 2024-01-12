import React from 'react';
import {Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import { signUpFirebase } from '../functions/signUpFirebase';

const CreateAccountButton = ({email,password,first_name,last_name,setMessage}) => {
    return (
<>
        <Pressable style={styles.confirmButton} onPress={()=>signUpFirebase(email,password,first_name,last_name,setMessage)}> 
          <Text>
            Get Started
          </Text>
        </Pressable>  
      </>
    );
}

export default CreateAccountButton;