import auth from '@react-native-firebase/auth'
import {firebase} from '@react-native-firebase/database';


export async function getUserDocs(){
    const EMAIL = auth().currentUser.email

    const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users')

    const snapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');

    const userData = snapshot.val();

    return userData;
}