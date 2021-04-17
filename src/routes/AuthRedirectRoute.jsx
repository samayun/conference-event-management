import { useLocation } from 'react-router';
import ENDPOINT from './endpoints';
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';

const AuthRedirectRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: ENDPOINT.DASHBOARD } };
  return (

    // Show the component only when the user is not logged in
    // Otherwise, redirect the user to previous page or / page
    <Route {...rest} render={props => (
      !currentUser.email ?
        <Component {...props} />
        : <Redirect to={from} />
    )} />
  );
};
export default AuthRedirectRoute