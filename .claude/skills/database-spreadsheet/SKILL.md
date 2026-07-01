---
name: database-spreadsheet
description: Setup backend gratis untuk ucapan/komentar & RSVP undangan memakai Google Spreadsheet + Google Apps Script sebagai API. Gunakan saat user minta aktifkan komentar/RSVP dengan database gratis atau spreadsheet.
---

# Backend Gratis: Google Spreadsheet + Apps Script

Tujuan: menyimpan **ucapan/komentar & RSVP** tamu ke Google Sheet tanpa server berbayar. Google Apps Script (GAS) di-deploy sebagai Web App → jadi endpoint HTTP yang dipanggil dari `index.html`.

## ⚠️ Penting — tingkat adaptasi

Backend bawaan template ini REST penuh (lihat `js/connection/request.js`): base URL dari atribut `data-url` di `<body>`, response JSON `{ code, data, error, id }`, auth header `x-access-key`/Bearer JWT, plus fitur like, pagination, GIF, edit/hapus komentar. **Meniru SEMUA itu dengan Apps Script berlebihan.**

Rekomendasikan pendekatan pragmatis: **jangan pakai ulang komponen komentar penuh**. Buat form ucapan/RSVP sederhana sendiri yang POST ke GAS, dan (opsional) tampilkan daftar ucapan via GET. Ini jauh lebih sederhana dan tetап gratis.

## Struktur Sheet

Buat Google Sheet, tab `ucapan`, header baris 1:
`timestamp | nama | kehadiran | jumlah_tamu | ucapan`

## Google Apps Script (Web App)

Di Sheet → Extensions → Apps Script, tempel kira-kira:

```javascript
const SHEET = 'ucapan';

function doGet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  const rows = sh.getDataRange().getValues().slice(1).reverse();
  const data = rows.map(r => ({
    nama: r[1], kehadiran: r[2], jumlah_tamu: r[3], ucapan: r[4],
    timestamp: r[0],
  }));
  return json({ code: 200, data, error: null });
}

function doPost(e) {
  const b = JSON.parse(e.postData.contents);
  if (!b.nama || !b.ucapan) return json({ code: 400, data: null, error: ['nama & ucapan wajib'] });
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  sh.appendRow([new Date().toISOString(), b.nama, b.kehadiran || '', b.jumlah_tamu || 1, b.ucapan]);
  return json({ code: 201, data: true, error: null });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy → **New deployment** → type **Web app** → Execute as *Me*, Who has access *Anyone*. Salin **Web app URL** (`https://script.google.com/macros/s/.../exec`).

> Catatan CORS: GAS Web App mengizinkan request lintas-origin untuk `text/plain`/simple request. Dari front-end, kirim POST dengan `Content-Type: text/plain` (bukan `application/json`) agar tidak kena preflight; parse `JSON.parse` tetap jalan di GAS.

## Integrasi di front-end

Pilihan paling bersih: tambahkan sedikit JS sendiri (mis. `js/app/guest/rsvp.js`) yang:
1. Ambil elemen form ucapan/RSVP di `index.html`.
2. `fetch(GAS_URL, { method:'POST', headers:{'Content-Type':'text/plain'}, body: JSON.stringify({nama, kehadiran, jumlah_tamu, ucapan}) })`.
3. (opsional) `fetch(GAS_URL)` untuk GET daftar ucapan lalu render.
4. Simpan `GAS_URL` sebagai konstanta di file itu, atau atribut `data-gas` di `<body>`.

Jangan lupa `npm run build` setelah menambah/mengubah file di `js/` (entry `js/guest.js` mem-bundle modul). Lalu `npm run lint:html`/`lint:js`.

## Batasan
- Kuota GAS gratis: cukup untuk skala undangan (ribuan hit/hari).
- Tanpa auth admin — data ucapan bersifat publik-append. Untuk moderasi, edit langsung di Sheet.
- Fitur like/GIF/edit-hapus bawaan template TIDAK tersedia di jalur ini (butuh backend penuh). Jika user mau fitur penuh, arahkan ke skill `aktifkan-komentar` (backend/trial API).

## Update board
Tandai item terkait di `PROJECT_BOARD.md` setelah selesai.
