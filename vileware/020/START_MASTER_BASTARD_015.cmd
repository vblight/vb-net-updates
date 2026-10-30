@echo off
setlocal
cd /d "%~dp0"
title MASTER BASTARD - SELECTOR 015
echo ============================================================
echo  015 - DIRECT PATHS / NO RUNTIME INJECTION
echo ============================================================
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
