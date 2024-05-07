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

  // object doorgeven dat de 2 parameters bevat
  // unpack de 2 parameters in de api functie
  // measureURI hardcoden en in dropdown opties geven 
  // quantity doorgeven en optie geven aan user voor aan te passen

 const { data, error } = useSWR([id, 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving'], getNutrients, {
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

