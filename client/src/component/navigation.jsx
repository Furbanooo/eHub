import React from "react";
import "../style/navigation.css";
import { useState } from "react";
import {
  MdFavorite,
  MdShoppingCart,
  MdAccountCircle, // GrServicePlay,
} from "react-icons/md";
import { GrServicePlay } from "react-icons/gr";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseOver = () => {
    setShowDropdown(true);
  };

  const handleMouseOut = () => {
    setShowDropdown(false);
  };

  return (
    <div className="navigation">
      <ul className="navigation-list">
        <li
        /*onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"*/
        >
          <MdFavorite size={24} />{" "}
        </li>

        <li
        /*onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"*/
        >
          <MdShoppingCart size={24} />{" "}
        </li>

        <li
        /*onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"*/
        >
          <MdAccountCircle size={24} />{" "}
        </li>

        <li
        /*onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"*/
        >
          <GrServicePlay size={24} />{" "}
        </li>
      </ul>{" "}
    </div>
  );
};

export default Navigation;
