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
            const existingFriend = state.friends.find(friend => friend === action.payload);
            if(!existingFriend){
                return {...state, 
                    friends:[...state.friends, action.payload]}
            }
        },
        setRequests: (state, action) => {
            const existingRequest = state.requests.find(request => request === action.payload);
            if(!existingRequest){
                return {...state, 
                    requests:[...state.requests, action.payload]}
            }
        },
        removeFriendReducer: (state, action) => {
            return {
                ...state,
                friends: state.friends.filter(friend => friend !== action.payload)
            };
        },
        removeRequestReducer: (state, action) => {
            return {
                ...state,
                requests: state.requests.filter(request => request !== action.payload)
                
            };
        },      
        cleanStoreFriends: () => {
            return {
                friends:[],
                requests:[]
            }
        }  
    }
})

export const {setFriends,setRequests,removeFriendReducer,removeRequestReducer,cleanStoreFriends} = friendsSlice.actions
export default friendsSlice.reducer