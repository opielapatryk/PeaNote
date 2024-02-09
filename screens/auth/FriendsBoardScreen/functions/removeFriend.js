import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { removeFriendReducer,cleanStoreFriends } from '../../../../store/friends/friendsSlice';

export const removeFriend = async (navigation,friendEmail,username,nickname,dispatch) => {
  const EMAIL = auth().currentUser.email
  
  let USERNAME
  let FRIEND_NICKNAME
  let MY_NICKNAME_IN_MY_FRIEND_TABLE

  //remove friend from current user table
  const getUserByEmail = await firestore()
      .collection('users')
      .where('email', '==', EMAIL)
      .get()

  
  getUserByEmail.forEach(doc => {
    let friends = doc.data().friends

    friends.forEach((friend)=>{
      if(friend.email === friendEmail){
        FRIEND_NICKNAME = friend['nickname']
      }
    });


    USERNAME = doc.data().username


    firestore()
    .collection('users')
    .doc(doc.id)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove({email:friendEmail,username:username,nickname:FRIEND_NICKNAME}),
    })
  })


  //remove current user from friend table
  const getFriendByEmail = await firestore()
    .collection('users')
    .where('email', '==', friendEmail)
    .get()


    getFriendByEmail.forEach(doc => {
        let friends = doc.data().friends

        friends.forEach((friend)=>{
          if(friend.email === EMAIL){
            MY_NICKNAME_IN_MY_FRIEND_TABLE = friend['nickname']
          }
        });

          firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove({email:EMAIL,username:USERNAME,nickname:MY_NICKNAME_IN_MY_FRIEND_TABLE}),
          })
          .then(()=>{
            dispatch(removeFriendReducer(friendEmail))
            dispatch(cleanStoreFriends())
            navigation.navigate('FriendsScreen');
          })
        })
  };