const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

router.post('/register', async (req, res) => {
  const { user, password } = req.body;
  // console.log('Received PushSubscription:', pushSubscription);
  try {
    const userId = await db.registraUsuario(user, password);
    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!', userId });
  } catch (error) {
    res.status(500).json({ success: false, message: req.body, error: error.message });
  }
});

// Buscar todos os projetos da feira
router.get('/projects', async (req, res) => {
  try {
    const projects = await db.buscarProjetos();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao buscar projetos' });
  }
});

// Votar em um projeto
router.post('/projects/:projectId/vote', async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body; // opcional, se quiser controlar voto por usuário

  if (!projectId) {
    return res.status(400).json({ success: false, message: 'ID do projeto é obrigatório' });
  }

  try {
    const updatedProject = await db.votarProjeto(projectId, userId);
    res.status(200).json({ success: true, message: 'Voto registrado!', project: updatedProject });
  } catch (error) {
    console.error('Erro ao registrar voto:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao registrar voto' });
  }
});

module.exports = router;
