import React, { Component } from "react";
import { Redirect } from 'react-router';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {fullname: '', email: '', password: '', confirmPassword: '', errors: {}, signupSuccessful: 0};
      }
    
      handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit = (event) => {
        const requestPayload = { fullname: this.state.fullname, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword }

        if (this.validate()){

            //console.log(this.state)
        
            fetch('http://localhost:4000/user/', {
            method: 'POST',
            // Login api does not need to be auth, this header is for api requests that need auth
            //    headers: {
            //      'Authorization': 'Bearer' + localStorage.userToken
            //    },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(requestPayload)
        
            }).then(response => {
                this.setState({signupSuccessful: 1});
                return response.json();
            });
        }
    
        event.preventDefault();
      }

      // Validate function - Validates both password and confirm password fields.
      validate = () => {
          let password = this.state.password;
          let confirmPassword = this.state.confirmPassword;
          let errors = {};
          let isValid = true;

          if (password !== "undefined" && confirmPassword !== "undefined"){
              if (password !== confirmPassword){

                isValid = false;
                errors["password"] = "Passwords don't match.";
              }
          }
          //console.log(isValid)

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
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" name="fullname" placeholder="Full name" value={this.state.value} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.value} onChange={this.handleChange}/>

                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" placeholder="Enter password" value={this.state.value} onChange={this.handleChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onclick="">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="sign-in">sign in?</a>
                    </p>
                </form>
            );
        }
    }
}
