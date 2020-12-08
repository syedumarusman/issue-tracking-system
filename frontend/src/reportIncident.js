import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from './_helpers/axios';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';

export default class ReportIncident extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            category: '', 
            description: '',
            state: '',
            tags: [],
            currentAssignee: '',
            categoryState: 'Default',
            optionItems: [],
            assigneeOptions: [],
            assigneeState: 'Default',
            stateOption: 'Default',
            errors: {},
            reportSuccessful: 0
        };
    }

    componentDidMount = () => {
        this.setCategories();
        this.setAssignee();
    }

    handleTags = (tags) => {
        this.setState({tags})
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let requestPayload = {};
        if (localStorage.getItem("userRole") === "customer"){
            requestPayload = {
                tags: this.state.tags,
                title: this.state.title,
                category: this.state.category, 
                description: this.state.description,
                dateCreated: new Date().toLocaleString(),
                dateResolved: '',
                state: "Open",
                pointOfContact: localStorage.getItem("userEmail"),
                currentAssignee: '',
            }
        } else {
            requestPayload = {
                tags: this.state.tags,
                title: this.state.title,
                category: this.state.category, 
                description: this.state.description,
                dateCreated: new Date().toLocaleString(),
                dateResolved: '',
                state: 'Open',
                pointOfContact: localStorage.getItem("userEmail"),
                currentAssignee: this.state.currentAssignee
            }
        }
        if (this.validate(requestPayload)) {
            const response = await apiClient.post('/incident/', requestPayload);
            this.setState({reportSuccessful: 1})
        }
    }

    validate = (requestPayload) => {   
        let errors = {};
        let isValid = true;

        if (requestPayload.title === ""){
            isValid = false;
            errors["title"] = "Title must be provided."
        }

        if (requestPayload.category === ""){
            isValid = false;
            errors["category"] = "Category must be provided.";
        }
        
        if (requestPayload.description === ""){
            isValid = false;
            errors["description"] = "Description must be provided."
        }

        if (requestPayload.dateCreated === ""){
            isValid = false;
            errors["dateCreated"] = "Date was not provided from system time."
        }

        if (requestPayload.state === ""){
            isValid = false;
            errors["state"] = "State must be provided."
        }

        if (requestPayload.pointOfContact === ""){
            isValid = false;
            errors["pointOfContact"] = "Point Of Contact must be provided."
        }

        if (requestPayload.tags === ""){
            isValid = false;
            errors["tags"] = "Tags must be provided."
        }

        if (requestPayload.currentAssignee === null && localStorage.getItem("userRole") !== "customer"){
            isValid = false;
            errors["currentAssignee"] = "Current assignee must be provided."
        }

        this.setState({errors: errors});

        return isValid;
    }

    setCategories = async () => {
        const response = await apiClient.get('/category/');
        const categories = response.data.data;
        const optionItems = categories.map((category) => {
            return (<option value={category.name} key={category._id}>{category.name}</option>)
        })
        this.setState({optionItems: optionItems})
    }

    setAssignee = async () => {
        const response = await apiClient.get('/user', {params: { exclude: 'customer' } });
        const assignees = response.data.data;
        const optionItems = assignees.map((user) => {
            return (<option value={user.email} key={user._id}>{user.email}</option>)
        })
        this.setState({assigneeOptions: optionItems})
    }

    render() {
        if (this.state.reportSuccessful){
            return <Redirect to='/dashboard'/>
        } else {
            return (
                <div className="">
                    <h3>Report Incident</h3>

                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>Tag</label>
                            <div className="text-danger">{this.state.errors.tags}</div>
                            <TagsInput value={this.state.tags} onChange={this.handleTags}/>
                        </div>
                        <div className="form-row">

                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title" placeholder="Enter title" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.title}</div>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Category</label>
                                <select className="form-control" name="category" value={this.state.optionsState} onChange={this.handleChange}>
                                    <option value='Default'>Select an option</option>
                                    {this.state.optionItems}
                                </select>

                                <div className="text-danger">{this.state.errors.category}</div>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" name="description" placeholder="Enter description" value={this.state.value} onChange={this.handleChange}/>

                                <div className="text-danger">{this.state.errors.description}</div>
                            </div>

                            {localStorage.userRole !== 'customer' &&
                                <React.Fragment>
                                    <div className="form-group col-md-5">
                                        <label>State</label>
                                        <select placeholder="Select an option" className="form-control" name="state" value={this.state.optionsState} onChange={this.handleChange}>
                                            <option value='Default'>Select</option>
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In-Progress</option>
                                            <option value="Done">Done</option>
                                        </select>

                                        <div className="text-danger">{this.state.errors.state}</div>
                                    </div>

                                    <div className="form-group">
                                        <label>Current assignee</label>
                                        <select className="form-control" name="currentAssignee" value={this.state.optionsState} onChange={this.handleChange}>
                                            <option value='Default'>Select an option</option>
                                            {this.state.assigneeOptions}
                                        </select>
                                        <div className="text-danger">{this.state.errors.currentAssignee}</div>
                                    </div>
                                </React.Fragment>
                            }        

                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        
                    </form>                
                </div>
            );
        }
    }
}