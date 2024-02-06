export const fetchAndDispatchFriends = (friends, dispatch, setFriends) => {
    friends.forEach((friend,index) => {
        dispatch(setFriends({id:index + 1,email:friend.email, username:friend.username}))
    });
  };

