import { Text,ScrollView, Button, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector} from 'react-redux';
import {removeNote} from '../../store/boardSlice';
import {userLink,usersLink} from '../../components/Constants'

export const FriendsScreen = ({ navigation }) => {
    const { notes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [friends,setFriends] = useState([])
    const [newFriendEmail, setNewFriendEmail] = useState()
    const [buttonTitle,setButtonTitle] = useState('')
    const [newFriendID, setNewFriendID] = useState(null)
    const [message,setMessage] = useState('')
    const [doesEmailExist, setdoesEmailExist] = useState(false)
    const [list,setList] = useState([])
    const [firstRender, setFirstRender] = useState(true)

    useFocusEffect(
      React.useCallback(() => {
        const loadUser = async()=>{
          try{
            currentUserId = await SecureStore.getItemAsync('userId');
  
            const result = await axios.get(userLink(currentUserId))
  
            const friendsRequests = result.data.friends.map(url =>
              axios.get(url)
              .then(response => response.data)
            );
          
            Promise.all(friendsRequests)
              .then(friendsData => {
                  setFriends(friendsData);
              })
              .catch(error => {
                console.error('Error fetching friends:', error);
            });
            
            return result
          }catch(e){
            console.log(e.message)
          }
        }
        loadUser()

      }, [])
    );

    useEffect(()=>{
      const loadUser = async()=>{
        try{
          currentUserId = await SecureStore.getItemAsync('userId');

          const result = await axios.get(userLink(currentUserId))

          const friendsRequests = result.data.friends.map(url =>
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
          
          return result
        }catch(e){
          console.log(e.message)
        }
      }
      loadUser()
    },[friends])

    useEffect(() => {
      const getUserId = async()=>{
        currentUserId = await SecureStore.getItemAsync('userId');

        if(doesEmailExist === false){
          if(!firstRender){
            setMessage('This user does not exist!..')
            setButtonTitle('')
          }
          setFirstRender(false)
        }else{
          if(newFriendID == currentUserId){
            setMessage('You cannot add to friends yourself!..')
            setButtonTitle('')
          }else{
            if(list.includes(userLink(newFriendID))){
              setMessage('You are friends already!..')
              setButtonTitle('')
            }else{
              setMessage(newFriendEmail)
              setButtonTitle('ADD')
            }
          }
        }
      }
      getUserId()
    }, [newFriendID]);

    const searchNewFriend = async () => {
      try {
          let currentUserId = await SecureStore.getItemAsync('userId');

          const currentUserResult = await axios.get(userLink(currentUserId))

          setList(JSON.stringify(currentUserResult.data.friends))

          const result = await axios.get(usersLink())

          const data = result.data

          data.every(friend => {
            if (friend.email === newFriendEmail) {
              setdoesEmailExist(true);
              setNewFriendID(friend.id);
              return false; // Stop iteration if a match is found
            } else {
              setdoesEmailExist(false);
              setNewFriendID(null);
              return true; // Continue iteration if no match is found
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    const addNewFriend = async () => {
      try {
        const friendURL = userLink(newFriendID)
        const userURL = userLink(currentUserId)
        const result = await axios.get(userURL)

        let list = result.data.friends

        if (!list.includes(friendURL)) {
          list.push(friendURL);
        }
        
        await axios.patch(userURL,{
            'friends':list
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


    useFocusEffect(
      React.useCallback(() => {
        return () => {
          const removeNotesFromReduxStore = async () => {
            await Promise.all(notes.map((sticker) => dispatch(removeNote(sticker.id))));
          };
          removeNotesFromReduxStore()
        };
      }, [notes])
    );

    return (
      <ScrollView>
        <TextInput placeholder='Insert friend email' onChangeText={(newFriendEmail) => setNewFriendEmail(newFriendEmail)} value={newFriendEmail}/>
        <Button title='SEARCH NEW FRIEND' onPress={()=>searchNewFriend()}/>
        <Text>{message}</Text>
        <Button title={buttonTitle} onPress={()=>addNewFriend()}/>
        <Text>Friends:</Text>
        <ScrollView>
          {friends.map((friend)=>(
            <Button key={friend.id} title={friend.email} onPress={() => navigation.navigate('FriendsBoard', { friendId: friend.id, friendName: friend.first_name })}/>
          ))}
        </ScrollView>
      </ScrollView>
    );
}

export default FriendsScreen