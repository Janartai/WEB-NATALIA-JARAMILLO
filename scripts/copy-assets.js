import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'assets');
const destDir = path.join(rootDir, 'dist', 'assets');

console.log('[copy-assets] Copying root assets to dist/assets...');

if (fs.existsSync(srcDir)) {
  fs.cpSync(srcDir, destDir, {
    recursive: true,
    filter: (src) => !src.endsWith('.psd') && !src.endsWith('.pdf')
  });
  console.log('[copy-assets] All web images, videos, and fonts copied to dist/assets successfully!');
} else {
  console.warn('[copy-assets] Warning: assets folder not found at', srcDir);
}
