<template>
  <f7-page name="scanner" class="scanner-page">

    <!-- Page content -->
    <div class="page-content">
      <!-- Header Section -->
      <div class="scanner-header">
        <div class="scanner-icon-container">
          <f7-icon ios="f7:qrcode_viewfinder" md="material:qr_code_scanner" size="60" class="scanner-icon"></f7-icon>
          <div class="scanner-pulse"></div>
        </div>
        <h2 class="scanner-title">Escaneie o QR Code</h2>
        <p class="scanner-subtitle">Aponte a câmera para o QR Code do projeto que deseja visualizar.</p>
      </div>

      <!-- Scanner Container -->
      <div class="scanner-container-modern">
        <div class="scanner-frame">
          <div id="qr-reader" class="qr-reader"></div>
        </div>
        <div class="scanner-status">
          <div class="status-indicator active"></div>
          <span>Scanner Ativo</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="scanner-controls">
        <f7-button 
          fill 
          large 
          @click="stopCamera"
          class="stop-button"
        >
          <f7-icon ios="f7:stop_circle" md="material:stop_circle" slot="start"></f7-icon>
          Parar Scanner
        </f7-button>
      </div>

      <!-- Recent Scans -->
      <div class="section-modern">
        <div class="section-header">
          <h3>Últimos Projetos Escaneados</h3>
          <div class="section-line"></div>
        </div>
        <div class="recent-scans">
          <div v-for="scan in recentScans" :key="scan.id" class="scan-item">
            <div class="scan-icon">
              <f7-icon ios="f7:qrcode" md="material:qr_code" size="20"></f7-icon>
            </div>
            <div class="scan-info">
              <div class="scan-name">{{ scan.projectName }}</div>
              <div class="scan-time">{{ scan.time }}</div>
            </div>
            <div class="scan-arrow">
              <f7-icon ios="f7:chevron_right" md="material:chevron_right" size="16"></f7-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import { f7, f7Button, f7Icon, f7Input, f7Navbar, f7Page } from 'framework7-vue';
import { Html5Qrcode } from "html5-qrcode";

export default {
  name: 'Scanner',
  components: {
    f7Page,
    f7Navbar,
    f7Icon,
    f7Button,
    f7Input
  },
  data() {
    return {
      cameraActive: false,
      html5QrCode: null,
      manualCode: '',
      recentScans: [
        { id: 1, projectName: "Energia Solar Caseira", time: "10:30" },
        { id: 2, projectName: "Purificador de Água", time: "10:15" },
        { id: 3, projectName: "Robô Assistente", time: "09:45" }
      ]
    }
  },
  methods: {
    startCamera() {
      this.cameraActive = true;

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      this.html5QrCode = new Html5Qrcode("qr-reader");

      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          this.html5QrCode.start(
            cameraId,
            config,
            (decodedText, decodedResult) => {
              this.onScanSuccess(decodedText);
            },
            errorMessage => {
              // QR leitura com erro
            }
          );
        }
      }).catch(err => {
        f7.dialog.alert("Erro ao acessar a câmera: " + err);
      });

    },

    stopCamera() {
      if (this.html5QrCode) {
        this.html5QrCode.stop().then(() => {
          this.html5QrCode.clear();
          this.html5QrCode = null;
        });
      }

      this.cameraActive = false;

    },

    onScanSuccess(decodedText) {
      this.stopCamera();

      console.log(decodedText);

      setTimeout(() => {
        this.$f7.views.main.router.navigate(`/project/${decodedText}`);
      }, 1000);
    },
  },

  mounted() {
    this.startCamera();
  }
}
</script>

<style scoped>
.scanner-page {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  min-height: 100vh;
}

.scanner-navbar {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  backdrop-filter: blur(10px);
}

.scanner-header {
  text-align: center;
  padding: 30px 20px;
  position: relative;
}

.scanner-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.scanner-icon {
  color: white;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.scanner-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  animation: scanner-pulse 2s ease-in-out infinite;
}

.scanner-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.scanner-subtitle {
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  max-width: 280px;
  margin: 0 auto;
}

.scanner-container-modern {
  margin: 0 20px 30px;
  position: relative;
}

.scanner-frame {
  position: relative;
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.qr-reader {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}

.scanner-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  pointer-events: none;
  border-radius: 12px;
}

.scanner-corners {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #00ff88;
  border-radius: 4px;
}

.corner.top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.corner.top-right {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.corner.bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.corner.bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

.scanner-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff88, transparent);
  animation: scanner-line 2s ease-in-out infinite;
}

.scanner-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88;
  animation: status-blink 1.5s ease-in-out infinite;
}

.scanner-controls {
  padding: 0 20px 30px;
}

.stop-button {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 16px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255,107,107,0.3);
  transition: all 0.3s ease;
}

.stop-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 8px rgba(255,107,107,0.4);
}

.section-modern {
  margin: 0 20px 30px;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.section-header {
  margin-bottom: 20px;
}

.section-header h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.section-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #1e3c72, #2a5298);
  border-radius: 2px;
}

.recent-scans {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scan-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(30,60,114,0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.scan-item:active {
  background: rgba(30,60,114,0.1);
  transform: translateX(5px);
}

.scan-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
}

.scan-info {
  flex: 1;
}

.scan-name {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
}

.scan-time {
  font-size: 12px;
  color: #7f8c8d;
}

.scan-arrow {
  color: #bdc3c7;
}

  

@keyframes scanner-pulse {
  0%, 100% { 
    opacity: 0.3; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.8; 
    transform: translate(-50%, -50%) scale(1.2); 
  }
}

@keyframes scanner-line {
  0%, 100% { 
    transform: translate(-50%, -50%) translateY(-50px); 
    opacity: 0; 
  }
  50% { 
    transform: translate(-50%, -50%) translateY(0px); 
    opacity: 1; 
  }
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
