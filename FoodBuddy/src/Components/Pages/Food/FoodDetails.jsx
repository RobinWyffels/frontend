import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getNutrients } from '../../../api/foodApi';
// import { useState } from 'react';
import NutriTable from './NutriTable';
import NutriTableSpecial from './NutriTableSpecial';
import Conversions from './Conversions';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';


function FoodDetails() {
  //#region
  const { id } = useParams();
  const item = JSON.parse(localStorage.getItem(`FoodCard${id}`));
  const image = item.image;
  const category = item.category;
  const food = {
    id: item.id,
  };
  // const [uriOptions, setUriOptions] = useState(localStorage.getItem(id).measures);
  
  
 
  // get uri options from foodcard, every food has different uri's
  // pass mesures as object trough to foodDetails, unpack and put into map called "uriDict" lable as key, and uri as value eg.(Serving: 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving').
  // populate other const "uriOptions" with lables of all uri's use uriOptions as options in autocomplete 
  // use uriDict.get(selection from uriOption) to setUri --> setURI(uriDict.get(selection from uriOption))

  //get image from foodcard
  //input type number for quantity

  const { data } = useSWR(food, getNutrients);

  const name = data?.ingredients[0].parsed[0].food;
  const healthLabels = data?.healthLabels.map(label => 
    label.charAt(0).toUpperCase() + label.slice(1).toLowerCase().replace(/_/g, ' ')
  ).join(', ');
  const dietLabels  = data?.dietLabels.map(label => 
    label.charAt(0).toUpperCase() + label.slice(1).toLowerCase().replace(/_/g, ' ')
  ).join(', ');
  const cautions  = data?.cautions.map(label => 
    label.charAt(0).toUpperCase() + label.slice(1).toLowerCase().replace(/_/g, ' ')
  ).join(', ');

  const visible = !!data?.ingredients[0]?.parsed[0]?.foodContentsLabel;
  let FoodContents;
  if (visible) {
    FoodContents = data.ingredients[0].parsed[0].foodContentsLabel.split(';')
    .map(str => str.trim().toLowerCase())
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(', ');
  }
  
  // console.log(healthLabels);
  //#endregion
  return (
    <Box sx={{marginInline: '5%',}}>
      <Box
        sx={{
          display:'flex', 
          flexDirection:"row",
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: '20px',
          paddingBottom: '20px',
        }}> 
        <Box 
          sx={{
            height: '220px',
            width: '220px',
            backgroundImage: `url(${image})`, //<-- insert correct image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '15px',
            marginRight: '50px',
          }}
        /> 
        
        <Typography variant='h3'>{name} </Typography>
      </Box>

      <Divider  aria-hidden="true" sx={{borderWidth: 1.5 , borderColor: "gray"}}/>
      <Typography mt={3} variant='h4'>Category: {category}</Typography>
      
      <Typography mt={2} variant='h6' hidden={healthLabels === ''}>Health claims:</Typography>
      <Typography variant='body1' hidden={healthLabels === ''}>{healthLabels}</Typography>

      <Typography mt={3} variant='h6' hidden={dietLabels === ''}>Diet labels:</Typography>
      <Typography variant='body1' hidden={dietLabels === ''}>{dietLabels}</Typography>

      <Typography mt={3} variant='h6' hidden={cautions === ''}>Cautions:</Typography>
      <Typography variant='body1' hidden={cautions === ''}>{cautions}</Typography>

      <Typography mt={3} variant='h6' hidden={!visible}>Contents:</Typography>
      <Typography variant='body1' hidden={!visible}>{FoodContents}</Typography>

      <Paper elevation={3} sx={{marginTop: 8}}>
        <NutriTable
          item={item}
        />
      </Paper>

      <Box sx={{height: 50}}/>

      <Paper elevation={3}>
        <NutriTableSpecial
          item={item}
        />
      </Paper>

      <Typography mt={2} variant='h5'>Conversions:</Typography>
      <Conversions/>
    </Box>
  );

}

export default FoodDetails;

