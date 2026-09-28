# AntsDemoApp

React + TypeScript + Vite aplikace (MUI), která jako hlavní obsah vkládá
komponentu `ants-game-component` (hra „Mravenci“) vyvíjenou nezávisle
v samostatném repozitáři [dockis/AntsGameComponent](https://github.com/dockis/AntsGameComponent).

## Vývoj

```bash
npm install      # nainstaluje závislosti; postinstall zkopíruje assety hry do public/
npm run dev       # dev server
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run preview   # náhled produkčního buildu
```

## Integrace AntsGameComponent

Komponenta se do projektu dostává jako běžná npm závislost, jejíž zdroj ale
není npm registry, nýbrž **přímý HTTPS odkaz na tarball konkrétního GitHub
tagu** komponenty (`package.json`):

```json
"ants-game-component": "https://github.com/dockis/AntsGameComponent/archive/refs/tags/v1.1.0.tar.gz"
```

Proč zrovna takhle:

- **Ne npm registry** — komponenta se tam nepublikuje, vyvíjí se v samostatném
  lokálním repozitáři a na GitHub se publikuje jen přes tag.
- **Ne `github:owner/repo#tag`/`git+ssh` zkratka** — npm se u GitHub-hostovaných
  git závislostí snaží o SSH spojení, pokud má klient nastavené SSH klíče
  (jako lokálně u vývojáře). V CI/Vercelu ale SSH klíč k tomuto cizímu repu
  není a instalace by spadla na „Permission denied (publickey)“. Přímý HTTPS
  odkaz na tarball tenhle problém nemá — je to čisté stažení souboru, stejné,
  jako by šlo o obyčejnou registry závislost, a npm si k němu do
  `package-lock.json` uloží i `integrity` hash.
- Tag v `AntsGameComponent` musí obsahovat **předbuildovaný `dist/`**
  (viz README toho repozitáře, způsob A) — `AntsDemoApp` žádný build krok
  komponenty sám nespouští, jen ji nainstaluje a použije hotový `dist/`.

Assety komponenty (SVG/zvuky) se za běhu jinak hledají relativně k jejímu
vlastnímu JS modulu, což po sloučení do bundlu AntsDemoApp přestane fungovat.
Proto `postinstall` skript (`scripts/copy-game-assets.mjs`) po každé instalaci
zkopíruje `node_modules/ants-game-component/dist/assets` do
`public/ants-game-component-assets` a komponentě se v `src/MainContent.tsx`
předává explicitní `assetsBaseUrl="/ants-game-component-assets/"`.

### Postup při změně verze AntsGameComponent

1. V repozitáři `AntsGameComponent` vytvořit nový tag (např. `v1.2.0`) tak,
   aby obsahoval aktuální zbuildovaný `dist/` commitnutý přímo v tagované
   revizi (viz README a `scripts/sync-public.ps1` v tom repozitáři).
2. V `AntsDemoApp/package.json` upravit verzi v URL závislosti
   `ants-game-component` na nový tag:
   ```json
   "ants-game-component": "https://github.com/dockis/AntsGameComponent/archive/refs/tags/v1.2.0.tar.gz"
   ```
3. Spustit `npm install` — aktualizuje se `package-lock.json` (nová
   `resolved` URL a `integrity` hash).
4. Zkontrolovat, že `postinstall` proběhl bez varování
   (`[copy-game-assets] zkopírováno: ...`) a že
   `public/ants-game-component-assets` obsahuje aktuální assety.
5. Spustit `npm run build` a ověřit, že projde TypeScript kontrola i Vite
   build.
6. Spustit `npm run dev` a hru v appce ručně otestovat — pokud nová verze
   mění API komponenty (`AntsGameComponentProps`), promítnout to i do
   `src/MainContent.tsx`.
7. Commitnout `package.json` + `package-lock.json` (a případné úpravy
   `MainContent.tsx`).

Návrat na starší verzi funguje stejně — stačí v `package.json` vrátit URL na
starší tag a zopakovat kroky 3–5.
