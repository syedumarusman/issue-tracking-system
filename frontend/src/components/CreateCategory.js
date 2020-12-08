import React, { Component } from "react";
import { Alert } from 'react-bootstrap';
import { apiClient } from '../_helpers/axios';

export default class CreateCategory extends Component {
    constructor(props){
        super(props);
        this.state = {category: '', showSuccess: false, showFailure: false};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const requestPayload = { name: this.state.category} 
        try {
            const response = await apiClient.post('/category/', requestPayload );
            this.setState({showSuccess: true});
            this.setState({category: ''})
        } catch(err) {
            this.setState({showFailure: true});
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Alert show={this.state.showSuccess} variant="success" dismissible>
                    Successfully created a category!
                </Alert>
                <Alert show={this.state.showFailure} variant="danger" dismissible>
                    Failure to create a category!
                </Alert>
                <h3>Create Category</h3>

                <div className="form-group">
                    <label>Category</label>
                    <input type="text" className="form-control" name="category" placeholder="Enter category name" value={this.state.category} onChange={this.handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}
