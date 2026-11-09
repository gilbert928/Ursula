// Halaman Detail Barang: ambil 1 barang berdasarkan ?id= lewat AJAX (GET)
$(function () {
    const id = new URLSearchParams(window.location.search).get('id') || 1;
    const KURS = 16000;

    $.ajax({ url: `https://dummyjson.com/products/${encodeURIComponent(id)}`, method: 'GET', dataType: 'json' })
        .done(function (b) {
            $('#d-judul').text(b.title);
            $('#d-kode').text('BRG' + String(b.id).padStart(3, '0'));
            $('#d-nama').text(b.title);
            $('#d-harga').text(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(b.price * KURS));
            $('#d-stok').text(b.stock + ' buah');
            $('#d-kategori').text(b.category);
            $('#d-deskripsi').text(b.description);
            $('#d-gambar').attr({ src: b.thumbnail, alt: b.title });
            $('#d-loading').addClass('d-none');
            $('#d-konten').removeClass('d-none');
        })
        .fail(function () {
            $('#d-loading').addClass('d-none');
            $('#d-error').removeClass('d-none');
        });
});
