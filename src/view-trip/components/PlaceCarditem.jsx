import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/Globalplace';

function PlaceCarditem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg'); // Default placeholder

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      console.log(place.placeName)
      const imageUrl = await GetPlaceDetails(place.placeName);

      if (imageUrl) {
        setPhotoUrl(imageUrl);
      } else {
        console.error('No image URL found for this place.');
        setPhotoUrl('/placeholder.jpg'); // Fallback to placeholder
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      setPhotoUrl('/placeholder.jpg'); // Fallback to placeholder
    }
  };

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`} target="_blank">
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      {photoUrl !== '/placeholder.jpg' ? (
          <img
            src={photoUrl}
            className='w-[130px] h-[130px] rounded-xl object-cover'
            alt={place.placeName}
          />
        ) : (
          <div className='w-[130px] h-[130px] bg-gray-200 rounded-xl'></div> // Empty space if no image
        )}

        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          <h2 className='mt-2'>🕙 {place.travelTime}</h2>
          <Button size="sm"><FaMapLocationDot /></Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCarditem;
