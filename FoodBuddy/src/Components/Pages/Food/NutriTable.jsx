import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useSWR from 'swr'
import { getNutrients } from '../../../api/foodApi'
import PropTypes from 'prop-types'
import NutritionRow from './NutritionRow'
import Grid from '@mui/material/Grid'
import DeviderLight from '../../../StyledComponents/DeviderLight'
import DeviderBold from '../../../StyledComponents/DeviderBold'
import BoldTypography from '../../../StyledComponents/BoldTypography';
import TableCard from '../../../StyledComponents/TableCard';
import { styled } from '@mui/system';

const StyledRowBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBlock: theme.spacing(2),
}));

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


    return(
        <>
            <TableCard>
                <BoldTypography mb={1} variant="h4">Nutrition facts</BoldTypography>
                <DeviderBold  aria-hidden="true" flexItem/>
                <StyledRowBox
                >
                    <Typography variant="h5" >Typical serving size:</Typography>  
                    <Typography variant="h5" >{serving?.totalWeight} g</Typography>  
                </StyledRowBox>
                    <DeviderLight  aria-hidden="true" flexItem/>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={4} mt={2} mb={2}>
                            <BoldTypography variant="h5">Value</BoldTypography>
                        </Grid>
                        <Grid item xs={4}>
                            <BoldTypography variant="h5" align="right">/100g</BoldTypography>   
                        </Grid>
                        <Grid item xs={4}>
                            <BoldTypography variant="h5" align="right">Daily value %</BoldTypography>
                        </Grid>
                    </Grid>
                {per100Data && Object.keys(per100Data.totalNutrients).map((key) => (
                    <NutritionRow 
                        key={key}
                        loading={!per100Data} 
                        total={per100Data.totalNutrients[key]} 
                        daily={per100Data.totalDaily[key]}
                    />
                ))}


            </TableCard>
        </>
        
    )
}

NutriTable.propTypes = {
    item: PropTypes.object,
  };

export default NutriTable;