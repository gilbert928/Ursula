// Halaman Tambah Barang: kirim data lewat AJAX (POST) tanpa pindah halaman
$(function () {
    const API_URL = 'https://dummyjson.com/products/add';
    const $form = $('#form-tambah');
    const $alert = $('#alert-area');
    const $tombol = $('#btn-simpan');

    function notifikasi(jenis, html) {
        $alert.html(`
            <div class="alert alert-${jenis} alert-dismissible fade show" role="alert">
                ${html}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Tutup"></button>
            </div>`);
    }

    $form.on('submit', function (e) {
        e.preventDefault(); // cegah reload halaman

        const data = {
            title: $('#nama-barang').val().trim(),
            price: Number($('#harga').val()),
            stock: Number($('#stok').val()),
            category: $('#kategori').val(),
            description: $('#deskripsi').val().trim()
        };

        $tombol.prop('disabled', true).text('Menyimpan...');

        $.ajax({
            url: API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        })
            .done(function (res) {
                const nama = $('<div>').text(res.title).html();
                notifikasi('success', `Barang <strong>${nama}</strong> berhasil disimpan (ID: ${res.id}).`);
                $form[0].reset();
            })
            .fail(function () {
                notifikasi('danger', 'Gagal menyimpan barang. Periksa koneksi internet lalu coba lagi.');
            })
            .always(function () {
                $tombol.prop('disabled', false).text('Simpan Barang');
            });
    });
});
