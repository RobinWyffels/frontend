import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import useSWR from 'swr'
import { getNutrients } from '../../../api/foodApi'
import PropTypes from 'prop-types'
import NutritionRow from './NutritionRow'

function NutriTable({ item }){
    const itemServing = {
        id: item.id,
        uri: item.uri[0].uri,
        quantity: 1
    };
    const { data: serving } = useSWR(itemServing, getNutrients);
    const gramUri = item.uri.findIndex(uri => uri.label === "Gram");
    const per100 ={
        id: item.id,
        uri: item.uri[gramUri].uri,
        quantity: 100
    };

    const { data: per100Data } = useSWR(per100, getNutrients);
    console.log("energie", per100Data?.totalNutrients.ENERC_KCAL);
    return(
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
            
            }}>
                <Typography mb={1} variant="h4" >Nutrition facts</Typography>
                <Divider  aria-hidden="true" sx={{borderWidth: 2.5 , borderColor: "black"}} flexItem/>
                <Box mt={2} mb={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'

                }}
                >
                    <Typography variant="h5" >Typical serving size:</Typography>  
                    <Typography variant="h5" >{serving?.totalWeight} g</Typography>  
                </Box>
                <Divider  aria-hidden="true" sx={{borderWidth: 1.5 , borderColor: "black"}} flexItem/>
                <NutritionRow total={per100Data?.totalNutrients.ENERC_KCAL}/>



            </Box>
        </>
        
    )
}

NutriTable.propTypes = {
    item: PropTypes.object,
  };

export default NutriTable;