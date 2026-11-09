// Halaman Daftar Barang: ambil data lewat AJAX (GET) dari dummyjson, render dengan jQuery
$(function () {
    const API_URL = 'https://dummyjson.com/products?limit=12&select=title,price,stock,category';
    const KURS = 16000; // harga dummyjson dalam USD, dikonversi kasar ke Rupiah

    const $tbody = $('#tabel-barang');
    const $pesan = $('#pesan-error');
    let semuaBarang = [];

    const rupiah = (usd) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
            .format(usd * KURS);

    const aman = (teks) => $('<div>').text(teks).html(); // cegah injeksi HTML

    function tampilkan(daftar) {
        if (daftar.length === 0) {
            $tbody.html('<tr><td colspan="5" class="text-center text-secondary py-4">Tidak ada barang yang cocok.</td></tr>');
            return;
        }
        const baris = daftar.map((b, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${aman(b.title)}</td>
                <td>${rupiah(b.price)}</td>
                <td>${b.stock}</td>
                <td><a class="btn btn-sm btn-outline-primary" href="detail-barang.html?id=${b.id}">Lihat Detail</a></td>
            </tr>`).join('');
        $tbody.html(baris);
    }

    function muatBarang() {
        $pesan.addClass('d-none');
        $tbody.html(`
            <tr><td colspan="5" class="text-center py-4">
                <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                <span class="ms-2">Memuat data barang...</span>
            </td></tr>`);

        $.ajax({ url: API_URL, method: 'GET', dataType: 'json' })
            .done(function (res) {
                semuaBarang = res.products;
                tampilkan(semuaBarang);
            })
            .fail(function () {
                $tbody.empty();
                $pesan.removeClass('d-none');
            });
    }

    // Pencarian langsung (tanpa reload)
    $('#cari-barang').on('input', function () {
        const kata = $(this).val().toLowerCase().trim();
        tampilkan(semuaBarang.filter((b) => b.title.toLowerCase().includes(kata)));
    });

    $('#btn-muat-ulang').on('click', muatBarang);

    muatBarang();
});
