import { util } from '../../common/util.js';

export const rsvp = (() => {

    /**
     * URL Google Apps Script Web App (.../macros/s/.../exec).
     * Diambil dari atribut data-gas di <body>. Jika kosong, fitur ucapan
     * dinonaktifkan (form disembunyikan) agar tidak error.
     *
     * @type {string|null}
     */
    let gasUrl = null;

    /**
     * Badge status kehadiran. Nilai dari Sheet bisa string atau number.
     *
     * @param {(string|number)} v
     * @returns {string}
     */
    const presenceBadge = (v) => {
        const val = String(v);
        if (val === '1') {
            return '<span class="badge bg-success rounded-4">Hadir</span>';
        }
        if (val === '2') {
            return '<span class="badge bg-secondary rounded-4">Berhalangan</span>';
        }
        return '';
    };

    /**
     * Render satu kartu ucapan.
     *
     * @param {{nama: string, kehadiran: string, jumlah_tamu: (string|number), ucapan: string, timestamp: string}} c
     * @returns {string}
     */
    const cardTemplate = (c) => {
        const badge = presenceBadge(c.kehadiran);

        return `<div class="border rounded-4 shadow-sm p-3 mb-2 text-break">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <strong>${util.escapeHtml(c.nama)}</strong>
                ${badge}
            </div>
            <p class="m-0" style="white-space: pre-line;">${util.escapeHtml(c.ucapan)}</p>
        </div>`;
    };

    /**
     * Ambil daftar ucapan dari GAS lalu render.
     *
     * @returns {Promise<void>}
     */
    const load = async () => {
        const list = document.getElementById('rsvp-list');
        if (!gasUrl || !list) {
            return;
        }

        try {
            const res = await fetch(gasUrl, { method: 'GET' });
            const body = await res.json();
            const data = Array.isArray(body?.data) ? body.data : [];

            if (data.length === 0) {
                util.safeInnerHTML(list, '<p class="text-center m-0 opacity-75">Belum ada ucapan. Jadilah yang pertama!</p>');
                return;
            }

            util.safeInnerHTML(list, data.map(cardTemplate).join(''));
        } catch {
            util.safeInnerHTML(list, '<p class="text-center m-0 opacity-75">Gagal memuat ucapan.</p>');
        }
    };

    /**
     * Kirim ucapan/RSVP ke GAS.
     *
     * @param {HTMLButtonElement} button
     * @returns {Promise<void>}
     */
    const send = async (button) => {
        if (!gasUrl) {
            util.notify('Backend ucapan belum dikonfigurasi.').warning();
            return;
        }

        const nameEl = document.getElementById('rsvp-name');
        const presenceEl = document.getElementById('rsvp-presence');
        const guestEl = document.getElementById('rsvp-guest');
        const commentEl = document.getElementById('rsvp-comment');

        const nama = nameEl.value.trim();
        const ucapan = commentEl.value.trim();

        if (nama.length < 2) {
            util.notify('Nama wajib diisi.').warning();
            nameEl.focus();
            return;
        }

        if (ucapan.length < 1) {
            util.notify('Ucapan wajib diisi.').warning();
            commentEl.focus();
            return;
        }

        const payload = {
            nama,
            kehadiran: presenceEl.value,
            jumlah_tamu: guestEl.value,
            ucapan,
        };

        const btn = util.disableButton(button, 'Mengirim');

        try {
            const res = await fetch(gasUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload),
            });
            const body = await res.json();

            if (body?.code >= 400) {
                throw new Error((body.error ?? ['Gagal mengirim']).join(', '));
            }

            commentEl.value = '';
            util.notify('Terima kasih, ucapan kamu sudah terkirim.').success();
            await load();
        } catch (err) {
            util.notify(err?.message ?? 'Gagal mengirim ucapan.').error();
        } finally {
            btn.restore();
        }
    };

    /**
     * @returns {void}
     */
    const init = () => {
        gasUrl = document.body.getAttribute('data-gas');

        const section = document.getElementById('rsvp');
        if (!section) {
            return;
        }

        // Tanpa URL GAS, sembunyikan section agar tidak menampilkan form yang tidak berfungsi.
        if (!gasUrl || gasUrl.length === 0) {
            section.remove();
            document.querySelector('a.nav-link[href="#rsvp"]')?.closest('li.nav-item')?.remove();
            return;
        }

        load();
    };

    return {
        init,
        send,
    };
})();
