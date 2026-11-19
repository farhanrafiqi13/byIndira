# Panduan Update & Sinkronisasi 2 Arah — Farhan & Indira Wedding PWA (v3)

## Mengapa Perubahan di Spreadsheet Sebelumnya Belum Tampil di Aplikasi?
Ada 2 hal yang perlu diperbarui agar perubahan di sheet `MASTER` (Tanggal Pernikahan), `MAHAR` (Target 27 Lot Saham), dan `PRE WEDDING` (16 Item Aktif) langsung tersinkronisasi otomatis:

1. **Memperbarui Kode `Code.gs` di Google Apps Script (Wajib dilakukan 1x jika kode backend berubah)**:
   - Buka Google Sheets **[Farhan Indira by Indira](https://docs.google.com/spreadsheets/d/1_VOUhsc_Rt6zlj8hHtsZaZpEmiGShchaJFqFIaeFUQY/edit)** di laptop.
   - Klik menu **Extensions** > **Apps Script**.
   - Ganti seluruh isi kode lama dengan isi file `Code.gs` terbaru dari folder ini, lalu tekan **Ctrl+S** (Simpan).
   - Klik **Deploy** > **Manage deployments** > klik ikon **Pensil (Edit)** pada deployment aktif > pada bagian *Version*, pilih **New version** > klik **Deploy**. *(URL Web App kamu tidak akan berubah).*

2. **Deployment Tunggal via GitHub Pages**:
   - Repository: **[https://github.com/farhanrafiqi13/byIndira](https://github.com/farhanrafiqi13/byIndira)**
   - URL Aplikasi Live: **[https://farhanrafiqi13.github.io/byIndira/](https://farhanrafiqi13.github.io/byIndira/)**
   - Setiap ada pembaruan kode, jalankan alur rilis:
     ```bash
     python build.py
     git add .
     git commit -m "feat/fix: deskripsi pembaruan"
     git push origin main
     ```
   - GitHub Pages akan otomatis memperbarui situs secara langsung tanpa perlu upload manual.

Setelah kedua langkah di atas selesai, setiap kali kamu mengubah Tanggal Akad di `MASTER!D6`, Target Lot Saham di `MAHAR!E10`, atau Status `Tidak Digunakan` di `PRE WEDDING`, aplikasi akan **otomatis menarik data terbaru** begitu dibuka di HP!
