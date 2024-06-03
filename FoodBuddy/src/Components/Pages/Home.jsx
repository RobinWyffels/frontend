import LoginButton from "../../Auth/Login";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import backgroundImage from '../../assets/HomepageBackgroundDesktop.png';


function Home() {
    return (
        // <div>
        //     <h1>Welcome to FoodBuddy!</h1>
        //     <p>Discover delicious recipes and connect with fellow food enthusiasts.
        //     Feast on Facts: Your Companion for Conscious Eating!
        //     </p>
        // </div>
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
            <LoginButton />
        </Box>
    );
}

export default Home;