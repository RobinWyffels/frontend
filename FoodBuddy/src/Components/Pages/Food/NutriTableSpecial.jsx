import { useState } from 'react';
import Box from '@mui/material/Box'
import useSWR from 'swr'
import { getNutrients } from '../../../api/foodApi'
import PropTypes from 'prop-types'
import NutritionRow from './NutritionRow'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from "@mui/material/Input";
import DeviderLight from '../../../StyledComponents/DeviderLight'
import DeviderBold from '../../../StyledComponents/DeviderBold'
import BoldTypography from '../../../StyledComponents/BoldTypography';
import TableCard from '../../../StyledComponents/TableCard';
import { styled } from '@mui/system';



const StyledRowBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4),
}));



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

    // Get the label of the selected MenuItem
    const selectedLabel = item.uri[selectedUri]?.label || '';

    // Extract keys from itemData?.totalNutrients and itemData?.totalDaily
    const nutrientKeys = itemData ? Object.keys(itemData.totalNutrients) : [];

    return(
        <>
            <TableCard>
                <BoldTypography mb={1} variant="h4">Nutrition facts</BoldTypography>
                <DeviderBold  aria-hidden="true" flexItem/>
                    <StyledRowBox>
                        <BoldTypography variant="h6" color="initial">Quantity:</BoldTypography>
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
                    </StyledRowBox>
                
                    <DeviderLight  aria-hidden="true" flexItem/>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={4} mt={2} mb={2}>
                            <BoldTypography variant="h5">Value</BoldTypography>
                        </Grid>
                        <Grid item xs={4}>
                            <BoldTypography variant="h5" align="right" >{itemInfo.quantity}{selectedLabel}</BoldTypography>   
                        </Grid>
                        <Grid item xs={4}>
                            <BoldTypography variant="h5" align="right" >Daily value %</BoldTypography>
                        </Grid>
                    </Grid>
                {nutrientKeys.map((key) => (
                <NutritionRow
                    key={key}
                    loading={!itemData}
                    total={itemData?.totalNutrients[key]}
                    daily={itemData?.totalDaily[key]}
                />
                ))}


            </TableCard>
        </>
        
    )
}

NutriTableSpecial.propTypes = {
    item: PropTypes.object,
  };

export default NutriTableSpecial;