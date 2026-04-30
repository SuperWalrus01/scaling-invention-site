#!/bin/bash

echo "🔧 Restoring Vite index.html template..."
cp index.vite.html index.html

echo "🧹 Cleaning old build..."
rm -rf dist assets

echo "🔨 Building site..."
npm run build

echo "📂 Syncing dist to root assets/index.html..."
mkdir -p assets
cp -R dist/assets/* assets/
cp dist/index.html index.html

echo "📄 Copying PWA files (manifest & service worker)..."
cp dist/manifest.webmanifest manifest.webmanifest 2>/dev/null || true
cp dist/sw.js sw.js 2>/dev/null || true

echo "📦 Committing changes..."
git add assets/ index.html manifest.webmanifest sw.js dist/ || git add assets/ index.html dist/
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Done! Now go to cPanel and click 'Pull or Deploy'"
