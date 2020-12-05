import React, { Component } from "react";
import { Redirect } from 'react-router';
import { apiClient } from '../_helpers/axios';

export default class IncidentList extends Component {
  constructor(props){
    super(props);
    this.state = {email: '', password: '', loginSuccessful: 0};
  }

  //execute when component is loaded/refreshed
  componentDidMount() {
    //connect to api server and get a list of tickets
    apiClient.post('/tickets')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        localStorage.setItem('token', 'asdfasdf24t2');
        localStorage.setItem('user', {_id: '234234', name: "Nam Nam", role: "admin"});

        console.log('always executed');
      });    
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const requestPayload = { email: this.state.email, password: this.state.password }

    apiClient.get('/ticket/view', requestPayload)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        localStorage.setItem('token', 'asdfasdf24t2');
        localStorage.setItem('user', {_id: '234234', name: "Nam Nam", role: "admin"});

        console.log('always executed');
      });

    event.preventDefault();
  }

  render() {
    // Login is successful, so we should have the homepage/dashboard
    if (this.state.loginSuccessful){
      return <Redirect to = '/dashboard'/>
    } else {
      const data = [
        {"id":1,"first_name":"Herold","last_name":"Hardwich","email":"hhardwich0@geocities.jp","gender":"Male","ip_address":"131.149.218.73"},
        {"id":2,"first_name":"Martelle","last_name":"Peddowe","email":"mpeddowe1@feedburner.com","gender":"Female","ip_address":"249.160.225.74"},
        {"id":3,"first_name":"Devan","last_name":"Foulstone","email":"dfoulstone2@opera.com","gender":"Female","ip_address":"28.60.122.122"},
        {"id":4,"first_name":"Rice","last_name":"Halsey","email":"rhalsey3@goo.gl","gender":"Male","ip_address":"49.93.93.32"},
        {"id":5,"first_name":"Corrina","last_name":"Fitzer","email":"cfitzer4@harvard.edu","gender":"Female","ip_address":"54.248.51.249"},
        {"id":6,"first_name":"Kermy","last_name":"Bett","email":"kbett5@wufoo.com","gender":"Male","ip_address":"43.3.243.27"},
        {"id":7,"first_name":"Doroteya","last_name":"Kingh","email":"dkingh6@ucla.edu","gender":"Female","ip_address":"147.151.8.68"},
        {"id":8,"first_name":"Obed","last_name":"Iacovino","email":"oiacovino7@phpbb.com","gender":"Male","ip_address":"196.237.176.255"},
        {"id":9,"first_name":"Kelcy","last_name":"Crowhurst","email":"kcrowhurst8@earthlink.net","gender":"Female","ip_address":"133.118.121.242"},
        {"id":10,"first_name":"Lorena","last_name":"Charlot","email":"lcharlot9@mozilla.org","gender":"Female","ip_address":"37.66.237.110"},
        {"id":11,"first_name":"Iormina","last_name":"Falcus","email":"ifalcusa@eventbrite.com","gender":"Female","ip_address":"37.178.65.32"},
        {"id":12,"first_name":"Nathalie","last_name":"Joderli","email":"njoderlib@i2i.jp","gender":"Female","ip_address":"222.244.240.186"},
        {"id":13,"first_name":"Juan","last_name":"Cranmer","email":"jcranmerc@paginegialle.it","gender":"Male","ip_address":"10.174.5.52"},
        {"id":14,"first_name":"Ricoriki","last_name":"O'Kynsillaghe","email":"rokynsillaghed@tiny.cc","gender":"Male","ip_address":"125.250.102.200"},
        {"id":15,"first_name":"Ky","last_name":"Batsford","email":"kbatsforde@simplemachines.org","gender":"Male","ip_address":"10.78.70.171"}
      ];

      const rows = [
        { title: "sdfasf", data: "id" },
        { title: "First name", data: "first_name" },
        { title: 'Last Name', data: "first_name" },
        { title: 'Email', data: "first_name" },
        { title: "Gender", data: "gender" },
        { title: "IP address", data: "ip_address" },
      ];
      
      this.items = rows.map((item) =>
          <tr><td>{item.title}</td><td>{item.data}</td></tr>
      );

      return (
        <table>
        {this.items}
        </table>
      );


    }
  } 
}
