import firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyBVxVIY_VHaPI0UUIATqJzpcsdffErSi98",
    authDomain: "eschooldemo-2b247.firebaseapp.com",
    databaseURL: "https://eschooldemo-2b247.firebaseio.com",
    projectId: "eschooldemo-2b247",
    storageBucket: "eschooldemo-2b247.appspot.com",
    messagingSenderId: "935713481444",
    appId: "1:935713481444:web:c32a24435f464b08"
  };


const fire = firebase.initializeApp(firebaseConfig)
export default fire