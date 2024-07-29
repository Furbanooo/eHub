import React from "react";
import Navigation from "../component/navigation";
import { useDropdownsContext } from "../utilities/dropDown";

function header() {
  const { showDropdown, handleMouseOver, handleMouseOut } =
    useDropdownsContext();

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className="navigation-container">
        {showDropdown ? (
          <div>
            <h1>Header</h1>
            <Navigation />
          </div>
        ) : (
          <h1>Header</h1>
        )}
      </div>
    </div>
  );
}

export default header;
