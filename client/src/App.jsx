import React from "react";
import { DropdownsProvider } from "./utilities/dropDown";
import { useState, useEffect } from "react";
import header from "./path/header";

function App() {
  const [apiTest, setApiTest] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/test")
      .then((response) => response.json())
      .then((data) => {
        setApiTest(data);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <DropdownsProvider>
        <h1>Test API Data</h1>
        <header />
      </DropdownsProvider>
    </div>
  );
}

export default App;
