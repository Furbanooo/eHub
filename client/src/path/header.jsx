import React, { useEffect, useState } from "react";
import { GrServicePlay } from "react-icons/gr";
import { MdFavorite, MdShoppingCart, MdAccountCircle } from "react-icons/md";
import "../style/header.css";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [widthScale, setWidthScale] = useState(1);
  const [heightScale, setHeightScale] = useState(1);

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

  useEffect(() => {
    if (hoveredItem) {
      setWidthScale(1.9);
      setHeightScale(3); // Adjust the height scale as needed
    } else {
      setWidthScale(1);
      setHeightScale(1);
    }
  }, [hoveredItem]);

  return (
    <div
      className="header-container"
      onMouseOver={handleHeaderOver}
      onMouseOut={handleHeaderOut}
    >
      {!showDropdown ? (
        <h1>eHub</h1>
      ) : (
        <div className="header-dropdown">
          <div className="uper-dropdown">
            <h1>eHub</h1>

            <div className="navigation">
              <div className="navigation-container">
                <ul className="navigation-list">
                  <li
                    onMouseOver={() => {
                      handleHeaderOver();
                      handleItemOver("Services");
                    }}
                    onMouseOut={handleItemOut}
                  >
                    <a href="/services">
                      <GrServicePlay size={24} />
                    </a>
                  </li>
                  <li
                    onMouseOver={() => handleItemOver("Wishlist")}
                    onMouseOut={handleItemOut}
                  >
                    <a href="/wishlist">
                      <MdFavorite size={24} />
                    </a>
                  </li>
                  <li
                    onMouseOver={() => handleItemOver("Cart")}
                    onMouseOut={handleItemOut}
                  >
                    <a href="/cart">
                      <MdShoppingCart size={24} />
                    </a>
                  </li>
                  <li
                    onMouseOver={() => handleItemOver("Account")}
                    onMouseOut={handleItemOut}
                  >
                    <a href="/account">
                      <MdAccountCircle size={24} />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="navigation-dropdown">
                {hoveredItem ? (
                  <div
                    className="lower-dropdown-content"
                    onMouseOver={handleItemOver}
                    onMouseOut={handleItemOut}
                  >
                    {hoveredItem === "Services" && (
                      <div>
                        <h2>Services</h2>
                        {/* preview rendering logic*/}
                      </div>
                    )}

                    {hoveredItem === "Wishlist" && (
                      <div>
                        <h2>Wishlist</h2>
                        {/* preview rendering logic*/}
                      </div>
                    )}

                    {hoveredItem === "Cart" && (
                      <div>
                        <h2>Cart</h2>
                        {/* preview rendering logic*/}
                      </div>
                    )}

                    {hoveredItem === "Account" && (
                      <div>
                        <h2>Account</h2>
                        {/* preview rendering logic*/}
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="lower-dropdown"></div>
        </div>
      )}
    </div>
  );
}

export default Header;
