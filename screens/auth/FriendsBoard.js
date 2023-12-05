import { Text,TextInput,View,Button } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import {userLink,stickersLink,stickerLink} from '../../components/Constants'

export default FriendsBoard = ({ route,navigation }) => {
    const { friendId, friendName } = route.params;
    const [content,setContent] = useState('');
    const [message, setMessage] = useState('');

    const createNote = async () => {
        try {
            currentUserId = await SecureStore.getItemAsync('userId');
            const userURL = userLink(currentUserId)
            let result;

            if(content != ''){
                result = await axios.post(stickersLink,{
                    'content':content,
                    'creator':userURL
                })
            }else{
                setMessage('Note cannot be empty..')
            }
            

            const stickerID = result.data.id

            const friendURL = userLink(friendId)

            const resultStickers = await axios.get(friendURL)

            if(resultStickers.data.askBeforeStick){
                let list = resultStickers.data.pending

                list.push(stickerLink(stickerID));

                await axios.patch(userLink(friendId),{
                'pending': list
                })

            }else{
                let list = resultStickers.data.stickersOnBoard
    
                list.push(stickerLink(stickerID));
    
                await axios.patch(userLink(friendId),{
                    'stickersOnBoard': list
                })
            }

            if(result.status === 201){
                setMessage('Note created successfully!')
                setContent('')
            }   
        } catch (error) {
            console.log(error.message);
            setMessage('Cannot create note, something went wrong..')
        }
    }

    const removeFriend = async () => {
        try {
            currentUserId = await SecureStore.getItemAsync('userId');
            const currentUserResult = await axios.get(userLink(currentUserId))

            let list = currentUserResult.data.friends

            list = list.filter((element) => element !== userLink(friendId))

            const resp = await axios.patch(userLink(currentUserId),{
                'friends':list
            })

            if(resp.status === 200) {
                navigation.navigate('Friends')
            }
            return resp
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
      <View>
        <Button title='remove friend' onPress={()=>removeFriend()}/>
        <Text>Welcome on {friendName?friendName:'your friend'} board</Text>
        <TextInput placeholder='note.....' value={content} onChangeText={(content)=>setContent(content)}/>
        <Button title='create note' onPress={()=>createNote()}/>
        <Text>{message}</Text>
      </View>
    );
}