# 📋 Board Pengerjaan — Undangan Fadillah & Intan

Pernikahan: **Minggu, 27 September 2026** · Repo template: undangan v4.x

Legenda: ✅ selesai · 🔄 sedang dikerjakan · ⬜ belum · ⏸️ ditunda

---

## 🟢 Done

- ✅ Konfigurasi awal project (nama, tanggal, judul & meta SEO/OG)
- ✅ Countdown `data-time` = `2026-09-27 08:00:00`
- ✅ Cover & hero: "Fadillah & Intan — Minggu, 27 September 2026"
- ✅ **Tanggal & hari diperbaiki**: 27 Sep 2026 = **Minggu** (semula tertulis Senin 2027) — teks + `data-time` konsisten
- ✅ Data mempelai pria (Fadillah) + orang tua
- ✅ **Data orang tua Intan** — Bapak Odin Komarudin & Ibu Enin (menggantikan "lorem ipsum")
- ✅ Lokasi acara + link Google Maps (Villa Kampung Sawah Cimande, Bogor)
- ✅ **Rekening Transfer** — 2 kartu: Intan (Mandiri `1330032843542`) & Fadillah (Bank Jago `101479798704`)
- ✅ **Blok QRIS dihapus** (tidak dipakai)
- ✅ **No. HP / e-wallet gift Fadillah** — `08221884277` (teks + `data-copy`)
- ✅ **Card Gift Intan Anjani** — telp `+62 821-2306-4682` + alamat (Kp. Lembur Situ, Cimande Hilir, Caringin, Bogor)
- ✅ Fitur komentar dinonaktifkan (hapus `data-url`/`data-key`), confetti aktif
- ✅ Jam Akad & Resepsi — Akad 08.00 WIB, Resepsi 11.00 WIB
- ✅ `npm install` + `npm run build` → `dist/` terbentuk, htmlhint lolos
- ✅ AGENTS.md, PROJECT_BOARD.md, skill kustom
- ✅ Konfigurasi debug VS Code (`.vscode/launch.json`)

---

## 🎨 Tema tampilan

Tema terpilih: **merah-emas** — sudah di-merge ke `main` sebagai tema utama. Tiap tema = warna + Material Design (radius seragam + elevasi berlapis), CSS-only.

- ✅ **`tema/merah-emas` → merged ke `main`** (tema utama undangan)
- ✅ **Default `data-bs-theme="light"`** — nuansa merah-emas langsung tampil (tamu tetap bisa toggle dark)
- ✅ Branch alternatif (arsip): `tema/merah-putih`, `tema/biru-emas`, `tema/hijau-sage`, `tema/ungu-perak`
- ⬜ (opsional) Hapus branch tema alternatif bila sudah tak dipakai (lokal + remote)

---

## 🔴 To Do — Konten wajib

- ⬜ **Foto mempelai** — `assets/images/cowo.webp` (Fadillah), `cewe.webp` (Intan)
- ⬜ **Foto cover / hero** — `assets/images/bg.webp`
- ⬜ **Narasi Kisah Cinta** — tulis ulang cerita asli (nama sudah otomatis benar)

## 🟡 To Do — Media & aset

- ⬜ Foto galeri (`#gallery`) — ganti gambar template
- ⬜ Video Kisah Cinta (`assets/video/`) — opsional, hapus jika tidak dipakai
- ⬜ Musik latar (`assets/music/pure-love-304010.mp3`) — ganti jika perlu

## 🔵 To Do — Deploy (GitHub Pages, dijalankan MANUAL via Actions)

- ✅ Workflow GitHub Actions `deploy-pages.yml` (lint + build:public + deploy Pages, trigger manual `workflow_dispatch`)
- ⬜ Repo GitHub → Settings → Pages → Source = **GitHub Actions** (setup sekali)
- ⬜ **Siapkan domain sendiri**, isi file `CNAME` (ganti `GANTI-DENGAN-DOMAIN-ANDA.com`)
- ⬜ Set DNS domain: A record apex ke IP GitHub Pages / CNAME `www` → `<user>.github.io`
- ⬜ Settings → Pages → Custom domain + **Enforce HTTPS**
- ⬜ `og:image` / `og:url` / `canonical` / favicon — ganti dari `ulems.my.id` ke domain final
- ⬜ Deploy: tab **Actions → "Deploy to GitHub Pages" → Run workflow** → cek hijau → buka URL
- ⬜ Uji query tamu `?to=Nama%20Tamu`, mobile & desktop, dark/light, preview link WA

## 🟣 To Do — Backend ucapan/RSVP (Google Spreadsheet, gratis)

Sheet: `1CvmSRiXsxMbQqQdV6TctZzr6EjK01HrIjjI7ghBKPyY`

- ✅ **Form ucapan/RSVP self-contained** (`js/app/guest/rsvp.js` + section `#rsvp` di index.html): nama, kehadiran, jumlah tamu, ucapan → POST ke GAS (`Content-Type: text/plain`, tanpa preflight)
- ✅ **Tampilkan daftar ucapan** via GET (render kartu di `#rsvp-list`)
- ✅ Section otomatis **disembunyikan** bila `data-gas` kosong (tidak error) — diverifikasi via harness DOM-stub (4 kasus PASS)
- ✅ Kode Apps Script siap tempel: `apps-script-ucapan.gs`
- ⬜ **[MANUAL/BROWSER]** Buka Sheet → buat tab `ucapan` (header: timestamp, nama, kehadiran, jumlah_tamu, ucapan)
- ⬜ **[MANUAL/BROWSER]** Extensions → Apps Script → tempel `apps-script-ucapan.gs` → Deploy Web App (Execute as *Me*, access *Anyone*) → salin URL
- ⬜ **[MANUAL]** Isi URL ke `data-gas` pada `<body>` di index.html → `npm run build`

## ⚪ Opsional / Nanti

- ⏸️ Fitur komentar LENGKAP bawaan template (like/GIF/dashboard) via backend penuh — skill `aktifkan-komentar`
- ⏸️ Fitur GIF pada komentar (butuh Tenor API key)
- ⏸️ Google Calendar link pada tombol "Save Google Calendar"

---

### Catatan

- Data undangan (nama, tanggal, rekening, gift) diubah di `main` lalu di-sync (merge) ke semua branch tema agar konsisten.
- Setelah edit `js/`, jalankan `npm run build`. Sebelum deklarasi selesai, jalankan `npm run lint:html`.
- Jangan commit/push tanpa diminta.
