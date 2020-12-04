import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { apiClient } from './_helpers/axios';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {redirect: false, tableBody: null};
  }

  componentDidMount() {
   this.IncidentList();
  }

  IncidentItem(item) {
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
      <a onClick={this.viewHandler} className="btn-gradient green mini">View</a>
      <a onClick={this.editHandler} className="btn-gradient blue mini">Edit</a>
      <a onClick={this.deleteHandler} className="btn-gradient red mini">Delete</a>
      </td>
  </tr>)
  }

  async IncidentList () {
    const response = await apiClient.get('/incident/');
    const incidents = response.data.data;
    const listItems = incidents.map((item) => this.IncidentItem(item));
    this.setState({tableBody: (
      <tbody>
        {listItems}
      </tbody>
    )})
  }

  viewHandler(event) {

  }

  editHandler(event) {

  }
  
  deleteHandler(event) {

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
