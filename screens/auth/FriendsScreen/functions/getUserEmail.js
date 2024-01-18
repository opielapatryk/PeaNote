import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUserEmail = async (
    setdoesEmailExist,
    firstRender,
    setMessage,
    setButtonTitle,
    setFirstRender,
    newFriendEmail,
    setFriendReqMessage
  ) => {
    const EMAIL = auth().currentUser.email

      if(newFriendEmail.length > 0){
        setFriendReqMessage(false)
      }
      setdoesEmailExist(false);
  
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
              setButtonTitle('');
            }else if (Array.isArray(querySnapshotDocs) && querySnapshotDocs.length > 0) {
              setdoesEmailExist(true);
              if (newFriendEmail === EMAIL) {
                setMessage('You cannot add yourself to friends!..');
                setButtonTitle('');
              } else {
                setMessage('');
                setButtonTitle('ADD');
              }
            } else {
              if (!firstRender) {
                setMessage('This user does not exist!..');
                setButtonTitle('');
              }
              if (!firstRender && newFriendEmail === ''){
                setMessage('');
              } 
              setFirstRender(false);
            }
          })  
  
        }
        
  };