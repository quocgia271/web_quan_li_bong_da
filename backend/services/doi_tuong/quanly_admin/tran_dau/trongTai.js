document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("trong_tai");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_trong_tai}</td>
            <td style="text-align: center;">${item.ho_ten}</td>
            <td style="text-align: center;">${item.ngay_sinh}</td>
            <td style="text-align: center;">${item.gioi_tinh}</td>
            <td style="text-align: center;">
                <img src="${item.hinh_anh}" alt="Hình ảnh" style="width: 50px; height: 50px; border-radius: 50%;">
            </td>
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
            document.getElementById("maTrongTai").value = item.ma_trong_tai;
            document.getElementById("hoTen").value = item.ho_ten;
            document.getElementById("ngaySinh").value = item.ngay_sinh;
            document.getElementById("maGioiTinh").value = item.gioi_tinh;
            document.getElementById("hinhAnh").value = item.hinh_anh;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa trọng tài ${data[index].ho_ten}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
