import React from 'react';
import {Pressable, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../assets/styles/styles';
import {signIn} from '../functions/signIn'
import * as AppleAuthentication from 'expo-apple-authentication';

const LoginWithAppleButton = () => {
    return (
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.continuteWithGoogle}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    );
}

export default LoginWithAppleButton;