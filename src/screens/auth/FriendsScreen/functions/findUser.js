import firestore from '@react-native-firebase/firestore';
import { setEmail, setMessage } from '../../../../store/login/loginSlice';
import { Keyboard } from 'react-native';
import * as FileSystem from 'expo-file-system';
import auth, { firebase } from '@react-native-firebase/auth';
import { setFriendimage } from '../../../../store/settings/settingsSlice';

export const findUser = async (dispatch, friendEmailOrUsername,navigation) => {

  const downloadImage = async (email) => {
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const imgFileUri = imgDir + email;
    let imgUrl 
    try {
      imgUrl = await firebase.storage().ref(email).getDownloadURL()
    } catch (error) {
      imgUrl = await firebase.storage().ref('default.jpeg').getDownloadURL()
    }
    

    // Checks if img directory exists. If not, creates it
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    }

    // Returns URI to our local img file
    // If our img doesn't exist locally, it downloads it
    async function getSingleImg() {
      await ensureDirExists();

      const fileUri = imgFileUri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(imgUrl, fileUri);
      }

      dispatch(setFriendimage(fileUri));
    }
    
    getSingleImg()
  }

  const currentUserEmail = auth().currentUser.email;

  const getUserDetails = async (email) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();

      if (userSnapshot.empty) {
        // If no user is found by email, try searching by username
        const usernameSnapshot = await firestore()
          .collection('users')
          .where('username', '==', email)
          .get();
    
        if (usernameSnapshot.empty) {
          dispatch(setMessage(errorMessage));
          dispatch(setEmail(''));
          Keyboard.dismiss();
          setTimeout(() => {
            dispatch(setMessage(''));
          }, 2000);
          return null;
        }
        return usernameSnapshot.docs[0];
      }

    return userSnapshot.docs[0];
  };

  const currentUserDoc = await getUserDetails(currentUserEmail);

  if (!currentUserDoc) {
    return;
  }


  const currentUserUsername = currentUserDoc.data().username

  const currentUserFriends = currentUserDoc.data().friends;

  const isFriend = currentUserFriends.some(friend => 
    friend.email === friendEmailOrUsername || friend.username === friendEmailOrUsername
  );

  if (isFriend) {
    dispatch(setMessage('YOU ARE FRIENDS ALREADY'));
  } else {
    const friendDoc = await getUserDetails(friendEmailOrUsername, 'USER NOT FOUND');

    if (!friendDoc) {
      return;
    }

    if (friendEmailOrUsername === currentUserEmail || friendEmailOrUsername === currentUserUsername) {
      dispatch(setMessage('YOU CANNOT ADD YOURSELF TO FRIENDS'));
    } else {
      const friendemail = friendDoc.data().email
      const friendusername = friendDoc.data().username

      await downloadImage(friendemail)
      navigation.navigate('UserBoard', {name:friendusername, friendEmail: friendemail, oldnickname:''})
      // await firestore()
      //   .collection('users')
      //   .doc(friendDoc.id)
      //   .update({
      //     friends_requests: firebase.firestore.FieldValue.arrayUnion({
      //       email: currentUserEmail,
      //       username: currentUserUsername,
      //       nickname:''
      //     }),
      //   })

      // dispatch(setMessage('FRIEND REQUEST SENT SUCCESSFULLY'));
    }
  }

  dispatch(setEmail(''));
  Keyboard.dismiss();
  setTimeout(() => {
    dispatch(setMessage(''));
  }, 2000);
};