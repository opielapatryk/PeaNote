import auth, { firebase } from '@react-native-firebase/auth';
import { setShowInputUsername,setUsername } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import firestore from '@react-native-firebase/firestore';

 export const changeUsername = async ({setDeleteAccountPressed,newUsername,dispatch,setNewUsername}) => {
        setDeleteAccountPressed(false);
        let usernameExists = false;

        const getuserwiththisusername = await firestore().collection('users').get()

        getuserwiththisusername.docs.forEach(user =>{
          if(user.data().username === newUsername){
            usernameExists = true;
          }
        })

        if (usernameExists) {
          setNewUsername('')
          dispatch(setMessage('USERNAME IS TAKEN'));
          setTimeout(() => {
            dispatch(setShowInputUsername(false))
            dispatch(setMessage(''))
          }, 2000);
          return; 
        }
        
        const EMAIL = auth().currentUser.email
        let friends

        const getUserByEmail = await firestore()
        .collection('users')
        .where('email', '==', EMAIL)
        .get()
      
        getUserByEmail.forEach((doc)=>{
          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            username: newUsername,
          })

          friends = doc.data().friends
          dispatch(setUsername(newUsername))
        })

        // for each friend change my username
        friends.forEach(async (friend)=>{
          let friendEmail = friend.email
          // get document where email == friend email
          const getfriendByEmail = await firestore().collection('users').where('email', '==', friendEmail).get()

          getfriendByEmail.forEach(async (doc)=>{
            // get friends field
            const updatedFriends = doc.data().friends.map((friendData) => {
              if (friendData.email === EMAIL) {
                // if friend email === email update username
                return { email: EMAIL, username: newUsername };
              }
              return friendData;
            });

            // update the document with the modified friends array
            await firestore().collection('users').doc(doc.id).update({
              friends: updatedFriends,
            });
        })});

      setNewUsername('')
      dispatch(setMessage('USERNAME UPDATED'));
      setTimeout(() => {
        dispatch(setShowInputUsername(false))
        dispatch(setMessage(''))
      }, 2000);
  };