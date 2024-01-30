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
            return {...state, friends:[...state.friends, action.payload]}
        },
        setRequests: (state, action) => {
            return {...state, requests:[...state.requests, action.payload]}
        },
        removeFriend: (state, action) => {
            console.log('friends removed');
            return {
                ...state,
                friends: state.friends.filter(friend => friend !== action.payload)
            };
        },
        removeRequest: (state, action) => {
            console.log('req removed');
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

export const {setFriends,setRequests,removeFriend,removeRequest,cleanStoreFriends} = friendsSlice.actions
export default friendsSlice.reducer