import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth'

export const removeFriendRequest = async (friendEmail) => {
    // remove request from your collection pending_requests
    //  get your email 
    //  get docs 
    //  remove field

    const EMAIL = auth().currentUser.email;

    const userQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get();

    const userDoc = userQuerySnapshot.docs[0];

    const userRef = firestore().collection('users').doc(userDoc.id);

    const pending_requests = userDoc.data().pending_requests || [];
    const USERNAME = userDoc.data().username

    let friendUsername 
    let friendNickname

    pending_requests.some((req)=>{
        if(req.email === friendEmail){
            friendUsername = req.username
            friendNickname = req.nickname
        }
    })

    userRef.update({
        pending_requests: firebase.firestore.FieldValue.arrayRemove({email: friendEmail,nickname:friendNickname,username:friendUsername})
    });

    // remove request from friend collection friends_requests
    //  get your friends docs
    //  remove field

    const friendQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', friendEmail)
        .get();

    const friendDoc = friendQuerySnapshot.docs[0];

    const friendRef = firestore().collection('users').doc(friendDoc.id);

    friendRef.update({
        friends_requests: firebase.firestore.FieldValue.arrayRemove({email: EMAIL,nickname:"",username:USERNAME})
    });
}