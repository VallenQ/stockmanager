#  StockManager – Automação com Makefile

Este repositório utiliza um **Makefile simples e totalmente cross-platform** (Windows, Linux e macOS) para automatizar tarefas comuns no desenvolvimento do StockManager.  
Ele gerencia instalação de dependências, execução dos servidores, limpeza do ambiente e rodagem de seeds, tudo com um único comando.

---

## 📁 Estrutura Esperada

O Makefile foi criado para funcionar com a seguinte organização:

backend/
frontend/
Makefile

Cada diretório deve conter seu próprio projeto Node.js (`package.json`).

---

## 🚀 Comandos Principais

### 🟢 Rodar a Aplicação Completa
Inicia backend e frontend simultaneamente:

```sh
✔️ Lista Rápida 
Comando	Ação
make backend	Instala dependências do backend
make frontend	Instala dependências do frontend
make seed	Roda o seed do backend
make run	Inicia backend + frontend
make run-backend	Inicia apenas o backend
make run-frontend	Inicia apenas o frontend
make clean	Remove node_modules
make help	Mostra ajuda
