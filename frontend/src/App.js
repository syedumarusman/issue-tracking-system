import React from 'react';
import '../node_modules/mdbreact/dist/css/mdb.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from './_helpers/PrivateRoute';

import Login from "./login.js";
import SignUp from "./signup.js";
import ResetPassword from "./resetPassword.js";
import Dashboard from "./dashboard.js";
import ReportIncident from "./reportIncident.js"

function App() {
	console.log("Test"+ localStorage.userId);
	return (<Router>
				<div className="App">
					<nav className="navbar navbar-expand-lg navbar-light fixed-top">
					<div className="container">
						<Link className="navbar-brand" to={"/sign-in"}>Issue Tracking System</Link>
						<div className="collapse navbar-collapse" id="navbarCollapser">
						<ul className="navbar-nav ml-auto">
							{localStorage.userId === undefined && 
								<React.Fragment>
									<li className="nav-item">
									<Link className="nav-link" to={"/sign-in"}>Login</Link>
									</li>
									<li className="nav-item">
									<Link className="nav-link" to={"/sign-up"}>Sign up</Link>
									</li>
								</React.Fragment>
							}
							{localStorage.userId &&
								<React.Fragment>
									<li className="nav-item">
										<Link className="nav-link" to={"/reportIncident"}>Create Incident</Link>
									</li>
									<li className="nav-item"> 
										<Link className="nav-link">{localStorage.userName} - {localStorage.userRole} </Link>
									</li>
								</React.Fragment>
							}
						</ul>
						</div>
					</div>
					</nav>

					<div className="auth-wrapper">
					<div className="auth-inner">
						<Switch>
						<Route exact path='/' component={Login} />
						<Route path="/sign-in" component={Login} />
						<Route path="/sign-up" component={SignUp} />
						<Route exact path='/reset-password' component={ResetPassword} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/reportIncident" roles={['customer']} component={ReportIncident} />
						</Switch>
					</div>
					</div>
				</div>
			</Router>
		    );
}

export default App;
