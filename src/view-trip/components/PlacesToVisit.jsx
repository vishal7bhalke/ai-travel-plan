import React from 'react'
import PlaceCarditem from './PlaceCarditem'

function PlacesToVisit({ trip }) {

    if (!trip || !trip.tripdata || !trip.tripdata.itinerary) {
        return <p>Loading itinerary...</p>;
    }

    return (
        <div>
            <h2 className="font-bold text-lg">Places to Visit</h2>
            <div>
                {Object.values(trip.tripdata.itinerary).map((item, index) => (
                    <div className="mt-5" key={index}>
                        <h2 className="font-medium text-lg">Day {index + 1}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.activities.map((place, i) => (
                                <div key={i} className=''>
                                    <h2 className="font-medium text-sm text-orange-600">
                                        {place.bestTimeToVisit}
                                    </h2>
                                    <PlaceCarditem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
