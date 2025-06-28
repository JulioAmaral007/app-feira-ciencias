import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import Project from '../components/ProjectPage.vue';
import Scanner from '../components/ScannerPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/project/:id', component: Project },
  { path: '/scanner', component: Scanner }
];

const router = createRouter({
  history: createWebHistory(), // Enables clean URLs
  routes,
});

export default router;