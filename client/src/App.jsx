import React from "react";
import { useState, useEffect } from "react";
import Header from "./path/header.jsx";
import Footer from "./path/footer.jsx";
import { Register, Login } from "./component/components.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketplace from "./pages/marketplace.jsx";

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
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
