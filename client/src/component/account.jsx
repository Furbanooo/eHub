import React, { useState } from "react";
import { Modal, Login, Register } from "./components";
import "../style/modal.css";

function Account() {
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = (item) => {
    let content;
    switch (item) {
      case "Login":
        content = <Login />;
        break;
      case "Register":
        content = <Register />;
        break;
      default:
        content = <div>Unknown item</div>;
    }
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <h1>Welcome to eHub, login to your account or register to have one</h1>
        <button onClick={() => handleItemClick("Login")}>Log in</button>
        <button onClick={() => handleItemClick("Register")}>Register</button>
      </div>

      <Modal show={showModal} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Account;
