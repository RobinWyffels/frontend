import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.edamam.com/api/food-database/v2/',
});

const FOOD_APP_ID = import.meta.env.VITE_API_ID;
const FOOD_APP_KEY = import.meta.env.VITE_API_KEY;

// Variable to store the next link for pagination
let nextLink = null;

// Function to search food in the food database
export const searchFood = async (ingr) => {
  try {
    const response = await api.get(
      `parser?app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}&ingr=${ingr}&nutrition-type=cooking`
    );
    // console.log("raw response", response.data);

    if (response.data.hints.length === 0) {
      throw new Error('No food found for the given ingredient');
    }

    // Get the next link for pagination
    nextLink = response.data._links?.next?.href;
    
    return response.data.hints;
    
  } catch (error) {
    console.error('Error searching food database:', error);
    throw error;
  }
};

export const isLastPage = () => {
  return nextLink ? false : true;
};  

// Function to fetch the next page of data
export const fetchNextData = async () => {
  if (!nextLink) {
    throw new Error('No next page link available');
  }

  try {

    const response = await api.get(nextLink);
    // console.log("raw response", response.data);


    // Update the next link with the new link if available
    nextLink = response.data._links?.next?.href;

    // Determine if we've reached the end of the pages
    const LastPage = nextLink ? false : true;

    return {
      hints: response.data.hints,
      LastPage: LastPage
    };
  } catch (error) {
    console.error('Error fetching next page:', error);
    throw error;
  }
};

// Function to get the nutrients of a food item
export const getNutrients = async (food) => {
  // food is a map with the foodId and measureURI and quantity
  const foodId = food.id;
  const measureURI = food.uri;
  const quantity = food.quantity;
  try {
    const response = await api.post(
      `nutrients?app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}`,
      {
        "ingredients": [
          {
            "quantity": quantity,
            "measureURI": `${measureURI}`,
            "foodId": `${foodId}`
          }
        ]
      }
    );


    return response.data;
  } catch (error) {
    console.error('Error getting nutrients:', error);
    return null;
  }
};

// api.interceptors.request.use((config) => {
//   // Log the headers of the outgoing request
//   console.log('Request body:', config.data);

//   // Important: return the config or the request will be blocked
//   return config;
// });

