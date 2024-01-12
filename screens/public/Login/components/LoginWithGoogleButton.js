import React from 'react';
import {Pressable, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../assets/styles/styles';
import {signIn} from '../functions/signIn'

const LoginWithGoogleButton = () => {
    return (
        <Pressable style={styles.continuteWithGoogle} onPress={signIn}>
        <Ionicons name="md-logo-google" size={22} color="black" />
        <Text>
          Continue with Google
        </Text>
      </Pressable>  
    );
}

export default LoginWithGoogleButton;