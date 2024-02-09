import { Text,View, Pressable, TextInput,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import {sendFriendRequest} from '../functions/sendFriendRequest'
import {styles} from '../../../../assets/styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import {setEmail,setMessage} from '../../../../store/login/loginSlice'
import { useFocusEffect } from '@react-navigation/native';
import { loadUser } from '../functions/loadUser';
import { cleanStoreFriends } from '../../../../store/friends/friendsSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import auth, { firebase } from '@react-native-firebase/auth';
import { setMyimage } from '../../../../store/settings/settingsSlice';

export const FriendsScreen = ({ navigation }) => {
  const {friends} = useSelector((state) => state.friends);
  const {message,email} = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      loadUser(dispatch)
      return ()=>{
        dispatch(setMessage(''))
        dispatch(setEmail(''))
      }
    }, [])
  );

  useEffect(()=>{
    loadUser(dispatch)
  },[])

  const downloadImage = async (email) => {
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const imgFileUri = imgDir + email;
    let imgUrl 
    try {
      imgUrl = await firebase.storage().ref(email).getDownloadURL()
    } catch (error) {
      imgUrl = await firebase.storage().ref('default.jpeg').getDownloadURL()
    }
    

    // Checks if img directory exists. If not, creates it
    async function ensureDirExists() {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    }

    // Returns URI to our local img file
    // If our img doesn't exist locally, it downloads it
    async function getSingleImg() {
      await ensureDirExists();

      const fileUri = imgFileUri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(imgUrl, fileUri);
      }

      dispatch(setMyimage(fileUri));
    }
    
    getSingleImg()
  }

  const RenderFriendsMemoized = React.memo(({ item }) => {
    return (
      <Pressable onPress={async () =>{
        await downloadImage(item.email)
        navigation.navigate('FriendsBoard', {name:item.username, friendEmail: item.email, oldnickname:item.nickname})
      }} style={styles.friendsList}><Text style={styles.firendListText}>{item.nickname?item.nickname:item.username}</Text></Pressable>
    );
  });

  const renderFriends = ({ item }) => <RenderFriendsMemoized item={item} />;

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.board,{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'white',
    }]}>
      <Pressable style={styles.friendsHeaderRequest} onPress={()=>navigation.navigate('Requests')}><Text style={styles.removeFriendText}>REQUESTS</Text></Pressable>

      <TextInput style={styles.friendsTextInput} placeholder={message?message:'SEARCH BY EMAIL OR USERNAME'} onChangeText={text => dispatch(setEmail(text))} value={email} autoCorrect={false}/>

      <Pressable style={styles.friendsHeaderRequest} onPress={()=>sendFriendRequest(dispatch,email,navigation)}><Text style={styles.removeFriendText}>SEARCH</Text></Pressable>

      <FlatList data={friends} renderItem={({item})=>renderFriends({item})} keyExtractor={(friend) => friend.id}/>
    </View>
  );
}

export default FriendsScreen