import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FoodCard from './FoodCard';
import PropTypes from 'prop-types';

function CardList({ response }) {
  if (!Array.isArray(response)) {
    console.error('response is not an array:', response);
    return null;
  }

  return (
    <Box>
        <Grid container rowSpacing={{ xs:3, md:4 }} sx={{ paddingInline: { xs: '0%', sm: '5%', lg: '10%', xl: '15%' }}}>
        {response.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={index}  style={{ 
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
    </Box>
  );
}

CardList.propTypes = {
    response: PropTypes.arrayOf(
      PropTypes.shape({
        food: PropTypes.shape({
          label: PropTypes.string,
          image: PropTypes.string,
          foodId: PropTypes.string,
          nutrients: PropTypes.object,
        }),
        measures: PropTypes.arrayOf(
          PropTypes.shape({
            uri: PropTypes.string,
          })
        ),
      })
    ),
  };

export default CardList;