#!/bin/bash
# Se déplacer dans le dossier du projet (chemin absolu pour garantir le fonctionnement)
cd "/Users/christophefournier/Documents/Veille ia/Application-Test-08mars-main" || exit

echo "[INFO] Synchronisation avec GitHub..."
git pull

echo "[INFO] Mise à jour de la curation IA Editorial..."
npm run update

echo "[INFO] Synchronisation avec GitHub..."
git add src/data.js
if git diff --staged --quiet; then
    echo "[INFO] Aucune nouvelle donnée à synchroniser."
else
    git commit -m "chore: manual video update [skip ci]"
    git push
    echo "[SUCCESS] Mise à jour déployée sur GitHub."
fi

echo "[SUCCESS] Mise à jour terminée. Vous pouvez rafraîchir le site."
read -p "Appuyez sur Entrée pour fermer..."
