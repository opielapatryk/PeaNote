import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { removeRequestReducer, setFriends } from '../../../../store/friends/friendsSlice';

export const approveFriend = async (friendEmail, friendUsername, dispatch) => {
  let friendsAmmount;
  const EMAIL = auth().currentUser.email;

  let USERNAME;

  try {
    const usersRef = firebase.app().database('https://stickify-407810-default-rtdb.europe-west1.firebasedatabase.app/').ref('users');

    // Get user by email
    const userSnapshot = await usersRef.orderByChild('email').equalTo(EMAIL).once('value');
    const userData = userSnapshot.val();

    if (userData) {
      const userId = Object.keys(userData)[0];
      // take my username
      USERNAME = userData[userId].username;

      // my friends length
      friendsAmmount = userData[userId].friends?.length;
      const friends = userData[userId].friends

      const friendExists = friends?.some(friend => (friend.email === friendEmail || friend.username === friendUsername) && (!friend.request && !friend.pending));

      // add approved friend to my friends list and remove approved friend from my friend requests list, by turning request attribute to false
      if (!friendExists) {
        const updatedFriendsList = friends?.map((friend)=>{
          if(friend.email === friendEmail || friend.username === friendUsername){
            return { ...friend, request: false };
          }
          return friend
        })

        await usersRef.child(`${userId}/friends`).set(updatedFriendsList);
      }
    }

    // Get friend by email
    const friendSnapshot = await usersRef.orderByChild('email').equalTo(friendEmail).once('value');
    const friendData = friendSnapshot.val();

    if (friendData) {
      const friendId = Object.keys(friendData)[0];
      const friends = friendData[friendId].friends

      const currentUserExists = friends?.some(friend => (friend.email === EMAIL || friend.username === USERNAME) && (!friend.request && !friend.pending));

      // add current user to my friend friends list and remove from my friend pending list, by turning pending attribute to false

      if (!currentUserExists) {
        const updatedFriendsList = await friends?.map((friend)=>{
          if(friend.email === EMAIL || friend.username === USERNAME){
            return {...friend, pending:false};
          }
          return friend
        })

        await usersRef.child(`${friendId}/friends`).set(updatedFriendsList);

        dispatch(removeRequestReducer(friendEmail));

        dispatch(
          setFriends({
            id: friendsAmmount + 1,
            email: friendEmail,
            username: friendUsername,
            nickname: undefined,
          })
        );
      }
    }
  } catch (error) {
    console.error('Error approving friend request:', error);
  }
};
