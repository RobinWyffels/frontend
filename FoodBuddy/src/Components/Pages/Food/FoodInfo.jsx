import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FoodCard from './FoodCard';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useSWR from 'swr';
import searchFood from '../../../api/foodApi';

const theme = createTheme();

const fetcher = (ingr) => searchFood(ingr);

function FoodForm() {
    const [food, setFood] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data: response } = useSWR(food, fetcher);
    const [isLoading, setIsLoading] = useState(false);

    const matchesSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'));

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };

    const handleSearch = () => {
        setFood(searchTerm);
        setIsLoading(true);
    };

    useEffect(() => {
        if (response) {
            setIsLoading(false);
        }
    }, [response]);

    let numSkeletons;
    if (matchesLarge) {
        numSkeletons = 18;
    } else if (matchesMedium) {
        numSkeletons = 12;
    } else if (matchesSmall) {
        numSkeletons = 5;
    }

    return (
        <Box style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <form style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '6%',
                marginBottom: '1%',
                }}>   
                <TextField
                    id="food"
                    label="Food"
                    value={searchTerm}
                    onChange={handleChange}
                    variant="outlined"
                    size='small'
                />
                <Button onClick={handleSearch}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size='large'
                    style={{ marginLeft: '10px' }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Fetch Food'}
                </Button> 
            </form>
            
            <Typography variant="h4">
                Response:
            </Typography>

            <Grid container rowSpacing={{ xs:3, md:4 }}>
                {isLoading ? (
                    // Display multiple skeleton cards while loading
                    Array.from(new Array(numSkeletons)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}>
                        <Skeleton variant="text" animation="wave" width={250} height={80} />
                        <Skeleton variant="rounded" animation="wave" width={250} height={115} />
                    </Grid>
                    ))
                ) : (
                // Display the actual cards when not loading
                response && response.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                    }}>
                    <FoodCard 
                        label={item.food.label} 
                        image={item.food.image} 
                        nutrients={item.food.nutrients}
                    />
                    </Grid>
                ))
                )}
            </Grid>
        </Box>
      );
    
}

export default function App() {
    return (
      <ThemeProvider theme={theme}>
        <FoodForm />
      </ThemeProvider>
    );
  }