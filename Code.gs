/**
 * ============================================================================
 * BACKEND API: FARHAN & INDIRA WEDDING TRACKER PWA (Code.gs v2 — Full Sync)
 * Terhubung ke Spreadsheet: "Farhan Indira by Indira"
 * Spreadsheet ID: 1_VOUhsc_Rt6zlj8hHtsZaZpEmiGShchaJFqFIaeFUQY
 * Mendukung Sinkronisasi 2 Arah penuh termasuk:
 *  - MASTER (Tanggal Pernikahan D6, Nama Mempelai D5/H5, Venue H6, Target L6)
 *  - WEDDING TRACKER, PRE WEDDING (filter otomatis "Tidak Digunakan")
 *  - SESERAHAN, MAHAR (Target E10:E12 & Log Cicilan Baris 16+)
 *  - ADMINISTRASI, TAMU, VENDOR DIRECTORY, TIMELINE & RUNDOWN
 * ============================================================================
 */

const SPREADSHEET_ID = '1_VOUhsc_Rt6zlj8hHtsZaZpEmiGShchaJFqFIaeFUQY';
const PIN_COUPLE = '270627';    // Akses Penuh Mempelai (Farhan & Indira)
const PIN_COMMITTEE = '2027';   // Akses Mode Panitia & Keluarga (Anggaran Disembunyikan)

function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const pin = String(params.pin || PIN_COUPLE).trim();
    if (pin !== PIN_COUPLE && pin !== PIN_COMMITTEE) {
      return jsonResponse({ status: 'error', message: 'PIN Akses tidak valid.' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const data = readAllWeddingModules(ss);
    const role = (pin === PIN_COMMITTEE) ? 'committee' : 'couple';

    return jsonResponse({
      status: 'success',
      role: role,
      syncedAt: new Date().toISOString(),
      data: data
    });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err) });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const body = JSON.parse(e.postData.contents || '{}');
    const pin = String(body.pin || PIN_COUPLE).trim();
    if (pin !== PIN_COUPLE && pin !== PIN_COMMITTEE) {
      return jsonResponse({ status: 'error', message: 'PIN Akses tidak valid.' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const action = body.action || '';
    const item = body.item || {};

    // GENERIC ACTIONS FROM SheetApi: append, updateRow, deleteRow
    if (action === 'append') {
      const sheetName = body.sheet || body.sheetName;
      const ws = ss.getSheetByName(sheetName);
      if (!ws) throw new Error('Sheet ' + sheetName + ' tidak ditemukan.');
      const rowValues = body.rowValues || [];
      ws.appendRow(rowValues);
    }
    else if (action === 'updateRow') {
      const sheetName = body.sheet || body.sheetName;
      const ws = ss.getSheetByName(sheetName);
      if (!ws) throw new Error('Sheet ' + sheetName + ' tidak ditemukan.');
      const rowIndex = Number(body.rowIndex);
      const startCol = Number(body.startCol) || 1;
      const rowValues = body.rowValues || [];
      if (rowIndex && rowValues.length > 0) {
        ws.getRange(rowIndex, startCol, 1, rowValues.length).setValues([rowValues]);
      }
    }
    else if (action === 'deleteRow') {
      const sheetName = body.sheet || body.sheetName;
      const ws = ss.getSheetByName(sheetName);
      if (!ws) throw new Error('Sheet ' + sheetName + ' tidak ditemukan.');
      const rowIndex = Number(body.rowIndex);
      if (rowIndex) {
        ws.deleteRow(rowIndex);
      }
    }

    // 0. UPDATE MASTER META (Nama Mempelai D5/H5, Tanggal Akad D6, Venue H6, Target L6)
    else if (action === 'update_master_meta') {
      const ws = ss.getSheetByName('MASTER');
      if (item.cpp !== undefined) ws.getRange('D5').setValue(String(item.cpp).trim());
      if (item.cpw !== undefined) ws.getRange('H5').setValue(String(item.cpw).trim());
      if (item.weddingDate) ws.getRange('D6').setValue(new Date(item.weddingDate + 'T00:00:00'));
      if (item.venue !== undefined) ws.getRange('H6').setValue(String(item.venue).trim());
      if (item.targetReady !== undefined) ws.getRange('L6').setValue(String(item.targetReady).trim());
    }

    // 1. UPDATE / TAMBAH ITEM WEDDING TRACKER (Baris 8 s/d 32, Total di Baris 33)
    else if (action === 'update_wedding_tracker' || action === 'add_wedding_tracker') {
      const ws = ss.getSheetByName('WEDDING TRACKER');
      let r = Number(item.rowIndex || 0);
      // Jika tambah item baru (r === 0), cari baris kosong pertama antara baris 8 s/d 32
      if (!r || r < 8) {
        for (let checkR = 8; checkR <= 32; checkR++) {
          const val = ws.getRange(checkR, 4).getValue();
          if (!val || String(val).trim() === '') {
            r = checkR;
            break;
          }
        }
      }
      if (!r || r > 32) throw new Error('Slot baris pada WEDDING TRACKER sudah penuh.');
      const noUrut = r - 7;
      ws.getRange(r, 2).setValue(noUrut);
      if (item.kategori !== undefined) ws.getRange(r, 3).setValue(String(item.kategori).trim());
      if (item.item !== undefined) ws.getRange(r, 4).setValue(String(item.item).trim());
      if (item.pic !== undefined) ws.getRange(r, 5).setValue(String(item.pic).trim());
      if (item.target !== undefined) ws.getRange(r, 6).setValue(String(item.target).trim());
      if (item.estimasi !== undefined) ws.getRange(r, 7).setValue(Number(item.estimasi) || 0);
      if (item.realisasi !== undefined) ws.getRange(r, 8).setValue(Number(item.realisasi) || 0);
      if (item.status !== undefined) ws.getRange(r, 9).setValue(String(item.status).trim());
      if (item.catatan !== undefined) ws.getRange(r, 10).setValue(String(item.catatan).trim());
    }

    // 2. UPDATE PRE WEDDING (Baris 9 s/d 43 — Jangan sentuh baris Subtotal 18, 27, 36, 44, 46)
    else if (action === 'update_pre_wedding') {
      const ws = ss.getSheetByName('PRE WEDDING');
      const r = Number(item.rowIndex);
      const subtotalRows = [18, 27, 36, 44, 46];
      if (r < 9 || r > 43 || subtotalRows.indexOf(r) !== -1) {
        throw new Error('Tidak dapat mengubah baris Subtotal/Total pada PRE WEDDING.');
      }
      if (item.item !== undefined) ws.getRange(r, 4).setValue(String(item.item).trim());
      if (item.pic !== undefined) ws.getRange(r, 5).setValue(String(item.pic).trim());
      if (item.estimasi !== undefined) ws.getRange(r, 7).setValue(Number(item.estimasi) || 0);
      if (item.realisasi !== undefined) ws.getRange(r, 8).setValue(Number(item.realisasi) || 0);
      if (item.status !== undefined) ws.getRange(r, 9).setValue(String(item.status).trim());
      if (item.catatan !== undefined) ws.getRange(r, 10).setValue(String(item.catatan).trim());
    }

    // 3. UPDATE / TAMBAH ITEM SESERAHAN (Baris 8 s/d 73, slot kosong per kotak)
    else if (action === 'update_seserahan' || action === 'add_seserahan') {
      const ws = ss.getSheetByName('SESERAHAN');
      let r = Number(item.rowIndex || 0);
      const subtotalRows = [12, 21, 30, 42, 48, 56, 65, 74, 76];
      // Jika tambah item baru (r === 0), cari baris kosong sesuai kategori kotak
      if (!r || r < 8) {
        const catRanges = {
          'Alat Solat': [8, 11],
          'Skincare': [13, 20],
          'Toiletries': [22, 29],
          'Makeup': [31, 41],
          'Underwear': [43, 47],
          'Pakaian': [49, 55],
          'Accessories': [57, 64],
          'ETC': [66, 73]
        };
        const range = catRanges[item.kategori] || [66, 73];
        for (let checkR = range[0]; checkR <= range[1]; checkR++) {
          const val = ws.getRange(checkR, 4).getValue();
          if (!val || String(val).trim() === '') {
            r = checkR;
            break;
          }
        }
      }
      if (!r || r > 73 || subtotalRows.indexOf(r) !== -1) {
        throw new Error('Slot baris pada kategori kotak Seserahan ini sudah penuh.');
      }
      const noUrut = r;
      ws.getRange(r, 2).setValue(noUrut);
      if (item.kategori !== undefined) ws.getRange(r, 3).setValue(String(item.kategori).trim());
      if (item.item !== undefined) ws.getRange(r, 4).setValue(String(item.item).trim());
      if (item.brand !== undefined) ws.getRange(r, 5).setValue(String(item.brand).trim());
      if (item.harga !== undefined) ws.getRange(r, 6).setValue(Number(item.harga) || 0);
      if (item.link !== undefined) ws.getRange(r, 7).setValue(String(item.link).trim());
      if (item.status !== undefined) ws.getRange(r, 8).setValue(String(item.status || 'Pending').trim());
    }

    // 4A. TAMBAH / UPDATE LOG CICILAN MAHAR (Baris 16+ di MAHAR)
    else if (action === 'add_mahar_log' || action === 'update_mahar_log') {
      const ws = ss.getSheetByName('MAHAR');
      let targetRow = Number(item.rowIndex || 0);
      if (!targetRow || targetRow < 16) {
        targetRow = 16;
        for (let r = 16; r <= 30; r++) {
          const kompVal = ws.getRange(r, 4).getValue();
          if (!kompVal || String(kompVal).trim() === '') {
            targetRow = r;
            break;
          }
        }
      }
      const noUrut = targetRow - 15;
      ws.getRange(targetRow, 2).setValue(noUrut);
      if (item.tanggal) ws.getRange(targetRow, 3).setValue(item.tanggal);
      if (item.komponen) ws.getRange(targetRow, 4).setValue(String(item.komponen).trim());
      if (item.volume !== undefined) ws.getRange(targetRow, 5).setValue(Number(item.volume) || 1);
      if (item.satuan) ws.getRange(targetRow, 6).setValue(String(item.satuan).trim());
      if (item.hargaSatuan !== undefined) ws.getRange(targetRow, 7).setValue(Number(item.hargaSatuan) || 0);
      if (item.status) ws.getRange(targetRow, 8).setValue(String(item.status).trim());
      if (item.totalRealisasi !== undefined) ws.getRange(targetRow, 9).setValue(Number(item.totalRealisasi) || 0);
      if (item.sumberDana !== undefined) ws.getRange(targetRow, 10).setValue(String(item.sumberDana).trim());
      if (item.catatan !== undefined) ws.getRange(targetRow, 11).setValue(String(item.catatan).trim());
    }

    // 4B. UPDATE TARGET MAHAR (Baris 10-12 Kolom E Target Jumlah)
    else if (action === 'update_mahar_target') {
      const ws = ss.getSheetByName('MAHAR');
      const r = Number(item.rowIndex);
      if (r >= 10 && r <= 12 && item.targetJumlah !== undefined) {
        const qty = Number(item.targetJumlah) || 1;
        ws.getRange(r, 5).setValue(qty);
        if (r === 10) {
          const lembar = Math.round(qty * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          ws.getRange(r, 4).setValue(qty + ' Lot Saham Dividen (' + lembar + ' Lembar)');
        } else if (r === 11) {
          ws.getRange(r, 4).setValue('Akumulasi ' + qty + ' Gram Emas Hartadinata / Logam Mulia');
          ws.getRange(r, 6).setValue('Gram');
        }
      }
    }

    // 5. UPDATE CHECKLIST ADMINISTRASI KUA (Baris 8 s/d 33)
    else if (action === 'update_administrasi') {
      const ws = ss.getSheetByName('ADMINISTRASI');
      const r = Number(item.rowIndex);
      if (r < 8 || r > 33) throw new Error('Baris ADMINISTRASI tidak valid.');
      if (item.cppCheck !== undefined && item.cppCheck !== 'NA') {
        ws.getRange(r, 5).setValue(Boolean(item.cppCheck));
      }
      if (item.cpwCheck !== undefined && item.cpwCheck !== 'NA') {
        ws.getRange(r, 6).setValue(Boolean(item.cpwCheck));
      }
      if (item.realisasi !== undefined) {
        ws.getRange(r, 9).setValue(Number(item.realisasi) || 0);
      }
      if (item.catatan !== undefined) {
        ws.getRange(r, 11).setValue(String(item.catatan).trim());
      }
    }

    // 6A. UPDATE ALOKASI TARGET KUOTA TAMU (TAMU!G4 untuk CPP, TAMU!K4 untuk CPW)
    else if (action === 'update_guest_quota') {
      const ws = ss.getSheetByName('TAMU');
      if (item.targetPaxCpp !== undefined) {
        ws.getRange('G4').setValue(Number(item.targetPaxCpp) || 200);
      }
      if (item.targetPaxCpw !== undefined) {
        ws.getRange('K4').setValue(Number(item.targetPaxCpw) || 200);
      }
    }

    // 6B. UPDATE / TAMBAH TAMU & RSVP (Keluarga Inti Baris 10-19, Tamu Umum Baris 23-172)
    else if (action === 'update_tamu') {
      const ws = ss.getSheetByName('TAMU');
      const side = item.side === 'CPP' ? 'CPP' : 'CPW';
      let r = Number(item.rowIndex || 0);
      const startCol = side === 'CPP' ? 3 : 10;

      if (!r || r < 10) {
        const nameCol = side === 'CPP' ? 4 : 11;
        const names = ws.getRange(23, nameCol, 150, 1).getValues();
        for (let i = 0; i < names.length; i++) {
          if (!String(names[i][0] || '').trim()) {
            r = 23 + i;
            break;
          }
        }
      }
      if (!r) throw new Error('Slot kuota tamu untuk pihak ' + side + ' sudah penuh.');

      ws.getRange(r, startCol, 1, 5).setValues([[
        String(item.kategori || 'Keluarga Besar').trim(),
        String(item.nama || '').trim(),
        Number(item.pax) || 1,
        String(item.statusUndangan || 'Draft').trim(),
        String(item.rsvp || 'Hadir').trim()
      ]]);
    }

    // 7. UPDATE VENDOR DIRECTORY (Baris 17 s/d 30)
    else if (action === 'update_vendor') {
      const ws = ss.getSheetByName('VENDOR DIRECTORY');
      const r = Number(item.rowIndex);
      if (r < 17 || r > 30) throw new Error('Baris VENDOR DIRECTORY di luar rentang (17-30).');
      if (item.nama !== undefined) ws.getRange(r, 4).setValue(String(item.nama).trim());
      if (item.kontak !== undefined) ws.getRange(r, 5).setValue(String(item.kontak).trim());
      if (item.nilaiKontrak !== undefined) ws.getRange(r, 6).setValue(Number(item.nilaiKontrak) || 0);
      if (item.sisaPembayaran !== undefined) ws.getRange(r, 7).setValue(Number(item.sisaPembayaran) || 0);
      if (item.statusKerjasama !== undefined) ws.getRange(r, 8).setValue(String(item.statusKerjasama).trim());
      if (item.statusPembayaran !== undefined) ws.getRange(r, 9).setValue(String(item.statusPembayaran).trim());
      if (item.layanan !== undefined) ws.getRange(r, 10).setValue(String(item.layanan).trim());
      if (item.catatan !== undefined) ws.getRange(r, 11).setValue(String(item.catatan).trim());
    }

    // 8. UPDATE DETAIL & STATUS RUNDOWN / TIMELINE (Timeline 8-22, Rundown 31-50)
    else if (action === 'update_rundown' || action === 'update_timeline') {
      const ws = ss.getSheetByName('TIMELINE & RUNDOWN');
      const r = Number(item.rowIndex);
      if ((item.tableType === 'timeline' || action === 'update_timeline') && r >= 8 && r <= 22) {
        if (item.fase !== undefined) ws.getRange(r, 3).setValue(String(item.fase).trim());
        if (item.kategori !== undefined) ws.getRange(r, 4).setValue(String(item.kategori).trim());
        if (item.agenda !== undefined) ws.getRange(r, 5).setValue(String(item.agenda).trim());
        if (item.rincian !== undefined) ws.getRange(r, 6).setValue(String(item.rincian).trim());
        if (item.target !== undefined) ws.getRange(r, 7).setValue(String(item.target).trim());
        if (item.pic !== undefined) ws.getRange(r, 8).setValue(String(item.pic).trim());
        if (item.status !== undefined) ws.getRange(r, 9).setValue(String(item.status).trim());
      } else if (r >= 31 && r <= 50) {
        if (item.waktu !== undefined) ws.getRange(r, 3).setValue(String(item.waktu).trim());
        if (item.durasi !== undefined) ws.getRange(r, 4).setValue(String(item.durasi).trim());
        if (item.sesi !== undefined) ws.getRange(r, 5).setValue(String(item.sesi).trim());
        if (item.deskripsi !== undefined) ws.getRange(r, 6).setValue(String(item.deskripsi).trim());
        if (item.lokasi !== undefined) ws.getRange(r, 7).setValue(String(item.lokasi).trim());
        if (item.pic !== undefined) ws.getRange(r, 8).setValue(String(item.pic).trim());
        if (item.vendor !== undefined) ws.getRange(r, 9).setValue(String(item.vendor).trim());
        if (item.status !== undefined) ws.getRange(r, 10).setValue(String(item.status).trim());
        if (item.catatan !== undefined) ws.getRange(r, 11).setValue(String(item.catatan).trim());
      }
    }

    SpreadsheetApp.flush();
    const updatedData = readAllWeddingModules(ss);
    return jsonResponse({
      status: 'success',
      syncedAt: new Date().toISOString(),
      data: updatedData
    });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function readAllWeddingModules(ss) {
  const fmtDate = function(val) {
    if (!val) return '';
    if (Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val)) {
      return Utilities.formatDate(val, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd');
    }
    return String(val).trim();
  };

  // 0. Baca Profil & Tanggal Pernikahan dari MASTER serta Kuota Tamu dari TAMU (G4 & K4)
  const wsMaster = ss.getSheetByName('MASTER');
  const wsTamuMeta = ss.getSheetByName('TAMU');
  let meta = {
    spreadsheetId: SPREADSHEET_ID,
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit',
    cpp: 'FARHAN RAFIQI',
    cpw: 'INDIRA GUSTI',
    weddingDate: '2027-06-27',
    venue: 'Venue Intimate',
    targetReady: 'April 2027 (H-2 Bulan)',
    targetPaxCpp: 200,
    targetPaxCpw: 200,
    targetPaxTotal: 400
  };
  if (wsMaster) {
    const mVals = wsMaster.getRange(5, 4, 2, 9).getValues(); // D5:L6
    if (mVals[0][0]) meta.cpp = String(mVals[0][0]).trim();
    if (mVals[0][4]) meta.cpw = String(mVals[0][4]).trim();
    if (mVals[1][0]) meta.weddingDate = fmtDate(mVals[1][0]) || '2027-06-27';
    if (mVals[1][4]) meta.venue = String(mVals[1][4]).trim();
    if (mVals[1][8]) meta.targetReady = String(mVals[1][8]).trim();
  }
  if (wsTamuMeta) {
    const cppTargetVal = Number(wsTamuMeta.getRange('G4').getValue()) || 200;
    const cpwTargetVal = Number(wsTamuMeta.getRange('K4').getValue()) || 200;
    meta.targetPaxCpp = cppTargetVal;
    meta.targetPaxCpw = cpwTargetVal;
    meta.targetPaxTotal = cppTargetVal + cpwTargetVal;
  }

  // 1. WEDDING TRACKER
  const wsWT = ss.getSheetByName('WEDDING TRACKER');
  const wtVals = wsWT.getRange(8, 2, 25, 9).getValues();
  let lastCatWT = '';
  const weddingTracker = [];
  wtVals.forEach(function(row, idx) {
    const r = 8 + idx;
    if (row[1]) lastCatWT = String(row[1]).trim();
    if (!row[2]) return;
    weddingTracker.push({
      id: 'WT-R' + r,
      sheet: 'WEDDING TRACKER',
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      kategori: lastCatWT || 'Umum',
      item: String(row[2]).trim(),
      pic: String(row[3] || '').trim(),
      target: fmtDate(row[4]),
      estimasi: Number(row[5]) || 0,
      realisasi: Number(row[6]) || 0,
      status: String(row[7] || 'Belum Dimulai').trim(),
      catatan: String(row[8] || '').trim()
    });
  });

  // 2. PRE WEDDING
  const wsPW = ss.getSheetByName('PRE WEDDING');
  const pwVals = wsPW.getRange(9, 2, 35, 9).getValues();
  let lastCatPW = '';
  const preWedding = [];
  pwVals.forEach(function(row, idx) {
    const r = 9 + idx;
    if (row[1]) lastCatPW = String(row[1]).trim();
    const itemName = String(row[2] || '').trim();
    if (!itemName || itemName.indexOf('Subtotal') === 0 || itemName.indexOf('TOTAL') === 0) return;
    preWedding.push({
      id: 'PW-R' + r,
      sheet: 'PRE WEDDING',
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      kategori: lastCatPW || 'Pra-Nikah',
      item: itemName,
      pic: String(row[3] || '').trim(),
      target: fmtDate(row[4]),
      estimasi: Number(row[5]) || 0,
      realisasi: Number(row[6]) || 0,
      status: String(row[7] || 'Belum Dimulai').trim(),
      catatan: String(row[8] || '').trim()
    });
  });

  // 3. SESERAHAN
  const wsSS = ss.getSheetByName('SESERAHAN');
  const ssVals = wsSS.getRange(8, 2, 66, 7).getValues();
  let lastCatSS = '';
  const seserahan = [];
  ssVals.forEach(function(row, idx) {
    const r = 8 + idx;
    if (row[1]) lastCatSS = String(row[1]).trim();
    const itemName = String(row[2] || '').trim();
    if (!itemName || itemName.indexOf('Subtotal') === 0 || itemName.indexOf('TOTAL') === 0) return;
    seserahan.push({
      id: 'SS-R' + r,
      sheet: 'SESERAHAN',
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      kategori: lastCatSS || 'Seserahan',
      item: itemName,
      brand: String(row[3] || '').trim(),
      harga: Number(row[4]) || 0,
      link: String(row[5] || '').trim(),
      status: String(row[6] || 'Pending').trim()
    });
  });

  // 4. MAHAR (Targets 10-12 & Logs 16-30)
  const wsMH = ss.getSheetByName('MAHAR');
  const mhTargetVals = wsMH.getRange(10, 2, 3, 10).getValues();
  const maharTargets = mhTargetVals.map(function(row, idx) {
    const r = 10 + idx;
    const instrumen = String(row[1] || '').trim();
    let targetJumlah = Number(row[3]) || 0;
    let spesifikasi = String(row[2] || '').trim();
    let satuan = String(row[4] || '').trim();
    if (instrumen.indexOf('Saham BSSR') !== -1 && targetJumlah > 0) {
      const lembar = Math.round(targetJumlah * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      spesifikasi = targetJumlah + ' Lot Saham Dividen (' + lembar + ' Lembar)';
    } else if (instrumen.indexOf('Logam Mulia') !== -1 || instrumen.indexOf('Emas') !== -1) {
      if (targetJumlah === 3 || !targetJumlah) targetJumlah = 6;
      satuan = 'Gram';
      spesifikasi = 'Akumulasi ' + targetJumlah + ' Gram Emas Hartadinata / Logam Mulia';
    }
    return {
      id: 'MT-R' + r,
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      instrumen: instrumen,
      spesifikasi: spesifikasi,
      targetJumlah: targetJumlah,
      satuan: satuan,
      hargaSatuan: Math.round(Number(row[5]) || 0),
      totalEstimasi: Math.round(Number(row[6]) || 0),
      realisasi: Math.round(Number(row[7]) || 0),
      status: String(row[8] || '').trim(),
      lokasi: String(row[9] || '').trim()
    };
  });

  const mhLogVals = wsMH.getRange(16, 2, 15, 10).getValues();
  const maharLogs = [];
  mhLogVals.forEach(function(row, idx) {
    const r = 16 + idx;
    if (r === 29 || r === 30) return;
    if (!row[2]) return;
    if (/target\s*kuantitas/i.test(String(row[2])) || /target\s*kuantitas/i.test(String(row[1])) || /target\s*kuantitas/i.test(String(row[9]))) return;
    const komp = String(row[2] || '').trim();
    let satuan = String(row[4] || 'Lot').trim();
    if (!satuan || satuan.toLowerCase() === 'keping') {
      if (/emas|logam\s*mulia/i.test(komp)) satuan = 'Gram';
      else if (/saham|bssr/i.test(komp)) satuan = 'Lot';
      else satuan = 'Paket';
    }
    maharLogs.push({
      id: 'ML-R' + r,
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      tanggal: fmtDate(row[1]),
      komponen: komp,
      volume: Number(row[3]) || 0,
      satuan: satuan,
      hargaSatuan: Math.round(Number(row[5]) || 0),
      status: String(row[6] || 'Selesai').trim(),
      totalRealisasi: Math.round(Number(row[7]) || 0),
      sumberDana: String(row[8] || '').trim(),
      catatan: String(row[9] || '').trim()
    });
  });

  // 5. ADMINISTRASI KUA
  const wsAD = ss.getSheetByName('ADMINISTRASI');
  const adVals = wsAD.getRange(8, 2, 26, 10).getValues();
  const administrasi = [];
  adVals.forEach(function(row, idx) {
    const r = 8 + idx;
    if (!row[2]) return;
    const cppRaw = row[3];
    const cpwRaw = row[4];
    administrasi.push({
      id: 'AD-R' + r,
      sheet: 'ADMINISTRASI',
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      instansi: String(row[1] || '').trim(),
      dokumen: String(row[2] || '').trim(),
      cppCheck: String(cppRaw).trim() === '—' ? 'NA' : Boolean(cppRaw === true || String(cppRaw).toUpperCase() === 'TRUE'),
      cpwCheck: String(cpwRaw).trim() === '—' ? 'NA' : Boolean(cpwRaw === true || String(cpwRaw).toUpperCase() === 'TRUE'),
      target: fmtDate(row[5]),
      estimasi: Number(row[6]) || 0,
      realisasi: Number(row[7]) || 0,
      catatan: String(row[9] || '').trim()
    });
  });

  // 6. VENDOR DIRECTORY
  const wsVD = ss.getSheetByName('VENDOR DIRECTORY');
  const vdVals = wsVD.getRange(17, 2, 14, 10).getValues();
  const vendors = [];
  vdVals.forEach(function(row, idx) {
    const r = 17 + idx;
    if (!row[2]) return;
    vendors.push({
      id: 'VD-R' + r,
      sheet: 'VENDOR DIRECTORY',
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      kategori: String(row[1] || '').trim(),
      nama: String(row[2] || '').trim(),
      kontak: String(row[3] || '').trim(),
      nilaiKontrak: Number(row[4]) || 0,
      sisaPembayaran: Number(row[5]) || 0,
      statusKerjasama: String(row[6] || 'Riset').trim(),
      statusPembayaran: String(row[7] || 'Belum Bayar').trim(),
      layanan: String(row[8] || '').trim(),
      catatan: String(row[9] || '').trim()
    });
  });

  // 7. TIMELINE & RUNDOWN
  const wsTR = ss.getSheetByName('TIMELINE & RUNDOWN');
  const tlVals = wsTR.getRange(8, 2, 15, 8).getValues();
  const timeline = [];
  tlVals.forEach(function(row, idx) {
    const r = 8 + idx;
    if (!row[3]) return;
    timeline.push({
      id: 'TL-R' + r,
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      fase: String(row[1] || '').trim(),
      kategori: String(row[2] || '').trim(),
      agenda: String(row[3] || '').trim(),
      rincian: String(row[4] || '').trim(),
      target: fmtDate(row[5]),
      pic: String(row[6] || '').trim(),
      status: String(row[7] || 'Belum Mulai').trim()
    });
  });

  const rdVals = wsTR.getRange(31, 2, 20, 10).getValues();
  const rundown = [];
  rdVals.forEach(function(row, idx) {
    const r = 31 + idx;
    if (!row[3]) return;
    rundown.push({
      id: 'RD-R' + r,
      rowIndex: r,
      no: Number(row[0]) || (idx + 1),
      waktu: String(row[1] || '').trim(),
      durasi: String(row[2] || '').trim(),
      sesi: String(row[3] || '').trim(),
      deskripsi: String(row[4] || '').trim(),
      lokasi: String(row[5] || '').trim(),
      pic: String(row[6] || '').trim(),
      vendor: String(row[7] || '').trim(),
      status: String(row[8] || 'Siap').trim(),
      catatan: String(row[9] || '').trim()
    });
  });

  // 8. TAMU (Keluarga Inti 10-19, Tamu Umum 23-172)
  const wsTM = ss.getSheetByName('TAMU');
  const famVals = wsTM.getRange(10, 2, 10, 13).getValues();
  const genVals = wsTM.getRange(23, 2, 150, 13).getValues();
  const tamu = [];

  famVals.forEach(function(row, idx) {
    const r = 10 + idx;
    if (String(row[2] || '').trim()) {
      tamu.push({
        id: 'TM-CPP-FAM-R' + r,
        rowIndex: r,
        side: 'CPP',
        kelompok: 'Keluarga Inti',
        no: Number(row[0]) || (idx + 1),
        kategori: String(row[1] || 'Keluarga Inti').trim(),
        nama: String(row[2]).trim(),
        pax: Number(row[3]) || 1,
        statusUndangan: String(row[4] || 'Draft').trim(),
        rsvp: String(row[5] || 'Hadir').trim()
      });
    }
    if (String(row[9] || '').trim()) {
      tamu.push({
        id: 'TM-CPW-FAM-R' + r,
        rowIndex: r,
        side: 'CPW',
        kelompok: 'Keluarga Inti',
        no: Number(row[7]) || (idx + 1),
        kategori: String(row[8] || 'Keluarga Inti').trim(),
        nama: String(row[9]).trim(),
        pax: Number(row[10]) || 1,
        statusUndangan: String(row[11] || 'Draft').trim(),
        rsvp: String(row[12] || 'Hadir').trim()
      });
    }
  });

  genVals.forEach(function(row, idx) {
    const r = 23 + idx;
    if (String(row[2] || '').trim()) {
      tamu.push({
        id: 'TM-CPP-GEN-R' + r,
        rowIndex: r,
        side: 'CPP',
        kelompok: 'Tamu Umum',
        no: Number(row[0]) || (idx + 1),
        kategori: String(row[1] || 'Umum').trim(),
        nama: String(row[2]).trim(),
        pax: Number(row[3]) || 1,
        statusUndangan: String(row[4] || 'Draft').trim(),
        rsvp: String(row[5] || 'Belum Konfirmasi').trim()
      });
    }
    if (String(row[9] || '').trim()) {
      tamu.push({
        id: 'TM-CPW-GEN-R' + r,
        rowIndex: r,
        side: 'CPW',
        kelompok: 'Tamu Umum',
        no: Number(row[7]) || (idx + 1),
        kategori: String(row[8] || 'Keluarga Besar').trim(),
        nama: String(row[9]).trim(),
        pax: Number(row[10]) || 1,
        statusUndangan: String(row[11] || 'Draft').trim(),
        rsvp: String(row[12] || 'Belum Konfirmasi').trim()
      });
    }
  });

  return {
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

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
