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

router.post('/qr-codes', async (req, res) => {
  const { code, username } = req.body;

  if (!code || !username) {
      return res.status(400).json({ success: false, message: 'Código e username são obrigatórios' });
  }

  try {
      const updatedUser = await db.AdicionaCodigo(username, code);
      res.status(200).json({ success: true, message: 'QR-Code salvo com sucesso!', user: updatedUser });
  } catch (error) {
      console.error('Erro ao salvar QR-Code:', error.message);
      res.status(500).json({ success: false, message:  error.message });
  }
});

router.get('/user-qr-codes', async (req, res) => {
  const userId = req.userId;
  try {
    const codes = await db.buscarCodigos(userId);
    // console.log(codes)
    res.status(200).json({ success: true, codes });
  } catch (error) {
    console.error('Erro ao buscar QR-Codes do usuário:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao buscar QR-Codes' });
  }
});

module.exports = router;
