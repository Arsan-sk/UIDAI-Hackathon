# Quick Start Script for Development

# Run from project root directory

Write-Host "🚀 UIDAI Insights Hub - Development Setup" -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

# Step 1: Check Python
Write-Host "Step 1: Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install Python 3.8+" -ForegroundColor Red
    exit 1
}

# Step 2: Install Python dependencies
Write-Host "`nStep 2: Installing Python dependencies..." -ForegroundColor Yellow
pip install pandas numpy --quiet
Write-Host "✅ Python packages installed" -ForegroundColor Green

# Step 3: Run data preprocessing
Write-Host "`nStep 3: Processing data (this may take a few minutes)..." -ForegroundColor Yellow
if (Test-Path "data_processing/data_preprocessor.py") {
    Write-Host "   Processing 5M+ records from CSV files..." -ForegroundColor Cyan
    python data_processing/data_preprocessor.py
    if (Test-Path "processed_data/dashboard_data.json") {
        Write-Host "✅ Data preprocessing complete!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Data file not generated. Check CSV files." -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Preprocessor script not found" -ForegroundColor Red
}

# Step 4: Setup Frontend
Write-Host "`nStep 4: Setting up React frontend..." -ForegroundColor Yellow
cd frontend

if (!(Test-Path "node_modules")) {
    Write-Host "   Installing npm packages (this may take a few minutes)..." -ForegroundColor Cyan
    npm install
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

# Step 5: Start Development Server
Write-Host "`nStep 5: Starting development server..." -ForegroundColor Yellow
Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "🌐 Opening browser at http://localhost:3000" -ForegroundColor Green
Write-Host "=========================================`n" -ForegroundColor Cyan

npm start
