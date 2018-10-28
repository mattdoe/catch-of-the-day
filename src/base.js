import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCRp39vV078eB1JQnk4XEYlbvEZH645upE",
    authDomain: "catch-of-the-day-matt-doe.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-matt-doe.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;