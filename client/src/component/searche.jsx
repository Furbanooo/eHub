import React from "react";
import "../style/marketplace.css";

const Searche = ({ onSearch }) => {
  return (
    <header className="header">
      <h1>Online Store</h1>
      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
};

export default Searche;
