import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';

export const isPending = async (friendEmail) => {
    const EMAIL = auth().currentUser.email;
    const database = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/');
    const usersRef = database.ref('users');
    const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = userSnapshot.val();
    let invited = false;

    if (userData) {
      const userId = Object.keys(userData)[0];
      const pending_requests = (userData[userId].friends || []).filter((f)=>f.pending === true && (f.email === friendEmail || f.username === friendEmail));

      if(pending_requests.length > 0){
        invited = true;
      }
    }

    return invited
}