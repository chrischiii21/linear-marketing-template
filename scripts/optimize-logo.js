// Script to optimize logo images
// Run with: node scripts/optimize-logo.js

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const logoPath = join(rootDir, 'public/images/logo/dealer-logo.png');
const webpPath = join(rootDir, 'public/images/logo/dealer-logo.webp');
const avifPath = join(rootDir, 'public/images/logo/dealer-logo.avif');

async function optimizeLogo() {
  if (!existsSync(logoPath)) {
    console.error('Logo file not found:', logoPath);
    return;
  }

  console.log('Optimizing logo...');

  try {
    // Generate WebP version
    await sharp(logoPath)
      .webp({ quality: 90, effort: 6 })
      .toFile(webpPath);
    console.log('✓ Created WebP version');

    // Generate AVIF version
    await sharp(logoPath)
      .avif({ quality: 80, effort: 9 })
      .toFile(avifPath);
    console.log('✓ Created AVIF version');

    // Get file sizes
    const pngSize = (await sharp(logoPath).metadata()).size;
    const webpSize = (await sharp(webpPath).metadata()).size;
    const avifSize = (await sharp(avifPath).metadata()).size;

    console.log('\nFile sizes:');
    console.log(`PNG:  ${(pngSize / 1024).toFixed(2)} KB`);
    console.log(`WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / pngSize) * 100).toFixed(1)}% smaller)`);
    console.log(`AVIF: ${(avifSize / 1024).toFixed(2)} KB (${((1 - avifSize / pngSize) * 100).toFixed(1)}% smaller)`);

    console.log('\n✓ Logo optimization complete!');
  } catch (error) {
    console.error('Error optimizing logo:', error);
  }
}

optimizeLogo();
