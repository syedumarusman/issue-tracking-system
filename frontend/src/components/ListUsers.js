import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import { apiClient } from '../_helpers/axios';

export default class ListUsers extends Component {
  constructor(props){
    super(props);
    this.state = {redirect: false, tableBody: null};
  }

  componentDidMount() {
   this.TableBody();
  }

  TableHeader(item) {
    return (            
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }
  TableItem(item) {
    return (
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
        <td>
          <a href={"/EditUser/"+ item._id} className="btn btn-gradient blue mini text-white">Edit</a>
          <button onClick={this.deleteHandler} value={item._id} className="btn btn-gradient red mini text-white">Delete</button>
        </td>
      </tr>
    )
  }

  async TableBody () { 
    const response = await apiClient.get('/user/');
    const incidents = response.data.data;
    const tableItems = incidents.map((item) => this.TableItem(item));
    const tableHeader = this.TableHeader();
    this.setState({tableBody: (
      <tbody>
        {tableItems}
      </tbody>
    )})
  }

  viewHandler(event) {

  }

  editHandler(event) {

  }
  
  async deleteHandler(event) {
    //alert("User ID is "+ event.target.value);
    const response = await apiClient.delete('/user', { data: { _id: event.target.value } } );
  }

  setRedirect = () => {
    this.setState({redirect: '/anyURL'})
  }

  renderRedirect = () => {
    if(this.state.redirect){
      return <Redirect to={this.state.redirect}></Redirect>
    }
  }

  render() {
      return (
        <div>
          {this.renderRedirect()}
          <h3>Users</h3>
          <Button variant="primary" href='/createUser'>+ Create new user</Button>
          <table className="contentTable">
            {this.TableHeader()}
            {this.state.tableBody}
          </table>
        </div>
      );
    }
}