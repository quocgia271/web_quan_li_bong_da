document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("tran_dau");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_tran_dau}</td>
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ma_doi_1}</td>
            <td style="text-align: center;">${item.ma_doi_2}</td>
            <td style="text-align: center;">${item.ngay_dien_ra}</td>
            <td style="text-align: center;">${item.gio_dien_ra}</td>
            <td style="text-align: center;">${item.san_van_dong}</td>
            <td style="text-align: center;">${item.ma_trong_tai}</td>
            <td style="text-align: center;">${item.trang_thai}</td>
            <td style="text-align: center;">${item.ma_vong_dau}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("maTranDau").value = item.ma_tran_dau;
            document.getElementById("maGiaiDau").value = item.ma_giai_dau;
            document.getElementById("maDoi1").value = item.ma_doi_1;
            document.getElementById("maDoi2").value = item.ma_doi_2;
            document.getElementById("ngayDienRa").value = item.ngay_dien_ra;
            document.getElementById("gioDienRa").value = item.gio_dien_ra;
            document.getElementById("sanVanDong").value = item.san_van_dong;
            document.getElementById("maTrongTai").value = item.ma_trong_tai;
            document.getElementById("trangThai").value = item.trang_thai;
            document.getElementById("maVongDau").value = item.ma_vong_dau;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa trận đấu ${data[index].ma_tran_dau}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
