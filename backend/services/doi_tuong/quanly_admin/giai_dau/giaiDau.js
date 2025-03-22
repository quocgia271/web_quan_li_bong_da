document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

// Hiển thị danh sách giải đấu
async function viewTbody() {
    const data = await hamChung.layDanhSach("giai_dau"); // Lấy danh sách giải đấu
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ten_giai_dau}</td>
            <td style="text-align: center;">${item.ten_to_chuc}</td>
            <td style="text-align: center;">${item.ngay_bat_dau}</td>
            <td style="text-align: center;">${item.ngay_ket_thuc}</td>
            <td style="text-align: center;">${item.ma_gioi_tinh}</td>
            <td style="text-align: center;">${item.mo_ta || ""}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

// Xử lý nút "Sửa"
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("maGiaiDau").value = item.ma_giai_dau;
            document.getElementById("tenGiaiDau").value = item.ten_giai_dau;
            document.getElementById("tenToChuc").value = item.ten_to_chuc;
            document.getElementById("ngayBatDau").value = item.ngay_bat_dau;
            document.getElementById("ngayKetThuc").value = item.ngay_ket_thuc;
            document.getElementById("maGioiTinh").value = item.ma_gioi_tinh;
            document.getElementById("moTa").value = item.mo_ta || "";
        });
    });
}

// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa giải đấu "${data[index].ten_giai_dau}"?`)) {
                await hamChung.xoa("giai_dau", data[index].ma_giai_dau);
                viewTbody(); // Refresh danh sách sau khi xóa
            }
        });
    });
}
