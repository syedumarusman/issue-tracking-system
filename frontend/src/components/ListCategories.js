import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class ListCategories extends Component {
  constructor(props){
    super(props);
    this.state = {redirect: false, tableBody: null, showEmptyRow: false};
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

  emptyItem = () => {
    return (
      <tr>
        <td colSpan="2">
          No categories found.
        </td>
      </tr>
    );
  }

  async TableBody () {
    const response = await apiClient.get('/category/');
    const incidents = response.data.data;
    if (incidents.length === 0){
      this.setState({showEmptyRow: true})
      const tableItems = this.emptyItem();
      this.setState({tableBody: (
        <tbody>
          {tableItems}
        </tbody>
      )})
    } else{
      const tableItems = incidents.map((item) => this.TableItem(item));
      const tableHeader = this.TableHeader();
      this.setState({tableBody: (
        <tbody>
          {tableItems}
        </tbody>
      )})
    }
  }

  viewHandler(event) {

  }

  editHandler(event) {

  }
  
  async deleteHandler(event) {
    await apiClient.delete('/category/' + event.target.value).then((response) => {
      window.location.reload()
    });
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