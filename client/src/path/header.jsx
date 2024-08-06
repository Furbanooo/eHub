import React, { useEffect, useState } from "react";
import Navigation from "../component/navigation";
import "../style/header.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleHeaderOver = () => {
    setShowDropdown(true);
  };

  const handleHeaderOut = () => {
    setShowDropdown(false);
  };

  const handleItemOver = (item) => {
    setHoveredItem(item);
  };

  const handleItemOut = () => {
    setHoveredItem(null);
  };

  useEffect(() => {});

  /*
  const [scale, setScale] = useState(1);
  const [widthScale, setWidthScale] = useState(1);
  const [heightScale, setHeightScale] = useState(1);

  useEffect(() => {
    if (hoveredItem) {
      setWidthScale(1.9);
      setHeightScale(3); // Adjust the height scale as needed
    } else {
      setWidthScale(1);
      setHeightScale(1);
    }
  }, [hoveredItem]);*/

  return (
    <div
      onMouseOver={handleHeaderOver}
      onMouseOut={handleHeaderOut}
      className="header-container"
    >
      {showDropdown ? (
        <div className="header-dropdown">
          <div className="uper-dropdown">
            <h1>eHub</h1>

            <div>
              <Navigation
                onMouseOver={handleItemOver}
                onMouseOut={handleItemOut}
              />
            </div>
          </div>
          {hoveredItem ? (
            <div
              className="lower-dropdown"
              onMouseOver={handleItemOver}
              onMouseOut={handleItemOut}
            >
              {hoveredItem === "Services" ? (
                <div>
                  <h2>Services</h2>
                  {/* preview rendering logic*/}
                </div>
              ) : (
                ""
              )}

              {hoveredItem === "Whishelist" ? (
                <div>
                  <h2>Whishelist</h2>
                  {/* preview rendering logic*/}
                </div>
              ) : (
                ""
              )}

              {hoveredItem === "Cart" ? (
                <div>
                  <h2>Cart</h2>
                  {/* preview rendering logic*/}
                </div>
              ) : (
                ""
              )}

              {hoveredItem === "Account" ? (
                <div>
                  <h2>Account</h2>
                  {/* preview rendering logic*/}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h1>eHub</h1>
      )}
    </div>
  );
}

export default Header;
