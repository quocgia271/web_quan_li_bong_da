document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

// Hàm lấy danh sách cầu thủ
async function viewTbody() {
    const data = await hamChung.layDanhSach("cau_thu_giai_dau"); // Gọi API lấy danh sách cầu thủ
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_cau_thu}</td>
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

// Hàm xử lý sự kiện sửa cầu thủ
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("maCauThu").value = item.ma_cau_thu;
            document.getElementById("maDoiBong").value = item.ma_doi_bong;
            document.getElementById("maGiaiDau").value = item.ma_giai_dau;
        });
    });
}

// Hàm xử lý sự kiện xóa cầu thủ
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa cầu thủ ${data[index].ma_cau_thu}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
