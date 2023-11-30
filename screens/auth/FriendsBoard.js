import { Text,TextInput,View,Button } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
// import NoteCreateInput from '../../components/NoteCreateInput';
// import { Note } from '../../components/Note';
// import { useDispatch, useSelector} from 'react-redux';
// import { styles } from '../../assets/styles';
// import {changeInfo} from '../../store/boardSlice';

export default FriendsBoard = ({ route,navigation }) => {
    const { friendId, friendName } = route.params;
    const [content,setContent] = useState('');

    const createNote = async () => {
        try {
            currentUserId = await SecureStore.getItemAsync('userId');
            const userURL = `http://localhost:8000/api/users/${currentUserId}/`

            const result = await axios.post(`http://localhost:8000/api/stickers/`,{
                'content':content,
                'creator':userURL
            })

            const stickerID = result.data.id

            const friendURL = `http://localhost:8000/api/users/${friendId}/`

            const resultStickers = await axios.get(friendURL)
    
            let list = resultStickers.data.stickersOnBoard
    
            console.log(list);
    
            list.push(`http://localhost:8000/api/stickers/${stickerID}/`);
    
            console.log(list);

            console.log('friend ID: ' + friendId);
            await axios.patch(`http://localhost:8000/api/users/${friendId}/`,{
                'stickersOnBoard': list
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const removeFriend = async () => {
        try {
            currentUserId = await SecureStore.getItemAsync('userId');
            const currentUserResult = await axios.get(`http://localhost:8000/api/users/${currentUserId}`)

            let list = currentUserResult.data.friends

            list = list.filter((element) => element !== `http://localhost:8000/api/users/${friendId}/`)

            console.log(list);

            const resp = await axios.patch(`http://localhost:8000/api/users/${currentUserId}/`,{
                'friends':list
            })

            console.log(resp.status);

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
      </View>
    );
}