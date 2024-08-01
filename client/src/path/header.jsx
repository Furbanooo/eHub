import React, { useEffect, useState } from "react";
import Navigation from "../component/navigation";
import "../style/header.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleHeaderOver = () => {
    setShowDropdown(true);
  };

  const handleHeaderOut = () => {
    setShowDropdown(false);
  };

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemOver = (item) => {
    setHoveredItem(item);
  };

  const handleItemOut = () => {
    setHoveredItem(null);
  };

  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (hoveredItem) {
      setScale(1.5);
    } else {
      setScale(1);
    }
  });

  return (
    <div
      onMouseOver={handleHeaderOver}
      onMouseOut={handleHeaderOut}
      className="header-container"
    >
      {showDropdown ? (
        <div
          className="header-dropdown"
          style={{ transform: `scale(${scale})` }}
        >
          <h1>eHub</h1>
          <Navigation onMouseOver={handleItemOver} onMouseOut={handleItemOut} />

          {hoveredItem === "Services" ? (
            <div>
              <h2>Services</h2>
              {/* preview rendering logic*/}
            </div>
          ) : null}

          {hoveredItem === "Whishelist" ? (
            <div>
              <h2>Whishelist</h2>
              {/* preview rendering logic*/}
            </div>
          ) : null}

          {hoveredItem === "Cart" ? (
            <div>
              <h2>Cart</h2>
              {/* preview rendering logic*/}
            </div>
          ) : null}

          {hoveredItem === "Account" ? (
            <div>
              <h2>Account</h2>
              {/* preview rendering logic*/}
            </div>
          ) : null}
        </div>
      ) : (
        <h1>eHub</h1>
      )}
    </div>
  );
}

export default Header;
