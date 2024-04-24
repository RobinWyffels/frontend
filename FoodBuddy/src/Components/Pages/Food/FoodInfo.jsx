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
import { searchFood, fetchNextData} from '../../../api/foodApi';
import NoFoodFound from './NoFoodFound';

const fetcher = (ingr) => searchFood(ingr);

//TODO pagination is not working

function FoodForm() {
    //Variables
    const [food, setFood] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [nextPageData, setNextPageData] = useState(null);
    const [response, setResponse] = useState([]);

    //API call for search
    const { data: searchResponse, error: searchError } = useSWR(food, fetcher);

    //API call for pagination
    const { data: pageResponse, error: pageError } = useSWR(`page${page}`, () => fetchNextData(), {
        onSuccess: (data) => {
            localStorage.setItem(`page${page}`, JSON.stringify(data));
            setIsLoading(false);
        },
        onError: () => setIsLoading(false),
        });

    const handleSetPage = async (value) => {
        // Check if the data for the next page is already in localStorage
        const storedData = localStorage.getItem(`page${value}`);
        if (storedData) {
          // If it is, load it from localStorage
          setNextPageData(JSON.parse(storedData));
        } else {
          // If it's not, fetch the next data and store it in localStorage
          const data = await fetchNextData(value);
          localStorage.setItem(`page${value}`, JSON.stringify(data));
          setNextPageData(data);
        }
    
        // Update the page count
        setPage(value);
        };

// #region Handlers for searchterm input
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };

    const handleSearch = () => {
        setFood(searchTerm);
        setIsLoading(true);
        
    };
// #endregion


    useEffect(() => {
        if (searchResponse || searchError || pageResponse || pageError) {
            setIsLoading(false);
        }
    }, [searchResponse, searchError, pageResponse, pageError]);

    useEffect(() => {
        if (searchResponse) {
          setResponse(searchResponse);
        }
      }, [searchResponse]);

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

            {searchError || pageError ? <NoFoodFound /> : (
                <Box style={{ marginTop: '1%' }}>
                    {isLoading ?  <Loader/> : 
                    <Box style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        {/* currently bypassing pagination completely, searchresponse had to be response */}
                        <CardList response={searchResponse} />
                        <Pagination style={{
                            marginBlock: '3%',
                            }}
                            count={page}
                            color="primary"
                            hidden={response.length === 0}
                            onChange={(value) => handleSetPage(value)} />
                    </Box>
                    
                    }

                </Box>
            )}




        </Box>
      );
    
}

export default FoodForm;