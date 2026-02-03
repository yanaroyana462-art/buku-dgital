// Mengimpor data dari file-file yang terpisah
import { dataKhilafah } from './data/khilafah.js';
import { dataDemokrasi } from './data/demokrasi.js';
import { dataKomunis } from './data/komunis.js';
import { dataKerajaan } from './data/kerajaan.js';

// Menggabungkan semua data menjadi satu array menggunakan spread operator (...)
export const databaseNegaraAwal = [
    