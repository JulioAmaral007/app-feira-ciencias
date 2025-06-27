<template>
  <f7-page name="home" class="home-page">
    <!-- Page content -->
    <div class="page-content">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-icon-container">
            <f7-icon ios="f7:lab_flask" md="material:science" size="80" class="hero-icon"></f7-icon>
            <div class="hero-icon-glow"></div>
          </div>
          <h1 class="hero-title">Bem-vindo à Feira de Ciências!</h1>
          <p class="hero-subtitle">Explore projetos incríveis, vote nos seus favoritos e descubra o mundo da ciência.</p>
          <div class="hero-particles">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section-title">
        <h2>Ações Rápidas</h2>
        <div class="title-underline"></div>
      </div>
      <div class="quick-actions">
        <div class="action-grid">
          <div class="action-item">
            <f7-button 
              fill 
              large 
              href="/scanner"
              class="action-button scanner-button"
            >
              <div class="button-content">
                <f7-icon ios="f7:qrcode_viewfinder" md="material:qr_code_scanner" size="24"></f7-icon>
                <span>Escanear QR</span>
              </div>
            </f7-button>
          </div>
          <div class="action-item">
            <f7-button 
              fill 
              large 
              href="/projects"
              class="action-button projects-button"
            >
              <div class="button-content">
                <f7-icon ios="f7:list_bullet" md="material:list" size="24"></f7-icon>
                <span>Ver Projetos</span>
              </div>
            </f7-button>
          </div>
        </div>
        <div class="action-item full-width">
          <f7-button 
            fill 
            large 
            href="/ranking/"
            class="action-button ranking-button"
          >
            <div class="button-content">
              <f7-icon ios="f7:trophy" md="material:emoji_events" size="24"></f7-icon>
              <span>Ranking de Votos</span>
            </div>
          </f7-button>
        </div>
      </div>

      <!-- Featured Projects -->
      <div class="section-title">
        <h2>Projetos em Destaque</h2>
        <div class="title-underline"></div>
      </div>
      <div class="featured-projects">
        <div v-for="project in featuredProjects" :key="project.id" class="project-card-modern">
          <div class="project-image-container">
            <img :src="project.image" :alt="project.title" class="project-image-modern">
            <div class="project-overlay">
              <div class="project-category">{{ project.category }}</div>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.shortDescription }}</p>
            <div class="project-footer">
              <div class="vote-badge">
                <f7-icon ios="f7:heart_fill" md="material:favorite" size="14" color="white"></f7-icon>
                <span>{{ project.votes }}</span>
              </div>
              <f7-button small outline :href="`/project/${project.id}`" class="details-button">
                Ver Detalhes
              </f7-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="section-title">
        <h2>Estatísticas da Feira</h2>
        <div class="title-underline"></div>
      </div>
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon projects-stat">
            <f7-icon ios="f7:folder" md="material:folder" size="32"></f7-icon>
          </div>
          <div class="stat-number">{{ stats.totalProjects }}</div>
          <div class="stat-label">Projetos</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon votes-stat">
            <f7-icon ios="f7:heart" md="material:favorite" size="32"></f7-icon>
          </div>
          <div class="stat-number">{{ stats.totalVotes }}</div>
          <div class="stat-label">Votos</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon visitors-stat">
            <f7-icon ios="f7:person_2" md="material:people" size="32"></f7-icon>
          </div>
          <div class="stat-number">{{ stats.totalVisitors }}</div>
          <div class="stat-label">Visitantes</div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7Button, f7Icon, f7Link, f7Navbar, f7NavRight, f7Page } from 'framework7-vue'

export default {
  name: 'Home',
  components: {
    f7Page,
    f7Navbar,
    f7NavRight,
    f7Link,
    f7Icon,
    f7Button
  },
  data() {
    return {
      featuredProjects: [
        {
          id: 1,
          title: "Energia Solar Caseira",
          category: "Física",
          shortDescription: "Sistema de captação de energia solar para residências.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 45
        },
        {
          id: 2,
          title: "Purificador de Água Natural",
          category: "Química",
          shortDescription: "Filtro natural usando materiais sustentáveis.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 38
        },
        {
          id: 3,
          title: "Robô Assistente",
          category: "Tecnologia",
          shortDescription: "Robô programado para auxiliar pessoas com deficiência.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 52
        }
      ],
      stats: {
        totalProjects: 24,
        totalVotes: 387,
        totalVisitors: 156
      }
    }
  },
  mounted() {
    this.loadStats()
  },
  methods: {
    loadStats() {
      console.log('Carregando estatísticas...')
    }
  }
}
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.navbar-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
}

.settings-link {
  color: white !important;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.settings-link:hover {
  opacity: 1;
}

.hero-section {
  position: relative;
  padding: 40px 20px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.hero-icon {
  color: white;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: float 3s ease-in-out infinite;
}

.hero-icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.hero-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  color: rgba(255,255,255,0.9);
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  max-width: 300px;
  margin: 0 auto;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255,255,255,0.6);
  border-radius: 50%;
  animation: particle-float 6s ease-in-out infinite;
}

.particle:nth-child(1) {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle:nth-child(2) {
  top: 60%;
  right: 20%;
  animation-delay: 2s;
}

.particle:nth-child(3) {
  bottom: 20%;
  left: 50%;
  animation-delay: 4s;
}

.section-title {
  text-align: center;
  margin: 40px 0 30px;
}

.section-title h2 {
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  margin: 0 auto;
  border-radius: 2px;
}

.quick-actions {
  padding: 0 20px;
  margin-bottom: 20px;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.action-item {
  position: relative;
}

.action-item.full-width {
  grid-column: 1 / -1;
}

.action-button {
  width: 100%;
  height: 60px;
  border-radius: 16px;
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.scanner-button {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.projects-button {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.ranking-button {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.action-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  font-weight: 600;
}

.featured-projects {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-card-modern {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.project-card-modern:active {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.project-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.project-image-modern {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card-modern:hover .project-image-modern {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 15px;
  right: 15px;
}

.project-category {
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.project-content {
  padding: 20px;
}

.project-title {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.project-description {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 15px 0;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vote-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.details-button {
  border-color: #667eea;
  color: #667eea;
  border-radius: 20px;
  font-weight: 600;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 0 20px 40px;
}

.stat-card {
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  padding: 20px 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.stat-card:active {
  transform: translateY(-3px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.projects-stat {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.votes-stat {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
}

.visitors-stat {
  background: linear-gradient(135deg, #feca57, #ff9ff3);
  color: white;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 500;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes particle-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
}
</style>
