import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button, Modal, Form } from 'react-bootstrap';
import { apiClient } from './_helpers/axios';


import { Navbar, Nav, NavDropdown, FormControl, Dropdown } from 'react-bootstrap';


export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
    tableBody: null, userRole: localStorage.getItem("userRole"), categoryFilter: 'default', 
    showView: false, showEdit: false, incidentId: '', apiResponse: '', selectedIncident: {},
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
    categoryState: 'default', 
    stateOption: 'default',
    reportSuccessful: 0
  };
  }

  handleShow = (currentIncident) => (e) =>{
    const incidentId = currentIncident._id

    this.setState({showView: true})

    // apiClient.get('/incident/', requestPayload).then((response) => {
    //   this.setState({apiResponse: response.data.data})
    // });
  }

  handleClose = () => {
    this.setState({showView: false})
  }

  componentDidMount() {
   this.IncidentList();
  }

  IncidentItem(item) {
    if (this.state.categoryFilter === item.category || this.state.categoryFilter === "default"){

    return (
    <tr key={item.title}>
      <td>{item.title}</td>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.dateCreated}</td>
      <td>{item.dateAssigned}</td>
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
    }
  }

  async IncidentList () {
    const response = await apiClient.get('/incident/');
    //console.log(response)
    const incidents = response.data.data;
    if (incidents !== undefined){
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
      <Modal.Body> {this.state.apiResponse && this.state.apiResponse["caseHistory"][1]} 
      <form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Add a comment:</Form.Label>
                          <Form.Control as="textarea" rows="3" />
                        </Form.Group>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
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

    // TAGS NOT WORKING
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
        const response = await apiClient.edit('/incident/', requestPayload);
        //console.log(this.state.tags)
        this.setState({reportSuccessful: 1})
    }
}

  editHandler = (currentItem) => (e) => {
    this.setState({selectedIncident: currentItem})
    console.log(this.state.selectedIncident);

    this.setState({showEdit: true})
    //apiClient.update('/incident/', { data: { title: event.target.value } } );
  }

  editModal = () => {

    return(
    <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
      <Modal.Header closeButton>
    <Modal.Title> Title </Modal.Title>
      </Modal.Header>
      <Modal.Body>  <form onSubmit={this.handleSubmit}>

          <div className="form-group">
              <label>Tag</label>
              <div className="text-danger">{this.state.errors.tags}</div>
              <input type="text" className="form-control" name="tags" data-role="tagsinput" placeholder="Enter tags" value={this.state.value} onChange={this.handleChange} />
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

              {localStorage.userRole === 'Employee' || localStorage.userRole === 'admin' &&
                  <React.Fragment>
                      <div className="form-group">
                          <label>Current assignee</label>
                          <input type="email" className="form-control" name="currentAssignee" placeholder="Assigned Employee" value={this.state.value} onChange={this.handleChange}/>

                          <div className="text-danger">{this.state.errors.currentAssignee}</div>
                      </div>
                  </React.Fragment>
              }        

          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>

      </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
    );
  }
  
  deleteHandler = (event) => {
    const requestPayload = { title: event.target.value }
    apiClient.delete('/incident/', { data: { title: event.target.value } } );
  }

  render() {
    return (
      <div>
          {this.viewHandler()}
          {this.editModal()}
          <h3>Welcome to the Dashboard</h3>
          <Button variant="primary" href='/reportIncident'>+ Create new incident</Button>

          <div className='form-row'>
            <div className="form-group col-md-2">
              <label>Filter by Category</label>
              <select placeholder="Select an option" className="form-control" name="categoryFilter" onChange={this.handleChange}>
                  <option value='default'>No Filter</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
              </select>
            </div>

            <div className="form-group col-md-2">
              <label>Filter by Point of Contact</label>
              <select placeholder="Select an option" className="form-control" name="categoryFilter" onChange={this.handleChange}>
                  <option value='default'>Select an option</option>
                  <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <table className="contentTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Date Assigned</th>
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
