import React, { useEffect, useState } from "react";

const images = {
  1: "/images/Berkley.png",
  2: "/images/Cuddy.png",
  3: "/images/Teasdale.png",
  4: "/images/Woodside.png",
};

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Real Estate Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id} style={{ marginBottom: "20px" }}>
            <h3>{`Property: ${listing.name}`}</h3>
            <img
              src={images[listing.id]} // Use image from the mapping
              alt={`Listing ${listing.id}`}
              style={{ width: "200px", height: "auto", marginRight: "20px" }}
              onError={(e) => {
                e.target.src = "/images/placeholder.jpg"; // Fallback image
              }}
            />
            <div>
              <p>Address: {listing.address}</p>
              <p>Price: {listing.price}</p>
              <p>Square Feet: {listing.sqft}</p>
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Bathroom: {listing.bathrooms}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listings;
