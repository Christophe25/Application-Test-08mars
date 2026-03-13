#!/bin/bash
# Se déplacer dans le dossier du projet (chemin absolu pour garantir le fonctionnement)
cd "/Users/christophefournier/Documents/Veille ia/Application-Test-08mars-main" || exit

echo "[INFO] Mise à jour de la curation IA Editorial..."
npm run update
echo "[SUCCESS] Mise à jour terminée. Vous pouvez rafraîchir le site."
read -p "Appuyez sur Entrée pour fermer..."
