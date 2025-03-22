document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("nguoi_dung");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_nguoi_dung}</td>
            <td>${item.tai_khoan}</td>
            <td>${item.ho_ten}</td>
            <td>${item.gioi_tinh}</td>
            <td>${item.email}</td>
            <td>${item.so_dien_thoai}</td>
            <td>${item.ngay_tao}</td>
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
            document.getElementById("maNguoiDung").value = item.ma_nguoi_dung;
            document.getElementById("taiKhoan").value = item.tai_khoan;
            document.getElementById("hoTen").value = item.ho_ten;
            // Cập nhật giới tính
            // Chuyển đổi giá trị giới tính thành chữ in hoa đầu (Nam/Nữ)
            const gioiTinhFormatted = item.gioi_tinh.charAt(0).toUpperCase() + item.gioi_tinh.slice(1);
            document.getElementById("gioiTinh").value = gioiTinhFormatted;
            document.getElementById("email").value = item.email;
            document.getElementById("soDienThoai").value = item.so_dien_thoai;
            document.getElementById("ngayTao").value = item.ngay_tao;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa người dùng ${data[index].taiKhoan}?`)) {
                const tableBody = document.getElementById("dataTable");
                data.splice(index, 1);
                viewTbody(); // Load lại danh sách sau khi xóa
            }
        });
    });
}
