import React, { useState } from "react";

// Define the newAccount function to handle registration
const newAccount = async (formData) => {
  try {
    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }); //conection to the backend

    // Handle successful registration or error
    if (response.ok) {
      console.log("Registration successful!");
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      return errorData.message; // Return the error message
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return "An error occurred. Please try again later.";
  }
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); // State for form data

  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear any previous error message

    // Basic input validation
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    } else if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const error = await newAccount(formData);
      if (error) {
        setErrorMessage(error);
      } else {
        // Handle successful registration and redirect to login page
        console.log("Registration successful!");
        window.location.href = "/login";
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
