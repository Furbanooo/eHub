import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/home.vue';
import Products from '../views/Products.vue';
import TradeIn from '../views/TradeIn.vue';
import Recycling from '../views/Recycling.vue';
import Profile from '../views/Profile.vue';

const routes = [
  { path: '/', name: 'home', component: home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/trade-in', name: 'TradeIn', component: TradeIn },
  { path: '/recycling', name: 'Recycling', component: Recycling },
  { path: '/profile', name: 'Profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
