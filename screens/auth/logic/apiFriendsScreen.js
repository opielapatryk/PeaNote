import axios from 'axios'
import {userLink,usersLink} from '../../../components/Constants'
import * as SecureStore from 'expo-secure-store';
import {removeNote} from '../../../store/notes/boardSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const searchNewFriend = async (newFriendEmail,setNewFriendID,setdoesEmailExist,setList) => {
    try {
        // CHECK IS NEWFRIENDEMAIL IS IN YOU FRIENDS LIST
        // IF NOT =>
        // APPEND YOUR EMAIL TO HIS FRIEND REQUESTS LIST

        // const userDocument = firestore().collection('users').doc('ABC');
        // console.log(auth().currentUser.email)

  //       firestore()
  // .collection('users')
  // .where('email', '==', newFriendEmail)


        
  //       // let currentUserId = await SecureStore.getItemAsync('userId');
  //       let currentUserEmail = auth().currentUser.email
  //       // const currentUserResult = await axios.get(userLink(currentUserId))
  //       // setList(JSON.stringify(currentUserResult.data.friends))
  //       firestore()
  //       .collection('users')
  //       .where('email', '==', currentUserEmail)
  //       .get()
  //       .then(querySnapshot => {
  //         if (!querySnapshot.empty) {
  //           // User found
  //           querySnapshot.forEach(doc => {
  //             const user = doc.data();
  //             console.log('User found:', user.friends);
  //           });
  //         } else {
  //           // User not found
  //           console.log('User not found');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error getting user:', error);
  //       });
        // const result = await axios.get(usersLink())

        // const data = result.data

        // data.every(friend => {
        //   if (friend.email === newFriendEmail) {
        //     setdoesEmailExist(true);
        //     setNewFriendID(friend.id);
        //     return false; 
        //   } else {
        //     setdoesEmailExist(false);
        //     setNewFriendID(null);
        //     return true; 
        //   }
        // });
    } catch (error) {
      console.log(error.message);
    }
  }

  export const addNewFriend = async (setFriends,newFriendID,friends) => {
    try {
      const friendURL = userLink(newFriendID)
      const userURL = userLink(currentUserId)
      const result = await axios.get(userURL)

      let list = result.data.friends_requests

      if (!list.includes(userURL)) {
        list.push(userURL);
      }
      
      await axios.patch(friendURL,{
          'friends_requests':list
      })

      const friendsRequests = list.map(url =>
        axios.get(url)
        .then(response => response.data)
      );
    
      Promise.all(friendsRequests)
        .then(friendsData => {
          if (JSON.stringify(friends) !== JSON.stringify(friendsData)) {
            setFriends(friendsData);
          }
        })
        .catch(error => {
          console.error('Error fetching friends:', error);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  export const loadUser = async(setFriends)=>{
    try{
      currentUserId = await SecureStore.getItemAsync('userId');

      const result = await axios.get(userLink(currentUserId))

      const friendsRequests = result.data.friends.map(url =>
        axios.get(url)
        .then(response => response.data)
      );
    
      Promise.all(friendsRequests)
        .then(friendsData => {
            setFriends(friendsData);
        })
        .catch(error => {
          console.error('Error fetching friends:', error);
      });
      
      return result
    }catch(e){
      console.log(e.message)
    }
  }

 export const getUserId = async(doesEmailExist,firstRender,setMessage,setButtonTitle,setFirstRender,newFriendID,list,newFriendEmail)=>{
    currentUserId = await SecureStore.getItemAsync('userId');

    if(doesEmailExist === false){
      if(!firstRender){
        setMessage('This user does not exist!..')
        setButtonTitle('')
      }
      setFirstRender(false)
    }else{
      if(newFriendID == currentUserId){
        setMessage('You cannot add to friends yourself!..')
        setButtonTitle('')
      }else{
        if(list.includes(userLink(newFriendID))){
          setMessage('You are friends already!..')
          setButtonTitle('')
        }else{
          setMessage(newFriendEmail)
          setButtonTitle('ADD')
        }
      }
    }
  }

export const removeNotesFromReduxStore = async (notes,dispatch) => {
  await Promise.all(notes.map((sticker) => dispatch(removeNote(sticker.id))));
};