export const fetchAndDispatchFriendsAndRequests = (friends,requests, dispatch, setFriends,setRequests) => {
    if(friends){
        friends.forEach((friend) => {
            dispatch(setFriends(friend))
        });
    }
    if(requests){
        requests.forEach((request) => {
            dispatch(setRequests(request))
        });
    }
  };
