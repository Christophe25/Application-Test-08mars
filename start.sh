#!/bin/bash
# Se déplacer dans le dossier du projet
cd "$(dirname "$0")" || exit

echo "[INFO] Synchronisation avec GitHub..."
git pull

echo "[INFO] Installation des dépendances si nécessaire..."
npm install

echo "[SUCCESS] Lancement du serveur de développement..."
npm run dev
