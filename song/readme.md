# 🎵 Music Link Formatter & Matcher

## 📌 Deskripsi
Proyek ini adalah **Music Link Formatter & Matcher** berbasis HTML, CSS, dan JavaScript yang berfungsi untuk:
1. Mengambil daftar link file `.mp3` yang berformat `http://url/title.mp3` atau `http://url/title.mp3?content=artist`.
2. Membersihkan, memformat, dan menampilkan link dalam format yang konsisten.
3. Mencocokkan (matching) data musik dengan database referensi untuk memperbaiki judul atau metadata.
4. Menghindari duplikasi data dengan proses **normalisasi teks**.

Proyek ini dibuat untuk memudahkan proses **pengelolaan daftar lagu** agar rapi, konsisten, dan mudah dibaca.

---

## 🚀 Fitur
- **Parsing & Filtering**
  - Mengambil hanya baris yang berisi `.mp3`.
  - Menghapus baris kosong atau tidak valid.
- **Format Standar**
  - Menghilangkan simbol atau karakter yang tidak perlu.
  - Mengubah urutan `artist - title` menjadi format konsisten.
- **Matching Data**
  - Mencocokkan hasil parsing dengan **database referensi** menggunakan teknik *string similarity*.
  - Toleransi kesalahan nama (typo) dengan pengaturan *similarity threshold*.
- **Limitasi Pencarian**
  - Jumlah kandidat untuk pencocokan dapat dibatasi (default `limit = 15` untuk hasil lebih akurat).
- **Progress Indicator**
  - Menampilkan status proses secara real-time saat parsing dan matching.

---

## 🛠 Teknologi yang Digunakan
- **HTML5** – Struktur halaman.
- **CSS3** – Styling sederhana dan responsif.
- **JavaScript (Vanilla)** – Logika utama parsing, matching, dan rendering.
- **[string-similarity](https://www.npmjs.com/package/string-similarity)** – Algoritma pencocokan teks.
- **SweetAlert2** – Tampilan notifikasi interaktif.

---

## 📂 Struktur Folder
├── index.html   # Halaman utama
├── style.css    # File styling (tampilan)
├── script.js    # Logika utama aplikasi
├── data.json    # Database referensi musik
└── README.md    # Dokumentasi proyek



---

## 📖 Cara Menggunakan
1. **Buka halaman `index.html`** di browser.
2. **Tempel daftar link** musik ke dalam textarea input.
3. Klik tombol **"Generate"**.
4. Hasil format dan pencocokan akan muncul di output area.
5. **Salin hasil** atau gunakan sesuai kebutuhan.

---

## ⚙️ Konfigurasi
Parameter utama yang bisa diubah di `script.js`:
```javascript
const MATCH_LIMIT = 15;      // Jumlah maksimal kandidat pencocokan
const SIMILARITY_THRESHOLD = 0.85; // Tingkat kemiripan minimal

