import React from 'react';
import {Pressable, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../assets/styles/styles';
import {signIn} from '../functions/signIn'
import * as AppleAuthentication from 'expo-apple-authentication';
import auth from '@react-native-firebase/auth';

const LoginWithAppleButton = () => {
    return (
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.continuteWithGoogle}
        onPress={async () => {
            const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
                requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

            return auth().signInWithCredential(appleCredential);
        }}
      />
    );
}

export default LoginWithAppleButton;