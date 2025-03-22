document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

// Hàm lấy danh sách đội bóng
async function viewTbody() {
    const data = await hamChung.layDanhSach("doi_bong"); // Gọi API lấy danh sách đội bóng
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_doi_bong}</td>
            <td style="text-align: center;">${item.ten_doi_bong}</td>
            <td style="text-align: center;">${item.quoc_gia}</td>
            <td style="text-align: center;">${item.gioi_tinh}</td>
            <td style="text-align: center;"><img src="${item.logo}" alt="Logo" width="50"></td>
            <td style="text-align: center;">${item.ma_ql_doi_bong}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

// Hàm xử lý sự kiện sửa đội bóng
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("maDoiBong").value = item.ma_doi_bong;
            document.getElementById("tenDoiBong").value = item.ten_doi_bong;
            document.getElementById("quocGia").value = item.quoc_gia;
            document.getElementById("maGioiTinh").value = item.gioi_tinh;
            document.getElementById("logo").value = item.logo;
            document.getElementById("maQlDoiBong").value = item.ma_ql_doi_bong;
        });
    });
}

// Hàm xử lý sự kiện xóa đội bóng
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa đội bóng ${data[index].ten_doi_bong}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
