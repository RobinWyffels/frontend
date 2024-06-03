import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodCard({ label, id, nutrients, image, category, measures}) { 
  const { ENERC_KCAL, PROCNT, FAT, CHOCDF, FIBTG } = nutrients;

  const food = {
    label: label,
    id: id,
    uri: measures,
    image: image,
    category: category,
  }

  const handleClick = () => {
    localStorage.setItem(`FoodCard${id}`,JSON.stringify(food))
  }

    return (
        <Card sx={{ width: '250px', height: '200px'}}>
            <CardActionArea sx={{ width: '250px', height: '200px'}} 
            component={Link}
            to={`/foodNutrients/${id}`}
            onClick={handleClick}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Energy: {ENERC_KCAL} kcal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Protein: {PROCNT} g
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fat: {FAT} g
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Carbs: {CHOCDF} g
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fiber: {FIBTG} g
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
      );
}

FoodCard.propTypes = {
  label: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  measureURI: PropTypes.string,
  nutrients: PropTypes.shape({
    ENERC_KCAL: PropTypes.number,
    PROCNT: PropTypes.number,
    FAT: PropTypes.number,
    CHOCDF: PropTypes.number,
    FIBTG: PropTypes.number,
  }),
  category: PropTypes.string,
  measures: PropTypes.array,
};

export default FoodCard;