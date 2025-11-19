const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'SUA_CHAVE_SECRETA_DE_TESTE'; // em produção não expor

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.status(400).json({ error: 'Campos obrigatórios' });

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Este e-mail já está em uso' });

    const user = await User.create({ name, email, password, role: 'user' });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Login (sem hash, conforme pedido)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, SECRET);
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// simple middleware to verify token
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, SECRET);
    const user = await User.findByPk(data.id, { attributes: ['id','name','email','role'] });
    return res.json({ user });
  } catch(err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
