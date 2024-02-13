import reducer, { cleanStoreFriends, removeFriendReducer, removeRequestReducer, setFriends, setRequests } from '../../src/store/friends/friendsSlice';

test('Dont add friend if he is already on list.', () => {
    const newState = reducer({ friends: [{id:1,email:'bar',username:'baz',nickname:undefined}]}, setFriends({id:1,email:'bar',username:'baz',nickname:undefined}));

    expect(newState).toEqual({ friends: [{id:1,email:'bar',username:'baz',nickname:undefined}]});
});

test('Add friend if he isnt already on list.', () => {
    const newState = reducer({ friends: [{id:1,email:'bar',username:'baz',nickname:undefined}]}, setFriends({id:2,email:'far',username:'faz',nickname:undefined}));

    expect(newState).toEqual({ friends: [{id:1,email:'bar',username:'baz',nickname:undefined},{id:2,email:'far',username:'faz',nickname:undefined}]});
});

test('Dont add request on list if it is already on list.', () => {
    const newState = reducer({ requests: [{id:1,email:'bar',username:'baz',nickname:undefined}]}, setRequests({id:1,email:'bar',username:'baz',nickname:undefined}));

    expect(newState).toEqual({ requests: [{id:1,email:'bar',username:'baz',nickname:undefined}]});
});

test('Add request if it isnt already on list.', () => {
    const newState = reducer({ requests: [{id:1,email:'bar',username:'baz',nickname:undefined}]}, setRequests({id:2,email:'far',username:'faz',nickname:undefined}));

    expect(newState).toEqual({ requests: [{id:1,email:'bar',username:'baz',nickname:undefined},{id:2,email:'far',username:'faz',nickname:undefined}]});
});

test('Remove friend by email.', () => {
    const newState = reducer({ friends: [{id:1,email:'bar',username:'baz',nickname:undefined}]}, removeFriendReducer('bar'));

    expect(newState).toEqual({ friends: []});
});

test('Remove request by email.', () => {
    const newState = reducer({ requests: [{id:1,email:'bar',username:'baz',nickname:undefined}]}, removeRequestReducer('bar'));

    expect(newState).toEqual({ requests: []});
});

test('Clean store from req and friends.', () => {
    const newState = reducer({ requests: [{id:1,email:'bar',username:'baz',nickname:undefined}], friends: [{id:2,email:'far',username:'far',nickname:undefined}]}, cleanStoreFriends());

    expect(newState).toEqual({ requests: [],friends:[]});
});