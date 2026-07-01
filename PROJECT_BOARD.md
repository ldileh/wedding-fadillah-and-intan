# 📋 Board Pengerjaan — Undangan Fadillah & Intan

Pernikahan: **Senin, 27 September 2027** · Repo template: undangan v4.x

Legenda: ✅ selesai · 🔄 sedang dikerjakan · ⬜ belum · ⏸️ ditunda

---

## 🟢 Done

- ✅ Konfigurasi awal project (nama, tanggal, judul & meta SEO/OG)
- ✅ Countdown `data-time` = `2027-09-27 10:00:00`
- ✅ Cover & hero: "Fadillah & Intan — Senin, 27 September 2027"
- ✅ Data mempelai pria (Fadillah) + orang tua
- ✅ Lokasi acara + link Google Maps (Villa Kampung Sawah Cimande, Bogor)
- ✅ Nama pemilik rekening (BCA → Intan, Qris/Gift → Fadillah)
- ✅ Fitur komentar dinonaktifkan (hapus `data-url`/`data-key`), confetti aktif
- ✅ `npm install` + `npm run build` → `dist/` terbentuk, htmlhint lolos
- ✅ AGENTS.md, PROJECT_BOARD.md, skill kustom

---

## 🔴 To Do — Konten wajib

- ⬜ **Orang tua Intan** — ganti "Bapak/Ibu lorem ipsum" di section `#bride`
- ⬜ **No. rekening BCA** — ganti `1234567891234` (teks + atribut `data-copy`)
- ⬜ **No. HP / e-wallet gift** — ganti `0812345678` (teks + `data-copy`)
- ⬜ **Foto mempelai** — `assets/images/cowo.webp` (Fadillah), `cewe.webp` (Intan)
- ⬜ **Foto cover / hero** — `assets/images/bg.webp`
- ⬜ **Narasi Kisah Cinta** — tulis ulang cerita asli (nama sudah otomatis benar)
- ⬜ **Konfirmasi jam Akad & Resepsi** (sekarang default 10.00 / 13.00 WIB)

## 🟡 To Do — Media & aset

- ⬜ Foto galeri (`#gallery`) — ganti gambar template
- ⬜ Video Kisah Cinta (`assets/video/`) — opsional, hapus jika tidak dipakai
- ⬜ Musik latar (`assets/music/pure-love-304010.mp3`) — ganti jika perlu
- ⬜ QRIS donate image (`assets/images/donate.png`)

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

- ⬜ Buat Google Sheet + tab `ucapan` (kolom: timestamp, nama, kehadiran, jumlah_tamu, ucapan)
- ⬜ Google Apps Script Web App (doGet/doPost) → deploy, salin URL — lihat skill `database-spreadsheet`
- ⬜ Tambah form ucapan/RSVP + JS (`js/app/guest/rsvp.js`) yang POST ke GAS, lalu `npm run build`
- ⬜ (opsional) Tampilkan daftar ucapan via GET

## ⚪ Opsional / Nanti

- ⏸️ Fitur komentar LENGKAP bawaan template (like/GIF/dashboard) via backend penuh — skill `aktifkan-komentar`
- ⏸️ Fitur GIF pada komentar (butuh Tenor API key)
- ⏸️ Google Calendar link pada tombol "Save Google Calendar"

---

### Catatan

- Setelah edit `js/`, jalankan `npm run build`. Sebelum deklarasi selesai, jalankan `npm run lint:html`.
- Jangan commit/push tanpa diminta.
