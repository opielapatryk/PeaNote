import * as FileSystem from 'expo-file-system';
import {firebase} from '@react-native-firebase/storage'

export async function getSingleImg(email) {
    const imgDir = FileSystem.cacheDirectory + 'images/';
    const fileUri = imgDir + email;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    let imgUrl

    try {
      imgUrl = await firebase.storage().ref(email).getDownloadURL()
    } catch (error) {
      imgUrl = await firebase.storage().ref('default.jpeg').getDownloadURL()
    }

    if (!fileInfo.exists) {
      await FileSystem.downloadAsync(imgUrl, fileUri);
    }

    return fileUri
  }