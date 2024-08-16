import { withAuthenticationRequired } from "@auth0/auth0-react";
import PropTypes from 'prop-types';

const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div></div>
    ),
  });

  return <Component />;
};

AuthenticationGuard.propTypes = {
    component: PropTypes.node.isRequired
}

export default AuthenticationGuard;
 