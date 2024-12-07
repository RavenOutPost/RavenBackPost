#!/bin/bash

echo "=== Update et Start API ==="
echo "- Fetch Last Updates"

git pull origin master

echo "- Installing dependances "
npm install

echo "- Run API "
echo "Lancement du script..."

echo "=== Processus Ended ==="
