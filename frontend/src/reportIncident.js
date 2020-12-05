import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from './_helpers/axios';
import { MDBChipsInput } from 'mdbreact';
//import ChipsInputPage from "./tagComponent.js";

import 'jquery/src/jquery.js';
import 'bootstrap4-tagsinput/tagsinput.js';
import 'bootstrap4-tagsinput/tagsinput.css';

export default class ReportIncident extends Component {
    constructor(props){
        super(props);
        this.state = {title: '',
                      category: '', 
                      description: '',
                      dateCreated: '',
                      dateResolved: '',
                      state: '',
                      pointOfContact: '',
                      tags: [],
                      currentAssignee: '',
                      categoryState: 'default', 
                      stateOption: 'default',
                      errors: {},
                      reportSuccessful: 0};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const requestPayload = {
            title: this.state.title,
            category: this.state.category, 
            description: this.state.description,
            dateCreated: this.state.dateCreated,
            dateResolved: this.state.dateResolved,
            state: this.state.state,
            pointOfContact: this.state.pointOfContact,
            tags: this.state.tags,
            currentAssignee: this.state.currentAssignee
        }
        if (this.validate()) {
            const response = await apiClient.post('/incident/', requestPayload);
            this.setState({reportSuccessful: 1})
        }
    }

    validate = () => {
        let title = this.state.title;
        let category = this.state.category;
        let description = this.state.description;
        let dateCreated = this.state.dateCreated;
        let dateResolved = this.state.dateResolved;
        let state = this.state.state;
        let pointOfContact = this.state.pointOfContact;
        //let tags = this.state.tags; // DONT DO FOR NOW
        let currentAssignee = this.state.currentAssignee;
        
        let errors = {};
        let isValid = true;

        if (title === ""){
            isValid = false;
            errors["title"] = "Title must be provided."
        }

        if (category === ""){
            isValid = false;
            errors["category"] = "Category must be provided.";
        }
        
        if (description === ""){
            isValid = false;
            errors["description"] = "Description must be provided."
        }

        if (dateCreated === ""){
            isValid = false;
            errors["dateCreated"] = "Date created must be provided."
        }

        if (dateResolved === ""){
            // isValid = false;
            // errors["dateResolved"] = "Date resolved must be provided."
        }

        if (state === ""){
            isValid = false;
            errors["state"] = "State must be provided."
        }

        if (pointOfContact === ""){
            isValid = false;
            errors["pointOfContact"] = "Point Of Contact must be provided."
        }

        // TAGS NOT WORKING
        // if (tags === ""){
        //     isValid = false;
        //     errors["tags"] = "Tags must be provided."
        // }

        if (currentAssignee === ""){
            isValid = false;
            errors["currentAssignee"] = "Current assignee must be provided."
        }

        this.setState({errors: errors});

        return isValid;
    }

    render() {
        if (this.state.reportSuccessful){
            return <Redirect to='/dashboard'/>
        } else {
            return (
                <div>
                    <h3>Report Incident</h3>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Tag</label>
                                <div className="text-danger">{this.state.errors.tags}</div>
                                <input type="text" className="form-control" name="tags" data-role="tagsinput" placeholder="Enter tags" value={this.state.value} onChange={this.handleChange}/>

                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title" placeholder="Enter title" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.title}</div>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Category</label>
                                <select className="form-control" name="category" value={this.state.optionsState} onChange={this.handleChange}>
                                    <option value='default'>Select an option</option>
                                    <option value='critical'>Critical</option>
                                    <option value='high'>High</option>
                                    <option value='medium'>Medium</option>
                                    <option value='low'>Low</option>
                                </select>

                                <div className="text-danger">{this.state.errors.category}</div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" name="description" placeholder="Enter description" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.description}</div>
                            </div>

                            <div className="form-group">
                                <label>Date Created</label>
                                <input type="date" className="form-control" name="dateCreated" placeholder="Enter description" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.dateCreated}</div>
                            </div>

                            <div className="form-group">
                                <label>Date Resolved</label>
                                <input type="date" className="form-control" name="dateResolved" placeholder="Enter description" value={this.state.value} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group col-md-5">
                                <label>State</label>
                                <select placeholder="Select an option" className="form-control" name="state" value={this.state.optionsState} onChange={this.handleChange}>
                                    <option value='default'>Select</option>
                                    <option value="open">Open</option>
                                    <option value="inProgress">In-Progress</option>
                                    <option value="done">Done</option>
                                </select>

                                <div className="text-danger">{this.state.errors.state}</div>
                            </div>

                            <div className="form-group">
                                <label>Point of Contact</label>
                                <input type="email" className="form-control" name="pointOfContact" placeholder="Enter employee email" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.pointOfContact}</div>
                            </div>

                            <div className="form-group">
                                <label>Current assignee</label>
                                <input type="email" className="form-control" name="currentAssignee" placeholder="Assigned Employee" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.currentAssignee}</div>
                            </div>

                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        
                    </form>                
                </div>
            );
        }
    }
}