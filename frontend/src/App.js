import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import { PrivateRoute } from './_helpers/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, FormControl, Dropdown } from 'react-bootstrap';
import './App.css';


import Login from "./login.js";
import SignUp from "./signup.js";
import ResetPassword from "./resetPassword.js";
import Dashboard from "./dashboard.js";
import Search from "./components/Search"
import ReportIncident from "./reportIncident.js"
import EditUser from "./components/EditUser"
import ListUsers from "./components/ListUsers"
import CreateCategory from "./components/CreateCategory"
import ListCategories from "./components/ListCategories"
import LogOut from "./components/LogOut"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {query: '', redirect: ''};
    }

	handleQuery = (event) => {
	    this.setState({query: event.target.value});
	}
	
	handleSearch = (event) => {
		if (this.state.query) {
		    this.setState({redirect: "/search/"+ event +"/"+ this.state.query});
		}
	}
	
	renderRedirect = () => {
		if(this.state.redirect){
		  	return <Redirect to={this.state.redirect}></Redirect>
		}
	}	
	
	render () {
		return (
			<Router>
	        {this.renderRedirect()}
				<div className="App">
					<Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-light fixed-top justify-content-between">
					  <Navbar.Brand href="/">
					  	<img src="/logo192.png" width="30" height="30" className="d-inline-block align-top" /> 
					  	Issue Tracking System
					  </Navbar.Brand>
					  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
					  <Navbar.Collapse id="responsive-navbar-nav">
					    <Nav className="mx-auto"> 
							{localStorage.userId &&
								<React.Fragment>
					        		<FormControl type="text" name="query" placeholder="Search" className="mr-sm-2" onChange={this.handleQuery}/>
					        		<Dropdown onSelect={this.handleSearch}>
									  <Dropdown.Toggle variant="success" id="dropdown-basic">
									    Search
									  </Dropdown.Toggle>

									  <Dropdown.Menu>
									    <Dropdown.Item eventKey="title">Title</Dropdown.Item>
									    <Dropdown.Item eventKey="category">Category</Dropdown.Item>
									    <Dropdown.Item eventKey="contact">Contact</Dropdown.Item>
									  </Dropdown.Menu>
									</Dropdown>
								</React.Fragment>
							}
					    </Nav>
					    <Nav>
							{localStorage.userId === undefined && 
								<React.Fragment>
									<Nav.Link href="/sign-in">Login</Nav.Link>
									<Nav.Link href="/sign-up">Sign up</Nav.Link>
								</React.Fragment>
							}
					        {localStorage.userId &&
								<React.Fragment>
							        <Nav.Link href="/reportIncident" active>Create Incident</Nav.Link>
		      					    <NavDropdown title={localStorage.userName} id="collasible-nav-dropdown-1" alignRight>
								        <NavDropdown.Item>Role: {localStorage.userRole}</NavDropdown.Item>
								        <NavDropdown.Divider />
								        <NavDropdown.Item href="/LogOut">LogOut</NavDropdown.Item>
								    </NavDropdown>
								</React.Fragment>
							}  
					        {localStorage.userId && localStorage.userRole === 'admin' &&
								<React.Fragment>
		      					    <NavDropdown title="Settings" id="collasible-nav-dropdown-2" alignRight>
								        <NavDropdown.Item href="/EditUser">Edit User</NavDropdown.Item>
								        <NavDropdown.Item href="/ListUsers">List Users</NavDropdown.Item>
								        <NavDropdown.Item href="/CreateCategory">Create Category</NavDropdown.Item>
								        <NavDropdown.Item href="/ListCategories">List Categories</NavDropdown.Item>
								        <NavDropdown.Item href="/Reports">Reports</NavDropdown.Item>
								    </NavDropdown>
								</React.Fragment>
							} 
					    </Nav>
					  </Navbar.Collapse>
					</Navbar>
					<div className="auth-wrapper">
					<div className="auth-inner">
						<Switch>
						<Route path="/sign-in" component={Login} />
						<Route path="/sign-up" component={SignUp} />
						<Route path="/LogOut" component={LogOut} />
						<Route exact path='/reset-password' component={ResetPassword} />
						<PrivateRoute exact path='/' component={Dashboard} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/search/:scope/:query" component={Dashboard} />
						<PrivateRoute path="/reportIncident/:id" roles={['admin', 'employee', 'customer']} component={ReportIncident} />
						<PrivateRoute path="/EditUser/:id" roles={['admin']} component={EditUser} />
						<PrivateRoute path="/ListUsers" roles={['admin']} component={ListUsers} />
						<PrivateRoute path="/CreateCategory" roles={['admin']} component={CreateCategory} />
						<PrivateRoute path="/ListCategories" roles={['admin']} component={ListCategories} />
						{/*
						//<PrivateRoute path="/Reports" roles={['admin']} component={Reports} />
						*/}
						</Switch>
					</div>
					</div>
				</div>
			</Router>
		);
	}
}