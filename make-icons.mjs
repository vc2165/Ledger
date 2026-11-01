// Generates the Android app icon and splash images for Ledger.
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';

mkdirSync('assets', { recursive: true });
const full = readFileSync('icon.svg', 'utf8');
const inner = full.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<rect width="512" height="512"[^>]*\/>/, '');
const svg = (size, scale, bg) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">` +
  (bg ? `<rect width="512" height="512" fill="${bg}"/>` : '') +
  `<g transform="translate(256 256) scale(${scale}) translate(-256 -256)">${inner}</g></svg>`);

await sharp(svg(1024, 1, '#1f5fd6')).png().toFile('assets/icon-only.png');
await sharp(svg(1024, 0.8, null)).png().toFile('assets/icon-foreground.png');
await sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="1024" height="1024" fill="#1f5fd6"/></svg>')).png().toFile('assets/icon-background.png');
await sharp(svg(2732, 0.3, '#ffffff')).png().toFile('assets/splash.png');
await sharp(svg(2732, 0.3, '#ffffff')).png().toFile('assets/splash-dark.png');
console.log('Icons generated');
