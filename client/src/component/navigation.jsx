import React from "react";
import { useDropdownsContext } from "../utilities/dropDown";
import {
  MdFavorite,
  MdShoppingCart,
  MdAccountCircle,
  // GrServicePlay,
} from "react-icons/md";
import { GrServicePlay } from "react-icons/gr";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { showDropdown, handleMouseOver, handleMouseOut } =
    useDropdownsContext();

  return (
    <div className="navigation">
      <ul>
        <li
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"
        >
          <MdFavorite size={24} />
          {showDropdown && (
            <div className="absolute bg-white shadow-md rounded-md mt-2">
              <ul className="p-2">
                <li>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"
        >
          <MdShoppingCart size={24} />
          {showDropdown && (
            <div className="absolute bg-white shadow-md rounded-md mt-2">
              <ul className="p-2">
                <li>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    View Cart
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"
        >
          <MdAccountCircle size={24} />
          {showDropdown && (
            <div className="absolute bg-white shadow-md rounded-md mt-2">
              <ul className="p-2">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="relative"
        >
          <GrServicePlay size={24} />
          {showDropdown && (
            <div className="absolute bg-white shadow-md rounded-md mt-2">
              <ul className="p-2">
                <li>
                  <Link
                    to="/help"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    service I
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    service II
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
