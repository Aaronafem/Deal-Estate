import React, { useState } from 'react';

function BidListing({ properties, updateProperties }) {
  const [form, setForm] = useState({ propertyId: '', bidAmount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/properties/bid', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Bid placed successfully!');
        return response.json();
      })
      .then((updatedProperty) => {
        updateProperties();
      })
      .catch((error) => console.error('Error placing bid:', error));
  };

  return (
    <div>
      <h2>Bid on a Listing</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            {property.city}, {property.sf} sq ft, {property.floors} floors - ${property.price} (ID: {property.id})
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="number" name="propertyId" value={form.propertyId} onChange={handleChange} placeholder="Property ID" required />
        <input type="number" name="bidAmount" value={form.bidAmount} onChange={handleChange} placeholder="Bid Amount" required />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
}

export default BidListing;
