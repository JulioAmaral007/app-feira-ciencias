const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())

// Conectar ao MongoDB
mongoose
  .connect('mongodb://admin:secret@localhost:27017/feira_de_ciencias?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error("Error. Couldn't connect to MongoDB", err))

// Middleware para servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'www')))

app.use('/api', routes)

// Rota para arquivos do SPA (tratamento de rotas do Vue.js)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'www', 'index.html'))
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
