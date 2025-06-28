<template>
  <f7-page name="project" class="project-page">
    <!-- Loading indicator -->
    <f7-preloader v-if="loading" :size="44" class="loading-overlay"></f7-preloader>
    
    <!-- Error message -->
    <div v-if="error" class="error-container">
      <div class="error-content">
        <f7-icon ios="f7:exclamationmark_triangle_fill" md="material:error" size="60" class="error-icon"></f7-icon>
        <h3>Erro ao carregar projeto</h3>
        <p>{{ error }}</p>
        <f7-button fill @click="loadProject" class="retry-button">
          <f7-icon ios="f7:arrow_clockwise" md="material:refresh" slot="start"></f7-icon>
          Tentar Novamente
        </f7-button>
      </div>
    </div>

    <!-- Project content -->
    <div v-if="!loading && !error && project" class="project-content">
      <!-- Top Navbar -->
      <f7-navbar :title="project.title" back-link="Voltar" class="project-navbar">
      </f7-navbar>

      <!-- Page content -->
      <div class="page-content">
        <!-- Project Header -->
        <div class="project-header">
          <div class="project-image-container">
            <img :src="project.gallery[0]" :alt="project.title" class="project-image">
            <div class="image-overlay">
              <div class="project-category-badge">{{ project.category }}</div>
              <div class="vote-badge-header">
                <f7-icon ios="f7:heart_fill" md="material:favorite" size="16"></f7-icon>
                <span>{{ project.votes }}</span>
              </div>
            </div>
          </div>
          
          <div class="project-info-header">
            <h1 class="project-title">{{ project.title }}</h1>
            
            <div class="project-meta">
              <div class="meta-item">
                <f7-icon ios="f7:person_2_fill" md="material:group" size="20" class="meta-icon"></f7-icon>
                <div class="meta-content">
                  <span class="meta-label">Autores</span>
                  <span class="meta-value">{{ project.authors.join(', ') }}</span>
                </div>
              </div>
              
              <div class="meta-item">
                <f7-icon ios="f7:building_2_fill" md="material:school" size="20" class="meta-icon"></f7-icon>
                <div class="meta-content">
                  <span class="meta-label">Escola</span>
                  <span class="meta-value">{{ project.school }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vote Section -->
        <div class="vote-section" v-if="!hasVoted">
          <div class="vote-card">
            <div class="vote-icon-container">
              <f7-icon ios="f7:heart_fill" md="material:favorite" size="40" class="vote-icon"></f7-icon>
              <div class="vote-pulse"></div>
            </div>
            <div class="vote-content">
              <h3>Gostou deste projeto?</h3>
              <p>Seu voto ajuda a destacar os melhores projetos da feira!</p>
            </div>
            <f7-button 
              fill 
              large 
              class="vote-button"
              @click="voteProject"
            >
              <f7-icon ios="f7:heart_fill" md="material:favorite" slot="start"></f7-icon>
              Votar neste Projeto
            </f7-button>
          </div>
        </div>

        <div class="vote-section" v-else>
          <div class="vote-card voted">
            <div class="vote-success-icon">
              <f7-icon ios="f7:checkmark_circle_fill" md="material:check_circle" size="50" color="#4CAF50"></f7-icon>
            </div>
            <h3>Obrigado pelo seu voto!</h3>
            <p>Você já votou neste projeto.</p>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="content-sections">
          <!-- Description -->
          <div class="content-section">
            <div class="section-header">
              <f7-icon ios="f7:doc_text_fill" md="material:description" size="24" class="section-icon"></f7-icon>
              <h2>Descrição do Projeto</h2>
            </div>
            <div class="section-content">
              <p>{{ project.description }}</p>
            </div>
          </div>

          <!-- Objectives -->
          <div class="content-section">
            <div class="section-header">
              <f7-icon ios="f7:target" md="material:track_changes" size="24" class="section-icon"></f7-icon>
              <h2>Objetivos</h2>
            </div>
            <div class="section-content">
              <ul class="objectives-list">
                <li v-for="objective in project.objectives" :key="objective" class="objective-item">
                  <f7-icon ios="f7:checkmark_circle_fill" md="material:check_circle" size="16" color="#4CAF50"></f7-icon>
                  <span>{{ objective }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Materials -->
          <div class="content-section">
            <div class="section-header">
              <f7-icon ios="f7:cube_box_fill" md="material:inventory_2" size="24" class="section-icon"></f7-icon>
              <h2>Materiais Utilizados</h2>
            </div>
            <div class="section-content">
              <div class="materials-grid">
                <div class="material-chip" v-for="material in project.materials" :key="material">
                  <f7-icon ios="f7:circle_fill" md="material:fiber_manual_record" size="8"></f7-icon>
                  <span>{{ material }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Section -->
          <div class="content-section" v-if="project.videoUrl">
            <div class="section-header">
              <f7-icon ios="f7:play_rectangle_fill" md="material:video_library" size="24" class="section-icon"></f7-icon>
              <h2>Vídeo Demonstrativo</h2>
            </div>
            <div class="section-content">
              <div class="video-container">
                <div class="video-placeholder">
                  <f7-icon ios="f7:play_circle_fill" md="material:play_circle_filled" size="60" class="play-icon"></f7-icon>
                  <f7-button fill color="red" @click="playVideo" class="play-button">
                    <f7-icon ios="f7:play_fill" md="material:play_arrow" slot="start"></f7-icon>
                    Assistir Vídeo
                  </f7-button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="content-section">
            <div class="section-header">
              <f7-icon ios="f7:chart_bar_fill" md="material:analytics" size="24" class="section-icon"></f7-icon>
              <h2>Resultados Obtidos</h2>
            </div>
            <div class="section-content">
              <p>{{ project.results }}</p>
            </div>
          </div>

          <!-- Gallery -->
          <div class="content-section" v-if="project.gallery && project.gallery.length > 0">
            <div class="section-header">
              <f7-icon ios="f7:photo_fill" md="material:photo_library" size="24" class="section-icon"></f7-icon>
              <h2>Galeria de Fotos</h2>
            </div>
            <div class="section-content">
              <div class="gallery-grid">
                <div 
                  class="gallery-item" 
                  v-for="(photo, index) in project.gallery" 
                  :key="index"
                  @click="openPhotoGallery(index)"
                >
                  <img :src="photo" :alt="`Foto ${index + 1}`" class="gallery-image">
                  <div class="gallery-overlay">
                    <f7-icon ios="f7:eye_fill" md="material:visibility" size="24"></f7-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7, f7Button, f7Icon, f7Input, f7Link, f7Navbar, f7NavRight, f7Page, f7Preloader } from 'framework7-vue'

export default {
  name: 'Project',
  components: {
    f7Page,
    f7Navbar,
    f7NavRight,
    f7Link,
    f7Icon,
    f7Button,
    f7Input,
    f7Preloader
  },
  data() {
    return {
      loading: true,
      error: null,
      hasVoted: false,
      project: null
    }
  },
  mounted() {
    this.loadProject()
  },
  methods: {
    async loadProject() {
      this.loading = true
      this.error = null
      
      try {
        const projectId = this.$route.params.id
        
        if (!projectId) {
          throw new Error('ID do projeto não encontrado')
        }
        
        const response = await fetch(`/api/project/${projectId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Projeto não encontrado')
          }
          throw new Error('Erro ao carregar projeto')
        }
        
        const data = await response.json()
        
        if (data.success) {
          this.project = data.project
          this.checkVoteStatus()
        } else {
          throw new Error(data.message || 'Erro ao carregar projeto')
        }
        
      } catch (error) {
        console.error('Erro ao carregar projeto:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    checkVoteStatus() {
      if (!this.project) return
      const voted = localStorage.getItem(`voted_${this.project._id}`)
      this.hasVoted = !!voted
    },
    
    async voteProject() {
      if (!this.project) return

      try {
        const response = await fetch(`/api/project/${this.project._id}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          
          if (data.success) {
            this.project = data.project
            this.hasVoted = true
            localStorage.setItem(`voted_${this.project._id}`, 'true')
            
          } else {
            throw new Error(data.message || 'Erro ao registrar voto')
          }
        } else {
          throw new Error('Erro ao registrar voto')
        }
      } catch (error) {
        console.error('Erro ao votar:', error)

      }
    },
    
    playVideo() {
      if (!this.project || !this.project.videoUrl) return
      
      window.open(this.project.videoUrl, '_blank')
    },
    
    openPhotoGallery(index) {
      if (!this.project || !this.project.gallery) return
      
      f7.photoBrowser.create({
        photos: this.project.gallery,
        theme: 'dark',
      }).open(index)
    },
  }
}
</script>

<style scoped>
.project-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.error-content {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
  max-width: 400px;
  width: 100%;
}

.error-icon {
  color: #ff3b30;
  margin-bottom: 20px;
  animation: error-shake 0.5s ease-in-out;
}

.error-content h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 15px 0;
}

.error-content p {
  color: #7f8c8d;
  font-size: 16px;
  margin: 0 0 25px 0;
  line-height: 1.5;
}

.retry-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  height: 50px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.project-navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(20px);
}

.project-content {
  position: relative;
}

.project-header {
  position: relative;
  margin-bottom: 30px;
}

.project-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.7) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.project-category-badge {
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.vote-badge-header {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.project-info-header {
  background: rgba(255,255,255,0.95);
  margin: -30px 20px 0;
  border-radius: 20px;
  padding: 30px 25px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 2;
}

.project-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 20px 0;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-icon {
  color: #667eea;
  flex-shrink: 0;
}

.meta-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-value {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 600;
}

.vote-section {
  padding: 0 20px 30px;
}

.vote-card {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 30px 25px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.vote-card.voted {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(255,255,255,0.95));
  border: 2px solid #4CAF50;
}

.vote-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.vote-icon {
  color: #ff6b6b;
  animation: vote-float 2s ease-in-out infinite;
}

.vote-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255, 107, 107, 0.3);
  border-radius: 50%;
  animation: vote-pulse-animation 2s ease-in-out infinite;
}

.vote-content h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.vote-content p {
  color: #7f8c8d;
  font-size: 16px;
  margin: 0 0 25px 0;
  line-height: 1.5;
}

.vote-button {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 20px;
  height: 55px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  width: 100%;
}

.vote-button:active {
  transform: translateY(2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.5);
}

.vote-success-icon {
  margin-bottom: 20px;
  animation: success-bounce 0.6s ease-out;
}

.vote-card.voted h3 {
  color: #4CAF50;
}

.vote-card.voted p {
  color: #66BB6A;
}

.content-sections {
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.content-section {
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.content-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.section-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  flex-shrink: 0;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.section-content {
  padding: 25px;
}

.section-content p {
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

.objectives-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.objective-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.5;
}

.objective-item span {
  flex: 1;
}

.materials-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.material-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.material-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.video-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: #000;
}

.video-placeholder {
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
}

.play-icon {
  color: rgba(255,255,255,0.8);
  animation: play-pulse 2s ease-in-out infinite;
}

.play-button {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 15px;
  height: 50px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes vote-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes vote-pulse-animation {
  0%, 100% { 
    opacity: 0.3; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.8; 
    transform: translate(-50%, -50%) scale(1.2); 
  }
}

@keyframes success-bounce {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes play-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .project-title {
    font-size: 20px;
  }
  
  .project-info-header {
    margin: -20px 15px 0;
    padding: 25px 20px;
  }
  
  .vote-section {
    padding: 0 15px 25px;
  }
  
  .content-sections {
    padding: 0 15px 30px;
    gap: 20px;
  }
  
  .section-header {
    padding: 15px 20px;
  }
  
  .section-content {
    padding: 20px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .materials-grid {
    gap: 8px;
  }
  
  .material-chip {
    padding: 8px 12px;
    font-size: 13px;
  }
}

/* Toast styles */
:global(.success-toast) {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
  color: white;
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

:global(.error-toast) {
  background: linear-gradient(135deg, #ff3b30, #ff6b6b);
  color: white;
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(255, 59, 48, 0.4);
}
</style>