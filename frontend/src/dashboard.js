import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button, Modal, Form } from 'react-bootstrap';
import { apiClient } from './_helpers/axios';


import { Navbar, Nav, NavDropdown, FormControl, Dropdown } from 'react-bootstrap';


export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {tableBody: null, userRole: localStorage.getItem("userRole"), categoryFilter: 'default', show: false, incidentId: '', apiResponse: ''};
  }

  handleShow = (event) => {
    // console.log(event.target.value)
    const requestPayload = { title: event.target.value }

    this.setState({show: true})

    apiClient.get('/incident/', requestPayload).then((response) => {
      //console.log(response.data.data[0]["caseHistory"][0])
      this.setState({apiResponse: response.data.data[0]})
    });
    // console.log(response)
  }

  handleClose = () => {
    this.setState({show: false})
  }

  //componentDidMount() {
    // const scope = this.props.match.params.scope
    // const query = this.props.match.params.query
    
    // const requestPayload = { scope: scope, query: query }
    // console.log(requestPayload)

    // alert("Search for "+ this.props.match.params.query +" in "+ this.props.match.params.scope);
    // apiClient.get('/incident/').then((response) => {
      
    //   // Umar - Backend should handle post for searching --------------------------------------------------------------------

    //   const incidents = response.data.data;
    //   if (incidents !== undefined){
    //     var listItems = incidents.map((item) => this.IncidentItem(item));
    //     this.setState({tableBody: (
    //       <tbody>
    //         {listItems}
    //       </tbody>
    //     )})
    //   }
    // });
   //this.IncidentList();
  //}

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
      <button onClick={this.handleShow} value={item.title} className="btn-gradient btn green mini">View</button>
      {localStorage.userRole ==='customer' || 
      <a href={"/reportIncident/"+ item._id} className="btn btn-gradient blue mini text-white">Edit</a>
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
    console.log(response)
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
    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header>
    <Modal.Title> {this.state.apiResponse && this.state.apiResponse["title"]}</Modal.Title>
      </Modal.Header>
      <Modal.Body> {this.state.apiResponse && this.state.apiResponse["caseHistory"][0]} 
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

  editHandler = (event) => {
    const requestPayload = { title: event.target.value }

    apiClient.get('/incident/', requestPayload).then((response) => {
      //console.log(response.data.data[0]["caseHistory"][0])
      this.setState({apiResponse: response.data.data[0]})
    });

  }
  
  deleteHandler = (event) => {
    const requestPayload = { title: event.target.value }
    apiClient.delete('/incident/', { data: { title: event.target.value } } );
  }

  render() {
    return (
      <div>
          {this.viewHandler()}
          <h3>Welcome to the Dashboard</h3>
          <Button variant="primary" href='/reportIncident'onClick={this.setRedirect}>+ Create new incident</Button>

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
