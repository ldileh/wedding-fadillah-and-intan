---
name: aktifkan-komentar
description: Mengaktifkan fitur ucapan/komentar bawaan template (like, GIF, pagination, moderasi) via backend penuh — trial API atau backend self-host. Gunakan saat user mau fitur komentar LENGKAP bawaan template, bukan spreadsheet.
---

# Aktifkan Fitur Komentar (backend penuh)

Ini untuk fitur komentar **bawaan template** (kirim ucapan, like, GIF, pagination, edit/hapus, dashboard admin). Butuh backend REST yang kompatibel. Kalau user hanya mau ucapan/RSVP sederhana gratis, pakai skill `database-spreadsheet` sebagai gantinya.

## Status sekarang
Komentar NONAKTIF: atribut `data-url` & `data-key` sudah dihapus dari `<body>` di `index.html`. Confetti aktif.

## Cara mengaktifkan

Di `<body>` `index.html`, tambahkan kembali:
```html
<body data-url="<BASE_URL_BACKEND>" data-key="<ACCESS_KEY>" data-audio="..." data-confetti="true" data-time="2027-09-27 10:00:00">
```
- `data-url`: base URL backend (akhiri `/`), mis. trial `https://api.ulems.my.id/` atau backend sendiri.
- `data-key`: access key dari dashboard.
- Catatan: `data-confetti` hanya berfungsi saat komentar OFF; saat komentar ON, konfeti dinonaktifkan otomatis by design template.

## Sumber backend

1. **Trial API (paling cepat, gratis, sementara)**: `https://trial.ulems.my.id` — daftar, ambil access key, isi ke `data-url`/`data-key`. Data bisa dihapus/expired; jangan untuk produksi jangka panjang.
2. **Self-host**: lihat README (bagian Deployment API) + presentasi yang ditautkan. Butuh hosting backend sendiri.

## Dashboard admin
`dashboard.html` (`<body data-url="...">`) dipakai untuk moderasi & ambil access key. Set `data-url`-nya sama dengan backend. Login pakai kredensial dari backend.

## Verifikasi
1. `npm run build` (jika `js/` berubah) & `npm run lint:html`.
2. `npm run dev`, buka `http://localhost:8080`, coba kirim komentar & cek muncul.
3. Pastikan backend mengizinkan CORS dari domain undangan.

## Update board
Tandai item "Aktifkan fitur komentar" di `PROJECT_BOARD.md`.
