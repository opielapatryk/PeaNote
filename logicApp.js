import * as SecureStore from 'expo-secure-store';
import { fetchNotes } from './screens/auth/logic/apiBoardScreen';
import { GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import { FIREBASE_DB,FIREBASE_AUTH} from './FIrebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged,signInWithPopup ,GoogleAuthProvider} from "firebase/auth";
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

  export const signInFunc = async (dispatch) => {
    try {
      GoogleSignin.configure({
        webClientId:"1088925346926-il03fpvr7b6q4qb5llrofkafd7c292dr.apps.googleusercontent.com",
        iosClientId:"1088925346926-3e883fbcli5qkc14vibgq3c2i3rl1735.apps.googleusercontent.com"
      })
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      await SecureStore.setItemAsync("userToken", JSON.stringify(userInfo.idToken))
      await SecureStore.setItemAsync('userId', JSON.stringify(userInfo.user.id));
      await dispatch({ type: 'SIGN_IN', token: userInfo.idToken, userId: userInfo.user.id });

      try {
        await setDoc(doc(FIREBASE_DB, "users", userInfo.idToken), {
          first_name: 'JSON.stringify(userInfo.user.givenName)',
          last_name: 'JSON.stringify(userInfo.user.familyName)',
          email: 'JSON.stringify(userInfo.user.email)',
          friends: [],
          friends_requests: [],
          askBeforeStick: false,
          stickersOnBoard: [],
          pending: []
        });
      } catch (error) {
        console.error('Error writing to Firestore:', error);
        throw error;
      }
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      return e;
    }
  };