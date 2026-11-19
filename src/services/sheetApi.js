/**
 * ============================================================================
 * SHEET API SERVICE: GOOGLE APPS SCRIPT TWO-WAY FULL SYNC
 * src/services/sheetApi.js
 * ============================================================================
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SheetApi = factory();
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const DEFAULT_ENDPOINT = 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec';
  const DEFAULT_PIN = '270627';

  function parseCurrency(val) {
    if (val === null || val === undefined || val === '') return 0;
    if (typeof val === 'number') return Math.round(val);
    const clean = String(val).replace(/Rp/gi, '').replace(/\./g, '').replace(/,/g, '.').replace(/\s+/g, '').trim();
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : Math.round(num);
  }

  function formatRp(num) {
    const n = Math.round(Number(num) || 0);
    return 'Rp ' + Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatDateIso(val) {
    if (!val) return '';
    const s = String(val).trim();
    const dmy = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmy) {
      return dmy[3] + '-' + dmy[2].padStart(2, '0') + '-' + dmy[1].padStart(2, '0');
    }
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
      return s.substring(0, 10);
    }
    return s;
  }

  async function getAll(endpoint, pin) {
    const urlEndpoint = endpoint || DEFAULT_ENDPOINT;
    const pinVal = pin || DEFAULT_PIN;
    const sep = urlEndpoint.indexOf('?') === -1 ? '?' : '&';
    const finalUrl = urlEndpoint + sep + 'action=getAll&pin=' + encodeURIComponent(pinVal) + '&_t=' + Date.now();

    const response = await fetch(finalUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi Google Apps Script: HTTP ' + response.status);
    }

    const result = await response.json();
    if (result.status !== 'success' || !result.data) {
      throw new Error(result.message || 'Respons tidak valid dari server backend');
    }

    return result;
  }

  async function append(sheetName, rowValues, endpoint, pin) {
    const urlEndpoint = endpoint || DEFAULT_ENDPOINT;
    const pinVal = pin || DEFAULT_PIN;

    const payload = {
      sheet: sheetName,
      action: 'append',
      rowValues: rowValues,
      pin: pinVal
    };

    const response = await fetch(urlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Gagal menambahkan data ke spreadsheet: HTTP ' + response.status);
    }

    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Gagal menambahkan data');
    }

    return result;
  }

  async function updateRow(sheetName, rowIndex, rowValues, startCol, endpoint, pin) {
    const urlEndpoint = endpoint || DEFAULT_ENDPOINT;
    const pinVal = pin || DEFAULT_PIN;

    const payload = {
      sheet: sheetName,
      action: 'updateRow',
      rowIndex: rowIndex,
      startCol: startCol || 1,
      rowValues: rowValues,
      pin: pinVal
    };

    const response = await fetch(urlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Gagal memperbarui data spreadsheet: HTTP ' + response.status);
    }

    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Gagal memperbarui baris');
    }

    return result;
  }

  async function deleteRow(sheetName, rowIndex, endpoint, pin) {
    const urlEndpoint = endpoint || DEFAULT_ENDPOINT;
    const pinVal = pin || DEFAULT_PIN;

    const payload = {
      sheet: sheetName,
      action: 'deleteRow',
      rowIndex: rowIndex,
      pin: pinVal
    };

    const response = await fetch(urlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Gagal menghapus baris spreadsheet: HTTP ' + response.status);
    }

    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Gagal menghapus baris');
    }

    return result;
  }

  function extractMasterFormulas(masterRows) {
    if (!masterRows || !Array.isArray(masterRows)) return null;

    const getCell = function(r, c) {
      if (masterRows[r] && masterRows[r][c] !== undefined) {
        return String(masterRows[r][c]).trim();
      }
      return '';
    };

    const totalPaguStr = getCell(32, 5) || 'Rp140.051.211';
    const totalRealStr = getCell(32, 7) || 'Rp31.087.301';
    const totalSisaStr = getCell(32, 9) || 'Rp108.963.910';
    const serapanPctStr = getCell(32, 11) || '22,2%';

    const cpp = getCell(4, 3) || 'FARHAN RAFIQI';
    const cpw = getCell(4, 7) || 'INDIRA GUSTI ARINI';
    const weddingDateText = getCell(5, 3) || 'Minggu, 27 Juni 2027';
    const venue = getCell(5, 7) || 'Venue Intimate';
    const targetReady = getCell(5, 11) || 'April 2027 (H-2 Bulan)';
    const countdownText = getCell(4, 11) || '⏳ 221 Hari Menuju Akad';

    const p1Pagu = parseCurrency(getCell(27, 5));
    const p1Real = parseCurrency(getCell(27, 7));
    const p1Pct = getCell(27, 11) || '0,0%';

    const p2Pagu = parseCurrency(getCell(28, 5));
    const p2Real = parseCurrency(getCell(28, 7));
    const p2Pct = getCell(28, 11) || '35,5%';

    const p3Pagu = parseCurrency(getCell(29, 5));
    const p3Real = parseCurrency(getCell(29, 7));
    const p3Pct = getCell(29, 11) || '74,3%';

    const p4Pagu = parseCurrency(getCell(30, 5));
    const p4Real = parseCurrency(getCell(30, 7));
    const p4Pct = getCell(30, 11) || '36,9%';

    const p5Pagu = parseCurrency(getCell(31, 5));
    const p5Real = parseCurrency(getCell(31, 7));
    const p5Pct = getCell(31, 11) || '0,0%';

    const wtStatusText = getCell(14, 2) || '0 dari 18 Selesai';
    const pwStatusText = getCell(14, 6) || '0 / 12 Item';
    const ssStatusText = getCell(14, 10) || '0 dari 31 Item';

    const mhStatusText = getCell(22, 2) || 'Dalam Proses ⏳';
    const adStatusText = getCell(22, 6) || '0 / 48 Berkas';
    const tmStatusText = getCell(22, 10) || '11 Pax (9,9%)';
    const tmTerdaftarText = getCell(19, 10) || '111 / 500 Pax (22,2%)';
    const tmCppAllocText = getCell(20, 10) || '5 / 250 Pax (Sisa: 245)';
    const tmCpwAllocText = getCell(21, 10) || '106 / 250 Pax (Sisa: 144)';

    const rdTotalSesi = getCell(36, 2) || '20 Sesi';
    const rdKesiapanPct = getCell(36, 4) || '0,0%';
    const vdTotalVendor = getCell(36, 8) || '14 Rekanan';
    const vdStatusDeal = getCell(36, 10) || '0 Deal';

    return {
      totalPaguStr: totalPaguStr,
      totalRealStr: totalRealStr,
      totalSisaStr: totalSisaStr,
      serapanPctStr: serapanPctStr,
      totalPaguNum: parseCurrency(totalPaguStr),
      totalRealNum: parseCurrency(totalRealStr),
      totalSisaNum: parseCurrency(totalSisaStr),
      cpp: cpp,
      cpw: cpw,
      weddingDateText: weddingDateText,
      venue: venue,
      targetReady: targetReady,
      countdownText: countdownText,
      pillars: {
        tracker: { pagu: p1Pagu, real: p1Real, pctStr: p1Pct, statusText: wtStatusText },
        prewed: { pagu: p2Pagu, real: p2Real, pctStr: p2Pct, statusText: pwStatusText },
        seserahan: { pagu: p3Pagu, real: p3Real, pctStr: p3Pct, statusText: ssStatusText },
        mahar: { pagu: p4Pagu, real: p4Real, pctStr: p4Pct, statusText: mhStatusText },
        administrasi: { pagu: p5Pagu, real: p5Real, pctStr: p5Pct, statusText: adStatusText },
        tamu: { statusText: tmStatusText, terdaftarText: tmTerdaftarText, cppAlloc: tmCppAllocText, cpwAlloc: tmCpwAllocText }
      },
      summaryExtra: {
        rdTotalSesi: rdTotalSesi,
        rdKesiapanPct: rdKesiapanPct,
        vdTotalVendor: vdTotalVendor,
        vdStatusDeal: vdStatusDeal
      }
    };
  }

  function parseAllTabs(tabsData) {
    if (!tabsData || typeof tabsData !== 'object') return null;

    const masterRows = tabsData['MASTER'] || [];
    const masterFormulas = extractMasterFormulas(masterRows);

    const meta = {
      cpp: (masterFormulas && masterFormulas.cpp) || 'FARHAN RAFIQI',
      cpw: (masterFormulas && masterFormulas.cpw) || 'INDIRA GUSTI ARINI',
      weddingDate: '2027-06-27',
      weddingDateText: (masterFormulas && masterFormulas.weddingDateText) || 'Minggu, 27 Juni 2027',
      venue: (masterFormulas && masterFormulas.venue) || 'Venue Intimate',
      targetReady: (masterFormulas && masterFormulas.targetReady) || 'April 2027 (H-2 Bulan)',
      targetPaxCpp: 250,
      targetPaxCpw: 250,
      targetPaxTotal: 500
    };

    const tamuRows = tabsData['TAMU'] || [];
    if (tamuRows[3]) {
      const cppQ = parseInt(tamuRows[3][6], 10);
      const cpwQ = parseInt(tamuRows[3][10], 10);
      if (!isNaN(cppQ) && cppQ > 0) meta.targetPaxCpp = cppQ;
      if (!isNaN(cpwQ) && cpwQ > 0) meta.targetPaxCpw = cpwQ;
      meta.targetPaxTotal = meta.targetPaxCpp + meta.targetPaxCpw;
    }

    const wtRows = tabsData['WEDDING TRACKER'] || [];
    const weddingTracker = [];
    let lastCatWT = 'Umum';
    for (let r = 7; r < Math.min(32, wtRows.length); r++) {
      const row = wtRows[r];
      if (!row || !row[3] || !String(row[3]).trim()) continue;
      if (row[2] && String(row[2]).trim()) lastCatWT = String(row[2]).trim();
      const rowIndex = r + 1;
      weddingTracker.push({
        id: 'WT-R' + rowIndex,
        sheet: 'WEDDING TRACKER',
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (weddingTracker.length + 1),
        kategori: lastCatWT,
        item: String(row[3]).trim(),
        pic: String(row[4] || '').trim(),
        target: formatDateIso(row[5]),
        estimasi: parseCurrency(row[6]),
        realisasi: parseCurrency(row[7]),
        status: String(row[8] || 'Belum Dimulai').trim(),
        catatan: String(row[9] || '').trim()
      });
    }

    const pwRows = tabsData['PRE WEDDING'] || [];
    const preWedding = [];
    let lastCatPW = 'Pra-Nikah';
    for (let r = 8; r < Math.min(43, pwRows.length); r++) {
      const row = pwRows[r];
      if (!row || !row[3] || !String(row[3]).trim()) continue;
      const itemName = String(row[3]).trim();
      if (itemName.startsWith('Subtotal') || itemName.startsWith('TOTAL')) continue;
      if (row[2] && String(row[2]).trim()) lastCatPW = String(row[2]).trim();
      const rowIndex = r + 1;
      preWedding.push({
        id: 'PW-R' + rowIndex,
        sheet: 'PRE WEDDING',
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (preWedding.length + 1),
        kategori: lastCatPW,
        item: itemName,
        pic: String(row[4] || '').trim(),
        target: formatDateIso(row[5]),
        estimasi: parseCurrency(row[6]),
        realisasi: parseCurrency(row[7]),
        status: String(row[8] || 'Belum Dimulai').trim(),
        catatan: String(row[9] || '').trim()
      });
    }

    const ssRows = tabsData['SESERAHAN'] || [];
    const seserahan = [];
    let lastCatSS = 'Seserahan';
    for (let r = 7; r < Math.min(73, ssRows.length); r++) {
      const row = ssRows[r];
      if (!row || !row[3] || !String(row[3]).trim()) continue;
      const itemName = String(row[3]).trim();
      if (itemName.startsWith('Subtotal') || itemName.startsWith('TOTAL')) continue;
      if (row[2] && String(row[2]).trim()) lastCatSS = String(row[2]).trim();
      const rowIndex = r + 1;
      seserahan.push({
        id: 'SS-R' + rowIndex,
        sheet: 'SESERAHAN',
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (seserahan.length + 1),
        kategori: lastCatSS,
        item: itemName,
        brand: String(row[4] || '').trim(),
        harga: parseCurrency(row[5]),
        link: String(row[6] || '').trim(),
        status: String(row[7] || 'Pending').trim()
      });
    }

    const mhRows = tabsData['MAHAR'] || [];
    const maharTargets = [];
    for (let r = 9; r < Math.min(12, mhRows.length); r++) {
      const row = mhRows[r];
      if (!row || !row[2]) continue;
      const rowIndex = r + 1;
      const instrumen = String(row[2] || '').trim();
      let targetJumlah = Number(row[4]) || 0;
      let satuan = String(row[5] || '').trim();
      let spesifikasi = String(row[3] || '').trim();
      if (/emas|logam\s*mulia/i.test(instrumen)) {
        if (targetJumlah === 3 || !targetJumlah) targetJumlah = 6;
        satuan = 'Gram';
        spesifikasi = 'Akumulasi ' + targetJumlah + ' Gram Emas Hartadinata / Logam Mulia';
      }
      maharTargets.push({
        id: 'MT-R' + rowIndex,
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (maharTargets.length + 1),
        instrumen: instrumen,
        spesifikasi: spesifikasi,
        targetJumlah: targetJumlah,
        satuan: satuan,
        hargaSatuan: parseCurrency(row[6]),
        totalEstimasi: parseCurrency(row[7]),
        realisasi: parseCurrency(row[8]),
        status: String(row[9] || '').trim(),
        lokasi: String(row[10] || '').trim()
      });
    }

    const maharLogs = [];
    for (let r = 15; r < Math.min(30, mhRows.length); r++) {
      const rowIndex = r + 1;
      // Filter eksplisit baris #29 dan #30 ("Target Kuantitas")
      if (rowIndex === 29 || rowIndex === 30) continue;
      const row = mhRows[r];
      if (!row || (!row[2] && !row[3])) continue;
      const tgl = String(row[2] || '').trim();
      const komp = String(row[3] || '').trim();
      if (/target\s*kuantitas/i.test(komp) || /target\s*kuantitas/i.test(tgl) || /target\s*kuantitas/i.test(String(row[10] || ''))) continue;
      let satuan = String(row[5] || '').trim();
      if (!satuan || satuan.toLowerCase() === 'keping') {
        if (/emas|logam\s*mulia/i.test(komp)) satuan = 'Gram';
        else if (/saham|bssr/i.test(komp)) satuan = 'Lot';
        else satuan = 'Paket';
      }
      maharLogs.push({
        id: 'ML-R' + rowIndex,
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (maharLogs.length + 1),
        tanggal: formatDateIso(row[2]),
        komponen: komp,
        volume: Number(row[4]) || 0,
        satuan: satuan,
        hargaSatuan: parseCurrency(row[6]),
        status: String(row[7] || 'Selesai').trim(),
        totalRealisasi: parseCurrency(row[8]),
        sumberDana: String(row[9] || '').trim(),
        catatan: String(row[10] || '').trim()
      });
    }

    const adRows = tabsData['ADMINISTRASI'] || [];
    const administrasi = [];
    for (let r = 7; r < Math.min(33, adRows.length); r++) {
      const row = adRows[r];
      if (!row || !row[3] || !String(row[3]).trim()) continue;
      const rowIndex = r + 1;
      const cppRaw = row[4];
      const cpwRaw = row[5];
      administrasi.push({
        id: 'AD-R' + rowIndex,
        sheet: 'ADMINISTRASI',
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (administrasi.length + 1),
        instansi: String(row[2] || '').trim(),
        dokumen: String(row[3]).trim(),
        cppCheck: String(cppRaw).trim() === '—' ? 'NA' : Boolean(cppRaw === true || String(cppRaw).toUpperCase() === 'TRUE'),
        cpwCheck: String(cpwRaw).trim() === '—' ? 'NA' : Boolean(cpwRaw === true || String(cpwRaw).toUpperCase() === 'TRUE'),
        target: formatDateIso(row[6]),
        estimasi: parseCurrency(row[7]),
        realisasi: parseCurrency(row[8]),
        selisih: parseCurrency(row[9]),
        catatan: String(row[10] || '').trim()
      });
    }

    const vdRows = tabsData['VENDOR DIRECTORY'] || [];
    const vendors = [];
    for (let r = 16; r < Math.min(30, vdRows.length); r++) {
      const row = vdRows[r];
      if (!row || !row[3] || !String(row[3]).trim()) continue;
      const rowIndex = r + 1;
      vendors.push({
        id: 'VD-R' + rowIndex,
        sheet: 'VENDOR DIRECTORY',
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (vendors.length + 1),
        kategori: String(row[2] || '').trim(),
        nama: String(row[3]).trim(),
        kontak: String(row[4] || '').trim(),
        nilaiKontrak: parseCurrency(row[5]),
        sisaPembayaran: parseCurrency(row[6]),
        statusKerjasama: String(row[7] || 'Riset').trim(),
        statusPembayaran: String(row[8] || 'Belum Bayar').trim(),
        layanan: String(row[9] || '').trim(),
        catatan: String(row[10] || '').trim()
      });
    }

    const trRows = tabsData['TIMELINE & RUNDOWN'] || [];
    const timeline = [];
    for (let r = 7; r < Math.min(22, trRows.length); r++) {
      const row = trRows[r];
      if (!row || !row[4] || !String(row[4]).trim()) continue;
      const rowIndex = r + 1;
      timeline.push({
        id: 'TL-R' + rowIndex,
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (timeline.length + 1),
        fase: String(row[2] || '').trim(),
        kategori: String(row[3] || '').trim(),
        agenda: String(row[4]).trim(),
        rincian: String(row[5] || '').trim(),
        target: formatDateIso(row[6]),
        pic: String(row[7] || '').trim(),
        status: String(row[8] || 'Belum Mulai').trim()
      });
    }

    const rundown = [];
    for (let r = 30; r < Math.min(50, trRows.length); r++) {
      const row = trRows[r];
      if (!row || !row[4] || !String(row[4]).trim()) continue;
      const rowIndex = r + 1;
      rundown.push({
        id: 'RD-R' + rowIndex,
        rowIndex: rowIndex,
        no: parseInt(row[1], 10) || (rundown.length + 1),
        waktu: String(row[2] || '').trim(),
        durasi: String(row[3] || '').trim(),
        sesi: String(row[4]).trim(),
        deskripsi: String(row[5] || '').trim(),
        lokasi: String(row[6] || '').trim(),
        pic: String(row[7] || '').trim(),
        vendor: String(row[8] || '').trim(),
        status: String(row[9] || 'Siap').trim(),
        catatan: String(row[10] || '').trim()
      });
    }

    const tamu = [];
    for (let r = 9; r < Math.min(19, tamuRows.length); r++) {
      const row = tamuRows[r];
      if (!row) continue;
      const rowIndex = r + 1;
      if (row[3] && String(row[3]).trim()) {
        tamu.push({
          id: 'TM-CPP-FAM-R' + rowIndex,
          rowIndex: rowIndex,
          side: 'CPP',
          kelompok: 'Keluarga Inti',
          no: parseInt(row[1], 10) || (tamu.length + 1),
          kategori: String(row[2] || 'Keluarga Inti').trim(),
          nama: String(row[3]).trim(),
          pax: parseInt(row[4], 10) || 1,
          statusUndangan: String(row[5] || 'Draft').trim(),
          rsvp: String(row[6] || 'Hadir').trim()
        });
      }
      if (row[10] && String(row[10]).trim()) {
        tamu.push({
          id: 'TM-CPW-FAM-R' + rowIndex,
          rowIndex: rowIndex,
          side: 'CPW',
          kelompok: 'Keluarga Inti',
          no: parseInt(row[8], 10) || (tamu.length + 1),
          kategori: String(row[9] || 'Keluarga Inti').trim(),
          nama: String(row[10]).trim(),
          pax: parseInt(row[11], 10) || 1,
          statusUndangan: String(row[12] || 'Draft').trim(),
          rsvp: String(row[13] || 'Hadir').trim()
        });
      }
    }

    for (let r = 22; r < Math.min(171, tamuRows.length); r++) {
      const row = tamuRows[r];
      if (!row) continue;
      const rowIndex = r + 1;
      if (row[3] && String(row[3]).trim()) {
        tamu.push({
          id: 'TM-CPP-GEN-R' + rowIndex,
          rowIndex: rowIndex,
          side: 'CPP',
          kelompok: 'Tamu Umum',
          no: parseInt(row[1], 10) || (tamu.length + 1),
          kategori: String(row[2] || 'Umum').trim(),
          nama: String(row[3]).trim(),
          pax: parseInt(row[4], 10) || 1,
          statusUndangan: String(row[5] || 'Draft').trim(),
          rsvp: String(row[6] || 'Belum Konfirmasi').trim()
        });
      }
      if (row[10] && String(row[10]).trim()) {
        tamu.push({
          id: 'TM-CPW-GEN-R' + rowIndex,
          rowIndex: rowIndex,
          side: 'CPW',
          kelompok: 'Tamu Umum',
          no: parseInt(row[8], 10) || (tamu.length + 1),
          kategori: String(row[9] || 'Umum').trim(),
          nama: String(row[10]).trim(),
          pax: parseInt(row[11], 10) || 1,
          statusUndangan: String(row[12] || 'Draft').trim(),
          rsvp: String(row[13] || 'Belum Konfirmasi').trim()
        });
      }
    }

    return {
      rawSheets: tabsData,
      masterFormulas: masterFormulas,
      meta: meta,
      weddingTracker: weddingTracker,
      preWedding: preWedding,
      seserahan: seserahan,
      maharTargets: maharTargets,
      maharLogs: maharLogs,
      administrasi: administrasi,
      vendors: vendors,
      timeline: timeline,
      rundown: rundown,
      tamu: tamu
    };
  }

  return {
    DEFAULT_ENDPOINT: DEFAULT_ENDPOINT,
    DEFAULT_PIN: DEFAULT_PIN,
    parseCurrency: parseCurrency,
    formatRp: formatRp,
    formatDateIso: formatDateIso,
    getAll: getAll,
    append: append,
    updateRow: updateRow,
    deleteRow: deleteRow,
    extractMasterFormulas: extractMasterFormulas,
    parseAllTabs: parseAllTabs
  };
});
