<template>
  <f7-page name="projects-list">
    <!-- Top Navbar -->
    <f7-navbar title="Todos os Projetos" back-link="Voltar">
      <f7-nav-right>
        <f7-link icon-ios="f7:search" icon-md="material:search" @click="toggleSearch"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Search Bar -->
    <f7-searchbar
      v-if="showSearch"
      :value="searchQuery"
      @input="searchQuery = $event.target.value"
      placeholder="Buscar projetos..."
      :disable-button="false"
      @searchbar:clear="clearSearch"
    ></f7-searchbar>

    <!-- Page content -->
    <div class="page-content">
      <!-- Filter Tabs -->
      <div class="toolbar tabbar">
        <div class="toolbar-inner">
          <a 
            v-for="category in categories" 
            :key="category.id"
            :class="['tab-link', { 'tab-link-active': activeCategory === category.id }]"
            @click="setActiveCategory(category.id)"
          >
            {{ category.name }}
          </a>
        </div>
      </div>

      <!-- Projects Stats -->
      <div class="block block-strong inset">
        <div class="row">
          <div class="col-50" style="text-align: center;">
            <h3 class="color-blue">{{ filteredProjects.length }}</h3>
            <p>Projetos Encontrados</p>
          </div>
          <div class="col-50" style="text-align: center;">
            <h3 class="color-green">{{ totalVotes }}</h3>
            <p>Total de Votos</p>
          </div>
        </div>
      </div>

      <!-- Sort Options -->
      <div class="block">
        <div class="row">
          <div class="col-50">
            <f7-button 
              small 
              :fill="sortBy === 'votes'" 
              :outline="sortBy !== 'votes'"
              @click="setSortBy('votes')"
            >
              Mais Votados
            </f7-button>
          </div>
          <div class="col-50">
            <f7-button 
              small 
              :fill="sortBy === 'name'" 
              :outline="sortBy !== 'name'"
              @click="setSortBy('name')"
            >
              Alfabética
            </f7-button>
          </div>
        </div>
      </div>

      <!-- Projects List -->
      <div class="block" v-if="filteredProjects.length > 0">
        <div v-for="project in sortedProjects" :key="project.id" class="card project-card">
          <div class="card-content card-content-padding">
            <div class="row">
              <div class="col-30">
                <img :src="project.image" :alt="project.title" style="width: 100%; height: 80px; object-fit: cover; border-radius: 8px;">
              </div>
              <div class="col-70" style="padding-left: 15px;">
                <h4>{{ project.title }}</h4>
                <p class="color-gray" style="font-size: 12px;">{{ project.category }}</p>
                <p style="font-size: 13px; margin: 5px 0;">{{ project.shortDescription }}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                  <div>
                    <span class="badge color-blue">{{ project.votes }} votos</span>
                    <span class="badge color-gray" style="margin-left: 5px;">{{ project.school }}</span>
                  </div>
                  <f7-button small outline :href="`/project/${project.id}`">Ver</f7-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="block block-strong inset" style="text-align: center; padding: 40px;">
        <f7-icon ios="f7:search" md="material:search" size="60" color="gray"></f7-icon>
        <h3>Nenhum projeto encontrado</h3>
        <p>Tente ajustar os filtros ou termo de busca.</p>
        <f7-button outline color="blue" @click="clearFilters">Limpar Filtros</f7-button>
      </div>

      <!-- Load More -->
      <div class="block" v-if="hasMoreProjects">
        <f7-button fill large color="blue" @click="loadMoreProjects">
          Carregar Mais Projetos
        </f7-button>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7Button, f7Icon, f7Link, f7Navbar, f7NavRight, f7Page, f7Searchbar } from 'framework7-vue'

export default {
  name: 'ProjectList',
  components: {
    f7Page,
    f7Navbar,
    f7NavRight,
    f7Link,
    f7Searchbar,
    f7Icon,
    f7Button
  },
  data() {
    return {
      showSearch: false,
      searchQuery: '',
      activeCategory: 'all',
      sortBy: 'votes',
      hasMoreProjects: true,
      categories: [
        { id: 'all', name: 'Todos' },
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
          votes: 45,
          school: "Dom Pedro II"
        },
        {
          id: 2,
          title: "Purificador de Água Natural",
          category: "Química",
          shortDescription: "Filtro natural usando materiais sustentáveis.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 38,
          school: "Santos Dumont"
        },
        {
          id: 3,
          title: "Robô Assistente",
          category: "Tecnologia",
          shortDescription: "Robô programado para auxiliar pessoas com deficiência.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 52,
          school: "Einstein"
        },
        {
          id: 4,
          title: "Cultivo Hidropônico",
          category: "Biologia",
          shortDescription: "Sistema de cultivo sem solo para pequenos espaços.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 29,
          school: "Mendel"
        },
        {
          id: 5,
          title: "Calculadora Quântica",
          category: "Matemática",
          shortDescription: "Simulador de computação quântica básica.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 41,
          school: "Newton"
        },
        {
          id: 6,
          title: "Detector de Poluição",
          category: "Química",
          shortDescription: "Sensor para medir qualidade do ar em tempo real.",
          image: "/placeholder.svg?height=200&width=300",
          votes: 33,
          school: "Curie"
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      let filtered = this.projects

      // Filtrar por categoria
      if (this.activeCategory !== 'all') {
        const categoryName = this.categories.find(c => c.id === this.activeCategory)?.name
        filtered = filtered.filter(p => p.category === categoryName)
      }

      // Filtrar por busca
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.school.toLowerCase().includes(query)
        )
      }

      return filtered
    },
    
    sortedProjects() {
      const sorted = [...this.filteredProjects]
      
      if (this.sortBy === 'votes') {
        return sorted.sort((a, b) => b.votes - a.votes)
      } else if (this.sortBy === 'name') {
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      }
      
      return sorted
    },
    
    totalVotes() {
      return this.filteredProjects.reduce((sum, project) => sum + project.votes, 0)
    }
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch
      if (!this.showSearch) {
        this.searchQuery = ''
      }
    },
    
    clearSearch() {
      this.searchQuery = ''
    },
    
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId
    },
    
    setSortBy(sortType) {
      this.sortBy = sortType
    },
    
    clearFilters() {
      this.activeCategory = 'all'
      this.searchQuery = ''
      this.sortBy = 'votes'
    },
    
    loadMoreProjects() {
      // Simular carregamento de mais projetos
      setTimeout(() => {
        this.hasMoreProjects = false
      }, 1000)
    }
  }
}
</script>
