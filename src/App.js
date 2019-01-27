// Claire Valant's Tread Tech Challenge
// January 27, 2019

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

// specify we want to use Google to provide authentication
const provider = new firebase.auth.GoogleAuthProvider;
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

// turn off event listener
  componentWillUnmount() {
    if (this.dbref) {
      this.dbRef.off();
    }
  }

  logIn = () => {
    auth.signInWithPopup(provider).then((result => {
      console.log(result);
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
          <div className="wrapper">
            {this.state.user ? <button onClick={this.logOut}>Logout</button> : <button onClick={this.logIn}>Login</button>}
            {/* Use ternary operators to display the appropriate header info */}
            <h1>Moodboard</h1>
            {this.state.user ? <div className="welcomeMsg"><p>Welcome back to Moodboard, {this.state.user.displayName}</p><img className="profilePic" src={this.state.user.photoURL} alt="your Google photo" /></div>
            : <p>Welcome to Moodboard. Post your favourite images to create a visual diary of how you're feeling. Get started by logging in with Google.</p>}
          </div>
        </header>

        {this.state.user ? 
          <main>
            
          </main>
          : <main>

          </main>
        }
      </div>
    );
  }
}

export default App;
