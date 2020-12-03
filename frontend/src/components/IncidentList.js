import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class IncidentList extends Component {
  constructor(props){
    super(props);
    this.state = {email: '', password: '', loginSuccessful: 0};
  }

  //execute when component is loaded/refreshed
  componentDidMount() {
    //connect to api server and get a list of tickets
    apiClient.post('/tickets')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        localStorage.setItem('userToken', 'asdfasdf24t2');

        console.log('always executed');
      });    
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const requestPayload = { email: this.state.email, password: this.state.password }

    apiClient.get('/ticket/view', requestPayload)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        localStorage.setItem('userToken', 'asdfasdf24t2');

        console.log('always executed');
      });

    event.preventDefault();
  }
    render() {
      // Login is successful, so we should have the homepage/dashboard
      if (this.state.loginSuccessful){
        return <Redirect to = '/dashboard'/>
      } else {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

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
}
