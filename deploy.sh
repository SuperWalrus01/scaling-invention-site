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

echo "🖼️ Syncing static images..."
mkdir -p images
cp -R public/images/* images/

echo "📄 Copying PWA files (manifest & service worker)..."
cp dist/manifest.webmanifest manifest.webmanifest 2>/dev/null || true
cp dist/sw.js sw.js 2>/dev/null || true

echo "📦 Committing changes..."
# Stage everything: the old list covered only build output, so source changes
# (src/, vite.config.js, tailwind.config.js, .cpanel.yml) were left behind and
# the repo drifted out of sync with the deployed bundle. dist/ is gitignored.
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Done! Now go to cPanel and click 'Pull or Deploy'"
