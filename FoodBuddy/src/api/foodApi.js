import axios from 'axios';


const FOOD_APP_ID = "45be9297";
const FOOD_APP_KEY = "c3ca97f64d4e593ddd79f064eb855fba";

const searchFood = async (query) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?q=${query}&app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}`
    );
    return response.data.hints;
  } catch (error) {
    console.error('Error searching food database:', error);
    return [];
  }
};

export default searchFood;
