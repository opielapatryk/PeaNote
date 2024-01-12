import auth from '@react-native-firebase/auth';

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