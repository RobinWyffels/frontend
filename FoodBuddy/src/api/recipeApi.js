import axios from 'axios';

const RECIPE_APP_ID = "65c070d8";
const RECIPE_APP_KEY = "da3d683281568bc556ba8ed336ce133a";

const BASE_URL = 'https://api.edamam.com/api/';

// Search recipes
const searchRecipes = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}recipes/v2?q=${query}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`
    );
    return response.data.hits;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export default searchRecipes;

