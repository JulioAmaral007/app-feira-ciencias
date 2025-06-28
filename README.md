# App Feira de Ciências - Sistema de QR Codes

Este é um aplicativo para feira de ciências que permite aos visitantes escanear QR codes para acessar informações detalhadas sobre os projetos.

## 🚀 Funcionalidades

- **Scanner de QR Code**: Escaneie QR codes para acessar projetos específicos
- **Páginas Dinâmicas**: Cada projeto tem sua própria página com informações completas
- **Sistema de Votação**: Vote nos projetos que mais gostou
- **Galeria de Fotos**: Visualize fotos dos projetos
- **Comentários**: Deixe comentários sobre os projetos
- **Ranking**: Veja os projetos mais votados

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB (opcional, o sistema funciona com arquivo JSON)

## 🛠️ Instalação

### 1. Instalar dependências do Backend

```bash
cd backend
npm install
```

### 2. Instalar dependências do Frontend

```bash
cd frontend
npm install
```

## 🚀 Como Executar

### 1. Iniciar o Backend

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 2. Iniciar o Frontend

```bash
cd frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📱 Como Usar o Sistema de QR Codes

### 1. Gerar QR Codes para os Projetos

```bash
cd backend
npm run generate-qrcodes
```

Isso irá gerar QR codes para todos os projetos na pasta `backend/qrcodes/`.

### 2. Imprimir e Distribuir os QR Codes

- Imprima os QR codes gerados
- Cole-os nos stands dos projetos correspondentes
- Cada QR code contém o link direto para a página do projeto

### 3. Escanear QR Codes

1. Abra o aplicativo no celular
2. Vá para a página "Scanner"
3. Aponte a câmera para o QR code do projeto
4. O app irá automaticamente navegar para a página do projeto

## 🔧 Estrutura dos Dados

### Projetos (backend/projetos.json)

Cada projeto contém:

```json
{
  "_id": "proj001",
  "title": "Nome do Projeto",
  "category": "Categoria",
  "authors": ["Autor 1", "Autor 2"],
  "school": "Nome da Escola",
  "description": "Descrição detalhada",
  "objectives": ["Objetivo 1", "Objetivo 2"],
  "materials": ["Material 1", "Material 2"],
  "results": "Resultados obtidos",
  "image": "URL da imagem",
  "videoUrl": "URL do vídeo",
  "votes": 0,
  "gallery": ["URL1", "URL2"],
  "comments": [
    {
      "id": 1,
      "author": "Nome",
      "text": "Comentário",
      "time": "10:30"
    }
  ]
}
```

## 🌐 Rotas da API

### GET /api/projects
Retorna todos os projetos

### GET /api/projects/:id
Retorna um projeto específico por ID

### POST /api/projects/:id/vote
Registra um voto em um projeto

## 📱 Rotas do Frontend

- `/` - Página inicial
- `/project/:id` - Página de um projeto específico
- `/scanner` - Scanner de QR codes
- `/ranking` - Ranking dos projetos

## 🎯 Fluxo de Uso

1. **Visitante chega na feira**
2. **Escaneia QR code** de um projeto que lhe interessa
3. **Visualiza informações** completas do projeto
4. **Vota no projeto** se gostou
5. **Deixa comentário** sobre o projeto
6. **Compartilha** o projeto com outros

## 🔄 Adicionando Novos Projetos

1. Adicione o projeto no arquivo `backend/projetos.json`
2. Execute `npm run generate-qrcodes` para gerar o QR code
3. Imprima e cole o QR code no stand do projeto

## 🛠️ Personalização

### Alterar URL Base

No arquivo `backend/generate-qrcodes.js`, altere a variável `baseUrl`:

```javascript
const baseUrl = 'https://seu-dominio.com'; // Para produção
```

### Adicionar Novos Campos

Para adicionar novos campos aos projetos, edite o arquivo `projetos.json` e atualize a página `ProjectPage.vue` para exibir os novos campos.

## 🐛 Solução de Problemas

### QR Code não funciona
- Verifique se o servidor está rodando
- Confirme se a URL no QR code está correta
- Teste o QR code com outro aplicativo

### Scanner não funciona
- Verifique se o navegador tem permissão para acessar a câmera
- Teste em HTTPS (alguns navegadores exigem)

### Projeto não carrega
- Verifique se o ID do projeto existe no arquivo `projetos.json`
- Confirme se a API está funcionando

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com a equipe de desenvolvimento. 