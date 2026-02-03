// Mengimpor data dari file-file yang terpisah
import { dataKhilafah } from './khilafah.js';
import { dataDemokrasi } from './demokrasi.js';
import { dataKomunis } from './komunis.js';
import { dataKerajaan } from './kerajaan.js';

// Menggabungkan semua data menjadi satu array menggunakan spread operator (...)
export const databaseNegaraAwal = [
    ...dataKhilafah,
    ...dataDemokrasi,
    ...dataKomunis,
    ...dataKerajaan
];