(function() {
  'use strict';

  // Gunakan STORAGE_KEY_DATA v3 agar cache lama (26 Juni / 26 Lot / 18 Prewed) otomatis digantikan data terbaru
  const STORAGE_KEY_DATA = 'farhan_indira_wedding_data_v3';
  const STORAGE_KEY_CFG = 'farhan_indira_wedding_cfg_v1';
  const STORAGE_KEY_CHK = 'farhan_indira_wedding_chk_v1';
  const STORAGE_KEY_GUEST_EXTRAS = 'farhan_indira_guest_extras_v1';

  function getGasEndpoint() {
    if (typeof window !== 'undefined' && window.WEDDING_GAS_ENDPOINT) {
      return window.WEDDING_GAS_ENDPOINT;
    }
    if (typeof SheetApi !== 'undefined' && SheetApi.DEFAULT_ENDPOINT) {
      return SheetApi.DEFAULT_ENDPOINT;
    }
    return 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec';
  }

  const DEFAULT_DATA = {"meta": {"spreadsheetId": "1_VOUhsc_Rt6zlj8hHtsZaZpEmiGShchaJFqFIaeFUQY", "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1_VOUhsc_Rt6zlj8hHtsZaZpEmiGShchaJFqFIaeFUQY/edit", "cpp": "FARHAN RAFIQI", "cpw": "INDIRA GUSTI", "weddingDate": "2027-06-27", "venue": "Venue Intimate", "targetReady": "April 2027 (H-2 Bulan)", "targetPaxCpp": 200, "targetPaxCpw": 200, "targetPaxTotal": 400}, "weddingTracker": [{"id": "WT-R8", "sheet": "WEDDING TRACKER", "rowIndex": 8, "no": 1, "kategori": "Venue & Tempat Acara", "item": "Booking Venue Intimate (Akad & Resepsi)", "pic": "CPP & CPW Bersama", "target": "2027-02-10", "estimasi": 20000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Venue intimate kapasitas XXX pax, include fasilitas listrik & ruang rias"}, {"id": "WT-R9", "sheet": "WEDDING TRACKER", "rowIndex": 9, "no": 2, "kategori": "Katering (Prasmanan & Stall)", "item": "Paket Katering Intimate XXX Pax (Buffet & Stalls)", "pic": "CPP & CPW Bersama", "target": "2027-02-15", "estimasi": 21000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Buffet XXX porsi + stalls intimate, include bonus coffee break akad"}, {"id": "WT-R10", "sheet": "WEDDING TRACKER", "rowIndex": 10, "no": 3, "kategori": "Busana & Rias Pengantin (MUA)", "item": "Sewa Baju Pengantin & MUA Akad-Resepsi", "pic": "CPP & CPW Bersama", "target": "2027-02-22", "estimasi": 7500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Attire pengantin elegan minimalis & MUA intimate akad-resepsi"}, {"id": "WT-R11", "sheet": "WEDDING TRACKER", "rowIndex": 11, "no": 4, "kategori": "Busana & Rias Pengantin (MUA)", "item": "Seragam Keluarga & Bridesmaid", "pic": "CPW (Pengantin Wanita)", "target": "2027-03-01", "estimasi": 2000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Bahan kain seragam keluarga inti & bridesmaid"}, {"id": "WT-R12", "sheet": "WEDDING TRACKER", "rowIndex": 12, "no": 5, "kategori": "Fotografi & Videografi", "item": "Foto & Video Sinematik (Hari H)", "pic": "CPP & CPW Bersama", "target": "2027-03-08", "estimasi": 6000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Terpisah dengan foto PRE WEDDING"}, {"id": "WT-R13", "sheet": "WEDDING TRACKER", "rowIndex": 13, "no": 6, "kategori": "Dekorasi & Florist", "item": "Dekorasi Intimate, Floral Arch & Photo Booth", "pic": "CPP & CPW Bersama", "target": "2027-03-15", "estimasi": 7500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Konsep warm intimate, backdrop pelaminan minimalis & photo booth"}, {"id": "WT-R14", "sheet": "WEDDING TRACKER", "rowIndex": 14, "no": 7, "kategori": "Undangan & Souvenir", "item": "Undangan Digital Eksklusif & Cetak VIP", "pic": "CPP (Pengantin Pria)", "target": "2027-05-10", "estimasi": 500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Web invitation RSVP digital & cetak fisik kartu terbatas"}, {"id": "WT-R15", "sheet": "WEDDING TRACKER", "rowIndex": 15, "no": 8, "kategori": "Undangan & Souvenir", "item": "Pengadaan Souvenir Eksklusif XXX Pcs", "pic": "CPP & CPW Bersama", "target": "2027-05-17", "estimasi": 1500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "XXX pcs souvenir custom aroma pouch / lilin aromaterapi"}, {"id": "WT-R16", "sheet": "WEDDING TRACKER", "rowIndex": 16, "no": 9, "kategori": "Hiburan, MC & Sound System", "item": "Akustik Band & Sound System Intimate", "pic": "CPP (Pengantin Pria)", "target": "2027-03-22", "estimasi": 2400000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Live akustik trio intimate; MC dipandu tim WO"}, {"id": "WT-R17", "sheet": "WEDDING TRACKER", "rowIndex": 17, "no": 10, "kategori": "Wedding Organizer (WO)", "item": "Tim Koordinator Lapangan Intimate (Hari H)", "pic": "CPP & CPW Bersama", "target": "2027-03-29", "estimasi": 5000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tim WO 5-6 personil intimate, koordinasi vendor & rundown"}, {"id": "WT-R18", "sheet": "WEDDING TRACKER", "rowIndex": 18, "no": 11, "kategori": "Hantaran Seserahan & Mahar", "item": "Desain & Pembuatan Sepasang Cincin", "pic": "CPP (Pengantin Pria)", "target": "2027-04-05", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tercantum pada Sheet HANTARAN dan MAHAR"}, {"id": "WT-R19", "sheet": "WEDDING TRACKER", "rowIndex": 19, "no": 12, "kategori": "Dana Cadangan & Tak Terduga", "item": "Sewa Mobil Pengantin & Akomodasi", "pic": "CPP (Pengantin Pria)", "target": "2027-04-10", "estimasi": 1000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Operasional transportasi logistik & kendaraan keluarga"}, {"id": "WT-R20", "sheet": "WEDDING TRACKER", "rowIndex": 20, "no": 13, "kategori": "Wedding Organizer (WO)", "item": "Finalisasi Susunan Acara Intimate & Doa", "pic": "CPP & CPW Bersama", "target": "2027-04-15", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Include dalam layanan Wedding Organizer (rundown & timekeeper)"}, {"id": "WT-R21", "sheet": "WEDDING TRACKER", "rowIndex": 21, "no": 14, "kategori": "Katering (Prasmanan & Stall)", "item": "Snack Box Premium Akad & Panitia", "pic": "CPP & CPW Bersama", "target": "2027-04-20", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Include sebagai complimentary bonus paket katering XXX pax"}, {"id": "WT-R22", "sheet": "WEDDING TRACKER", "rowIndex": 22, "no": 15, "kategori": "Hiburan, MC & Sound System", "item": "Sound System & Backup Listrik Venue", "pic": "CPP & CPW Bersama", "target": "2027-04-24", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Include dalam fasilitas sewa gedung venue intimate"}, {"id": "WT-R23", "sheet": "WEDDING TRACKER", "rowIndex": 23, "no": 16, "kategori": "Administrasi Kesehatan", "item": "Cek Lab Pranikah & Perawatan Calon Pengantin", "pic": "CPP (Pengantin Pria)", "target": "2027-03-31", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tercantum pada Sheet ADMINISTRASI"}, {"id": "WT-R24", "sheet": "WEDDING TRACKER", "rowIndex": 24, "no": 17, "kategori": "Administrasi KUA & Berkas Legal", "item": "Pendaftaran Berkas Nikah & Bimbingan KUA", "pic": "CPP & CPW Bersama", "target": "2027-04-28", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tercantum pada Sheet ADMINISTRASI"}, {"id": "WT-R25", "sheet": "WEDDING TRACKER", "rowIndex": 25, "no": 18, "kategori": "Administrasi KUA & Berkas Legal", "item": "Pendaftaran Berkas Nikah & Bimbingan KUA", "pic": "CPP & CPW Bersama", "target": "2027-04-30", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tercantum pada Sheet ADMINISTRASI"}], "preWedding": [{"id": "PW-R9", "sheet": "PRE WEDDING", "rowIndex": 9, "no": 1, "kategori": "Lamaran", "item": "Sewa Venue / Restoran Lamaran", "pic": "CPP & CPW Bersama", "target": "Q1 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R10", "sheet": "PRE WEDDING", "rowIndex": 10, "no": 2, "kategori": "Lamaran", "item": "Dekorasi Backdrop & Bunga Lamaran", "pic": "CPW (Pengantin Wanita)", "target": "Q1 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R11", "sheet": "PRE WEDDING", "rowIndex": 11, "no": 3, "kategori": "Lamaran", "item": "MUA & Hairdo / Hijabdo Lamaran", "pic": "CPW (Pengantin Wanita)", "target": "Q1 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R12", "sheet": "PRE WEDDING", "rowIndex": 12, "no": 4, "kategori": "Lamaran", "item": "Busana Lamaran CPP & CPW", "pic": "CPW (Pengantin Wanita)", "target": "Q4 2026", "estimasi": 1500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Beli jadi"}, {"id": "PW-R13", "sheet": "PRE WEDDING", "rowIndex": 13, "no": 5, "kategori": "Lamaran", "item": "Cincin Tunangan / Tukar Cincin", "pic": "CPP (Pengantin Pria)", "target": "Q1 2027", "estimasi": 5000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Sepasang cincin tunangan emas/palladium"}, {"id": "PW-R14", "sheet": "PRE WEDDING", "rowIndex": 14, "no": 6, "kategori": "Lamaran", "item": "Hantaran Pembuka & Buah Tangan", "pic": "CPP (Pengantin Pria)", "target": "Q1 2027", "estimasi": 1000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Parsel buah premium, kue basah, lapis legit"}, {"id": "PW-R15", "sheet": "PRE WEDDING", "rowIndex": 15, "no": 7, "kategori": "Lamaran", "item": "Katering / Konsumsi", "pic": "CPW (Pengantin Wanita)", "target": "Q1 2027", "estimasi": 1500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Makan bersama"}, {"id": "PW-R16", "sheet": "PRE WEDDING", "rowIndex": 16, "no": 8, "kategori": "Lamaran", "item": "Dokumentasi Foto & Video Lamaran", "pic": "CPP & CPW Bersama", "target": "Q1 2027", "estimasi": 1000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": ""}, {"id": "PW-R17", "sheet": "PRE WEDDING", "rowIndex": 17, "no": 9, "kategori": "Lamaran", "item": "MC / Pemandu Acara Lamaran", "pic": "CPP & CPW Bersama", "target": "Q1 2027", "estimasi": 500000, "realisasi": 0, "status": "Deal / Booking", "catatan": "Teman Indira @alfina_mc"}, {"id": "PW-R20", "sheet": "PRE WEDDING", "rowIndex": 20, "no": 1, "kategori": "Foto Pre-Wedding", "item": "Paket Fotografer & Videografer Pre-Wed", "pic": "CPP & CPW Bersama", "target": "Q4 2026", "estimasi": 1940000, "realisasi": 300000, "status": "Deal / Booking", "catatan": "All in package @mulakisah"}, {"id": "PW-R21", "sheet": "PRE WEDDING", "rowIndex": 21, "no": 2, "kategori": "Foto Pre-Wedding", "item": "Sewa Studio / Izin Lokasi Outdoor", "pic": "CPP & CPW Bersama", "target": "Q4 2026", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "3 looks :"}, {"id": "PW-R22", "sheet": "PRE WEDDING", "rowIndex": 22, "no": 3, "kategori": "Foto Pre-Wedding", "item": "Sewa / Beli Wardrobe Sesi Foto", "pic": "CPP & CPW Bersama", "target": "Q4 2026", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "- Adat Belitung by mulakisah"}, {"id": "PW-R23", "sheet": "PRE WEDDING", "rowIndex": 23, "no": 4, "kategori": "Foto Pre-Wedding", "item": "MUA & Stylist Pre-Wedding", "pic": "CPW (Pengantin Wanita)", "target": "Q4 2026", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "- Bebas (own)"}, {"id": "PW-R24", "sheet": "PRE WEDDING", "rowIndex": 24, "no": 5, "kategori": "Foto Pre-Wedding", "item": "Properti Foto (Bouquet & Aksesoris)", "pic": "CPW (Pengantin Wanita)", "target": "Q4 2026", "estimasi": 0, "realisasi": 0, "status": "Belum Dimulai", "catatan": "- Latar biru (baju putih)"}, {"id": "PW-R25", "sheet": "PRE WEDDING", "rowIndex": 25, "no": 6, "kategori": "Foto Pre-Wedding", "item": "Cetak Foto Frame Galeri & Stand Kanvas", "pic": "CPP & CPW Bersama", "target": "Q3 2027", "estimasi": 1200000, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Frame minimalis untuk display meja penerima tamu"}, {"id": "PW-R26", "sheet": "PRE WEDDING", "rowIndex": 26, "no": 7, "kategori": "Foto Pre-Wedding", "item": "Pembuatan Video Teaser / Undangan Digital", "pic": "CPP (Pengantin Pria)", "target": "Q3 2027", "estimasi": 800000, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Teaser video 60 detik untuk reel & website"}, {"id": "PW-R29", "sheet": "PRE WEDDING", "rowIndex": 29, "no": 1, "kategori": "Pengajian Pranikah", "item": "Buku Doa / Souvenir Yasin & Dzikir", "pic": "CPW (Pengantin Wanita)", "target": "Q3 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R30", "sheet": "PRE WEDDING", "rowIndex": 30, "no": 2, "kategori": "Pengajian Pranikah", "item": "Ustadz / Penceramah Doa Bersama", "pic": "CPP (Pengantin Pria)", "target": "Q3 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R31", "sheet": "PRE WEDDING", "rowIndex": 31, "no": 3, "kategori": "Pengajian Pranikah", "item": "Busana Seragam Pengajian Keluarga", "pic": "CPW (Pengantin Wanita)", "target": "Q3 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R32", "sheet": "PRE WEDDING", "rowIndex": 32, "no": 4, "kategori": "Pengajian Pranikah", "item": "MUA Pengajian & Sungkem Pranikah", "pic": "CPW (Pengantin Wanita)", "target": "Q3 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R33", "sheet": "PRE WEDDING", "rowIndex": 33, "no": 5, "kategori": "Pengajian Pranikah", "item": "Katering / Konsumsi Tamu Pengajian", "pic": "CPW (Pengantin Wanita)", "target": "Q1 2027", "estimasi": 2500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": ""}, {"id": "PW-R34", "sheet": "PRE WEDDING", "rowIndex": 34, "no": 6, "kategori": "Pengajian Pranikah", "item": "Souvenir / Goodie Bag Jamaah", "pic": "CPW (Pengantin Wanita)", "target": "Q3 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R35", "sheet": "PRE WEDDING", "rowIndex": 35, "no": 7, "kategori": "Pengajian Pranikah", "item": "Sound System Portable & Tenda/Karpet", "pic": "CPW (Pengantin Wanita)", "target": "Q3 2027", "estimasi": 0, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tidak digunakan"}, {"id": "PW-R38", "sheet": "PRE WEDDING", "rowIndex": 38, "no": 1, "kategori": "Treatment Kesehatan", "item": "Medical Check-Up (MCU) Pranikah CPP", "pic": "CPP (Pengantin Pria)", "target": "Q2 2027", "estimasi": 500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tentatif"}, {"id": "PW-R39", "sheet": "PRE WEDDING", "rowIndex": 39, "no": 2, "kategori": "Treatment Kesehatan", "item": "Medical Check-Up (MCU) Pranikah CPW", "pic": "CPW (Pengantin Wanita)", "target": "Q2 2027", "estimasi": 2000000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tentatif"}, {"id": "PW-R40", "sheet": "PRE WEDDING", "rowIndex": 40, "no": 3, "kategori": "Treatment Kesehatan", "item": "Vaksinasi Pranikah (TT & HPV Guard)", "pic": "CPW (Pengantin Wanita)", "target": "Q2 2027", "estimasi": 200000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "HPV akan dilakukan setelah menikah. Biaya yang dimasukkan hanya Vaksinasi TT"}, {"id": "PW-R41", "sheet": "PRE WEDDING", "rowIndex": 41, "no": 4, "kategori": "Treatment Kesehatan", "item": "Konseling Pranikah & Gizi Puskesmas", "pic": "CPP & CPW Bersama", "target": "Q3 2027", "estimasi": 300000, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tentatif"}, {"id": "PW-R42", "sheet": "PRE WEDDING", "rowIndex": 42, "no": 5, "kategori": "Treatment Kesehatan", "item": "Perawatan Kulit & Spa Pengantin CPW", "pic": "CPW (Pengantin Wanita)", "target": "Q3 2027", "estimasi": 2500000, "realisasi": 0, "status": "Tidak Digunakan", "catatan": "Tentatif"}, {"id": "PW-R43", "sheet": "PRE WEDDING", "rowIndex": 43, "no": 6, "kategori": "Treatment Kesehatan", "item": "Grooming & Perawatan Diri CPP", "pic": "CPP (Pengantin Pria)", "target": "Q3 2027", "estimasi": 500000, "realisasi": 0, "status": "Belum Dimulai", "catatan": "Tentatif"}], "seserahan": [{"id": "SS-R8", "sheet": "SESERAHAN", "rowIndex": 8, "no": 1, "kategori": "Alat Solat", "item": "Mukena (Zeira Series)", "brand": "Alluna", "harga": 230000, "link": "https://shopee.co.id/ALLUNA-Mukena-Dewasa-Santorini-Silk-Jacquard-Premium-Lasercut-Mewah-Zeira-Series-i.109588470.43725150037?extraParams=%7B%22display_model_id%22%3A302038310015%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R9", "sheet": "SESERAHAN", "rowIndex": 9, "no": 2, "kategori": "Alat Solat", "item": "Gift Set Sajadah, Al-Qur'an & Tasbih", "brand": "Tazbiya", "harga": 285000, "link": "https://shopee.co.id/GIFT-SET-TAZBIYA-SAJADAH-DAN-AL-QURAN-I-Hadiah-Pernikahan-I-Paket-Seserahan-Kado-Pernikahan-Hampers-Ramadan-Hampers-Lebaran-i.12154728.27469776948?extraParams=%7B%22display_model_id%22%3A441267744318%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R14", "sheet": "SESERAHAN", "rowIndex": 14, "no": 5, "kategori": "Skincare", "item": "Facial Wash (Gentle Skin Cleanser 1000ml)", "brand": "Cetaphil", "harga": 346900, "link": "https://shopee.co.id/Cetaphil-Gentle-Skin-Cleanser-1000ml-dengan-Niacinamide-Glycerin-dan-Panthenol-Sabun-Pembersih-Muka-Untuk-Segala-Jenis-Kulit-i.11277516.567634011?extraParams=%7B%22display_model_id%22%3A23534943280%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R15", "sheet": "SESERAHAN", "rowIndex": 15, "no": 6, "kategori": "Skincare", "item": "Moisturizer (Cicaplast Baume B5+ Soothing Balm 100ml)", "brand": "La Roche Posay", "harga": 423100, "link": "https://shopee.co.id/La-Roche-Posay-Cicaplast-Baume-B5-Soothing-Balm-100ml-Krim-Kulit-Kering-Iritasi-Ringan-Wajah-Badan-i.433144176.24468990234?extraParams=%7B%22display_model_id%22%3A222599734355%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R16", "sheet": "SESERAHAN", "rowIndex": 16, "no": 7, "kategori": "Skincare", "item": "Serum (White Truffle First Spray Serum 100ml)", "brand": "d'Alba", "harga": 292500, "link": "https://shopee.co.id/d'Alba-White-Truffle-First-Spray-Serum-100ml-i.489174620.11446765625?extraParams=%7B%22display_model_id%22%3A130266383222%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R17", "sheet": "SESERAHAN", "rowIndex": 17, "no": 8, "kategori": "Skincare", "item": "Peeling Serum (Intensive Peeling Solution 35gr x 2)", "brand": "Elformula", "harga": 207000, "link": "https://shopee.co.id/ELFORMULA-Bundle-2pcs-Intensive-Peeling-Solution-35gr-x-2-Peeling-Serum-Dark-Spot-Glass-Skin-Eksfoliasi-Wajah-Mengangkat-Sel-Kulit-Mati-AHA-BHA-PHA-Glowing-Smooth-Mencerahkan-Kulit-Halus-Blackhead-Brightening-Whitening-Exfoliasi-i.600719961.11588876188?extraParams=%7B%22display_model_id%22%3A215780235029%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R18", "sheet": "SESERAHAN", "rowIndex": 18, "no": 9, "kategori": "Skincare", "item": "Sunscreen (Airy Smooth x 3)", "brand": "Wardah", "harga": 106205, "link": "https://shopee.co.id/Wardah-Sunscreen-UV-Shield-Triple-Pack-Acne-Calming-SerumSPF-35-PA-Bright-C-Hydrating-Sunscreen-SPF-35-PA-Airy-Smooth-Sunscreen-SPF-50-PA-25ml-0-Alkohol-Ringan-Transparant-Sunscreen-No.-1-Sunscreen-of-the-Year-Skincare-i.59763733.41505182271?extraParams=%7B%22display_model_id%22%3A290436735860%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R23", "sheet": "SESERAHAN", "rowIndex": 23, "no": 12, "kategori": "Toiletries", "item": "Couple Towel", "brand": "Terry Palmer", "harga": 377667, "link": "https://shopee.co.id/Howel-and-Co-Althea-(Couple-Towel)-i.50219513.41204768783?extraParams=%7B%22display_model_id%22%3A280404558083%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R24", "sheet": "SESERAHAN", "rowIndex": 24, "no": 13, "kategori": "Toiletries", "item": "Keratin Total Repair Kit (Shampoo, Condi, Mask, Serum)", "brand": "TRESemme", "harga": 318500, "link": "https://shopee.co.id/Keratin-Total-Repair-Kit-TRESemme-Keratin-Smooth-Shampoo-170ml-Condi-170ml-Mask-180-ml-Serum-100-ml-i.932470899.42322758236?extraParams=%7B%22display_model_id%22%3A296849028073%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R25", "sheet": "SESERAHAN", "rowIndex": 25, "no": 14, "kategori": "Toiletries", "item": "Shower Gel 1000ml for Brightening", "brand": "Moseru", "harga": 149000, "link": "https://shopee.co.id/-READY-STOCK-MOSSERU-Shower-Gel-500ml-for-Brightening-Sabun-Mandi-Mencerahkan-Sabun-Mandi-Cair-Pencerah-Tubuh-Body-Wash-Melembapkan-i.788496337.57709998794?extraParams=%7B%22display_model_id%22%3A355883366527%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R26", "sheet": "SESERAHAN", "rowIndex": 26, "no": 15, "kategori": "Toiletries", "item": "Brightening Body Serum 7x BRIGHTENING x 2", "brand": "Bonavie", "harga": 76000, "link": "https://shopee.co.id/-Special-Affiliate-Bonavie-Brightening-Body-Serum-7x-BRIGHTENING-Fragrance-Wangi-Mewah-Body-Lotion-Mencerahkan-Melembabkan-i.681243698.51309139179?extraParams=%7B%22display_model_id%22%3A380810487965%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R27", "sheet": "SESERAHAN", "rowIndex": 27, "no": 16, "kategori": "Toiletries", "item": "Paket Pencerah Gigi (Optic White O2 + 2 Sikat Gigi)", "brand": "Colgate", "harga": 145000, "link": "https://shopee.co.id/Colgate-Paket-Pencerah-Gigi-Dalam-3-Hari-Optic-White-O2-Cushion-Clean-i.19351258.20067016615?extraParams=%7B%22display_model_id%22%3A127224868362%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R32", "sheet": "SESERAHAN", "rowIndex": 32, "no": 19, "kategori": "Makeup", "item": "Skin Tint (Copy Paste Tinted Sunscreen SPF 40 PA++++)", "brand": "Somethinc", "harga": 161000, "link": "https://shopee.co.id/SOMETHINC-Copy-Paste-Tinted-Sunscreen-SPF-40-PA-Skin-Tint-Ringan-Dengan-Finish-Dewy-Meratakan-Warna-Kulit-Serta-Melindungi-Wajah-Dari-UVA-UVB-Mengandung-skincare-dan-Tahan-Lama-i.195455930.25401007243?extraParams=%7B%22display_model_id%22%3A255310450945%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R33", "sheet": "SESERAHAN", "rowIndex": 33, "no": 20, "kategori": "Makeup", "item": "Bedak (Powder Foundation Two-Way Cake)", "brand": "Maybelline", "harga": 149200, "link": "https://shopee.co.id/Maybelline-Superstay-Flex-Powder-30H-Waterproof-i.62582411.42514980152?extraParams=%7B%22display_model_id%22%3A301239606019%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R34", "sheet": "SESERAHAN", "rowIndex": 34, "no": 21, "kategori": "Makeup", "item": "Blush On (Wonder Crush Serum Liquid Blush On)", "brand": "Esqa", "harga": 100000, "link": "https://shopee.co.id/ESQA-Wonder-Crush-Serum-Liquid-Blush-On-i.60328369.18585640571?extraParams=%7B%22display_model_id%22%3A88809741581%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R35", "sheet": "SESERAHAN", "rowIndex": 35, "no": 22, "kategori": "Makeup", "item": "Eyeshadow (Goddess Eyeshadow Palette)", "brand": "Esqa", "harga": 169000, "link": "https://shopee.co.id/ESQA-Goddess-Eyeshadow-Palette-i.60328369.2810686129?extraParams=%7B%22display_model_id%22%3A22416261513%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R36", "sheet": "SESERAHAN", "rowIndex": 36, "no": 23, "kategori": "Makeup", "item": "Bundle Eye Makeup (Sky High Maskara + Tattoo Liner)", "brand": "Maybelline", "harga": 185880, "link": "https://shopee.co.id/Variation-Name-Sky-High-Tattoo-Liner-i.62582411.18492909364?extraParams=%7B%22display_model_id%22%3A218823575260%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R37", "sheet": "SESERAHAN", "rowIndex": 37, "no": 24, "kategori": "Makeup", "item": "Lipstick (Superstay Teddy Tint)", "brand": "Maybelline", "harga": 71000, "link": "https://shopee.co.id/Maybelline-Superstay-Teddy-Tint-5-mL-Teddy-Soft-Matte-Tahan-12-Jam-Lipstick-Lipcream-Lipstik-Perfect-Lip-Tint-i.62582411.28157131188?extraParams=%7B%22display_model_id%22%3A187702520860%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R38", "sheet": "SESERAHAN", "rowIndex": 38, "no": 25, "kategori": "Makeup", "item": "Lipcream (Glossy Glasting Liquid Lip)", "brand": "Wardah", "harga": 97970, "link": "https://shopee.co.id/WARDAH-Lip-Cream-Glossy-Glasting-Liquid-Lip-Hi-Pigmented-Glass-Color-Ringan-Tidak-Lengket-Transferproof-Liptint-Lipgloss-Lipstik-Lip-Tint-Lip-Matte-Lipstick-Lipcream-Glossy-Lip-Longlasting-Waterproof-Tahan-Lama-Makeup-i.59763733.24156148592?extraParams=%7B%22display_model_id%22%3A88855629213%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R39", "sheet": "SESERAHAN", "rowIndex": 39, "no": 26, "kategori": "Makeup", "item": "Brush (Beauté The Onyx Perfect Duo Bundle)", "brand": "Aeris", "harga": 108800, "link": "https://shopee.co.id/Aeris-Beaut%C3%A9-The-Onyx-Perfect-Duo-Bundle-Set-Praktis-Brush-Make-Up-Hitam-Premium-Lembut-Vegan-untuk-Pemula-Kuas-Bedak-Foundation-Concealer-Blush-i.86767687.23764637468?extraParams=%7B%22display_model_id%22%3A290922034609%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R44", "sheet": "SESERAHAN", "rowIndex": 44, "no": 29, "kategori": "Underwear", "item": "Bra + Celana Dalam (4 set)", "brand": "Sorex", "harga": 348800, "link": "https://shopee.co.id/Sorex-Bra-Set-Busa-Sedang-Kawat-Kait-3-Setara-Cup-A-B-CD-Cutting-Mini-BH-17133-i.34668189.24765196544?extraParams=%7B%22display_model_id%22%3A240372736281%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R45", "sheet": "SESERAHAN", "rowIndex": 45, "no": 30, "kategori": "Underwear", "item": "Lingerie", "brand": "Qigerie", "harga": 139195, "link": "https://shopee.co.id/Gwen-Qigerie-Baju-Daster-Sexy-Wanita-i.389600185.28615181952?extraParams=%7B%22display_model_id%22%3A246854973022%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R50", "sheet": "SESERAHAN", "rowIndex": 50, "no": 33, "kategori": "Pakaian", "item": "Baju (AS SHE IS - LORENE TOP)", "brand": "Pastelly", "harga": 348400, "link": "https://shopee.co.id/PASTELLY-AS-SHE-IS-LORENE-TOP-i.490730798.41734290800?extraParams=%7B%22display_model_id%22%3A321483944955%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R51", "sheet": "SESERAHAN", "rowIndex": 51, "no": 34, "kategori": "Pakaian", "item": "Celana (Gion Satin Pants)", "brand": "Marveile", "harga": 229000, "link": "https://shopee.co.id/-Marveile-Gion-Satin-Pants-Celana-Panjang-Satin-Wanita-(-SLIM-CUT-HIGHWAIST-)-i.406683489.50509351670?extraParams=%7B%22display_model_id%22%3A138467946474%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R52", "sheet": "SESERAHAN", "rowIndex": 52, "no": 35, "kategori": "Pakaian", "item": "Gamis (Border L Monogram Satin)", "brand": "Elzatta", "harga": 389000, "link": "https://shopee.co.id/Elzatta-Long-Dress-Gamis-Border-L-Monogram-Satin-i.12073181.25391155572?extraParams=%7B%22display_model_id%22%3A311257069886%2C%22model_selection_logic%22%3Anull%7D", "status": "Pending"}, {"id": "SS-R53", "sheet": "SESERAHAN", "rowIndex": 53, "no": 36, "kategori": "Pakaian", "item": "Kerudung (Segi Empat Paris Polos Keisha Paris)", "brand": "Elzatta", "harga": 55000, "link": "https://shopee.co.id/Elzatta-Hijab-Jilbab-Kerudung-Segi-Empat-Paris-Polos-Keisha-Paris-i.12073181.42514099531?extraParams=%7B%22display_model_id%22%3A206368184026%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R58", "sheet": "SESERAHAN", "rowIndex": 58, "no": 39, "kategori": "Accessories", "item": "Bag (Tas Bahu Kulit Emory - Hitam)", "brand": "Pedro", "harga": 2799000, "link": "https://www.pedroshoes.co.id/id/women/PW2-75060139_BLACK-ID.html", "status": "Pending"}, {"id": "SS-R59", "sheet": "SESERAHAN", "rowIndex": 59, "no": 40, "kategori": "Accessories", "item": "Bag (Tas Bucket Turn-Lock Chance - Taupe)", "brand": "Charles & Keith", "harga": 1699000, "link": "https://www.charleskeith.co.id/id/CK2-10701618_TAUPE-ID.html", "status": "Pending"}, {"id": "SS-R60", "sheet": "SESERAHAN", "rowIndex": 60, "no": 41, "kategori": "Accessories", "item": "Sandal (Sandal Slide Crystal Mesh - Black Textured)", "brand": "Charles & Keith", "harga": 1099000, "link": "https://www.charleskeith.co.id/id/CK1-70381254_BLKTXT-ID.html", "status": "Pending"}, {"id": "SS-R61", "sheet": "SESERAHAN", "rowIndex": 61, "no": 42, "kategori": "Accessories", "item": "Flatshoes (Sepatu Mary Janes Double-Strap Brogue)", "brand": "Charles & Keith", "harga": 1099000, "link": "https://www.charleskeith.co.id/id/CK1-70381187_BEIGE-ID.html", "status": "Pending"}, {"id": "SS-R62", "sheet": "SESERAHAN", "rowIndex": 62, "no": 43, "kategori": "Accessories", "item": "Jam tangan (LTP-V007L-7B2UDF)", "brand": "Casio", "harga": 403340, "link": "https://shopee.co.id/Casio-Jam-Tangan-Wanita-LTP-V007L-7B2UDF-i.43688581.5139567065?extraParams=%7B%22display_model_id%22%3A70091660072%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R67", "sheet": "SESERAHAN", "rowIndex": 67, "no": 46, "kategori": "ETC", "item": "Hairdryer", "brand": "Ona", "harga": 1484000, "link": "https://shopee.co.id/ONA-PIXEL-Mini-Highspeed-Hairdryer-Pengering-Rambut-Garansi-5thn-300-Juta-Ion-Negatif-6-Suhu-1100W-i.1074192609.28177272910?extraParams=%7B%22display_model_id%22%3A415305047042%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}, {"id": "SS-R68", "sheet": "SESERAHAN", "rowIndex": 68, "no": 47, "kategori": "ETC", "item": "Perfume (Gorgeous Tuberose 110ml)", "brand": "Mandalika", "harga": 766972, "link": "https://shopee.co.id/MANDALIKA-Perfume-Gorgeous-Tuberose-110ml-Parfum-Anya-Geraldine-i.1129592427.19886641773?extraParams=%7B%22display_model_id%22%3A187180904166%2C%22model_selection_logic%22%3A3%7D", "status": "Pending"}], "maharTargets": [{"id": "MT-R10", "rowIndex": 10, "no": 1, "instrumen": "Saham BSSR (PT Baramulti Suksessarana Tbk)", "spesifikasi": "27 Lot Saham Dividen (2.700 Lembar)", "targetJumlah": 27.0, "satuan": "Lot", "hargaSatuan": 499948, "totalEstimasi": 13498599, "realisasi": 6523872, "status": "Sebagian ⏳", "lokasi": "RDN Indo Premier (IPOT) / KSEI"}, {"id": "MT-R11", "rowIndex": 11, "no": 2, "instrumen": "Logam Mulia Emas (Hartadinata EMASKU)", "spesifikasi": "Akumulasi 6 Gram Emas Hartadinata / Logam Mulia", "targetJumlah": 6.0, "satuan": "Gram", "hargaSatuan": 4845639, "totalEstimasi": 14536917, "realisasi": 0, "status": "Belum Ada ❌", "lokasi": "Brankas / Safe Deposit Box"}, {"id": "MT-R12", "rowIndex": 12, "no": 3, "instrumen": "Uang Tunai Mahar", "spesifikasi": "Uang Kertas Emisi Baru (Angka Cantik 2027)", "targetJumlah": 1.0, "satuan": "Paket", "hargaSatuan": 2027000, "totalEstimasi": 2027000, "realisasi": 2027000, "status": "Lengkap ✅", "lokasi": "Frame Mahar & Rekening Pribadi"}], "maharLogs": [{"id": "ML-R16", "rowIndex": 16, "no": 1, "tanggal": "2026-10-30", "komponen": "Saham BSSR", "volume": 1.0, "satuan": "Lot", "hargaSatuan": 5075, "status": "Selesai", "totalRealisasi": 508464, "sumberDana": "RDN Indo Premier (IPOT)", "catatan": "Cicil 3 lot saham BSSR"}, {"id": "ML-R17", "rowIndex": 17, "no": 2, "tanggal": "2026-10-30", "komponen": "Saham BSSR", "volume": 2.0, "satuan": "Lot", "hargaSatuan": 5050, "status": "Selesai", "totalRealisasi": 1011919, "sumberDana": "RDN Indo Premier (IPOT)", "catatan": "Cicil 3 lot saham BSSR"}, {"id": "ML-R18", "rowIndex": 18, "no": 3, "tanggal": "2026-11-07", "komponen": "Uang Tunai", "volume": 1.0, "satuan": "Paket", "hargaSatuan": 2027000, "status": "Selesai", "totalRealisasi": 2027000, "sumberDana": "Rekening Bank CPP", "catatan": "Di Bibit"}, {"id": "ML-R19", "rowIndex": 19, "no": 4, "tanggal": "2026-11-05", "komponen": "Saham BSSR", "volume": 9.0, "satuan": "Lot", "hargaSatuan": 5000, "status": "Selesai", "totalRealisasi": 4508550, "sumberDana": "RDN Indo Premier (IPOT)", "catatan": ""}, {"id": "ML-R20", "rowIndex": 20, "no": 5, "tanggal": "2026-11-05", "komponen": "Saham BSSR", "volume": 1.0, "satuan": "Lot", "hargaSatuan": 4940, "status": "Selesai", "totalRealisasi": 494939, "sumberDana": "RDN Indo Premier (IPOT)", "catatan": "Udah 13 lot BSSR"}], "administrasi": [{"id": "AD-R8", "sheet": "ADMINISTRASI", "rowIndex": 8, "no": 1, "instansi": "Pengantar RT/RW", "dokumen": "Surat Pengantar RT/RW Calon Pengantin Pria", "cppCheck": false, "cpwCheck": "NA", "target": "2027-02-15", "estimasi": 0, "realisasi": 0, "catatan": "Membawa fotokopi KTP & KK ke Ketua RT dan RW domisili CPP"}, {"id": "AD-R9", "sheet": "ADMINISTRASI", "rowIndex": 9, "no": 2, "instansi": "Pengantar RT/RW", "dokumen": "Surat Pengantar RT/RW Calon Pengantin Wanita", "cppCheck": "NA", "cpwCheck": false, "target": "2027-02-15", "estimasi": 0, "realisasi": 0, "catatan": "Membawa fotokopi KTP & KK ke Ketua RT dan RW domisili CPW"}, {"id": "AD-R10", "sheet": "ADMINISTRASI", "rowIndex": 10, "no": 3, "instansi": "Kelurahan", "dokumen": "Formulir N1 (Surat Pengantar Nikah Kelurahan)", "cppCheck": false, "cpwCheck": false, "target": "2027-02-28", "estimasi": 0, "realisasi": 0, "catatan": "Diterbitkan oleh kelurahan domisili masing-masing calon mempelai"}, {"id": "AD-R11", "sheet": "ADMINISTRASI", "rowIndex": 11, "no": 4, "instansi": "Kelurahan", "dokumen": "Formulir N2 (Surat Permohonan Kehendak Nikah)", "cppCheck": false, "cpwCheck": false, "target": "2027-02-28", "estimasi": 0, "realisasi": 0, "catatan": "Formulir permohonan kehendak nikah resmi dari kelurahan"}, {"id": "AD-R12", "sheet": "ADMINISTRASI", "rowIndex": 12, "no": 5, "instansi": "Kelurahan", "dokumen": "Formulir N4 (Surat Persetujuan Mempelai)", "cppCheck": false, "cpwCheck": false, "target": "2027-02-28", "estimasi": 20000, "realisasi": 0, "catatan": "Surat persetujuan kedua mempelai bermeterai cukup"}, {"id": "AD-R13", "sheet": "ADMINISTRASI", "rowIndex": 13, "no": 6, "instansi": "Kelurahan", "dokumen": "Formulir N5 (Surat Izin Orang Tua / Wali)", "cppCheck": false, "cpwCheck": false, "target": "2027-02-28", "estimasi": 20000, "realisasi": 0, "catatan": "Persetujuan tertulis resmi dari orang tua/wali masing-masing"}, {"id": "AD-R14", "sheet": "ADMINISTRASI", "rowIndex": 14, "no": 7, "instansi": "Kelurahan", "dokumen": "Surat Keterangan Belum Menikah dari Kelurahan", "cppCheck": false, "cpwCheck": false, "target": "2027-02-28", "estimasi": 0, "realisasi": 0, "catatan": "Surat keterangan status lajang/belum pernah menikah dari kelurahan"}, {"id": "AD-R15", "sheet": "ADMINISTRASI", "rowIndex": 15, "no": 8, "instansi": "Kelurahan / KUA", "dokumen": "Surat Rekomendasi Nikah (Numpang Nikah)", "cppCheck": false, "cpwCheck": "NA", "target": "2027-03-05", "estimasi": 0, "realisasi": 0, "catatan": "Dari KUA asal CPP ditujukan ke KUA lokasi akad nikah CPW"}, {"id": "AD-R16", "sheet": "ADMINISTRASI", "rowIndex": 16, "no": 9, "instansi": "Dokumen Pribadi", "dokumen": "Fotokopi KTP Calon Pengantin (CPP & CPW)", "cppCheck": false, "cpwCheck": false, "target": "2027-02-10", "estimasi": 25000, "realisasi": 0, "catatan": "Fotokopi legalisir 5-10 rangkap & siapkan scan PDF resolusi tinggi"}, {"id": "AD-R17", "sheet": "ADMINISTRASI", "rowIndex": 17, "no": 10, "instansi": "Dokumen Pribadi", "dokumen": "Fotokopi Kartu Keluarga (KK) Masing-masing", "cppCheck": false, "cpwCheck": false, "target": "2027-02-10", "estimasi": 20000, "realisasi": 0, "catatan": "Fotokopi KK terbaru masing-masing calon pengantin 5 rangkap"}, {"id": "AD-R18", "sheet": "ADMINISTRASI", "rowIndex": 18, "no": 11, "instansi": "Dokumen Pribadi", "dokumen": "Fotokopi Akta Kelahiran & Ijazah Terakhir", "cppCheck": false, "cpwCheck": false, "target": "2027-02-10", "estimasi": 25000, "realisasi": 0, "catatan": "Verifikasi keselarasan ejaan nama calon mempelai & orang tua"}, {"id": "AD-R19", "sheet": "ADMINISTRASI", "rowIndex": 19, "no": 12, "instansi": "Dokumen Pribadi", "dokumen": "Pasfoto Background Biru (Ukuran 2x3 & 4x6)", "cppCheck": false, "cpwCheck": false, "target": "2027-02-12", "estimasi": 80000, "realisasi": 0, "catatan": "Foto formal berkerah/berjas latar biru, masing-masing 5 lembar"}, {"id": "AD-R20", "sheet": "ADMINISTRASI", "rowIndex": 20, "no": 13, "instansi": "Dokumen Pribadi", "dokumen": "Fotokopi KTP Orang Tua & 2 Orang Saksi Nikah", "cppCheck": false, "cpwCheck": false, "target": "2027-02-15", "estimasi": 15000, "realisasi": 0, "catatan": "Fotokopi identitas KTP ayah/ibu serta saksi pernikahan yang sah"}, {"id": "AD-R21", "sheet": "ADMINISTRASI", "rowIndex": 21, "no": 14, "instansi": "Kesehatan / Puskesmas", "dokumen": "Skrining Kesehatan Catin di Puskesmas Domisili", "cppCheck": false, "cpwCheck": false, "target": "2027-03-15", "estimasi": 100000, "realisasi": 0, "catatan": "Tes darah lengkap, anemia, golongan darah, dan konseling pranikah"}, {"id": "AD-R22", "sheet": "ADMINISTRASI", "rowIndex": 22, "no": 15, "instansi": "Kesehatan / Puskesmas", "dokumen": "Sertifikat Imunisasi Tetanus Toxoid (TT)", "cppCheck": "NA", "cpwCheck": false, "target": "2027-03-31", "estimasi": 50000, "realisasi": 0, "catatan": "Vaksinasi TT bagi calon pengantin wanita di Puskesmas/Klinik"}, {"id": "AD-R23", "sheet": "ADMINISTRASI", "rowIndex": 23, "no": 16, "instansi": "Kesehatan / BKKBN", "dokumen": "Sertifikat Layak Kawin Aplikasi ELSIMIL", "cppCheck": false, "cpwCheck": false, "target": "2027-03-31", "estimasi": 0, "realisasi": 0, "catatan": "Isi kuesioner & upload hasil lab puskesmas via aplikasi Elsimil BKKBN"}, {"id": "AD-R24", "sheet": "ADMINISTRASI", "rowIndex": 24, "no": 17, "instansi": "KUA & SIMKAH", "dokumen": "Pendaftaran Nikah Online via SIMKAH Kemenag", "cppCheck": false, "cpwCheck": false, "target": "2027-04-05", "estimasi": 0, "realisasi": 0, "catatan": "Registrasi mandiri di simkah4.kemenag.go.id minimal H-90 s.d H-30"}, {"id": "AD-R25", "sheet": "ADMINISTRASI", "rowIndex": 25, "no": 18, "instansi": "KUA & SIMKAH", "dokumen": "Verifikasi & Penyerahan Berkas Fisik ke KUA", "cppCheck": false, "cpwCheck": false, "target": "2027-04-12", "estimasi": 0, "realisasi": 0, "catatan": "Penyerahan seluruh berkas asli dan fotokopi ke kantor KUA terkait"}, {"id": "AD-R26", "sheet": "ADMINISTRASI", "rowIndex": 26, "no": 19, "instansi": "KUA & SIMKAH", "dokumen": "Pembayaran Billing PNBP Nikah (Luar Kantor/Bedol)", "cppCheck": false, "cpwCheck": false, "target": "2027-04-15", "estimasi": 600000, "realisasi": 0, "catatan": "Setor biaya PNBP resmi Rp 600.000 via Bank/ATM (Rp 0 jika di KUA)"}, {"id": "AD-R27", "sheet": "ADMINISTRASI", "rowIndex": 27, "no": 20, "instansi": "KUA & SIMKAH", "dokumen": "Bimbingan Perkawinan (Bimwin / Suscatin)", "cppCheck": false, "cpwCheck": false, "target": "2027-04-22", "estimasi": 0, "realisasi": 0, "catatan": "Mengikuti pembekalan keluarga sakinah dari KUA secara tatap muka/webinar"}, {"id": "AD-R28", "sheet": "ADMINISTRASI", "rowIndex": 28, "no": 21, "instansi": "KUA & SIMKAH", "dokumen": "Konfirmasi Penghulu, Jadwal & Kelengkapan Mas Kawin", "cppCheck": false, "cpwCheck": false, "target": "2027-04-30", "estimasi": 0, "realisasi": 0, "catatan": "Koordinasi kehadiran penghulu di venue serta detail mahar pernikahan"}, {"id": "AD-R29", "sheet": "ADMINISTRASI", "rowIndex": 29, "no": 22, "instansi": "Pasca Nikah / KUA", "dokumen": "Penerimaan Buku Nikah Fisik & Kartu Nikah Digital", "cppCheck": false, "cpwCheck": false, "target": "2027-07-01", "estimasi": 0, "realisasi": 0, "catatan": "Pemeriksaan penulisan identitas buku nikah sesaat setelah ijab kabul"}, {"id": "AD-R30", "sheet": "ADMINISTRASI", "rowIndex": 30, "no": 23, "instansi": "Disdukcapil", "dokumen": "Penerbitan Kartu Keluarga (KK) Baru Pasutri", "cppCheck": false, "cpwCheck": false, "target": "2027-07-10", "estimasi": 0, "realisasi": 0, "catatan": "Pengajuan pecah KK dan cetak KK mandiri baru berstatus suami-istri"}, {"id": "AD-R31", "sheet": "ADMINISTRASI", "rowIndex": 31, "no": 24, "instansi": "Disdukcapil", "dokumen": "Pembaruan Kartu Keluarga Orang Tua Masing-masing", "cppCheck": false, "cpwCheck": false, "target": "2027-07-15", "estimasi": 0, "realisasi": 0, "catatan": "Penyesuaian pengurangan anggota keluarga di KK orang tua CPP & CPW"}, {"id": "AD-R32", "sheet": "ADMINISTRASI", "rowIndex": 32, "no": 25, "instansi": "Disdukcapil", "dokumen": "Pembaruan KTP-el Status Perkawinan (Kawin)", "cppCheck": false, "cpwCheck": false, "target": "2027-07-20", "estimasi": 0, "realisasi": 0, "catatan": "Cetak KTP elektronik baru CPP & CPW berstatus Menikah/Kawin"}, {"id": "AD-R33", "sheet": "ADMINISTRASI", "rowIndex": 33, "no": 26, "instansi": "Administrasi Terkait", "dokumen": "Pembaruan Kepesertaan BPJS Kesehatan & Perbankan", "cppCheck": false, "cpwCheck": false, "target": "2027-07-31", "estimasi": 0, "realisasi": 0, "catatan": "Penyatuan faskes BPJS satu keluarga dan update data ahli waris bank"}], "vendors": [{"id": "VD-R17", "sheet": "VENDOR DIRECTORY", "rowIndex": 17, "no": 1, "kategori": "Venue & Tempat Resepsi", "nama": "WO by ...", "kontak": "@plataran.wedding / Bp. Anton (0812-3456-XXX)", "nilaiKontrak": 20000000, "sisaPembayaran": 20000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Sewa gedung intimate XXX pax, listrik 10.000W & ruang VIP", "catatan": "DP 50% telah disetor, pelunasan H-14"}, {"id": "VD-R18", "sheet": "VENDOR DIRECTORY", "rowIndex": 18, "no": 2, "kategori": "Katering & Minuman", "nama": "Puspa Catering Premium", "kontak": "@puspacatering / Ibu Maya (0811-9876-XXX)", "nilaiKontrak": 21000000, "sisaPembayaran": 21000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Buffet XXX pax + 4 stall premium + complimentary coffee break", "catatan": "Food test approved, menu final terkunci"}, {"id": "VD-R19", "sheet": "VENDOR DIRECTORY", "rowIndex": 19, "no": 3, "kategori": "MUA & Busana Pengantin", "nama": "Biyan Kebaya & Attire", "kontak": "@biyan.atelier / Mba Citra (0813-2233-XXX)", "nilaiKontrak": 5000000, "sisaPembayaran": 5000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Beskap CPP adat & kebaya modern CPW akad-resepsi", "catatan": "Fitting tahap 1 tuntas, fitting final H-1 bulan"}, {"id": "VD-R20", "sheet": "VENDOR DIRECTORY", "rowIndex": 20, "no": 4, "kategori": "MUA & Busana Pengantin", "nama": "Anpasuha Makeup Artist", "kontak": "@anpasuha_mua / Mas Dimas (0815-6677-XXX)", "nilaiKontrak": 2500000, "sisaPembayaran": 2500000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "MUA pengantin wanita akad-resepsi & retouch", "catatan": "Pembayaran full lunas"}, {"id": "VD-R21", "sheet": "VENDOR DIRECTORY", "rowIndex": 21, "no": 5, "kategori": "MUA & Busana Pengantin", "nama": "Gajah Mada Textile & Tailor", "kontak": "@gm.textile / Ibu Rini (0817-1122-XXX)", "nilaiKontrak": 2000000, "sisaPembayaran": 2000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Bahan seragam keluarga inti CPP & CPW 11 pax", "catatan": "Kain telah didistribusikan ke keluarga"}, {"id": "VD-R22", "sheet": "VENDOR DIRECTORY", "rowIndex": 22, "no": 6, "kategori": "Dokumentasi (Foto & Video)", "nama": "The Uppermost Photography", "kontak": "@theuppermost / Bp. Tito (0818-4455-XXX)", "nilaiKontrak": 6000000, "sisaPembayaran": 6000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Foto & Cinematic Video Akad-Resepsi + Drone + Album Eksklusif", "catatan": "DP 50% tuntas, tim standby H-2 jam"}, {"id": "VD-R23", "sheet": "VENDOR DIRECTORY", "rowIndex": 23, "no": 7, "kategori": "Dekorasi & Florist", "nama": "Stupa Caspea Floral & Decor", "kontak": "@stupacaspea / Mba Rara (0812-9988-XXX)", "nilaiKontrak": 7500000, "sisaPembayaran": 7500000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Pelaminan intimate modern, floral arch lorong & meja akad", "catatan": "Layout 3D disetujui, loading H-1 malam"}, {"id": "VD-R24", "sheet": "VENDOR DIRECTORY", "rowIndex": 24, "no": 8, "kategori": "Undangan & Souvenir", "nama": "Alinea Wedding Invitation", "kontak": "@alinea.invitation / Admin (0856-7788-XXX)", "nilaiKontrak": 500000, "sisaPembayaran": 500000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Web invitation RSVP digital + 50 undangan fisik VIP foil emas", "catatan": "Sistem RSVP online aktif & link siap disebar"}, {"id": "VD-R25", "sheet": "VENDOR DIRECTORY", "rowIndex": 25, "no": 9, "kategori": "Undangan & Souvenir", "nama": "Kaminari Botanical Goods", "kontak": "@kaminari.gift / Mba Lisa (0819-3344-XXX)", "nilaiKontrak": 1500000, "sisaPembayaran": 1500000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "300 pcs scented wax sachet + hardbox packaging & thank you tag", "catatan": "Proses produksi kemasan, siap ambil H-14"}, {"id": "VD-R26", "sheet": "VENDOR DIRECTORY", "rowIndex": 26, "no": 10, "kategori": "Vendor Tambahan / Lainnya", "nama": "KUA Kecamatan Setempat", "kontak": "Penghulu / Petugas KUA (0813-5566-XXX)", "nilaiKontrak": 600000, "sisaPembayaran": 600000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Pencatatan nikah luar kantor resmi & bimbingan pranikah", "catatan": "Jadwal penghulu terkonfirmasi jam 08.00 WIB"}, {"id": "VD-R27", "sheet": "VENDOR DIRECTORY", "rowIndex": 27, "no": 11, "kategori": "Hiburan, MC & Akustik", "nama": "Acoustic Soul & Host", "kontak": "@acousticsoul_band / Mas Rian (0811-3322-XXX)", "nilaiKontrak": 2400000, "sisaPembayaran": 2400000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Akustik trio live resepsi + sound 3.000 watt + MC akad", "catatan": "Songlist intimate sudah diserahkan"}, {"id": "VD-R28", "sheet": "VENDOR DIRECTORY", "rowIndex": 28, "no": 12, "kategori": "Wedding Organizer (WO)", "nama": "Kalyana Wedding Planner", "kontak": "@kalyana.wo / Mba Sarah (0812-8899-XXX)", "nilaiKontrak": 5000000, "sisaPembayaran": 5000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "6 Personil kru lapangan hari H, timekeeper & koordinasi vendor", "catatan": "Rundown & technical meeting terjadwal"}, {"id": "VD-R29", "sheet": "VENDOR DIRECTORY", "rowIndex": 29, "no": 13, "kategori": "Jasa Hantaran & Mahar", "nama": "Frank & Co Jewellery", "kontak": "@franknco_id / Gallery Mall (0821-4433-XXX)", "nilaiKontrak": 5000000, "sisaPembayaran": 5000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Sepasang cincin emas putih & rose gold dengan ukir nama", "catatan": "Cincin sudah diambil & tersimpan aman"}, {"id": "VD-R30", "sheet": "VENDOR DIRECTORY", "rowIndex": 30, "no": 14, "kategori": "Jasa Hantaran & Mahar", "nama": "Studio Mahar & Seni Akrilik", "kontak": "@studiomahar / Mba Nisa (0813-8877-XXX)", "nilaiKontrak": 1000000, "sisaPembayaran": 1000000, "statusKerjasama": "Riset", "statusPembayaran": "Belum Bayar", "layanan": "Frame 3D akrilik gold, lampu LED & box cincin velvet", "catatan": "Desain frame selesai dirangkai"}], "timeline": [{"id": "TL-R8", "rowIndex": 8, "no": 1, "fase": "H-5 Bulan", "kategori": "Anggaran & Konsep", "agenda": "Penentuan Budget & Konsep Acara", "rincian": "Finalisasi total budget, tema konsep pernikahan, & alokasi dana", "target": "2027-02-05", "pic": "Kedua Mempelai", "status": "Dalam Proses"}, {"id": "TL-R9", "rowIndex": 9, "no": 2, "fase": "H-4,5 Bulan", "kategori": "Venue & Tanggal", "agenda": "Riset & Booking Venue Acara", "rincian": "Survei gedung/venue intimate, penetapan tanggal, & pembayaran DP", "target": "2027-02-10", "pic": "CPP & CPW", "status": "Belum Mulai"}, {"id": "TL-R10", "rowIndex": 10, "no": 3, "fase": "H-3 Bulan", "kategori": "Wedding Organizer", "agenda": "Pemilihan & Kontrak Tim WO", "rincian": "Wawancara vendor WO, review portofolio, dan penandatanganan SPK", "target": "2027-03-29", "pic": "CPW", "status": "Belum Mulai"}, {"id": "TL-R11", "rowIndex": 11, "no": 4, "fase": "H-4,5 Bulan", "kategori": "Catering & Menu", "agenda": "Test Food & Booking Catering", "rincian": "Food tasting menu buffet dan stall, estimasi porsi tamu, & kunci harga", "target": "2027-02-15", "pic": "Kedua Keluarga", "status": "Belum Mulai"}, {"id": "TL-R12", "rowIndex": 12, "no": 5, "fase": "H-3,5 Bulan", "kategori": "Dokumentasi", "agenda": "Kontrak Foto & Videografer", "rincian": "Paket liputan prewedding, akad, resepsi, drone shot, & video reel", "target": "2027-03-08", "pic": "CPP", "status": "Belum Mulai"}, {"id": "TL-R13", "rowIndex": 13, "no": 6, "fase": "H-4 Bulan", "kategori": "Busana & MUA", "agenda": "Booking Perias & Desainer Busana", "rincian": "Konsultasi kebaya/beskap, paket MUA pengantin dan kedua orang tua", "target": "2027-02-22", "pic": "CPW", "status": "Belum Mulai"}, {"id": "TL-R14", "rowIndex": 14, "no": 7, "fase": "H-3,5 Bulan", "kategori": "Dekorasi", "agenda": "Finalisasi Layout & Desain Dekorasi", "rincian": "Moodboard dekorasi pelaminan, lorong masuk, meja akad, & photobooth", "target": "2027-03-15", "pic": "CPW & Vendor", "status": "Belum Mulai"}, {"id": "TL-R15", "rowIndex": 15, "no": 8, "fase": "H-3 Bulan", "kategori": "Hiburan & MC", "agenda": "Booking MC & Live Music / Akustik", "rincian": "Pemilihan MC akad & resepsi, sound system, dan pengisi live music", "target": "2027-03-22", "pic": "CPP & CPW", "status": "Belum Mulai"}, {"id": "TL-R16", "rowIndex": 16, "no": 9, "fase": "H-2 Bulan", "kategori": "Administrasi KUA", "agenda": "Pengurusan Berkas N1-N4 & KUA", "rincian": "Surat pengantar RT/RW, kelurahan, puskesmas, dan pendaftaran KUA", "target": "2027-04-30", "pic": "CPP & CPW", "status": "Belum Mulai"}, {"id": "TL-R17", "rowIndex": 17, "no": 10, "fase": "H-1,5 Bulan", "kategori": "Tamu & Undangan", "agenda": "Finalisasi Daftar Tamu & Undangan", "rincian": "Kurasi list 150 pax CPP & 150 pax CPW, cetak fisik & e-invitation", "target": "2027-05-10", "pic": "Kedua Mempelai", "status": "Belum Mulai"}, {"id": "TL-R18", "rowIndex": 18, "no": 11, "fase": "H-2,5 Bulan", "kategori": "Mahar & Hantaran", "agenda": "Penyiapan Mahar & Kotak Seserahan", "rincian": "Pembelian logam mulia, hias pigura mahar & penataan box seserahan", "target": "2027-04-05", "pic": "CPP", "status": "Belum Mulai"}, {"id": "TL-R19", "rowIndex": 19, "no": 12, "fase": "H-1 Bulan", "kategori": "Souvenir", "agenda": "Pengadaan Souvenir & Packaging", "rincian": "Produksi souvenir 300 pcs, thank you card, dan finishing packaging", "target": "2027-05-17", "pic": "CPW", "status": "Belum Mulai"}, {"id": "TL-R20", "rowIndex": 20, "no": 13, "fase": "H-3 Minggu", "kategori": "Distribusi Undangan", "agenda": "Sebar Undangan Fisik & Digital", "rincian": "Pengiriman undangan fisik via ekspedisi & blast web invitation", "target": "2027-06-05", "pic": "Tim Keluarga", "status": "Belum Mulai"}, {"id": "TL-R21", "rowIndex": 21, "no": 14, "fase": "H-1 Minggu", "kategori": "Technical Meeting", "agenda": "Technical Meeting Seluruh Vendor", "rincian": "Koordinasi final alur rundown, loading time, & tata letak venue", "target": "2027-06-19", "pic": "WO & All Vendors", "status": "Belum Mulai"}, {"id": "TL-R22", "rowIndex": 22, "no": 15, "fase": "H-1 Hari", "kategori": "Gladi Resik & Drop Barang", "agenda": "Gladi Resik & Serah Terima Properti", "rincian": "Drop barang mahar, seserahan, souvenir ke venue & istirahat mempelai", "target": "2027-06-25", "pic": "WO & Keluarga", "status": "Belum Mulai"}], "rundown": [{"id": "RD-R31", "rowIndex": 31, "no": 1, "waktu": "05.00 - 06.30", "durasi": "90 mnt", "sesi": "MUA & Wardrobe CPW", "deskripsi": "Make up pengantin wanita dan fitting busana akad", "lokasi": "Ruang Rias Pengantin", "pic": "Bridesmaid / MUA", "vendor": "MUA & Wardrobe", "status": "Menunggu", "catatan": "Siapkan sarapan ringan & kopi"}, {"id": "RD-R32", "rowIndex": 32, "no": 2, "waktu": "06.00 - 07.00", "durasi": "60 mnt", "sesi": "MUA & Wardrobe CPP", "deskripsi": "Fitting beskap & grooming pengantin pria dan keluarga", "lokasi": "Ruang Rias Pria", "pic": "Bestman", "vendor": "Wardrobe Team", "status": "Menunggu", "catatan": "Pastikan peci, keris, dan selop siap"}, {"id": "RD-R33", "rowIndex": 33, "no": 3, "waktu": "06.30 - 07.15", "durasi": "45 mnt", "sesi": "Briefing Tim WO & Vendor", "deskripsi": "Final check sound system, mic akad, live streaming, dekorasi", "lokasi": "Main Hall Venue", "pic": "Wedding Organizer", "vendor": "Seluruh Vendor", "status": "Menunggu", "catatan": "Distribusi walkie talkie & rundown final"}, {"id": "RD-R34", "rowIndex": 34, "no": 4, "waktu": "07.15 - 07.45", "durasi": "30 mnt", "sesi": "Kedatangan Keluarga Besar", "deskripsi": "Penyambutan keluarga CPP dan penempatan di ruang tunggu", "lokasi": "Foyer / Ruang VIP", "pic": "Among Tamu", "vendor": "Venue / Catering", "status": "Menunggu", "catatan": "Morning tea & snack standby"}, {"id": "RD-R35", "rowIndex": 35, "no": 5, "waktu": "07.45 - 08.00", "durasi": "15 mnt", "sesi": "Prosesi Penyambutan CPP", "deskripsi": "Pengalungan ronce melati & penyerahan seserahan simbolis", "lokasi": "Pintu Masuk Akad", "pic": "MC & WO", "vendor": "WO & Dokumentasi", "status": "Menunggu", "catatan": "Bunga kalung disiapkan WO"}, {"id": "RD-R36", "rowIndex": 36, "no": 6, "waktu": "08.00 - 08.15", "durasi": "15 mnt", "sesi": "Pembukaan Akad Nikah", "deskripsi": "Pembacaan ayat suci Al-Qur'an dan khutbah nikah", "lokasi": "Meja Ijab Qabul", "pic": "MC & Qari", "vendor": "Sound System & MC", "status": "Menunggu", "catatan": "Meja akad, mikrofon, dan sound check"}, {"id": "RD-R37", "rowIndex": 37, "no": 7, "waktu": "08.15 - 08.45", "durasi": "30 mnt", "sesi": "Ijab Qabul & Doa Pasca Akad", "deskripsi": "Prosesi pengucapan ijab kabul, tanda tangan berkas & doa", "lokasi": "Meja Ijab Qabul", "pic": "Penghulu / KUA", "vendor": "KUA, Saksi, WO", "status": "Menunggu", "catatan": "Cek berkas KUA, mahar, dan mas kawin"}, {"id": "RD-R38", "rowIndex": 38, "no": 8, "waktu": "08.45 - 09.15", "durasi": "30 mnt", "sesi": "Penyerahan Mahar & Cincin", "deskripsi": "Penyerahan mahar, pemasangan cincin, & nasihat pernikahan", "lokasi": "Panggung Akad", "pic": "WO & MC", "vendor": "Dokumentasi & WO", "status": "Menunggu", "catatan": "Kotak mahar & cincin disiapkan"}, {"id": "RD-R39", "rowIndex": 39, "no": 9, "waktu": "09.15 - 09.45", "durasi": "30 mnt", "sesi": "Sungkeman & Doa Restu", "deskripsi": "Prosesi sungkem kepada orang tua dengan iringan lagu syahdu", "lokasi": "Area Pelaminan", "pic": "MC & WO", "vendor": "Sound System & WO", "status": "Menunggu", "catatan": "Siapkan tisu dan bantalan sungkem"}, {"id": "RD-R40", "rowIndex": 40, "no": 10, "waktu": "09.45 - 10.30", "durasi": "45 mnt", "sesi": "Sesi Foto Keluarga Inti Akad", "deskripsi": "Foto resmi bersama orang tua, saksi, dan keluarga inti", "lokasi": "Pelaminan Akad", "pic": "Tim Dokumentasi", "vendor": "Foto & Video", "status": "Menunggu", "catatan": "Koordinator keluarga atur antrean foto"}, {"id": "RD-R41", "rowIndex": 41, "no": 11, "waktu": "10.30 - 11.15", "durasi": "45 mnt", "sesi": "Retouch MUA & Ganti Busana", "deskripsi": "Retouch makeup dan ganti busana resepsi kedua mempelai", "lokasi": "Ruang Rias Pengantin", "pic": "MUA & Wardrobe", "vendor": "MUA Team", "status": "Menunggu", "catatan": "Siapkan makan siang pengantin"}, {"id": "RD-R42", "rowIndex": 42, "no": 12, "waktu": "10.45 - 11.15", "durasi": "30 mnt", "sesi": "Check-in Catering & Dekorasi", "deskripsi": "Final food tasting display, pemanasan buffet, cek flow tamu", "lokasi": "Area Buffet & Pelaminan", "pic": "PIC Catering", "vendor": "Catering & Dekor", "status": "Menunggu", "catatan": "Cek piring, gelas, gubukan, dan VIP buffet"}, {"id": "RD-R43", "rowIndex": 43, "no": 13, "waktu": "11.15 - 11.30", "durasi": "15 mnt", "sesi": "Pembukaan Registrasi Resepsi", "deskripsi": "Registrasi tamu undangan dibuka, souvenir & check-in aktif", "lokasi": "Meja Penerima Tamu", "pic": "Penerima Tamu", "vendor": "WO & Buku Tamu", "status": "Menunggu", "catatan": "Meja angpao, spidol, gembok & souvenir"}, {"id": "RD-R44", "rowIndex": 44, "no": 14, "waktu": "11.30 - 11.45", "durasi": "15 mnt", "sesi": "Grand Entrance Pengantin", "deskripsi": "Kirab masuk pengantin didampingi bridesmaid & groomsmen", "lokasi": "Red Carpet / Foyer", "pic": "MC & WO", "vendor": "Musik & Lighting", "status": "Menunggu", "catatan": "Confetti / sparkular & alur red carpet"}, {"id": "RD-R45", "rowIndex": 45, "no": 15, "waktu": "11.45 - 12.00", "durasi": "15 mnt", "sesi": "Sambutan & Doa Makan", "deskripsi": "Sambutan perwakilan keluarga dan pembacaan doa berkah", "lokasi": "Panggung Pelaminan", "pic": "Jubir Keluarga", "vendor": "Sound System & MC", "status": "Menunggu", "catatan": "Mic wireless stand by di panggung"}, {"id": "RD-R46", "rowIndex": 46, "no": 16, "waktu": "12.00 - 13.00", "durasi": "60 mnt", "sesi": "Ramah Tamah & Live Music", "deskripsi": "Jamuan makan siang tamu diiringi penampilan live music akustik", "lokasi": "Dining Area & Stage", "pic": "Band Akustik", "vendor": "Catering & Band", "status": "Menunggu", "catatan": "Pantau ketersediaan menu stall/gubukan"}, {"id": "RD-R47", "rowIndex": 47, "no": 17, "waktu": "12.30 - 13.45", "durasi": "75 mnt", "sesi": "Sesi Foto Tamu & Ucapan Selamat", "deskripsi": "Tamu undangan naik ke pelaminan untuk selamat & foto bersama", "lokasi": "Pelaminan Utama", "pic": "WO Usher", "vendor": "Tim Dokumentasi", "status": "Menunggu", "catatan": "Alur antrean satu arah naik-turun pelaminan"}, {"id": "RD-R48", "rowIndex": 48, "no": 18, "waktu": "13.45 - 14.15", "durasi": "30 mnt", "sesi": "Lempar Buket & Mini Games", "deskripsi": "Interaksi pengantin dengan tamu, lempar buket & doorprize", "lokasi": "Center Stage Venue", "pic": "MC", "vendor": "MC & WO", "status": "Menunggu", "catatan": "Buket bunga pengantin & 3 doorprize"}, {"id": "RD-R49", "rowIndex": 49, "no": 19, "waktu": "14.15 - 14.30", "durasi": "15 mnt", "sesi": "Closing & Foto Vendor", "deskripsi": "Penutupan acara resepsi, foto bersama seluruh panitia & vendor", "lokasi": "Pelaminan Utama", "pic": "MC & WO", "vendor": "Seluruh Vendor", "status": "Menunggu", "catatan": "Musik penutup dan ucapan terima kasih"}, {"id": "RD-R50", "rowIndex": 50, "no": 20, "waktu": "14.30 - 16.00", "durasi": "90 mnt", "sesi": "Load Out & Serah Terima Barang", "deskripsi": "Pengecekan barang, pengamanan kotak angpao, load-out vendor", "lokasi": "Venue & Ruang VIP", "pic": "PIC Keluarga & WO", "vendor": "Security & Venue", "status": "Menunggu", "catatan": "Penghitungan & serah terima kotak angpao"}], "tamu": [{"id": "TM-CPP-FAM-R10", "rowIndex": 10, "side": "CPP", "kelompok": "Keluarga Inti", "no": 1, "kategori": "Ayah CPP", "nama": "A Sofyan Rasad", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-FAM-R10", "rowIndex": 10, "side": "CPW", "kelompok": "Keluarga Inti", "no": 1, "kategori": "Ayah CPW", "nama": "Agus Suparman", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPP-FAM-R11", "rowIndex": 11, "side": "CPP", "kelompok": "Keluarga Inti", "no": 2, "kategori": "Ibu CPP", "nama": "Zulhaidar", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-FAM-R11", "rowIndex": 11, "side": "CPW", "kelompok": "Keluarga Inti", "no": 2, "kategori": "Ibu CPW", "nama": "Yeni Indri Yani", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPP-FAM-R12", "rowIndex": 12, "side": "CPP", "kelompok": "Keluarga Inti", "no": 3, "kategori": "Saudara Kandung 1", "nama": "HIbaturrahman Riadhi", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-FAM-R12", "rowIndex": 12, "side": "CPW", "kelompok": "Keluarga Inti", "no": 3, "kategori": "Saudara Kandung 1", "nama": "Damara Gahdania", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPP-FAM-R13", "rowIndex": 13, "side": "CPP", "kelompok": "Keluarga Inti", "no": 4, "kategori": "Saudara Kandung 2", "nama": "Amalia Zhahrina", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-FAM-R13", "rowIndex": 13, "side": "CPW", "kelompok": "Keluarga Inti", "no": 4, "kategori": "Saudara Kandung 2", "nama": "Salsabila Ramadahani", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPP-FAM-R14", "rowIndex": 14, "side": "CPP", "kelompok": "Keluarga Inti", "no": 5, "kategori": "Saudara Ipar 1", "nama": "Deanaz Rizqi", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-FAM-R14", "rowIndex": 14, "side": "CPW", "kelompok": "Keluarga Inti", "no": 5, "kategori": "Saudara Kandung 3", "nama": "Chika Syafani Ramadahn", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-FAM-R15", "rowIndex": 15, "side": "CPW", "kelompok": "Keluarga Inti", "no": 6, "kategori": "Saudara Kandung 4", "nama": "M. Rif'at Syabil", "pax": 1, "statusUndangan": "Draft", "rsvp": "Hadir"}, {"id": "TM-CPW-GEN-R23", "rowIndex": 23, "side": "CPW", "kelompok": "Tamu Umum", "no": 1, "kategori": "Keluarga Besar", "nama": "Nenek (papa)", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R24", "rowIndex": 24, "side": "CPW", "kelompok": "Tamu Umum", "no": 2, "kategori": "Keluarga Besar", "nama": "Om Yanto & Bibi Elin", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R25", "rowIndex": 25, "side": "CPW", "kelompok": "Tamu Umum", "no": 3, "kategori": "Keluarga Besar", "nama": "Dewi & Rafa", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R26", "rowIndex": 26, "side": "CPW", "kelompok": "Tamu Umum", "no": 4, "kategori": "Keluarga Besar", "nama": "Nenek (mama)", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R27", "rowIndex": 27, "side": "CPW", "kelompok": "Tamu Umum", "no": 5, "kategori": "Keluarga Besar", "nama": "Wa Goam & Wa Titin", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R28", "rowIndex": 28, "side": "CPW", "kelompok": "Tamu Umum", "no": 6, "kategori": "Keluarga Besar", "nama": "Bang Genjos & Po Uul", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R29", "rowIndex": 29, "side": "CPW", "kelompok": "Tamu Umum", "no": 7, "kategori": "Keluarga Besar", "nama": "Bang Aga & Po Intan", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R30", "rowIndex": 30, "side": "CPW", "kelompok": "Tamu Umum", "no": 8, "kategori": "Keluarga Besar", "nama": "Fadli & Fadlan", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R31", "rowIndex": 31, "side": "CPW", "kelompok": "Tamu Umum", "no": 9, "kategori": "Keluarga Besar", "nama": "Wa Liyah", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R32", "rowIndex": 32, "side": "CPW", "kelompok": "Tamu Umum", "no": 10, "kategori": "Keluarga Besar", "nama": "Bang Aun & Teh Ria", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R33", "rowIndex": 33, "side": "CPW", "kelompok": "Tamu Umum", "no": 11, "kategori": "Keluarga Besar", "nama": "Bang Oman & Kk Dilah", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R34", "rowIndex": 34, "side": "CPW", "kelompok": "Tamu Umum", "no": 12, "kategori": "Keluarga Besar", "nama": "Nabila", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R35", "rowIndex": 35, "side": "CPW", "kelompok": "Tamu Umum", "no": 13, "kategori": "Keluarga Besar", "nama": "Wa Turi & Wa Pikoh", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R36", "rowIndex": 36, "side": "CPW", "kelompok": "Tamu Umum", "no": 14, "kategori": "Keluarga Besar", "nama": "Bang Yayang & Po Nur", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R37", "rowIndex": 37, "side": "CPW", "kelompok": "Tamu Umum", "no": 15, "kategori": "Keluarga Besar", "nama": "Bang Tahir & Po Ika", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R38", "rowIndex": 38, "side": "CPW", "kelompok": "Tamu Umum", "no": 16, "kategori": "Keluarga Besar", "nama": "Akbar & Kia", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R39", "rowIndex": 39, "side": "CPW", "kelompok": "Tamu Umum", "no": 17, "kategori": "Keluarga Besar", "nama": "Wa Rohmat & Po Ipah", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R40", "rowIndex": 40, "side": "CPW", "kelompok": "Tamu Umum", "no": 18, "kategori": "Keluarga Besar", "nama": "Bang Azam & Kk Mila", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R41", "rowIndex": 41, "side": "CPW", "kelompok": "Tamu Umum", "no": 19, "kategori": "Keluarga Besar", "nama": "Gilang & Raihan & Arifah", "pax": 3, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R42", "rowIndex": 42, "side": "CPW", "kelompok": "Tamu Umum", "no": 20, "kategori": "Keluarga Besar", "nama": "Wa Guntur & Wa Imah", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R43", "rowIndex": 43, "side": "CPW", "kelompok": "Tamu Umum", "no": 21, "kategori": "Keluarga Besar", "nama": "Bang Tama & Po Mega", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R44", "rowIndex": 44, "side": "CPW", "kelompok": "Tamu Umum", "no": 22, "kategori": "Keluarga Besar", "nama": "Bang Fajar & Po Uti", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R45", "rowIndex": 45, "side": "CPW", "kelompok": "Tamu Umum", "no": 23, "kategori": "Keluarga Besar", "nama": "Wa Jajang & Wa Yuli", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R46", "rowIndex": 46, "side": "CPW", "kelompok": "Tamu Umum", "no": 24, "kategori": "Keluarga Besar", "nama": "Afwan & Nisa", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R47", "rowIndex": 47, "side": "CPW", "kelompok": "Tamu Umum", "no": 25, "kategori": "Keluarga Besar", "nama": "Naila & Hanif", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R48", "rowIndex": 48, "side": "CPW", "kelompok": "Tamu Umum", "no": 26, "kategori": "Keluarga Besar", "nama": "Cing Anwar & Cing Komar", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R49", "rowIndex": 49, "side": "CPW", "kelompok": "Tamu Umum", "no": 27, "kategori": "Keluarga Besar", "nama": "Adib & Kamila", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R50", "rowIndex": 50, "side": "CPW", "kelompok": "Tamu Umum", "no": 28, "kategori": "Keluarga Besar", "nama": "Cing Takin & Teh Hilda", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R51", "rowIndex": 51, "side": "CPW", "kelompok": "Tamu Umum", "no": 29, "kategori": "Keluarga Besar", "nama": "Nazran", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R52", "rowIndex": 52, "side": "CPW", "kelompok": "Tamu Umum", "no": 30, "kategori": "Keluarga Besar", "nama": "Cing Roup", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R53", "rowIndex": 53, "side": "CPW", "kelompok": "Tamu Umum", "no": 31, "kategori": "Keluarga Besar", "nama": "Noval & Abyan & Gelsi", "pax": 3, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R54", "rowIndex": 54, "side": "CPW", "kelompok": "Tamu Umum", "no": 32, "kategori": "Rekan Kerja & Kolega Kantor", "nama": "Pak Wawan & Istri", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R55", "rowIndex": 55, "side": "CPW", "kelompok": "Tamu Umum", "no": 33, "kategori": "Rekan Kerja & Kolega Kantor", "nama": "Pak Sugi & Istri", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R56", "rowIndex": 56, "side": "CPW", "kelompok": "Tamu Umum", "no": 34, "kategori": "Rekan Kerja & Kolega Kantor", "nama": "Kk Lia & Suami", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R57", "rowIndex": 57, "side": "CPW", "kelompok": "Tamu Umum", "no": 35, "kategori": "Rekan Kerja & Kolega Kantor", "nama": "Ka Indira & Bf", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R58", "rowIndex": 58, "side": "CPW", "kelompok": "Tamu Umum", "no": 36, "kategori": "Rekan Kerja & Kolega Kantor", "nama": "Etc", "pax": 15, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R59", "rowIndex": 59, "side": "CPW", "kelompok": "Tamu Umum", "no": 37, "kategori": "Kerabat", "nama": "Tante Maya & Bila & Rey", "pax": 3, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R60", "rowIndex": 60, "side": "CPW", "kelompok": "Tamu Umum", "no": 38, "kategori": "Tetangga & Lingkungan", "nama": "Tante Yuni", "pax": 1, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R88", "rowIndex": 88, "side": "CPW", "kelompok": "Tamu Umum", "no": 66, "kategori": "Sahabat & Teman Dekat", "nama": "Zulfa & Suami", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R89", "rowIndex": 89, "side": "CPW", "kelompok": "Tamu Umum", "no": 67, "kategori": "Sahabat & Teman Dekat", "nama": "Angel & Suami", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R90", "rowIndex": 90, "side": "CPW", "kelompok": "Tamu Umum", "no": 68, "kategori": "Sahabat & Teman Dekat", "nama": "Yessy & Bf", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R91", "rowIndex": 91, "side": "CPW", "kelompok": "Tamu Umum", "no": 69, "kategori": "Sahabat & Teman Dekat", "nama": "Diva & Bf", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R92", "rowIndex": 92, "side": "CPW", "kelompok": "Tamu Umum", "no": 70, "kategori": "teman", "nama": "Tata & Bf", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R93", "rowIndex": 93, "side": "CPW", "kelompok": "Tamu Umum", "no": 71, "kategori": "teman", "nama": "Ka Ova & Ka Anggi", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R94", "rowIndex": 94, "side": "CPW", "kelompok": "Tamu Umum", "no": 72, "kategori": "Sahabat & Teman Dekat", "nama": "Alfina & Mama", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}, {"id": "TM-CPW-GEN-R95", "rowIndex": 95, "side": "CPW", "kelompok": "Tamu Umum", "no": 73, "kategori": "teman", "nama": "Dewi & Bf", "pax": 2, "statusUndangan": "Draft", "rsvp": "Belum Konfirmasi"}]};

  const CHECKLIST_ITEMS = [
    { id: 'c1', text: 'Perbarui Code.gs v2 di Extensions > Apps Script lalu klik Deploy > Manage deployments > Edit > New version.' },
    { id: 'c2', text: 'Pastikan Tanggal Akad di aplikasi sudah otomatis tampil Minggu, 27 Juni 2027 sesuai sel MASTER!D6.' },
    { id: 'c3', text: 'Pastikan Target Saham BSSR di modul Mahar sudah tampil 27 Lot (2.700 Lembar) dengan realisasi 13 Lot.' },
    { id: 'c4', text: 'Pastikan jumlah item aktif di tab Pre-Wedding tampil 16 Item (13 item Tidak Digunakan otomatis disembunyikan).' },
    { id: 'c5', text: 'Uji tombol tengah "UPDATE" dan tombol "Salin Format WA Panitia" di tab Acara & WO.' },
    { id: 'c6', text: 'Uji tombol "Akses PIN" di kanan atas untuk beralih antara Mode Mempelai dan Mode Panitia.' }
  ];

  let state = {
    data: JSON.parse(JSON.stringify(DEFAULT_DATA)),
    role: 'committee', // Default aman: terkunci saat pertama dibuka
    activeTab: 'master',
    previousTab: 'master',
    activeSubMod: 'tracker', // 'tracker' | 'prewed' | 'seserahan' | 'mahar'
    showUnusedItems: false,  // Default: sembunyikan item berstatus "Tidak Digunakan" agar jumlah list = jumlah item aktif
    activeGuestSubView: 'tamu',
    activeGuestTab: 'all',
    activeVendorSubView: 'rundown',
    config: {
      scriptUrl: getGasEndpoint(),
      pin: '270627'
    },
    guestExtras: {},
    checklist: {}
  };

  let pillarChart = null;
  let shareChart = null;

  function isItemUnused(item) {
    if (!item) return false;
    const st = String(item.status || '').trim().toLowerCase();
    return st === 'tidak digunakan' || st.indexOf('tidak digunakan') !== -1 || st === 'batal' || st.indexOf('dibatalkan') !== -1;
  }

  function parseSafeWeddingDate(raw) {
    // Fallback default: Minggu, 27 Juni 2027 (Bulan index 5 = Juni)
    const fallback = new Date(2027, 5, 27, 8, 0, 0);
    if (!raw) return fallback;
    if (raw instanceof Date && !isNaN(raw.getTime())) return raw;

    try {
      const str = String(raw).trim();
      // Format ISO: YYYY-MM-DD
      const iso = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (iso) {
        const y = parseInt(iso[1], 10);
        const m = parseInt(iso[2], 10) - 1;
        const d = parseInt(iso[3], 10);
        const dt = new Date(y, m, d, 8, 0, 0);
        if (!isNaN(dt.getTime())) return dt;
      }

      // Format teks Indo: misal "27 Juni 2027" atau "Minggu, 27 Juni 2027"
      const indo = str.match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/);
      if (indo) {
        const d = parseInt(indo[1], 10);
        const mName = indo[2].toLowerCase();
        const y = parseInt(indo[3], 10);
        const months = {
          januari: 0, jan: 0, februari: 1, feb: 1, maret: 2, mar: 2,
          april: 3, apr: 3, mei: 4, may: 4, juni: 5, jun: 5,
          juli: 6, jul: 6, agustus: 7, agu: 7, ags: 7,
          september: 8, sep: 8, oktober: 9, okt: 9,
          november: 10, nov: 10, desember: 11, des: 11
        };
        const m = months[mName] !== undefined ? months[mName] : 5;
        const dt = new Date(y, m, d, 8, 0, 0);
        if (!isNaN(dt.getTime())) return dt;
      }
    } catch (e) {}
    return fallback;
  }

  function formatTanggalIndo(isoDateStr) {
    if (!isoDateStr) return 'Minggu, 27 Juni 2027';
    try {
      const dt = parseSafeWeddingDate(isoDateStr);
      if (!isNaN(dt.getTime())) {
        const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][dt.getDay()];
        const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][dt.getMonth()];
        return hari + ', ' + dt.getDate() + ' ' + bulan + ' ' + dt.getFullYear();
      }
    } catch (e) {}
    return 'Minggu, 27 Juni 2027';
  }

  function loadLocalState() {
    try {
      // Hapus cache v1/v2 lama yang menyebabkan data nyangkut
      localStorage.removeItem('farhan_indira_wedding_data_v1');
      localStorage.removeItem('farhan_indira_wedding_data_v2');

      const rawData = localStorage.getItem(STORAGE_KEY_DATA);
      if (rawData) {
        const parsed = JSON.parse(rawData);
        if (parsed && parsed.weddingTracker && parsed.meta) {
          state.data = parsed;
        }
      }
      const rawCfg = localStorage.getItem(STORAGE_KEY_CFG);
      const defaultEndpoint = getGasEndpoint();
      state.config.scriptUrl = defaultEndpoint;
      if (rawCfg) {
        const cfg = JSON.parse(rawCfg);
        state.config.pin = cfg.pin || '270627';
        state.role = (cfg.role === 'committee') ? 'committee' : 'couple';
      } else {
        state.config.pin = '270627';
        state.role = 'couple';
      }
      const rawExtras = localStorage.getItem(STORAGE_KEY_GUEST_EXTRAS);
      if (rawExtras) state.guestExtras = JSON.parse(rawExtras) || {};
      const rawChk = localStorage.getItem(STORAGE_KEY_CHK);
      if (rawChk) state.checklist = JSON.parse(rawChk) || {};
    } catch (e) {}
  }

  function saveLocalState() {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(state.data));
      localStorage.setItem(STORAGE_KEY_CFG, JSON.stringify({
        scriptUrl: getGasEndpoint(),
        pin: state.config.pin,
        role: state.role
      }));
      localStorage.setItem(STORAGE_KEY_GUEST_EXTRAS, JSON.stringify(state.guestExtras || {}));
      localStorage.setItem(STORAGE_KEY_CHK, JSON.stringify(state.checklist));
    } catch (e) {}
  }

  function mergeGuestExtras(guests) {
    const extras = state.guestExtras || {};
    (guests || []).forEach(function(g) {
      const k = (g.side || 'CPP') + '|' + String(g.nama || '').trim().toLowerCase();
      const ex = extras[g.id] || extras[k];
      if (ex) {
        if (!g.whatsapp && ex.whatsapp) g.whatsapp = ex.whatsapp;
        if (!g.instagram && ex.instagram) g.instagram = ex.instagram;
      }
    });
  }

  function cleanDisplayText(s) {
    return String(s || '')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u2610\u2713]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function formatRp(num) {
    if (state.role === 'committee') return 'Privasi';
    const n = Math.round(Number(num) || 0);
    return 'Rp ' + Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatDots(num) {
    const n = Math.round(Math.abs(Number(num) || 0));
    return n === 0 ? '0' : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function parseDigits(str) {
    const d = String(str || '').replace(/[^0-9]/g, '');
    return d ? parseInt(d, 10) : 0;
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg, isError) {
    const box = document.getElementById('toastBox');
    if (!box) return;
    const el = document.createElement('div');
    el.className = 'px-4 py-3 rounded-full shadow-lg text-xs font-medium animate-slide-up ' +
      (isError ? 'bg-[#991B1B] text-white' : 'bg-[#1C1917] text-white');
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(function() {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 3200);
  }

  function hideSplashScreen() {
    if (typeof window.dismissSplash === 'function') {
      window.dismissSplash();
    }
    const splash = document.getElementById('splash-screen') || document.getElementById('appSplashScreen') || document.querySelector('.splash-overlay');
    if (!splash) return;
    splash.style.setProperty('pointer-events', 'none', 'important');
    splash.style.opacity = '0';
    setTimeout(function() {
      try {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
        else splash.remove();
      } catch (e) {
        splash.style.setProperty('display', 'none', 'important');
        splash.style.setProperty('pointer-events', 'none', 'important');
        splash.classList.add('splash-hidden');
      }
    }, 200);
  }

  function recalculateMaharTargets() {
    const totals = { bssr: 0, emas: 0, tunai: 0 };
    const volumes = { bssr: 0, emas: 0, tunai: 0 };

    (state.data.maharLogs || []).forEach(function(log) {
      if (log.rowIndex === 29 || log.rowIndex === 30) return;
      if (/target\s*kuantitas/i.test(log.komponen || '') || /target\s*kuantitas/i.test(log.catatan || '') || /target\s*kuantitas/i.test(log.tanggal || '')) return;
      if (String(log.status || '').trim() === 'Selesai') {
        const k = String(log.komponen || '').trim();
        const tot = Number(log.totalRealisasi || 0);
        const vol = Number(log.volume || 0);
        if (/saham|bssr/i.test(k)) {
          totals.bssr += tot;
          volumes.bssr += vol;
        } else if (/emas|logam\s*mulia/i.test(k)) {
          totals.emas += tot;
          volumes.emas += vol;
        } else {
          totals.tunai += tot;
          volumes.tunai += vol;
        }
      }
    });

    (state.data.maharTargets || []).forEach(function(t) {
      if (t.instrumen.indexOf('Saham BSSR') !== -1 || /saham|bssr/i.test(t.instrumen)) {
        const qty = Number(t.targetJumlah || 27);
        t.targetJumlah = qty;
        t.satuan = 'Lot';
        t.realisasi = totals.bssr || 0;
        t.collectedVolume = volumes.bssr || 0;
        const lembar = Math.round(qty * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        t.spesifikasi = qty + ' Lot Saham Dividen (' + lembar + ' Lembar)';
        if (t.collectedVolume >= qty && qty > 0) t.status = 'Lengkap ✅';
        else if (t.collectedVolume > 0 || t.realisasi > 0) t.status = 'Sebagian ⏳';
        else t.status = 'Belum Ada ❌';
      } else if (t.instrumen.indexOf('Logam Mulia') !== -1 || /emas|logam\s*mulia/i.test(t.instrumen)) {
        const qty = Number(t.targetJumlah || 6);
        t.targetJumlah = qty;
        t.satuan = 'Gram';
        t.realisasi = totals.emas || 0;
        t.collectedVolume = volumes.emas || 0;
        t.spesifikasi = 'Akumulasi ' + qty + ' Gram Emas Hartadinata / Logam Mulia';
        if (t.collectedVolume >= qty && qty > 0) t.status = 'Lengkap ✅';
        else if (t.collectedVolume > 0 || t.realisasi > 0) t.status = 'Sebagian ⏳';
        else t.status = 'Belum Ada ❌';
      } else if (t.instrumen.indexOf('Uang Tunai') !== -1 || /uang|tunai/i.test(t.instrumen)) {
        const qty = Number(t.targetJumlah || 1);
        t.targetJumlah = qty;
        t.satuan = 'Paket';
        t.realisasi = totals.tunai || 0;
        t.collectedVolume = volumes.tunai || 0;
        if (t.realisasi >= (t.totalEstimasi || 2027000)) t.status = 'Lengkap ✅';
        else if (t.realisasi > 0) t.status = 'Sebagian ⏳';
        else t.status = 'Belum Ada ❌';
      }
    });
  }

  function updateSubmodTabCounts() {
    const activeWT = (state.data.weddingTracker || []).filter(function(i) { return !isItemUnused(i); });
    const activePW = (state.data.preWedding || []).filter(function(i) { return !isItemUnused(i); });
    const activeSS = (state.data.seserahan || []).filter(function(i) { return !isItemUnused(i); });

    const btnWT = document.getElementById('btnSubmodTracker');
    const btnPW = document.getElementById('btnSubmodPrewed');
    const btnSS = document.getElementById('btnSubmodSeserahan');

    const validMaharLogs = (state.data.maharLogs || []).filter(function(l) {
      if (l.rowIndex === 29 || l.rowIndex === 30) return false;
      if (/target\s*kuantitas/i.test(l.komponen || '') || /target\s*kuantitas/i.test(l.catatan || '') || /target\s*kuantitas/i.test(l.tanggal || '')) return false;
      return true;
    });

    const btnMH = document.getElementById('btnSubmodMahar');
    if (btnWT) btnWT.textContent = 'Akad & Resepsi (' + activeWT.length + ')';
    if (btnPW) btnPW.textContent = 'Pre-Wedding (' + activePW.length + ')';
    if (btnSS) btnSS.textContent = 'Seserahan (' + activeSS.length + ')';
    if (btnMH) btnMH.textContent = 'Mahar (' + validMaharLogs.length + ')';
  }

  function computeMasterMetrics() {
    recalculateMaharTargets();
    updateSubmodTabCounts();

    const activeWT = (state.data.weddingTracker || []).filter(function(i) { return !isItemUnused(i); });
    const wtEst = activeWT.reduce(function(s, i) { return s + Number(i.estimasi || 0); }, 0);
    const wtReal = activeWT.reduce(function(s, i) { return s + Number(i.realisasi || 0); }, 0);
    const wtDone = activeWT.filter(function(i) { return String(i.status || '').indexOf('Selesai') === 0; }).length;

    const activePW = (state.data.preWedding || []).filter(function(i) { return !isItemUnused(i); });
    const pwEst = activePW.reduce(function(s, i) { return s + Number(i.estimasi || 0); }, 0);
    const pwReal = activePW.reduce(function(s, i) { return s + Number(i.realisasi || 0); }, 0);
    const pwDone = activePW.filter(function(i) { return String(i.status || '').indexOf('Selesai') === 0; }).length;

    const activeSS = (state.data.seserahan || []).filter(function(i) { return !isItemUnused(i); });
    const ssPagu = 20000000;
    const ssReal = activeSS.reduce(function(s, i) { return s + Number(i.harga || 0); }, 0);
    const ssDone = activeSS.filter(function(i) { return String(i.status || '').indexOf('Selesai') === 0; }).length;

    const maharTargetsList = state.data.maharTargets || [];
    const mhEst = maharTargetsList.reduce(function(s, i) { return s + Number(i.totalEstimasi || 0); }, 0);
    const mhReal = maharTargetsList.reduce(function(s, i) { return s + Number(i.realisasi || 0); }, 0);

    const adminList = state.data.administrasi || [];
    const adEst = adminList.reduce(function(s, i) { return s + Number(i.estimasi || 0); }, 0);
    const adReal = adminList.reduce(function(s, i) { return s + Number(i.realisasi || 0); }, 0);
    let kuaTotalSlots = 0;
    let kuaCheckedSlots = 0;
    adminList.forEach(function(a) {
      if (a.cppCheck !== 'NA') {
        kuaTotalSlots += 1;
        if (a.cppCheck === true) kuaCheckedSlots += 1;
      }
      if (a.cpwCheck !== 'NA') {
        kuaTotalSlots += 1;
        if (a.cpwCheck === true) kuaCheckedSlots += 1;
      }
    });

    let cppPax = 0;
    let cpwPax = 0;
    let hadirPax = 0;
    (state.data.tamu || []).forEach(function(g) {
      const p = Number(g.pax || 0);
      if (g.side === 'CPP') cppPax += p;
      else cpwPax += p;
      if (g.rsvp === 'Hadir') hadirPax += p;
    });

    const mf = state.data.masterFormulas;
    const totalPagu = (mf && mf.totalPaguNum > 0) ? mf.totalPaguNum : (wtEst + pwEst + ssPagu + mhEst + adEst);
    const totalReal = (mf && mf.totalRealNum > 0) ? mf.totalRealNum : (wtReal + pwReal + ssReal + mhReal + adReal);
    const sisa = (mf && mf.totalSisaNum !== undefined) ? mf.totalSisaNum : (totalPagu - totalReal);

    const bssrTargetObj = state.data.maharTargets.find(function(t) { return t.instrumen.indexOf('Saham BSSR') !== -1; });
    const bssrLotTarget = bssrTargetObj ? bssrTargetObj.targetJumlah : 27;

    const targetTotal = (state.data.meta && state.data.meta.targetPaxTotal) ? state.data.meta.targetPaxTotal : 500;
    const totalRegistered = cppPax + cpwPax;
    const registeredPct = targetTotal > 0 ? Math.round((totalRegistered / targetTotal) * 100) : 0;

    const p1Pagu = (mf && mf.pillars && mf.pillars.tracker) ? mf.pillars.tracker.pagu : wtEst;
    const p1Real = (mf && mf.pillars && mf.pillars.tracker) ? mf.pillars.tracker.real : wtReal;
    const p1Status = (mf && mf.pillars && mf.pillars.tracker) ? mf.pillars.tracker.statusText : (wtDone + ' / ' + activeWT.length + ' Selesai');
    const p1Pct = (mf && mf.pillars && mf.pillars.tracker) ? (parseInt(mf.pillars.tracker.pctStr, 10) || 0) : Math.round((wtDone / Math.max(1, activeWT.length)) * 100);

    const p2Pagu = (mf && mf.pillars && mf.pillars.prewed) ? mf.pillars.prewed.pagu : pwEst;
    const p2Real = (mf && mf.pillars && mf.pillars.prewed) ? mf.pillars.prewed.real : pwReal;
    const p2Status = (mf && mf.pillars && mf.pillars.prewed) ? mf.pillars.prewed.statusText : (pwDone + ' / ' + activePW.length + ' Item Aktif');
    const p2Pct = (mf && mf.pillars && mf.pillars.prewed) ? (parseInt(mf.pillars.prewed.pctStr, 10) || 0) : Math.round((pwDone / Math.max(1, activePW.length)) * 100);

    const p3Pagu = (mf && mf.pillars && mf.pillars.seserahan) ? mf.pillars.seserahan.pagu : ssPagu;
    const p3Real = (mf && mf.pillars && mf.pillars.seserahan) ? mf.pillars.seserahan.real : ssReal;
    const p3Status = (mf && mf.pillars && mf.pillars.seserahan) ? mf.pillars.seserahan.statusText : (ssDone + ' / ' + activeSS.length + ' Selesai');
    const p3Pct = (mf && mf.pillars && mf.pillars.seserahan) ? (parseInt(mf.pillars.seserahan.pctStr, 10) || 0) : Math.round((ssDone / Math.max(1, activeSS.length)) * 100);

    const p4Pagu = (mf && mf.pillars && mf.pillars.mahar) ? mf.pillars.mahar.pagu : mhEst;
    const p4Real = (mf && mf.pillars && mf.pillars.mahar) ? mf.pillars.mahar.real : mhReal;
    const p4Status = (mf && mf.pillars && mf.pillars.mahar) ? mf.pillars.mahar.statusText : ((mhEst > 0 ? ((mhReal / mhEst) * 100).toFixed(1) : 0) + '% Terkumpul');
    const p4Pct = (mf && mf.pillars && mf.pillars.mahar) ? (parseInt(mf.pillars.mahar.pctStr, 10) || 0) : (mhEst > 0 ? Math.round((mhReal / mhEst) * 100) : 0);

    const p5Pagu = (mf && mf.pillars && mf.pillars.administrasi) ? mf.pillars.administrasi.pagu : adEst;
    const p5Real = (mf && mf.pillars && mf.pillars.administrasi) ? mf.pillars.administrasi.real : adReal;
    const p5Status = (mf && mf.pillars && mf.pillars.administrasi) ? mf.pillars.administrasi.statusText : (kuaCheckedSlots + ' / ' + kuaTotalSlots + ' Berkas');
    const p5Pct = (mf && mf.pillars && mf.pillars.administrasi) ? (parseInt(mf.pillars.administrasi.pctStr, 10) || 0) : (kuaTotalSlots > 0 ? Math.round((kuaCheckedSlots / kuaTotalSlots) * 100) : 0);

    const p6Status = (mf && mf.pillars && mf.pillars.tamu) ? mf.pillars.tamu.statusText : (totalRegistered + ' / ' + targetTotal + ' Pax (Hadir: ' + hadirPax + ')');
    const p6SubText = (mf && mf.pillars && mf.pillars.tamu) ? (mf.pillars.tamu.cppAlloc + ' &bull; ' + mf.pillars.tamu.cpwAlloc) : ('CPP: ' + cppPax + ' Pax &bull; CPW: ' + cpwPax + ' Pax');
    const p6PaguText = (mf && mf.pillars && mf.pillars.tamu) ? ('Terdaftar: ' + mf.pillars.tamu.terdaftarText) : ('Target Kuota: ' + targetTotal + ' Pax');

    return {
      totalPagu: totalPagu,
      totalReal: totalReal,
      sisa: sisa,
      pillars: [
        { key: 'tracker', name: 'Wedding Tracker', pagu: p1Pagu, real: p1Real, statusText: p1Status, pct: p1Pct },
        { key: 'prewed', name: 'Pre-Wedding', pagu: p2Pagu, real: p2Real, statusText: p2Status, pct: p2Pct },
        { key: 'seserahan', name: 'Seserahan', pagu: p3Pagu, real: p3Real, statusText: p3Status, pct: p3Pct },
        { key: 'mahar', name: 'Tabungan & Mahar', pagu: p4Pagu, real: p4Real, statusText: p4Status, pct: p4Pct },
        { key: 'kua', name: 'Administrasi & KUA', pagu: p5Pagu, real: p5Real, statusText: p5Status, pct: p5Pct },
        { key: 'tamu', name: 'Buku Tamu & RSVP', pagu: targetTotal, real: totalRegistered, statusText: p6Status, subText: p6SubText, paguText: p6PaguText, pct: registeredPct, isGuest: true }
      ],
      kuaCheckedSlots: kuaCheckedSlots,
      kuaTotalSlots: kuaTotalSlots,
      cppPax: cppPax,
      cpwPax: cpwPax,
      hadirPax: hadirPax
    };
  }

  function applyRolePrivacyUI() {
    const isCommittee = state.role === 'committee';
    const badge = document.getElementById('roleBadge');
    const finHero = document.getElementById('masterFinanceHero');
    const privBanner = document.getElementById('committeePrivacyBanner');
    const chartsSec = document.getElementById('masterChartsSection');
    const btnMaharTab = document.getElementById('btnSubmodMahar');
    const editFinFields = document.getElementById('editFinancialFields');
    const vContract = document.getElementById('vendorTotalContractCard');
    const vRem = document.getElementById('vendorRemainingCard');

    if (isCommittee) {
      badge.textContent = 'Mode Panitia';
      badge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FBF5EB] text-[#8A5A19] border border-[#EBD9BC]';
      finHero.classList.add('hidden');
      privBanner.classList.remove('hidden');
      chartsSec.classList.add('hidden');
      btnMaharTab.classList.add('hidden');
      editFinFields.classList.add('hidden');
      vContract.classList.add('hidden');
      vRem.classList.add('hidden');
    } else {
      badge.textContent = 'Akses Mempelai';
      badge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
      finHero.classList.remove('hidden');
      privBanner.classList.add('hidden');
      chartsSec.classList.remove('hidden');
      btnMaharTab.classList.remove('hidden');
      editFinFields.classList.remove('hidden');
      vContract.classList.remove('hidden');
      vRem.classList.remove('hidden');

      const wPagu = document.getElementById('wrapperSectionPaguChart');
      const wShare = document.getElementById('wrapperSectionShareChart');
      const lblPagu = document.getElementById('labelToggleSectionPaguChart');
      const lblShare = document.getElementById('labelToggleSectionShareChart');
      if (wPagu) wPagu.classList.remove('hidden');
      if (wShare) wShare.classList.remove('hidden');
      if (lblPagu) lblPagu.textContent = 'Sembunyikan';
      if (lblShare) lblShare.textContent = 'Sembunyikan';
    }
  }

  function updateCountdownDisplay() {
    try {
      const metaDate = state.data && state.data.meta && state.data.meta.weddingDate;
      const targetDate = parseSafeWeddingDate(metaDate).getTime();
      const today = new Date().getTime();
      const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      const countdownElement = document.getElementById('countdownBadge') ||
                               document.getElementById('countdown-text') ||
                               document.getElementById('countdown-badge') ||
                               document.querySelector('.countdown') ||
                               document.querySelector('[data-countdown]');
      if (countdownElement) {
        countdownElement.textContent = (diffDays > 0 ? diffDays : 0) + ' Hari Menuju Acara';
      }
    } catch (eCd) {}
  }

  function renderMasterDashboard() {
    const meta = state.data.meta || {};
    const wDateIso = meta.weddingDate || '2027-06-27';
    const wDateFormatted = formatTanggalIndo(wDateIso);
    const venueStr = meta.venue || 'Venue Intimate';
    const targetStr = meta.targetReady || 'April 2027';

    const heroNames = document.getElementById('heroCoupleNames');
    if (heroNames) {
      heroNames.innerHTML = escapeHtml(meta.cpp || 'Farhan Rafiqi') + ' <span class="italic font-normal text-[#9A7B4F]">&amp;</span> ' + escapeHtml(meta.cpw || 'Indira Gusti');
    }
    const titleHdr = document.getElementById('headerCoupleTitle');
    if (titleHdr) titleHdr.textContent = (meta.cpp || 'FARHAN RAFIQI') + ' & ' + (meta.cpw || 'INDIRA GUSTI');

    const hdrDate = document.getElementById('headerWeddingDateText');
    if (hdrDate) hdrDate.textContent = wDateFormatted;
    const heroDate = document.getElementById('heroWeddingDateText');
    if (heroDate) heroDate.textContent = wDateFormatted;
    const heroVenue = document.getElementById('heroVenueText');
    if (heroVenue) heroVenue.textContent = venueStr;
    const heroTarget = document.getElementById('heroTargetText');
    if (heroTarget) heroTarget.textContent = targetStr;
    const rdSubtitle = document.getElementById('rundownDateVenueSubtitle');
    if (rdSubtitle) rdSubtitle.textContent = wDateFormatted + ' • ' + venueStr;

    try {
      updateCountdownDisplay();
    } catch (eCd) {}

    const m = computeMasterMetrics();
    const hasFormula = Boolean(state.data.masterFormulas);

    const totalPaguDisplay = (hasFormula && state.data.masterFormulas.totalPaguStr) ? state.data.masterFormulas.totalPaguStr : formatRp(m.totalPagu);
    const totalRealDisplay = (hasFormula && state.data.masterFormulas.totalRealStr) ? state.data.masterFormulas.totalRealStr : formatRp(m.totalReal);
    const totalSisaDisplay = (hasFormula && state.data.masterFormulas.totalSisaStr) ? state.data.masterFormulas.totalSisaStr : formatRp(m.sisa);
    const pctSerapan = m.totalPagu > 0 ? ((m.totalReal / m.totalPagu) * 100).toFixed(1) : '0.0';
    const serapanDisplay = (hasFormula && state.data.masterFormulas.serapanPctStr) ? state.data.masterFormulas.serapanPctStr : (pctSerapan + '%');

    const budgetPctEl = document.getElementById('budgetProgressPercent');
    if (budgetPctEl) {
      budgetPctEl.textContent = serapanDisplay;
    }
    const budgetCircleEl = document.getElementById('budgetProgressCircle');
    if (budgetCircleEl) {
      const numPct = Math.min(100, Math.max(0, Number(pctSerapan)));
      budgetCircleEl.setAttribute('stroke-dasharray', numPct + ', 100');
    }

    document.getElementById('kpiTotalPagu').textContent = state.role === 'committee' ? 'Privasi' : totalPaguDisplay;
    document.getElementById('kpiTotalRealisasi').textContent = state.role === 'committee' ? 'Privasi' : totalRealDisplay;
    document.getElementById('kpiSerapanPct').textContent = serapanDisplay;
    document.getElementById('kpiSisaAnggaran').textContent = state.role === 'committee' ? 'Privasi' : totalSisaDisplay;

    const grid = document.getElementById('masterModuleCardsGrid');
    grid.innerHTML = m.pillars.map(function(p) {
      if (state.role === 'committee' && p.key === 'mahar') return '';
      const rightMetric = p.isGuest
        ? m.cppPax + ' CPP · ' + m.cpwPax + ' CPW'
        : (state.role === 'couple' ? formatRp(p.real) : '');

      return (
        '<button type="button" data-jump="' + p.key + '" class="jump-card-btn rounded-2xl p-5 text-left border border-[#EAE6DF] bg-[#FFFFFF] hover:bg-[#EFECE6]/50 transition flex flex-col justify-between group active:scale-[0.99]">' +
          '<div class="w-full flex items-center justify-between gap-2">' +
            '<span class="text-sm font-semibold text-[#1C1917] group-hover:text-[#2C4237] truncate transition">' + escapeHtml(p.name) + '</span>' +
            '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0] font-tabular shrink-0">' + p.pct + '%</span>' +
          '</div>' +
          '<div class="w-full mt-4 space-y-2">' +
            '<div class="flex items-baseline justify-between gap-2 text-xs font-tabular">' +
              '<span class="font-semibold text-[#1C1917] truncate">' + escapeHtml(cleanDisplayText(p.statusText)) + '</span>' +
              (rightMetric ? '<span class="text-[#57534E] shrink-0">' + rightMetric + '</span>' : '') +
            '</div>' +
            '<div class="w-full h-1 rounded-full bg-[#EAE6DF] overflow-hidden">' +
              '<div class="h-full bg-[#2C4237] rounded-full transition-all duration-500" style="width:' + Math.max(4, Math.min(100, p.pct)) + '%"></div>' +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    if (state.role === 'couple' && window.Chart) {
      const finPillars = m.pillars.slice(0, 5);
      const ctxBar = document.getElementById('budgetPillarChart');
      if (ctxBar) {
        if (pillarChart) {
          try { pillarChart.destroy(); } catch(e) {}
          pillarChart = null;
        }
        try {
          pillarChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
              labels: ['Akad/Resepsi', 'Pre-Wed', 'Seserahan', 'Mahar', 'Admin KUA'],
              datasets: [
                {
                  label: 'Pagu Anggaran',
                  data: finPillars.map(function(p) { return p.pagu; }),
                  backgroundColor: '#EAE6DF',
                  borderColor: '#D6D1C7',
                  borderWidth: 1,
                  borderRadius: 6
                },
                {
                  label: 'Realisasi Aktual',
                  data: finPillars.map(function(p) { return p.real; }),
                  backgroundColor: '#2C4237',
                  borderRadius: 6
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 300 },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: '#EAE6DF' },
                  ticks: {
                    color: '#78716C',
                    font: { size: 10, weight: '600' },
                    callback: function(v) { return 'Rp' + (v / 1000000).toFixed(0) + 'jt'; }
                  }
                },
                x: {
                  grid: { display: false },
                  ticks: { color: '#57534E', font: { size: 10, weight: '600' } }
                }
              },
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 10, color: '#57534E', font: { size: 11, weight: '600' } } },
                tooltip: {
                  callbacks: {
                    label: function(c) { return ' ' + c.dataset.label + ': ' + formatRp(c.raw); }
                  }
                }
              }
            }
          });
        } catch(e) {}
      }

      const ctxShare = document.getElementById('realisasiShareChart');
      if (ctxShare) {
        if (shareChart) {
          try { shareChart.destroy(); } catch(e) {}
          shareChart = null;
        }
        try {
          shareChart = new Chart(ctxShare, {
            type: 'doughnut',
            data: {
              labels: ['Akad & Resepsi', 'Pre-Wedding', 'Seserahan', 'Mahar', 'Admin KUA'],
              datasets: [{
                data: finPillars.map(function(p) { return p.real; }),
                backgroundColor: ['#2C4237', '#9A7B4F', '#5B7A67', '#C4A476', '#991B1B'],
                borderWidth: 2,
                borderColor: '#FFFFFF'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 300 },
              cutout: '64%',
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 10, color: '#57534E', font: { size: 11, weight: '600' } } },
                tooltip: {
                  callbacks: {
                    label: function(c) { return ' ' + c.label + ': ' + formatRp(c.raw); }
                  }
                }
              }
            }
          });
        } catch(e) {}
      }

      const listEl = document.getElementById('pillarConsolidationList');
      if (listEl) {
        listEl.innerHTML = finPillars.map(function(p) {
          return (
            '<div class="flex items-center justify-between text-xs py-2.5 border-b border-[#EAE6DF] last:border-0">' +
              '<span class="font-semibold text-[#1C1917] truncate">' + escapeHtml(p.name) + '</span>' +
              '<div class="flex items-center gap-2 font-tabular shrink-0">' +
                '<span class="text-[#2C4237] font-bold">' + formatRp(p.real) + '</span>' +
                '<span class="text-[#78716C] font-medium text-[11px]">(' + (p.pagu > 0 ? ((p.real / p.pagu) * 100).toFixed(0) : '0') + '%)</span>' +
              '</div>' +
            '</div>'
          );
        }).join('');
      }
    }
  }

  function populateModuleFilters() {
    const filterBar = document.getElementById('moduleFilterBar');
    if (state.activeSubMod === 'mahar') {
      filterBar.classList.add('hidden');
      return;
    }
    filterBar.classList.remove('hidden');

    let source = [];
    if (state.activeSubMod === 'tracker') source = state.data.weddingTracker;
    else if (state.activeSubMod === 'prewed') source = state.data.preWedding;
    else if (state.activeSubMod === 'seserahan') source = state.data.seserahan;

    const cats = {};
    const statuses = {};
    source.forEach(function(item) {
      if (item.kategori) cats[item.kategori] = true;
      if (item.status) statuses[String(item.status).trim()] = true;
    });

    const catSel = document.getElementById('moduleCategoryFilter');
    catSel.innerHTML = '<option value="all">Semua Kategori (' + Object.keys(cats).length + ')</option>' +
      Object.keys(cats).map(function(c) { return '<option value="' + escapeHtml(c) + '">' + escapeHtml(c) + '</option>'; }).join('');

    const stSel = document.getElementById('moduleStatusFilter');
    stSel.innerHTML = '<option value="all">Semua Status Aktif</option>' +
      Object.keys(statuses).map(function(s) { return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + '</option>'; }).join('');
  }

  function renderModuleView() {
    updateSubmodTabCounts();
    const container = document.getElementById('moduleItemsContainer');
    if (!container) return;

    if (state.activeSubMod === 'mahar') {
      renderMaharView(container);
      return;
    }

    const q = (document.getElementById('moduleSearchInput').value || '').trim().toLowerCase();
    const catF = document.getElementById('moduleCategoryFilter').value || 'all';
    const stF = document.getElementById('moduleStatusFilter').value || 'all';

    let list = [];
    let modKey = 'weddingTracker';
    if (state.activeSubMod === 'tracker') {
      list = state.data.weddingTracker;
      modKey = 'weddingTracker';
    } else if (state.activeSubMod === 'prewed') {
      list = state.data.preWedding;
      modKey = 'preWedding';
    } else if (state.activeSubMod === 'seserahan') {
      list = state.data.seserahan;
      modKey = 'seserahan';
    }

    const totalUnusedInMod = list.filter(function(item) { return isItemUnused(item); }).length;
    const totalActiveInMod = list.length - totalUnusedInMod;
    const unusedBar = document.getElementById('unusedItemsToggleBar');
    const unusedInfo = document.getElementById('unusedItemsInfoText');
    const btnToggleUnused = document.getElementById('btnToggleShowUnused');

    if (unusedBar && unusedInfo && btnToggleUnused) {
      if (totalUnusedInMod > 0) {
        unusedBar.classList.remove('hidden');
        if (state.showUnusedItems) {
          unusedInfo.textContent = list.length + ' item';
          btnToggleUnused.textContent = 'Sembunyikan Nonaktif (' + totalUnusedInMod + ')';
        } else {
          unusedInfo.textContent = totalActiveInMod + ' item aktif';
          btnToggleUnused.textContent = 'Lihat Nonaktif (' + totalUnusedInMod + ')';
        }
      } else {
        unusedBar.classList.add('hidden');
      }
    }

    const filtered = list.filter(function(item) {
      const unused = isItemUnused(item);
      if (unused && !state.showUnusedItems && stF.toLowerCase().indexOf('tidak digunakan') === -1) {
        return false;
      }
      if (catF !== 'all' && item.kategori !== catF) return false;
      if (stF !== 'all' && String(item.status || '').trim() !== stF) return false;
      if (q) {
        const hay = (item.item + ' ' + item.kategori + ' ' + (item.pic || item.brand || '') + ' ' + (item.catatan || '')).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div class="rounded-2xl p-8 text-center text-xs text-[#78716C] bg-[#FFFFFF] border border-[#EAE6DF]">Tidak ada item yang cocok dengan filter.</div>';
      return;
    }

    container.innerHTML = filtered.map(function(item) {
      const isSeserahan = (modKey === 'seserahan');
      const isInactive = isItemUnused(item);
      const isDone = item.status === 'Selesai' || String(item.status || '').indexOf('Selesai') === 0 || item.status.indexOf('Deal') !== -1;
      const badgeDot = isInactive ? 'status-dot-slate' : (isDone ? 'status-dot-emerald' : (item.status.indexOf('Proses') !== -1 ? 'status-dot-amber' : 'status-dot-slate'));
      const badgeCls = isInactive
        ? 'bg-[#F3F1EC] text-[#78716C] border border-[#EAE6DF]'
        : isDone
        ? 'bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]'
        : item.status.indexOf('Proses') !== -1
        ? 'bg-[#FBF5EB] text-[#8A5A19] border border-[#EBD9BC]'
        : 'bg-[#F3F1EC] text-[#57534E] border border-[#EAE6DF]';

      const priceHtml = isSeserahan
        ? '<p class="text-xs sm:text-sm font-bold text-[#1C1917] font-tabular">' + formatRp(item.harga) + '</p>' +
          '<p class="text-[11px] text-[#78716C]">' + escapeHtml(item.brand || '-') + '</p>'
        : '<p class="text-xs sm:text-sm font-bold text-[#1C1917] font-tabular">' + formatRp(item.realisasi) + '</p>' +
          '<p class="text-[11px] text-[#78716C] font-tabular">Est: ' + formatRp(item.estimasi) + '</p>';

      return (
        '<div class="rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-3 border border-[#EAE6DF] bg-[#FFFFFF] hover:bg-[#EFECE6]/40 transition shadow-[0_2px_10px_rgba(28,25,23,0.03)] ' + (isInactive ? 'opacity-50' : '') + '">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5 flex-wrap">' +
              '<span class="px-2.5 py-0.5 rounded-full bg-[#F3F1EC] text-[#57534E] border border-[#EAE6DF] text-[11px] font-medium">' + escapeHtml(item.kategori) + '</span>' +
              '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ' + badgeCls + '"><span class="status-dot ' + badgeDot + '"></span>' + escapeHtml(cleanDisplayText(item.status)) + '</span>' +
            '</div>' +
            '<p class="text-sm font-semibold text-[#1C1917] mt-1.5">' + escapeHtml(item.item) + '</p>' +
            '<p class="text-xs text-[#78716C] mt-0.5">' +
              (isSeserahan
                ? (item.link ? '<a href="' + escapeHtml(item.link) + '" target="_blank" rel="noopener noreferrer" class="text-[#2C4237] font-semibold hover:underline">Link Toko</a>' : '-')
                : 'PIC: <span class="text-[#57534E] font-medium">' + escapeHtml(item.pic || '-') + '</span>') +
            '</p>' +
          '</div>' +
          '<div class="text-right shrink-0 flex flex-col items-end gap-2">' +
            priceHtml +
            '<div class="flex items-center gap-1.5">' +
              (isSeserahan
                ? '<button type="button" data-toggleseserahan="' + item.id + '" class="min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 flex items-center justify-center ' + (item.status === 'Selesai' ? 'bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]' : 'bg-[#F3F1EC] text-[#57534E] hover:bg-[#EFECE6] border border-[#EAE6DF]') + '">' + (item.status === 'Selesai' ? 'Selesai' : 'Tandai') + '</button>'
                : '') +
              '<button type="button" data-editmod="' + modKey + '" data-editid="' + item.id + '" class="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] text-xs font-medium border border-[#EAE6DF] transition active:scale-95 flex items-center justify-center">Edit</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderMaharView(container) {
    recalculateMaharTargets();
    const totalEst = state.data.maharTargets.reduce(function(s, i) { return s + Number(i.totalEstimasi || 0); }, 0);
    const totalReal = state.data.maharTargets.reduce(function(s, i) { return s + Number(i.realisasi || 0); }, 0);
    const pct = totalEst > 0 ? ((totalReal / totalEst) * 100).toFixed(1) : '0.0';

    const dynamicSubparts = state.data.maharTargets.map(function(t) {
      if (/saham|bssr/i.test(t.instrumen)) return (t.targetJumlah || 27) + ' Lot BSSR';
      if (/emas|logam\s*mulia/i.test(t.instrumen)) return (t.targetJumlah || 6) + ' Gram Emas';
      return 'Tunai ' + formatRp(t.totalEstimasi);
    }).join(' · ');

    const targetsHtml = state.data.maharTargets.map(function(t) {
      let p = 0;
      let volProgress = '';
      if (t.targetJumlah > 0 && t.collectedVolume !== undefined) {
        p = Math.min(100, Math.round((t.collectedVolume / t.targetJumlah) * 100));
        volProgress = t.collectedVolume + ' / ' + t.targetJumlah + ' ' + escapeHtml(t.satuan);
      } else {
        p = t.totalEstimasi > 0 ? Math.min(100, Math.round((t.realisasi / t.totalEstimasi) * 100)) : 0;
        volProgress = t.targetJumlah + ' ' + escapeHtml(t.satuan);
      }
      const isLengkap = t.status === 'Selesai' || String(t.status || '').indexOf('Lengkap') !== -1;
      return (
        '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] space-y-3 shadow-[0_2px_10px_rgba(28,25,23,0.03)]">' +
          '<div class="flex items-start justify-between gap-2">' +
            '<div>' +
              '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold ' + (isLengkap ? 'bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]' : 'bg-[#FBF5EB] text-[#8A5A19] border border-[#EBD9BC]') + '">' + escapeHtml(cleanDisplayText(t.status)) + '</span>' +
              '<h4 class="text-sm font-semibold text-[#1C1917] mt-2">' + escapeHtml(t.instrumen) + '</h4>' +
              '<p class="text-xs text-[#78716C] mt-0.5 font-tabular">' + volProgress + '</p>' +
            '</div>' +
            '<div class="text-right shrink-0 font-tabular">' +
              '<p class="text-sm font-bold text-[#1C1917]">' + formatRp(t.realisasi) + '</p>' +
              '<p class="text-[11px] text-[#78716C]">Est: ' + formatRp(t.totalEstimasi) + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="space-y-1.5">' +
            '<div class="flex items-center justify-between text-[11px] text-[#78716C] font-tabular font-medium">' +
              '<span>Progress</span>' +
              '<span>' + p + '%</span>' +
            '</div>' +
            '<div class="w-full bg-[#EAE6DF] rounded-full h-1 overflow-hidden">' +
              '<div class="bg-[#2C4237] h-full rounded-full transition-all duration-500" style="width: ' + p + '%"></div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    const logsList = (state.data.maharLogs || []).filter(function(l) {
      if (l.rowIndex === 29 || l.rowIndex === 30) return false;
      if (/target\s*kuantitas/i.test(l.komponen || '') || /target\s*kuantitas/i.test(l.catatan || '') || /target\s*kuantitas/i.test(l.tanggal || '')) return false;
      return true;
    });

    const logsHtml = logsList.map(function(l) {
      const isSelesai = (String(l.status || '').trim() === 'Selesai');
      return (
        '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] flex items-center justify-between gap-3 flex-wrap shadow-[0_2px_10px_rgba(28,25,23,0.03)] hover:bg-[#EFECE6]/40 transition">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-2 flex-wrap">' +
              '<span class="text-sm font-semibold text-[#1C1917]">' + escapeHtml(l.komponen) + ' (' + l.volume + ' ' + escapeHtml(l.satuan) + ')</span>' +
              '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold ' + (isSelesai ? 'bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]' : 'bg-[#FBF5EB] text-[#8A5A19] border border-[#EBD9BC]') + '">' + escapeHtml(cleanDisplayText(l.status)) + '</span>' +
            '</div>' +
            '<p class="text-xs text-[#78716C] mt-1 font-tabular">' + escapeHtml(l.tanggal) + ' &bull; ' + escapeHtml(l.sumberDana || '-') + '</p>' +
          '</div>' +
          '<div class="text-right shrink-0 flex items-center gap-2">' +
            '<div class="text-right font-tabular mr-1">' +
              '<p class="text-sm font-bold text-[#1C1917]">' + formatRp(l.totalRealisasi) + '</p>' +
              '<p class="text-[11px] text-[#78716C]">@ ' + formatRp(l.hargaSatuan) + '</p>' +
            '</div>' +
            '<button type="button" data-togglemaharstatus="' + l.id + '" class="min-h-[40px] px-3 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 flex items-center justify-center ' + (isSelesai ? 'bg-[#ECF3EF] text-[#244233] border-[#C6DDD0]' : 'bg-[#F3F1EC] text-[#57534E] border-[#EAE6DF] hover:bg-[#EFECE6]') + '">' + (isSelesai ? 'Selesai' : 'Pending') + '</button>' +
            '<button type="button" data-editmaharlog="' + l.id + '" class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] text-xs font-medium border border-[#EAE6DF] transition active:scale-95 flex items-center justify-center">Edit</button>' +
            '<button type="button" data-deletemaharlog="' + l.id + '" class="min-h-[40px] min-w-[40px] p-2 rounded-full bg-[#FDF2F2] hover:bg-[#FBE4E4] text-[#991B1B] border border-[#F8D0D0] transition active:scale-95 flex items-center justify-center shrink-0" title="Hapus Catatan Mahar">' +
              '<i data-lucide="trash-2" stroke-width="1.5" class="w-4 h-4 text-[#991B1B]"></i>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    container.innerHTML = (
      '<div class="space-y-4">' +
        '<div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] flex items-center justify-between gap-3 flex-wrap">' +
          '<div>' +
            '<div class="flex items-center gap-2">' +
              '<h3 class="font-editorial text-lg font-medium text-[#1C1917]">Komposisi Mahar</h3>' +
              '<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0] font-tabular">' + pct + '%</span>' +
            '</div>' +
            '<p class="text-xs text-[#78716C] mt-1 font-tabular">' + escapeHtml(dynamicSubparts) + '</p>' +
          '</div>' +
          '<button type="button" id="btnOpenMaharPurchaseModal" class="min-h-[44px] px-4 py-2 rounded-full bg-[#2C4237] hover:bg-[#21332A] text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-95">' +
            '<i data-lucide="plus" stroke-width="1.5" class="w-4 h-4"></i><span>Log Pembelian</span>' +
          '</button>' +
        '</div>' +
        '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
          targetsHtml +
        '</div>' +
        '<div class="space-y-3">' +
          '<div class="flex items-center justify-between px-1">' +
            '<h4 class="font-editorial text-lg font-medium text-[#1C1917]">Riwayat Cicilan Mahar</h4>' +
            '<span class="text-xs font-medium text-[#78716C] font-tabular">' + logsList.length + ' Transaksi</span>' +
          '</div>' +
          '<div class="space-y-2.5">' +
            (logsHtml || '<div class="rounded-2xl p-6 text-center text-xs text-[#78716C] bg-[#FFFFFF] border border-[#EAE6DF]">Belum ada catatan transaksi mahar.</div>') +
          '</div>' +
        '</div>' +
      '</div>'
    );

    const btnAddLog = document.getElementById('btnOpenMaharPurchaseModal');
    if (btnAddLog) {
      btnAddLog.addEventListener('click', function() {
        openQuickStep2Form('mahar', null, null, 'direct_add');
      });
    }
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
  }

  function renderGuestsAndKua() {
    const m = computeMasterMetrics();
    const meta = state.data.meta || {};
    const targetTotal = Number(meta.targetPaxTotal) || 400;
    const targetCpp = Number(meta.targetPaxCpp) || 200;
    const targetCpw = Number(meta.targetPaxCpw) || 200;

    const totalPax = m.cppPax + m.cpwPax;
    const totalPct = targetTotal > 0 ? ((totalPax / targetTotal) * 100).toFixed(1) : '0.0';
    const sisaCpp = Math.max(0, targetCpp - m.cppPax);
    const sisaCpw = Math.max(0, targetCpw - m.cpwPax);

    document.getElementById('guestTotalPax').textContent = totalPax + ' / ' + targetTotal + ' Pax';
    document.getElementById('guestTotalPct').textContent = totalPct + '% dari kuota';
    document.getElementById('guestCppPax').textContent = m.cppPax + ' / ' + targetCpp + ' Pax';
    document.getElementById('guestCppRem').textContent = 'Sisa kuota: ' + sisaCpp;
    document.getElementById('guestCpwPax').textContent = m.cpwPax + ' / ' + targetCpw + ' Pax';
    document.getElementById('guestCpwRem').textContent = 'Sisa kuota: ' + sisaCpw;
    document.getElementById('guestHadirPax').textContent = m.hadirPax + ' Pax';

    // Update Interactive RSVP Ring & Progress Meter
    const rsvpPercentEl = document.getElementById('guestRsvpPercent');
    if (rsvpPercentEl) {
      rsvpPercentEl.textContent = totalPct + '%';
    }
    const rsvpCircleEl = document.getElementById('guestRsvpProgressCircle');
    if (rsvpCircleEl) {
      const circ = 2 * Math.PI * 34; // 213.63
      const offset = circ - (circ * Math.min(100, Number(totalPct)) / 100);
      rsvpCircleEl.style.strokeDashoffset = offset;
    }
    const rsvpBarEl = document.getElementById('guestRsvpProgressBar');
    if (rsvpBarEl) {
      rsvpBarEl.style.width = Math.min(100, Number(totalPct)) + '%';
    }

    // Perbarui teks & status aktif tab filter tamu
    document.querySelectorAll('.guest-tab-btn').forEach(function(b) {
      const gtab = b.getAttribute('data-guesttab');
      if (gtab === 'all') b.textContent = 'Semua (' + targetTotal + ')';
      else if (gtab === 'CPP') b.textContent = 'Pihak CPP (' + targetCpp + ')';
      else if (gtab === 'CPW') b.textContent = 'Pihak CPW (' + targetCpw + ')';

      if (gtab === state.activeGuestTab) {
        b.className = 'guest-tab-btn min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
      } else {
        b.className = 'guest-tab-btn min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
      }
    });

    const q = (document.getElementById('guestSearchInput').value || '').trim().toLowerCase();
    const rsvpF = document.getElementById('guestRsvpFilter').value || 'all';
    const catF = (document.getElementById('guestCategoryFilter') ? document.getElementById('guestCategoryFilter').value : 'all') || 'all';

    const filteredGuests = state.data.tamu.filter(function(g) {
      if (state.activeGuestTab === 'CPP' && g.side !== 'CPP') return false;
      if (state.activeGuestTab === 'CPW' && g.side !== 'CPW') return false;
      if (catF !== 'all') {
        if (catF.indexOf('Keluarga Inti') !== -1) {
          if (g.kelompok !== 'Keluarga Inti' && String(g.kategori || '').indexOf('Keluarga Inti') === -1) return false;
        } else if (g.kategori !== catF) {
          return false;
        }
      }
      if (rsvpF !== 'all' && g.rsvp !== rsvpF) return false;
      if (q) {
        const hay = (g.nama + ' ' + g.kategori + ' ' + g.side).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    const gContainer = document.getElementById('guestListContainer');
    if (filteredGuests.length === 0) {
      gContainer.innerHTML = '<div class="rounded-2xl p-6 text-center text-xs text-[#78716C] bg-[#FFFFFF] border border-[#EAE6DF]">Tidak ada tamu yang cocok dengan filter ini.</div>';
    } else {
      gContainer.innerHTML = filteredGuests.map(function(g) {
        const sideBadge = g.side === 'CPP'
          ? 'bg-[#ECF3EF] text-[#244233] border-[#C6DDD0]'
          : 'bg-[#FBF5EB] text-[#8A5A19] border-[#EBD9BC]';
        return (
          (function() {
            const rawPhone = String(g.whatsapp || '').replace(/[^0-9]/g, '');
            const waDigits = rawPhone ? (rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone) : '';
            const rawIg = String(g.instagram || '').replace(/[@\s]/g, '');
            const contactSub = (g.whatsapp ? 'WA: ' + escapeHtml(g.whatsapp) + ' ' : '') + (g.instagram ? '· IG: @' + escapeHtml(rawIg) : '');

            return (
              '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] space-y-3 transition hover:bg-[#EFECE6]/40">' +
                '<div class="flex items-start justify-between gap-2">' +
                  '<div class="min-w-0">' +
                    '<div class="flex items-center gap-2 flex-wrap">' +
                      '<span class="px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ' + sideBadge + '">' + g.side + '</span>' +
                      '<span class="text-sm font-semibold text-[#1C1917]">' + escapeHtml(g.nama) + '</span>' +
                      '<span class="px-2 py-0.5 rounded-full bg-[#F3F1EC] text-[#57534E] text-[11px] font-medium font-tabular border border-[#EAE6DF]">' + g.pax + ' Pax</span>' +
                    '</div>' +
                    '<p class="text-xs text-[#78716C] mt-1">' + escapeHtml(cleanDisplayText(g.kelompok)) + ' &bull; ' + escapeHtml(cleanDisplayText(g.kategori || '-')) + '</p>' +
                    (contactSub ? '<p class="text-xs text-[#57534E] mt-0.5 font-tabular">' + contactSub + '</p>' : '') +
                  '</div>' +
                  '<div class="flex items-center gap-1.5 shrink-0">' +
                    (waDigits ? '<a href="https://wa.me/' + waDigits + '" target="_blank" rel="noopener noreferrer" class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#ECF3EF] hover:bg-[#DDECE4] text-[#244233] border border-[#C6DDD0] text-xs font-semibold transition flex items-center justify-center active:scale-95">WA</a>' : '') +
                    '<button type="button" data-editguest="' + g.id + '" class="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] text-xs font-medium border border-[#EAE6DF] transition flex items-center justify-center active:scale-95">Edit</button>' +
                  '</div>' +
                '</div>' +
                '<div class="flex items-center justify-between pt-2.5 border-t border-[#EAE6DF] text-xs">' +
                  '<span class="text-xs font-medium text-[#78716C]">RSVP</span>' +
                  '<div class="flex items-center gap-1.5">' +
                    '<button type="button" data-rsvpid="' + g.id + '" data-rsvpval="Hadir" class="min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 flex items-center justify-center ' + (g.rsvp === 'Hadir' ? 'bg-[#2C4237] text-white' : 'bg-[#F3F1EC] text-[#57534E] hover:bg-[#EFECE6] border border-[#EAE6DF]') + '">Hadir</button>' +
                    '<button type="button" data-rsvpid="' + g.id + '" data-rsvpval="Ragu-ragu" class="min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 flex items-center justify-center ' + (g.rsvp === 'Ragu-ragu' ? 'bg-[#9A7B4F] text-white' : 'bg-[#F3F1EC] text-[#57534E] hover:bg-[#EFECE6] border border-[#EAE6DF]') + '">Ragu</button>' +
                    '<button type="button" data-rsvpid="' + g.id + '" data-rsvpval="Tidak Hadir" class="min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 flex items-center justify-center ' + (g.rsvp === 'Tidak Hadir' ? 'bg-[#991B1B] text-white' : 'bg-[#F3F1EC] text-[#57534E] hover:bg-[#EFECE6] border border-[#EAE6DF]') + '">Tidak</button>' +
                  '</div>' +
                '</div>' +
              '</div>'
            );
          })()
        );
      }).join('');
    }

    document.getElementById('kuaProgressBadge').textContent = m.kuaCheckedSlots + ' / ' + m.kuaTotalSlots + ' Berkas';
    const kuaContainer = document.getElementById('adminKuaContainer');
    kuaContainer.innerHTML = state.data.administrasi.map(function(a) {
      const cppBtn = a.cppCheck === 'NA'
        ? '<span class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#F3F1EC] text-[#78716C] text-xs font-medium border border-[#EAE6DF] flex items-center justify-center">CPP: —</span>'
        : '<button type="button" data-kuacheck="' + a.id + '" data-kuaside="cpp" class="min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 flex items-center justify-center ' + (a.cppCheck ? 'bg-[#ECF3EF] text-[#244233] border-[#C6DDD0]' : 'bg-[#F3F1EC] text-[#57534E] border-[#EAE6DF] hover:bg-[#EFECE6]') + '">' + (a.cppCheck ? 'CPP Siap' : 'Ceklis CPP') + '</button>';

      const cpwBtn = a.cpwCheck === 'NA'
        ? '<span class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#F3F1EC] text-[#78716C] text-xs font-medium border border-[#EAE6DF] flex items-center justify-center">CPW: —</span>'
        : '<button type="button" data-kuacheck="' + a.id + '" data-kuaside="cpw" class="min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 flex items-center justify-center ' + (a.cpwCheck ? 'bg-[#ECF3EF] text-[#244233] border-[#C6DDD0]' : 'bg-[#F3F1EC] text-[#57534E] border-[#EAE6DF] hover:bg-[#EFECE6]') + '">' + (a.cpwCheck ? 'CPW Siap' : 'Ceklis CPW') + '</button>';

      return (
        '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] flex items-start justify-between gap-3 flex-wrap">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-2">' +
              '<span class="px-2.5 py-0.5 rounded-full bg-[#F3F1EC] text-[#57534E] text-[11px] font-medium border border-[#EAE6DF]">' + escapeHtml(a.instansi) + '</span>' +
              '<span class="text-xs text-[#78716C]">' + escapeHtml(a.target || '-') + '</span>' +
            '</div>' +
            '<p class="text-sm font-semibold text-[#1C1917] mt-1.5">' + a.no + '. ' + escapeHtml(a.dokumen) + '</p>' +
          '</div>' +
          '<div class="flex items-center gap-1.5 shrink-0">' +
            cppBtn +
            cpwBtn +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderVendorsAndRundown() {
    const rdContainer = document.getElementById('subview-rundown');
    rdContainer.innerHTML = (state.data.rundown || []).map(function(r) {
      const stDot = r.status === 'Siap' || r.status === 'Selesai' ? 'status-dot-emerald' : (r.status === 'Dalam Proses' ? 'status-dot-amber' : 'status-dot-slate');
      const stCls = r.status === 'Siap' || r.status === 'Selesai'
        ? 'bg-[#ECF3EF] text-[#244233] border-[#C6DDD0]'
        : r.status === 'Dalam Proses'
        ? 'bg-[#FBF5EB] text-[#8A5A19] border-[#EBD9BC]'
        : 'bg-[#F3F1EC] text-[#57534E] border-[#EAE6DF]';
      return (
        '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] flex items-start justify-between gap-3 hover:bg-[#EFECE6]/40 transition">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-2 flex-wrap">' +
              '<span class="px-2.5 py-0.5 rounded-full bg-[#F3F1EC] text-[#1C1917] border border-[#EAE6DF] text-[11px] font-semibold font-tabular">' + escapeHtml(r.waktu) + ' (' + escapeHtml(r.durasi) + ')</span>' +
              '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ' + stCls + '"><span class="status-dot ' + stDot + '"></span>' + escapeHtml(cleanDisplayText(r.status)) + '</span>' +
              '<span class="text-xs text-[#78716C]">' + escapeHtml(r.lokasi) + '</span>' +
            '</div>' +
            '<p class="text-sm font-semibold text-[#1C1917] mt-1.5">' + r.no + '. ' + escapeHtml(r.sesi) + '</p>' +
            '<p class="text-xs text-[#78716C] mt-1">PIC: <span class="text-[#57534E] font-medium">' + escapeHtml(r.pic) + '</span> &bull; ' + escapeHtml(r.vendor) + '</p>' +
          '</div>' +
          '<div class="flex items-center gap-1.5 shrink-0">' +
            '<button type="button" data-togglerundown="' + r.id + '" class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#57534E] text-xs font-medium border border-[#EAE6DF] transition flex items-center justify-center active:scale-95">Status</button>' +
            '<button type="button" data-editrundown="' + r.id + '" class="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] text-xs font-medium border border-[#EAE6DF] transition flex items-center justify-center active:scale-95">Edit</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    const tlContainer = document.getElementById('subview-timeline');
    if (tlContainer && state.data.timeline) {
      tlContainer.innerHTML = (state.data.timeline || []).map(function(t) {
        const isSelesai = t.status === 'Selesai';
        const isProses = t.status === 'Dalam Proses';
        const stDot = isSelesai ? 'status-dot-emerald' : (isProses ? 'status-dot-amber' : 'status-dot-slate');
        const stCls = isSelesai
          ? 'bg-[#ECF3EF] text-[#244233] border-[#C6DDD0]'
          : isProses
          ? 'bg-[#FBF5EB] text-[#8A5A19] border-[#EBD9BC]'
          : 'bg-[#F3F1EC] text-[#57534E] border-[#EAE6DF]';
        return (
          '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] flex items-start justify-between gap-3 hover:bg-[#EFECE6]/40 transition">' +
            '<div class="min-w-0 flex-1">' +
              '<div class="flex items-center gap-2 flex-wrap">' +
                '<span class="px-2.5 py-0.5 rounded-full bg-[#F3F1EC] text-[#1C1917] border border-[#EAE6DF] text-[11px] font-semibold font-tabular">' + escapeHtml(t.fase) + '</span>' +
                '<span class="px-2.5 py-0.5 rounded-full bg-[#F9F8F6] text-[#57534E] border border-[#EAE6DF] text-[11px] font-medium">' + escapeHtml(t.kategori) + '</span>' +
                '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ' + stCls + '"><span class="status-dot ' + stDot + '"></span>' + escapeHtml(cleanDisplayText(t.status)) + '</span>' +
              '</div>' +
              '<p class="text-sm font-semibold text-[#1C1917] mt-1.5">' + t.no + '. ' + escapeHtml(t.agenda) + '</p>' +
              '<p class="text-xs text-[#78716C] mt-1">PIC: <span class="text-[#57534E] font-medium">' + escapeHtml(t.pic) + '</span>' + (t.target ? ' &bull; ' + escapeHtml(t.target) : '') + '</p>' +
            '</div>' +
            '<div class="flex items-center gap-1.5 shrink-0">' +
              '<button type="button" data-toggletimeline="' + t.id + '" class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#57534E] text-xs font-medium border border-[#EAE6DF] transition flex items-center justify-center active:scale-95">Status</button>' +
              '<button type="button" data-edittimeline="' + t.id + '" class="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] text-xs font-medium border border-[#EAE6DF] transition flex items-center justify-center active:scale-95">Edit</button>' +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    const vendorsList = state.data.vendors || [];
    const totalKontrak = vendorsList.reduce(function(s, v) { return s + Number(v.nilaiKontrak || 0); }, 0);
    const totalSisa = vendorsList.reduce(function(s, v) { return s + Number(v.sisaPembayaran || 0); }, 0);
    const dealCount = vendorsList.filter(function(v) { return (v.statusKerjasama || '').indexOf('Deal') !== -1 || (v.statusPembayaran || '').indexOf('Lunas') !== -1 || (v.statusPembayaran || '').indexOf('DP') !== -1; }).length;

    document.getElementById('vendorCountText').textContent = vendorsList.length + ' Vendor';
    document.getElementById('vendorDealCount').textContent = dealCount + ' Deal';
    document.getElementById('vendorTotalContract').textContent = formatRp(totalKontrak);
    document.getElementById('vendorTotalRemaining').textContent = formatRp(totalSisa);

    const vdContainer = document.getElementById('vendorListContainer');
    vdContainer.innerHTML = vendorsList.map(function(v) {
      const digitsMatch = String(v.kontak || '').match(/08[0-9\s\-\(\)]{8,15}/);
      let phoneDigits = '';
      let waDigits = '';
      if (digitsMatch) {
        phoneDigits = digitsMatch[0].replace(/[^0-9]/g, '');
        if (phoneDigits.startsWith('0')) {
          waDigits = '62' + phoneDigits.slice(1);
        } else {
          waDigits = phoneDigits;
        }
      }
      v.phoneDigits = phoneDigits;
      v.waDigits = waDigits;

      return (
        '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] flex items-start justify-between gap-3 flex-wrap hover:bg-[#EFECE6]/40 transition">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5 flex-wrap">' +
              '<span class="px-2.5 py-0.5 rounded-full bg-[#F3F1EC] text-[#57534E] border border-[#EAE6DF] text-[11px] font-medium">' + escapeHtml(v.kategori) + '</span>' +
              '<span class="px-2.5 py-0.5 rounded-full bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0] text-[11px] font-semibold">' + escapeHtml(v.statusKerjasama) + '</span>' +
              '<span class="px-2.5 py-0.5 rounded-full bg-[#FBF5EB] text-[#8A5A19] border border-[#EBD9BC] text-[11px] font-semibold">' + escapeHtml(v.statusPembayaran) + '</span>' +
            '</div>' +
            '<p class="text-sm font-semibold text-[#1C1917] mt-1.5">' + v.no + '. ' + escapeHtml(v.nama) + '</p>' +
            '<p class="text-xs text-[#2C4237] font-medium mt-0.5">' + escapeHtml(v.kontak) + '</p>' +
            '<p class="text-xs text-[#78716C] mt-0.5">' + escapeHtml(v.layanan) + '</p>' +
          '</div>' +
          '<div class="text-right shrink-0 flex flex-col items-end gap-2">' +
            (state.role === 'couple'
              ? '<p class="text-xs font-semibold text-[#1C1917] font-tabular">Kontrak: ' + formatRp(v.nilaiKontrak) + '</p>' +
                '<p class="text-xs font-medium text-[#2C4237] font-tabular">Sisa: ' + formatRp(v.sisaPembayaran) + '</p>'
              : '') +
            '<div class="flex items-center gap-1.5 mt-1">' +
              (waDigits ? '<a href="https://wa.me/' + waDigits + '" target="_blank" rel="noopener noreferrer" class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#ECF3EF] hover:bg-[#DDECE4] text-[#244233] border border-[#C6DDD0] text-xs font-semibold transition flex items-center justify-center active:scale-95">WA</a>' : '') +
              (phoneDigits ? '<a href="tel:' + phoneDigits + '" class="min-h-[40px] px-3 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] border border-[#EAE6DF] text-xs font-medium transition flex items-center justify-center active:scale-95">Telp</a>' : '') +
              (state.role === 'couple' ? '<button type="button" data-editmod="vendors" data-editid="' + v.id + '" class="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#F3F1EC] hover:bg-[#EFECE6] text-[#1C1917] text-xs font-medium border border-[#EAE6DF] transition flex items-center justify-center active:scale-95">Edit</button>' : '') +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  function renderSetupView() {
    const meta = state.data.meta || {};
    const dtInp = document.getElementById('cfgWeddingDateInput');
    const vnInp = document.getElementById('cfgVenueInput');
    if (dtInp && meta.weddingDate) dtInp.value = meta.weddingDate;
    if (vnInp && meta.venue) vnInp.value = meta.venue;

    const chkContainer = document.getElementById('weddingTestingChecklist');
    const allDone = CHECKLIST_ITEMS.every(function(item) { return !!state.checklist[item.id]; });

    if (allDone && CHECKLIST_ITEMS.length > 0) {
      chkContainer.innerHTML =
        '<div class="p-4 rounded-2xl bg-[#ECF3EF] border border-[#C6DDD0] flex items-center justify-between gap-3">' +
          '<div>' +
            '<h4 class="text-xs font-semibold text-[#244233]">Semua Pengujian Tuntas</h4>' +
          '</div>' +
          '<button type="button" id="btnResetChecklist" class="min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#FFFFFF] text-[#244233] border border-[#C6DDD0] text-xs font-medium hover:bg-[#F3F1EC] transition shrink-0">Buka Lagi</button>' +
        '</div>';
      const btnReset = document.getElementById('btnResetChecklist');
      if (btnReset) {
        btnReset.addEventListener('click', function() {
          state.checklist = {};
          saveLocalState();
          renderSetupView();
        });
      }
      return;
    }

    chkContainer.innerHTML = CHECKLIST_ITEMS.map(function(item) {
      const done = !!state.checklist[item.id];
      return (
        '<label class="flex items-start gap-2.5 p-3 rounded-xl bg-[#F9F8F6] hover:bg-[#EFECE6] border border-[#EAE6DF] cursor-pointer transition">' +
          '<input type="checkbox" data-wchk="' + item.id + '" ' + (done ? 'checked' : '') + ' class="mt-0.5 rounded accent-[#2C4237]" />' +
          '<span class="text-xs ' + (done ? 'line-through text-[#78716C]' : 'text-[#1C1917] font-medium') + '">' + escapeHtml(item.text) + '</span>' +
        '</label>'
      );
    }).join('');
  }

  function switchMainTab(tabName) {
    if (state.activeTab !== 'setup' && tabName === 'setup') {
      state.previousTab = state.activeTab || 'master';
    }
    state.activeTab = tabName;
    ['master', 'modules', 'guests', 'vendors', 'setup'].forEach(function(t) {
      const el = document.getElementById('tab-' + t);
      if (el) {
        if (t === tabName) el.classList.remove('hidden');
        else el.classList.add('hidden');
      }
    });

    const tabLabels = {
      master: 'Ringkas',
      modules: 'Persiapan',
      guests: 'Tamu',
      vendors: 'Acara',
      setup: 'Pengaturan'
    };
    const lblCur = document.getElementById('labelCurrentNavTab');
    if (lblCur && tabLabels[tabName]) lblCur.textContent = tabLabels[tabName];

    document.querySelectorAll('.bottom-nav-btn').forEach(function(btn) {
      const bTab = btn.getAttribute('data-tab');
      if (bTab === tabName) {
        btn.className = 'bottom-nav-btn min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-full text-xs font-semibold transition flex flex-col sm:flex-row items-center justify-center gap-1 text-[#2C4237] bg-[#ECF3EF] border border-[#C6DDD0] active-pill-indicator active:scale-95';
      } else {
        btn.className = 'bottom-nav-btn min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-full text-xs font-medium transition flex flex-col sm:flex-row items-center justify-center gap-1 text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE6] border border-transparent active:scale-95';
      }
    });

    const menuPopup = document.getElementById('floatingNavMenuPopup');
    if (menuPopup) menuPopup.classList.add('hidden');

    const btnSetup = document.getElementById('btnOpenSetup');
    const lblSetup = document.getElementById('btnSetupLabel');
    const icnSetup = document.getElementById('btnSetupIcon');
    if (btnSetup && lblSetup && icnSetup) {
      if (tabName === 'setup') {
        lblSetup.textContent = 'Kembali';
        btnSetup.className = 'min-h-[44px] px-3 py-1.5 rounded-full bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0] text-xs font-semibold flex items-center gap-1.5 transition active:scale-95';
        icnSetup.setAttribute('data-lucide', 'arrow-left');
      } else {
        lblSetup.textContent = 'Pengaturan';
        btnSetup.className = 'min-h-[44px] px-3 py-1.5 rounded-full bg-[#FFFFFF] hover:bg-[#EFECE6] text-[#57534E] border border-[#EAE6DF] text-xs font-medium flex items-center gap-1.5 transition active:scale-95';
        icnSetup.setAttribute('data-lucide', 'sliders-horizontal');
      }
    }

    refreshAll();
  }

  // ==========================================================================
  // FLOATING NAV AUTO-HIDE & ANDROID BACK BUTTON (WEB HISTORY API) CONTROLLER
  // ==========================================================================
  let modalHistoryDepth = 0;
  let isUnwindingHistory = false;

  function isAnyModalOpen() {
    const modalIds = ['quickEditModal', 'editQuotaModal', 'coupleNameModal', 'roleModal'];
    for (let i = 0; i < modalIds.length; i++) {
      const el = document.getElementById(modalIds[i]);
      if (el && !el.classList.contains('hidden')) return true;
    }
    return false;
  }

  function updateFloatingNavVisibility() {
    const nav = document.querySelector('.floating-dock-nav');
    const iosBanner = document.getElementById('iosInstallBanner');
    if (isAnyModalOpen()) {
      if (nav) nav.classList.add('nav-hidden');
      if (iosBanner) iosBanner.classList.add('nav-hidden');
    } else {
      if (nav) nav.classList.remove('nav-hidden');
      if (iosBanner) iosBanner.classList.remove('nav-hidden');
    }
  }

  function pushModalHistory(modalId, level) {
    modalHistoryDepth++;
    try {
      window.history.pushState({ modalOpen: true, modalId: modalId, level: level || 'root' }, '');
    } catch(e) {}
  }

  function dismissModalHistory() {
    if (modalHistoryDepth > 0) {
      isUnwindingHistory = true;
      modalHistoryDepth--;
      try {
        window.history.back();
      } catch(e) {}
      setTimeout(function() { isUnwindingHistory = false; }, 120);
    }
  }

  function setModalVisibility(modalIdOrEl, isVisible) {
    const el = typeof modalIdOrEl === 'string' ? document.getElementById(modalIdOrEl) : modalIdOrEl;
    if (!el) return;
    if (isVisible) {
      el.classList.remove('hidden', 'pointer-events-none');
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('pointer-events', 'auto', 'important');
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('opacity', '1', 'important');
    } else {
      el.classList.add('hidden', 'pointer-events-none');
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('opacity', '0', 'important');
    }
  }

  let quickModalOpenedFrom = 'update_menu';

  function openQuickStep1(skipHistory) {
    quickModalOpenedFrom = 'update_menu';
    setModalVisibility('quickEditModal', true);
    const qStep1 = document.getElementById('quickStep1Selection');
    if (qStep1) qStep1.classList.remove('hidden');
    const qStep2 = document.getElementById('quickStep2Detail');
    if (qStep2) qStep2.classList.add('hidden');
    updateFloatingNavVisibility();
    if (!skipHistory) {
      pushModalHistory('quickEditModal', 'step1');
    }
  }

  function openQuickStep2Form(actionType, modKey, itemId, fromSource, skipHistory) {
    quickModalOpenedFrom = fromSource || 'update_menu';
    setModalVisibility('quickEditModal', true);
    const qStep1 = document.getElementById('quickStep1Selection');
    if (qStep1) qStep1.classList.add('hidden');
    const qStep2 = document.getElementById('quickStep2Detail');
    if (qStep2) qStep2.classList.remove('hidden');

    const backLabel = document.getElementById('btnBackLabel');
    if (backLabel) {
      if (quickModalOpenedFrom === 'direct_edit') {
        backLabel.textContent = 'Kembali ke Daftar';
      } else {
        backLabel.textContent = 'Kembali ke Pilihan';
      }
    }

    const fItem = document.getElementById('formEditItem');
    const fMahar = document.getElementById('formAddMahar');
    const fGuest = document.getElementById('formGuestModal');
    const headerBadge = document.getElementById('step2HeaderBadge');

    fItem.classList.add('hidden');
    fMahar.classList.add('hidden');
    fGuest.classList.add('hidden');

    if (actionType === 'item' || actionType === 'add_item') {
      fItem.classList.remove('hidden');
      const isAdd = (actionType === 'add_item');
      document.getElementById('editItemMode').value = isAdd ? 'add' : 'edit';
      headerBadge.textContent = isAdd ? 'Tambah Item Baru ke Sheet' : '1. Update Biaya & Realisasi';

      const selMod = document.getElementById('editModuleSelect');
      selMod.value = modKey || 'weddingTracker';

      const wrapSelect = document.getElementById('wrapperEditItemSelect');
      const wrapCat = document.getElementById('wrapperAddCategorySelect');
      if (isAdd) {
        if (wrapSelect) wrapSelect.classList.add('hidden');
        if (wrapCat) wrapCat.classList.remove('hidden');
        populateAddCategoryDropdown(selMod.value);
        resetFormForNewItem(selMod.value);
      } else {
        if (wrapSelect) wrapSelect.classList.remove('hidden');
        if (wrapCat) wrapCat.classList.add('hidden');
        populateEditItemDropdown(selMod.value, itemId);
      }
    } else if (actionType === 'mahar' || actionType === 'edit_mahar_log') {
      fMahar.classList.remove('hidden');
      const isEditLog = (actionType === 'edit_mahar_log');
      headerBadge.textContent = isEditLog ? 'Edit Transaksi Log Mahar' : '2. Tabungan & Target Mahar';

      const infoBanner = document.getElementById('maharFormBannerInfo');
      if (isEditLog) {
        document.getElementById('maharLogEditId').value = itemId || '';
        const logItem = state.data.maharLogs.find(function(x) { return x.id === itemId; });
        if (logItem) {
          const kompVal = (/emas|logam\s*mulia/i.test(logItem.komponen || '') ? 'Emas Hartadinata' : (/uang|tunai/i.test(logItem.komponen || '') ? 'Uang Tunai' : (logItem.komponen || 'Saham BSSR')));
          document.getElementById('maharKomponenSelect').value = kompVal;
          document.getElementById('maharVolumeInput').value = logItem.volume || 1;
          const multInp = document.getElementById('maharMultiplierInput');
          if (multInp) multInp.value = '1';
          const realInp = document.getElementById('maharTotalRealisasiInput');
          if (realInp) {
            let inputPrice = 0;
            if (kompVal === 'Saham BSSR') {
              inputPrice = Number(logItem.hargaSatuan) || (Number(logItem.volume) > 0 && Number(logItem.totalRealisasi) > 0 ? Math.round(Number(logItem.totalRealisasi) / (Number(logItem.volume) * 100)) : 0);
            } else if (kompVal === 'Emas Hartadinata') {
              inputPrice = Number(logItem.totalRealisasi) || (Number(logItem.hargaSatuan) > 0 && Number(logItem.volume) > 0 ? Math.round(Number(logItem.hargaSatuan) * Number(logItem.volume)) : 0);
            } else {
              inputPrice = Number(logItem.hargaSatuan) || Number(logItem.totalRealisasi) || 0;
            }
            realInp.value = inputPrice > 0 ? formatDots(inputPrice) : '';
          }
          document.getElementById('maharDateInput').value = logItem.tanggal || new Date().toISOString().split('T')[0];
          document.getElementById('maharStatusSelect').value = logItem.status || 'Selesai';
          document.getElementById('maharAccountInput').value = logItem.sumberDana || 'RDN Indo Premier (IPOT)';
          document.getElementById('maharNoteInput').value = logItem.catatan || '';
          if (infoBanner) infoBanner.innerHTML = 'Mengedit log transaksi (Status: <strong>' + escapeHtml(logItem.status) + '</strong>).';
        }
      } else {
        document.getElementById('maharLogEditId').value = '';
        document.getElementById('maharDateInput').value = new Date().toISOString().split('T')[0];
        document.getElementById('maharVolumeInput').value = '1';
        const multInp = document.getElementById('maharMultiplierInput');
        if (multInp) multInp.value = '1';
        const realInp = document.getElementById('maharTotalRealisasiInput');
        if (realInp) realInp.value = '';
        document.getElementById('maharStatusSelect').value = 'Selesai';
        if (infoBanner) infoBanner.textContent = 'Log Cicilan Mahar';
      }
      syncMaharTargetField();
      updateMaharPreview();
    } else if (actionType === 'guest') {
      fGuest.classList.remove('hidden');
      headerBadge.textContent = '3. Buku Tamu & RSVP';
      const g = itemId ? state.data.tamu.find(function(x) { return x.id === itemId; }) : null;
      if (g) {
        document.getElementById('guestEditId').value = g.id;
        document.getElementById('guestSideSelect').value = g.side;
        const circSel = document.getElementById('guestCircleSelect');
        if (g.kelompok === 'Keluarga Inti') circSel.value = '👑 Keluarga Inti';
        else circSel.value = g.kategori || 'Keluarga Besar';
        document.getElementById('guestNameInput').value = g.nama;
        document.getElementById('guestPaxInput').value = g.pax;
        document.getElementById('guestInviteStatus').value = (g.statusUndangan === 'Fisik' || g.statusUndangan === 'VIPFisik') ? 'Fisik' : (g.statusUndangan === 'Digital' ? 'Digital' : 'Draft');
        document.getElementById('guestRsvpSelect').value = g.rsvp;
        document.getElementById('guestWaInput').value = g.whatsapp || '';
        document.getElementById('guestIgInput').value = g.instagram || '';
      } else {
        document.getElementById('guestEditId').value = '';
        document.getElementById('guestNameInput').value = '';
        document.getElementById('guestPaxInput').value = '2';
        document.getElementById('guestWaInput').value = '';
        document.getElementById('guestIgInput').value = '';
        document.getElementById('guestCircleSelect').value = 'Keluarga Besar';
        document.getElementById('guestInviteStatus').value = 'Draft';
        document.getElementById('guestRsvpSelect').value = 'Hadir';
      }
    }
    updateFloatingNavVisibility();
    if (!skipHistory) {
      pushModalHistory('quickEditModal', 'step2');
    }
  }

  function closeQuickModal(fromPopState) {
    setModalVisibility('quickEditModal', false);
    updateFloatingNavVisibility();
    if (!fromPopState) {
      dismissModalHistory();
    }
  }

  function openQuotaModal(skipHistory) {
    const meta = state.data.meta || {};
    const inpCppQuota = document.getElementById('quotaInputCpp');
    const inpCpwQuota = document.getElementById('quotaInputCpw');
    if (inpCppQuota) inpCppQuota.value = Number(meta.targetPaxCpp) || 200;
    if (inpCpwQuota) inpCpwQuota.value = Number(meta.targetPaxCpw) || 200;
    setModalVisibility('editQuotaModal', true);
    updateFloatingNavVisibility();
    if (!skipHistory) {
      pushModalHistory('editQuotaModal', 'root');
    }
  }

  function closeQuotaModal(fromPopState) {
    setModalVisibility('editQuotaModal', false);
    updateFloatingNavVisibility();
    if (!fromPopState) {
      dismissModalHistory();
    }
  }

  function openCoupleNameModal(skipHistory) {
    const meta = state.data.meta || {};
    const inpCpp = document.getElementById('inpNameCpp');
    const inpCpw = document.getElementById('inpNameCpw');
    if (inpCpp) inpCpp.value = meta.cpp || 'FARHAN RAFIQI';
    if (inpCpw) inpCpw.value = meta.cpw || 'INDIRA GUSTI';
    setModalVisibility('coupleNameModal', true);
    updateFloatingNavVisibility();
    if (!skipHistory) {
      pushModalHistory('coupleNameModal', 'root');
    }
  }

  function closeCoupleNameModal(fromPopState) {
    setModalVisibility('coupleNameModal', false);
    updateFloatingNavVisibility();
    if (!fromPopState) {
      dismissModalHistory();
    }
  }

  function openRoleUnlockModal(skipHistory) {
    const pinErr = document.getElementById('pinErrorText');
    if (pinErr) pinErr.classList.add('hidden');
    const pinInp = document.getElementById('pinUnlockInput');
    if (pinInp) pinInp.value = '';
    setModalVisibility('roleModal', true);
    updateFloatingNavVisibility();
    setTimeout(function() {
      if (pinInp) pinInp.focus();
    }, 100);
    if (!skipHistory) {
      pushModalHistory('roleModal', 'root');
    }
  }

  function closeRoleModal(fromPopState) {
    setModalVisibility('roleModal', false);
    updateFloatingNavVisibility();
    if (!fromPopState) {
      dismissModalHistory();
    }
  }

  function closeAllModals(fromPopState) {
    setModalVisibility('quickEditModal', false);
    setModalVisibility('editQuotaModal', false);
    setModalVisibility('coupleNameModal', false);
    setModalVisibility('roleModal', false);
    updateFloatingNavVisibility();
    if (!fromPopState) {
      dismissModalHistory();
    }
  }

  function syncEditPicFieldUI(modKey, currentVal) {
    const pSel = document.getElementById('editPicSelect');
    const pInp = document.getElementById('editPicInput');
    if (!pInp) return;

    const freeTextOnly = (modKey === 'seserahan' || modKey === 'vendors' || modKey === 'rundown');
    if (freeTextOnly) {
      if (pSel) pSel.classList.add('hidden');
      pInp.classList.remove('hidden');
      pInp.value = currentVal || '';
      if (modKey === 'seserahan') pInp.placeholder = 'Contoh: Somethinc / Pedro';
      else if (modKey === 'vendors') pInp.placeholder = 'Contoh: @vendor / 0812...';
      else pInp.placeholder = 'Contoh: Wedding Organizer / Bestman';
      return;
    }

    if (pSel) {
      pSel.classList.remove('hidden');
      const val = String(currentVal || 'CPP & CPW Bersama').trim();
      let matched = false;
      for (let i = 0; i < pSel.options.length; i++) {
        if (pSel.options[i].value === val && val !== 'Lainnya') {
          pSel.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && val) {
        pSel.value = 'Lainnya';
        pInp.classList.remove('hidden');
        pInp.placeholder = 'Ketik nama PIC...';
      } else {
        pInp.classList.add('hidden');
      }
      pInp.value = val;
    } else {
      pInp.classList.remove('hidden');
      pInp.value = currentVal || '';
    }
  }

  function populateAddCategoryDropdown(modKey) {
    const catSel = document.getElementById('addCategorySelect');
    if (!catSel) return;
    let cats = [];
    if (modKey === 'seserahan') {
      cats = ['Alat Solat', 'Skincare', 'Toiletries', 'Makeup', 'Underwear', 'Pakaian', 'Accessories', 'ETC'];
    } else if (modKey === 'preWedding') {
      cats = ['Lamaran', 'Foto Pre-Wedding', 'Pengajian Pranikah', 'Treatment Kesehatan'];
    } else if (modKey === 'vendors') {
      cats = ['Venue & Tempat Resepsi', 'Katering & Minuman', 'MUA & Busana Pengantin', 'Dokumentasi (Foto & Video)', 'Dekorasi & Florist', 'Undangan & Souvenir', 'Hiburan, MC & Akustik', 'Wedding Organizer (WO)', 'Jasa Hantaran & Mahar', 'Vendor Tambahan / Lainnya'];
    } else if (modKey === 'rundown') {
      cats = ['Akad Nikah', 'Resepsi', 'Persiapan & MUA', 'Logistik & Load Out'];
    } else if (modKey === 'timeline') {
      cats = ['Anggaran & Konsep', 'Venue & Tanggal', 'Catering & Menu', 'Wedding Organizer', 'Administrasi KUA', 'Tamu & Undangan', 'Lainnya'];
    } else {
      cats = ['Venue & Tempat Acara', 'Katering (Prasmanan & Stall)', 'Busana & Rias Pengantin (MUA)', 'Fotografi & Videografi', 'Dekorasi & Florist', 'Undangan & Souvenir', 'Hiburan, MC & Sound System', 'Wedding Organizer (WO)', 'Hantaran Seserahan & Mahar', 'Administrasi & Legal', 'Lainnya'];
    }
    catSel.innerHTML = cats.map(function(c) {
      return '<option value="' + escapeHtml(c) + '">' + escapeHtml(c) + '</option>';
    }).join('');
  }

  function resetFormForNewItem(modKey) {
    const nameInp = document.getElementById('editCustomNameInput');
    const nameLbl = document.getElementById('labelEditCustomName');
    const estInp = document.getElementById('editEstimasiInput');
    const realInp = document.getElementById('editRealisasiInput');
    const stSel = document.getElementById('editStatusSelect');
    const noteInp = document.getElementById('editNoteInput');
    const errEl = document.getElementById('editItemError');
    if (errEl) { errEl.classList.add('hidden'); errEl.textContent = ''; }

    nameInp.value = '';
    realInp.value = '0';
    noteInp.value = '';

    if (modKey === 'seserahan') {
      nameLbl.textContent = 'Nama Barang / Item Seserahan Baru';
      nameInp.placeholder = 'Contoh: Mukena Sutra / Parfum';
      document.getElementById('labelEditEstimasi').textContent = 'Pagu Kotak';
      estInp.value = '-';
      estInp.readOnly = true;
      document.getElementById('labelEditRealisasi').textContent = 'Harga Barang (Rp)';
      realInp.readOnly = false;
      document.getElementById('labelEditPic').textContent = 'Brand / Merek';
      stSel.innerHTML = '<option value="Pending">Pending (Rencana)</option><option value="Selesai">Selesai (Sudah Dibeli)</option><option value="Belum Dibeli">Belum Dibeli</option>';
      syncEditPicFieldUI(modKey, '');
    } else if (modKey === 'vendors') {
      nameLbl.textContent = 'Nama Vendor / Perusahaan Baru';
      nameInp.placeholder = 'Contoh: Nama Catering / WO / MUA';
      document.getElementById('labelEditEstimasi').textContent = 'Nilai Kontrak (Rp)';
      estInp.value = '0';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Sisa Pembayaran (Rp)';
      realInp.readOnly = false;
      document.getElementById('labelEditPic').textContent = 'Kontak / PIC Vendor';
      stSel.innerHTML = '<option value="Belum Bayar">Belum Bayar</option><option value="Down Payment (DP 1)">Down Payment (DP 1)</option><option value="Lunas (100% Selesai)">Lunas (100% Selesai)</option><option value="Booking Fee (Tanda Jadi)">Booking Fee (Tanda Jadi)</option>';
      syncEditPicFieldUI(modKey, '');
    } else if (modKey === 'rundown') {
      nameLbl.textContent = 'Nama Sesi Rundown Baru';
      nameInp.placeholder = 'Contoh: Sambutan Keluarga';
      document.getElementById('labelEditEstimasi').textContent = 'Waktu Sesi';
      estInp.value = '08.00 - 08.30';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Lokasi';
      realInp.value = 'Main Hall Venue';
      realInp.readOnly = false;
      document.getElementById('labelEditPic').textContent = 'PIC Lapangan';
      stSel.innerHTML = '<option value="Siap">Siap</option><option value="Dalam Proses">Dalam Proses</option><option value="Selesai">Selesai</option><option value="Menunggu">Menunggu</option>';
      syncEditPicFieldUI(modKey, 'Wedding Organizer');
    } else if (modKey === 'timeline') {
      nameLbl.textContent = 'Agenda Timeline Persiapan Baru';
      nameInp.placeholder = 'Contoh: Fitting Final Kebaya';
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = '0';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      realInp.readOnly = false;
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      stSel.innerHTML = '<option value="Belum Mulai">Belum Mulai</option><option value="Dalam Proses">Dalam Proses</option><option value="Selesai">Selesai</option>';
      syncEditPicFieldUI(modKey, 'CPP & CPW Bersama');
    } else if (modKey === 'preWedding') {
      nameLbl.textContent = 'Nama Kebutuhan Pre-Wedding Baru';
      nameInp.placeholder = 'Contoh: Sewa Wardrobe Tambahan';
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = '0';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      realInp.readOnly = false;
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      stSel.innerHTML = '<option value="Belum Dimulai">Belum Dimulai</option><option value="Dalam Proses ⏳">Dalam Proses</option><option value="Deal / Booking">Deal / Booking</option><option value="Selesai ✅">Selesai</option><option value="Tidak Digunakan">Tidak Digunakan</option>';
      syncEditPicFieldUI(modKey, 'CPP & CPW Bersama');
    } else {
      nameLbl.textContent = 'Nama Item Baru';
      nameInp.placeholder = 'Contoh: Tambahan Kursi / Genset';
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = '0';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      realInp.readOnly = false;
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      stSel.innerHTML = '<option value="Belum Dimulai">Belum Dimulai</option><option value="Dalam Proses ⏳">Dalam Proses</option><option value="Deal / Booking">Deal / Booking</option><option value="Selesai ✅">Selesai</option>';
      syncEditPicFieldUI(modKey, 'CPP & CPW Bersama');
    }
  }

  function populateEditItemDropdown(modKey, selectedId) {
    const itemSel = document.getElementById('editItemSelect');
    const stSel = document.getElementById('editStatusSelect');
    const list = state.data[modKey] || [];

    itemSel.innerHTML = list.map(function(it) {
      const label = it.item || it.agenda || it.nama || it.sesi || 'Item';
      return '<option value="' + escapeHtml(it.id) + '">' + it.no + '. ' + escapeHtml(label) + '</option>';
    }).join('');

    if (selectedId) itemSel.value = selectedId;

    let statuses = ['Belum Dimulai', 'Dalam Proses ⏳', 'Deal / Booking', 'Selesai ✅', 'Tidak Digunakan', 'Tertunda ⏸️'];
    if (modKey === 'preWedding') statuses = ['Belum Dimulai', 'Dalam Proses ⏳', 'Deal / Booking', 'Selesai ✅', 'Tidak Digunakan', 'Tertunda ⏸️'];
    else if (modKey === 'weddingTracker') statuses = ['Belum Dimulai', 'Dalam Proses ⏳', 'Deal / Booking', 'Selesai ✅', 'Tidak Digunakan', 'Tertunda ⏸️'];
    else if (modKey === 'seserahan') statuses = ['Pending', 'Selesai', 'Belum Dibeli', 'Batal'];
    else if (modKey === 'vendors') statuses = ['Belum Bayar', 'Down Payment (DP 1)', 'Lunas (100% Selesai)', 'Booking Fee (Tanda Jadi)', 'Jatuh Tempo / Overdue'];
    else if (modKey === 'rundown') statuses = ['Siap', 'Dalam Proses', 'Selesai', 'Menunggu'];
    else if (modKey === 'timeline') statuses = ['Belum Mulai', 'Dalam Proses', 'Selesai'];

    stSel.innerHTML = statuses.map(function(s) {
      return '<option value="' + escapeHtml(s) + '">' + escapeHtml(cleanDisplayText(s)) + '</option>';
    }).join('');

    loadSelectedEditItemFields();
  }

  function loadSelectedEditItemFields() {
    const modKey = document.getElementById('editModuleSelect').value;
    const itemId = document.getElementById('editItemSelect').value;
    const list = state.data[modKey] || [];
    const it = list.find(function(x) { return x.id === itemId; });
    if (!it) return;

    const nameInp = document.getElementById('editCustomNameInput');
    const nameLbl = document.getElementById('labelEditCustomName');
    const estInp = document.getElementById('editEstimasiInput');
    const realInp = document.getElementById('editRealisasiInput');
    const stSel = document.getElementById('editStatusSelect');
    const picInp = document.getElementById('editPicInput');
    const noteInp = document.getElementById('editNoteInput');

    if (modKey === 'vendors') {
      nameLbl.textContent = 'Nama Vendor / Perusahaan (Bisa Diubah)';
      nameInp.value = it.nama || '';
      nameInp.placeholder = 'Contoh: Nama Catering / WO / MUA Pilihanmu';
    } else if (modKey === 'seserahan') {
      nameLbl.textContent = 'Nama Barang / Item Seserahan';
      nameInp.value = it.item || '';
      nameInp.placeholder = 'Nama barang seserahan...';
    } else {
      nameLbl.textContent = 'Nama Tugas / Item Persiapan';
      nameInp.value = it.item || it.agenda || it.sesi || '';
      nameInp.placeholder = 'Nama tugas / item...';
    }

    if (modKey === 'seserahan') {
      document.getElementById('labelEditEstimasi').textContent = 'Kategori Kotak';
      estInp.value = it.kategori || '';
      estInp.readOnly = true;
      document.getElementById('labelEditRealisasi').textContent = 'Harga Barang (Rp)';
      realInp.readOnly = false;
      realInp.value = formatDots(it.harga);
      stSel.value = it.status || 'Pending';
      document.getElementById('labelEditPic').textContent = 'Brand / Merek';
      syncEditPicFieldUI('seserahan', it.brand || '');
      noteInp.value = it.link || '';
    } else if (modKey === 'vendors') {
      document.getElementById('labelEditEstimasi').textContent = 'Nilai Kontrak (Rp)';
      estInp.value = formatDots(it.nilaiKontrak);
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Sisa Pembayaran (Rp)';
      realInp.readOnly = false;
      realInp.value = formatDots(it.sisaPembayaran);
      stSel.value = it.statusPembayaran || 'Belum Bayar';
      document.getElementById('labelEditPic').textContent = 'Kontak / PIC Vendor';
      syncEditPicFieldUI('vendors', it.kontak || '');
      noteInp.value = it.catatan || '';
    } else if (modKey === 'rundown') {
      document.getElementById('labelEditEstimasi').textContent = 'Waktu Sesi';
      estInp.value = it.waktu || '';
      estInp.readOnly = true;
      document.getElementById('labelEditRealisasi').textContent = 'Lokasi';
      realInp.readOnly = false;
      realInp.value = it.lokasi || '';
      stSel.value = it.status || 'Siap';
      document.getElementById('labelEditPic').textContent = 'PIC Lapangan';
      syncEditPicFieldUI('rundown', it.pic || '');
      noteInp.value = it.catatan || '';
    } else {
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = formatDots(it.estimasi);
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      realInp.readOnly = false;
      realInp.value = formatDots(it.realisasi);
      stSel.value = it.status || 'Belum Dimulai';
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      syncEditPicFieldUI(modKey, it.pic || 'CPP & CPW Bersama');
      noteInp.value = it.catatan || it.rincian || '';
    }
    const errEl = document.getElementById('editItemError');
    if (errEl) { errEl.classList.add('hidden'); errEl.textContent = ''; }
  }

  function computeMaharEntryValues(komp, volRaw, multRaw, priceInputNum) {
    const qty = Math.max(0, Number(volRaw) || 0);
    const price = Math.max(0, Math.round(Number(priceInputNum) || 0));
    if (komp === 'Saham BSSR') {
      const lot = Math.max(0, Math.round(qty));
      const lembar = lot * 100;
      const total = Math.round(lembar * price);
      return {
        satuan: 'Lot',
        volume: lot,
        pengali: 1,
        lembar: lembar,
        hargaSatuan: price,
        totalRealisasi: total
      };
    }
    if (komp === 'Emas Hartadinata') {
      const pengali = Math.max(1, Math.round(Number(multRaw) || 1));
      const totalGram = Math.round(qty * pengali * 10000) / 10000;
      const total = Math.round(price * pengali);
      return {
        satuan: 'Gram',
        beratPecahan: qty,
        pengali: pengali,
        volume: totalGram,
        hargaSatuan: totalGram > 0 ? Math.round(total / totalGram) : price,
        totalRealisasi: total
      };
    }
    const totalTunai = Math.round(qty * price);
    return {
      satuan: 'Paket',
      volume: qty,
      pengali: 1,
      hargaSatuan: price,
      totalRealisasi: totalTunai
    };
  }

  function syncMaharTargetField() {
    const komp = document.getElementById('maharKomponenSelect').value;
    const isEditLog = !!document.getElementById('maharLogEditId').value;
    const tInp = document.getElementById('maharTargetQtyInput');
    const vInp = document.getElementById('maharVolumeInput');
    const lblVol = document.getElementById('labelMaharVolume');
    const lblTgt = document.getElementById('labelMaharTarget');
    const lblPrice = document.getElementById('labelMaharPrice');
    const realInp = document.getElementById('maharTotalRealisasiInput');
    const multWrap = document.getElementById('maharMultiplierWrap');
    const priceWrap = document.getElementById('maharPriceWrap');
    const noteInp = document.getElementById('maharNoteInput');
    const accInp = document.getElementById('maharAccountInput');

    const tObj = state.data.maharTargets.find(function(t) {
      if (komp === 'Saham BSSR') return /saham|bssr/i.test(t.instrumen);
      if (komp === 'Emas Hartadinata') return /emas|logam\s*mulia/i.test(t.instrumen);
      return /uang|tunai/i.test(t.instrumen);
    });

    if (komp === 'Emas Hartadinata') {
      if (lblVol) lblVol.textContent = 'Berat / Pecahan (Gram)';
      if (vInp) { vInp.step = 'any'; vInp.min = '0.01'; vInp.setAttribute('inputmode', 'decimal'); }
      if (multWrap) multWrap.classList.remove('hidden');
      if (priceWrap) { priceWrap.classList.remove('col-span-1'); priceWrap.classList.add('col-span-2'); }
      if (lblPrice) lblPrice.textContent = 'Harga Beli / Biaya Realisasi (Rp)';
      if (realInp) realInp.placeholder = 'Misal: 3.500.000 (harga per keping/nota)';
      if (lblTgt) lblTgt.textContent = 'Target Akumulasi (Gram)';
      if (tInp) { tInp.step = 'any'; tInp.value = tObj ? (tObj.targetJumlah || 6) : 6; }
      if (noteInp && !isEditLog) noteInp.placeholder = 'Misal: Logam Mulia Antam/Hartadinata, Toko Emas XYZ...';
      if (accInp && !isEditLog) accInp.value = 'Tabungan Emas / Kas Pribadi';
    } else if (komp === 'Saham BSSR') {
      if (lblVol) lblVol.textContent = 'Jumlah (Lot)';
      if (vInp) { vInp.step = '1'; vInp.min = '1'; vInp.setAttribute('inputmode', 'numeric'); }
      if (multWrap) multWrap.classList.add('hidden');
      if (priceWrap) { priceWrap.classList.remove('col-span-2'); priceWrap.classList.add('col-span-1'); }
      if (lblPrice) lblPrice.textContent = 'Harga Beli / Lembar (Rp)';
      if (realInp) realInp.placeholder = 'Misal: 4.940';
      if (lblTgt) lblTgt.textContent = 'Target Akumulasi (Lot)';
      if (tInp) { tInp.step = '1'; tInp.value = tObj ? (tObj.targetJumlah || 27) : 27; }
      if (noteInp && !isEditLog) noteInp.placeholder = 'Cicil lot saham...';
      if (accInp && !isEditLog) accInp.value = 'RDN Indo Premier (IPOT)';
    } else {
      if (lblVol) lblVol.textContent = 'Jumlah / Paket';
      if (vInp) { vInp.step = '1'; vInp.min = '1'; vInp.setAttribute('inputmode', 'numeric'); }
      if (multWrap) multWrap.classList.add('hidden');
      if (priceWrap) { priceWrap.classList.remove('col-span-2'); priceWrap.classList.add('col-span-1'); }
      if (lblPrice) lblPrice.textContent = 'Nominal Realisasi (Rp)';
      if (realInp) realInp.placeholder = 'Misal: 2.027.000';
      if (lblTgt) lblTgt.textContent = 'Target (Paket)';
      if (tInp) { tInp.step = '1'; tInp.value = tObj ? (tObj.targetJumlah || 1) : 1; }
      if (noteInp && !isEditLog) noteInp.placeholder = 'Misal: Uang Kertas Emisi Baru...';
      if (accInp && !isEditLog) accInp.value = 'Rekening Bank CPP';
    }
  }

  function updateMaharPreview() {
    const komp = document.getElementById('maharKomponenSelect').value;
    const volRaw = Math.max(0, parseFloat(document.getElementById('maharVolumeInput').value) || 0);
    const multInp = document.getElementById('maharMultiplierInput');
    const multRaw = multInp ? Math.max(1, parseInt(multInp.value, 10) || 1) : 1;
    const realInp = document.getElementById('maharTotalRealisasiInput');
    const inputPrice = realInp ? parseDigits(realInp.value) : 0;
    const calc = computeMaharEntryValues(komp, volRaw, multRaw, inputPrice);
    const previewEl = document.getElementById('maharCalcPreview');
    if (previewEl) {
      if (inputPrice > 0 && volRaw > 0) {
        if (komp === 'Saham BSSR') {
          previewEl.textContent = 'Estimasi Realisasi: ' + formatRp(calc.totalRealisasi) + ' (' + calc.volume + ' Lot / ' + formatDots(calc.lembar) + ' lembar @ Rp ' + formatDots(calc.hargaSatuan) + ')';
        } else if (komp === 'Emas Hartadinata') {
          previewEl.textContent = 'Total Realisasi: ' + formatRp(calc.totalRealisasi) + ' (' + calc.volume + ' gr — ' + calc.pengali + ' keping @ ' + calc.beratPecahan + ' gr)';
        } else {
          previewEl.textContent = 'Total Realisasi: ' + formatRp(calc.totalRealisasi) + ' (' + calc.volume + ' paket @ ' + formatRp(calc.hargaSatuan) + ')';
        }
      } else if (komp === 'Saham BSSR') {
        previewEl.textContent = 'Masukkan jumlah Lot dan Harga Beli / Lembar untuk melihat estimasi realisasi';
      } else if (komp === 'Emas Hartadinata') {
        previewEl.textContent = 'Masukkan berat pecahan, jumlah keping, dan harga per keping/nota';
      } else {
        previewEl.textContent = 'Masukkan jumlah paket dan nominal realisasi';
      }
    }
    return calc.totalRealisasi;
  }

  function getSheetRowsSafe(sheetName) {
    return (state.data && state.data.rawSheets && Array.isArray(state.data.rawSheets[sheetName]))
      ? state.data.rawSheets[sheetName]
      : null;
  }

  function getExistingSheetRowNo(sheetName, rowIndex1Based, colIdxZeroBased, fallbackNo) {
    const rows = getSheetRowsSafe(sheetName);
    if (rows && rows[rowIndex1Based - 1]) {
      const v = parseInt(rows[rowIndex1Based - 1][colIdxZeroBased], 10);
      if (!isNaN(v) && v > 0) return v;
    }
    return fallbackNo;
  }

  function findFirstEmptySheetSlot(sheetName, checkColIdx, startRow, endRow, skipRows, localList, filterFn) {
    const skipSet = {};
    (skipRows || []).forEach(function(r) { skipSet[r] = true; });

    const rows = getSheetRowsSafe(sheetName);
    if (rows && rows.length > 0) {
      const limit = Math.min(endRow, rows.length);
      for (let r = startRow; r <= limit; r++) {
        if (skipSet[r]) continue;
        const row = rows[r - 1];
        const val = row ? String(row[checkColIdx] || '').trim() : '';
        if (!val) return r;
      }
    }

    const used = {};
    (localList || []).forEach(function(x) {
      if (!filterFn || filterFn(x)) {
        if (x.rowIndex) used[Number(x.rowIndex)] = true;
      }
    });
    for (let r = startRow; r <= endRow; r++) {
      if (skipSet[r]) continue;
      if (!used[r]) return r;
    }
    return 0;
  }

  function getMaharMaxLogRow() {
    const rows = getSheetRowsSafe('MAHAR');
    if (rows) {
      for (let r = 16; r <= Math.min(35, rows.length); r++) {
        const row = rows[r - 1];
        const rowTxt = (row ? row.slice(0, 4).join(' ') : '').toUpperCase();
        if (rowTxt.indexOf('TOTAL') !== -1) return r - 1;
      }
    }
    return 24;
  }

  function resolveNewSheetRowSlot(modKey, category, extra) {
    if (modKey === 'maharLogs') {
      const maxRow = getMaharMaxLogRow();
      return findFirstEmptySheetSlot('MAHAR', 3, 16, maxRow, [], state.data.maharLogs);
    }
    if (modKey === 'weddingTracker') {
      let maxWt = 32;
      const rows = getSheetRowsSafe('WEDDING TRACKER');
      if (rows) {
        for (let r = 8; r <= Math.min(45, rows.length); r++) {
          const rowTxt = (rows[r - 1] ? rows[r - 1].slice(0, 4).join(' ') : '').toUpperCase();
          if (rowTxt.indexOf('TOTAL') !== -1) { maxWt = r - 1; break; }
        }
      }
      return findFirstEmptySheetSlot('WEDDING TRACKER', 3, 8, maxWt, [], state.data.weddingTracker);
    }
    if (modKey === 'preWedding') {
      const ranges = {
        'Lamaran': [9, 17],
        'Foto Pre-Wedding': [20, 26],
        'Pengajian Pranikah': [29, 35],
        'Treatment Kesehatan': [38, 43]
      };
      const skip = [18, 19, 27, 28, 36, 37, 44, 45, 46];
      const rng = ranges[category] || [9, 43];
      let slot = findFirstEmptySheetSlot('PRE WEDDING', 3, rng[0], rng[1], skip, state.data.preWedding);
      if (!slot) slot = findFirstEmptySheetSlot('PRE WEDDING', 3, 9, 43, skip, state.data.preWedding);
      return slot;
    }
    if (modKey === 'seserahan') {
      const ranges = {
        'Alat Solat': [8, 11],
        'Skincare': [14, 20],
        'Toiletries': [23, 29],
        'Makeup': [32, 41],
        'Underwear': [44, 47],
        'Pakaian': [50, 55],
        'Accessories': [58, 64],
        'ETC': [67, 73]
      };
      const skip = [12, 13, 21, 22, 30, 31, 42, 43, 48, 49, 56, 57, 65, 66, 74, 75, 76];
      const rng = ranges[category] || [67, 73];
      let slot = findFirstEmptySheetSlot('SESERAHAN', 3, rng[0], rng[1], skip, state.data.seserahan);
      if (!slot) slot = findFirstEmptySheetSlot('SESERAHAN', 3, 8, 73, skip, state.data.seserahan);
      return slot;
    }
    if (modKey === 'vendors') {
      return findFirstEmptySheetSlot('VENDOR DIRECTORY', 3, 17, 30, [31], state.data.vendors);
    }
    if (modKey === 'timeline') {
      return findFirstEmptySheetSlot('TIMELINE & RUNDOWN', 4, 8, 27, [28, 29, 30], state.data.timeline);
    }
    if (modKey === 'rundown') {
      return findFirstEmptySheetSlot('TIMELINE & RUNDOWN', 4, 31, 55, [], state.data.rundown);
    }
    if (modKey === 'tamu') {
      const side = (extra && extra.side === 'CPW') ? 'CPW' : 'CPP';
      const isFam = Boolean(extra && extra.isFam);
      const colIdx = side === 'CPP' ? 3 : 10;
      const filterFn = function(x) { return x.side === side && (isFam ? x.kelompok === 'Keluarga Inti' : x.kelompok !== 'Keluarga Inti'); };
      return isFam
        ? findFirstEmptySheetSlot('TAMU', colIdx, 10, 19, [], state.data.tamu, filterFn)
        : findFirstEmptySheetSlot('TAMU', colIdx, 23, 171, [], state.data.tamu, filterFn);
    }
    return 0;
  }

  async function syncMutation(sheetName, action, payload, opts) {
    state.config.scriptUrl = getGasEndpoint();
    const options = opts || {};
    const sp = document.getElementById('syncSpinner');
    if (sp) sp.classList.add('animate-spin');
    if (!options.silentStart) {
      showToast('Menyinkronkan perubahan ke Google Sheets...', false);
    }
    try {
      if (action === 'append') {
        await SheetApi.append(sheetName, payload.rowValues, state.config.scriptUrl, state.config.pin);
      } else if (action === 'updateRow') {
        await SheetApi.updateRow(sheetName, payload.rowIndex, payload.rowValues, payload.startCol || 1, state.config.scriptUrl, state.config.pin);
      } else if (action === 'deleteRow') {
        await SheetApi.deleteRow(sheetName, payload.rowIndex, state.config.scriptUrl, state.config.pin);
      }
      // Re-fetch seluruh 9 tab secara otomatis agar kalkulasi formula spreadsheet terupdate
      if (!options.skipPull) {
        await syncFromAppsScript(true);
      }
      if (!options.quietSuccessToast) {
        showToast('Sinkronisasi berhasil: data terbaru diperbarui.');
      }
      return { ok: true };
    } catch (e) {
      const errMsg = e.message || String(e);
      showToast('Gagal sinkronisasi: ' + errMsg, true);
      return { ok: false, error: errMsg };
    } finally {
      if (sp) sp.classList.remove('animate-spin');
    }
  }

  async function pushToAppsScript(action, itemPayload) {
    state.config.scriptUrl = getGasEndpoint();
    try {
      if (action === 'update_master_meta') {
        const tasks = [];
        if (itemPayload.cpp !== undefined) tasks.push({ rowIndex: 5, startCol: 4, rowValues: [itemPayload.cpp] });
        if (itemPayload.cpw !== undefined) tasks.push({ rowIndex: 5, startCol: 8, rowValues: [itemPayload.cpw] });
        if (itemPayload.weddingDate) tasks.push({ rowIndex: 6, startCol: 4, rowValues: [itemPayload.weddingDate] });
        if (itemPayload.venue !== undefined) tasks.push({ rowIndex: 6, startCol: 8, rowValues: [itemPayload.venue] });
        if (itemPayload.targetReady !== undefined) tasks.push({ rowIndex: 6, startCol: 12, rowValues: [itemPayload.targetReady] });
        for (let i = 0; i < tasks.length; i++) {
          const isLast = (i === tasks.length - 1);
          const res = await syncMutation('MASTER', 'updateRow', tasks[i], {
            skipPull: !isLast,
            silentStart: i > 0,
            quietSuccessToast: !isLast
          });
          if (!res.ok) return res;
        }
        return { ok: true };
      } else if (action === 'update_guest_quota') {
        if (itemPayload.targetPaxCpp !== undefined) {
          const r1 = await syncMutation('TAMU', 'updateRow', { rowIndex: 4, startCol: 7, rowValues: [itemPayload.targetPaxCpp] }, {
            skipPull: itemPayload.targetPaxCpw !== undefined,
            quietSuccessToast: itemPayload.targetPaxCpw !== undefined
          });
          if (!r1.ok) return r1;
        }
        if (itemPayload.targetPaxCpw !== undefined) {
          return await syncMutation('TAMU', 'updateRow', { rowIndex: 4, startCol: 11, rowValues: [itemPayload.targetPaxCpw] }, {
            silentStart: itemPayload.targetPaxCpp !== undefined
          });
        }
        return { ok: true };
      } else if (action === 'update_tamu') {
        const g = itemPayload;
        const isCpp = g.side === 'CPP';
        const isFam = g.kelompok === 'Keluarga Inti';
        let targetRow = Number(g.rowIndex || 0);
        if (!targetRow) {
          targetRow = resolveNewSheetRowSlot('tamu', null, { side: g.side, isFam: isFam });
        }
        if (!targetRow) {
          const errMsg = 'Slot daftar tamu pihak ' + g.side + ' (' + g.kelompok + ') pada spreadsheet sudah penuh.';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        g.rowIndex = targetRow;
        const noColIdx = isCpp ? 1 : 8;
        const existingNo = getExistingSheetRowNo('TAMU', targetRow, noColIdx, 0);
        if (existingNo > 0) {
          const startCol = isCpp ? 3 : 10;
          return await syncMutation('TAMU', 'updateRow', {
            rowIndex: targetRow,
            startCol: startCol,
            rowValues: [g.kategori, g.nama, g.pax, g.statusUndangan, g.rsvp]
          });
        }
        const startCol = isCpp ? 2 : 9;
        return await syncMutation('TAMU', 'updateRow', {
          rowIndex: targetRow,
          startCol: startCol,
          rowValues: [g.no, g.kategori, g.nama, g.pax, g.statusUndangan, g.rsvp]
        });
      } else if (action === 'update_administrasi') {
        const item = itemPayload;
        if (!item.rowIndex) return { ok: false, error: 'Baris KUA tidak valid.' };
        return await syncMutation('ADMINISTRASI', 'updateRow', {
          rowIndex: item.rowIndex,
          startCol: 5,
          rowValues: [item.cppCheck === 'NA' ? '—' : (item.cppCheck ? 'TRUE' : 'FALSE'), item.cpwCheck === 'NA' ? '—' : (item.cpwCheck ? 'TRUE' : 'FALSE')]
        });
      } else if (action === 'update_seserahan' || action === 'add_seserahan') {
        const it = itemPayload;
        let targetRow = Number(it.rowIndex || 0);
        if (!targetRow) {
          targetRow = resolveNewSheetRowSlot('seserahan', it.kategori);
        }
        if (!targetRow) {
          const errMsg = 'Slot kotak Seserahan sudah penuh di spreadsheet (baris 8-73).';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        it.rowIndex = targetRow;
        const noVal = getExistingSheetRowNo('SESERAHAN', targetRow, 1, it.no);
        return await syncMutation('SESERAHAN', 'updateRow', {
          rowIndex: targetRow,
          startCol: 2,
          rowValues: [noVal, it.kategori, it.item, it.brand || '', it.harga || 0, it.link || '', it.status || 'Pending']
        });
      } else if (action === 'update_mahar_log' || action === 'add_mahar_log') {
        const log = itemPayload;
        let targetRow = Number(log.rowIndex || 0);
        if (!targetRow || targetRow < 16) {
          targetRow = resolveNewSheetRowSlot('maharLogs');
        }
        if (!targetRow) {
          const errMsg = 'Slot Log Cicilan Mahar (baris 16-' + getMaharMaxLogRow() + ') penuh. Sisipkan baris sebelum Total di Sheet MAHAR.';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        log.rowIndex = targetRow;
        const noVal = getExistingSheetRowNo('MAHAR', targetRow, 1, log.no || (targetRow - 15));
        if (/saham|bssr/i.test(log.komponen || '')) {
          // Proteksi rumus Kolom I (Total Biaya Realisasi): tulis kolom B..H lalu J..K
          const headRes = await syncMutation('MAHAR', 'updateRow', {
            rowIndex: targetRow,
            startCol: 2,
            rowValues: [noVal, log.tanggal, log.komponen, log.volume, log.satuan, log.hargaSatuan, log.status]
          }, { skipPull: true, quietSuccessToast: true });
          if (!headRes || !headRes.ok) return headRes;
          return await syncMutation('MAHAR', 'updateRow', {
            rowIndex: targetRow,
            startCol: 10,
            rowValues: [log.sumberDana || '', log.catatan || '']
          });
        }
        return await syncMutation('MAHAR', 'updateRow', {
          rowIndex: targetRow,
          startCol: 2,
          rowValues: [noVal, log.tanggal, log.komponen, log.volume, log.satuan, log.hargaSatuan, log.status, log.totalRealisasi, log.sumberDana || '', log.catatan || '']
        });
      } else if (action === 'update_mahar_target') {
        return await syncMutation('MAHAR', 'updateRow', {
          rowIndex: itemPayload.rowIndex,
          startCol: 5,
          rowValues: [itemPayload.targetJumlah]
        }, itemPayload._opts || {});
      } else if (action === 'update_wedding_tracker' || action === 'add_wedding_tracker') {
        const it = itemPayload;
        let targetRow = Number(it.rowIndex || 0);
        if (!targetRow) {
          targetRow = resolveNewSheetRowSlot('weddingTracker');
        }
        if (!targetRow) {
          const errMsg = 'Slot item pada WEDDING TRACKER (baris 8-32) sudah penuh.';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        it.rowIndex = targetRow;
        const noVal = getExistingSheetRowNo('WEDDING TRACKER', targetRow, 1, it.no || (targetRow - 7));
        return await syncMutation('WEDDING TRACKER', 'updateRow', {
          rowIndex: targetRow,
          startCol: 2,
          rowValues: [noVal, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
        });
      } else if (action === 'update_pre_wedding') {
        const it = itemPayload;
        let targetRow = Number(it.rowIndex || 0);
        if (!targetRow) {
          targetRow = resolveNewSheetRowSlot('preWedding', it.kategori);
        }
        if (!targetRow) {
          const errMsg = 'Slot item pada PRE WEDDING (baris 9-43) sudah penuh.';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        it.rowIndex = targetRow;
        const noVal = getExistingSheetRowNo('PRE WEDDING', targetRow, 1, it.no);
        return await syncMutation('PRE WEDDING', 'updateRow', {
          rowIndex: targetRow,
          startCol: 2,
          rowValues: [noVal, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
        });
      } else if (action === 'update_vendor') {
        const it = itemPayload;
        let targetRow = Number(it.rowIndex || 0);
        if (!targetRow) {
          targetRow = resolveNewSheetRowSlot('vendors');
        }
        if (!targetRow) {
          const errMsg = 'Slot direktori VENDOR DIRECTORY (baris 17-30) sudah penuh.';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        it.rowIndex = targetRow;
        const noVal = getExistingSheetRowNo('VENDOR DIRECTORY', targetRow, 1, it.no || (targetRow - 16));
        const r1 = await syncMutation('VENDOR DIRECTORY', 'updateRow', {
          rowIndex: targetRow,
          startCol: 2,
          rowValues: [noVal, it.kategori, it.nama, it.kontak, it.nilaiKontrak]
        }, { skipPull: true, quietSuccessToast: true });
        if (!r1.ok) return r1;
        return await syncMutation('VENDOR DIRECTORY', 'updateRow', {
          rowIndex: targetRow,
          startCol: 8,
          rowValues: [it.statusKerjasama, it.statusPembayaran, it.layanan, it.catatan]
        }, { silentStart: true });
      } else if (action === 'update_rundown' || action === 'update_timeline') {
        const it = itemPayload;
        const isTimeline = (action === 'update_timeline' || it.tableType === 'timeline' || Boolean(it.fase));
        if (isTimeline) {
          let targetRow = Number(it.rowIndex || 0);
          if (!targetRow) {
            targetRow = resolveNewSheetRowSlot('timeline');
          }
          if (!targetRow) {
            const errMsg = 'Slot TIMELINE (baris 8-27) sudah penuh.';
            showToast(errMsg, true);
            return { ok: false, error: errMsg };
          }
          it.rowIndex = targetRow;
          const noVal = getExistingSheetRowNo('TIMELINE & RUNDOWN', targetRow, 1, it.no || (targetRow - 7));
          return await syncMutation('TIMELINE & RUNDOWN', 'updateRow', {
            rowIndex: targetRow,
            startCol: 2,
            rowValues: [noVal, it.fase || 'H-Bulan', it.kategori, it.agenda, it.rincian || '', it.target || '', it.pic, it.status]
          });
        }
        let targetRow = Number(it.rowIndex || 0);
        if (!targetRow) {
          targetRow = resolveNewSheetRowSlot('rundown');
        }
        if (!targetRow) {
          const errMsg = 'Slot RUNDOWN (baris 31-55) sudah penuh.';
          showToast(errMsg, true);
          return { ok: false, error: errMsg };
        }
        it.rowIndex = targetRow;
        const noVal = getExistingSheetRowNo('TIMELINE & RUNDOWN', targetRow, 1, it.no || (targetRow - 30));
        return await syncMutation('TIMELINE & RUNDOWN', 'updateRow', {
          rowIndex: targetRow,
          startCol: 2,
          rowValues: [noVal, it.waktu || '08:00', it.durasi || '30 Menit', it.sesi, it.deskripsi || '', it.lokasi || 'Venue', it.pic, it.vendor || '', it.status, it.catatan || '']
        });
      }
      return { ok: false, error: 'Aksi sinkronisasi tidak dikenali: ' + action };
    } catch (e) {
      const errMsg = e.message || String(e);
      showToast('Gagal mengirim ke Google Sheets: ' + errMsg, true);
      return { ok: false, error: errMsg };
    }
  }

  function renderSkeletonLoading(container, count) {
    if (!container) return;
    const items = [];
    for (let i = 0; i < (count || 3); i++) {
      items.push(
        '<div class="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE6DF] shadow-[0_2px_10px_rgba(28,25,23,0.03)] space-y-2.5">' +
          '<div class="flex items-center justify-between">' +
            '<div class="w-20 h-4 rounded-full skeleton-shimmer"></div>' +
            '<div class="w-14 h-4 rounded-full skeleton-shimmer"></div>' +
          '</div>' +
          '<div class="w-3/4 h-5 rounded-lg skeleton-shimmer"></div>' +
          '<div class="w-1/2 h-3.5 rounded-lg skeleton-shimmer"></div>' +
        '</div>'
      );
    }
    container.innerHTML = items.join('');
  }

  async function syncFromAppsScript(isSilentAutoSync) {
    state.config.scriptUrl = getGasEndpoint();
    const sp = document.getElementById('syncSpinner');
    if (sp) sp.classList.add('animate-spin');
    if (!isSilentAutoSync) {
      showToast('Menghubungkan ke Google Apps Script (9 tab)...', false);
    }
    try {
      const json = await SheetApi.getAll(state.config.scriptUrl, state.config.pin);
      if (json.status === 'success' && json.data) {
        const parsed = SheetApi.parseAllTabs(json.data);
        if (parsed) {
          state.data = Object.assign(state.data, parsed);
          mergeGuestExtras(state.data.tamu);
        }
        if (json.role) state.role = json.role;
        saveLocalState();
        refreshAll();

        const badge = document.getElementById('lastSyncedBadge');
        if (badge) {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          badge.textContent = 'Tersinkron ' + hh + ':' + mm;
        }
        if (!isSilentAutoSync) {
          showToast('Sinkronisasi berhasil: seluruh data terbaru telah dimuat.');
        }
      } else if (!isSilentAutoSync) {
        showToast(json.message || 'PIN atau URL tidak sesuai.', true);
      }
    } catch (e) {
      console.error('syncFromAppsScript error:', e);
      if (!isSilentAutoSync) {
        showToast('Gagal menghubungi Web App URL: ' + (e.message || String(e)), true);
      }
    } finally {
      if (sp) sp.classList.remove('animate-spin');
      hideSplashScreen();
    }
  }

  function refreshAll() {
    try { applyRolePrivacyUI(); } catch (e) { console.error('applyRolePrivacyUI error:', e); }
    try { renderMasterDashboard(); } catch (e) { console.error('renderMasterDashboard error:', e); }
    try { renderModuleView(); } catch (e) { console.error('renderModuleView error:', e); }
    try { renderGuestsAndKua(); } catch (e) { console.error('renderGuestsAndKua error:', e); }
    try { renderVendorsAndRundown(); } catch (e) { console.error('renderVendorsAndRundown error:', e); }
    try { renderSetupView(); } catch (e) { console.error('renderSetupView error:', e); }
    try { if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } }); } catch (e) {}
  }

  function initEvents() {
    function safeOn(idOrEl, evt, handler) {
      try {
        const el = typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
        if (el && typeof el.addEventListener === 'function') {
          el.addEventListener(evt, handler);
        }
      } catch (err) {}
    }

    // Toggle Floating Left Navigation Menu
    const btnToggleNav = document.getElementById('btnToggleNavMenu');
    const navPopup = document.getElementById('floatingNavMenuPopup');
    if (btnToggleNav && navPopup) {
      btnToggleNav.addEventListener('click', function(e) {
        e.stopPropagation();
        navPopup.classList.toggle('hidden');
      });
      document.addEventListener('click', function(e) {
        if (!e.target.closest('#btnToggleNavMenu') && !e.target.closest('#floatingNavMenuPopup')) {
          navPopup.classList.add('hidden');
        }
      });
    }

    document.querySelectorAll('.bottom-nav-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        switchMainTab(btn.getAttribute('data-tab'));
      });
    });

    // ========================================================================
    // ANDROID HARDWARE / GESTURE BACK BUTTON (PWA WEB HISTORY API) LISTENER
    // ========================================================================
    window.addEventListener('popstate', function(event) {
      if (isUnwindingHistory) {
        isUnwindingHistory = false;
        updateFloatingNavVisibility();
        return;
      }

      if (modalHistoryDepth > 0) modalHistoryDepth--;

      const qModal = document.getElementById('quickEditModal');
      const qStep1 = document.getElementById('quickStep1Selection');
      const qStep2 = document.getElementById('quickStep2Detail');

      if (qModal && !qModal.classList.contains('hidden')) {
        // If inside Step 2 detail and opened from update menu, step back to Step 1
        if (qStep2 && !qStep2.classList.contains('hidden') && quickModalOpenedFrom === 'update_menu') {
          qStep2.classList.add('hidden');
          if (qStep1) qStep1.classList.remove('hidden');
          updateFloatingNavVisibility();
          return;
        }
        // Otherwise close quickEditModal
        closeQuickModal(true);
        return;
      }

      const quotaModal = document.getElementById('editQuotaModal');
      if (quotaModal && !quotaModal.classList.contains('hidden')) {
        closeQuotaModal(true);
        return;
      }

      const coupleModal = document.getElementById('coupleNameModal');
      if (coupleModal && !coupleModal.classList.contains('hidden')) {
        closeCoupleNameModal(true);
        return;
      }

      const roleModal = document.getElementById('roleModal');
      if (roleModal && !roleModal.classList.contains('hidden')) {
        closeRoleModal(true);
        return;
      }

      updateFloatingNavVisibility();
    });

    // ========================================================================
    // MODAL BACKDROP CLICK LISTENERS (Click outside card to close)
    // ========================================================================
    ['quickEditModal', 'editQuotaModal', 'coupleNameModal', 'roleModal'].forEach(function(modalId) {
      const el = document.getElementById(modalId);
      if (el) {
        el.addEventListener('click', function(e) {
          if (e.target === el) {
            if (modalId === 'quickEditModal') closeQuickModal();
            else if (modalId === 'editQuotaModal') closeQuotaModal();
            else if (modalId === 'coupleNameModal') closeCoupleNameModal();
            else if (modalId === 'roleModal') closeRoleModal();
          }
        });
      }
    });

    // ========================================================================
    // DELETE MAHAR LOG ENTRY LISTENER
    // ========================================================================
    document.addEventListener('click', async function(e) {
      const delMaharBtn = e.target.closest('[data-deletemaharlog]');
      if (delMaharBtn) {
        e.stopPropagation();
        const id = delMaharBtn.getAttribute('data-deletemaharlog');
        const log = state.data.maharLogs.find(function(l) { return l.id === id; });
        if (!log) return;

        const confirmMsg = 'Hapus catatan mahar ini?\n\n' +
          log.komponen + ' (' + log.volume + ' ' + log.satuan + ')\n' +
          'Realisasi: ' + formatRp(log.totalRealisasi) + '\n' +
          'Tanggal: ' + (log.tanggal || '-');

        if (!confirm(confirmMsg)) return;

        const removedRowIndex = log.rowIndex;
        // Optimistic local state update
        state.data.maharLogs = state.data.maharLogs.filter(function(l) { return l.id !== id; });
        computeMasterMetrics();
        renderModuleView();
        showToast('Menghapus catatan mahar...', false);

        try {
          await SheetApi.deleteRow('MAHAR', removedRowIndex, state.config.scriptUrl, state.config.pin);
          await syncFromAppsScript(true);
          showToast('Catatan mahar berhasil dihapus & formula disinkronkan.');
        } catch (err) {
          console.error('Delete mahar error:', err);
          showToast('Gagal menghapus mahar: ' + (err.message || String(err)), true);
          await syncFromAppsScript(true);
        }
        return;
      }
    });

    function setupCollapsibleSection(btnId, wrapId, lblId, icnId) {
      const btn = document.getElementById(btnId);
      const wrap = document.getElementById(wrapId);
      const lbl = document.getElementById(lblId);
      const icn = document.getElementById(icnId);
      if (!btn || !wrap) return;

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const isNowHidden = wrap.classList.toggle('hidden');
        if (lbl) {
          lbl.textContent = isNowHidden ? 'Tampilkan' : 'Sembunyikan';
        }
        if (icn) {
          icn.setAttribute('data-lucide', isNowHidden ? 'chevron-down' : 'chevron-up');
        }
        if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });

        if (!isNowHidden && state.role === 'couple') {
          setTimeout(function() {
            if (pillarChart) pillarChart.resize();
            if (shareChart) shareChart.resize();
          }, 50);
        }
      });
    }

    setupCollapsibleSection('btnToggleSectionModules', 'wrapperSectionModules', 'labelToggleSectionModules', 'iconToggleSectionModules');
    setupCollapsibleSection('btnToggleSectionPaguChart', 'wrapperSectionPaguChart', 'labelToggleSectionPaguChart', 'iconToggleSectionPaguChart');
    setupCollapsibleSection('btnToggleSectionShareChart', 'wrapperSectionShareChart', 'labelToggleSectionShareChart', 'iconToggleSectionShareChart');

    safeOn('masterModuleCardsGrid', 'click', function(e) {
      const card = e.target.closest('.jump-card-btn');
      if (!card) return;
      const key = card.getAttribute('data-jump');
      if (key === 'tamu') {
        switchMainTab('guests');
        const b = document.getElementById('btnSubTamu');
        if (b) b.click();
      } else if (key === 'kua') {
        switchMainTab('guests');
        const b = document.getElementById('btnSubAdminKua');
        if (b) b.click();
      } else {
        state.activeSubMod = key;
        switchMainTab('modules');
        document.querySelectorAll('.submod-btn').forEach(function(b) {
          if (b.getAttribute('data-submod') === key) {
            b.className = 'submod-btn shrink-0 min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
          } else {
            b.className = 'submod-btn shrink-0 min-h-[44px] px-4 py-2 rounded-full text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
          }
        });
        populateModuleFilters();
        renderModuleView();
      }
    });

    document.querySelectorAll('.submod-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.activeSubMod = btn.getAttribute('data-submod');
        document.querySelectorAll('.submod-btn').forEach(function(b) {
          if (b.getAttribute('data-submod') === state.activeSubMod) {
            b.className = 'submod-btn shrink-0 min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
          } else {
            b.className = 'submod-btn shrink-0 min-h-[44px] px-4 py-2 rounded-full text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
          }
        });
        populateModuleFilters();
        renderModuleView();
      });
    });

    const btnToggleUnused = document.getElementById('btnToggleShowUnused');
    if (btnToggleUnused) {
      btnToggleUnused.addEventListener('click', function() {
        state.showUnusedItems = !state.showUnusedItems;
        renderModuleView();
      });
    }

    safeOn('moduleSearchInput', 'input', renderModuleView);
    safeOn('moduleCategoryFilter', 'change', renderModuleView);
    safeOn('moduleStatusFilter', 'change', renderModuleView);

    const btnAddModItem = document.getElementById('btnAddNewModuleItem');
    if (btnAddModItem) {
      btnAddModItem.addEventListener('click', function() {
        const curMod = state.activeSubMod === 'tracker' ? 'weddingTracker' : (state.activeSubMod === 'prewed' ? 'preWedding' : 'seserahan');
        openQuickStep2Form('add_item', curMod, null, 'direct_add');
      });
    }

    safeOn('moduleItemsContainer', 'click', async function(e) {
      // Toggle Cepat Status Log Mahar (Terencana <-> Selesai)
      const toggleMaharBtn = e.target.closest('button[data-togglemaharstatus]');
      if (toggleMaharBtn) {
        const id = toggleMaharBtn.getAttribute('data-togglemaharstatus');
        const logItem = state.data.maharLogs.find(function(x) { return x.id === id; });
        if (logItem) {
          logItem.status = (String(logItem.status || '').trim() === 'Selesai') ? 'Terencana' : 'Selesai';
          recalculateMaharTargets();
          saveLocalState();
          refreshAll();
          showToast('Status log #' + logItem.no + ' diubah menjadi: ' + logItem.status);
          await pushToAppsScript('update_mahar_log', logItem);
        }
        return;
      }

      // Edit Detail Log Mahar
      const editMaharBtn = e.target.closest('button[data-editmaharlog]');
      if (editMaharBtn) {
        const id = editMaharBtn.getAttribute('data-editmaharlog');
        openQuickStep2Form('edit_mahar_log', 'mahar', id, 'direct_edit');
        return;
      }

      const toggleBtn = e.target.closest('button[data-toggleseserahan]');
      if (toggleBtn) {
        const id = toggleBtn.getAttribute('data-toggleseserahan');
        const it = state.data.seserahan.find(function(x) { return x.id === id; });
        if (it) {
          it.status = (it.status === 'Selesai') ? 'Pending' : 'Selesai';
          saveLocalState();
          refreshAll();
          showToast('Status "' + it.item + '" diubah ke ' + it.status);
          await pushToAppsScript('update_seserahan', it);
        }
        return;
      }

      const editBtn = e.target.closest('button[data-editmod]');
      if (editBtn) {
        openQuickStep2Form('item', editBtn.getAttribute('data-editmod'), editBtn.getAttribute('data-editid'), 'direct_edit');
      }
    });

    safeOn('btnSubTamu', 'click', function() {
      const vTamu = document.getElementById('subview-tamu');
      if (vTamu) vTamu.classList.remove('hidden');
      const vKua = document.getElementById('subview-adminkua');
      if (vKua) vKua.classList.add('hidden');
      const bTamu = document.getElementById('btnSubTamu');
      if (bTamu) bTamu.className = 'min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
      const bKua = document.getElementById('btnSubAdminKua');
      if (bKua) bKua.className = 'min-h-[44px] px-4 py-2 rounded-full text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
    });

    safeOn('btnSubAdminKua', 'click', function() {
      const vKua = document.getElementById('subview-adminkua');
      if (vKua) vKua.classList.remove('hidden');
      const vTamu = document.getElementById('subview-tamu');
      if (vTamu) vTamu.classList.add('hidden');
      const bKua = document.getElementById('btnSubAdminKua');
      if (bKua) bKua.className = 'min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
      const bTamu = document.getElementById('btnSubTamu');
      if (bTamu) bTamu.className = 'min-h-[44px] px-4 py-2 rounded-full text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
    });

    document.querySelectorAll('.guest-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.activeGuestTab = btn.getAttribute('data-guesttab');
        document.querySelectorAll('.guest-tab-btn').forEach(function(b) {
          if (b.getAttribute('data-guesttab') === state.activeGuestTab) {
            b.className = 'guest-tab-btn min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
          } else {
            b.className = 'guest-tab-btn min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
          }
        });
        renderGuestsAndKua();
      });
    });

    safeOn('guestSearchInput', 'input', renderGuestsAndKua);
    safeOn('guestRsvpFilter', 'change', renderGuestsAndKua);
    safeOn('guestCategoryFilter', 'change', renderGuestsAndKua);
    safeOn('btnAddGuestSlot', 'click', function() {
      openQuickStep2Form('guest', null, null);
    });

    // Buka Modal Ubah Kuota Tamu
    const btnOpenQuota = document.getElementById('btnOpenEditQuotaModal');
    const quotaModal = document.getElementById('editQuotaModal');
    const inpCppQuota = document.getElementById('quotaInputCpp');
    const inpCpwQuota = document.getElementById('quotaInputCpw');
    const previewTotalQuota = document.getElementById('previewTotalQuotaText');

    function updatePreviewQuotaSum() {
      const vCpp = Math.max(1, Number(inpCppQuota.value) || 0);
      const vCpw = Math.max(1, Number(inpCpwQuota.value) || 0);
      previewTotalQuota.textContent = (vCpp + vCpw) + ' Pax';
    }

    if (btnOpenQuota && quotaModal && inpCppQuota && inpCpwQuota) {
      btnOpenQuota.addEventListener('click', function() {
        updatePreviewQuotaSum();
        openQuotaModal();
      });

      safeOn('btnCloseQuotaModal', 'click', function() {
        closeQuotaModal();
      });

      inpCppQuota.addEventListener('input', updatePreviewQuotaSum);
      inpCpwQuota.addEventListener('input', updatePreviewQuotaSum);

      safeOn('formEditQuota', 'submit', async function(e) {
        e.preventDefault();
        const newCpp = Math.max(1, Number(inpCppQuota.value) || 200);
        const newCpw = Math.max(1, Number(inpCpwQuota.value) || 200);
        const newTotal = newCpp + newCpw;

        if (!state.data.meta) state.data.meta = {};
        state.data.meta.targetPaxCpp = newCpp;
        state.data.meta.targetPaxCpw = newCpw;
        state.data.meta.targetPaxTotal = newTotal;

        saveLocalState();
        quotaModal.classList.add('hidden', 'pointer-events-none');
        refreshAll();
        showToast('Alokasi kuota tamu berhasil diperbarui menjadi ' + newTotal + ' Pax!');

        await pushToAppsScript('update_guest_quota', { targetPaxCpp: newCpp, targetPaxCpw: newCpw });
      });
    }

    safeOn('guestListContainer', 'click', async function(e) {
      const rsvpBtn = e.target.closest('button[data-rsvpid]');
      if (rsvpBtn) {
        const id = rsvpBtn.getAttribute('data-rsvpid');
        const val = rsvpBtn.getAttribute('data-rsvpval');
        const g = state.data.tamu.find(function(x) { return x.id === id; });
        if (g) {
          g.rsvp = val;
          saveLocalState();
          refreshAll();
          showToast('RSVP "' + g.nama + '" diperbarui menjadi: ' + val);
          await pushToAppsScript('update_tamu', g);
        }
        return;
      }
      const editG = e.target.closest('button[data-editguest]');
      if (editG) {
        openQuickStep2Form('guest', null, editG.getAttribute('data-editguest'), 'direct_edit');
        return;
      }

      // Kirim Pesan Undangan via WhatsApp
      const waBtn = e.target.closest('button[data-sendinvwa]');
      if (waBtn) {
        const id = waBtn.getAttribute('data-sendinvwa');
        const g = state.data.tamu.find(function(x) { return x.id === id; });
        if (!g) return;

        const wDate = formatTanggalIndo((state.data.meta && state.data.meta.weddingDate) || '2027-06-27');
        const venue = (state.data.meta && state.data.meta.venue) || 'Venue Intimate';

        const lines = [
          'Assalamu’alaikum Warahmatullahi Wabarakatuh,',
          '',
          'Kepada Yth. *' + g.nama + '*,',
          '',
          'Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Sahabat untuk hadir dan memberikan doa restu pada hari pernikahan kami:',
          '',
          '*Farhan Rafiqi & Indira Gusti*',
          'Tanggal: ' + wDate,
          'Lokasi: ' + venue,
          '',
          '_Link website undangan resmi & e-invitation akan kami kirimkan menyusul._',
          '',
          'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Sahabat berkenan hadir.',
          '',
          'Wassalamu’alaikum Warahmatullahi Wabarakatuh.'
        ];
        const msgText = lines.join(String.fromCharCode(10));

        let digits = String(g.whatsapp || '').replace(/[^0-9]/g, '');
        if (digits.startsWith('0')) digits = '62' + digits.slice(1);

        const waUrl = digits
          ? 'https://wa.me/' + digits + '?text=' + encodeURIComponent(msgText)
          : 'https://api.whatsapp.com/send?text=' + encodeURIComponent(msgText);

        window.open(waUrl, '_blank');
        g.statusUndangan = 'Digital';
        saveLocalState();
        refreshAll();
        showToast('Pesan undangan WhatsApp siap dikirimkan ke ' + g.nama + '!');
        await pushToAppsScript('update_tamu', g);
        return;
      }

      // Kirim Pesan Undangan via Instagram DM
      const igBtn = e.target.closest('button[data-sendinvig]');
      if (igBtn) {
        const id = igBtn.getAttribute('data-sendinvig');
        const g = state.data.tamu.find(function(x) { return x.id === id; });
        if (!g) return;

        const wDate = formatTanggalIndo((state.data.meta && state.data.meta.weddingDate) || '2027-06-27');
        const venue = (state.data.meta && state.data.meta.venue) || 'Venue Intimate';

        const lines = [
          'Halo ' + g.nama + ',',
          '',
          'Tanpa mengurangi rasa hormat, kami ingin mengundang kamu untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:',
          '',
          'Farhan Rafiqi & Indira Gusti',
          'Tanggal: ' + wDate,
          'Lokasi: ' + venue,
          '',
          'Link website undangan & e-invitation resmi akan kami kirimkan menyusul.',
          '',
          'Terima kasih banyak atas doa dan restunya.'
        ];
        const msgText = lines.join(String.fromCharCode(10));

        const ta = document.createElement('textarea');
        ta.value = msgText;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch(e) {}
        document.body.removeChild(ta);

        const igHandle = String(g.instagram || '').replace(/[@\s]/g, '');
        const igUrl = igHandle ? 'https://instagram.com/' + igHandle : 'https://instagram.com/direct/inbox/';
        window.open(igUrl, '_blank');

        g.statusUndangan = 'Digital';
        saveLocalState();
        refreshAll();
        showToast('Draf teks undangan disalin ke clipboard & membuka profil IG ' + g.nama + '!');
        await pushToAppsScript('update_tamu', g);
        return;
      }
    });

    safeOn('adminKuaContainer', 'click', async function(e) {
      const chkBtn = e.target.closest('button[data-kuacheck]');
      if (!chkBtn) return;
      const id = chkBtn.getAttribute('data-kuacheck');
      const side = chkBtn.getAttribute('data-kuaside');
      const item = state.data.administrasi.find(function(x) { return x.id === id; });
      if (!item) return;

      if (side === 'cpp' && item.cppCheck !== 'NA') item.cppCheck = !item.cppCheck;
      if (side === 'cpw' && item.cpwCheck !== 'NA') item.cpwCheck = !item.cpwCheck;
      saveLocalState();
      refreshAll();
      showToast('Status berkas "' + item.dokumen + '" diperbarui.');
      await pushToAppsScript('update_administrasi', item);
    });

    function setVendorSubView(v) {
      ['rundown', 'vendors', 'timeline'].forEach(function(k) {
        const el = document.getElementById('subview-' + k);
        if (el) {
          if (k === v) el.classList.remove('hidden');
          else el.classList.add('hidden');
        }
      });
      const rdBar = document.getElementById('rundownHeaderBar');
      if (rdBar) {
        if (v === 'rundown') rdBar.classList.remove('hidden');
        else rdBar.classList.add('hidden');
      }
      const bRundown = document.getElementById('btnSubRundown');
      const bVendors = document.getElementById('btnSubVendors');
      const bTimeline = document.getElementById('btnSubTimeline');
      const actCls = 'px-4 py-2 rounded-full min-h-[44px] text-xs font-semibold bg-[#ECF3EF] text-[#244233] border border-[#C6DDD0]';
      const inactCls = 'px-4 py-2 rounded-full min-h-[44px] text-xs font-medium bg-[#FFFFFF] text-[#57534E] border border-[#EAE6DF] hover:bg-[#EFECE6]';
      if (bRundown) bRundown.className = (v === 'rundown' ? actCls : inactCls);
      if (bVendors) bVendors.className = (v === 'vendors' ? actCls : inactCls);
      if (bTimeline) bTimeline.className = (v === 'timeline' ? actCls : inactCls);
    }

    safeOn('btnSubRundown', 'click', function() { setVendorSubView('rundown'); });
    safeOn('btnSubVendors', 'click', function() { setVendorSubView('vendors'); });
    safeOn('btnSubTimeline', 'click', function() { setVendorSubView('timeline'); });

    safeOn('subview-rundown', 'click', async function(e) {
      const editBtn = e.target.closest('button[data-editrundown]');
      if (editBtn) {
        const id = editBtn.getAttribute('data-editrundown');
        openQuickStep2Form('item', 'rundown', id, 'direct_edit');
        return;
      }
      const btn = e.target.closest('button[data-togglerundown]');
      if (!btn) return;
      const id = btn.getAttribute('data-togglerundown');
      const r = state.data.rundown.find(function(x) { return x.id === id; });
      if (!r) return;
      const order = ['Siap', 'Dalam Proses', 'Selesai', 'Menunggu'];
      r.status = order[(order.indexOf(r.status) + 1) % order.length];
      saveLocalState();
      refreshAll();
      showToast('Sesi "' + r.sesi + '" diubah menjadi: ' + r.status);
      await pushToAppsScript('update_rundown', Object.assign({ tableType: 'rundown' }, r));
    });

    safeOn('vendorListContainer', 'click', function(e) {
      const btn = e.target.closest('button[data-editmod="vendors"]') || e.target.closest('button[data-editid]') || e.target.closest('button[data-editvendor]');
      if (!btn) return;
      const id = btn.getAttribute('data-editid') || btn.getAttribute('data-editvendor');
      openQuickStep2Form('item', 'vendors', id, 'direct_edit');
    });

    safeOn('subview-timeline', 'click', async function(e) {
      const editBtn = e.target.closest('button[data-edittimeline]');
      if (editBtn) {
        const id = editBtn.getAttribute('data-edittimeline');
        openQuickStep2Form('item', 'timeline', id, 'direct_edit');
        return;
      }
      const btn = e.target.closest('button[data-toggletimeline]');
      if (!btn) return;
      const id = btn.getAttribute('data-toggletimeline');
      const t = state.data.timeline.find(function(x) { return x.id === id; });
      if (!t) return;
      const order = ['Belum Mulai', 'Dalam Proses', 'Selesai'];
      t.status = order[(order.indexOf(t.status) + 1) % order.length];
      saveLocalState();
      refreshAll();
      showToast('Milestone "' + t.agenda + '" diubah ke: ' + t.status);
      await pushToAppsScript('update_rundown', Object.assign({ tableType: 'timeline' }, t));
    });

    safeOn('btnFabQuickAction', 'click', openQuickStep1);
    safeOn('btnCloseQuickStep1', 'click', closeQuickModal);
    safeOn('btnBackToQuickStep1', 'click', function() {
      if (quickModalOpenedFrom === 'direct_edit') {
        closeQuickModal();
      } else {
        if (modalHistoryDepth > 1) {
          try { window.history.back(); } catch(e) { openQuickStep1(true); }
        } else {
          openQuickStep1(true);
        }
      }
    });
    safeOn('btnCloseQuickStep2', 'click', closeQuickModal);

    document.querySelectorAll('.action-card-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const choice = btn.getAttribute('data-actionchoice');
        if (choice === 'mahar' && state.role === 'committee') {
          closeQuickModal();
          openRoleUnlockModal();
          showToast('Masukkan PIN Mempelai untuk membuka & mencatat Mahar.', true);
          return;
        }
        openQuickStep2Form(choice, null, null);
      });
    });

    safeOn('editModuleSelect', 'change', function(e) {
      const mode = document.getElementById('editItemMode').value;
      if (mode === 'add') {
        populateAddCategoryDropdown(e.target.value);
        resetFormForNewItem(e.target.value);
      } else {
        populateEditItemDropdown(e.target.value, null);
      }
    });
    safeOn('editItemSelect', 'change', loadSelectedEditItemFields);
    const pSelect = document.getElementById('editPicSelect');
    const pInput = document.getElementById('editPicInput');
    if (pSelect && pInput) {
      pSelect.addEventListener('change', function() {
        if (pSelect.value !== 'Lainnya') {
          pInput.value = pSelect.value;
          pInput.classList.add('hidden');
        } else {
          pInput.value = '';
          pInput.classList.remove('hidden');
          pInput.focus();
        }
      });
    }

    async function withFormSubmitting(formEl, busyText, fn) {
      const btn = formEl ? formEl.querySelector('button[type="submit"]') : null;
      const origHtml = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
        btn.textContent = busyText || '⏳ Menyimpan ke Sheets...';
      }
      try {
        return await fn();
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.classList.remove('opacity-70', 'cursor-not-allowed');
          btn.innerHTML = origHtml;
        }
      }
    }

    ['editEstimasiInput', 'editRealisasiInput', 'maharTotalRealisasiInput'].forEach(function(id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function() {
        if (el.readOnly) return;
        const n = parseDigits(el.value);
        el.value = n > 0 ? formatDots(n) : '';
        if (id === 'maharTotalRealisasiInput') updateMaharPreview();
      });
    });

    safeOn('maharKomponenSelect', 'change', function(e) {
      syncMaharTargetField();
      updateMaharPreview();
    });
    safeOn('maharVolumeInput', 'input', updateMaharPreview);
    safeOn('maharMultiplierInput', 'input', updateMaharPreview);
    safeOn('maharTargetQtyInput', 'input', updateMaharPreview);

    safeOn('formEditItem', 'submit', async function(e) {
      e.preventDefault();
      const formEl = this;
      const errEl = document.getElementById('editItemError');
      if (errEl) { errEl.classList.add('hidden'); errEl.textContent = ''; }

      const formMode = document.getElementById('editItemMode').value;
      const modKey = document.getElementById('editModuleSelect').value;
      const customNameVal = (document.getElementById('editCustomNameInput').value || '').trim();
      if (!customNameVal) {
        showToast('Nama item tidak boleh kosong.', true);
        return;
      }

      const estInpEl = document.getElementById('editEstimasiInput');
      const realInpEl = document.getElementById('editRealisasiInput');
      const estVal = parseDigits(estInpEl ? estInpEl.value : '');
      const realVal = parseDigits(realInpEl ? realInpEl.value : '');
      const rawRealText = (realInpEl ? realInpEl.value : '').trim();
      const stVal = document.getElementById('editStatusSelect').value;
      const picVal = (document.getElementById('editPicInput').value || '').trim();
      const noteVal = (document.getElementById('editNoteInput').value || '').trim();

      if (formMode === 'add') {
        const catVal = document.getElementById('addCategorySelect') ? document.getElementById('addCategorySelect').value : 'Umum';
        const targetRow = resolveNewSheetRowSlot(modKey, catVal);
        if (!targetRow) {
          const fullMsg = 'Slot baris pada modul ' + modKey + ' di spreadsheet sudah penuh.';
          if (errEl) { errEl.textContent = fullMsg; errEl.classList.remove('hidden'); }
          showToast(fullMsg, true);
          return;
        }

        let newItem = null;
        let actionName = 'add_wedding_tracker';

        if (modKey === 'seserahan') {
          const noVal = getExistingSheetRowNo('SESERAHAN', targetRow, 1, state.data.seserahan.length + 1);
          newItem = {
            id: 'SS-R' + targetRow,
            sheet: 'SESERAHAN',
            rowIndex: targetRow,
            no: noVal,
            kategori: catVal,
            item: customNameVal,
            brand: picVal,
            harga: realVal,
            link: noteVal,
            status: stVal || 'Pending'
          };
          state.data.seserahan.push(newItem);
          actionName = 'add_seserahan';
        } else if (modKey === 'preWedding') {
          const noVal = getExistingSheetRowNo('PRE WEDDING', targetRow, 1, state.data.preWedding.length + 1);
          newItem = {
            id: 'PW-R' + targetRow,
            sheet: 'PRE WEDDING',
            rowIndex: targetRow,
            no: noVal,
            kategori: catVal,
            item: customNameVal,
            pic: picVal || 'CPP & CPW Bersama',
            target: '',
            estimasi: estVal,
            realisasi: realVal,
            status: stVal || 'Belum Dimulai',
            catatan: noteVal
          };
          state.data.preWedding.push(newItem);
          actionName = 'update_pre_wedding';
        } else if (modKey === 'vendors') {
          const noVal = getExistingSheetRowNo('VENDOR DIRECTORY', targetRow, 1, state.data.vendors.length + 1);
          newItem = {
            id: 'VD-R' + targetRow,
            sheet: 'VENDOR DIRECTORY',
            rowIndex: targetRow,
            no: noVal,
            kategori: catVal,
            nama: customNameVal,
            kontak: picVal,
            nilaiKontrak: estVal,
            sisaPembayaran: realVal,
            statusKerjasama: 'Riset',
            statusPembayaran: stVal || 'Belum Bayar',
            layanan: '',
            catatan: noteVal
          };
          state.data.vendors.push(newItem);
          actionName = 'update_vendor';
        } else if (modKey === 'rundown') {
          const noVal = getExistingSheetRowNo('TIMELINE & RUNDOWN', targetRow, 1, targetRow - 30);
          newItem = {
            id: 'RD-R' + targetRow,
            rowIndex: targetRow,
            no: noVal,
            waktu: (estInpEl && estInpEl.value ? estInpEl.value.trim() : '') || '08:00',
            durasi: '30 Menit',
            sesi: customNameVal,
            deskripsi: noteVal,
            lokasi: rawRealText || 'Venue',
            pic: picVal || 'Wedding Organizer',
            vendor: '',
            status: stVal || 'Siap',
            catatan: ''
          };
          state.data.rundown.push(newItem);
          actionName = 'update_rundown';
        } else if (modKey === 'timeline') {
          const noVal = getExistingSheetRowNo('TIMELINE & RUNDOWN', targetRow, 1, targetRow - 7);
          newItem = {
            id: 'TL-R' + targetRow,
            rowIndex: targetRow,
            no: noVal,
            fase: 'H-Bulan',
            kategori: catVal,
            agenda: customNameVal,
            rincian: noteVal,
            target: '',
            pic: picVal || 'CPP & CPW Bersama',
            status: stVal || 'Belum Mulai'
          };
          state.data.timeline.push(newItem);
          actionName = 'update_timeline';
        } else {
          const noVal = getExistingSheetRowNo('WEDDING TRACKER', targetRow, 1, targetRow - 7);
          newItem = {
            id: 'WT-R' + targetRow,
            sheet: 'WEDDING TRACKER',
            rowIndex: targetRow,
            no: noVal,
            kategori: catVal,
            item: customNameVal,
            pic: picVal || 'CPP & CPW Bersama',
            target: '',
            estimasi: estVal,
            realisasi: realVal,
            status: stVal || 'Belum Dimulai',
            catatan: noteVal
          };
          state.data.weddingTracker.push(newItem);
          actionName = 'add_wedding_tracker';
        }

        await withFormSubmitting(formEl, 'Menyimpan ke Sheets...', async function() {
          saveLocalState();
          refreshAll();
          const syncRes = await pushToAppsScript(actionName, newItem);
          closeQuickModal();
          if (syncRes && syncRes.ok) {
            showToast('Item baru "' + customNameVal + '" tersimpan ke Google Sheets.');
          } else {
            showToast('Tersimpan lokal, gagal kirim ke Google Sheets: ' + ((syncRes && syncRes.error) || 'Periksa koneksi'), true);
          }
        });
        return;
      }

      const itemId = document.getElementById('editItemSelect').value;
      const list = state.data[modKey] || [];
      const it = list.find(function(x) { return x.id === itemId; });
      if (!it) return;

      let actionName = 'update_wedding_tracker';
      if (modKey === 'seserahan') {
        if (customNameVal) it.item = customNameVal;
        if (state.role === 'couple') it.harga = realVal;
        it.status = stVal;
        it.brand = picVal;
        it.link = noteVal;
        actionName = 'update_seserahan';
      } else if (modKey === 'vendors') {
        if (customNameVal) it.nama = customNameVal;
        if (state.role === 'couple') {
          it.nilaiKontrak = estVal;
          it.sisaPembayaran = realVal;
        }
        it.statusPembayaran = stVal;
        it.kontak = picVal;
        it.catatan = noteVal;
        actionName = 'update_vendor';
      } else if (modKey === 'rundown') {
        if (customNameVal) it.sesi = customNameVal;
        it.status = stVal;
        it.pic = picVal;
        it.catatan = noteVal;
        it.lokasi = rawRealText || (it.lokasi || '');
        actionName = 'update_rundown';
      } else if (modKey === 'timeline') {
        if (customNameVal) it.agenda = customNameVal;
        it.status = stVal;
        it.pic = picVal;
        it.rincian = noteVal;
        actionName = 'update_timeline';
      } else {
        if (state.role === 'couple') {
          it.estimasi = estVal;
          it.realisasi = realVal;
        }
        it.status = stVal;
        it.pic = picVal;
        it.catatan = noteVal;
        if (customNameVal) it.item = customNameVal;
        actionName = (modKey === 'preWedding') ? 'update_pre_wedding' : 'update_wedding_tracker';
      }

      await withFormSubmitting(formEl, 'Menyimpan ke Sheets...', async function() {
        saveLocalState();
        refreshAll();
        const syncRes = await pushToAppsScript(actionName, it);
        closeQuickModal();
        if (syncRes && syncRes.ok) {
          showToast('Data "' + (customNameVal || it.item || it.nama || it.sesi || it.agenda) + '" diperbarui di Google Sheets.');
        } else {
          showToast('Tersimpan lokal, gagal kirim ke Google Sheets: ' + ((syncRes && syncRes.error) || 'Periksa koneksi'), true);
        }
      });
    });

    safeOn('formAddMahar', 'submit', async function(e) {
      e.preventDefault();
      const formEl = this;
      const komp = document.getElementById('maharKomponenSelect').value;
      const targetQty = Math.max(0.01, Number(document.getElementById('maharTargetQtyInput').value) || 1);
      const tgl = document.getElementById('maharDateInput').value || new Date().toISOString().split('T')[0];
      const vol = Math.max(0, parseFloat(document.getElementById('maharVolumeInput').value) || 0);
      const multInp = document.getElementById('maharMultiplierInput');
      const mult = multInp ? Math.max(1, parseInt(multInp.value, 10) || 1) : 1;
      const inputPrice = parseDigits(document.getElementById('maharTotalRealisasiInput').value);
      const calc = computeMaharEntryValues(komp, vol, mult, inputPrice);
      const totalRealisasi = calc.totalRealisasi;
      const st = document.getElementById('maharStatusSelect').value;
      const acc = (document.getElementById('maharAccountInput').value || '').trim();
      const note = (document.getElementById('maharNoteInput').value || '').trim();
      const editLogId = document.getElementById('maharLogEditId').value;

      const tObj = state.data.maharTargets.find(function(t) {
        if (komp === 'Saham BSSR') return /saham|bssr/i.test(t.instrumen);
        if (komp === 'Emas Hartadinata') return /emas|logam\s*mulia/i.test(t.instrumen);
        return /uang|tunai/i.test(t.instrumen);
      });
      const targetChanged = Boolean(tObj && Number(tObj.targetJumlah) !== Number(targetQty));
      const hasLogEntry = Boolean(calc.volume > 0 && (inputPrice > 0 || st === 'Terencana'));

      let nextLogRow = 0;
      if (hasLogEntry && !editLogId) {
        nextLogRow = resolveNewSheetRowSlot('maharLogs');
        if (!nextLogRow) {
          showToast('Slot Log Cicilan Mahar (baris 16-' + getMaharMaxLogRow() + ') di Sheet MAHAR penuh.', true);
          return;
        }
      }

      await withFormSubmitting(formEl, 'Menyimpan ke Sheets...', async function() {
        let targetRes = { ok: true };
        if (targetChanged && tObj) {
          tObj.targetJumlah = targetQty;
          targetRes = await pushToAppsScript('update_mahar_target', {
            rowIndex: tObj.rowIndex,
            targetJumlah: targetQty,
            _opts: { skipPull: hasLogEntry, quietSuccessToast: hasLogEntry }
          });
        }

        if (hasLogEntry) {
          const satuan = calc.satuan;
          const price = calc.hargaSatuan;

          if (editLogId) {
            const targetLog = state.data.maharLogs.find(function(x) { return x.id === editLogId; });
            if (targetLog) {
              targetLog.tanggal = tgl;
              targetLog.komponen = komp;
              targetLog.volume = calc.volume;
              targetLog.satuan = satuan;
              targetLog.hargaSatuan = price;
              targetLog.status = st;
              targetLog.totalRealisasi = totalRealisasi;
              targetLog.sumberDana = acc;
              targetLog.catatan = note;

              recalculateMaharTargets();
              saveLocalState();
              refreshAll();
              const logRes = await pushToAppsScript('update_mahar_log', targetLog);
              closeQuickModal();
              if (logRes && logRes.ok) {
                showToast('Log transaksi Mahar diperbarui di Google Sheets.');
              } else {
                showToast('Tersimpan lokal, gagal kirim ke Sheets: ' + ((logRes && logRes.error) || ''), true);
              }
              return;
            }
          }

          const noVal = getExistingSheetRowNo('MAHAR', nextLogRow, 1, nextLogRow - 15);
          const newLog = {
            id: 'ML-R' + nextLogRow,
            rowIndex: nextLogRow,
            no: noVal,
            tanggal: tgl,
            komponen: komp,
            volume: calc.volume,
            satuan: satuan,
            hargaSatuan: price,
            status: st,
            totalRealisasi: totalRealisasi,
            sumberDana: acc,
            catatan: note
          };

          state.data.maharLogs.push(newLog);
          recalculateMaharTargets();
          saveLocalState();
          refreshAll();
          const addRes = await pushToAppsScript('add_mahar_log', newLog);
          closeQuickModal();
          if (addRes && addRes.ok) {
            showToast('Cicilan Mahar (' + komp + ') tersimpan di Google Sheets.');
          } else {
            showToast('Tersimpan lokal, gagal kirim ke Sheets: ' + ((addRes && addRes.error) || ''), true);
          }
          return;
        }

        recalculateMaharTargets();
        saveLocalState();
        closeQuickModal();
        refreshAll();
        if (targetChanged && targetRes && !targetRes.ok) {
          showToast('Target lokal berubah, gagal update ke Sheets: ' + (targetRes.error || ''), true);
        } else {
          showToast('Target Mahar (' + komp + ': ' + targetQty + ') berhasil diperbarui.');
        }
      });
    });

    safeOn('formGuestModal', 'submit', async function(e) {
      e.preventDefault();
      const formEl = this;
      const editId = document.getElementById('guestEditId').value;
      const side = document.getElementById('guestSideSelect').value;
      const rawCircle = document.getElementById('guestCircleSelect').value;
      const isFam = rawCircle.indexOf('Keluarga Inti') !== -1;
      const circle = isFam ? 'Keluarga Inti' : rawCircle;
      const kelompok = isFam ? 'Keluarga Inti' : 'Tamu Umum';
      const nama = (document.getElementById('guestNameInput').value || '').trim();
      const pax = Math.max(1, Number(document.getElementById('guestPaxInput').value) || 1);
      const invSt = document.getElementById('guestInviteStatus').value;
      const rsvp = document.getElementById('guestRsvpSelect').value;
      const waVal = (document.getElementById('guestWaInput').value || '').trim();
      const igVal = (document.getElementById('guestIgInput').value || '').trim();

      if (!nama) {
        showToast('Nama tamu tidak boleh kosong.', true);
        return;
      }

      let targetGuest = null;
      if (editId) {
        targetGuest = state.data.tamu.find(function(x) { return x.id === editId; });
        if (targetGuest) {
          targetGuest.side = side;
          targetGuest.kategori = circle;
          targetGuest.kelompok = kelompok;
          targetGuest.nama = nama;
          targetGuest.pax = pax;
          targetGuest.statusUndangan = invSt;
          targetGuest.rsvp = rsvp;
          targetGuest.whatsapp = waVal;
          targetGuest.instagram = igVal;
        }
      } else {
        const slotRow = resolveNewSheetRowSlot('tamu', null, { side: side, isFam: isFam });
        if (!slotRow) {
          showToast('Slot daftar tamu ' + side + ' (' + kelompok + ') di Sheet TAMU sudah penuh.', true);
          return;
        }
        const noColIdx = (side === 'CPP') ? 1 : 8;
        const defaultNo = isFam ? (slotRow - 9) : (slotRow - 22);
        const noVal = getExistingSheetRowNo('TAMU', slotRow, noColIdx, defaultNo);
        targetGuest = {
          id: 'TM-' + side + (isFam ? '-FAM-R' : '-GEN-R') + slotRow,
          rowIndex: slotRow,
          side: side,
          kelompok: kelompok,
          no: noVal,
          kategori: circle,
          nama: nama,
          pax: pax,
          statusUndangan: invSt,
          rsvp: rsvp,
          whatsapp: waVal,
          instagram: igVal
        };
        state.data.tamu.push(targetGuest);
      }

      if (targetGuest) {
        if (!state.guestExtras) state.guestExtras = {};
        const keyByName = side + '|' + nama.toLowerCase();
        state.guestExtras[targetGuest.id] = { whatsapp: waVal, instagram: igVal };
        state.guestExtras[keyByName] = { whatsapp: waVal, instagram: igVal };
      }

      await withFormSubmitting(formEl, 'Menyimpan ke Sheets...', async function() {
        saveLocalState();
        refreshAll();
        const syncRes = targetGuest ? await pushToAppsScript('update_tamu', targetGuest) : { ok: false };
        closeQuickModal();
        if (syncRes && syncRes.ok) {
          showToast('Tamu "' + nama + '" tersimpan ke Google Sheets.');
        } else {
          showToast('Tersimpan lokal, gagal kirim ke Google Sheets: ' + ((syncRes && syncRes.error) || ''), true);
        }
      });
    });

// openRoleUnlockModal defined above
    // Modal Edit Nama Mempelai
    const btnEditCouple = document.getElementById('btnEditCoupleNames');
    const coupleModal = document.getElementById('coupleNameModal');
    const inpCpp = document.getElementById('inpNameCpp');
    const inpCpw = document.getElementById('inpNameCpw');

    safeOn('btnEditCoupleNames', 'click', function() {
      openCoupleNameModal();
    });

    safeOn('btnCloseCoupleNameModal', 'click', function() {
      closeCoupleNameModal();
    });

    safeOn('formEditCoupleNames', 'submit', async function(e) {
      e.preventDefault();
      const newCpp = (inpCpp ? inpCpp.value : 'FARHAN RAFIQI') || 'FARHAN RAFIQI';
      const newCpw = (inpCpw ? inpCpw.value : 'INDIRA GUSTI') || 'INDIRA GUSTI';

      if (!state.data.meta) state.data.meta = {};
      state.data.meta.cpp = newCpp.trim();
      state.data.meta.cpw = newCpw.trim();

      const heroNames = document.getElementById('heroCoupleNames');
      if (heroNames) {
        heroNames.innerHTML = escapeHtml(state.data.meta.cpp) + ' <span class="italic font-normal text-[#9A7B4F]">&amp;</span> ' + escapeHtml(state.data.meta.cpw);
      }
      const titleHdr = document.getElementById('headerCoupleTitle');
      if (titleHdr) titleHdr.textContent = state.data.meta.cpp + ' & ' + state.data.meta.cpw;

      saveLocalState();
      closeCoupleNameModal();
      refreshAll();
      showToast('Nama mempelai berhasil diperbarui: ' + state.data.meta.cpp + ' & ' + state.data.meta.cpw);
      await pushToAppsScript('update_master_meta', { cpp: state.data.meta.cpp, cpw: state.data.meta.cpw });
    });

    safeOn('btnSwitchRole', 'click', function() { openRoleUnlockModal(); });
    safeOn('btnUnlockHero', 'click', function() { openRoleUnlockModal(); });
    safeOn('btnCloseRoleModal', 'click', function() { closeRoleModal(); });

    safeOn('btnActivateCommittee', 'click', function() {
      state.role = 'committee';
      state.config.pin = '2027';
      saveLocalState();
      closeRoleModal();
      refreshAll();
      showToast('Mode Panitia & Tamu aktif (Anggaran disembunyikan).');
    });

    safeOn('btnUnlockCouple', 'click', function() {
      const pinVal = (document.getElementById('pinUnlockInput').value || '').trim();
      if (pinVal === '270627') {
        state.role = 'couple';
        state.config.pin = '270627';
        saveLocalState();
        closeRoleModal();
        refreshAll();
        showToast('Mode Mempelai aktif: Seluruh anggaran ditampilkan.');
      } else {
        const errEl = document.getElementById('pinErrorText');
        if (errEl) errEl.classList.remove('hidden');
      }
    });

    const btnCopyWa = document.getElementById('btnCopyWaRundown');
    if (btnCopyWa) {
      btnCopyWa.addEventListener('click', function() {
        const meta = state.data.meta || {};
        const wDateStr = formatTanggalIndo(meta.weddingDate || '2027-06-27');
        const venueStr = meta.venue || 'Venue Intimate';
        const lines = [
          '*RUNDOWN ACARA PERNIKAHAN FARHAN & INDIRA*',
          'Hari/Tanggal: ' + wDateStr,
          'Lokasi: ' + venueStr,
          '------------------------------------------',
          ''
        ];

        state.data.rundown.forEach(function(r) {
          lines.push('*' + r.waktu + ' (' + r.durasi + ')* — ' + r.sesi);
          lines.push('   - Sesi: ' + r.deskripsi);
          lines.push('   - Tempat: ' + r.lokasi);
          lines.push('   - PIC: ' + r.pic + ' | Vendor: ' + r.vendor);
          if (r.catatan) lines.push('   - Catatan: ' + r.catatan);
          lines.push('');
        });

        lines.push('------------------------------------------');
        lines.push('_Mohon seluruh panitia keluarga & WO hadir sesuai jadwal PIC masing-masing._');

        const ta = document.createElement('textarea');
        ta.value = lines.join(String.fromCharCode(10));
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showToast('Susunan Rundown Hari H (' + wDateStr + ') berhasil disalin!');
        } catch(e) {
          showToast('Gagal menyalin teks.', true);
        }
        document.body.removeChild(ta);
      });
    }

    safeOn('btnSyncSheets', 'click', function() {
      syncFromAppsScript(false);
    });
    safeOn('btnOpenSetup', 'click', function() {
      if (state.activeTab === 'setup') {
        switchMainTab(state.previousTab || 'master');
      } else {
        switchMainTab('setup');
      }
    });

    safeOn('btnSaveSyncConfig', 'click', function() {
      state.config.scriptUrl = getGasEndpoint();
      state.config.pin = (document.getElementById('cfgPinInput').value || '2027').trim();
      if (state.config.pin === '270627') state.role = 'couple';
      else state.role = 'committee';
      saveLocalState();
      syncFromAppsScript(false);
    });

    safeOn('btnSaveMasterMeta', 'click', async function() {
      const newDate = (document.getElementById('cfgWeddingDateInput').value || '2027-06-27').trim();
      const newVenue = (document.getElementById('cfgVenueInput').value || 'Venue Intimate').trim();
      if (!state.data.meta) state.data.meta = {};
      state.data.meta.weddingDate = newDate;
      state.data.meta.venue = newVenue;
      saveLocalState();
      refreshAll();
      showToast('Jadwal Master diperbarui menjadi: ' + formatTanggalIndo(newDate));
      await pushToAppsScript('update_master_meta', { weddingDate: newDate, venue: newVenue });
    });

    safeOn('weddingTestingChecklist', 'change', function(e) {
      const chk = e.target.closest('input[data-wchk]');
      if (!chk) return;
      state.checklist[chk.getAttribute('data-wchk')] = chk.checked;
      saveLocalState();
      renderSetupView();
    });
  }

  function initApp() {
    try {
      closeAllModals(true);
    } catch (eClose) {
      console.error('closeAllModals init error:', eClose);
    }

    try {
      loadLocalState();
    } catch (e) {
      console.error('loadLocalState error:', e);
    }

    try {
      updateCountdownDisplay();
    } catch (eCd) {}

    try {
      const elPin = document.getElementById('cfgPinInput');
      if (elPin) elPin.value = state.config.pin || '';
    } catch (e) {}

    // 1. DAFTARKAN EVENT LISTENER TERLEBIH DAHULU (KRUSIAL: Tombol langsung aktif & responsif!)
    try {
      initEvents();
    } catch (eEvents) {
      console.error('initEvents error:', eEvents);
    }

    // 2. Populate filter dropdowns
    try {
      populateModuleFilters();
    } catch (eFilters) {
      console.error('populateModuleFilters error:', eFilters);
    }

    // 3. Render dashboard & views secara terisolasi
    try {
      refreshAll();
    } catch (eRefresh) {
      console.error('refreshAll error:', eRefresh);
    }

    // Graceful fallback: render data lokal segera & tutup splash screen
    setTimeout(hideSplashScreen, 400);

    // 4. Auto-sync background tanpa memblokir interaksi pengguna
    try {
      if (state.config.scriptUrl) {
        syncFromAppsScript(true);
      }
    } catch (eSync) {
      console.error('syncFromAppsScript error:', eSync);
    }

    // 5. Hard timeout failsafe (maksimal 2 detik)
    setTimeout(hideSplashScreen, 2000);

    try {
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && state.config.scriptUrl) {
          syncFromAppsScript(true);
        }
      });
    } catch (eVis) {}

    try {
      if ('serviceWorker' in navigator && window.location.protocol.indexOf('http') === 0) {
        navigator.serviceWorker.register('./sw.js').catch(function() {});
      }
    } catch (eSw) {}

    // === SMART IOS PWA INSTALL PROMPT ===
    try {
      const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) ||
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
      const isTestIos = new URLSearchParams(window.location.search).get('test_ios') === 'true';

      if ((isIos && !isStandalone) || isTestIos) {
        const isDismissed = sessionStorage.getItem('ios_install_prompt_dismissed');
        if (!isDismissed || isTestIos) {
          setTimeout(function() {
            const banner = document.getElementById('iosInstallBanner');
            if (banner) {
              banner.classList.remove('hidden');
              requestAnimationFrame(function() {
                banner.classList.remove('opacity-0', 'translate-y-4');
              });
            }
          }, 1500);
        }
      }

      const btnCloseIos = document.getElementById('btnCloseIosPrompt');
      if (btnCloseIos) {
        btnCloseIos.addEventListener('click', function() {
          sessionStorage.setItem('ios_install_prompt_dismissed', 'true');
          const banner = document.getElementById('iosInstallBanner');
          if (banner) {
            banner.classList.add('opacity-0', 'translate-y-4');
            setTimeout(function() {
              banner.classList.add('hidden');
            }, 300);
          }
        });
      }
    } catch (eIosPrompt) {
      console.warn('iOS prompt initialization notice:', eIosPrompt);
    }

    // === GITHUB PAGES SUBPATH MANIFEST AUTO-SYNC ===
    try {
      if (window.location.pathname.indexOf('/byIndira') !== -1) {
        const mLink = document.querySelector('link[rel="manifest"]');
        if (mLink) {
          fetch(mLink.href)
            .then(function(r) { return r.json(); })
            .then(function(m) {
              m.start_url = window.location.pathname;
              m.scope = window.location.pathname;
              const blob = new Blob([JSON.stringify(m)], { type: 'application/manifest+json' });
              mLink.href = URL.createObjectURL(blob);
            })
            .catch(function() {});
        }
      }
    } catch(eManifestSync) {}
  }

  // JALANKAN INISIALISASI SECARA ROBUST & AMAN
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
