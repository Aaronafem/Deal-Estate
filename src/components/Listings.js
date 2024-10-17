import React, { useEffect } from 'react';

function Listings({ properties, updateProperties }) {
  useEffect(() => {
    fetch('http://localhost:8080/properties', { method: 'GET', mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => updateProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, [updateProperties]);

  return (
    <div>
      <h2>Current Listings</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            {property.city}, {property.sf} sq ft, {property.floors} floors - ${property.price} (ID: {property.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listings;

