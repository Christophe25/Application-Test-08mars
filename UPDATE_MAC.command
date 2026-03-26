#!/bin/bash
# Se déplacer dans le dossier du projet
cd "$(dirname "$0")" || exit

echo "[INFO] Mise à jour de la curation IA Editorial..."
./update.sh
