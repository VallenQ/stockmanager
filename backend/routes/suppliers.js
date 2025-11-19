const express = require('express');
const router = express.Router();
const { Supplier, Product } = require('../models');

// list
router.get('/', async (req, res) => {
  const suppliers = await Supplier.findAll();
  res.json(suppliers);
});

// get
router.get('/:id', async (req, res) => {
  const s = await Supplier.findByPk(req.params.id, { include: Product });
  if(!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

// create
router.post('/', async (req, res) => {
  const { name, contact, email } = req.body;
  if(!name) return res.status(400).json({ error: 'Nome obrigatório' });
  const s = await Supplier.create({ name, contact, email });
  res.json(s);
});

// update
router.put('/:id', async (req, res) => {
  const s = await Supplier.findByPk(req.params.id);
  if(!s) return res.status(404).json({ error: 'Not found' });
  await s.update(req.body);
  res.json(s);
});

// delete (block deletion if has products)
router.delete('/:id', async (req, res) => {
  const s = await Supplier.findByPk(req.params.id);
  if(!s) return res.status(404).json({ error: 'Not found' });

  const products = await Product.count({ where: { supplierId: s.id }});
  if (products > 0) return res.status(400).json({ error: 'Fornecedor associado a produtos, não é possível excluir.' });

  await s.destroy();
  res.json({ ok: true });
});

module.exports = router;
