import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const signInFirebase = (createAccount,setCreateAccount,email,password) =>{
    if(createAccount){
      setCreateAccount(false)
    }else{
      try {
        auth().signInWithEmailAndPassword(email,password)
      } catch (error) {
          console.log(error);
      }
    }
  }

export const signUpFirebase = async (createAccount,email,password,first_name,last_name,setCreateAccount) =>{
    if(createAccount){
        try {
        const user = await auth().createUserWithEmailAndPassword(email, password);
        await user.user.sendEmailVerification();
        if(user.additionalUserInfo.isNewUser){
            firestore()
            .collection('users')
            .add({
            first_name: first_name,
            last_name: last_name,
            email: email,
            friends: [],
            friends_requests: [],
            askBeforeStick: false,
            stickersOnBoard: [],
            pending: []
            })
            .then(() => {
            console.log('User added!');
            })
        }
        } catch (error) {
        console.log(error);
        }
    }else{
        setCreateAccount(true)
    }
}

export const signIn = async ()=>{
    try {
      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const user_sign_in = auth().signInWithCredential(googleCredential)

      user_sign_in.then((user)=>{
        if(user.additionalUserInfo.isNewUser){
          firestore()
          .collection('users')
          .add({
            first_name: user.additionalUserInfo.profile.given_name,
            last_name: user.additionalUserInfo.profile.family_name,
            email: user.user.email,
            friends: [],
            friends_requests: [],
            askBeforeStick: false,
            stickersOnBoard: [],
            pending: []
          })
          .then(() => {
            console.log('User added!');
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }