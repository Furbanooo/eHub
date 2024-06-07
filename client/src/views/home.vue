<template>
  <div class="landing-page">
    <Navbar />
    <header class="hero-section">
      <h1 class="hero-title">Bienvenue sur eHub</h1>
      <p class="hero-subtitle">Votre solution durable pour les appareils électroniques reconditionnés</p>
      <Button class="cta-button" type="primary" @click="goToProducts">Parcourir les produits</Button>
    </header>
    <section class="features">
      <div class="feature">
        <h2>Électronique durable</h2>
        <p>Vendez facilement et en toute sécurité vos appareils inutilisés.</p>
      </div>
      <div class="feature">
        <h2>Reconditionnement certifié</h2>
        <p>Des appareils reconditionnés de qualité par des marques réputées.</p>
      </div>
      <div class="feature">
        <h2>Écologie pour la planète</h2>
        <p>Échangez vos anciens appareils ou recyclez-les de manière responsable.</p>
      </div>
      <div class="feature">
        <h2>Coût bas</h2>
        <p>Des appareils reconditionnés à des prix abordables.</p>
      </div>
    </section>
    <section class="about">
      <h2>À propos de eHub</h2>
      <p>Découvrez notre mission de réduire les déchets électroniques et de promouvoir des pratiques durables.</p>
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Button from '../components/Button.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'LandingPage',
  components: {
    Navbar,
    Button,
    Footer
  },
  methods: {
    goToProducts() {
      this.$router.push('/products');
    }
  }
};
</script>

<style scoped>
.landing-page {
  font-family: 'Roboto', sans-serif;
}

.hero-section {
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  position: relative;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInDown 1s;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s;
}

.cta-button {
  animation: pulse 2s infinite;
  background: linear-gradient(90deg, #00d2ff, #3a7bd5);
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2rem 0;
  background: #f5f5f5;
}

.feature {
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  margin: 1rem;
  flex: 1 1 calc(25% - 2rem);
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-10px);
}

.about {
  background: #e0e0e0;
  padding: 2rem 1rem;
  text-align: center;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
