import auth from '@react-native-firebase/auth';

export const MY_EMAIL = auth().currentUser.email
export const KEY_EXTRACTOR = (friend, index) => friend.id || index.toString();
