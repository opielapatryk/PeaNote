import auth from '@react-native-firebase/auth';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const signInFirebase = (email,password,setMessage) =>{
    try {
      auth().signInWithEmailAndPassword(email,password).catch((err) => {
        console.log(err)
        if(err.code === "auth/wrong-password"){
          setMessage('The password is invalid, try again.')
        }else if(err.code === "auth/invalid-email"){
          setMessage('The email is invalid, try again.')
        }else if(err.code === "auth/invalid-credential"){
          setMessage('The supplied credential is wrong or has expired.')
        }else if(err.code === "auth/too-many-requests"){
          setMessage('Access to this account has been temporarily disabled due to many failed login attempts. You can try again later.')
        }
      })
    } catch (error) {
        setMessage(error)
        console.log(error);
    }
  } 

export const signUpFirebase = async (email,password,first_name,last_name,setMessage) =>{
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
        } catch (err) {
          console.log(err)
          if(err.code === "auth/weak-password"){
            setMessage('The given password is invalid.')
          }else if(err.code === "auth/invalid-email"){
            setMessage('The email address is badly formatted.')
          }else if(err.code === "auth/email-already-in-use"){
            setMessage('The email address is already in use by another account.')
          }
        }
      }

export const signIn = async (setMessage)=>{
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
        }
      })
    } catch (error) {
      console.log(error);
    }
  }