import axios from 'axios'
import {userLink} from '../../../components/Constants'
import {removeNote} from '../../../store/notes/boardSlice';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const sendFriendRequest = async (newFriendEmail,setNewFriendID,setdoesEmailExist,setList,setMessage,setNewFriendEmail,setButtonTitle,setFriendReqMessage) => {
    try {
        const MY_EMAIL = auth().currentUser.email
        firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              console.log(doc.data().friends);
              if(doc.data().friends.includes(newFriendEmail)){
                console.log('includes friend');
              }else{
                console.log('does not include friend');
                firestore()
                .collection('users')
                .where('email', '==', newFriendEmail)
                .get()
                .then(querySnapshot => {
                  if(!querySnapshot.empty){
                    querySnapshot.forEach(doc=>{
                      if(doc.data().friends_requests.includes(MY_EMAIL)){
                        console.log('request already send')
                      }else{
                        firestore()
                        .collection('users')
                        .doc(doc.id)
                        .update({
                          friends_requests: firebase.firestore.FieldValue.arrayUnion(MY_EMAIL),
                        })
                        .then(() => {
                          setNewFriendEmail('')
                          setButtonTitle('')
                          setFriendReqMessage(true)
                        });
                      }
                    })
                  }else{
                    console.log('error');
                  }
                })
              }
            });
          }
        })
        .catch(error => {
          console.error('Error getting user:', error);
        });
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

  export const loadUser = async (setFriends)=>{
    try{
      const MY_EMAIL = auth().currentUser.email
      firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
        .get()
        .then(querySnapshot =>{
          if (!querySnapshot.empty) {
            const friends = querySnapshot.docs[0].data().friends;
            setFriends(friends);
          }
        })
    }catch(e){
      console.log(e.message)
    }
  }

  export const getUserEmail = async (
    setdoesEmailExist,
    doesEmailExist,
    firstRender,
    setMessage,
    setButtonTitle,
    setFirstRender,
    list,
    newFriendEmail,
    setFriendReqMessage
  ) => {
    try {
      if(newFriendEmail.length > 0){
        setFriendReqMessage(false)
      }
      setdoesEmailExist(false);
      const MY_EMAIL = auth().currentUser.email;
  
      const myQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', MY_EMAIL)
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
            if (newFriendEmail === MY_EMAIL) {
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
      console.error('Error checking email existence:', error);
    }
  };

export const removeNotesFromReduxStore = async (notes,dispatch) => {
  await Promise.all(notes.map((sticker) => dispatch(removeNote(sticker.id))));
};