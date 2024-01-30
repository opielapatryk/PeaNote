import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUserEmail = async (
    firstRender,
    setMessage,
    setFirstRender,
    newFriendEmail,
    setFriendReqMessage
  ) => {
    const EMAIL = auth().currentUser.email

      if(newFriendEmail.length > 0){
        setFriendReqMessage(false)
      }
  
      const myQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get();

        const myQuerySnapshotDocs = myQuerySnapshot.docs;

        const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', newFriendEmail)
        .get();

        const querySnapshotDocs = querySnapshot.docs;

        if (Array.isArray(myQuerySnapshotDocs) && myQuerySnapshotDocs.length > 0) {
          myQuerySnapshotDocs.forEach(doc=>{
            if(doc.data().friends.includes(newFriendEmail)){
              setMessage('You are already friends!..');
            }else if (Array.isArray(querySnapshotDocs) && querySnapshotDocs.length > 0) {
              if (newFriendEmail === EMAIL) {
                setMessage('You cannot add yourself to friends!..');
              } else {
                setMessage('');
              }
            } else {
              if (!firstRender) {
                setMessage('This user does not exist!..');
              }
              if (!firstRender && newFriendEmail === ''){
                setMessage('');
              } 
              setFirstRender(false);
            }
          })  
  
        }
        
  };