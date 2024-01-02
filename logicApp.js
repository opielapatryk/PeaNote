import * as SecureStore from 'expo-secure-store';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const loadToken = async (dispatch) => {
    let userToken;
    try {
        userToken = await SecureStore.getItemAsync("userToken");
        userId = await SecureStore.getItemAsync("userId");
    } catch (error) {
        return error
    }
    dispatch({ type: 'RESTORE_TOKEN', token: userToken,userId:userId });
};

export const signOutFunc = async (dispatch) => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userId');
      GoogleSignin.revokeAccess()
      GoogleSignin.signOut()

      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      return error
    }
  };

  export const signInFunc = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const user_sign_in = auth().signInWithCredential(googleCredential)
      user_sign_in.then((user)=>{
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      })
    } catch (e) {
      return e;
    }
  };