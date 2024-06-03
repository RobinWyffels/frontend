import { useState } from 'react';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import useSWR from 'swr'
import { getNutrients } from '../../../api/foodApi'
import PropTypes from 'prop-types'
import NutritionRow from './NutritionRow'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from "@mui/material/Input";




function NutriTableSpecial({ item }){
    // TODO get uri from dropdown menu instead of finding gram uri

    // find uri for gram
    const servingIndex = item.uri.findIndex(uri => uri.label === "Serving");
    const [selectedUri, setSelectedUri] = useState(servingIndex);
    // set variables 
    const [itemInfo, setItemInfo] = useState({
        id: item.id,
        uri: item.uri[servingIndex].uri,
        quantity: 1
    });
    const setUri = (event) => {
        setSelectedUri(event.target.value);
        setItemInfo({
            ...itemInfo,
            uri: item.uri[event.target.value].uri
            
        });
    };
    const setQuantity = (event) => {
        setItemInfo({
            ...itemInfo,
            quantity: Number(event.target.value)
        });
    };
    // get data 
    const { data: itemData } = useSWR(itemInfo, getNutrients);

    return(
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
            
            }}>
                <Typography mb={1} variant="h4" sx={{fontWeight: 'bold'}}>Nutrition facts</Typography>
                <Divider  aria-hidden="true" sx={{borderWidth: 2.5 , borderColor: "black"}} flexItem/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        m: 4
                    }}>
                        <Typography variant="h6" color="initial" sx={{fontWeight: 'bold'}}>Quantity:</Typography>
                        <Input sx={{ ml: 2, width: 60}}
                            id="value"
                            type="number"
                            inputProps={{ min: "1" }}
                            defaultValue={1}
                            onChange={setQuantity}
                        />
                        <Select
                            variant="standard"
                            value={selectedUri}
                            onChange={setUri}>
                            {item.uri.map((uri, index) => (
                                <MenuItem key={index} value={index}>{uri.label}</MenuItem>
                            ))}
                        </Select>
                        
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
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.CA} daily={itemData?.totalDaily.CA}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.CHOCDF} daily={itemData?.totalDaily.CHOCDF}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.CHOLE} daily={itemData?.totalDaily.CHOLE}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.ENERC_KCAL} daily={itemData?.totalDaily.ENERC_KCAL}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FAMS} daily={itemData?.totalDaily.FAMS}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FAPU} daily={itemData?.totalDaily.FAPU}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FASAT} daily={itemData?.totalDaily.FASAT}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FAT} daily={itemData?.totalDaily.FAT}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FIBTG} daily={itemData?.totalDaily.FIBTG}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FOLAC} daily={itemData?.totalDaily.FOLAC}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FOLDFE} daily={itemData?.totalDaily.FOLDFE}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.FOLFD} daily={itemData?.totalDaily.FOLFD}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.K} daily={itemData?.totalDaily.K}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.NA} daily={itemData?.totalDaily.NA}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.NIA} daily={itemData?.totalDaily.NIA}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.P} daily={itemData?.totalDaily.P}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.PROCNT} daily={itemData?.totalDaily.PROCNT}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.RIBF} daily={itemData?.totalDaily.RIBF}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.SUGAR} daily={itemData?.totalDaily.SUGAR}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.THIA} daily={itemData?.totalDaily.THIA}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.TOCPHA} daily={itemData?.totalDaily.TOCPHA}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.VITA_RAE} daily={itemData?.totalDaily.VITA_RAE}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.VITB6A} daily={itemData?.totalDaily.VITB6A}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.VITB12} daily={itemData?.totalDaily.VITB12}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.VITC} daily={itemData?.totalDaily.VITC}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.VITD} daily={itemData?.totalDaily.VITD}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.VITK1} daily={itemData?.totalDaily.VITK1}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.WATER} daily={itemData?.totalDaily.WATER}/>
                    <NutritionRow loading={!itemData} total={itemData?.totalNutrients.ZN} daily={itemData?.totalDaily.ZN}/>


            </Box>
        </>
        
    )
}

NutriTableSpecial.propTypes = {
    item: PropTypes.object,
  };

export default NutriTableSpecial;