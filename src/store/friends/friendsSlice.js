import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    friends:[],
    requests: [],
}

export const friendsSlice = createSlice({
    name:'friends',
    initialState,
    reducers:{
        setFriends: (state, action) => {
            const existingFriend = state.friends.find(friend => friend.id === action.payload.id);
            if(!existingFriend){
                return {...state, 
                    friends:[...state.friends, action.payload]}
            }
        },
        setRequests: (state, action) => {
            const existingRequest = state.requests.find(request => request.id === action.payload.id);
            if(!existingRequest){
                return {...state, 
                    requests:[...state.requests, action.payload]}
            }
        },
        removeFriendReducer: (state, action) => {
            return {
                ...state,
                friends: state.friends.filter(friend => friend.email !== action.payload)
            };
        },
        removeRequestReducer: (state, action) => {
            return {
                ...state,
                requests: state.requests.filter(request => request.email !== action.payload)  
            };
        },      
        cleanStoreFriends: () => {
            return {
                friends:[],
                requests:[]
            }
        },
        setNickname: (state,action)=>{
            return{
                ...state,
                friends: state.friends.map((friend) => {
                    if(friend.email === action.payload.friendEmail){
                        return {
                            ...friend,
                            nickname: action.payload.nickname,
                        };
                    }
                    return friend;
                })
            }
        }
    }
})

export const {setFriends,setRequests,removeFriendReducer,removeRequestReducer,cleanStoreFriends,setNickname} = friendsSlice.actions
export default friendsSlice.reducer