import React, { useState, useEffect } from "react";

// Define the base URL of your Go server API
const apiURL = "http://localhost:8080/listings";

function Listings() {
  const [selectedMarket, setSelectedMarket] = useState("SouthBend");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use selectedMarket as a query parameter in the API request
        const response = await fetch(`${apiURL}?market=${selectedMarket}`);
        if (!response.ok) throw new Error("Failed to load listings");
        
        // Parse the JSON data from the response
        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError("Could not load listings for this market.");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [selectedMarket]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Real Estate Listings</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => setSelectedMarket("SouthBend")}>
              South Bend
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedMarket("Mishawaka")}>
              Mishawaka
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedMarket("Elkhart")}>
              Elkhart
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedMarket("Granger")}>
              Granger
            </button>
          </li>
        </ul>
      </nav>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id} style={{ marginBottom: "20px" }}>
            <h3>{`Property: ${listing.name}`}</h3>
            <img
              src={`/images/${listing.name}.png`}
              alt={`Listing ${listing.id}`}
              style={{ width: "200px", height: "auto", marginRight: "20px" }}
              onError={(e) => {
                e.target.src = "/images/placeholder.jpg";
              }}
            />
            <div>
              <p>Address: {listing.address}</p>
              <p>Price: {listing.price}</p>
              <p>Square Feet: {listing.sqft}</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Bathrooms: {listing.bathrooms}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listings;
