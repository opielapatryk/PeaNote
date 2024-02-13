import auth from '@react-native-firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';

export const loginWithAppleFunction = async () => {
    const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
    });

    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    return auth().signInWithCredential(appleCredential);
}