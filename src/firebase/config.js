// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAR-gU6dXBVAtQio-Ak6xfScHXlHFZiOUY',
    authDomain: 'darts-score-holder-f32b0.firebaseapp.com',
    databaseURL: 'https://darts-score-holder-f32b0-default-rtdb.firebaseio.com',
    projectId: 'darts-score-holder-f32b0',
    storageBucket: 'darts-score-holder-f32b0.appspot.com',
    messagingSenderId: '591000594259',
    appId: '1:591000594259:web:bb50ce8e946474282463a6',
    measurementId: 'G-47598YM9NG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
