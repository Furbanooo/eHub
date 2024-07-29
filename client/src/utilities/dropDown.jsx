//handle dropdown
import React, { createContext, useContext, useState } from "react";

const DropdownsContext = createContext();

const DropdownsProvider = ({ children }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseOver = () => {
        setShowDropdown(true);
    };

    const handleMouseOut = () => {
        setShowDropdown(false);
    };

    return (
        <DropdownsContext.Provider
            value={{ showDropdown, handleMouseOver, handleMouseOut }}
        >
            {children}
        </DropdownsContext.Provider>
    );
};

const useDropdownsContext = () => useContext(DropdownsContext);

export { DropdownsProvider, useDropdownsContext };