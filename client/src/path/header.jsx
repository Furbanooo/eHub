import React, { useState } from "react";
import Navigation from "../component/navigation";
import "../style/header.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseOver = () => {
    setShowDropdown(true);
  };

  const handleMouseOut = () => {
    setShowDropdown(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="header-container"
    >
      {showDropdown ? (
        <div>
          <h1>eHub</h1>
          <Navigation />
        </div>
      ) : (
        <h1>eHub</h1>
      )}
    </div>
  );
}

export default Header;
