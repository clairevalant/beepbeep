import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

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
      user: null
    }
  }


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
