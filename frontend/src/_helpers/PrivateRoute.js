import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        if (!localStorage.userId) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/sign-in', state: { from: props.location, message: 'Please sign in!' } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(localStorage.userRole) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/', state: { message: 'You do not have permission to access that page!' } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)