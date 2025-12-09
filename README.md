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
make run
🟦 Rodar Somente o Backend

make run-backend
🟧 Rodar Somente o Frontend

make run-frontend
📦 Instalação de Dependências
Instalar dependências do backend:

make backend
Instalar dependências do frontend:

make frontend
🌱 Executar Seeds
O Makefile também executa o script de seed do backend:

make seed
🧹 Limpeza
Remove todos os node_modules do projeto (backend e frontend):

make clean
O comando detecta automaticamente seu sistema operacional e usa:

rd /s /q no Windows

rm -rf no Linux/macOS

❓ Exibir Ajuda
Lista todos os comandos do Makefile:

make help
🖥️ Sobre a Detecção de Sistema Operacional
O Makefile identifica o sistema automaticamente:

IS_WINDOWS=true em Windows

IS_WINDOWS=false em Linux e macOS

Isso garante que os comandos corretos sejam usados em qualquer ambiente.

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
