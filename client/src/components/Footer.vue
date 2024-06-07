<template>
    <footer class="footer">
      <p>&copy; 2024 eHub. Tous droits réservés.</p>
      <ul class="footer-menu">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/products">Produits</router-link></li>
        <li><router-link to="/trade-in">Échange</router-link></li>
        <li><router-link to="/recycling">Recyclage</router-link></li>
        <li><router-link to="/profile">Profil</router-link></li>
      </ul>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .footer {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
    margin-top: 2rem;
  }
  
  .footer-menu {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .footer-menu li {
    margin: 0;
  }
  
  .footer-menu a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;
  }
  
  .footer-menu a:hover {
    color: #00bcd4;
    text-shadow: 0 0 5px #00bcd4;
  }
  </style>  