import React, { Component } from "react";
import { Redirect } from 'react-router';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {email: '', password: '', loginSuccessful: 0};
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const requestPayload = { email: this.state.email, password: this.state.password }

    fetch('http://localhost:4000/user/login', {
      method: 'POST',
      // Login api does not need to be auth, this header is for api requests that need auth
      headers: {
        'Authorization': 'Bearer' + localStorage.userToken
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(requestPayload)

    }).then(response => {
      // Store user and token returned by the backend with localStorage, fake the info for now
      localStorage.setItem('currentUser', {user: 'fake', role: 'Admin'});
      localStorage.setItem('userToken', 'asdfasdf24t2');
      // Set loginSuccessful so that render() knows it should redirect to dashboard after login is loginSuccessful
      this.setState({loginSuccessful: 1});
      return response.json();
    });

    event.preventDefault();
  }
    render() {
      return (
          <form onSubmit={this.handleSubmit}>
              <h3>Dashboard</h3>

              <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="email" value={this.state.value} onChange={this.handleChange}/>
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.value} onChange={this.handleChange}/>
              </div>

              <div className="form-group">
                  <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Login</button>
              <p className="forgot-password text-right">
                  Forgot <a href="/reset-password">password?</a>
              </p>
          </form>
      );
    }
}
