const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  await sequelize.sync(); // cria tabelas se não existirem
  app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
}

start();
