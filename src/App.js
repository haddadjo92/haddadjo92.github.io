import React, { Component } from 'react'
import firebase from './config/Fire'
import './App.css';
import Membership from './components/membershipLayout.js'
import StudentList from './components/studentList';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


/*

MQ NOTE:
    This application is responsive on all screen devices and ending with viewport 320px.
    ** BEFORE YOU START TESTING : Make sure to Refresh Page every time you want to resize the screen
       to ensure the correct rendering of stylesheets.


    -------- Login Credentials -----------
    Username : admin@mail.com
    Password : 123456
*/




class App extends Component {




  constructor(props) {
    super(props)

    this.state = {
      user: null,
    }
    this.authListener = this.authListener.bind(this);
    this.logOut = this.logOut.bind(this);


  }

  componentDidMount() {
     this.TestFireConnection()
     this.authListener()
  }




  logOut() {
    firebase.auth().signOut()
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem('user');
      }
    });
  }

  TestFireConnection = () => {
    var presenceRef = firebase.database().ref("disconnectmessage");
    // Write a string when this client loses connection
    presenceRef.onDisconnect().set("Aw Snap! :( You Are Now disconnected");

    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
      

      if (snap.val() === true) console.log("%c You Are connected! :)","color:#fff;background-color:green;font-size:25px;border-radius:12px;padding:5px");
      else console.log("%c You Are disconnected! :(","color:#fff;background-color:red;font-size:25px;border-radius:12px;padding:5px");    
    });
  }


  render() {
      return (
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
              <img
                alt="react-bootstrap-logo"
                src={require('./react-bootstrap-logo.svg')}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {' eSchool Task'}
            </Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            {this.state.user !== null ? (<Form inline> <Button variant="danger" onClick={this.logOut}>Logout</Button></Form>) : null}
          </Navbar>


          {this.state.user === null ? (<Membership />) : (<StudentList />)}
        </div>
      )
  }




}

export default App












