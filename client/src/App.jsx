import React from "react";
import { DropdownsProvider } from "./utilities/dropDown";
import { useState, useEffect } from "react";
import Header from "./path/header.jsx";
import Navigation from "./component/navigation.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <div className="navigation-container">
      <Header />
    </div>
  );
}

export default App;
