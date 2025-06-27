import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import Project from '../components/ProjectPage.vue';
import Ranking from '../components/RankingPage.vue';
import Scanner from '../components/ScannerPage.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/project', component: Project },
  { path: '/ranking', component: Ranking },
  { path: '/scanner', component: Scanner },
];

const router = createRouter({
  history: createWebHistory(), // Enables clean URLs
  routes,
});

export default router;