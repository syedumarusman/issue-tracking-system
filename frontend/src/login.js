import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { apiClient } from './_helpers/axios';
import './styles/table.css'

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

    if (this.validate()){
      const response = await apiClient.post('/user/login', requestPayload).
      then((response) => {
        const responseError = response.data.meta.error;
        if(responseError === undefined){
          localStorage.setItem("token", response.data.meta.token)
          localStorage.setItem("userId", response.data.result.userId)
          localStorage.setItem("userName", response.data.result.name)
          localStorage.setItem("userRole", response.data.result.role)
          localStorage.setItem("userEmail", response.data.result.email)
          
          this.setState({loginSuccessful: 1});  

        } else {
          errors["loginError"] = response.data.meta.message;
          this.setState({errors: errors});
        }
      });
      
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
      if (this.state.loginSuccessful && localStorage.token){
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

                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/reset-password">password?</a>
                </p>
            </form>
        );
      }
    }
}
