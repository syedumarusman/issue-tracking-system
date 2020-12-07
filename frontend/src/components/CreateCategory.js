import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class CreateCategory extends Component {
    constructor(props){
        super(props);
        this.state = {redirect: 0};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const response = apiClient.post('/category', { category: this.state.category } );
        this.setState({redirect: 1});
    }

    render() {
        if (this.state.redirect){
            return <Redirect to = '/ListCategories'/>
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
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
}
