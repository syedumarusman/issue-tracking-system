import React, { Component } from "react";
import { Redirect } from 'react-router';

export default class LogOut extends Component {
  constructor(props){
    super(props);
    console.log('Log out');
    localStorage.clear();
  }

  render() {
      return <Redirect to='/sign-in'></Redirect>
  }
}