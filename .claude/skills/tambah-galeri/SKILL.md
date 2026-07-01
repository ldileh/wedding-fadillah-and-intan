---
name: tambah-galeri
description: Menambah atau mengganti foto (galeri, mempelai, cover) dan video di undangan, termasuk konversi ke webp dan pola lazy-load placeholder + data-src. Gunakan saat user minta ganti/tambah foto, galeri, atau video.
---

# Tambah / Ganti Foto & Video

Aset ada di `assets/images/`, `assets/music/`, `assets/video/`. Foto pakai **`.webp`** (kecuali QR/PNG transparan).

## Pola `<img>` wajib

Selalu:
```html
<img src="./assets/images/placeholder.webp" data-src="./assets/images/NAMA.webp" alt="..." class="...">
```
- `src` = `placeholder.webp` (blur ringan saat loading).
- `data-src` = gambar asli (di-lazy-load oleh `js/app/guest/image.js`).
Jangan hapus `placeholder.webp` dari `src`.

## Foto kunci

| File | Dipakai untuk |
|---|---|
| `assets/images/bg.webp` | cover/hero & og:image |
| `assets/images/cowo.webp` | foto Fadillah (mempelai pria) |
| `assets/images/cewe.webp` | foto Intan (mempelai wanita) |
| `assets/images/donate.png` | QRIS (biarkan PNG) |
| galeri | dalam section `id="gallery"` |

## Konversi ke webp

Jika user memberi JPG/PNG, konversi dulu (kualitas ~80, lebar maks ~1080 untuk potret undangan):
```bash
# butuh cwebp (libwebp) atau ImageMagick
cwebp -q 80 input.jpg -o assets/images/NAMA.webp
# atau: magick input.jpg -quality 80 -resize 1080x assets/images/NAMA.webp
```
Kalau tool tak tersedia, beri tahu user untuk konversi manual (mis. squoosh.app) dan taruh di `assets/images/`.

## Menambah item galeri

1. Buka section `id="gallery"` di `index.html`, tiru satu blok item yang ada.
2. Ganti `data-src` ke foto baru; pertahankan class & atribut modal (`onclick="undangan.guest.modal(this)"` bila ada) agar bisa di-zoom.
3. Jaga rasio/ukuran konsisten dengan item lain.

## Video (opsional)

Kisah Cinta memakai `assets/video/*.mp4` via `id="video-love-stroy"` (`data-src`). Untuk mengganti, ganti file & `data-src`. Untuk menghapus, buang seluruh blok `id="video-love-stroy"` (lihat komentar di HTML).

## Musik

`data-audio` di `<body>` menunjuk `assets/music/*.mp3`. Ganti file & atribut, atau hapus atribut untuk menonaktifkan.

## Selesai
`npm run lint:html`, lalu (jika `js/` tak berubah) tidak perlu build. Perbarui `PROJECT_BOARD.md`.
