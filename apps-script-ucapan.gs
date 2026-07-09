/**
 * Backend ucapan & RSVP untuk undangan Fadillah & Intan.
 *
 * Cara pakai:
 * 1. Buka Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1CvmSRiXsxMbQqQdV6TctZzr6EjK01HrIjjI7ghBKPyY/edit
 * 2. Buat tab bernama `ucapan`. Baris 1 (header):
 *    timestamp | nama | kehadiran | jumlah_tamu | ucapan
 * 3. Extensions -> Apps Script. Hapus isi default, tempel SELURUH file ini. Save.
 * 4. Deploy -> New deployment -> pilih type "Web app".
 *    - Description: bebas
 *    - Execute as: Me (email kamu)
 *    - Who has access: Anyone
 *    Deploy, izinkan akses, lalu SALIN "Web app URL"
 *    (bentuknya https://script.google.com/macros/s/.../exec).
 * 5. Tempel URL itu ke atribut data-gas pada <body> di index.html, lalu `npm run build`.
 *
 * Catatan: setiap kali kamu mengubah kode ini, deploy ulang
 * (Deploy -> Manage deployments -> edit -> New version) agar perubahan aktif.
 */

const SHEET = 'ucapan';

function doGet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  const rows = sh.getDataRange().getValues().slice(1).reverse();
  const data = rows.map(function (r) {
    return {
      timestamp: r[0],
      nama: r[1],
      kehadiran: String(r[2]),
      jumlah_tamu: r[3],
      ucapan: r[4],
    };
  });
  return json({ code: 200, data: data, error: null });
}

function doPost(e) {
  var b;
  try {
    b = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ code: 400, data: null, error: ['payload tidak valid'] });
  }

  if (!b.nama || !b.ucapan) {
    return json({ code: 400, data: null, error: ['nama & ucapan wajib'] });
  }

  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET);
  sh.appendRow([
    new Date().toISOString(),
    String(b.nama).slice(0, 50),
    b.kehadiran || '',
    b.jumlah_tamu || 1,
    String(b.ucapan).slice(0, 1000),
  ]);

  return json({ code: 201, data: true, error: null });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
