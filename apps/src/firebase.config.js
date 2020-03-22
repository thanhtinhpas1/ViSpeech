import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDY_qDsm7hfJm0sFPe2vLuT-eu21oggnOQ',
  authDomain: 'project-tutor-24905.firebaseapp.com',
  databaseURL: 'https://project-tutor-24905.firebaseio.com',
  projectId: 'project-tutor-24905',
  storageBucket: 'project-tutor-24905.appspot.com',
  messagingSenderId: '852571017117',
  appId: '1:852571017117:web:44967e95ce545983322974',
  measurementId: 'G-E1YMLSX81E',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
export default storage
