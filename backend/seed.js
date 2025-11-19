const { sequelize, User, Product, Supplier } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  // Admins cadastrados manualmente aqui:
  await User.create({ name: 'Admin Principal', email: 'admin@example.com', password: 'admin123', role: 'admin' });
  await User.create({ name: 'Gerente', email: 'manager@example.com', password: 'manager123', role: 'admin' });

  // Fornecedores
  const s1 = await Supplier.create({ name: 'Fornecedor A', contact: 'João - (11) 9999-0000', email: 'fornA@ex.com' });
  const s2 = await Supplier.create({ name: 'Fornecedor B', contact: 'Maria - (11) 9888-0000', email: 'fornB@ex.com' });

  // Produtos
  await Product.create({ sku: 'SKU-001', name: 'Cimento 50kg', description: 'Saco de cimento 50kg', price: 45.50, stock: 120, supplierId: s1.id });
  await Product.create({ sku: 'SKU-002', name: 'Areia Média', description: 'Carrada de areia média', price: 30.00, stock: 50, supplierId: s2.id });
  await Product.create({ sku: 'SKU-003', name: 'Bloco 20x20', description: 'Bloco estrutural', price: 2.55, stock: 200, supplierId: s1.id });

  console.log('Seed finalizado!');
  process.exit(0);
}

seed();
