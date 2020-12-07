import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class EditUser extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', email: '', password: '', confirmPassword: '', errors: {}, signupSuccessful: 0};
      }
    
      handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit = async (event) => {
        event.preventDefault();
        const requestPayload = { name: this.state.name, email: this.state.email, password: this.state.password }

        if (this.validate()){

            await apiClient.post('/user/', requestPayload);
            this.setState({signupSuccessful: 1});
         }
    
      }

      // Validate function - Validates both password and confirm password fields.
      validate = () => {
          let name = this.state.name;
          let email = this.state.email;
          let password = this.state.password;
          let confirmPassword = this.state.confirmPassword;
          let errors = {};
          let isValid = true;

          if (name === ""){
              isValid = false;
              errors["name"] = "Name is required.";
          }

          if (email === ""){
              isValid = false;
              errors["email"] = "Email is required.";
          }

          if (password === ""){
              isValid = false;
              errors["password"] = "Password is required.";
          }

          if (confirmPassword === ""){
              isValid = false;
              errors["confirmPassword"] = "Confirm Password is required.";
          }
          
          if (password !== confirmPassword){
            isValid = false;
            errors["password"] = "Passwords don't match.";
          }

          // Update the state errors.
          this.setState({errors: errors});

          return isValid;
      }

    render() {
        if (this.state.signupSuccessful){
            return <Redirect to = '/sign-in'/>
        } else {

            return (
                <form onSubmit={this.handleSubmit}>
                    <h3>Edit User {this.props.match.params.id}</h3>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Full name" value={this.state.value} onChange={this.handleChange}/>

                        <div className="text-danger">{this.state.errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange}/>

                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>

                    <div className="form-group">
                        
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.value} onChange={this.handleChange}/>

                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" placeholder="Enter password" value={this.state.value} onChange={this.handleChange}/>

                        <div className="text-danger">{this.state.errors.confirmPassword}</div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" >Save</button>
                </form>
            );
        }
    }
}
