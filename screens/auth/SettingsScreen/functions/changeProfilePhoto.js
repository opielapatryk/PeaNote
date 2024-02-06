import auth, { firebase } from '@react-native-firebase/auth';
import { setShowInputUsername } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import * as ImagePicker from 'expo-image-picker'

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });
    const source = {uri: result.assets[0].uri}
    console.log(source)
    setImage(source)
}; 

function listFilesAndDirectories(reference, pageToken) {
    return reference.list({ pageToken }).then(result => {
      // Loop over each item
      result.items.forEach(ref => {
        console.log(ref.fullPath);
      });
  
      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }
  
      return Promise.resolve();
    });
  }

 export const changeProfilePhoto = async () => {
    pickImage()
    
    const EMAIL = auth().currentUser.email
    // // const reference = storage().ref(`${EMAIL}.png`);

    // // path to existing file on filesystem
    // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${EMAIL}.png`;

    // // uploads file
    // const task = reference.putFile(pathToFile);

    // task.on('state_changed', taskSnapshot => {
    //     console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    // });
      
    // task.then(() => {
    //     console.log('Image uploaded to the bucket!');
    // });


      
    const reference = storage().ref('gs://stickify-407810.appspot.com');
    
    const localFilePath = `${utils.FilePath.PICTURES_DIRECTORY}/${EMAIL}.png`


    
    listFilesAndDirectories(reference).then(() => {
        console.log('Finished listing');
    });
  };