# Breaksheet — Cloudflare

## Déploiement Cloudflare Pages

Le frontend est construit avec Vite. Les API sont des Cloudflare Pages Functions.

### Bindings obligatoires

Dans **Workers & Pages → ton projet → Settings → Bindings** :

1. Ajouter un **R2 bucket**
   - Variable name : `BREAKSHEET_BUCKET`
   - Choisir le bucket qui stockera le planning et les 4 photos.

2. Ajouter **Workers AI**
   - Variable name : `AI`

Les Pages Functions utilisent ces bindings via `context.env`. Cloudflare documente les bindings R2 et Workers AI pour Pages Functions.

### OCR

L'OCR utilise le modèle Cloudflare Workers AI :

`@cf/meta/llama-3.2-11b-vision-instruct`

Lors de la première utilisation, Cloudflare demande d'accepter la licence Meta du modèle.

### Build

- Build command : `npm run build`
- Build output directory : `dist`

Après avoir ajouté ou modifié les bindings, faire un nouveau déploiement.

### API

- `GET /api/breaksheet` : récupère le dernier planning enregistré.
- `POST /api/breaksheet/process` : analyse les 4 photos, sauvegarde les photos et le planning dans R2.
