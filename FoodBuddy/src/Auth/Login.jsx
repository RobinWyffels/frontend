import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()} size='large' variant="contained" color="primary">
    Log in
  </Button>
};

export default LoginButton;