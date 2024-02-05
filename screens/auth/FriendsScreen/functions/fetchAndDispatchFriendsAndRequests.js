export const fetchAndDispatchFriends = (friends, dispatch, setFriends) => {
    friends.forEach((friend) => {
        dispatch(setFriends(friend))
    });
  };
