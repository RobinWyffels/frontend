import axios from 'axios';


const FOOD_APP_ID = "45be9297";
const FOOD_APP_KEY = "c3ca97f64d4e593ddd79f064eb855fba";

const searchFood = async (ingr) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}&ingr=${ingr}&nutrition-type=cooking`
    );
    return response.data.hints;
  } catch (error) {
    console.error('Error searching food database:', error);
    return [];
  }
};

// const FoodLookup = async (foodId) => {
//   try {
//     const response = await axios.get(
//       `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}$foodId=${foodId}`
//     );
//     return ;
//   }
// }

export default searchFood;
// https://api.edamam.com/api/food-database/v2/parser?app_id=45be9297&app_key=c3ca97f64d4e593ddd79f064eb855fba&ingr=chocolate&nutrition-type=cooking
