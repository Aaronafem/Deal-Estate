import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const marketProperties = {
    SouthBend: ["Berkley", "Cuddy", "Teasdale", "Woodside"],
    Mishawaka: ["Main", "Westwood", "Bittersweet", "Jenny"],
    Elkhart: ["River", "County", "Apple", "Grand"],
    Granger: ["Summerlyn", "Lantern", "Oakwood", "Pencross"],
  };

  const handleMarketChange = (e) => {
    setSelectedMarket(e.target.value);
    setSelectedProperty(""); // Reset property selection when market changes
  };

  const handleSubmit = () => {
    const newSubmission = {
      name,
      email,
      market: selectedMarket,
      property: selectedProperty,
      bid: bidAmount,
    };
    setSubmissions((prev) => [...prev, newSubmission]);
    setName("");
    setEmail("");
    setSelectedMarket("");
    setSelectedProperty("");
    setBidAmount("");
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select value={selectedMarket} onChange={handleMarketChange}>
        <option value="">Select a Market</option>
        {Object.keys(marketProperties).map((market) => (
          <option key={market} value={market}>
            {market}
          </option>
        ))}
      </select>
      <select
        value={selectedProperty}
        onChange={(e) => setSelectedProperty(e.target.value)}
        disabled={!selectedMarket}
      >
        <option value="">Select a Property</option>
        {(marketProperties[selectedMarket] || []).map((property) => (
          <option key={property} value={property}>
            {property}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Your Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <h3>Submissions</h3>
      <ul>
        {submissions.map((submission, index) => (
          <li key={index}>
            <strong>Name:</strong> {submission.name}, <strong>Email:</strong>{" "}
            {submission.email},<strong>Market:</strong> {submission.market},{" "}
            <strong>Property:</strong> {submission.property},{" "}
            <strong>Bid:</strong> {submission.bid}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contact;
