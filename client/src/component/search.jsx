import React, { useState, useEffect } from "react";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input);
    }, 300); // Debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Search;
