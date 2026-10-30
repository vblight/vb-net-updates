@echo off
setlocal
cd /d "%~dp0"
title MASTER BASTARD - VILEWARE
set "MANIFEST=https://raw.githubusercontent.com/vblight/vb-net-updates/main/vileware/playtest/manifest.json"
echo ============================================================
echo  VILEWARE - REMOTE PLAYTEST UPDATE
 echo ============================================================
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $ProgressPreference='SilentlyContinue'; $m=Invoke-RestMethod -Uri '%MANIFEST%' -Headers @{'Cache-Control'='no-cache'}; $root=Join-Path $env:APPDATA 'mb-selector-015\vb-net-vileware-kart-selector-015\games\vile-kart'; New-Item -ItemType Directory -Force -Path $root ^| Out-Null; Write-Host ('Pulling Vileware revision '+$m.revision+' - '+$m.release); foreach($f in $m.files){$dst=Join-Path $root ($f.path -replace '/','\'); New-Item -ItemType Directory -Force -Path (Split-Path $dst) ^| Out-Null; Invoke-WebRequest -UseBasicParsing -Uri ($f.url+'?v='+$m.revision) -OutFile $dst; if($f.sha256){$got=(Get-FileHash -Algorithm SHA256 -LiteralPath $dst).Hash.ToLower(); if($got -ne $f.sha256.ToLower()){throw ('HASH FAIL: '+$f.path)}}; Write-Host ('  OK  '+$f.path)}; Set-Content -LiteralPath (Join-Path $root '.vileware-revision') -Value $m.revision; Write-Host 'Vileware update complete.'"
if errorlevel 1 (echo.&echo VILEWARE UPDATE FAILED.&pause&exit /b 1)
set "RUNTIME=%CD%\electron-runtime"
set "ELECTRON=%RUNTIME%\electron.exe"
set "ZIP=%CD%\electron-v38.0.0-win32-x64.zip"
set "URL=https://github.com/electron/electron/releases/download/v38.0.0/electron-v38.0.0-win32-x64.zip"
if not exist "%ELECTRON%" (
 powershell -NoProfile -ExecutionPolicy Bypass -Command "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -UseBasicParsing -Uri '%URL%' -OutFile '%ZIP%'"
 if errorlevel 1 (echo DOWNLOAD FAILED.&pause&exit /b 1)
 mkdir "%RUNTIME%" 2>nul
 powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%ZIP%' -DestinationPath '%RUNTIME%' -Force"
 if errorlevel 1 (echo EXTRACTION FAILED.&pause&exit /b 1)
)
set ELECTRON_RUN_AS_NODE=
set NODE_OPTIONS=
"%ELECTRON%" "%CD%\app\main.cjs"
pause
