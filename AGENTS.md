# AGENTS.md

Panduan untuk AI agent (Claude Code, dll.) yang bekerja di project ini.

## Tentang Project

Website undangan pernikahan digital untuk **Fadillah Achmad Imam & Intan Anjani**, menikah **Senin, 27 September 2027**. Berbasis template open-source [undangan](https://github.com/dewanakl/undangan) (versi 4.x). Murni HTML + CSS + Vanilla JS; NPM hanya dipakai untuk membundel JS (esbuild) dan lint.

## Struktur

- `index.html` — halaman undangan utama. **Semua data undangan (nama, tanggal, lokasi, rekening, kisah cinta) ada di sini.**
- `dashboard.html` — panel admin untuk fitur komentar (hanya relevan jika komentar aktif).
- `js/` — sumber JavaScript (`app/`, `common/`, `connection/`, `libs/`). Entry: `js/guest.js`, `js/admin.js`.
- `dist/` — hasil bundle esbuild. **Jangan diedit manual & tidak di-commit** (`.gitignore`); `index.html` memuat `./dist/guest.js`. Regenerasi via `npm run build`.
- `public/` — folder hasil `build:public` untuk deploy; dibuat di CI, **tidak di-commit**.
- `css/` — `guest.css`, `admin.css`, `common.css`, `animation.css`.
- `assets/` — `images/`, `music/`, `video/`. Foto pakai format `.webp`.
- `.github/workflows/deploy-pages.yml` — CI: lint + `build:public` + deploy ke GitHub Pages, **dijalankan manual** (tab Actions → Run workflow), bukan otomatis tiap push.
- `CNAME` — custom domain GitHub Pages (masih placeholder, ganti dengan domain final).

## Deploy & Backend (keputusan)

- **Hosting**: GitHub Pages. Deploy **manual** via GitHub Actions ("Run workflow"), tidak otomatis tiap push. User menyiapkan domain sendiri (custom domain lewat `CNAME` + DNS). Setup Pages: repo Settings → Pages → Source = GitHub Actions. Lihat skill `build-deploy`.
- **Database komentar/RSVP**: Google Spreadsheet + Google Apps Script (gratis, tanpa server). Lihat skill `database-spreadsheet`. Fitur komentar bawaan (like/GIF/dashboard) butuh backend penuh — itu jalur alternatif (skill `aktifkan-komentar`).

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm install` | Install dependency (esbuild + tooling lint). |
| `npm run dev` | Server dev di `http://localhost:8080` (esbuild serve + watch). |
| `npm run build` | Bundle + minify JS ke `dist/`. Jalankan setelah mengubah file di `js/`. |
| `npm run build:public` | Build lalu salin `assets, css, dist, index.html, dashboard.html` ke `public/` untuk deploy. |
| `npm run lint:js` / `lint:css` / `lint:html` | Lint. |

## Konvensi & Aturan Penting

- **Data undangan diedit di `index.html`, bukan di `dist/`.** Setelah mengubah `js/`, wajib `npm run build` agar `dist/` sinkron.
- Untuk `<img>`, gunakan pola `src="./assets/images/placeholder.webp" data-src="<gambar-asli>"` — `data-src` adalah lazy-load asli, `src` adalah placeholder.
- `data-time` di `<body>` = waktu akad, format `YYYY-MM-DD HH:MM:SS`. Dipakai untuk countdown. Saat ini `2027-09-27 10:00:00`.
- **Fitur komentar saat ini NONAKTIF**: atribut `data-url` & `data-key` sudah dihapus dari `<body>`. Confetti aktif (`data-confetti="true"`). Untuk mengaktifkan komentar, lihat skill `aktifkan-komentar`.
- Nama mempelai selalu urut: **pria (Fadillah) dulu, wanita (Intan) kemudian**.
- Jangan commit/push tanpa diminta user. Branch default: `4.x`.
- Selalu jalankan `npm run build` + `npm run lint:html` sebelum menyatakan perubahan selesai.

## Status Data (per 2026-07-01)

Sudah diisi: nama, tanggal, judul/meta SEO, lokasi + Google Maps, ortu pria, nama pemilik rekening.
Masih placeholder: **ortu Intan**, **no. rekening & no. HP gift**, **foto** (mempelai/cover/galeri), **narasi kisah cinta**, `og:image`/favicon/`og:url` (masih domain template `ulems.my.id`).

Lihat `PROJECT_BOARD.md` untuk daftar pekerjaan lengkap.
