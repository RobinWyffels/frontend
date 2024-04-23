import axios from 'axios';


const FOOD_APP_ID = "45be9297";
const FOOD_APP_KEY = "c3ca97f64d4e593ddd79f064eb855fba";

export const searchFood = async (ingr) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}&ingr=${ingr}&nutrition-type=cooking`
    );
    console.log("raw response", response.data);
    if (response.data.hints.length === 0) {
      throw new Error('No food found for the given ingredient');
    }
    return response.data.hints;
  } catch (error) {
    console.error('Error searching food database:', error);
    throw error;
  }
};

export const getNutrients = async (measureURI, foodId) => {
  try {
    const response = await axios.post(
      'https://api.edamam.com/api/food-database/v2/nutrients',
      {
        "ingredients": [
          {
            "quantity": 1,
            "measureURI": measureURI,
            "foodId": foodId
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'app_id': FOOD_APP_ID,
          'app_key': FOOD_APP_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting nutrients:', error);
    return null;
  }
};

