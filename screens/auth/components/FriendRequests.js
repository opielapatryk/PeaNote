import { Text,ScrollView, Button, TextInput,View, Pressable,  FlatList, Animated,Easing } from 'react-native'
import {userLink,usersLink} from '../../../components/Constants'
import React, {useState,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { styles } from '../../../assets/styles/styles';

const FriendRequests = ({ navigation }) => {
    const [friends,setFriends] = useState([])
    const animatedValues = friends.map(() => new Animated.Value(200));

    const loadUser = async ()=>{
        try{
          currentUserId = await SecureStore.getItemAsync('userId');
    
          const result = await axios.get(userLink(currentUserId))
    
          const friendsRequests = result.data.friends_requests.map(url =>
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

    useFocusEffect(
        React.useCallback(() => {
          loadUser()
        }, [])
      );

      const approveFriend = async (friendID,index) =>{

        const animate = (index) => {
            Animated.timing(animatedValues[index], {
              toValue: 0,
              duration: 1000,
              easing: Easing.bounce,
              useNativeDriver: false,
            }).start();
          };

        const currentUserId = await SecureStore.getItemAsync('userId');
    try {
        const resp = await axios.get(userLink(currentUserId))

        let friends = resp.data.friends;
        let requests = resp.data.friends_requests;

        friends.push(userLink(friendID))

        let newRequestsArr = await requests.filter(user => user != userLink(friendID))

        const patchFriends = await axios.patch(userLink(currentUserId),{
          'friends': friends
        })

        const patchReqFriends = await axios.patch(userLink(currentUserId),{
          'friends_requests': newRequestsArr
        })

        if(patchFriends.status === 200 && patchReqFriends.status === 200){
            console.log('friend accepted');
            // loadUser()
            animate(index)
        }
    } catch (error) {
        console.log(error.message);
    }
      }

      const removeReq = async (friendID,index) =>{

        const animate = (index) => {
            Animated.timing(animatedValues[index], {
              toValue: 0,
              duration: 1000,
              easing: Easing.bounce,
              useNativeDriver: false,
            }).start();
          };

        const currentUserId = await SecureStore.getItemAsync('userId');
    try {
        const resp = await axios.get(userLink(currentUserId))

        let requests = resp.data.friends_requests;

        let newRequestsArr = await requests.filter(user => user != userLink(friendID))

        const patchReqFriends = await axios.patch(userLink(currentUserId),{
          'friends_requests': newRequestsArr
        })

        if(patchReqFriends.status === 200){
            console.log('friend req removed');
            // loadUser()
            animate(index)
        }
    } catch (error) {
        console.log(error.message);
    }
      }

      const renderFriends = ({item,index}) =>{
        return (
            <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
                <Button title={String(item.email)} onPress={()=>approveFriend(item.id,index)}/>
                <Pressable onPress={()=>removeReq(item.id,index)}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                </Pressable>
            </Animated.View>
        )
      }
  return (
    <FlatList data={friends} renderItem={renderFriends} keyExtractor={(friend) => friend.id}/>
  );
}

export default FriendRequests