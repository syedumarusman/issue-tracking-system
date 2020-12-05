import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from './_helpers/axios';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {email: '', password: '', loginSuccessful: 0, errors: {}};
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const requestPayload = { email: this.state.email, password: this.state.password }
    let errors = {};

        localStorage.setItem('token', 'asdfasdf24t2');
        localStorage.setItem('userId', '234234');
        localStorage.setItem('userName', 'Nam Nam');
        localStorage.setItem('userRole', 'admin');
    if (this.validate()){
      const response = await apiClient.post('/user/login', requestPayload);
      const responseError = response.data.meta.error;
      
      // Check if backend responds with error
      if(responseError === undefined){
        this.setState({loginSuccessful: 1});

      } else {
        errors["loginError"] = "Email or password is incorrect.";
        this.setState({errors: errors});
      } 
    }
  }

  validate = () => {
    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let isValid = true;

    if (email === ""){
      isValid = false;
      errors["email"] = "Email is required."
    }
    
    if (password === ""){
      isValid = false;
      errors["password"] = "Password is required."
    }

    this.setState({errors: errors});

    return isValid;
  }

    render() {
      // Login is successful, so we should have the homepage/dashboard
      if (this.state.loginSuccessful){
        return <Redirect to = '/dashboard'/>
      } else {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>

                <div className="form-group">
                    <div className="text-danger">{this.state.errors.loginError}</div>


                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={this.state.value} onChange={this.handleChange}/>

                    <div className="text-danger">{this.state.errors.email}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.value} onChange={this.handleChange}/>

                    <div className="text-danger">{this.state.errors.password}</div>
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
