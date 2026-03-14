@echo off
echo [INFO] Synchronisation avec GitHub...
git pull
echo [INFO] Contournement de la politique de securite PowerShell...
powershell -ExecutionPolicy Bypass -Command "npm install"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] L'installation des dependances a echoue.
    pause
    exit /b %ERRORLEVEL%
)
echo [SUCCESS] Dependances installees. Lancement du serveur de developpement...
powershell -ExecutionPolicy Bypass -Command "npm run dev"
pause
