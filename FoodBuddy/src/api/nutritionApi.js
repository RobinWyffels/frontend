import axios from 'axios';

const NUTRITION_APP_ID = "eddf8eef";
const NUTRITION_APP_KEY = "278ca901fd7fc10874d2b2661a363711";

const analyzeNutrition = async (ingredients) => {
  try {
    const response = await axios.post(
      'https://api.edamam.com/api/nutrition-details',
      { ingredients },
      {
        params: {
          app_id: NUTRITION_APP_ID,
          app_key: NUTRITION_APP_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error analyzing nutrition:', error);
    return null;
  }
};

export default analyzeNutrition;
