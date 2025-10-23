# TopRoof Solutions Backend - Quick Start Script
# Run this script to start the backend server

Write-Host "🚀 Starting TopRoof Solutions Backend..." -ForegroundColor Cyan
Write-Host ""

# Check if Java is installed
Write-Host "Checking Java installation..." -ForegroundColor Yellow
$javaVersion = java -version 2>&1 | Select-String "version"
if ($javaVersion) {
    Write-Host "✅ Java found: $javaVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Java not found! Please install JDK 21" -ForegroundColor Red
    Write-Host "Download from: https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-21" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if MySQL is running (optional check)
Write-Host "📦 Make sure MySQL is running on localhost:3306" -ForegroundColor Yellow
Write-Host ""

# Start the application
Write-Host "Starting Spring Boot application..." -ForegroundColor Cyan
Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Green
Write-Host ""
Write-Host "Sample users:" -ForegroundColor Yellow
Write-Host "  Admin: admin@toproof.com / admin123" -ForegroundColor White
Write-Host "  User:  user@toproof.com / user123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Run Maven
.\mvnw.cmd spring-boot:run
