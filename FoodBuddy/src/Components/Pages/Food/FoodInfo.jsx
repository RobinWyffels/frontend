import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FoodCard from './FoodCard';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchNextData } from '../../../api/foodApi';
import Loader from './SkeletonsLoader';
import useSWR from 'swr';
import { searchFood } from '../../../api/foodApi';
import NoFoodFound from './NoFoodFound';

// implement pagination instead of the load more button
// for this make the logic so a page gets a number. and each number gets linked to the url to fetch the data for that page.
// store this and load the cards according to the page number and api link for that page number.

const fetcher = (ingr) => searchFood(ingr);

function FoodForm() {
    //Variables
    const [food, setFood] = useState(null);
    const [nextData, setNextData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //API call
    const { data: response, error} = useSWR(food, fetcher);
    
    //handle functions
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };

    const handleSearch = () => {
        setFood(searchTerm);
        setIsLoading(true);
        
    };

    const handleFetchNextData = async () => {
        const newData = await fetchNextData();
        setNextData(newData);
      };

    useEffect(() => {
        if (response || error) {
            setIsLoading(false);
        }
    }, [response, error]);

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

            {error ? <NoFoodFound /> : (
                <Box>
                    <Grid container rowSpacing={{ xs:3, md:4 }}>
                    {isLoading ?  <Loader/> : (
                        response && response.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}  style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                        }}>
                        <FoodCard 
                            label={item.food.label} 
                            image={item.food.image} 
                            id={item.food.foodId}
                            measureURI={item.measures[0].uri}
                            nutrients={item.food.nutrients}
                        />
                        </Grid>
                    )))}
                    </Grid>

                    {response && response.length > 0 && (
                    <Button onClick={handleFetchNextData}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size='large'
                    disabled={isLoading}
                    >
                    Load More
                    </Button>
                    )}

                    {nextData.length > 0 && (
                    <Grid container rowSpacing={{ xs:3, md:4 }}>
                        {nextData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}  style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                        }}>
                        <FoodCard 
                            label={item.food.label} 
                            image={item.food.image} 
                            id={item.food.foodId}
                            measureURI={item.measures[0].uri}
                            nutrients={item.food.nutrients}
                        />
                        </Grid>
                        ))}
                    </Grid>
                    )}
                </Box>
            )}




        </Box>
      );
    
}

export default FoodForm;