const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

const maTrongTai = document.getElementById("maTrongTai");
const hoTen = document.getElementById("hoTen");
const ngaySinh = document.getElementById("ngaySinh");
const maGioiTinh = document.getElementById("maGioiTinh");
const hinhAnh = document.getElementById("hinhAnh");

document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
});

// Hiển thị danh sách trọng tài
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

// Thêm/Sửa trọng tài
async function handleLuuThayDoi(event) {
    event.preventDefault();

    const form = document.getElementById("inputForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let formData = {};
    if (maTrongTai.value === "") {
        formData = {
            ma_trong_tai: await hamChung.taoID_theoBang("trong_tai"),
            ho_ten: hoTen.value,
            ngay_sinh: ngaySinh.value,
            gioi_tinh: maGioiTinh.value,
            hinh_anh: hinhAnh.value
        };
        await hamChung.them(formData, "trong_tai");
        alert("Thêm thành công!");
    } else {
        formData = {
            ma_trong_tai: maTrongTai.value,
            ho_ten: hoTen.value,
            ngay_sinh: ngaySinh.value,
            gioi_tinh: maGioiTinh.value,
            hinh_anh: hinhAnh.value
        };
        await hamChung.sua(formData, "trong_tai");
        alert("Sửa thành công!");
    }
    console.log(formData);
    viewTbody();
}

// Xử lý tải lại trang
function handleTaiLaiTrang(event) {
    event.preventDefault();
    location.reload();
}

// Xử lý nút "Sửa"
function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            maTrongTai.value = item.ma_trong_tai;
            hoTen.value = item.ho_ten;
            ngaySinh.value = item.ngay_sinh;
            maGioiTinh.value = item.gioi_tinh;
            hinhAnh.value = item.hinh_anh;
        });
    });
}

// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa trọng tài ${data[index].ho_ten}?`)) {
                const formData = { ma_trong_tai: data[index].ma_trong_tai };
                await hamChung.xoa(formData, "trong_tai");
                viewTbody();
            }
        });
    });
}
