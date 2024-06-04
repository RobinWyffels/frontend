import PropTypes from 'prop-types';

import { useAuth0 } from '@auth0/auth0-react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to="/login" />
  );
};

PrivateRoute.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  };

export default PrivateRoute;