import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (hotel) {
      fetchWikipediaImage(hotel?.hotelName);
    }
  }, [hotel]);

  const fetchWikipediaImage = async (hotelName) => {
    try {
      // Wikipedia Search API to find a related page
      const SEARCH_URL = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(hotelName)}&format=json&origin=*`;
      const searchResponse = await axios.get(SEARCH_URL);
      const searchResults = searchResponse.data.query.search;

      if (searchResults.length > 0) {
        const firstTitle = searchResults[0].title; // Get the first Wikipedia page title

        // Fetch Image from the Wikipedia Page
        const IMAGE_URL = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(firstTitle)}&prop=pageimages|images&format=json&pithumbsize=1000&origin=*`;
        const imageResponse = await axios.get(IMAGE_URL);
        const pages = imageResponse.data.query.pages;

        const pageId = Object.keys(pages)[0];
        if (pageId && pages[pageId]?.thumbnail) {
          setPhotoUrl(pages[pageId].thumbnail.source);
        }
      }
    } catch (error) {
      console.error("Error fetching Wikipedia image:", error);
    }
  };

  return (
    <div>
      <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel?.hotelAddress}`} target="_blank">
        <div className="hover:scale-110 transition-all cursor-pointer">
          <img
            src={photoUrl ? photoUrl : "/hotel.jpg"}
            className="rounded-xl h-[180px] w-full object-cover"
            alt={hotel?.hotelName}
          />
          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium">{hotel?.hotelName}</h2>
            <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
            <h2 className="text-sm">💰 {hotel?.price}</h2>
            <h2 className="text-sm">⭐ {hotel?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
