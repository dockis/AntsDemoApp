import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ants-game-component načítá svoje SVG/mp3 assety za běhu přes fetch() na URL odvozenou
// z import.meta.url modulu, který je volá (viz useAntsGameEngine.ts v komponentě). Jakmile
// Vite kód balíčku sloučí do vlastního bundlu AntsDemoApp, tahle auto-detekce už neukazuje
// na node_modules/ants-game-component/dist/assets — proto assety kopírujeme do public/ a
// komponentě předáváme `assetsBaseUrl` explicitně (viz MainContent.tsx), public/ Vite vždy
// zkopíruje 1:1 do výstupu (dev i prod).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '../node_modules/ants-game-component/dist/assets');
const dest = path.resolve(__dirname, '../public/ants-game-component-assets');

if (!existsSync(src)) {
  console.warn(`[copy-game-assets] zdroj neexistuje, přeskočeno: ${src}`);
  process.exit(0);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}
cpSync(src, dest, { recursive: true });

console.log(`[copy-game-assets] zkopírováno: ${src} -> ${dest}`);
