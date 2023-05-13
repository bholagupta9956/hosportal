// This is the public Route ;

import React from 'react';
import {Route , Redirect} from "react-router-dom"


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const users = localStorage.getItem("adminUsersData");
  const usersData = JSON.parse(users);
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            usersData ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute