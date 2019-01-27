import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import { throws } from 'assert';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC746SSZeH4v-4dlPyy_zkMS8WZY7NJ9JA",
  authDomain: "clairevalant-moodboard.firebaseapp.com",
  databaseURL: "https://clairevalant-moodboard.firebaseio.com",
  projectId: "clairevalant-moodboard",
  storageBucket: "clairevalant-moodboard.appspot.com",
  messagingSenderId: "890108915166"
};
firebase.initializeApp(config);

// specify we want to use GitHub to provide authentication
const provider = new firebase.auth.GithubAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      post: "",
      posts: {}
    }
  }

  componentDidMount() {
    // if the user has recently signed in, sign them in again
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        }, () => {
          // reference Firebase database and add user's name
          this.dbRef = firebase.database().ref(`/${this.state.user.uid}`);
          // add an event listener to get user's data in Firebase
          this.dbRef.on("value", (snapshot) => {
            // check to see if snapshot.val is null, and if it is, set a new object. if it's got data, set the state to snapshot.val
            this.setState({
              // if snapshot.val is falsey, leave posts as empty obj
              posts: snapshot.val() || {}
            });
          });
        });
      };
    });
  }

  logIn = () => {
    auth.signInWithPopup(provider).then((result => {
      this.setState({
        user: result.user
      });
    }));
  };

  logOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };


  render() {
    return (
      <div className="App">
        <header>
          <h1>Moodboard</h1>
        </header>
      </div>
    );
  }
}

export default App;
