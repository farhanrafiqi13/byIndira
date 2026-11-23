(function() {
  'use strict';

  // Gunakan STORAGE_KEY_DATA v3 agar cache lama (26 Juni / 26 Lot / 18 Prewed) otomatis digantikan data terbaru
  const STORAGE_KEY_DATA = 'farhan_indira_wedding_data_v3';
  const STORAGE_KEY_CFG = 'farhan_indira_wedding_cfg_v1';
  const STORAGE_KEY_CHK = 'farhan_indira_wedding_chk_v1';

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
      scriptUrl: (typeof SheetApi !== 'undefined' ? SheetApi.DEFAULT_ENDPOINT : 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec'),
      pin: '270627'
    },
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
      const defaultEndpoint = (typeof SheetApi !== 'undefined' ? SheetApi.DEFAULT_ENDPOINT : 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec');
      if (rawCfg) {
        const cfg = JSON.parse(rawCfg);
        state.config.scriptUrl = cfg.scriptUrl || defaultEndpoint;
        state.config.pin = cfg.pin || '270627';
        state.role = (cfg.role === 'committee') ? 'committee' : 'couple';
      } else {
        state.config.scriptUrl = defaultEndpoint;
        state.config.pin = '270627';
        state.role = 'couple';
      }
      const rawChk = localStorage.getItem(STORAGE_KEY_CHK);
      if (rawChk) state.checklist = JSON.parse(rawChk) || {};
    } catch (e) {}
  }

  function saveLocalState() {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(state.data));
      localStorage.setItem(STORAGE_KEY_CFG, JSON.stringify({
        scriptUrl: state.config.scriptUrl,
        pin: state.config.pin,
        role: state.role
      }));
      localStorage.setItem(STORAGE_KEY_CHK, JSON.stringify(state.checklist));
    } catch (e) {}
  }

  function formatRp(num) {
    if (state.role === 'committee') return '🔒 Privasi';
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
    el.className = 'px-4 py-3 rounded-2xl shadow-lg text-xs font-bold animate-slide-up ' +
      (isError ? 'bg-[#DA3633] text-white' : 'bg-[#161B22] text-[#F0F6FC] border border-[#30363D]');
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
    if (btnWT) btnWT.textContent = '💍 Akad & Resepsi (' + activeWT.length + ')';
    if (btnPW) btnPW.textContent = '📷 Pre-Wedding (' + activePW.length + ')';
    if (btnSS) btnSS.textContent = '🎁 Seserahan (' + activeSS.length + ')';
    if (btnMH) btnMH.textContent = '🪙 Mahar (' + validMaharLogs.length + ')';
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
        { key: 'tracker', name: '💍 Wedding Tracker (Akad & Resepsi)', pagu: p1Pagu, real: p1Real, statusText: p1Status, pct: p1Pct },
        { key: 'prewed', name: '📷 Pre-Wedding & Rangkaian', pagu: p2Pagu, real: p2Real, statusText: p2Status, pct: p2Pct },
        { key: 'seserahan', name: '🎁 Hantaran & Seserahan', pagu: p3Pagu, real: p3Real, statusText: p3Status, pct: p3Pct },
        { key: 'mahar', name: '🪙 Mahar (' + bssrLotTarget + ' Lot BSSR, Emas, Tunai)', pagu: p4Pagu, real: p4Real, statusText: p4Status, pct: p4Pct },
        { key: 'kua', name: '📋 Administrasi KUA & Legal', pagu: p5Pagu, real: p5Real, statusText: p5Status, pct: p5Pct },
        { key: 'tamu', name: '👥 Daftar Tamu & RSVP', pagu: targetTotal, real: totalRegistered, statusText: p6Status, subText: p6SubText, paguText: p6PaguText, pct: registeredPct, isGuest: true }
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
      badge.textContent = '🔒 Otorisasi Panitia';
      badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D29922]/15 text-[#D29922] border border-[#D29922] font-mono';
      finHero.classList.add('hidden');
      privBanner.classList.remove('hidden');
      chartsSec.classList.add('hidden');
      btnMaharTab.classList.add('hidden');
      editFinFields.classList.add('hidden');
      vContract.classList.add('hidden');
      vRem.classList.add('hidden');
    } else {
      badge.textContent = '🔓 Otorisasi Mempelai';
      badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3FB950]/15 text-[#3FB950] border border-[#238636] font-mono';
      finHero.classList.remove('hidden');
      privBanner.classList.add('hidden');
      chartsSec.classList.remove('hidden');
      btnMaharTab.classList.remove('hidden');
      editFinFields.classList.remove('hidden');
      vContract.classList.remove('hidden');
      vRem.classList.remove('hidden');

      // Pastikan wrapper chart tidak tersembunyi agar canvas memiliki dimensi ukuran saat digambar
      const wPagu = document.getElementById('wrapperSectionPaguChart');
      const wShare = document.getElementById('wrapperSectionShareChart');
      const lblPagu = document.getElementById('labelToggleSectionPaguChart');
      const lblShare = document.getElementById('labelToggleSectionShareChart');
      if (wPagu) wPagu.classList.remove('hidden');
      if (wShare) wShare.classList.remove('hidden');
      if (lblPagu) lblPagu.textContent = 'Hide';
      if (lblShare) lblShare.textContent = 'Hide';
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
        countdownElement.textContent = '⏳ ' + (diffDays > 0 ? diffDays : 0) + ' Hari Menuju Acara';
      }
    } catch (eCd) {}
  }

  function renderMasterDashboard() {
    const meta = state.data.meta || {};
    const wDateIso = meta.weddingDate || '2027-06-27';
    const wDateFormatted = formatTanggalIndo(wDateIso);
    const venueStr = meta.venue || 'Venue Intimate';
    const targetStr = meta.targetReady || 'April 2027 (H-2 Bulan)';

    // Update seluruh teks nama, tanggal & profil dari MASTER
    const heroNames = document.getElementById('heroCoupleNames');
    if (heroNames) heroNames.textContent = (meta.cpp || 'FARHAN RAFIQI') + ' & ' + (meta.cpw || 'INDIRA GUSTI');
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
    const serapanDisplay = (hasFormula && state.data.masterFormulas.serapanPctStr) ? (state.data.masterFormulas.serapanPctStr + ' dari total anggaran') : (pctSerapan + '% dari total anggaran');

    // Update Interactive Budget Circular Ring
    const budgetPctEl = document.getElementById('budgetProgressPercent');
    if (budgetPctEl) {
      budgetPctEl.textContent = (hasFormula && state.data.masterFormulas.serapanPctStr) ? state.data.masterFormulas.serapanPctStr : (pctSerapan + '%');
    }
    const budgetCircleEl = document.getElementById('budgetProgressCircle');
    if (budgetCircleEl) {
      const circ = 2 * Math.PI * 40; // ~251.3
      const numPct = Math.min(100, Math.max(0, Number(pctSerapan)));
      const offset = circ - (circ * numPct / 100);
      budgetCircleEl.style.strokeDashoffset = offset;
    }

    document.getElementById('kpiTotalPagu').textContent = state.role === 'committee' ? '🔒 Privasi' : totalPaguDisplay;
    document.getElementById('kpiTotalRealisasi').textContent = state.role === 'committee' ? '🔒 Privasi' : totalRealDisplay;
    document.getElementById('kpiSerapanPct').textContent = serapanDisplay;
    document.getElementById('kpiSisaAnggaran').textContent = state.role === 'committee' ? '🔒 Privasi' : totalSisaDisplay;

    const grid = document.getElementById('masterModuleCardsGrid');
    grid.innerHTML = m.pillars.map(function(p) {
      if (state.role === 'committee' && p.key === 'mahar') return '';
      const subText = p.isGuest
        ? 'CPP: ' + m.cppPax + ' Pax &bull; CPW: ' + m.cpwPax + ' Pax'
        : (state.role === 'committee' ? 'Anggaran disembunyikan' : 'Realisasi: ' + formatRp(p.real));
      const paguText = p.isGuest
        ? 'Target: ' + p.pagu + ' Pax'
        : (state.role === 'committee' ? '' : 'Pagu: ' + formatRp(p.pagu));

      return (
        '<button type="button" data-jump="' + p.key + '" class="jump-card-btn bento-surface rounded-md p-3.5 text-left border border-[#30363D] hover:border-[#8B949E] transition flex flex-col justify-between group bg-[#161B22] shadow-xs active:scale-95">' +
          '<div>' +
            '<div class="flex items-center justify-between gap-1 mb-1">' +
              '<span class="text-xs font-bold text-[#F0F6FC] group-hover:text-[#58A6FF] truncate transition">' + escapeHtml(p.name) + '</span>' +
              '<span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#21262D] text-[#58A6FF] border border-[#30363D] font-mono tabular-nums">' + p.pct + '%</span>' +
            '</div>' +
            '<p class="text-[11px] font-semibold text-[#8B949E]">' + escapeHtml(p.statusText) + '</p>' +
            '<p class="text-[11px] text-[#8B949E] mt-1 font-mono tabular-nums">' + subText + '</p>' +
            (paguText ? '<p class="text-[10px] text-[#8B949E] font-mono tabular-nums">' + paguText + '</p>' : '') +
          '</div>' +
          '<div class="w-full h-1.5 rounded-full bg-[#21262D] overflow-hidden mt-2.5 border border-[#30363D]">' +
            '<div class="h-full bg-[#58A6FF] rounded-full transition-all duration-500" style="width:' + Math.max(4, p.pct) + '%"></div>' +
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
                  backgroundColor: '#21262D',
                  borderColor: '#30363D',
                  borderWidth: 1,
                  borderRadius: 4
                },
                {
                  label: 'Realisasi Aktual',
                  data: finPillars.map(function(p) { return p.real; }),
                  backgroundColor: '#58A6FF',
                  borderRadius: 4
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
                  grid: { color: '#21262D' },
                  ticks: {
                    color: '#8B949E',
                    font: { size: 10, weight: '600' },
                    callback: function(v) { return 'Rp' + (v / 1000000).toFixed(0) + 'jt'; }
                  }
                },
                x: {
                  grid: { display: false },
                  ticks: { color: '#8B949E', font: { size: 10, weight: '600' } }
                }
              },
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 10, color: '#C9D1D9', font: { size: 11, weight: '600' } } },
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
                backgroundColor: ['#58A6FF', '#238636', '#D29922', '#BC8CFF', '#F85149'],
                borderWidth: 2,
                borderColor: '#161B22'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 300 },
              cutout: '64%',
              plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 10, color: '#C9D1D9', font: { size: 11, weight: '600' } } },
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
          const s = p.pagu - p.real;
          return (
            '<div class="flex items-center justify-between text-xs py-2 border-b border-[#30363D] last:border-0">' +
              '<span class="font-bold text-[#F0F6FC] truncate">' + escapeHtml(p.name) + '</span>' +
              '<div class="flex items-center gap-2 font-mono tabular-nums shrink-0">' +
                '<span class="text-[#58A6FF] font-black">' + formatRp(p.real) + '</span>' +
                '<span class="text-[#8B949E] font-semibold text-[10px]">(' + (p.pagu > 0 ? ((p.real / p.pagu) * 100).toFixed(0) : '0') + '%)</span>' +
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
          unusedInfo.innerHTML = 'Menampilkan seluruh <strong>' + list.length + ' item</strong> (termasuk ' + totalUnusedInMod + ' item "Tidak Digunakan").';
          btnToggleUnused.textContent = 'Sembunyikan "Tidak Digunakan" (' + totalUnusedInMod + ')';
        } else {
          unusedInfo.innerHTML = 'Menampilkan <strong>' + totalActiveInMod + ' item aktif</strong> (' + totalUnusedInMod + ' item "Tidak Digunakan" disembunyikan).';
          btnToggleUnused.textContent = 'Tampilkan "Tidak Digunakan" (' + totalUnusedInMod + ')';
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
      container.innerHTML = '<div class="bento-surface rounded-xl p-8 text-center text-xs text-[#8B949E] bg-[#161B22] border border-[#30363D]">Tidak ada item yang cocok dengan filter.</div>';
      return;
    }

    container.innerHTML = filtered.map(function(item) {
      const isSeserahan = (modKey === 'seserahan');
      const isInactive = isItemUnused(item);
      const isDone = item.status === 'Selesai' || String(item.status || '').indexOf('Selesai') === 0 || item.status.indexOf('Deal') !== -1;
      const badgeDot = isInactive ? 'status-dot-slate' : (isDone ? 'status-dot-emerald' : (item.status.indexOf('Proses') !== -1 ? 'status-dot-amber' : 'status-dot-slate'));
      const badgeCls = isInactive
        ? 'bg-[#21262D] text-[#8B949E] border border-[#30363D]'
        : isDone
        ? 'bg-[#238636]/15 text-[#3FB950] border border-[#238636]'
        : item.status.indexOf('Proses') !== -1
        ? 'bg-[#D29922]/15 text-[#D29922] border border-[#D29922]'
        : 'bg-[#21262D] text-[#8B949E] border border-[#30363D]';

      const priceHtml = isSeserahan
        ? '<p class="text-xs sm:text-sm font-black text-[#58A6FF] font-mono tabular-nums">' + formatRp(item.harga) + '</p>' +
          '<p class="text-[10px] text-[#8B949E] font-medium">' + escapeHtml(item.brand || '-') + '</p>'
        : '<p class="text-xs sm:text-sm font-black text-[#58A6FF] font-mono tabular-nums">' + formatRp(item.realisasi) + '</p>' +
          '<p class="text-[10px] text-[#8B949E] font-mono tabular-nums">Est: ' + formatRp(item.estimasi) + '</p>';

      return (
        '<div class="bento-surface rounded-md p-3.5 flex items-start justify-between gap-3 border border-[#30363D] bg-[#161B22] hover:border-[#8B949E] transition shadow-xs ' + (isInactive ? 'opacity-50' : '') + '">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5 flex-wrap">' +
              '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#8B949E] border border-[#30363D] text-[10px] font-bold">' + escapeHtml(item.kategori) + '</span>' +
              '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold ' + badgeCls + '"><span class="status-dot ' + badgeDot + '"></span>' + escapeHtml(item.status) + '</span>' +
              '<span class="text-[10px] text-[#8B949E] font-mono tabular-nums">#' + item.rowIndex + '</span>' +
            '</div>' +
            '<p class="text-xs sm:text-sm font-bold text-[#F0F6FC] mt-1">' + escapeHtml(item.item) + '</p>' +
            '<p class="text-[11px] text-[#8B949E] mt-0.5">' +
              (isSeserahan
                ? (item.link ? '<a href="' + escapeHtml(item.link) + '" target="_blank" rel="noopener noreferrer" class="text-[#58A6FF] font-bold hover:underline">Link Toko</a>' : 'Belum ada link')
                : 'PIC: <strong class="text-[#C9D1D9]">' + escapeHtml(item.pic || '-') + '</strong>' + (item.target ? ' &bull; Target: ' + escapeHtml(item.target) : '')) +
            '</p>' +
          '</div>' +
          '<div class="text-right shrink-0 flex flex-col items-end gap-1.5">' +
            priceHtml +
            '<div class="flex items-center gap-1.5">' +
              (isSeserahan
                ? '<button type="button" data-toggleseserahan="' + item.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md text-[11px] font-bold transition active:scale-95 flex items-center justify-center ' + (item.status === 'Selesai' ? 'bg-[#238636]/15 text-[#3FB950] border border-[#238636]' : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D] border border-[#30363D]') + '">' + (item.status === 'Selesai' ? '✓ Selesai' : 'Tandai') + '</button>'
                : '') +
              '<button type="button" data-editmod="' + modKey + '" data-editid="' + item.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition active:scale-95 flex items-center justify-center">Edit</button>' +
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
      if (/saham|bssr/i.test(t.instrumen)) return (t.targetJumlah || 27) + ' Lot Saham BSSR';
      if (/emas|logam\s*mulia/i.test(t.instrumen)) return (t.targetJumlah || 6) + ' Gram Emas Hartadinata / Logam Mulia';
      return 'Tunai ' + formatRp(t.totalEstimasi);
    }).join(' • ');

    const targetsHtml = state.data.maharTargets.map(function(t) {
      let p = 0;
      let volProgress = '';
      if (t.targetJumlah > 0 && t.collectedVolume !== undefined) {
        p = Math.min(100, Math.round((t.collectedVolume / t.targetJumlah) * 100));
        volProgress = 'Terkumpul: <strong class="text-[#C9D1D9]">' + t.collectedVolume + ' / ' + t.targetJumlah + ' ' + escapeHtml(t.satuan) + ' (' + p + '%)</strong>';
      } else {
        p = t.totalEstimasi > 0 ? Math.min(100, Math.round((t.realisasi / t.totalEstimasi) * 100)) : 0;
        volProgress = 'Target: <strong class="text-[#C9D1D9]">' + t.targetJumlah + ' ' + escapeHtml(t.satuan) + '</strong>';
      }
      return (
        '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] space-y-2.5 shadow-xs">' +
          '<div class="flex items-start justify-between gap-2">' +
            '<div>' +
              '<div class="flex items-center gap-1.5 flex-wrap">' +
                '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold ' + (t.status === 'Selesai' || String(t.status || '').indexOf('Lengkap') !== -1 ? 'bg-[#238636]/15 text-[#3FB950] border border-[#238636]' : 'bg-[#D29922]/15 text-[#D29922] border border-[#D29922]') + '">' + escapeHtml(t.status) + '</span>' +
                '<span class="text-[10px] text-[#8B949E] font-medium">Batas: ' + escapeHtml(t.batasWaktu || 'Hari H') + '</span>' +
              '</div>' +
              '<h4 class="text-xs sm:text-sm font-bold text-[#F0F6FC] mt-1">' + escapeHtml(t.instrumen) + '</h4>' +
              '<p class="text-[11px] text-[#8B949E] mt-0.5">' + volProgress + ' &bull; PIC: <strong class="text-[#C9D1D9]">' + escapeHtml(t.pic || 'CPP') + '</strong></p>' +
            '</div>' +
            '<div class="text-right shrink-0 font-tabular">' +
              '<p class="text-xs sm:text-sm font-black text-[#58A6FF]">' + formatRp(t.realisasi) + '</p>' +
              '<p class="text-[11px] text-[#8B949E]">Est: ' + formatRp(t.totalEstimasi) + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="space-y-1">' +
            '<div class="flex items-center justify-between text-[10px] text-[#8B949E] font-tabular font-bold">' +
              '<span>Progress Serapan Target</span>' +
              '<span>' + p + '%</span>' +
            '</div>' +
            '<div class="w-full bg-[#21262D] rounded-full h-2 overflow-hidden border border-[#30363D]">' +
              '<div class="bg-[#58A6FF] h-full rounded-full transition-all duration-500" style="width: ' + p + '%"></div>' +
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
        '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] flex items-center justify-between gap-3 flex-wrap shadow-xs hover:border-[#8B949E] transition">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5 flex-wrap">' +
              '<span class="text-xs sm:text-sm font-bold text-[#F0F6FC]">' + escapeHtml(l.komponen) + ' (' + l.volume + ' ' + escapeHtml(l.satuan) + ')</span>' +
              '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold ' + (isSelesai ? 'bg-[#238636]/15 text-[#3FB950] border border-[#238636]' : 'bg-[#D29922]/15 text-[#D29922] border border-[#D29922]') + '">' + escapeHtml(l.status) + '</span>' +
              '<span class="text-[10px] text-[#8B949E] font-tabular">Baris #' + l.rowIndex + '</span>' +
            '</div>' +
            '<p class="text-[11px] text-[#8B949E] mt-0.5">' + escapeHtml(l.tanggal) + ' &bull; Sumber: ' + escapeHtml(l.sumberDana || '-') + '</p>' +
          '</div>' +
          '<div class="text-right shrink-0 flex items-center gap-2">' +
            '<div class="text-right font-tabular mr-1">' +
              '<p class="text-xs sm:text-sm font-black text-[#58A6FF]">' + formatRp(l.totalRealisasi) + '</p>' +
              '<p class="text-[10px] text-[#8B949E]">@ ' + formatRp(l.hargaSatuan) + '</p>' +
            '</div>' +
            '<button type="button" data-togglemaharstatus="' + l.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md text-[10px] font-bold border transition active:scale-95 flex items-center justify-center ' + (isSelesai ? 'bg-[#238636]/15 text-[#3FB950] border-[#238636] hover:bg-[#238636]/25' : 'bg-[#21262D] text-[#8B949E] border-[#30363D] hover:bg-[#30363D]') + '">' + (isSelesai ? '✓ Selesai' : 'Pending') + '</button>' +
            '<button type="button" data-editmaharlog="' + l.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[10px] font-bold border border-[#30363D] transition active:scale-95 flex items-center justify-center">Edit</button>' +
            '<button type="button" data-deletemaharlog="' + l.id + '" class="min-h-[38px] min-w-[38px] p-2 rounded-md bg-[#21262D] hover:bg-[#DA3633]/25 text-[#F85149] hover:text-[#F85149] border border-[#30363D] hover:border-[#DA3633] transition active:scale-95 flex items-center justify-center shrink-0" title="Hapus Catatan Mahar">' +
              '<i data-lucide="trash-2" class="w-3.5 h-3.5 text-[#F85149]"></i>' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    container.innerHTML = (
      '<div class="space-y-4">' +
        '<div class="p-4 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs flex items-center justify-between gap-3 flex-wrap">' +
          '<div>' +
            '<div class="flex items-center gap-2">' +
              '<span class="text-lg">💍</span>' +
              '<h3 class="text-sm font-bold text-[#F0F6FC]">Komposisi Mahar Dinamis</h3>' +
              '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#58A6FF]/15 text-[#58A6FF] border border-[#58A6FF]/30">' + pct + '% Terkumpul</span>' +
            '</div>' +
            '<p class="text-xs text-[#8B949E] mt-1">' + escapeHtml(dynamicSubparts) + '</p>' +
          '</div>' +
          '<div class="flex items-center gap-2">' +
            '<button type="button" id="btnOpenMaharPurchaseModal" class="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#238636] hover:bg-[#2EA043] active:bg-[#1A6328] text-white font-bold text-xs shadow-xs btn-shine flex items-center gap-1.5 transition active:scale-95">' +
              '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg> Log Pembelian' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
          targetsHtml +
        '</div>' +
        '<div class="space-y-2.5">' +
          '<div class="flex items-center justify-between">' +
            '<h4 class="text-xs font-bold text-[#F0F6FC] uppercase tracking-wider">Riwayat Cicil & Akumulasi Mahar</h4>' +
            '<span class="text-[11px] font-bold text-[#8B949E] font-tabular">' + logsList.length + ' Transaksi</span>' +
          '</div>' +
          '<div class="space-y-2">' +
            (logsHtml || '<div class="bento-surface rounded-xl p-6 text-center text-xs text-[#8B949E] bg-[#161B22] border border-[#30363D]">Belum ada catatan transaksi cicil mahar.</div>') +
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
    if (window.lucide) window.lucide.createIcons();
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
      if (gtab === 'all') b.textContent = 'Semua (' + targetTotal + ' Pax)';
      else if (gtab === 'CPP') b.innerHTML = '🤵 Pihak CPP (Farhan &bull; ' + targetCpp + ')';
      else if (gtab === 'CPW') b.innerHTML = '👰 Pihak CPW (Indira &bull; ' + targetCpw + ')';

      if (gtab === state.activeGuestTab) {
        b.className = 'guest-tab-btn px-3 py-1.5 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
      } else {
        b.className = 'guest-tab-btn px-3 py-1.5 rounded-md text-xs font-medium bg-transparent text-[#8B949E] border border-transparent hover:text-[#C9D1D9] hover:bg-[#21262D]';
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
      gContainer.innerHTML = '<div class="bento-surface rounded-xl p-6 text-center text-xs text-[#8B949E] bg-[#161B22] border border-[#30363D]">Tidak ada tamu yang cocok dengan filter ini.</div>';
    } else {
      gContainer.innerHTML = filteredGuests.map(function(g) {
        const sideBadge = g.side === 'CPP'
          ? 'bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/30'
          : 'bg-[#A371F7]/15 text-[#A371F7] border-[#A371F7]/30';
        return (
          (function() {
            const rawPhone = String(g.whatsapp || '').replace(/[^0-9]/g, '');
            const waDigits = rawPhone ? (rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone) : '';
            const rawIg = String(g.instagram || '').replace(/[@\s]/g, '');
            const contactSub = (g.whatsapp ? '📱 WA: ' + escapeHtml(g.whatsapp) + ' ' : '') + (g.instagram ? '📸 IG: @' + escapeHtml(rawIg) : '');

            return (
              '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs space-y-2.5 transition hover:border-[#8B949E]">' +
                '<div class="flex items-start justify-between gap-2">' +
                  '<div class="min-w-0">' +
                    '<div class="flex items-center gap-1.5 flex-wrap">' +
                      '<span class="px-2 py-0.5 rounded-md border text-[10px] font-bold ' + sideBadge + '">' + g.side + '</span>' +
                      '<span class="text-xs sm:text-sm font-bold text-[#F0F6FC]">' + escapeHtml(g.nama) + '</span>' +
                      '<span class="px-1.5 py-0.5 rounded-md bg-[#21262D] text-[#8B949E] text-[10px] font-bold font-tabular border border-[#30363D]">' + g.pax + ' Pax</span>' +
                    '</div>' +
                    '<p class="text-[11px] text-[#8B949E] mt-0.5">' + escapeHtml(g.kelompok) + ' &bull; ' + (g.kategori || '-') + '</p>' +
                    (contactSub ? '<p class="text-[11px] text-[#8B949E] mt-0.5">' + contactSub + '</p>' : '') +
                  '</div>' +
                  '<div class="flex items-center gap-1.5 shrink-0">' +
                    (waDigits ? '<a href="https://wa.me/' + waDigits + '" target="_blank" rel="noopener noreferrer" class="min-h-[38px] px-2.5 py-1.5 rounded-md bg-[#238636]/15 hover:bg-[#238636]/25 text-[#3FB950] border border-[#238636] text-[11px] font-bold transition flex items-center justify-center active:scale-95">WA</a>' : '') +
                    '<button type="button" data-editguest="' + g.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition flex items-center justify-center active:scale-95">Edit</button>' +
                  '</div>' +
                '</div>' +
                '<div class="flex items-center justify-between pt-1 border-t border-[#30363D] text-xs">' +
                  '<span class="text-[11px] font-bold text-[#8B949E]">RSVP:</span>' +
                  '<div class="flex items-center gap-1.5">' +
                    '<button type="button" data-rsvpid="' + g.id + '" data-rsvpval="Hadir" class="min-h-[38px] px-3 py-1.5 rounded-md text-[11px] font-bold transition active:scale-95 flex items-center justify-center ' + (g.rsvp === 'Hadir' ? 'bg-[#238636] text-white shadow-xs' : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D] border border-[#30363D]') + '">Hadir</button>' +
                    '<button type="button" data-rsvpid="' + g.id + '" data-rsvpval="Ragu-ragu" class="min-h-[38px] px-3 py-1.5 rounded-md text-[11px] font-bold transition active:scale-95 flex items-center justify-center ' + (g.rsvp === 'Ragu-ragu' ? 'bg-[#D29922] text-white shadow-xs' : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D] border border-[#30363D]') + '">Ragu</button>' +
                    '<button type="button" data-rsvpid="' + g.id + '" data-rsvpval="Tidak Hadir" class="min-h-[38px] px-3 py-1.5 rounded-md text-[11px] font-bold transition active:scale-95 flex items-center justify-center ' + (g.rsvp === 'Tidak Hadir' ? 'bg-[#DA3633] text-white shadow-xs' : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D] border border-[#30363D]') + '">Tidak</button>' +
                  '</div>' +
                '</div>' +
              '</div>'
            );
          })()
        );
      }).join('');
    }

    document.getElementById('kuaProgressBadge').textContent = m.kuaCheckedSlots + ' / ' + m.kuaTotalSlots + ' Berkas Selesai';
    const kuaContainer = document.getElementById('adminKuaContainer');
    kuaContainer.innerHTML = state.data.administrasi.map(function(a) {
      const cppBtn = a.cppCheck === 'NA'
        ? '<span class="min-h-[38px] px-2.5 py-1.5 rounded-md bg-[#21262D] text-[#8B949E] text-[10px] font-bold border border-[#30363D] flex items-center justify-center">CPP: —</span>'
        : '<button type="button" data-kuacheck="' + a.id + '" data-kuaside="cpp" class="min-h-[38px] px-3 py-1.5 rounded-md text-[10px] font-bold border transition active:scale-95 flex items-center justify-center ' + (a.cppCheck ? 'bg-[#238636]/15 text-[#3FB950] border-[#238636]' : 'bg-[#21262D] text-[#8B949E] border-[#30363D] hover:bg-[#30363D]') + '">' + (a.cppCheck ? '✓ CPP Siap' : '☐ Ceklis CPP') + '</button>';

      const cpwBtn = a.cpwCheck === 'NA'
        ? '<span class="min-h-[38px] px-2.5 py-1.5 rounded-md bg-[#21262D] text-[#8B949E] text-[10px] font-bold border border-[#30363D] flex items-center justify-center">CPW: —</span>'
        : '<button type="button" data-kuacheck="' + a.id + '" data-kuaside="cpw" class="min-h-[38px] px-3 py-1.5 rounded-md text-[10px] font-bold border transition active:scale-95 flex items-center justify-center ' + (a.cpwCheck ? 'bg-[#238636]/15 text-[#3FB950] border-[#238636]' : 'bg-[#21262D] text-[#8B949E] border-[#30363D] hover:bg-[#30363D]') + '">' + (a.cpwCheck ? '✓ CPW Siap' : '☐ Ceklis CPW') + '</button>';

      return (
        '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs flex items-start justify-between gap-3 flex-wrap">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5">' +
              '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#8B949E] text-[10px] font-bold border border-[#30363D]">' + escapeHtml(a.instansi) + '</span>' +
              '<span class="text-[10px] text-[#8B949E] font-medium">Target: ' + escapeHtml(a.target || '-') + '</span>' +
            '</div>' +
            '<p class="text-xs sm:text-sm font-bold text-[#F0F6FC] mt-1">' + a.no + '. ' + escapeHtml(a.dokumen) + '</p>' +
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
        ? 'bg-[#238636]/15 text-[#3FB950] border-[#238636]'
        : r.status === 'Dalam Proses'
        ? 'bg-[#D29922]/15 text-[#D29922] border-[#D29922]'
        : 'bg-[#21262D] text-[#8B949E] border-[#30363D]';
      return (
        '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs flex items-start justify-between gap-3 hover:border-[#8B949E] transition">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5 flex-wrap">' +
              '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#58A6FF] border border-[#30363D] text-[10px] font-bold font-tabular">⏰ ' + escapeHtml(r.waktu) + ' (' + escapeHtml(r.durasi) + ')</span>' +
              '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold ' + stCls + '"><span class="status-dot ' + stDot + '"></span>' + escapeHtml(r.status) + '</span>' +
              '<span class="text-[10px] font-semibold text-[#8B949E]">📍 ' + escapeHtml(r.lokasi) + '</span>' +
            '</div>' +
            '<p class="text-xs sm:text-sm font-bold text-[#F0F6FC] mt-1">' + r.no + '. ' + escapeHtml(r.sesi) + '</p>' +
            '<p class="text-[11px] text-[#8B949E] mt-1">👤 PIC: <strong class="text-[#C9D1D9]">' + escapeHtml(r.pic) + '</strong> &bull; Vendor: ' + escapeHtml(r.vendor) + '</p>' +
          '</div>' +
          '<div class="flex items-center gap-1.5 shrink-0">' +
            '<button type="button" data-togglerundown="' + r.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition flex items-center justify-center active:scale-95">Status</button>' +
            '<button type="button" data-editrundown="' + r.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition flex items-center justify-center active:scale-95">Edit</button>' +
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
          ? 'bg-[#238636]/15 text-[#3FB950] border-[#238636]'
          : isProses
          ? 'bg-[#D29922]/15 text-[#D29922] border-[#D29922]'
          : 'bg-[#21262D] text-[#8B949E] border-[#30363D]';
        return (
          '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs flex items-start justify-between gap-3 hover:border-[#8B949E] transition">' +
            '<div class="min-w-0 flex-1">' +
              '<div class="flex items-center gap-1.5 flex-wrap">' +
                '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#58A6FF] border border-[#30363D] text-[10px] font-bold font-tabular">📅 ' + escapeHtml(t.fase) + '</span>' +
                '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#8B949E] border border-[#30363D] text-[10px] font-bold">' + escapeHtml(t.kategori) + '</span>' +
                '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold ' + stCls + '"><span class="status-dot ' + stDot + '"></span>' + escapeHtml(t.status) + '</span>' +
              '</div>' +
              '<p class="text-xs sm:text-sm font-bold text-[#F0F6FC] mt-1">' + t.no + '. ' + escapeHtml(t.agenda) + '</p>' +
              '<p class="text-[11px] text-[#8B949E] mt-1">👤 PIC: <strong class="text-[#C9D1D9]">' + escapeHtml(t.pic) + '</strong>' + (t.target ? ' &bull; Target: ' + escapeHtml(t.target) : '') + '</p>' +
            '</div>' +
            '<div class="flex items-center gap-1.5 shrink-0">' +
              '<button type="button" data-toggletimeline="' + t.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition flex items-center justify-center active:scale-95">Status</button>' +
              '<button type="button" data-edittimeline="' + t.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition flex items-center justify-center active:scale-95">Edit</button>' +
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
    document.getElementById('vendorDealCount').textContent = dealCount + ' Deal / Aktif';
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
        '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs flex items-start justify-between gap-3 flex-wrap hover:border-[#8B949E] transition">' +
          '<div class="min-w-0 flex-1">' +
            '<div class="flex items-center gap-1.5 flex-wrap">' +
              '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#8B949E] border border-[#30363D] text-[10px] font-bold">' + escapeHtml(v.kategori) + '</span>' +
              '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#58A6FF] border border-[#30363D] text-[10px] font-bold">' + escapeHtml(v.statusKerjasama) + '</span>' +
              '<span class="px-2 py-0.5 rounded-md bg-[#21262D] text-[#D29922] border border-[#30363D] text-[10px] font-bold">' + escapeHtml(v.statusPembayaran) + '</span>' +
            '</div>' +
            '<p class="text-xs sm:text-sm font-bold text-[#F0F6FC] mt-1">' + v.no + '. ' + escapeHtml(v.nama) + '</p>' +
            '<p class="text-xs text-[#58A6FF] font-bold mt-0.5">📞 ' + escapeHtml(v.kontak) + '</p>' +
            '<p class="text-[11px] text-[#8B949E] mt-0.5">📦 ' + escapeHtml(v.layanan) + '</p>' +
          '</div>' +
          '<div class="text-right shrink-0 flex flex-col items-end gap-1.5">' +
            (state.role === 'couple'
              ? '<p class="text-xs font-bold text-[#F0F6FC] font-tabular">Kontrak: ' + formatRp(v.nilaiKontrak) + '</p>' +
                '<p class="text-[11px] font-bold text-[#58A6FF] font-tabular">Sisa: ' + formatRp(v.sisaPembayaran) + '</p>'
              : '<p class="text-xs font-bold text-[#8B949E]">Akses Finansial Terbatas</p>') +
            '<div class="flex items-center gap-1.5 mt-1">' +
              (waDigits ? '<a href="https://wa.me/' + waDigits + '" target="_blank" rel="noopener noreferrer" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#238636]/15 hover:bg-[#238636]/25 text-[#3FB950] border border-[#238636] text-[11px] font-bold transition flex items-center justify-center active:scale-95">WA</a>' : '') +
              (phoneDigits ? '<a href="tel:' + phoneDigits + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] border border-[#30363D] text-[11px] font-bold transition flex items-center justify-center active:scale-95">Telp</a>' : '') +
              (state.role === 'couple' ? '<button type="button" data-editmod="vendors" data-editid="' + v.id + '" class="min-h-[38px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] text-[11px] font-bold border border-[#30363D] transition flex items-center justify-center active:scale-95">Edit</button>' : '') +
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
        '<div class="p-4 rounded-xl bg-[#238636]/15 border border-[#238636] flex items-center justify-between gap-3">' +
          '<div class="flex items-center gap-2.5">' +
            '<span class="w-8 h-8 rounded-lg bg-[#238636] text-white flex items-center justify-center font-bold text-sm shrink-0">✓</span>' +
            '<div>' +
              '<h4 class="text-xs font-bold text-[#F0F6FC]">Semua Pengujian Tuntas! (6/6)</h4>' +
              '<p class="text-[11px] text-[#8B949E]">Aplikasi siap digunakan.</p>' +
            '</div>' +
          '</div>' +
          '<button type="button" id="btnResetChecklist" class="px-2.5 py-1 rounded-md bg-[#21262D] text-[#3FB950] border border-[#238636] text-[10px] font-bold hover:bg-[#30363D] transition shrink-0">Buka Lagi</button>' +
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
        '<label class="flex items-start gap-2.5 p-2.5 rounded-md bg-[#090D12] hover:bg-[#21262D] border border-[#30363D] cursor-pointer transition">' +
          '<input type="checkbox" data-wchk="' + item.id + '" ' + (done ? 'checked' : '') + ' class="mt-0.5 rounded accent-[#238636]" />' +
          '<span class="text-xs ' + (done ? 'line-through text-[#8B949E]' : 'text-[#C9D1D9] font-medium') + '">' + escapeHtml(item.text) + '</span>' +
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
      master: 'Master',
      modules: 'Modul',
      guests: 'Tamu & KUA',
      vendors: 'Acara & WO',
      setup: 'Konfigurasi'
    };
    const lblCur = document.getElementById('labelCurrentNavTab');
    if (lblCur && tabLabels[tabName]) lblCur.textContent = tabLabels[tabName];

    document.querySelectorAll('.bottom-nav-btn').forEach(function(btn) {
      const bTab = btn.getAttribute('data-tab');
      if (bTab === tabName) {
        btn.className = 'bottom-nav-btn min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-full text-xs font-semibold transition flex flex-col sm:flex-row items-center justify-center gap-1 text-[#58A6FF] bg-[#21262D] border border-[#30363D] shadow-xs active-pill-indicator active:scale-95';
      } else {
        btn.className = 'bottom-nav-btn min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-full text-xs font-medium transition flex flex-col sm:flex-row items-center justify-center gap-1 text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262D] border border-transparent active:scale-95';
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
        btnSetup.className = 'min-h-[44px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#58A6FF] border border-[#30363D] text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-xs';
        icnSetup.setAttribute('data-lucide', 'arrow-left');
      } else {
        lblSetup.textContent = 'Konfigurasi';
        btnSetup.className = 'min-h-[44px] px-3 py-1.5 rounded-md bg-[#21262D] hover:bg-[#30363D] text-[#C9D1D9] border border-[#30363D] text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-xs';
        icnSetup.setAttribute('data-lucide', 'settings');
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
          const kompVal = (/emas|logam\s*mulia/i.test(logItem.komponen || '') ? 'Emas Hartadinata' : (logItem.komponen || 'Saham BSSR'));
          document.getElementById('maharKomponenSelect').value = kompVal;
          document.getElementById('maharVolumeInput').value = logItem.volume || 1;
          const realInp = document.getElementById('maharTotalRealisasiInput');
          if (realInp) realInp.value = logItem.totalRealisasi ? formatDots(logItem.totalRealisasi) : '';
          document.getElementById('maharDateInput').value = logItem.tanggal || new Date().toISOString().split('T')[0];
          document.getElementById('maharStatusSelect').value = logItem.status || 'Selesai';
          document.getElementById('maharAccountInput').value = logItem.sumberDana || 'RDN Indo Premier (IPOT)';
          document.getElementById('maharNoteInput').value = logItem.catatan || '';
          if (infoBanner) infoBanner.innerHTML = 'Mengedit log baris #' + logItem.rowIndex + ' (Status: <strong>' + logItem.status + '</strong>).';
        }
      } else {
        document.getElementById('maharLogEditId').value = '';
        document.getElementById('maharDateInput').value = new Date().toISOString().split('T')[0];
        document.getElementById('maharVolumeInput').value = '1';
        const realInp = document.getElementById('maharTotalRealisasiInput');
        if (realInp) realInp.value = '';
        document.getElementById('maharStatusSelect').value = 'Selesai';
        if (infoBanner) infoBanner.innerHTML = 'Menambah baris riwayat di <strong>Tabel Log Cicilan (Baris 16+)</strong> sekaligus mengupdate <strong>Realisasi &amp; Target Mahar</strong>.';
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

  function populateAddCategoryDropdown(modKey) {
    const catSel = document.getElementById('addCategorySelect');
    if (!catSel) return;
    let cats = [];
    if (modKey === 'seserahan') {
      cats = ['Alat Solat', 'Skincare', 'Toiletries', 'Makeup', 'Underwear', 'Pakaian', 'Accessories', 'ETC'];
    } else if (modKey === 'preWedding') {
      cats = ['Lamaran', 'Foto Pre-Wedding', 'Pengajian Pranikah', 'Treatment Kesehatan'];
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
    const picInp = document.getElementById('editPicInput');
    const noteInp = document.getElementById('editNoteInput');

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
      document.getElementById('labelEditPic').textContent = 'Brand / Merek';
      picInp.value = '';
      stSel.innerHTML = '<option value="Pending">Pending (Rencana)</option><option value="Selesai">Selesai (Sudah Dibeli)</option><option value="Belum Dibeli">Belum Dibeli</option>';
    } else if (modKey === 'preWedding') {
      nameLbl.textContent = 'Nama Kebutuhan Pre-Wedding Baru';
      nameInp.placeholder = 'Contoh: Sewa Wardrobe Tambahan';
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = '0';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      picInp.value = 'CPP & CPW Bersama';
      stSel.innerHTML = '<option value="Belum Dimulai">Belum Dimulai</option><option value="Dalam Proses ⏳">Dalam Proses ⏳</option><option value="Deal / Booking">Deal / Booking</option><option value="Selesai ✅">Selesai ✅</option><option value="Tidak Digunakan">Tidak Digunakan</option>';
    } else {
      nameLbl.textContent = 'Nama Item / Tugas Akad-Resepsi Baru';
      nameInp.placeholder = 'Contoh: Tambahan Kursi / Genset';
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = '0';
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      picInp.value = 'CPP & CPW Bersama';
      stSel.innerHTML = '<option value="Belum Dimulai">Belum Dimulai</option><option value="Dalam Proses ⏳">Dalam Proses ⏳</option><option value="Deal / Booking">Deal / Booking</option><option value="Selesai ✅">Selesai ✅</option>';
    }
  }

  function populateEditItemDropdown(modKey, selectedId) {
    const itemSel = document.getElementById('editItemSelect');
    const stSel = document.getElementById('editStatusSelect');
    const list = state.data[modKey] || [];

    itemSel.innerHTML = list.map(function(it) {
      const label = it.item || it.agenda || it.nama || it.sesi || ('Baris #' + it.rowIndex);
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
      return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + '</option>';
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
      realInp.value = formatDots(it.harga);
      stSel.value = it.status || 'Pending';
      document.getElementById('labelEditPic').textContent = 'Brand / Merek';
      picInp.value = it.brand || '';
      noteInp.value = it.link || '';
    } else if (modKey === 'vendors') {
      document.getElementById('labelEditEstimasi').textContent = 'Nilai Kontrak (Rp)';
      estInp.value = formatDots(it.nilaiKontrak);
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Sisa Pembayaran (Rp)';
      realInp.value = formatDots(it.sisaPembayaran);
      stSel.value = it.statusPembayaran || 'Belum Bayar';
      document.getElementById('labelEditPic').textContent = 'Kontak / PIC Vendor';
      picInp.value = it.kontak || '';
      noteInp.value = it.catatan || '';
    } else if (modKey === 'rundown') {
      document.getElementById('labelEditEstimasi').textContent = 'Waktu Sesi';
      estInp.value = it.waktu || '';
      estInp.readOnly = true;
      document.getElementById('labelEditRealisasi').textContent = 'Lokasi';
      realInp.value = it.lokasi || '';
      stSel.value = it.status || 'Siap';
      document.getElementById('labelEditPic').textContent = 'PIC Lapangan';
      picInp.value = it.pic || '';
      noteInp.value = it.catatan || '';
    } else {
      document.getElementById('labelEditEstimasi').textContent = 'Estimasi Biaya (Rp)';
      estInp.value = formatDots(it.estimasi);
      estInp.readOnly = false;
      document.getElementById('labelEditRealisasi').textContent = 'Realisasi Aktual (Rp)';
      realInp.value = formatDots(it.realisasi);
      stSel.value = it.status || 'Belum Dimulai';
      document.getElementById('labelEditPic').textContent = 'PIC Pelaksana';
      const pSel = document.getElementById('editPicSelect');
      const valPic = it.pic || 'CPP & CPW Bersama';
      if (pSel) {
        let match = false;
        for (let i = 0; i < pSel.options.length; i++) {
          if (pSel.options[i].value === valPic) {
            pSel.selectedIndex = i;
            match = true;
            break;
          }
        }
        if (!match) pSel.value = 'Lainnya';
      }
      picInp.value = it.pic || '';
      noteInp.value = it.catatan || it.rincian || '';
    }
  }

  function syncMaharTargetField() {
    const komp = document.getElementById('maharKomponenSelect').value;
    const isEditLog = !!document.getElementById('maharLogEditId').value;
    const tInp = document.getElementById('maharTargetQtyInput');
    const vInp = document.getElementById('maharVolumeInput');
    const lblVol = document.getElementById('labelMaharVolume');
    const lblTgt = document.getElementById('labelMaharTarget');
    const noteInp = document.getElementById('maharNoteInput');
    const accInp = document.getElementById('maharAccountInput');

    const tObj = state.data.maharTargets.find(function(t) {
      if (komp === 'Saham BSSR') return /saham|bssr/i.test(t.instrumen);
      if (komp === 'Emas Hartadinata') return /emas|logam\s*mulia/i.test(t.instrumen);
      return /uang|tunai/i.test(t.instrumen);
    });

    if (komp === 'Emas Hartadinata') {
      if (lblVol) lblVol.textContent = 'Berat (Gram)';
      if (vInp) { vInp.step = 'any'; vInp.min = '0.01'; }
      if (lblTgt) lblTgt.textContent = 'Target Akumulasi (Gram)';
      if (tInp) { tInp.step = 'any'; tInp.value = tObj ? (tObj.targetJumlah || 6) : 6; }
      if (noteInp && !isEditLog) noteInp.placeholder = 'Misal: Logam Mulia Antam/Hartadinata, Toko Emas XYZ...';
      if (accInp && !isEditLog) accInp.value = 'Tabungan Emas / Kas Pribadi';
    } else if (komp === 'Saham BSSR') {
      if (lblVol) lblVol.textContent = 'Jumlah (Lot)';
      if (vInp) { vInp.step = '1'; vInp.min = '1'; }
      if (lblTgt) lblTgt.textContent = 'Target Akumulasi (Lot)';
      if (tInp) { tInp.step = '1'; tInp.value = tObj ? (tObj.targetJumlah || 27) : 27; }
      if (noteInp && !isEditLog) noteInp.placeholder = 'Cicil lot saham...';
      if (accInp && !isEditLog) accInp.value = 'RDN Indo Premier (IPOT)';
    } else {
      if (lblVol) lblVol.textContent = 'Jumlah / Paket';
      if (vInp) { vInp.step = '1'; vInp.min = '1'; }
      if (lblTgt) lblTgt.textContent = 'Target (Paket)';
      if (tInp) { tInp.step = '1'; tInp.value = tObj ? (tObj.targetJumlah || 1) : 1; }
      if (noteInp && !isEditLog) noteInp.placeholder = 'Misal: Uang Kertas Emisi Baru...';
      if (accInp && !isEditLog) accInp.value = 'Rekening Bank CPP';
    }
  }

  function updateMaharPreview() {
    const komp = document.getElementById('maharKomponenSelect').value;
    const vol = Math.max(0, parseFloat(document.getElementById('maharVolumeInput').value) || 0);
    const realInp = document.getElementById('maharTotalRealisasiInput');
    const total = realInp ? parseDigits(realInp.value) : 0;
    const previewEl = document.getElementById('maharCalcPreview');
    if (previewEl) {
      if (total > 0 && vol > 0) {
        let helperText = '';
        if (komp === 'Saham BSSR') {
          const lembar = Math.round(vol * 100);
          const perLembar = Math.round(total / (lembar || 1));
          helperText = ' (rata-rata ~' + formatRp(perLembar) + ' / lembar)';
        } else if (komp === 'Emas Hartadinata') {
          const perGram = Math.round(total / vol);
          helperText = ' (rata-rata ~' + formatRp(perGram) + ' / gram)';
        }
        previewEl.textContent = 'Total Realisasi Sesuai Nota: ' + formatRp(total) + helperText;
      } else if (total > 0) {
        previewEl.textContent = 'Total Realisasi Sesuai Nota: ' + formatRp(total);
      } else {
        previewEl.textContent = 'Masukkan nominal biaya realisasi sesuai nota/kuitansi fisik';
      }
    }
    return total;
  }

  async function syncMutation(sheetName, action, payload) {
    if (!state.config.scriptUrl) {
      state.config.scriptUrl = (typeof SheetApi !== 'undefined' ? SheetApi.DEFAULT_ENDPOINT : 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec');
    }
    const sp = document.getElementById('syncSpinner');
    if (sp) sp.classList.add('animate-spin');
    showToast('Menyinkronkan perubahan ke Google Sheets...', false);
    try {
      if (action === 'append') {
        await SheetApi.append(sheetName, payload.rowValues, state.config.scriptUrl, state.config.pin);
      } else if (action === 'updateRow') {
        await SheetApi.updateRow(sheetName, payload.rowIndex, payload.rowValues, payload.startCol || 1, state.config.scriptUrl, state.config.pin);
      } else if (action === 'deleteRow') {
        await SheetApi.deleteRow(sheetName, payload.rowIndex, state.config.scriptUrl, state.config.pin);
      }
      // Re-fetch seluruh 9 tab secara otomatis agar seluruh kalkulasi formula spreadsheet langsung terupdate
      await syncFromAppsScript(true);
      showToast('✓ Sinkronisasi Berhasil: Data formula & spreadsheet telah diperbarui!');
    } catch (e) {
      showToast('Gagal sinkronisasi: ' + (e.message || String(e)), true);
    } finally {
      if (sp) sp.classList.remove('animate-spin');
    }
  }

  async function pushToAppsScript(action, itemPayload) {
    if (!state.config.scriptUrl) {
      state.config.scriptUrl = (typeof SheetApi !== 'undefined' ? SheetApi.DEFAULT_ENDPOINT : 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec');
    }
    try {
      if (action === 'update_master_meta') {
        if (itemPayload.cpp !== undefined) await syncMutation('MASTER', 'updateRow', { rowIndex: 5, startCol: 4, rowValues: [itemPayload.cpp] });
        if (itemPayload.cpw !== undefined) await syncMutation('MASTER', 'updateRow', { rowIndex: 5, startCol: 8, rowValues: [itemPayload.cpw] });
        if (itemPayload.weddingDate) await syncMutation('MASTER', 'updateRow', { rowIndex: 6, startCol: 4, rowValues: [itemPayload.weddingDate] });
        if (itemPayload.venue !== undefined) await syncMutation('MASTER', 'updateRow', { rowIndex: 6, startCol: 8, rowValues: [itemPayload.venue] });
        if (itemPayload.targetReady !== undefined) await syncMutation('MASTER', 'updateRow', { rowIndex: 6, startCol: 12, rowValues: [itemPayload.targetReady] });
      } else if (action === 'update_guest_quota') {
        if (itemPayload.targetPaxCpp !== undefined) await syncMutation('TAMU', 'updateRow', { rowIndex: 4, startCol: 7, rowValues: [itemPayload.targetPaxCpp] });
        if (itemPayload.targetPaxCpw !== undefined) await syncMutation('TAMU', 'updateRow', { rowIndex: 4, startCol: 11, rowValues: [itemPayload.targetPaxCpw] });
      } else if (action === 'update_tamu') {
        const g = itemPayload;
        const isCpp = g.side === 'CPP';
        const startCol = isCpp ? 2 : 9;
        if (g.rowIndex) {
          await syncMutation('TAMU', 'updateRow', {
            rowIndex: g.rowIndex,
            startCol: startCol,
            rowValues: [g.no, g.kategori, g.nama, g.pax, g.statusUndangan, g.rsvp]
          });
        } else {
          const rowVals = isCpp
            ? ['', g.no, g.kategori, g.nama, g.pax, g.statusUndangan, g.rsvp, '', '', '', '', '', '', '']
            : ['', '', '', '', '', '', '', '', g.no, g.kategori, g.nama, g.pax, g.statusUndangan, g.rsvp];
          await syncMutation('TAMU', 'append', { rowValues: rowVals });
        }
      } else if (action === 'update_administrasi') {
        const item = itemPayload;
        if (item.rowIndex) {
          await syncMutation('ADMINISTRASI', 'updateRow', {
            rowIndex: item.rowIndex,
            startCol: 5,
            rowValues: [item.cppCheck === 'NA' ? '—' : (item.cppCheck ? 'TRUE' : 'FALSE'), item.cpwCheck === 'NA' ? '—' : (item.cpwCheck ? 'TRUE' : 'FALSE')]
          });
        }
      } else if (action === 'update_seserahan') {
        const it = itemPayload;
        if (it.rowIndex) {
          await syncMutation('SESERAHAN', 'updateRow', {
            rowIndex: it.rowIndex,
            startCol: 2,
            rowValues: [it.no, it.kategori, it.item, it.brand || '', it.harga || 0, it.link || '', it.status || 'Pending']
          });
        } else {
          await syncMutation('SESERAHAN', 'append', {
            rowValues: ['', it.no, it.kategori, it.item, it.brand || '', it.harga || 0, it.link || '', it.status || 'Pending']
          });
        }
      } else if (action === 'add_seserahan') {
        const it = itemPayload;
        await syncMutation('SESERAHAN', 'append', {
          rowValues: ['', it.no, it.kategori, it.item, it.brand || '', it.harga || 0, it.link || '', it.status || 'Pending']
        });
      } else if (action === 'update_mahar_log') {
        const log = itemPayload;
        if (log.rowIndex) {
          await syncMutation('MAHAR', 'updateRow', {
            rowIndex: log.rowIndex,
            startCol: 2,
            rowValues: [log.no, log.tanggal, log.komponen, log.volume, log.satuan, log.hargaSatuan, log.status, log.totalRealisasi, log.sumberDana || '', log.catatan || '']
          });
        } else {
          await syncMutation('MAHAR', 'append', {
            rowValues: ['', log.no, log.tanggal, log.komponen, log.volume, log.satuan, log.hargaSatuan, log.status, log.totalRealisasi, log.sumberDana || '', log.catatan || '']
          });
        }
      } else if (action === 'add_mahar_log') {
        const log = itemPayload;
        await syncMutation('MAHAR', 'append', {
          rowValues: ['', log.no, log.tanggal, log.komponen, log.volume, log.satuan, log.hargaSatuan, log.status, log.totalRealisasi, log.sumberDana || '', log.catatan || '']
        });
      } else if (action === 'update_mahar_target') {
        await syncMutation('MAHAR', 'updateRow', {
          rowIndex: itemPayload.rowIndex,
          startCol: 5,
          rowValues: [itemPayload.targetJumlah]
        });
      } else if (action === 'update_wedding_tracker') {
        const it = itemPayload;
        if (it.rowIndex) {
          await syncMutation('WEDDING TRACKER', 'updateRow', {
            rowIndex: it.rowIndex,
            startCol: 2,
            rowValues: [it.no, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
          });
        } else {
          await syncMutation('WEDDING TRACKER', 'append', {
            rowValues: ['', it.no, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
          });
        }
      } else if (action === 'add_wedding_tracker') {
        const it = itemPayload;
        await syncMutation('WEDDING TRACKER', 'append', {
          rowValues: ['', it.no, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
        });
      } else if (action === 'update_pre_wedding') {
        const it = itemPayload;
        if (it.rowIndex) {
          await syncMutation('PRE WEDDING', 'updateRow', {
            rowIndex: it.rowIndex,
            startCol: 2,
            rowValues: [it.no, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
          });
        } else {
          await syncMutation('PRE WEDDING', 'append', {
            rowValues: ['', it.no, it.kategori, it.item, it.pic, it.target || '', it.estimasi, it.realisasi, it.status, it.catatan]
          });
        }
      } else if (action === 'update_vendor') {
        const it = itemPayload;
        if (it.rowIndex) {
          await syncMutation('VENDOR DIRECTORY', 'updateRow', {
            rowIndex: it.rowIndex,
            startCol: 2,
            rowValues: [it.no, it.kategori, it.nama, it.kontak, it.nilaiKontrak]
          });
          await syncMutation('VENDOR DIRECTORY', 'updateRow', {
            rowIndex: it.rowIndex,
            startCol: 8,
            rowValues: [it.statusKerjasama, it.statusPembayaran, it.layanan, it.catatan]
          });
        } else {
          await syncMutation('VENDOR DIRECTORY', 'append', {
            rowValues: ['', it.no, it.kategori, it.nama, it.kontak, it.nilaiKontrak, '', it.statusKerjasama, it.statusPembayaran, it.layanan, it.catatan]
          });
        }
      } else if (action === 'update_rundown') {
        const it = itemPayload;
        if (it.tableType === 'timeline' || it.fase) {
          if (it.rowIndex) {
            await syncMutation('TIMELINE & RUNDOWN', 'updateRow', {
              rowIndex: it.rowIndex,
              startCol: 2,
              rowValues: [it.no, it.fase, it.kategori, it.agenda, it.rincian || '', it.target || '', it.pic, it.status]
            });
          } else {
            await syncMutation('TIMELINE & RUNDOWN', 'append', {
              rowValues: ['', it.no, it.fase || 'H-Bulan', it.kategori, it.agenda, it.rincian || '', it.target || '', it.pic, it.status]
            });
          }
        } else {
          if (it.rowIndex) {
            await syncMutation('TIMELINE & RUNDOWN', 'updateRow', {
              rowIndex: it.rowIndex,
              startCol: 2,
              rowValues: [it.no, it.waktu, it.durasi, it.sesi, it.deskripsi || '', it.lokasi || '', it.pic, it.vendor || '', it.status, it.catatan || '']
            });
          } else {
            await syncMutation('TIMELINE & RUNDOWN', 'append', {
              rowValues: ['', it.no, it.waktu || '08:00', it.durasi || '30 Menit', it.sesi, it.deskripsi || '', it.lokasi || 'Venue', it.pic, it.vendor || '', it.status, it.catatan || '']
            });
          }
        }
      }
    } catch (e) {}
  }

  function renderSkeletonLoading(container, count) {
    if (!container) return;
    const items = [];
    for (let i = 0; i < (count || 3); i++) {
      items.push(
        '<div class="p-3.5 rounded-xl bento-surface bg-[#161B22] border border-[#30363D] shadow-xs space-y-2.5">' +
          '<div class="flex items-center justify-between">' +
            '<div class="w-20 h-4 rounded-md skeleton-shimmer"></div>' +
            '<div class="w-14 h-4 rounded-md skeleton-shimmer"></div>' +
          '</div>' +
          '<div class="w-3/4 h-5 rounded-md skeleton-shimmer"></div>' +
          '<div class="w-1/2 h-3.5 rounded-md skeleton-shimmer"></div>' +
        '</div>'
      );
    }
    container.innerHTML = items.join('');
  }

  async function syncFromAppsScript(isSilentAutoSync) {
    if (!state.config.scriptUrl) {
      state.config.scriptUrl = (typeof SheetApi !== 'undefined' ? SheetApi.DEFAULT_ENDPOINT : 'https://script.google.com/macros/s/AKfycby6AFTahWtcamlrAdKO0d5NlnFbwgoLi1MXnOJpzZFV5ju5nIri8AYSyO4rWS2OkWZaZQ/exec');
    }
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
        }
        if (json.role) state.role = json.role;
        saveLocalState();
        refreshAll();

        const badge = document.getElementById('lastSyncedBadge');
        if (badge) {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          badge.textContent = '✓ Tersinkron ' + hh + ':' + mm;
        }
        if (!isSilentAutoSync) {
          showToast('✓ Sinkronisasi Berhasil: Seluruh 9 tab & data formula terbaru dari Google Sheets ditarik ke aplikasi!');
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
    try { if (window.lucide) window.lucide.createIcons(); } catch (e) {}
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
        showToast('Menghapus catatan mahar baris #' + removedRowIndex + '...', false);

        try {
          await SheetApi.deleteRow('MAHAR', removedRowIndex, state.config.scriptUrl, state.config.pin);
          await syncFromAppsScript(true);
          showToast('✓ Catatan mahar berhasil dihapus & formula disinkronkan!');
        } catch (err) {
          console.error('Delete mahar error:', err);
          showToast('Gagal menghapus mahar: ' + (err.message || String(err)), true);
          await syncFromAppsScript(true);
        }
        return;
      }
    });

    // Helper ringkas untuk sakelar "Hide" dan "Unhide"
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
          lbl.textContent = isNowHidden ? 'Unhide' : 'Hide';
        }
        if (icn) {
          icn.setAttribute('data-lucide', isNowHidden ? 'chevron-down' : 'chevron-up');
        }
        if (window.lucide) window.lucide.createIcons();

        // Jika unhide grafik saat dalam mode mempelai, trigger resize chart
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
            b.className = 'submod-btn shrink-0 min-h-[44px] px-3.5 py-2 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
          } else {
            b.className = 'submod-btn shrink-0 min-h-[44px] px-3.5 py-2 rounded-md text-xs font-medium bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#C9D1D9]';
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
            b.className = 'submod-btn shrink-0 min-h-[44px] px-3.5 py-2 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
          } else {
            b.className = 'submod-btn shrink-0 min-h-[44px] px-3.5 py-2 rounded-md text-xs font-medium bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#C9D1D9]';
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
      if (bTamu) bTamu.className = 'min-h-[44px] px-3.5 py-2 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
      const bKua = document.getElementById('btnSubAdminKua');
      if (bKua) bKua.className = 'min-h-[44px] px-3.5 py-2 rounded-md text-xs font-medium bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#C9D1D9]';
    });

    safeOn('btnSubAdminKua', 'click', function() {
      const vKua = document.getElementById('subview-adminkua');
      if (vKua) vKua.classList.remove('hidden');
      const vTamu = document.getElementById('subview-tamu');
      if (vTamu) vTamu.classList.add('hidden');
      const bKua = document.getElementById('btnSubAdminKua');
      if (bKua) bKua.className = 'min-h-[44px] px-3.5 py-2 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
      const bTamu = document.getElementById('btnSubTamu');
      if (bTamu) bTamu.className = 'min-h-[44px] px-3.5 py-2 rounded-md text-xs font-medium bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#C9D1D9]';
    });

    document.querySelectorAll('.guest-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.activeGuestTab = btn.getAttribute('data-guesttab');
        document.querySelectorAll('.guest-tab-btn').forEach(function(b) {
          if (b.getAttribute('data-guesttab') === state.activeGuestTab) {
            b.className = 'guest-tab-btn min-h-[44px] px-3 py-1.5 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
          } else {
            b.className = 'guest-tab-btn min-h-[44px] px-3 py-1.5 rounded-md text-xs font-medium bg-transparent text-[#8B949E] border border-transparent hover:text-[#C9D1D9] hover:bg-[#21262D]';
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
          '💍 *Farhan Rafiqi & Indira Gusti*',
          '📅 ' + wDate,
          '📍 ' + venue,
          '',
          '💌 _Link website undangan resmi & e-invitation akan kami kirimkan menyusul._',
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
          'Halo ' + g.nama + '!',
          '',
          'Tanpa mengurangi rasa hormat, kami ingin mengundang kamu untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami:',
          '',
          '💍 Farhan Rafiqi & Indira Gusti',
          '📅 ' + wDate,
          '📍 ' + venue,
          '',
          '💌 Link website undangan & e-invitation resmi akan kami kirimkan menyusul yaa.',
          '',
          'Terima kasih banyak atas doa dan restunya! ✨'
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
      const actCls = 'px-3 py-1.5 rounded-md text-xs font-semibold bg-[#21262D] text-[#58A6FF] border border-[#30363D] shadow-xs';
      const inactCls = 'px-3 py-1.5 rounded-md text-xs font-semibold bg-transparent text-[#8B949E] border border-transparent hover:text-[#C9D1D9] hover:bg-[#21262D]';
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
        } else {
          pInput.value = '';
          pInput.focus();
        }
      });
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
    safeOn('maharTargetQtyInput', 'input', updateMaharPreview);

    safeOn('formEditItem', 'submit', async function(e) {
      e.preventDefault();
      const formMode = document.getElementById('editItemMode').value;
      const modKey = document.getElementById('editModuleSelect').value;
      const customNameVal = (document.getElementById('editCustomNameInput').value || '').trim();
      if (!customNameVal) {
        showToast('Nama item tidak boleh kosong.', true);
        return;
      }

      const estVal = parseDigits(document.getElementById('editEstimasiInput').value);
      const realVal = parseDigits(document.getElementById('editRealisasiInput').value);
      const stVal = document.getElementById('editStatusSelect').value;
      const picVal = (document.getElementById('editPicInput').value || '').trim();
      const noteVal = (document.getElementById('editNoteInput').value || '').trim();

      if (formMode === 'add') {
        const catVal = document.getElementById('addCategorySelect') ? document.getElementById('addCategorySelect').value : 'Umum';
        let newItem = null;
        let actionName = 'add_wedding_tracker';

        if (modKey === 'seserahan') {
          newItem = {
            id: 'SS-R' + Date.now(),
            sheet: 'SESERAHAN',
            rowIndex: 0,
            no: state.data.seserahan.length + 1,
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
          newItem = {
            id: 'PW-R' + Date.now(),
            sheet: 'PRE WEDDING',
            rowIndex: 0,
            no: state.data.preWedding.length + 1,
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
          newItem = {
            id: 'VD-R' + Date.now(),
            sheet: 'VENDOR DIRECTORY',
            rowIndex: 0,
            no: state.data.vendors.length + 1,
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
          newItem = {
            id: 'RD-R' + Date.now(),
            rowIndex: 0,
            no: state.data.rundown.length + 1,
            waktu: '08:00',
            durasi: '30 Menit',
            sesi: customNameVal,
            deskripsi: noteVal,
            lokasi: 'Venue',
            pic: picVal,
            vendor: '',
            status: stVal || 'Siap',
            catatan: ''
          };
          state.data.rundown.push(newItem);
          actionName = 'update_rundown';
        } else if (modKey === 'timeline') {
          newItem = {
            id: 'TL-R' + Date.now(),
            rowIndex: 0,
            no: state.data.timeline.length + 1,
            fase: 'H-Bulan',
            kategori: catVal,
            agenda: customNameVal,
            rincian: noteVal,
            target: '',
            pic: picVal,
            status: stVal || 'Belum Mulai'
          };
          state.data.timeline.push(newItem);
          actionName = 'update_rundown';
        } else {
          newItem = {
            id: 'WT-R' + Date.now(),
            sheet: 'WEDDING TRACKER',
            rowIndex: 0,
            no: state.data.weddingTracker.length + 1,
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

        saveLocalState();
        closeQuickModal();
        refreshAll();
        showToast('Item baru "' + customNameVal + '" berhasil ditambahkan ke ' + modKey + '!');
        await pushToAppsScript(actionName, newItem);
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
        it.lokasi = realInp ? realInp.value : (it.lokasi || '');
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

      saveLocalState();
      closeQuickModal();
      refreshAll();
      showToast('Data berhasil diperbarui pada modul ' + modKey + '!');
      await pushToAppsScript(actionName, it);
    });

    safeOn('formAddMahar', 'submit', async function(e) {
      e.preventDefault();
      const komp = document.getElementById('maharKomponenSelect').value;
      const targetQty = Math.max(0.01, Number(document.getElementById('maharTargetQtyInput').value) || 1);
      const tgl = document.getElementById('maharDateInput').value || new Date().toISOString().split('T')[0];
      const vol = Math.max(0, parseFloat(document.getElementById('maharVolumeInput').value) || 0);
      const totalRealisasi = parseDigits(document.getElementById('maharTotalRealisasiInput').value);
      const st = document.getElementById('maharStatusSelect').value;
      const acc = (document.getElementById('maharAccountInput').value || '').trim();
      const note = (document.getElementById('maharNoteInput').value || '').trim();

      // Update Target Jumlah di maharTargets jika diubah
      const tObj = state.data.maharTargets.find(function(t) {
        if (komp === 'Saham BSSR') return /saham|bssr/i.test(t.instrumen);
        if (komp === 'Emas Hartadinata') return /emas|logam\s*mulia/i.test(t.instrumen);
        return /uang|tunai/i.test(t.instrumen);
      });
      if (tObj && tObj.targetJumlah !== targetQty) {
        tObj.targetJumlah = targetQty;
        await pushToAppsScript('update_mahar_target', { rowIndex: tObj.rowIndex, targetJumlah: targetQty });
      }

      const editLogId = document.getElementById('maharLogEditId').value;
      if (vol > 0 && totalRealisasi > 0) {
        const satuan = komp === 'Saham BSSR' ? 'Lot' : (komp === 'Emas Hartadinata' ? 'Gram' : 'Paket');
        let price = 0;
        if (komp === 'Saham BSSR') {
          price = Math.round(totalRealisasi / (vol * 100)); // harga per lembar
        } else {
          price = Math.round(totalRealisasi / vol); // harga per gram / paket
        }

        if (editLogId) {
          const targetLog = state.data.maharLogs.find(function(x) { return x.id === editLogId; });
          if (targetLog) {
            targetLog.tanggal = tgl;
            targetLog.komponen = komp;
            targetLog.volume = vol;
            targetLog.satuan = satuan;
            targetLog.hargaSatuan = price;
            targetLog.status = st;
            targetLog.totalRealisasi = totalRealisasi;
            targetLog.sumberDana = acc;
            targetLog.catatan = note;

            recalculateMaharTargets();
            saveLocalState();
            closeQuickModal();
            refreshAll();
            showToast('Log transaksi #' + targetLog.no + ' diubah ke ' + st + '!');
            await pushToAppsScript('update_mahar_log', targetLog);
            return;
          }
        }

        const nextRow = 16 + state.data.maharLogs.length;
        const newLog = {
          id: 'ML-R' + Date.now(),
          rowIndex: nextRow,
          no: state.data.maharLogs.length + 1,
          tanggal: tgl,
          komponen: komp,
          volume: vol,
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
        closeQuickModal();
        refreshAll();
        showToast('Cicilan & Target Mahar (' + komp + ') berhasil dicatat!');
        await pushToAppsScript('add_mahar_log', newLog);
      } else {
        recalculateMaharTargets();
        saveLocalState();
        closeQuickModal();
        refreshAll();
        showToast('Target Mahar (' + komp + ': ' + targetQty + ') berhasil diperbarui!');
      }
    });

    safeOn('formGuestModal', 'submit', async function(e) {
      e.preventDefault();
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
        const sameSideCount = state.data.tamu.filter(function(x) { return x.side === side && x.kelompok === 'Tamu Umum'; }).length;
        targetGuest = {
          id: 'TM-' + side + '-GEN-' + Date.now(),
          rowIndex: 23 + sameSideCount,
          side: side,
          kelompok: 'Tamu Umum',
          no: sameSideCount + 1,
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

      saveLocalState();
      closeQuickModal();
      refreshAll();
      showToast('Data tamu "' + nama + '" berhasil disimpan!');
      if (targetGuest) await pushToAppsScript('update_tamu', targetGuest);
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
      if (heroNames) heroNames.textContent = state.data.meta.cpp + ' & ' + state.data.meta.cpw;
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
          '📅 Hari/Tanggal: ' + wDateStr,
          '📍 Lokasi: ' + venueStr,
          '------------------------------------------',
          ''
        ];

        state.data.rundown.forEach(function(r) {
          lines.push('⏰ *' + r.waktu + ' (' + r.durasi + ')* — ' + r.sesi);
          lines.push('   • Sesi: ' + r.deskripsi);
          lines.push('   • Tempat: ' + r.lokasi);
          lines.push('   • PIC: ' + r.pic + ' | Vendor: ' + r.vendor);
          if (r.catatan) lines.push('   • Catatan: ' + r.catatan);
          lines.push('');
        });

        lines.push('------------------------------------------');
        lines.push('💡 _Mohon seluruh panitia keluarga & WO hadir sesuai jadwal PIC masing-masing._');

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
      state.config.scriptUrl = (document.getElementById('cfgScriptUrl').value || '').trim();
      state.config.pin = (document.getElementById('cfgPinInput').value || '2027').trim();
      if (state.config.pin === '270627') state.role = 'couple';
      else state.role = 'committee';
      saveLocalState();
      if (state.config.scriptUrl) syncFromAppsScript(false);
      else {
        refreshAll();
        showToast('Pengaturan disimpan.');
      }
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
      const elUrl = document.getElementById('cfgScriptUrl');
      if (elUrl) elUrl.value = state.config.scriptUrl || '';
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
