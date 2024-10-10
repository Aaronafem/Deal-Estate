import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const properties = ["Berkley", "Cuddy", "Teasdale", "Woodside"];

  const handleSubmit = () => {
    alert(
      `Name: ${name}, Email: ${email}, Property: ${selectedProperty}, Bid: ${bidAmount}`
    );
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
      <select
        value={selectedProperty}
        onChange={(e) => setSelectedProperty(e.target.value)}
      >
        <option value="">Select a Property</option>
        {properties.map((property) => (
          <option key={property} value={property}>
            {property}
          </option>
        ))}
      </select>
      <p>
        <input
          type="number"
          placeholder="Your Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Contact;
