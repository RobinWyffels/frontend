import { Outlet } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  console.log("PrivateRoute isAuthen:", isAuthenticated)

  if (isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  loginWithRedirect();
  return null;
}