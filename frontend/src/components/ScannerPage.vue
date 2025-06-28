<template>
  <f7-page name="scanner" class="scanner-page">
    <!-- Page content -->
    <div class="page-content">
      <!-- Header Section -->
      <div class="scanner-header">
        <div class="scanner-icon-container">
          <f7-icon ios="f7:qrcode_viewfinder" md="material:qr_code_scanner" size="60" class="scanner-icon"></f7-icon>
          <div class="scanner-pulse"></div>
          <div class="scanner-pulse-secondary"></div>
        </div>
        <h2 class="scanner-title">Escaneie o QR Code</h2>
        <p class="scanner-subtitle">Aponte a câmera para o QR Code do projeto que deseja visualizar.</p>
      </div>

      <!-- Scanner Container -->
      <div class="scanner-container-modern">
        <div class="scanner-frame">
          <div id="qr-reader" class="qr-reader"></div>
          <div class="scanner-overlay">
            <div class="scanner-corners">
              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>
            </div>
            <div class="scanner-line"></div>
          </div>
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

      <!-- Instructions -->
      <div class="scanner-instructions">
        <div class="instruction-item">
          <div class="instruction-icon">
            <f7-icon ios="f7:camera" md="material:camera_alt" size="24"></f7-icon>
          </div>
          <div class="instruction-text">
            <h4>Posicione a câmera</h4>
            <p>Mantenha o QR code dentro da área de escaneamento</p>
          </div>
        </div>
        <div class="instruction-item">
          <div class="instruction-icon">
            <f7-icon ios="f7:light_max" md="material:wb_sunny" size="24"></f7-icon>
          </div>
          <div class="instruction-text">
            <h4>Boa iluminação</h4>
            <p>Certifique-se de ter luz suficiente para uma leitura clara</p>
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
    }
  },
  methods: {
    startCamera() {
  this.cameraActive = true;
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };
  this.html5QrCode = new Html5Qrcode("qr-reader");

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      // Tenta achar a câmera traseira
      const backCamera = devices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('rear')
      );

      // Usa a traseira se encontrar, senão pega a primeira
      const cameraId = backCamera ? backCamera.id : devices[0].id;

      this.html5QrCode.start(
        cameraId,
        config,
        (decodedText, decodedResult) => {
          this.onScanSuccess(decodedText);
        },
        errorMessage => {
          // leitura com erro, pode ignorar ou exibir no console
          console.warn("Erro de leitura QR:", errorMessage);
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
      setTimeout(() => {
        this.$router.push("/project/" + decodedText);
      }, 1500);
    },
  },

  mounted() {
    this.startCamera();
  }
}
</script>

<style scoped>
.scanner-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.scanner-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.scanner-header {
  text-align: center;
  padding: 40px 20px 30px;
  position: relative;
  z-index: 2;
}

.scanner-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 25px;
}

.scanner-icon {
  color: white;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
  animation: scanner-float 3s ease-in-out infinite;
}

.scanner-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border: 2px solid rgba(255,255,255,0.4);
  border-radius: 50%;
  animation: scanner-pulse 2s ease-in-out infinite;
}

.scanner-pulse-secondary {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  animation: scanner-pulse 2s ease-in-out infinite 0.5s;
}

.scanner-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  letter-spacing: -0.5px;
}

.scanner-subtitle {
  color: rgba(255,255,255,0.9);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 320px;
  margin: 0 auto;
  font-weight: 400;
}

.scanner-container-modern {
  margin: 0 20px 30px;
  position: relative;
  z-index: 2;
}

.scanner-frame {
  position: relative;
  background: rgba(255,255,255,0.15);
  border-radius: 24px;
  padding: 25px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow: 
    0 8px 32px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.2);
}

.qr-reader {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.scanner-overlay {
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  bottom: 25px;
  pointer-events: none;
  border-radius: 16px;
}

.scanner-corners {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
}

.corner {
  position: absolute;
  width: 35px;
  height: 35px;
  border: 4px solid #00ff88;
  border-radius: 6px;
  animation: corner-glow 2s ease-in-out infinite;
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
  width: 200px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #00ff88, #00ff88, transparent);
  border-radius: 2px;
  animation: scanner-line 2.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.scanner-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00ff88;
  animation: status-blink 1.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.scanner-controls {
  padding: 0 20px 30px;
  position: relative;
  z-index: 2;
}

.stop-button {
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 
    0 8px 25px rgba(255,107,107,0.4),
    0 4px 10px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  position: relative;
  overflow: hidden;
}

.stop-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.stop-button:active {
  transform: translateY(2px);
  box-shadow: 
    0 4px 15px rgba(255,107,107,0.5),
    0 2px 5px rgba(0,0,0,0.2);
}

.stop-button:active::before {
  left: 100%;
}

.scanner-instructions {
  padding: 0 20px 40px;
  position: relative;
  z-index: 2;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.3s ease;
}

.instruction-item:hover {
  background: rgba(255,255,255,0.15);
  transform: translateX(5px);
}

.instruction-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.instruction-text h4 {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.instruction-text p {
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
}

@keyframes scanner-float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-8px) rotate(2deg); 
  }
}

@keyframes scanner-pulse {
  0%, 100% { 
    opacity: 0.3; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.8; 
    transform: translate(-50%, -50%) scale(1.15); 
  }
}

@keyframes scanner-line {
  0%, 100% { 
    transform: translate(-50%, -50%) translateY(-60px); 
    opacity: 0; 
  }
  10%, 90% {
    opacity: 1;
  }
  50% { 
    transform: translate(-50%, -50%) translateY(60px); 
    opacity: 1; 
  }
}

@keyframes corner-glow {
  0%, 100% { 
    box-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
  }
  50% { 
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
  }
}

@keyframes status-blink {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.4; 
    transform: scale(0.8);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .scanner-title {
    font-size: 24px;
  }
  
  .scanner-subtitle {
    font-size: 14px;
  }
  
  .scanner-corners {
    width: 180px;
    height: 180px;
  }
  
  .scanner-line {
    width: 160px;
  }
}
</style>