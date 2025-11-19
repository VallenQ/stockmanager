# Makefile cross-platform para StockManager (Windows, Linux, Mac)

.PHONY: all backend frontend seed run run-backend run-frontend clean help

BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Detectar o sistema operacional
ifeq ($(OS),Windows_NT)
    IS_WINDOWS=true
else
    IS_WINDOWS=false
endif

all: help

help:
	@echo "Comandos disponíveis:"
	@echo "  make backend       - Instala dependências do backend"
	@echo "  make frontend      - Instala dependências do frontend"
	@echo "  make seed          - Cria banco de dados com seed"
	@echo "  make run-backend   - Roda backend em modo dev"
	@echo "  make run-frontend  - Roda frontend em modo dev"
	@echo "  make run           - Roda backend e frontend simultaneamente"
	@echo "  make clean         - Remove node_modules do backend e frontend"

# Backend
backend:
	@echo "🚀 Instalando dependências do backend..."
	cd $(BACKEND_DIR) && npm install
	@echo "✅ Dependências do backend instaladas."

seed:
	@echo "🌱 Criando banco de dados com seed..."
	cd $(BACKEND_DIR) && npm run seed
	@echo "✅ Banco de dados criado com seed."

run-backend:
	@echo "🖥️ Rodando backend em http://localhost:4000..."
ifeq ($(IS_WINDOWS),true)
	start cmd /k "cd $(BACKEND_DIR) && npm run dev"
else
	cd $(BACKEND_DIR) && npm run dev &
endif

# Frontend
frontend:
	@echo "🚀 Instalando dependências do frontend..."
	cd $(FRONTEND_DIR) && npm install
	@echo "✅ Dependências do frontend instaladas."

run-frontend:
	@echo "🖥️ Rodando frontend em http://localhost:5173..."
ifeq ($(IS_WINDOWS),true)
	start cmd /k "cd $(FRONTEND_DIR) && npm run dev"
else
	cd $(FRONTEND_DIR) && npm run dev &
endif

# Rodar backend e frontend simultaneamente
run:
	@echo "⚡ Rodando backend e frontend simultaneamente..."
ifeq ($(IS_WINDOWS),true)
	start cmd /k "cd $(BACKEND_DIR) && npm run dev"
	start cmd /k "cd $(FRONTEND_DIR) && npm run dev"
else
	cd $(BACKEND_DIR) && npm run dev &
	cd $(FRONTEND_DIR) && npm run dev &
	wait
endif
	@echo "✅ Backend e frontend iniciados."

# Limpeza
clean:
	@echo "🧹 Removendo node_modules..."
ifeq ($(IS_WINDOWS),true)
	rd /s /q $(BACKEND_DIR)\node_modules
	rd /s /q $(FRONTEND_DIR)\node_modules
else
	rm -rf $(BACKEND_DIR)/node_modules
	rm -rf $(FRONTEND_DIR)/node_modules
endif
	@echo "✅ Limpeza concluída."
