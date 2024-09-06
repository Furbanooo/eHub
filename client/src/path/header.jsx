import React, { useState } from "react";
import { GrServicePlay } from "react-icons/gr";
import { MdFavorite, MdShoppingCart, MdAccountCircle } from "react-icons/md";
import "../style/header.css";
import { Account, Modal } from "../component/components.js";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleItemClick = (item) => {
    let content;
    switch (item) {
      case "Account":
        content = <Account />;
        break;
      default:
        content = <div>Unknown item</div>;
    }
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
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
                      onClick={() => handleItemClick("Services")}
                    >
                      <a href="#">
                        <GrServicePlay size={24} />
                      </a>
                    </li>
                    <li
                      onMouseOver={() => handleItemOver("Wishlist")}
                      onMouseOut={handleItemOut}
                      onClick={() => handleItemClick("Wishlist")}
                    >
                      <a href="#">
                        <MdFavorite size={24} />
                      </a>
                    </li>
                    <li
                      onMouseOver={() => handleItemOver("Cart")}
                      onMouseOut={handleItemOut}
                      onClick={() => handleItemClick("Cart")}
                    >
                      <a href="#">
                        <MdShoppingCart size={24} />
                      </a>
                    </li>
                    <li
                      onMouseOver={() => handleItemOver("Account")}
                      onMouseOut={handleItemOut}
                      onClick={() => handleItemClick("Account")}
                    >
                      <a href="#">
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
          </div>
        )}
      </div>
      <Modal show={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Header;
