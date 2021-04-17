import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';
import ENDPOINT from './endpoints';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  return (

    // Show the component only when the user is logged in
    // Otherwise, redirect the user to loginRoute
    <Route {...rest} render={props => (
      !!currentUser.email ?
        <Component {...props} />
        : <Redirect to={{
          pathname: ENDPOINT.LOGIN,
          state: { from: location }
        }} />
    )} />
  );
};
export default PrivateRoute