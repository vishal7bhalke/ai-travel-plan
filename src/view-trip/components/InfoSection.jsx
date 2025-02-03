import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';

function InfoSection({ trip }) {
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
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Display Image */}
            <img src={photoUrl ? photoUrl : "/placeholder.jpg"} 
                 alt="Place"  
                 className='h-[340px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.place}</h2>
                    <div className='hidden sm:flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection?.noofdays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 {trip.userSelection?.traveler} Traveler(s)</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    );
}

export default InfoSection;
