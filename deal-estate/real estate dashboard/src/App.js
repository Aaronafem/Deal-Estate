import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Listings from "./components/Listings";
import Contact from "./components/Contact";
import "./styles.css"; // Import styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Real Estate Dashboard</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
