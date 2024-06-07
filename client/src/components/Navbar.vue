<template>
    <nav class="navbar">
      <div class="logo">eHub</div>
      <ul class="navbar-menu">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/products">Produits</router-link></li>
        <li><router-link to="/trade-in">Échange</router-link></li>
        <li><router-link to="/recycling">Recyclage</router-link></li>
        <li><router-link to="/profile">Profil</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
  
  .logo {
    font-size: 1.8rem;
    font-weight: bold;
    color: #00bcd4;
    text-shadow: 0 0 10px #00bcd4;
  }
  
  .navbar-menu {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  
  .navbar-menu li {
    margin: 0;
  }
  
  .navbar-menu a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    transition: color 0.3s, text-shadow 0.3s;
  }
  
  .navbar-menu a:hover {
    color: #00bcd4;
    text-shadow: 0 0 5px #00bcd4;
  }
  </style>
  