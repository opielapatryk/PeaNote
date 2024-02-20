import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

export const isRequest = async (friendEmail) => {
    const EMAIL = auth().currentUser.email;
    const currentUser = await firestore().collection('users').where('email', '==', EMAIL).get();
    let invited = false;

    const pending_requests = currentUser.docs[0].data().pending_requests;

    pending_requests.every((request)=>{
        if(request.email === friendEmail || request.username === friendEmail){
            invited = true;
            return false
        }
        return true
    })

    return invited
}