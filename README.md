# 📦 StockManager – Makefile Cross-Platform

Este projeto utiliza um **Makefile compatível com Windows, Linux e macOS** para facilitar o gerenciamento do backend e frontend — incluindo instalação, execução de scripts, inicialização dos servidores e limpeza de dependências.

O Makefile detecta automaticamente o sistema operacional e executa os comandos adequados.

---

## 📁 Estrutura do Projeto

A seguinte estrutura é esperada para o correto funcionamento do Makefile:

backend/
frontend/
Makefile

yaml
Copy code

Cada pasta deve conter seu próprio `package.json`.

---

## 🚀 Comandos Disponíveis

### ▶️ Executar Backend e Frontend

Inicia o backend e o frontend simultaneamente:

```sh
make run
Executar individualmente:

sh
Copy code
make run-backend
make run-frontend
📥 Instalar Dependências
Instalar dependências do backend:

sh
Copy code
make backend
Instalar dependências do frontend:

sh
Copy code
make frontend
Instalar tudo:

sh
Copy code
make all
Obs: No Makefile original, all exibe apenas ajuda, mas pode ser alterado para instalar tudo caso desejado.

🌱 Executar Seeds (Backend)
Executa o script de seed do backend:

sh
Copy code
make seed
🧹 Limpar node_modules
Remove node_modules do backend e frontend:

sh
Copy code
make clean
Compatível com Windows (rd /s /q) e Linux/macOS (rm -rf).

❓ Ajuda
Mostrar todos os comandos disponíveis:

sh
Copy code
make help
🖥️ Detecção Automática de Sistema Operacional
O Makefile identifica automaticamente o ambiente:

Windows → IS_WINDOWS=true

Linux/macOS → IS_WINDOWS=false

Com isso, ele executa corretamente:

Scripts .cmd ou .sh

Comandos adequados para remoção de diretórios

Execução de scripts de inicialização

✔️ Resumo dos Targets
Comando	Função
make backend	Instala dependências do backend
make frontend	Instala dependências do frontend
make seed	Executa seed no backend
make run	Inicia backend e frontend simultaneamente
make run-backend	Executa apenas o backend
make run-frontend	Executa apenas o frontend
make clean	Remove todos os node_modules
make help	Exibe comandos disponíveis
