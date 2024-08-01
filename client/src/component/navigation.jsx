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

const Navigation = ({ onMouseOver, onMouseOut }) => {
  /*const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseOver = () => {
    setShowDropdown(true);
  };

  const handleMouseOut = () => {
    setShowDropdown(false);
  };*/

  return (
    <div className="navigation">
      <ul className="navigation-list">
        <li onMouseOver={() => onMouseOver("Services")} onMouseOut={onMouseOut}>
          <GrServicePlay size={24} />
        </li>
        <li
          onMouseOver={() => onMouseOver("Whishelist")}
          onMouseOut={onMouseOut}
        >
          <MdFavorite size={24} />
        </li>

        <li onMouseOver={() => onMouseOver("Cart")} onMouseOut={onMouseOut}>
          <MdShoppingCart size={24} />
        </li>

        <li onMouseOver={() => onMouseOver("Account")} onMouseOut={onMouseOut}>
          <MdAccountCircle size={24} />
        </li>
      </ul>{" "}
    </div>
  );
};

export default Navigation;
