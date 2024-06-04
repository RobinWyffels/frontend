import LoginButton from "../../Auth/Login";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import backgroundImage from '../../assets/HomepageBackgroundDesktop.png';
import Button from '@mui/material/Button'


function Home() {
    const navigate = useNavigate();
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            // width: '100vw',
            textAlign: 'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'Cover',
            backgroundPosition: 'center',
        
        }}>
            <Typography variant="h1" color="initial">Welcome to FoodBuddy!</Typography>
            <Typography variant="h4" color="initial">Feast on Facts</Typography>
            <Typography mt={2} mb={2} variant="body1" color="initial">try our food info and meny more features now for free!</Typography>
            <Button onClick={() => navigate('/foodinfo')} size='large' variant="contained" color="primary" >
              Try now
            </Button >
            <Box mt={4}/>
            <LoginButton/>
            
        </Box>
    );
}

export default Home;