Como rodar o projeto stockmanager localmente:
Requisitos:

-Node.js 20+

-NPM 10+

-Git

1) Clonar o repositório
git clone git@github.com:VallenQ/stockmanager.git
cd stockmanager

2) Rodar o BACKEND

Abra um terminal dentro da pasta:

cd backend
npm install

Criar o banco de dados com seed:
npm run seed


Isso cria o arquivo db.sqlite com:

Admin: admin@example.com

Senha: admin123

Produtos e fornecedores já cadastrados

Rodar o servidor:
npm run dev


Backend sobe em:

http://localhost:4000

3) Rodar o FRONTEND

Abra um outro terminal:

cd frontend
npm install
npm run dev


Frontend sobe em:

http://localhost:5173

4) Acessar o sistema

Abra no navegador:

http://localhost:5173


Entre com o admin:

email: admin@example.com
senha: admin123
