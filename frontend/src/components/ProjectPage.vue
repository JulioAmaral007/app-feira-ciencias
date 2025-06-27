<template>
  <f7-page name="project">
    <!-- Top Navbar -->
    <f7-navbar :title="project.title" back-link="Voltar">
      <f7-nav-right>
        <f7-link icon-ios="f7:share" icon-md="material:share" @click="shareProject"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page content -->
    <div class="page-content">
      <!-- Project Header -->
      <div class="block">
        <div class="card project-card">
          <div class="card-content card-content-padding">
            <img :src="project.image" :alt="project.title" class="project-image">
            <div style="padding-top: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <div>
                  <h2>{{ project.title }}</h2>
                  <p class="color-gray">{{ project.category }}</p>
                </div>
                <span class="badge color-blue">{{ project.votes }} votos</span>
              </div>
              
              <!-- Authors -->
              <div style="margin-bottom: 15px;">
                <strong>Autores:</strong>
                <p>{{ project.authors.join(', ') }}</p>
              </div>
              
              <!-- School -->
              <div style="margin-bottom: 15px;">
                <strong>Escola:</strong>
                <p>{{ project.school }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vote Section -->
      <div class="block block-strong inset" v-if="!hasVoted">
        <div style="text-align: center;">
          <h3>Gostou deste projeto?</h3>
          <p>Seu voto ajuda a destacar os melhores projetos da feira!</p>
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

      <div class="block block-strong inset" v-else>
        <div style="text-align: center; color: #4CAF50;">
          <f7-icon ios="f7:checkmark_circle_fill" md="material:check_circle" size="40" color="green"></f7-icon>
          <h3>Obrigado pelo seu voto!</h3>
          <p>Você já votou neste projeto.</p>
        </div>
      </div>

      <!-- Project Description -->
      <div class="block-title">Descrição do Projeto</div>
      <div class="block block-strong inset">
        <p>{{ project.description }}</p>
      </div>

      <!-- Objectives -->
      <div class="block-title">Objetivos</div>
      <div class="block block-strong inset">
        <ul>
          <li v-for="objective in project.objectives" :key="objective">{{ objective }}</li>
        </ul>
      </div>

      <!-- Materials -->
      <div class="block-title">Materiais Utilizados</div>
      <div class="block block-strong inset">
        <div class="chip" v-for="material in project.materials" :key="material" style="margin: 2px;">
          <div class="chip-label">{{ material }}</div>
        </div>
      </div>

      <!-- Video Section -->
      <div class="block-title" v-if="project.videoUrl">Vídeo Demonstrativo</div>
      <div class="block" v-if="project.videoUrl">
        <div class="card">
          <div class="card-content card-content-padding">
            <div style="position: relative; width: 100%; height: 200px; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <f7-button fill color="red" @click="playVideo">
                <f7-icon ios="f7:play_fill" md="material:play_arrow" slot="start"></f7-icon>
                Assistir Vídeo
              </f7-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="block-title">Resultados Obtidos</div>
      <div class="block block-strong inset">
        <p>{{ project.results }}</p>
      </div>

      <!-- Gallery -->
      <div class="block-title" v-if="project.gallery.length > 0">Galeria de Fotos</div>
      <div class="block" v-if="project.gallery.length > 0">
        <div class="row">
          <div class="col-50" v-for="(photo, index) in project.gallery" :key="index">
            <img 
              :src="photo" 
              :alt="`Foto ${index + 1}`" 
              style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;"
              @click="openPhotoGallery(index)"
            >
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="block-title">Comentários</div>
      <div class="block">
        <div class="list">
          <ul>
            <li v-for="comment in project.comments" :key="comment.id">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">{{ comment.author }}</div>
                    <div class="item-after">{{ comment.time }}</div>
                  </div>
                  <div class="item-subtitle">{{ comment.text }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Add Comment -->
      <div class="block">
        <f7-input
          type="textarea"
          placeholder="Deixe seu comentário sobre este projeto..."
          v-model="newComment"
          resizable
        ></f7-input>
        <f7-button 
          fill 
          color="blue" 
          @click="addComment"
          :disabled="!newComment.trim()"
          style="margin-top: 10px;"
        >
          Adicionar Comentário
        </f7-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7, f7Button, f7Icon, f7Input, f7Link, f7Navbar, f7NavRight, f7Page } from 'framework7-vue'

export default {
  name: 'Project',
  components: {
    f7Page,
    f7Navbar,
    f7NavRight,
    f7Link,
    f7Icon,
    f7Button,
    f7Input
  },
  data() {
    return {
      hasVoted: false,
      newComment: '',
      project: {
        id: 1,
        title: "Energia Solar Caseira",
        category: "Física",
        authors: ["Ana Silva", "João Santos", "Maria Oliveira"],
        school: "Escola Estadual Dom Pedro II",
        description: "Este projeto demonstra como construir um sistema de captação de energia solar de baixo custo para residências, utilizando materiais recicláveis e componentes eletrônicos básicos. O objetivo é tornar a energia renovável mais acessível para famílias de baixa renda.",
        objectives: [
          "Desenvolver um sistema solar de baixo custo",
          "Utilizar materiais recicláveis",
          "Demonstrar a viabilidade da energia renovável",
          "Educar sobre sustentabilidade"
        ],
        materials: ["Células solares", "Bateria 12V", "Inversor", "Fios", "Madeira reciclada", "Vidro temperado"],
        results: "O sistema desenvolvido consegue gerar até 100W de energia, suficiente para alimentar lâmpadas LED e carregar dispositivos móveis. O custo total foi 70% menor que sistemas comerciais equivalentes.",
        image: "/placeholder.svg?height=300&width=400",
        videoUrl: "https://example.com/video.mp4",
        votes: 45,
        gallery: [
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200"
        ],
        comments: [
          {
            id: 1,
            author: "Prof. Carlos",
            text: "Excelente projeto! Muito criativo e sustentável.",
            time: "10:30"
          },
          {
            id: 2,
            author: "Visitante",
            text: "Parabéns pela iniciativa! Quando estará disponível?",
            time: "11:15"
          }
        ]
      }
    }
  },
  mounted() {
    this.loadProject()
    this.checkVoteStatus()
  },
  methods: {
    loadProject() {
      // Carregar dados do projeto baseado no ID da rota
      const projectId = this.$f7route.params.id
      console.log('Carregando projeto:', projectId)
      // Em um app real, isso viria de uma API
    },
    
    checkVoteStatus() {
      // Verificar se o usuário já votou neste projeto
      const voted = localStorage.getItem(`voted_${this.project.id}`)
      this.hasVoted = !!voted
    },
    
    voteProject() {
      f7.dialog.confirm(
        'Tem certeza que deseja votar neste projeto?',
        'Confirmar Voto',
        () => {
          // Registrar voto
          this.project.votes++
          this.hasVoted = true
          localStorage.setItem(`voted_${this.project.id}`, 'true')
          
          f7.toast.create({
            text: 'Voto registrado com sucesso!',
            position: 'center',
            closeTimeout: 2000,
          }).open()
        }
      )
    },
    
    shareProject() {
      if (navigator.share) {
        navigator.share({
          title: this.project.title,
          text: this.project.description,
          url: window.location.href,
        })
      } else {
        f7.toast.create({
          text: 'Link copiado para a área de transferência!',
          position: 'center',
          closeTimeout: 2000,
        }).open()
      }
    },
    
    playVideo() {
      f7.toast.create({
        text: 'Abrindo vídeo...',
        position: 'center',
        closeTimeout: 1500,
      }).open()
    },
    
    openPhotoGallery(index) {
      f7.photoBrowser.create({
        photos: this.project.gallery,
        theme: 'dark',
      }).open(index)
    },
    
    addComment() {
      if (this.newComment.trim()) {
        const comment = {
          id: Date.now(),
          author: 'Você',
          text: this.newComment.trim(),
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
        
        this.project.comments.push(comment)
        this.newComment = ''
        
        f7.toast.create({
          text: 'Comentário adicionado!',
          position: 'center',
          closeTimeout: 2000,
        }).open()
      }
    }
  }
}
</script>
