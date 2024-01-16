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
    try {
      if(newFriendEmail.length > 0){
        setFriendReqMessage(false)
      }
      setdoesEmailExist(false);
  
      const myQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get();

        const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', newFriendEmail)
        .get();

        myQuerySnapshot.forEach(doc=>{
          if(doc.data().friends.includes(newFriendEmail)){
            setMessage('You are already friends!..');
            setButtonTitle('');
          }else if (!querySnapshot.empty) {
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
    } catch (error) {
      console.error('[getUserEmail.js]:', error);
    }
  };