import React, { Component } from "react";
import { Alert, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = {name: '', email: '', role: '', password: '', confirmPassword: '', errors: {}, createUserSuccessful: 0, showSuccess: false, showFailure: false};
      }

      componentDidMount = () => {
        
      }
    
      handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit = async (event) => {
        event.preventDefault();
        const requestPayload = { name: this.state.name, role: this.state.role, email: this.state.email, password: this.state.password }

        if (this.validate()){
            try {
                await apiClient.post('/user/', requestPayload);
                this.setState({updateUserSuccessful: 1, showSuccess: true});
            }
            catch(err){
                this.setState({showFailure: true})
            }
         }
    
      }

      // Validate function - Validates both password and confirm password fields.
      validate = () => {
          let name = this.state.name;
          let email = this.state.email;
          let role = this.state.role;
          let password = this.state.password;
          let confirmPassword = this.state.confirmPassword;
          let errors = {};
          let isValid = true;

          if (name === ""){
              isValid = false;
              errors["name"] = "Name is required.";
          }

          if (role === ''){
              isValid = false;
              errors["role"] = "Role is required.";
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
        if (this.state.updateUserSuccessful){
            return <Redirect to = '/ListUsers'/>
          } else {
            return (
                    <form onSubmit={this.handleSubmit}>
                        <Alert show={this.state.showSuccess} variant="success" dismissible>
                        Successfully created {this.state.name}
                        </Alert>
                        <Alert show={this.state.showFailure} variant="danger" dismissible>
                            Failure to create {this.state.name}
                        </Alert>
                        <h3>Create User {this.props.match.params.id}</h3>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Full name" value={this.state.name} onChange={this.handleChange}/>

                            <div className="text-danger">{this.state.errors.name}</div>
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            {/* <input type="role" className="form-control" name="role" placeholder="Enter role" value={this.state.role} onChange={this.handleChange}/> */}
                            <select className="form-control" name="role" value={this.state.role} onChange={this.handleChange}>
                                <option value='customer'>Customer</option>
                                <option value='employee'>Employee</option>
                                <option value='admin'>Admin</option>
                            </select>

                            <div className="text-danger">{this.state.errors.role}</div>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>

                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>

                        <div className="form-group">
                            
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange}/>

                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" placeholder="Enter password" value={this.state.confirmPassword} onChange={this.handleChange}/>

                            <div className="text-danger">{this.state.errors.confirmPassword}</div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" >Save</button>
                    </form>
            );
        }
    }
}
