---
name: isi-data-undangan
description: Panduan mengisi atau mengubah data undangan (nama mempelai, tanggal, jam akad/resepsi, lokasi & Google Maps, nama orang tua, rekening/gift) di index.html secara aman dan konsisten. Gunakan saat user minta ubah/isi detail undangan Fadillah & Intan.
---

# Isi / Ubah Data Undangan

Semua data undangan ada di `index.html`. **Jangan** edit `dist/`. Setelah selesai, jalankan `npm run lint:html`.

## Aturan konsistensi

- Nama mempelai selalu urut: **Fadillah (pria) dulu**, lalu **Intan (wanita)**.
- Countdown pakai `data-time` di `<body>`, format `YYYY-MM-DD HH:MM:SS` (waktu akad). Saat ini `2027-09-27 10:00:00`. Tanggal pernikahan **Senin, 27 September 2027** — jaga agar semua teks tanggal ("Senin, 27 September 2027") konsisten.
- Jika mengubah nama, cek SEMUA lokasi (jangan sampai ada yang tertinggal): `<title>`, meta `name`/`property` (og:*), cover desktop, hero mobile, section `#bride`, section gift (nama pemilik rekening), footer/opening (`The Wedding Of`).

## Lokasi tiap data di index.html

| Data | Petunjuk cari |
|---|---|
| Judul & meta SEO/OG | blok `<head>`, cari "Undangan Pernikahan Fadillah & Intan" |
| Tanggal countdown | `<body ... data-time="...">` |
| Nama & tanggal cover/hero | cari `Fadillah &amp; Intan` (ada di cover desktop, hero, footer) |
| Mempelai + orang tua | section `id="bride"` — cari `font-esthetic` dengan nama & baris "Bapak ... dan Ibu ..." |
| Jam Akad / Resepsi | cari `>Akad<` dan `>Resepsi<`, ubah "Pukul ... WIB" |
| Lokasi & Google Maps | cari `Lihat Google Maps` (href) dan `<small ...>` alamat |
| Rekening / gift | section gift — cari `Bank Central Asia`, `data-copy` (no rek), `fa-phone-volume` (no HP). Ubah teks **dan** atribut `data-copy` agar tombol copy benar. |
| Dress code | cari `dress code` / `Busana batik` |
| Kisah Cinta | section love story — narasi bebas |

## Langkah

1. Baca bagian terkait di `index.html` sebelum edit (Edit tool butuh Read dulu).
2. Untuk mengganti nama di banyak tempat sekaligus, boleh pakai `sed -i` via Bash, lalu verifikasi tidak ada sisa placeholder (`grep`).
3. Jika mengubah nomor rekening/HP: ubah teks yang tampil DAN atribut `data-copy` di tombol copy-nya.
4. Jalankan `npm run lint:html` dan laporkan hasil.
5. Perbarui `PROJECT_BOARD.md` (tandai ✅) untuk item yang selesai.

## Placeholder yang masih perlu diisi (per 2026-07-01)
Orang tua Intan, no. rekening BCA (`1234567891234`), no. HP gift (`0812345678`).
