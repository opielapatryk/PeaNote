import { initializeApp } from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDWOzBrX65RdbFdwCTwd-0PsrCfMbhxBmA',
  authDomain: 'stickify-407810.firebaseapp.com',
  databaseURL: 'https://stickify.firebaseio.com',
  projectId: 'stickify-407810',
  storageBucket: 'stickify-407810.appspot.com',
  messagingSenderId: 'noreply@stickify-407810.firebaseapp.com',
  appId: 'insert yours: 1:1088925346926:ios:aebdec6593dac4f561ca7f',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

export { db,app,auth };