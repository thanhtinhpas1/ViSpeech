import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCJJ8QfxCBzdvczuog-1WuJ-SZVpAx1bgU',
  authDomain: 'vispeech-278717.firebaseapp.com',
  databaseURL: 'https://vispeech-278717.firebaseio.com',
  projectId: 'vispeech-278717',
  storageBucket: 'vispeech-278717.appspot.com',
  messagingSenderId: '653333133801',
  appId: '1:653333133801:web:cc29fd44dd530c35033378',
  measurementId: 'G-M7J3T315KJ',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
export default storage
