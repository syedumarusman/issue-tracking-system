import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class ListCategories extends Component {
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
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }
  TableItem(item) {
    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>
          <button value={item._id} onClick={this.deleteHandler} className="btn btn-gradient red mini text-white">Delete</button>
        </td>
      </tr>
    )
  }

  async TableBody () {
    //test data, this should be provided by backend
    const incidents = [
        { _id: 1, name: "Asf Jsf"},
        { _id: 2, name: "Asf Jsf" },
        { _id: 3, name: "Asf Jsf" },
    ]; 
    //const response = await apiClient.get('/incident/');
    //const incidents = response.data.data;
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
    alert(event.target.value);
    const response = await apiClient.delete('/category', { data: { _id: event.target.value } } );
  }

  setRedirect = () => {
    this.setState({redirect: '/anywhere'})
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
          <h3>Categories</h3>
          <table className="contentTable">
            {this.TableHeader()}
            {this.state.tableBody}
          </table>
        </div>
      );
    }
}