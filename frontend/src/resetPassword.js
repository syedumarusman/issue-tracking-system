import React, { Component } from "react";
import { Redirect } from 'react-router';

export default class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {email: '', errors: {}, passwordResetSuccessful: 0};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        const requestPayload = { email: this.state.email }

        fetch('http://localhost:4000/user/resetPassword', {
            method: 'POST', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestPayload)
        }).then(response => {
            this.setState({passwordResetSuccessful: 1});
            return response.json();
        });
        event.preventDefault();
    }

    render() {
        if (this.state.passwordResetSuccessful){
            return <Redirect to = '/sign-in'/>
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <h3>Reset Password</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange}/>
                        
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            );
        }
    }
}
