import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';
import ConstructionImage from '../../assets/95406ac9-a21e-4fe3-8c5c-324b4a611861.jpeg'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// import ConstructionIcon from '@mui/icons-material/Construction';

export default function TransitionAlerts() {
const [open, setOpen] = React.useState(true);
const Image = styled('img')({
    width: '100%',
  });

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert severity='info' color='warning'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        <AlertTitle>
                            {/* <ConstructionIcon fontSize="inherit" /> */}
                            Construction Ahead
                            {/* <ConstructionIcon fontSize="inherit" /> */}
                        </AlertTitle>
                        It seems that you have entered a construction site.
                    </Alert>
                </Collapse>
            </Box>
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
                    <Image src={ConstructionImage} alt="An image of a Construction site"/>
                </Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px' }}>
                <Button variant="contained" component={Link} to="/">Go Home</Button>
            </div>
        </div>
        
    );
}