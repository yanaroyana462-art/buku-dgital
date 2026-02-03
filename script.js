// Mengimpor data dari file terpisah
import { databaseNegaraAwal } from './data.js';

// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // Database Utama, menggunakan salinan dari data yang diimpor
    let databaseNegara = [...databaseNegaraAwal];

    // Status filter saat ini
    let filterSekarang = {
        sistem: 'Semua',
        tipe: 'semua'
    };

    // Mengambil elemen dari DOM
    const wadah = document.getElementById('daftarKonten');
    const selectSistem = document.getElementById('selectSistem');
    const filterButtons = document.querySelectorAll('.btn-filter');

    function render(data) {
        wadah.innerHTML = '';

        if (data.length === 0) {
            wadah.innerHTML = '<p style="text-align:center; color: #999;">Data tidak ditemukan.</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            // Menggunakan data-id untuk referensi penghapusan yang lebih aman
            card.innerHTML = `
                <button class="btn-hapus" data-id="${item.id}">Hapus</button>
                <div>
                    <span class="tag">${item.sistem}</span>
                    <span class="tag" style="background: #d1ecf1">${item.tipe}</span>
                </div>
                <h3>${item.judul}</h3>
                <p>${item.isi}</p>
            `;
            wadah.appendChild(card);
        });
    }

    // Fungsi Gabungan untuk memfilter data
    function terapkanFilter() {
        const hasil = databaseNegara.filter(item => {
            const matchSistem = (filterSekarang.sistem === 'Semua' || item.sistem === filterSekarang.sistem);
            const matchTipe = (filterSekarang.tipe === 'semua' || item.tipe === filterSekarang.tipe);
            return matchSistem && matchTipe;
        });
        render(hasil);
    }

    // Fungsi Hapus yang lebih efisien
    function hapusData(id) {
        // Menghapus item dari database asli berdasarkan ID unik
        databaseNegara = databaseNegara.filter(item => item.id !== id);
        terapkanFilter(); // Render ulang tampilan setelah data dihapus
    }

    // Event listener untuk dropdown sistem negara
    selectSistem.addEventListener('change', (e) => {
        filterSekarang.sistem = e.target.value;
        terapkanFilter();
    });

    // Event listener untuk tombol filter kategori
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('btn-active'));
            btn.classList.add('btn-active');
            filterSekarang.tipe = btn.dataset.tipe; // Menggunakan data-attribute
            terapkanFilter();
        });
    });

    // Event listener untuk tombol hapus (event delegation)
    wadah.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-hapus')) {
            const idToDelete = parseInt(e.target.dataset.id, 10);
            hapusData(idToDelete);
        }
    });

    // Jalankan render awal saat halaman dimuat
    terapkanFilter();
});