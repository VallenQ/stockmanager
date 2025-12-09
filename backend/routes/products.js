// routes/products.js
const express = require('express');
const router = express.Router();
const { Product, Supplier, Movement } = require('../models');

// List products (inclui supplier)
router.get('/', async (req, res) => {
  const products = await Product.findAll({ include: Supplier });
  res.json(products);
});

// Get by id
router.get('/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id, { include: Supplier });
  if(!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// Create (agora aceita imageLink)
router.post('/', async (req, res) => {
  const { sku, name, description, price, stock, supplierId, imageLink } = req.body;
  if(!sku || !name) return res.status(400).json({ error: 'Campos obrigatórios' });

  try {
    const exists = await Product.findOne({ where: { sku }});
    if (exists) return res.status(400).json({ error: 'SKU já existe' });

    const product = await Product.create({ sku, name, description, price, stock, supplierId, imageLink });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (permite atualizar imageLink sem mexer nos outros campos)
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

/*
  Movimentações (entradas/saídas)
  POST /api/products/:id/entry  { quantity, note }
  POST /api/products/:id/exit   { quantity, note }
  GET  /api/products/movements  -> listar todos movimentos (poderia suportar filtros)
  GET  /api/products/:id/movements -> movimentos do produto
*/

// Registrar entrada (RF012)
router.post('/:id/entry', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

  const { quantity, note } = req.body;
  const qty = parseInt(quantity, 10);
  if (!qty || qty <= 0) return res.status(400).json({ error: 'Quantidade inválida' });

  const prev = product.stock;
  const newStock = prev + qty;

  // atualiza estoque e registra movimento
  await product.update({ stock: newStock });
  const movement = await Movement.create({
    productId: product.id, type: 'entry', quantity: qty, note: note || null,
    previousStock: prev, newStock
  });

  res.json({ ok: true, product, movement });
});

// Registrar saída (RF014) — impede estoque negativo
router.post('/:id/exit', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

  const { quantity, note } = req.body;
  const qty = parseInt(quantity, 10);
  if (!qty || qty <= 0) return res.status(400).json({ error: 'Quantidade inválida' });

  const prev = product.stock;
  const newStock = prev - qty;

  if (newStock < 0) {
    return res.status(400).json({ error: 'Operação negaria o estoque (saldo insuficiente)' });
  }

  await product.update({ stock: newStock });
  const movement = await Movement.create({
    productId: product.id, type: 'exit', quantity: qty, note: note || null,
    previousStock: prev, newStock
  });

  res.json({ ok: true, product, movement });
});

// Listar movimentos gerais (com paginação simples / últimos)
router.get('/movements', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  const movements = await Movement.findAll({
    include: { model: Product, attributes: ['id','name','sku','imageLink'] },
    order: [['createdAt','DESC']],
    limit
  });
  res.json(movements);
});

// Movements por produto
router.get('/:id/movements', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  const movements = await Movement.findAll({ where: { productId: product.id }, order: [['createdAt','DESC']]});
  res.json(movements);
});

module.exports = router;
