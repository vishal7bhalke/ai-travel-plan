import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Api({placedata}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [place, setPlace] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=19bf8028e0b94bb1b16b9d5a6e5b595a`
          );
          setSuggestions(response.data.results); // Store suggestions
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setSuggestions([]); // Clear suggestions if query is too short
      }
    }, 500); // Delay of 500ms after user stops typing

    return () => clearTimeout(timer); // Cleanup timer on input change
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion); // Set selected place data
    setQuery(suggestion.formatted); // Update input with selected place
    setSuggestions([]); // Clear suggestions
    // console.log('Selected place details:', suggestion); // Log selected place
    console.log("place",query)
    placedata(query);
  };

  return (
    <div>
      <input
      className="border border-gray-300 rounded-md p-2 w-full"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place"
      />
      <ul>
        {suggestions.length === 0 ? (
          <li></li>
        ) : (
          suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              {suggestion.formatted}
            </li>
          ))
        )}
      </ul>
    
    </div>
  );
}

export default Api;
