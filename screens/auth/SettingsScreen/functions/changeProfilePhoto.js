import auth, { firebase } from '@react-native-firebase/auth';
import { setShowInputUsername } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import * as ImagePicker from 'expo-image-picker'

 export const changeProfilePhoto = async (setImage,image) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });

    const source = {uri: result.assets[0].uri}
 
    setImage(source)

    const response = await fetch(source.uri)
    const blob = response.blob()
    const filename = source.uri.substring(source.uri.lastIndexOf('/')+1)

    let ref = firebase.storage().ref('gs://stickify-407810.appspot.com').child(filename).put(blob)

    await ref;

    setImage(null);
  };