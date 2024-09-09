import React, { useState, useEffect } from "react";

const handleCheckout = async (cartItems, orderId) => {
  const response = await fetch("http://localhost:3000/api/order/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems, orderId }),
  });

  const { sessionUrl } = await response.json();

  // Redirect to Stripe Checkout
  window.location.href = sessionUrl;
};

const CartDisplay = ({ cartItems }) => (
  <section>
    {cartItems.map((item) => (
      <div className="product" key={item.id}>
        <img src={item.image} alt={item.name} />
        <div className="description">
          <h3>{item.name}</h3>
          <h5>${item.price}</h5>
        </div>
        <p>Quantity: {item.quantity}</p>
      </div>
    ))}
    <button onClick={() => handleCheckout(cartItems)}>Checkout</button>
  </section>
);

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from API (replace with actual fetch logic)
    const items = [
      {
        id: 1,
        name: "Product 1",
        price: 2000,
        quantity: 1,
        image: "image_url_1",
      },
      {
        id: 2,
        name: "Product 2",
        price: 1500,
        quantity: 2,
        image: "image_url_2",
      },
    ];
    setCartItems(items);
  }, []);

  return <CartDisplay cartItems={cartItems} />;
}
