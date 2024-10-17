import React, { useState, useEffect } from 'react';
import Listings from './Listings';
import CreateListing from './CreateListing';
import BidListing from './BidListing';

function Tabs() {
  const [activeTab, setActiveTab] = useState('listings');
  const [properties, setProperties] = useState([]);

  const fetchProperties = () => {
    fetch('http://localhost:8080/properties', { method: 'GET', mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const updateProperties = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
    setActiveTab('listings');
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('listings')}>Listings</button>
        <button onClick={() => setActiveTab('create')}>Create Listing</button>
        <button onClick={() => setActiveTab('bid')}>Bid on Listing</button>
      </div>
      <div className="content">
        {activeTab === 'listings' && <Listings properties={properties} />}
        {activeTab === 'create' && <CreateListing updateProperties={updateProperties} />}
        {activeTab === 'bid' && <BidListing properties={properties} updateProperties={updateProperties} />}
      </div>
    </div>
  );
}

export default Tabs;
