import React, { useState, useEffect } from "react";
import { Searche, ProductListing } from "../component/components.js";
import Footer from "../path/footer.jsx";
import "../style/marketplace.css";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch products from the backend
    fetch("http://localhost:3000/api/product/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marketplace">
      <Searche onSearch={handleSearch} />
      <ProductListing products={filteredProducts} />
      <Footer />
    </div>
  );
};

export default Marketplace;
