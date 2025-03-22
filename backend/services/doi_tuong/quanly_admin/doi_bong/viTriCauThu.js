document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

// Hàm lấy danh sách vị trí
async function viewTbody() {
    const data = await hamChung.layDanhSach("vi_tri_cau_thu"); // Gọi API lấy danh sách vị trí
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_vi_tri}</td>
            <td style="text-align: center;">${item.ten_vi_tri}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_xoa(data);
}

// Hàm xử lý sự kiện sửa vị trí
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            document.getElementById("maViTri").value = item.ma_vi_tri;
            document.getElementById("tenViTri").value = item.ten_vi_tri;
        });
    });
}

// Hàm xử lý sự kiện xóa vị trí
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa vị trí ${data[index].ma_vi_tri}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
