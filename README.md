# Makefile para StockManager

Este Makefile foi criado para automatizar a instalação, criação do banco de dados e execução do projeto **StockManager** no Windows (compatível com `cmd`) e Linux (exige adaptação para `gnome-terminal`).

---

## Comandos disponíveis

### `make help`
Exibe a lista de comandos disponíveis e suas descrições.

### `make backend`
Instala todas as dependências do backend (Node.js/NPM).

### `make frontend`
Instala todas as dependências do frontend (Node.js/NPM).

### `make seed`
Cria o banco de dados SQLite com os dados iniciais:
- Admin: `admin@example.com` / senha: `admin123`
- Produtos e fornecedores já cadastrados

### `make run-backend`
Roda o backend em modo de desenvolvimento:
- URL: [http://localhost:4000](http://localhost:4000)

### `make run-frontend`
Roda o frontend em modo de desenvolvimento:
- URL: [http://localhost:5173](http://localhost:5173)

### `make run`
Roda **backend e frontend simultaneamente** em janelas separadas:
- No Windows: abre duas janelas `cmd` para backend e frontend automaticamente.
- No Linux/Mac: deve adaptar o comando para abrir terminais (`gnome-terminal` ou `osascript`).

### `make clean`
Remove todas as pastas `node_modules` do backend e frontend.

---

## Exemplos de uso

1. Instalar dependências do backend e frontend:

```bash
make backend
make frontend
