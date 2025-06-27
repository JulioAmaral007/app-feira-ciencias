import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PWAbutton from '../components/pwa.vue';
import ScanQRCode from '../components/ScanQRCode.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pwa', component: PWAbutton },
  { path: '/scan', component: ScanQRCode }
];

const router = createRouter({
  history: createWebHistory(), // Enables clean URLs
  routes,
});

export default router;