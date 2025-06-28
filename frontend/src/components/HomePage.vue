<template>
  <f7-page name="home" class="home-page">
    <!-- Loading indicator -->
    <f7-preloader v-if="loading" :size="44" class="loading-overlay"></f7-preloader>
    
    <!-- Page content -->
    <div class="page-content">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-icon-container">
            <f7-icon ios="f7:lab_flask" md="material:science" size="80" class="hero-icon"></f7-icon>
            <div class="hero-icon-glow"></div>
            <div class="hero-icon-particles">
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
              <div class="particle"></div>
            </div>
          </div>
          <h1 class="hero-title">Bem-vindo à Feira de Ciências!</h1>
          <p class="hero-subtitle">Explore projetos incríveis, vote nos seus favoritos e descubra o mundo da ciência.</p>
          <div class="hero-cta">
            <f7-button 
              fill 
              large 
              href="/scanner"
              class="hero-button"
            >
              <f7-icon ios="f7:qrcode_viewfinder" md="material:qr_code_scanner" slot="start"></f7-icon>
              Começar Exploração
            </f7-button>
          </div>
        </div>
        <div class="hero-background-elements">
          <div class="floating-element element-1"></div>
          <div class="floating-element element-2"></div>
          <div class="floating-element element-3"></div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section-container">
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
                  <f7-icon ios="f7:qrcode_viewfinder" md="material:qr_code_scanner" size="28"></f7-icon>
                  <div class="button-text">
                    <span class="button-title">Escanear QR</span>
                    <span class="button-subtitle">Acesse projetos</span>
                  </div>
                </div>
              </f7-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="section-container">
        <div class="section-title">
          <h2>Estatísticas da Feira</h2>
          <div class="title-underline"></div>
        </div>
        <div class="stats-container">
          <div class="stat-card projects-card">
            <div class="stat-icon projects-stat">
              <f7-icon ios="f7:folder" md="material:folder" size="32"></f7-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalProjects }}</div>
              <div class="stat-label">Projetos</div>
            </div>
            <div class="stat-decoration"></div>
          </div>
          <div class="stat-card votes-card">
            <div class="stat-icon votes-stat">
              <f7-icon ios="f7:heart" md="material:favorite" size="32"></f7-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalVotes }}</div>
              <div class="stat-label">Votos</div>
            </div>
            <div class="stat-decoration"></div>
          </div>
        </div>
      </div>

      <!-- Ranking de Projetos -->
      <div class="section-container">
        <div class="section-title">
          <h2>🏆 Top 3 Projetos</h2>
          <div class="title-underline"></div>
        </div>
        <div class="ranking-container">
          <div v-for="project in ranking" :key="project._id" class="ranking-item" :class="`position-${project.position}`">
            <div class="ranking-position">
              <div class="position-number">{{ project.position }}</div>
              <div class="position-icon">
                <f7-icon 
                  v-if="project.position === 1" 
                  ios="f7:trophy_fill" 
                  md="material:emoji_events" 
                  size="24" 
                  color="#FFD700"
                ></f7-icon>
                <f7-icon 
                  v-else-if="project.position === 2" 
                  ios="f7:trophy_fill" 
                  md="material:emoji_events" 
                  size="22" 
                  color="#C0C0C0"
                ></f7-icon>
                <f7-icon 
                  v-else-if="project.position === 3" 
                  ios="f7:trophy_fill" 
                  md="material:emoji_events" 
                  size="20" 
                  color="#CD7F32"
                ></f7-icon>
              </div>
            </div>
            <div class="ranking-content">
              <div class="project-info">
                <h4 class="project-title">{{ project.title }}</h4>
                <p class="project-category">{{ project.category }}</p>
                <p class="project-school">{{ project.school }}</p>
              </div>
              <div class="project-votes">
                <div class="vote-count">
                  <f7-icon ios="f7:heart_fill" md="material:favorite" size="16" color="#ff6b6b"></f7-icon>
                  <span>{{ project.votes || 0 }}</span>
                </div>
              </div>
            </div>
            <div class="ranking-glow"></div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7Button, f7Icon, f7Link, f7Navbar, f7NavRight, f7Page, f7Preloader } from 'framework7-vue'

export default {
  name: 'Home',
  components: {
    f7Page,
    f7Navbar,
    f7NavRight,
    f7Link,
    f7Icon,
    f7Button,
    f7Preloader
  },
  data() {
    return {
      loading: true,  
      stats: {
        totalProjects: 0,
        totalVotes: 0,
      },
      ranking: []
    }
  },
  mounted() {
    this.loadHomeData()
  },
  methods: {
    async loadHomeData() {
      this.loading = true
      
      try {
        const response = await fetch('/api/home')
        if (!response.ok) {
          throw new Error('Erro ao carregar dados da home')
        }
        
        const data = await response.json()
        
        if (data.success) {
          this.stats = data.stats
          this.ranking = data.ranking
        } else {
          throw new Error(data.message || 'Erro ao carregar dados da home')
        }
        
      } catch (error) {
        this.stats = {
          totalProjects: 0,
          totalVotes: 0,
        }
        this.ranking = []
      } finally {
        this.loading = false
      }
    },
    
    getShortDescription(description) {
      if (!description) return 'Descrição não disponível'
      return description.length > 80 ? description.substring(0, 80) + '...' : description
    }
  }
}
</script>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.hero-section {
  position: relative;
  padding: 60px 20px 80px;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 3;
}

.hero-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.hero-icon {
  color: white;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
  animation: hero-float 4s ease-in-out infinite;
}

.hero-icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%);
  border-radius: 50%;
  animation: hero-pulse 3s ease-in-out infinite;
}

.hero-icon-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.hero-icon-particles .particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  animation: particle-orbit 8s linear infinite;
}

.hero-icon-particles .particle:nth-child(1) {
  animation-delay: 0s;
  top: 0;
  left: 50%;
}

.hero-icon-particles .particle:nth-child(2) {
  animation-delay: 2s;
  top: 50%;
  right: 0;
}

.hero-icon-particles .particle:nth-child(3) {
  animation-delay: 4s;
  bottom: 0;
  left: 50%;
}

.hero-icon-particles .particle:nth-child(4) {
  animation-delay: 6s;
  top: 50%;
  left: 0;
}

.hero-title {
  color: white;
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 20px 0;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.hero-subtitle {
  color: rgba(255,255,255,0.95);
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 35px 0;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

.hero-cta {
  margin-top: 20px;
}

.hero-button {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 25px;
  height: 60px;
  padding: 0 35px;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 
    0 10px 30px rgba(79, 172, 254, 0.4),
    0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
}

.hero-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.6s;
}

.hero-button:active {
  transform: translateY(3px);
  box-shadow: 
    0 5px 20px rgba(79, 172, 254, 0.5),
    0 2px 8px rgba(0,0,0,0.2);
}

.hero-button:active::before {
  left: 100%;
}

.hero-background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  animation: float-random 6s ease-in-out infinite;
}

.element-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.element-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.section-container {
  margin-bottom: 50px;
}

.section-title {
  text-align: center;
  margin: 0 0 35px;
  padding: 0 20px;
}

.section-title h2 {
  color: white;
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  letter-spacing: -0.3px;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
  margin: 0 auto;
  border-radius: 2px;
  animation: underline-glow 3s ease-in-out infinite;
}

.quick-actions {
  padding: 0 20px;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.action-button {
  width: 100%;
  height: 80px;
  border-radius: 20px;
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.scanner-button {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: white;
  height: 100%;
}

.button-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.button-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.button-subtitle {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
}

.action-button:active {
  transform: translateY(3px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.25);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 20px;
}

.stat-card {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 25px 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card:active {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.stat-decoration {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1));
  border-radius: 50%;
  animation: decoration-rotate 8s linear infinite;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  position: relative;
  z-index: 2;
}

.projects-stat {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.votes-stat {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.stat-content {
  position: relative;
  z-index: 2;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-label {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ranking-container {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ranking-item {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.ranking-item:active {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.ranking-item.position-1 {
  border: 3px solid #FFD700;
  background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,255,255,0.95));
}

.ranking-item.position-2 {
  border: 3px solid #C0C0C0;
  background: linear-gradient(135deg, rgba(192,192,192,0.15), rgba(255,255,255,0.95));
}

.ranking-item.position-3 {
  border: 3px solid #CD7F32;
  background: linear-gradient(135deg, rgba(205,127,50,0.15), rgba(255,255,255,0.95));
}

.ranking-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ranking-item:hover .ranking-glow {
  opacity: 1;
}

.ranking-position {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 60px;
}

.position-number {
  font-size: 28px;
  font-weight: 800;
  color: #2c3e50;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.position-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: trophy-shine 3s ease-in-out infinite;
}

.ranking-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-info {
  flex: 1;
}

.project-info .project-title {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.project-info .project-category {
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.project-info .project-school {
  font-size: 12px;
  color: #7f8c8d;
  margin: 0;
  font-weight: 500;
}

.project-votes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.vote-count {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 12px 16px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  animation: vote-pulse 2s ease-in-out infinite;
}

@keyframes hero-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

@keyframes hero-pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes particle-orbit {
  0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
}

@keyframes float-random {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-20px) translateX(10px); }
  66% { transform: translateY(10px) translateX(-15px); }
}

@keyframes underline-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); }
}

@keyframes decoration-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes trophy-shine {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.3) drop-shadow(0 0 10px currentColor); }
}

@keyframes vote-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .section-title h2 {
    font-size: 22px;
  }
  
  .stat-number {
    font-size: 28px;
  }
  
  .ranking-item {
    padding: 20px;
    gap: 15px;
  }
  
  .project-info .project-title {
    font-size: 16px;
  }
}
</style>