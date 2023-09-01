import React, { useState } from 'react';

const Popup: React.FC = () => {
  const [locationData, setLocationData] = useState<{ city: string | null; country: string | null }>({
    city: null,
    country: null,
  });
 
  
const [loading,setLoading] = useState(false)


const handleClick = () => {
  if ('geolocation' in navigator) {
    
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.REACT_APP_API_KEY;
      

        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
        
        if (response.ok) {
          const data = await response.json();
          const { city, country } = data.results[0].components;

       
          setLocationData({ city, country });
        } else {

          console.error('Failed to fetch location data:', response.status);
          setLocationData({ city: 'Failed to fetch', country: 'Failed to fetch' });
        }
      } catch (error) {
  
        console.error('An error occurred while fetching location data:', error);
        setLocationData({ city: 'Failed to fetch', country: 'Failed to fetch' });
      } finally {
    
        setLoading(false);
      }
    });
  } else {
    setLocationData({ city: 'N/A', country: 'N/A' });
  }
};

  return (
    <div className="fixed  inset-0 flex flex-col items-center gap-4 justify-center">
     {
      locationData && locationData.city && locationData.country && <div className='flex items-start flex-col gap-2 text-xl font-bold'>
        <h1>{`Your Country is ${locationData.country} and City is ${locationData.city}`}</h1>
        
         </div>
     }
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        {
          loading ? 'Loading..':' Show my location'
        }
       
      </button>
     
    </div>
  );
};

export default Popup;
