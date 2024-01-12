import { MY_EMAIL } from "../../../constants";

export const askBeforeStick = async (setAskBeforeStickingNoteFlag,setMessage) => {
    try {  
      const result = await firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
      .get()
  
      result.forEach(doc=>{
        data = doc.data().askBeforeStick
      })
  
      firestore()
      .collection('users')
      .where('email', '==', MY_EMAIL)
      .get()
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc => {
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            askBeforeStick: !data,
          })
          .then(()=>{
            setAskBeforeStickingNoteFlag(data ? false : true);
          })
        })
      })
    } catch (error) {
      setMessage('Something went wrong! Try again later..');
      console.log('email error',error.message);
    }
  };