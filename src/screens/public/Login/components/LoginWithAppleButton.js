import React from 'react';
import { styles } from '../../../../assets/styles/styles';
import * as AppleAuthentication from 'expo-apple-authentication';
import {loginWithAppleFunction} from '../functions/loginWithAppleFunction'

const LoginWithAppleButton = () => {
    return (
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.continuteWithGoogle}
        onPress={loginWithAppleFunction}
      />
    );
}

export default LoginWithAppleButton;