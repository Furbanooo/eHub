import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id"); // Get session_id from URL

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/makeorder`
        ); // Fetch order using sessionId
        const data = await response.json();
        setOrder(data.order); // Set the order state with the data from backend
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (sessionId) {
      fetchOrder();
    }
  }, [sessionId]);

  if (!order) return <div>Loading order details...</div>;

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Order ID: {order._id}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <ul>
        {order.products.map((product) => (
          <li key={product.productId}>
            {product.name} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
      <p>Shipping Address: {order.address}</p>
    </div>
  );
};

export default OrderPage;
