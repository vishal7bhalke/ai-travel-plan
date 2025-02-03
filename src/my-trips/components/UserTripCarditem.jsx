import React from 'react'
import  { useEffect,useState } from 'react'
import { GetPlaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCarditem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (trip?.userSelection?.place) {
          console.log(trip?.userSelection.place)
            fetchWikipediaImage(trip.userSelection.place);
        }
    }, [trip]);

    const fetchWikipediaImage = async (placeName) => {
     
        const imageUrl = await GetPlaceDetails(placeName);
        
        setPhotoUrl(imageUrl);
    };
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} 
      className="object-cover w-full rounded-xl h-[220px]"/>
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.place}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection.noofdays}Days trip with {trip?.userSelection?.budget} Budget</h2>
      
      </div>
    
    </div>
    </Link>
  )
}

export default UserTripCarditem
