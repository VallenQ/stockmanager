// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'SUA_CHAVE_SECRETA_DE_TESTE'; // em produção não expor
const MAX_FAILED = 5;
const LOCK_MINUTES = 15;

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

// Login (sem hash, conforme pedido) com bloqueio
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  // usuário inexistente
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  // verifica se está bloqueado
  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    return res.status(403).json({ error: 'Conta temporariamente bloqueada. Tente novamente mais tarde.' });
  }

  if (user.password !== password) {
    // incrementar failedAttempts
    const failed = (user.failedAttempts || 0) + 1;
    const updates = { failedAttempts: failed };

    // bloquear se excedeu
    if (failed >= MAX_FAILED) {
      const until = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
      updates.lockedUntil = until;
      updates.failedAttempts = 0; // reset após bloqueio
    }

    await user.update(updates);
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // login bem-sucedido -> resetar tentativas e lockedUntil
  await user.update({ failedAttempts: 0, lockedUntil: null });

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

/*
  Recuperação de senha (básico):
  POST /api/auth/recover  { email, newPassword }
  - Se existir o email, troca a senha para newPassword.
  - Em produção, deveria enviar código por e-mail e validar token.
*/
router.post('/recover', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: 'Campos obrigatórios' });

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'Email não encontrado' });

  await user.update({ password: newPassword, failedAttempts: 0, lockedUntil: null });
  // Em produção: gerar token e enviar e-mail, etc.
  return res.json({ ok: true, message: 'Senha atualizada (fluxo de recuperação básico)' });
});

module.exports = router;
