import auth, { firebase } from '@react-native-firebase/auth';
import { setShowInputUsername } from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

 export const changeProfilePhoto = async () => {
    const EMAIL = auth().currentUser.email
    const reference = storage().ref(`${EMAIL}.png`);

    // path to existing file on filesystem
    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${EMAIL}.png`;

    // uploads file
    const task = reference.putFile(pathToFile);

    task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });
      
    task.then(() => {
        console.log('Image uploaded to the bucket!');
    });
  };