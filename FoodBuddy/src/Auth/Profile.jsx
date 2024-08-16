import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Logout from "./Logout";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';

const LargeAvatar = styled(Avatar)({
  width: 180,
  height: 180,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledBox = styled(Box)({
  display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        // width: '100vw',
        textAlign: "center",
});

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <StyledBox
    >
      {isAuthenticated && (
        <div>
          <LargeAvatar src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Logout></Logout>
        </div>
      )}
    </StyledBox>
  );
}

export default Profile;
