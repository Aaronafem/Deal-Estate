import React, { useState } from 'react';

function CreateListing({ updateProperties }) {
  const [form, setForm] = useState({ city: '', sf: '', floors: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/properties/create', {
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
        return response.json();
      })
      .then((newProperty) => {
        alert('Property created!');
        updateProperties(newProperty);
      })
      .catch((error) => console.error('Error creating property:', error));
  };

  return (
    <div>
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required />
        <input type="number" name="sf" value={form.sf} onChange={handleChange} placeholder="Square Footage" required />
        <input type="number" name="floors" value={form.floors} onChange={handleChange} placeholder="Floors" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default CreateListing;

