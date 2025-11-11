# Script de inicialização do projeto
# Execute este script para iniciar o servidor de desenvolvimento

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Iniciando Santher Personal Care System" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se as dependências estão instaladas
Write-Host "Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Configurar variáveis de ambiente
$env:PORT = "5000"
$env:NODE_ENV = "development"
$env:SESSION_SECRET = "ufhpc-secret-key-change-in-production"

Write-Host ""
Write-Host "Iniciando servidor na porta 5000..." -ForegroundColor Green
Write-Host "Acesse: http://localhost:5000" -ForegroundColor Green
Write-Host ""

# Iniciar o servidor
npm run dev

