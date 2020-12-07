import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import { apiClient } from './_helpers/axios';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {redirect: false, tableBody: null, userRole: localStorage.getItem("userRole"), categoryFilter: 'default', show: false};
  }

  handleShow = () => {
    this.setState({show: true})
  }

  handleClose = () => {
    this.setState({show: false})
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
      <a onClick={() => this.viewHandler(item)} className="btn-gradient green mini">View</a>
      <a style={this.state.userRole === 'customer' ? { display: 'none' }: {} } onClick={this.deleteHandler} className="btn-gradient red mini">Delete</a>
      <a style={this.state.userRole === 'customer' ? { display: 'none' }: {} } onClick={() => this.this.editHandler(item)} className="btn-gradient blue mini">Edit</a>
      </td>
  </tr>)
    }
  }

  async IncidentList () {
    const response = await apiClient.get('/incident/');
    const incidents = response.data.data;
    var listItems = incidents.map((item) => this.IncidentItem(item));
    this.setState({tableBody: (
      <tbody>
        {listItems}
      </tbody>
    )})
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.IncidentList();
  }

  viewHandler = (item) => {
    console.log(item) 
    this.handleShow();
    return(
    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header>
        <Modal.Title> Modal Heading</Modal.Title>
      </Modal.Header>
      <Modal.Body> The body of the Modal </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
    );
  }

  editHandler = (item) => {

  }
  
  deleteHandler = (item) => {

  }

  setRedirect = () => {
    this.setState({redirect: true})
  }

  renderRedirect = () => {
    if(this.state.redirect){
      return <Redirect to='/reportIncident'></Redirect>
    }
  }

  render() {
    return (
      <div>
          {this.renderRedirect()}
          <h3>Welcome to the Dashboard</h3>
          <Button variant="primary" onClick={this.setRedirect}>+ Create new incident</Button>

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
