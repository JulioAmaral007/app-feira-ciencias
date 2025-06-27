<template>
  <f7-page name="ranking">
    <!-- Top Navbar -->
    <f7-navbar title="Ranking de Votos" back-link="Voltar">
      <f7-nav-right>
        <f7-link icon-ios="f7:arrow_clockwise" icon-md="material:refresh" @click="refreshRanking"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Page content -->
    <div class="page-content">
      <!-- Top 3 Podium -->
      <div class="block">
        <div class="card">
          <div class="card-content card-content-padding">
            <h3 style="text-align: center; margin-bottom: 20px;">🏆 Top 3 Projetos</h3>
            
            <div class="row" style="align-items: end; text-align: center;">
              <!-- 2º Lugar -->
              <div class="col-33" v-if="topProjects[1]">
                <div style="background: linear-gradient(45deg, #c0c0c0, #e8e8e8); height: 80px; border-radius: 8px 8px 0 0; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                  <span style="font-size: 24px; font-weight: bold; color: #666;">2º</span>
                </div>
                <img :src="topProjects[1].image" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 8px;">
                <h4 style="font-size: 14px; margin: 0;">{{ topProjects[1].title }}</h4>
                <p style="font-size: 12px; color: #666; margin: 2px 0;">{{ topProjects[1].votes }} votos</p>
              </div>
              
              <!-- 1º Lugar -->
              <div class="col-33" v-if="topProjects[0]">
                <div style="background: linear-gradient(45deg, #ffd700, #ffed4e); height: 100px; border-radius: 8px 8px 0 0; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                  <span style="font-size: 28px; font-weight: bold; color: #b8860b;">1º</span>
                </div>
                <img :src="topProjects[0].image" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; margin-bottom: 8px; border: 3px solid #ffd700;">
                <h4 style="font-size: 16px; margin: 0; font-weight: bold;">{{ topProjects[0].title }}</h4>
                <p style="font-size: 14px; color: #666; margin: 2px 0; font-weight: bold;">{{ topProjects[0].votes }} votos</p>
              </div>
              
              <!-- 3º Lugar -->
              <div class="col-33" v-if="topProjects[2]">
                <div style="background: linear-gradient(45deg, #cd7f32, #daa520); height: 60px; border-radius: 8px 8px 0 0; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                  <span style="font-size: 20px; font-weight: bold; color: #8b4513;">3º</span>
                </div>
                <img :src="topProjects[2].image" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-bottom: 8px;">
                <h4 style="font-size: 12px; margin: 0;">{{ topProjects[2].title }}</h4>
                <p style="font-size: 11px; color: #666; margin: 2px 0;">{{ topProjects[2].votes }} votos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Options -->
      <div class="block">
        <div class="row">
          <div class="col-50">
            <f7-button 
              small 
              :fill="rankingType === 'all'" 
              :outline="rankingType !== 'all'"
              @click="setRankingType('all')"
            >
              Geral
            </f7-button>
          </div>
          <div class="col-50">
            <f7-button 
              small 
              :fill="rankingType === 'category'" 
              :outline="rankingType !== 'category'"
              @click="setRankingType('category')"
            >
              Por Categoria
            </f7-button>
          </div>
        </div>
      </div>

      <!-- Category Selector -->
      <div class="block" v-if="rankingType === 'category'">
        <div class="list">
          <ul>
            <li>
              <div class="item-content item-input">
                <div class="item-inner">
                  <div class="item-title item-label">Categoria</div>
                  <div class="item-input-wrap">
                    <select v-model="selectedCategory">
                      <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Statistics -->
      <div class="block block-strong inset">
        <div class="row">
          <div class="col-33" style="text-align: center;">
            <h3 class="color-blue">{{ totalProjects }}</h3>
            <p>Projetos</p>
          </div>
          <div class="col-33" style="text-align: center;">
            <h3 class="color-green">{{ totalVotes }}</h3>
            <p>Votos</p>
          </div>
          <div class="col-33" style="text-align: center;">
            <h3 class="color-orange">{{ averageVotes }}</h3>
            <p>Média</p>
          </div>
        </div>
      </div>

      <!-- Complete Ranking -->
      <div class="block-title">Ranking Completo</div>
      <div class="list">
        <ul>
          <li v-for="(project, index) in rankedProjects" :key="project.id" class="ranking-item">
            <div class="item-content">
              <div class="item-media">
                <div :class="['ranking-position', getPositionClass(index + 1)]">
                  {{ index + 1 }}
                </div>
              </div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">{{ project.title }}</div>
                  <div class="item-after">
                    <span class="badge color-blue">{{ project.votes }}</span>
                  </div>
                </div>
                <div class="item-subtitle">{{ project.category }} • {{ project.school }}</div>
                <div class="item-text">{{ project.shortDescription }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Voting Progress -->
      <div class="block-title">Progresso de Votação</div>
      <div class="block block-strong inset">
        <div v-for="project in rankedProjects.slice(0, 5)" :key="project.id" style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <span style="font-size: 14px; font-weight: 500;">{{ project.title }}</span>
            <span style="font-size: 12px; color: #666;">{{ project.votes }} votos</span>
          </div>
          <div style="background: #f0f0f0; height: 8px; border-radius: 4px; overflow: hidden;">
            <div 
              style="height: 100%; background: linear-gradient(90deg, #007aff, #34aadc); border-radius: 4px; transition: width 0.3s ease;"
              :style="{ width: (project.votes / maxVotes * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Export Options -->
      <div class="block">
        <f7-button outline color="blue" @click="exportRanking">
          <f7-icon ios="f7:square_arrow_up" md="material:share" slot="start"></f7-icon>
          Compartilhar Ranking
        </f7-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7, f7Button, f7Icon, f7Link, f7Navbar, f7NavRight, f7Page } from 'framework7-vue'

export default {
  name: 'Ranking',
  components: {
    f7Page,
    f7Navbar,
    f7NavRight,
    f7Link,
    f7Button,
    f7Icon
  },
  data() {
    return {
      rankingType: 'all',
      selectedCategory: 'fisica',
      categories: [
        { id: 'fisica', name: 'Física' },
        { id: 'quimica', name: 'Química' },
        { id: 'biologia', name: 'Biologia' },
        { id: 'tecnologia', name: 'Tecnologia' },
        { id: 'matematica', name: 'Matemática' }
      ],
      projects: [
        {
          id: 1,
          title: "Energia Solar Caseira",
          category: "Física",
          shortDescription: "Sistema de captação de energia solar para residências.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 52,
          school: "Dom Pedro II"
        },
        {
          id: 2,
          title: "Robô Assistente",
          category: "Tecnologia",
          shortDescription: "Robô programado para auxiliar pessoas com deficiência.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 48,
          school: "Einstein"
        },
        {
          id: 3,
          title: "Calculadora Quântica",
          category: "Matemática",
          shortDescription: "Simulador de computação quântica básica.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 41,
          school: "Newton"
        },
        {
          id: 4,
          title: "Purificador de Água Natural",
          category: "Química",
          shortDescription: "Filtro natural usando materiais sustentáveis.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 38,
          school: "Santos Dumont"
        },
        {
          id: 5,
          title: "Detector de Poluição",
          category: "Química",
          shortDescription: "Sensor para medir qualidade do ar em tempo real.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 33,
          school: "Curie"
        },
        {
          id: 6,
          title: "Cultivo Hidropônico",
          category: "Biologia",
          shortDescription: "Sistema de cultivo sem solo para pequenos espaços.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 29,
          school: "Mendel"
        }
      ]
    }
  },
  computed: {
    rankedProjects() {
      let filtered = [...this.projects]
      
      if (this.rankingType === 'category') {
        const categoryName = this.categories.find(c => c.id === this.selectedCategory)?.name
        filtered = filtered.filter(p => p.category === categoryName)
      }
      
      return filtered.sort((a, b) => b.votes - a.votes)
    },
    
    topProjects() {
      return this.rankedProjects.slice(0, 3)
    },
    
    totalProjects() {
      return this.rankedProjects.length
    },
    
    totalVotes() {
      return this.rankedProjects.reduce((sum, project) => sum + project.votes, 0)
    },
    
    averageVotes() {
      return this.totalProjects > 0 ? Math.round(this.totalVotes / this.totalProjects) : 0
    },
    
    maxVotes() {
      return this.rankedProjects.length > 0 ? this.rankedProjects[0].votes : 1
    }
  },
  methods: {
    setRankingType(type) {
      this.rankingType = type
    },
    
    getPositionClass(position) {
      if (position === 1) return 'position-1'
      if (position === 2) return 'position-2'
      if (position === 3) return 'position-3'
      return 'position-other'
    },
    
    refreshRanking() {
      f7.preloader.show()
      
      // Simular atualização dos dados
      setTimeout(() => {
        f7.preloader.hide()
        f7.toast.create({
          text: 'Ranking atualizado!',
          position: 'center',
          closeTimeout: 2000,
        }).open()
      }, 1500)
    },
    
    exportRanking() {
      const rankingText = this.rankedProjects
        .map((project, index) => `${index + 1}º - ${project.title} (${project.votes} votos)`)
        .join('\n')
      
      if (navigator.share) {
        navigator.share({
          title: 'Ranking Feira de Ciências',
          text: `🏆 Ranking de Votos:\n\n${rankingText}`,
        })
      } else {
        f7.toast.create({
          text: 'Ranking copiado para área de transferência!',
          position: 'center',
          closeTimeout: 2000,
        }).open()
      }
    }
  }
}
</script>
