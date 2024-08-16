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

const StyledBox = styled(Box)({
    width: '100%',
  });

  
const StyledDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'30px'
  });

// const StyledImageBox = styled(Box)(({ theme }) => ({
// width: '60%', // default for mobile
// display: 'flex',
// justifyContent: 'center',
// alignItems: 'center',
// [theme.breakpoints.up('sm')]: {
//     width: '40%', // on tablets and larger
// },
// [theme.breakpoints.up('md')]: {
//     width: '30%', // on small laptops
// },
// }));

export default function TransitionAlerts() {
const [open, setOpen] = React.useState(true);
const Image = styled('img')({
    width: '100%',
  });

    return (
        <div>
            <StyledBox>
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
            </StyledBox>
            <StyledDiv>
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
            </StyledDiv>
            <StyledDiv>
                <Button variant="contained" component={Link} to="/">Go Home</Button>
            </StyledDiv>
        </div>
        
    );
}