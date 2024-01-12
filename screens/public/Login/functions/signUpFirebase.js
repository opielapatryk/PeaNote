import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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