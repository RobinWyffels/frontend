import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getNutrients } from '../../../api/foodApi';
import { useEffect } from 'react';



function FoodDetails() {
  const { id } = useParams();
  const URI = localStorage.getItem('measureURI');
  //localStorage.removeItem('measureURI');

  console.log('Food ID:', id);
  console.log('Measure URI:', URI);

 const { data, error } = useSWR([id, URI], getNutrients, {
    onSuccess: () => {
      localStorage.removeItem('measureURI');
    }
  });

  
  useEffect(() => {
    if (error) {
      console.error('Error fetching food details:', error);
    } else if (data) {
      console.log('Food details:', data);
    }
  }, [data, error]);

}

export default FoodDetails;

