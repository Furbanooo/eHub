import React, { useState, useEffect } from "react";
import { Search, ProductListing } from "../component/components.js";
import Footer from "../path/footer.jsx";
import "../style/marketplace.css";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = (page = 1, search = "") => {
    setLoading(true);
    fetch(`http://localhost:3000/api/product?page=${page}&search=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="marketplace">
      <Search onSearch={handleSearch} />
      <ProductListing products={products} />

      <Footer />
    </div>
  );
};

export default Marketplace;
