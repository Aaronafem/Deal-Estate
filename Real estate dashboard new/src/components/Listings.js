import React, { useState, useEffect } from "react";


const marketPaths = {
  SouthBend: "http://localhost:8080/api/listings?market=southbend",
  Mishawaka: "http://localhost:8080/api/listings?market=mishawaka",
  Elkhart: "http://localhost:8080/api/listings?market=elkhart",
  Granger: "http://localhost:8080/api/listings?market=granger",
};


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
        const response = await fetch(marketPaths[selectedMarket]);
        if (!response.ok) throw new Error("Failed to load listings");
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
