#!/usr/bin/env pwsh
# =================================================================
# AI Resume Screener — Local Monitoring Runner (No Docker)
# Starts and verifies local Prometheus + Grafana services.
# =================================================================

$ProjectPath = "c:\Users\Mukund\PycharmProjects\Resume_Screener"
$PrometheusDir = "C:\prometheus\prometheus-2.53.0.windows-amd64"
$GrafanaDir = "C:\grafana\grafana-v11.1.0"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  AI RESUME SCREENER — Local Monitoring Starter" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# ─────────────────────────────────────────────────────────────────
# 1. Check Flask Backend (port 5000)
# ─────────────────────────────────────────────────────────────────
Write-Host "[1/3] Checking Flask backend on port 5000..." -ForegroundColor Yellow
$flaskConn = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($flaskConn) {
    try {
        $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -TimeoutSec 3 -UseBasicParsing
        Write-Host "  ✅ Flask Backend is RUNNING and healthy!" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Flask Backend is listening but health check failed: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ❌ Flask Backend is NOT running on port 5000." -ForegroundColor Red
    Write-Host "     Please start it using: cd backend; python app.py" -ForegroundColor Cyan
}

# ─────────────────────────────────────────────────────────────────
# 2. Start / Verify Prometheus (port 9090)
# ─────────────────────────────────────────────────────────────────
Write-Host "`n[2/3] Checking Prometheus on port 9090..." -ForegroundColor Yellow
$promConn = Get-NetTCPConnection -LocalPort 9090 -ErrorAction SilentlyContinue
if ($promConn) {
    Write-Host "  ✅ Prometheus is ALREADY running on port 9090!" -ForegroundColor Green
} else {
    Write-Host "  🚀 Starting Prometheus locally..." -ForegroundColor Cyan
    
    # Ensure logs path and new DB path directories exist
    $dbPath = Join-Path $PrometheusDir "data_v3"
    if (-Not (Test-Path $dbPath)) {
        New-Item -ItemType Directory -Path $dbPath | Out-Null
    }
    
    $promExe = Join-Path $PrometheusDir "prometheus.exe"
    $promConfig = Join-Path $ProjectPath "monitoring\prometheus-local.yml"
    
    # Run Prometheus in background using Start-Process
    Start-Process -FilePath $promExe `
        -ArgumentList "--config.file=$promConfig", "--storage.tsdb.path=$dbPath", "--storage.tsdb.no-lockfile" `
        -WorkingDirectory $PrometheusDir `
        -RedirectStandardOutput (Join-Path $PrometheusDir "prometheus_out.log") `
        -RedirectStandardError (Join-Path $PrometheusDir "prometheus_err.log") `
        -NoNewWindow
        
    Start-Sleep -Seconds 3
    
    $promConnCheck = Get-NetTCPConnection -LocalPort 9090 -ErrorAction SilentlyContinue
    if ($promConnCheck) {
        Write-Host "  ✅ Prometheus started successfully on port 9090!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Failed to start Prometheus. Check logs at: $PrometheusDir\prometheus_run.log" -ForegroundColor Red
    }
}

# ─────────────────────────────────────────────────────────────────
# 3. Start / Verify Grafana (port 3001)
# ─────────────────────────────────────────────────────────────────
Write-Host "`n[3/3] Checking Grafana on port 3001..." -ForegroundColor Yellow
$grafConn = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($grafConn) {
    Write-Host "  ✅ Grafana is ALREADY running on port 3001!" -ForegroundColor Green
} else {
    Write-Host "  🚀 Starting Grafana locally..." -ForegroundColor Cyan
    
    $grafExe = Join-Path $GrafanaDir "bin\grafana-server.exe"
    
    # Run Grafana in background with working directory set to homepath
    Start-Process -FilePath $grafExe `
        -WorkingDirectory $GrafanaDir `
        -RedirectStandardOutput (Join-Path $GrafanaDir "grafana_out.log") `
        -RedirectStandardError (Join-Path $GrafanaDir "grafana_err.log") `
        -NoNewWindow
        
    Start-Sleep -Seconds 4
    
    $grafConnCheck = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
    if ($grafConnCheck) {
        Write-Host "  ✅ Grafana started successfully on port 3001!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Failed to start Grafana. Check logs at: $GrafanaDir\grafana_run.log" -ForegroundColor Red
    }
}

# ─────────────────────────────────────────────────────────────────
# Summary & Links
# ─────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  LOCAL SERVICES STATUS SUMMARY" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  Flask Backend:  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  Flask Metrics:  http://localhost:5000/metrics" -ForegroundColor White
Write-Host "  Prometheus:     http://localhost:9090" -ForegroundColor White
Write-Host "  Grafana:        http://localhost:3001 (admin / admin)" -ForegroundColor White
Write-Host "  Dashboard:      http://localhost:3001/d/resume-dash-v2/ai-resume-screener-monitoring-dashboard" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
