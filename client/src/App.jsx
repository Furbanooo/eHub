import React from "react";
import { useState, useEffect } from "react";
import Header from "./path/header.jsx";
import Register from "./component/register.jsx";
import Login from "./component/login.jsx";
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
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Conditionally display apiTest data based on route */}
          <Route
            path="/"
            element={
              <div>
                {apiTest.map((i) => (
                  <p key={i}>{i}</p>
                ))}
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
