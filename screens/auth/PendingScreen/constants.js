import auth from '@react-native-firebase/auth';

export const MY_EMAIL = auth().currentUser.email
export const KEY_EXTRACTOR = (note) => note.id
