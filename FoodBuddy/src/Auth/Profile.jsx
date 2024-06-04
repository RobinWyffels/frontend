// import { withAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Logout from "./Logout";


function Profile() {
    

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            // width: '100vw',
            textAlign: 'center',
        
        }}>
            <Typography variant="h1" color="initial">Welcome to FoodBuddy!</Typography>
            <Typography variant="h4" color="initial">Feast on Facts</Typography>
            <Typography mt={2} mb={2} variant="body1" color="initial">try our food info and meny more features now for free!</Typography>
            <Logout></Logout>
        </Box>
    );
}

export default Profile;