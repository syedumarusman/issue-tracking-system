import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button, Modal, Form } from 'react-bootstrap';
import { apiClient } from './_helpers/axios';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
    tableBody: null, userRole: localStorage.getItem("userRole"), categoryFilter: 'Default', categoryFilterUpdate: "Default", stateFilter: 'Default', pocFilter: 'Default',
    showView: false, showEdit: false, apiResponse: '', selectedIncident: {},
    errors: {},
    title: '',
    category: '', 
    description: '',
    dateCreated: '',
    dateResolved: '',
    state: '',
    pointOfContact: '',
    tags: [],
    currentAssignee: '',
    reportSuccessful: 0,
    optionItems: [],
    editOptionItems: [],
    pocItems: []
  };
  }

  handleShow = (currentIncident) => (e) =>{
    const incidentId = {_id: currentIncident._id}
    const requestPayload = { title: currentIncident.title}

    this.setState({showView: true})

    //console.log(currentIncident.caseHistory[0])

    this.setState({apiResponse: currentIncident.caseHistory[0]})
    // apiClient.get('/incident/', requestPayload).then((response) => {
    //   //console.log(response)
    // });
  }

  handleClose = () => {
    this.setState({showView: false})
  }

  componentDidMount() {
   this.IncidentList();
   this.setCategories();
   this.setCategoriesForUpdate()
   this.setPoc();
  }

  IncidentItem(item) {
    if (this.state.categoryFilter === "Default" && this.state.stateFilter === "Default" && this.state.pocFilter === "Default"){
      return (
        <tr key={item.title}>
          <td>{item.title}</td>
          <td>{item.category}</td>
          <td>{item.description}</td>
          <td>{item.dateCreated}</td>
          <td>{item.dateResolved}</td>
          <td>{item.state}</td>
          <td>{item.pointOfContact}</td>
          <td>{item.tags}</td>
          <td>{item.currentAssignee}</td>
          <td>
          <button onClick={this.handleShow(item)} className="btn-gradient btn green mini">View</button>
          {localStorage.userRole ==='customer' || 
          <button onClick={this.editHandler(item)} className="btn btn-gradient blue mini text-white">Edit</button>
          }
          {localStorage.userRole ==='customer' || 
           <button onClick={this.deleteHandler} value={item.title} className="btn btn-gradient red mini text-white">Delete</button>
          } 
          </td>
      </tr>)
    } else if (this.state.categoryFilter.toLowerCase() === item.category.toLowerCase()){
      return (
    <tr key={item.title}>
      <td>{item.title}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.dateCreated}</td>
      <td>{item.dateResolved}</td>
      <td>{item.state}</td>
      <td>{item.pointOfContact}</td>
      <td>{item.tags}</td>
      <td>{item.currentAssignee}</td>
      <td>
      <button onClick={this.handleShow(item)} className="btn-gradient btn green mini">View</button>
      {localStorage.userRole ==='customer' || 
      <button onClick={this.editHandler(item)} className="btn btn-gradient blue mini text-white">Edit</button>
      }
      {localStorage.userRole ==='customer' || 
       <button onClick={this.deleteHandler} value={item.title} className="btn btn-gradient red mini text-white">Delete</button>
      } 
      </td>
  </tr>)
    } else if (this.state.stateFilter.toLowerCase() === item.state.toLowerCase()){
      return (
        <tr key={item.title}>
          <td>{item.title}</td>
          <td>{item.category}</td>
          <td>{item.description}</td>
          <td>{item.dateCreated}</td>
          <td>{item.dateResolved}</td>
          <td>{item.state}</td>
          <td>{item.pointOfContact}</td>
          <td>{item.tags}</td>
          <td>{item.currentAssignee}</td>
          <td>
          <button onClick={this.handleShow(item)} className="btn-gradient btn green mini">View</button>
          {localStorage.userRole ==='customer' || 
          <button onClick={this.editHandler(item)} className="btn btn-gradient blue mini text-white">Edit</button>
          }
          {localStorage.userRole ==='customer' || 
           <button onClick={this.deleteHandler} value={item.title} className="btn btn-gradient red mini text-white">Delete</button>
          } 
          </td>
      </tr>)
    } else if (this.state.pocFilter.toLowerCase() === item.pointOfContact.toLowerCase()){
      return (
        <tr key={item.title}>
          <td>{item.title}</td>
          <td>{item.category}</td>
          <td>{item.description}</td>
          <td>{item.dateCreated}</td>
          <td>{item.dateResolved}</td>
          <td>{item.state}</td>
          <td>{item.pointOfContact}</td>
          <td>{item.tags}</td>
          <td>{item.currentAssignee}</td>
          <td>
          <button onClick={this.handleShow(item)} className="btn-gradient btn green mini">View</button>
          {localStorage.userRole ==='customer' || 
          <button onClick={this.editHandler(item)} className="btn btn-gradient blue mini text-white">Edit</button>
          }
          {localStorage.userRole ==='customer' || 
           <button onClick={this.deleteHandler(item)} className="btn btn-gradient red mini text-white">Delete</button>
          } 
          </td>
      </tr>)
    }
  }

  async IncidentList () {
    const response = await apiClient.get('/incident/');
    const incidents = response.data.data;
    if (incidents === undefined){
      window.location.reload();
    } else {
      var listItems = incidents.map((item) => this.IncidentItem(item));
      this.setState({tableBody: (
        <tbody>
          {listItems}
        </tbody>
      )})
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.IncidentList();
  }

  viewHandler = () => {

    return(
    <Modal show={this.state.showView} onHide={this.handleClose}>
      <Modal.Header closeButton>
    <Modal.Title> {this.state.apiResponse && this.state.apiResponse["title"]}</Modal.Title>
      </Modal.Header>
      <Modal.Body> Case History: {this.state.apiResponse} 
      <form onSubmit={this.handleSubmit}>
                        {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Add a comment:</Form.Label>
                          <Form.Control as="textarea" rows="3" />
                        </Form.Group> */}

                    {/* <button type="submit" className="btn btn-primary btn-block">Submit</button> */}
                </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
    );
  }

  handleEditClose = () => {
    this.setState({showEdit: false})
  }

  validate = () => {
    let title = this.state.title;
    let category = this.state.category;
    let description = this.state.description;
    let dateCreated = this.state.dateCreated;
    let dateResolved = this.state.dateResolved;
    let state = this.state.state;
    let pointOfContact = this.state.pointOfContact;
    let tags = this.state.tags; // DONT DO FOR NOW
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

    if (tags === ""){
        isValid = false;
        errors["tags"] = "Tags must be provided."
    }

    if (currentAssignee === ""){
        isValid = false;
        errors["currentAssignee"] = "Current assignee must be provided."
    }

    this.setState({errors: errors});

    return isValid;
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
        const response = await apiClient.put('/incident/', requestPayload);
        this.setState({reportSuccessful: 1})
    }
}

  editHandler = (currentItem) => (e) => {
    this.setState({selectedIncident: currentItem})
    this.setState({showEdit: true})
  }

  handleTags = (tags) => {
    this.setState({tags})
}

  editModal = () => {
    const currentIncident = this.state.selectedIncident

    return(
    <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
      <Modal.Header closeButton>
    <Modal.Title> Title </Modal.Title>
      </Modal.Header>
      <Modal.Body>  <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label>Tag</label>
              <div className="text-danger">{this.state.errors.tags}</div>
              <TagsInput placeholder={currentIncident.tags} value={this.state.tags} onChange={this.handleTags}/>
          </div>
          <div className="form-row">

              <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" name="title" placeholder={currentIncident.title} value={this.state.title} onChange={this.handleChange}/>

                  <div className="text-danger">{this.state.errors.title}</div>
              </div>

              <div className="form-group col-md-6">
                  <label>Category</label>
                  <select className="form-control" name="categoryFilterUpdate" value={this.state.categoryFilterUpdate} onChange={this.handleChange}>
                    <option value='Default'>Select</option>
                      {this.state.editOptionItems}
                  </select>

                  <div className="text-danger">{this.state.errors.category}</div>
              </div>

              <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="form-control" name="description" value={this.state.description} placeholder={currentIncident.description} onChange={this.handleChange}/>

                  <div className="text-danger">{this.state.errors.description}</div>
              </div>

              {/* <div className="form-group">
                  <label>Date Created</label>
                  <input type="date" className="form-control" name="dateCreated" placeholder="Enter description" value={currentIncident.dateCreated} onChange={this.handleChange}/>

                  <div className="text-danger">{this.state.errors.dateCreated}</div>
              </div>

              <div className="form-group">
                  <label>Date Resolved</label>
                  <input type="date" className="form-control" name="dateResolved" placeholder="Enter description" value={currentIncident.dateResolved} onChange={this.handleChange}/>
              </div> */}

              <div className="form-group col-md-5">
                  <label>State</label>
                  <select className="form-control" name="state" value={this.state.state} onChange={this.handleChange}>
                      <option value='Default'>Select</option>
                      <option value="open">Open</option>
                      <option value="inProgress">In-Progress</option>
                      <option value="done">Done</option>
                  </select>

                  <div className="text-danger">{this.state.errors.state}</div>
              </div>

              <div className="form-group">
                  <label>Point of Contact</label>
                  <input type="email" className="form-control" name="pointOfContact" value={this.state.pointOfContact} placeholder={currentIncident.pointOfContact} onChange={this.handleChange}/>

                  <div className="text-danger">{this.state.errors.pointOfContact}</div>
              </div>

              <div className="form-group">
                  <label>Current assignee</label>
                  <input type="email" className="form-control" name="currentAssignee" value={this.state.currentAssignee} placeholder={currentIncident.currentAssignee} onChange={this.handleChange}/>

                  <div className="text-danger">{this.state.errors.currentAssignee}</div>
              </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>

      </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
    );
  }
  
  deleteHandler = (currentItem) => {
    const requestPayload = { _id: currentItem._id }
    apiClient.delete('/incident/', requestPayload );
  }

  setCategories = async () => {
    const response = await apiClient.get('/category/');
    const categories = response.data.data;
    const optionItems = categories.map((category) => {
      return (<option value={category.name} key={category._id}>{category.name}</option>)
    })
    this.setState({optionItems: optionItems})
  }

  setCategoriesForUpdate = async () => {
    const response = await apiClient.get('/category/');
    const categories = response.data.data;
    const optionItems = categories.map((category) => {
      return (<option value={category.name} key={category._id}>{category.name}</option>)
    })
    this.setState({editOptionItems: optionItems})
  }

  setPoc = async () => {
    const response = await apiClient.get('/user/');
    const users = response.data.data;
    const pocItems = users.map((user) => {
    return (<option value={user.name} key={user._id}>{user.name}</option>);
    })
    this.setState({pocItems: pocItems})
  }

  render() {
    const createButtonStyle = {
      'padding-top': '31px',
      'margin-left': '355px'
    }
    return (
      <div>
          {this.viewHandler()}
          {this.editModal()}
          <h3>Welcome to the Dashboard</h3>

          <div className='form-row'>
            <div className="form-group col-md-3">
              <label>Filter by Category</label>
              <select placeholder="Select an option" className="form-control" name="categoryFilter" onChange={this.handleChange}>
                <option value='Default'>Select an option</option>
                  {this.state.optionItems}
              </select>
            </div>

            <div className="form-group col-md-2">
              <label>Filter by Point of Contact</label>
              <select placeholder="Select an option" className="form-control" name="pocFilter" onChange={this.handleChange}>
                  <option value='Default'>Select an option</option>
                  {this.state.pocItems}
              </select>
            </div>
            <div className="form-group col-md-2">
                <label>Filter by Status</label>
                <select placeholder="Select an option" className="form-control" name="stateFilter" onChange={this.handleChange}>
                    <option value='Default'>Select an option</option>
                    <option value="open">Open</option>
                    <option value="inProgress">In-Progress</option>
                    <option value="done">Done</option>
                </select>
              </div>

              <div className="form-row-1 col-md-2" style={createButtonStyle}>
                
                <Button variant="primary" href='/reportIncident'>+ Create new incident</Button>
              </div>

          </div>


          <table className="contentTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Date Resolved</th>
                <th>State</th>
                <th>Point of Contact</th>
                <th>Tags</th>
                <th>Current Assignee</th>
                <th>Actions</th>
              </tr>
            </thead>
            {this.state.tableBody}

          </table>
        </div>
      );
    }
}
