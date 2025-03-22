document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

// Hàm lấy danh sách kết quả trận đấu
async function viewTbody() {
    const data = await hamChung.layDanhSach("ket_qua_tran_dau"); // Gọi API lấy danh sách kết quả trận đấu
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_ket_qua}</td>
            <td style="text-align: center;">${item.so_ban_doi_1}</td>
            <td style="text-align: center;">${item.so_ban_doi_2}</td>
            <td style="text-align: center;">${item.ma_tran_dau}</td>
            <td style="text-align: center;">${item.ma_doi_thang}</td>
            <td style="text-align: center;">${item.ghi_chu || ''}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

// Hàm xử lý sự kiện sửa kết quả trận đấu
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("maKetQua").value = item.ma_ket_qua;
            document.getElementById("soBanDoi1").value = item.so_ban_doi_1;
            document.getElementById("soBanDoi2").value = item.so_ban_doi_2;
            document.getElementById("maTranDau").value = item.ma_tran_dau;
            document.getElementById("maDoiThang").value = item.ma_doi_thang;
            document.getElementById("ghiChu").value = item.ghi_chu || '';
        });
    });
}

// Hàm xử lý sự kiện xóa kết quả trận đấu
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa kết quả ${data[index].ma_ket_qua}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
