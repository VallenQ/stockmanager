const express = require('express');
const router = express.Router();
const { Product, Supplier } = require('../models');

// List products
router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: Supplier });
  res.json(products);
});

// Get by id
router.get('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if(!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// Create
router.post('/', async (req, res) => {
  const { sku, name, description, price, stock, supplierId } = req.body;
  if(!sku || !name) return res.status(400).json({ error: 'Campos obrigatórios' });

  try {
    const exists = await Product.findOne({ where: { sku }});
    if (exists) return res.status(400).json({ error: 'SKU já existe' });

    const product = await Product.create({ sku, name, description, price, stock, supplierId });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if(!p) return res.status(404).json({ error: 'Not found' });

  await p.update(req.body);
  res.json(p);
});

// Delete
router.delete('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if(!p) return res.status(404).json({ error: 'Not found' });
  await p.destroy();
  res.json({ ok: true });
});

module.exports = router;
