import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button'

function LogoutButton() {
  const { logout } = useAuth0();

  return <Button onClick={() => logout({ returnTo: window.location.origin })} size='large' variant="contained" color="primary">
  Log Out
</Button>
}

export default LogoutButton;