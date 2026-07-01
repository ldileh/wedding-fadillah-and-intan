---
name: build-deploy
description: Deploy website undangan ke GitHub Pages secara otomatis lewat push ke repo, plus setup custom domain. Gunakan saat user minta deploy, publish, atur domain, atau bikin website online.
---

# Deploy ke GitHub Pages (manual via Actions)

Alur: **deploy dijalankan MANUAL** dari tab Actions GitHub (bukan otomatis tiap push). Push ke repo TIDAK memicu deploy. User cukup menyiapkan domain.

Build & deploy diatur oleh `.github/workflows/deploy-pages.yml` (trigger `workflow_dispatch` saja). `dist/` dan `public/` sengaja di-`.gitignore` — dibuat di CI, bukan di-commit.

## Cara deploy (manual)

1. Edit konten (`index.html`, aset, dll.), commit & push kode ke repo (push saja tidak men-deploy).
2. (Opsional lokal) verifikasi: `npm run lint:html` dan `npm run build`.
3. Di GitHub: tab **Actions** → workflow **"Deploy to GitHub Pages"** → tombol **"Run workflow"** → pilih branch → Run.
4. Workflow: install → lint (eslint/stylelint/htmlhint) → `npm run build:public` → salin `CNAME` + `.nojekyll` ke `public/` → upload artifact → `deploy-pages`.
5. Kalau lint gagal, deploy batal. Perbaiki dulu lalu Run workflow lagi.

> Deploy ini tidak bisa dipicu oleh Claude/CLI — hanya user yang menekan "Run workflow" di GitHub (atau via `gh workflow run "Deploy to GitHub Pages"` bila user minta & sudah login gh).

## Setup awal GitHub Pages (sekali saja, oleh user)

- Repo GitHub → **Settings → Pages → Source = GitHub Actions**.
- Workflow bisa dijalankan dari branch mana pun via "Run workflow".

## Custom domain

1. Edit file `CNAME` di root repo → isi domain final (mis. `undangan-fadillah-intan.com`), satu baris tanpa `https://`. Saat ini masih placeholder `GANTI-DENGAN-DOMAIN-ANDA.com`.
2. Di registrar domain, set DNS:
   - **Apex/root domain** (`domain.com`): 4 record A ke IP GitHub Pages —
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **Subdomain** (`www` atau `undangan.domain.com`): record `CNAME` → `<username>.github.io`.
3. Repo → Settings → Pages → isi Custom domain = domain yang sama, centang **Enforce HTTPS** (tunggu sertifikat terbit).
4. Setelah domain final diketahui, update juga `og:url`, `og:image`, `canonical`, favicon di `index.html` (masih menunjuk `ulems.my.id`) — penting untuk preview link WhatsApp/social.

## Tanpa custom domain (sementara)

Kosongkan/hapus `CNAME`. Situs terbit di `https://<username>.github.io/<repo>/`. Ingat: jika di subpath repo, path aset relatif (`./assets/...`) tetap aman, tapi domain custom lebih rapi.

## Verifikasi setelah live

- Cek Actions tab hijau, lalu buka URL.
- Countdown menuju 27 Sep 2027, musik, konfeti, tema dark/light.
- Uji query tamu: `?to=Nama%20Tamu`.
- Cek preview link (share ke diri sendiri di WhatsApp) — pastikan judul & gambar benar.

## Catatan
Jangan commit/push tanpa diminta user. Branch default `4.x`. Hosting hanya GitHub Pages (workflow Netlify lama sudah dihapus).
