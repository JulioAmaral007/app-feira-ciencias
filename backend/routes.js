const express = require('express');
const router = express.Router();
const Project = require('./model/project');

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Buscar dados completos da home page
router.get('/home', async (req, res) => {
  try {
    const projects = await Project.find({});
    
    // Calcular estatísticas
    const totalProjects = projects.length;
    const totalVotes = projects.reduce((sum, project) => sum + (project.votes || 0), 0);
    
    const stats = {
      totalProjects,
      totalVotes
    };
    
    // Buscar top 3 do ranking dos projetos (ordenados por votos)
    const ranking = projects
      .sort((a, b) => (b.votes || 0) - (a.votes || 0))
      .slice(0, 3) // Pegar apenas os 3 primeiros
      .map((project, index) => ({
        ...project.toObject(),
        position: index + 1
      }));
    
    res.status(200).json({ 
      success: true, 
      stats,
      ranking,
      message: 'Dados da home carregados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao carregar dados da home:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao carregar dados da home' });
  }
});

// Buscar um projeto específico por ID
router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;

  // Validação do ID do projeto
  if (!projectId) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID do projeto é obrigatório' 
    });
  }

  try {
    // Buscar o projeto
    const project = await Project.findOne({ _id: projectId });
    
    // Verificar se o projeto foi encontrado
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: `Projeto com ID '${projectId}' não encontrado` 
      });
    }

    // Retornar o projeto encontrado
    res.status(200).json({ 
      success: true, 
      project,
      message: 'Projeto encontrado com sucesso'
    });

  } catch (error) {
    console.error(`Erro ao buscar projeto ${projectId}:`, error.message);
    
    // Retornar erro específico baseado no tipo de erro
    if (error.message === 'Projeto não encontrado') {
      return res.status(404).json({ 
        success: false, 
        message: `Projeto com ID '${projectId}' não encontrado` 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor ao buscar projeto',
      error: error.message 
    });
  }
});

// Votar em um projeto
router.post('/project/:projectId/vote', async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ success: false, message: 'ID do projeto é obrigatório' });
  }

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Voto registrado!', project: updatedProject });
  } catch (error) {
    console.error('Erro ao registrar voto:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao registrar voto' });
  }
});

module.exports = router;
