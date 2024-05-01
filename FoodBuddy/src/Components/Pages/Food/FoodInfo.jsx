import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardList from './CardList';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from './SkeletonsLoader';
import Pagination from '@mui/material/Pagination';
import useSWR from 'swr';
import { searchFood} from '../../../api/foodApi';
import NoFoodFound from './NoFoodFound';

function FoodForm(){

    //variables
    const [food, setFood] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //api call
    const { data: response, error: error } = useSWR(food, searchFood);

    //handlers 
    //#region
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        setFood(searchTerm)
        setIsLoading(true);
    }
    // #endregion

    // react hooks
    //#region
    //loadsetter
    useEffect(() => {
        if(response){
            setIsLoading(false);
        }
    }, [response])


    //#endregion

    return (
        <Box style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <Typography variant="h4">
                Search for any food item, brand or product
            </Typography>

            <form  
                style={{ 
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
                    onChange={handleInputChange}
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
                <Box style={{ marginTop: '1%' }}>
                    {isLoading ?  <Loader/> : 
                    <Box style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        {response && <CardList response={response} />}
                        <Pagination style={{
                            marginBlock: '3%',
                            }} />
                    </Box>
                    }
                </Box>
            )}
        </Box>
    );
}

export default FoodForm;