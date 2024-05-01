import axios from 'axios';


const FOOD_APP_ID = "45be9297";
const FOOD_APP_KEY = "c3ca97f64d4e593ddd79f064eb855fba";

// Variable to store the next link for pagination
let nextLink = null;

// Function to search food in the food database
export const searchFood = async (ingr) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${FOOD_APP_ID}&app_key=${FOOD_APP_KEY}&ingr=${ingr}&nutrition-type=cooking`
    );
    console.log("raw response", response.data);

    if (response.data.hints.length === 0) {
      throw new Error('No food found for the given ingredient');
    }

    // Get the next link for pagination
    nextLink = response.data._links?.next?.href;
    return response.data.hints;
    // const LastPage = nextLink ? false : true;

    // return {
    //   hints: response.data.hints,
    //   LastPage: LastPage
    // };
  } catch (error) {
    console.error('Error searching food database:', error);
    throw error;
  }
};

// Function to fetch the next page of data
export const fetchNextData = async () => {
  if (!nextLink) {
    throw new Error('No next page link available');
  }

  try {
    const response = await axios.get(nextLink);
    //console.log("raw response", response.data);

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

