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
import { searchFood, fetchNextData, isLastPage} from '../../../api/foodApi';
import NoFoodFound from './NoFoodFound';

function FoodForm(){
    //variables
    //#region 
    //Searchvariables
    const [food, setFood] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    //pagination variables
    const [numberOfPages, setNumberOfPages] = useState(2);
    // const [disableArrows, setDisableArrows] = useState(false);
    const [page, setPage] = useState(1); //current page

    //api call
    const {data: response, error: error, isValidating} = useSWR(food, searchFood);

    //responseDictionary
    const [responseDictionary, setResponseDictionary] = useState(new Map());
    //#endregion

    //handlers 
    //#region
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        setFood(searchTerm)
        // setIsLoading(true);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        
    }
    // #endregion

    // useEffects
    //#region
    //loadsetter
    useEffect(() => {
        const checkLastPage = async () => {
            const isEnd = isLastPage();
            if (isEnd) {
                setNumberOfPages(1);
            }else{
                setNumberOfPages(2);
            }
        }
        
        if(response){
            // setIsLoading(false);
            setResponseDictionary(prevMap => {
                prevMap.clear();
                return new Map(prevMap.set(1, response));
            });
            setPage(1);
            checkLastPage();
        }
    }, [response])

    useEffect(() => {
        if(page == numberOfPages){
            // setIsLoading(true);
            //fetch next page and add to response array
           const fetchData = async () => {
                try {
                    const {hints: nextPageData, LastPage} = await fetchNextData();
                    setResponseDictionary(prevMap => new Map(prevMap.set(page, nextPageData)));
                    
                    // setIsLoading(false);
                    if(!LastPage){
                        setNumberOfPages(numberOfPages + 1);
                    }
                }catch(error){
                    return(null);//TODO: handle error
                }
            }
            fetchData();
            
        }
    },[page, numberOfPages])
    //#endregion
    //debug useEffect for logging

    useEffect(() => {
        console.log('data:', responseDictionary);
    }, [responseDictionary]);

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
                    disabled={isValidating}
                >
                    {isValidating ? <CircularProgress size={24} /> : 'Fetch Food'}
                </Button> 
            </form>

            <Typography variant="h4">
                Response:
            </Typography>

            {error ? <NoFoodFound /> : (
                <Box style={{ marginTop: '1%' }}>
                    {isValidating ?  <Loader/> : 
                    <Box style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                        {response && <>
                            <CardList response={responseDictionary.get(page)} />
                            <Pagination count={numberOfPages} style={{marginBlock: '3%'}} size="large" page={page} onChange={ handlePageChange} />
                            {/* add to pagination that arrows get disabled when boolean DisableArrows == true*/}
                        </>}
                        
                    </Box>
                    }
                </Box>
            )}
        </Box>
    );
}

export default FoodForm;