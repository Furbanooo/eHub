import React from "react";
import ProductCard from "../component/ProductCard.jsx";
import "../style/marketplace.css";

const ProductListing = ({ products = [] }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListing;
