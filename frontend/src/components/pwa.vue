<template>
  <f7-page>
    <f7-navbar title="Feira de Ciências" />

    <f7-block>
      <p>Bem-vindo à feira de ciências interativa!</p>
      <f7-button
        v-if="showInstall"
        fill
        large
        color="green"
        @click="installApp"
      >
        Instalar App
      </f7-button>
    </f7-block>
  </f7-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const deferredPrompt = ref(null)
const showInstall = ref(false)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Impede que o navegador mostre o banner automaticamente
    e.preventDefault()
    deferredPrompt.value = e
    showInstall.value = true
  })
})

function installApp() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou instalar o PWA')
      } else {
        console.log('Usuário recusou instalação')
      }
      deferredPrompt.value = null
      showInstall.value = false
    })
  }
}
</script>
