import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NotFoundImage from '../../assets/404NotFound.png'
import { useLocation } from "react-router";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

export default function NotFound(){
  const {pathname} = useLocation();
  const Image = styled('img')({
    width: '100%',
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }}>
        <Typography variant="h4">
          It seems a little empty at {pathname}
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }}>
                <Box
                    sx={{
                        width: {
                            xs: '60%', // on mobile
                            sm: '40%', // on tablets and larger
                            md: '30%', // on small laptops
                        },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image src={NotFoundImage} alt="An image of a Construction site"/>
                </Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }}>
                <Button variant="contained" component={Link} to="/">Go Home</Button>
            </div>
    </div>
  )
}