import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import useSWR from 'swr'
import { getNutrients } from '../../../api/foodApi'
import PropTypes from 'prop-types'
import NutritionRow from './NutritionRow'
import Grid from '@mui/material/Grid'

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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
            
            }}>
                <Typography mb={1} variant="h4" sx={{fontWeight: 'bold'}}>Nutrition facts</Typography>
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
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={4} mt={2} mb={2}>
                            <Typography variant="h5" sx={{fontWeight: 'bold'}}>Value</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5" align="right" sx={{fontWeight: 'bold'}}>/100g</Typography>   
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5" align="right" sx={{fontWeight: 'bold'}}>Daily value %</Typography>
                        </Grid>
                    </Grid>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.CA} daily={per100Data?.totalDaily.CA}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.CHOCDF} daily={per100Data?.totalDaily.CHOCDF}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.CHOLE} daily={per100Data?.totalDaily.CHOLE}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.ENERC_KCAL} daily={per100Data?.totalDaily.ENERC_KCAL}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FAMS} daily={per100Data?.totalDaily.FAMS}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FAPU} daily={per100Data?.totalDaily.FAPU}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FASAT} daily={per100Data?.totalDaily.FASAT}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FAT} daily={per100Data?.totalDaily.FAT}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FIBTG} daily={per100Data?.totalDaily.FIBTG}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FOLAC} daily={per100Data?.totalDaily.FOLAC}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FOLDFE} daily={per100Data?.totalDaily.FOLDFE}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.FOLFD} daily={per100Data?.totalDaily.FOLFD}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.K} daily={per100Data?.totalDaily.K}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.NA} daily={per100Data?.totalDaily.NA}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.NIA} daily={per100Data?.totalDaily.NIA}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.P} daily={per100Data?.totalDaily.P}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.PROCNT} daily={per100Data?.totalDaily.PROCNT}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.RIBF} daily={per100Data?.totalDaily.RIBF}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.SUGAR} daily={per100Data?.totalDaily.SUGAR}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.THIA} daily={per100Data?.totalDaily.THIA}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.TOCPHA} daily={per100Data?.totalDaily.TOCPHA}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.VITA_RAE} daily={per100Data?.totalDaily.VITA_RAE}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.VITB6A} daily={per100Data?.totalDaily.VITB6A}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.VITB12} daily={per100Data?.totalDaily.VITB12}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.VITC} daily={per100Data?.totalDaily.VITC}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.VITD} daily={per100Data?.totalDaily.VITD}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.VITK1} daily={per100Data?.totalDaily.VITK1}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.WATER} daily={per100Data?.totalDaily.WATER}/>
                    <NutritionRow loading={!per100Data} total={per100Data?.totalNutrients.ZN} daily={per100Data?.totalDaily.ZN}/>


            </Box>
        </>
        
    )
}

NutriTable.propTypes = {
    item: PropTypes.object,
  };

export default NutriTable;