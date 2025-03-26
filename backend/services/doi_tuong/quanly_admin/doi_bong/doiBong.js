const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

const maDoiBong = document.getElementById("maDoiBong");
const tenDoiBong = document.getElementById("tenDoiBong");
const quocGia = document.getElementById("quocGia");
const maGioiTinh = document.getElementById("maGioiTinh");
const logo = document.getElementById("logo");
const maQlDoiBong = document.getElementById("maQlDoiBong");

document.addEventListener("DOMContentLoaded", function () {
    loadDanhSachNguoiDung_quanLyDoiBong();
    viewTbody();
    // console.log(loadDanhSachNguoiDung_quanLyDoiBong());
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
});

// Hiển thị danh sách đội bóng
async function viewTbody() {
    const data = await hamChung.layDanhSach("doi_bong");
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

// Thêm/Sửa đội bóng
async function handleLuuThayDoi(event) {
    event.preventDefault();

    const form = document.getElementById("inputForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let formData = {};
    if (maDoiBong.value === "") {
        formData = {
            ma_doi_bong: await hamChung.taoID_theoBang("doi_bong"),
            ten_doi_bong: tenDoiBong.value,
            quoc_gia: quocGia.value,
            gioi_tinh: maGioiTinh.value,
            logo: logo.value,
            ma_ql_doi_bong: maQlDoiBong.value
        };
        await hamChung.them(formData, "doi_bong");
        alert("Thêm thành công!");
    } else {
        formData = {
            ma_doi_bong: maDoiBong.value,
            ten_doi_bong: tenDoiBong.value,
            quoc_gia: quocGia.value,
            gioi_tinh: maGioiTinh.value,
            logo: logo.value,
            ma_ql_doi_bong: maQlDoiBong.value
        };
        await hamChung.sua(formData, "doi_bong");
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
            maDoiBong.value = item.ma_doi_bong;
            tenDoiBong.value = item.ten_doi_bong;
            quocGia.value = item.quoc_gia;
            maGioiTinh.value = item.gioi_tinh;
            logo.value = item.logo;
            maQlDoiBong.value = item.ma_ql_doi_bong;
        });
    });
}

// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa đội bóng ${data[index].ten_doi_bong}?`)) {
                const formData = { ma_doi_bong: data[index].ma_doi_bong };
                await hamChung.xoa(formData, "doi_bong");
                viewTbody();
            }
        });
    });
}


async function loadDanhSachNguoiDung_quanLyDoiBong() {
    const selectElement = document.getElementById("maQlDoiBong");
    selectElement.innerHTML = '<option value="">-- Chưa Nhập --</option>'; // Reset danh sách

    const dataTaiKhoan = await hamChung.layDanhSach("tai_khoan");
    const dataNguoiDung = await hamChung.layDanhSach("nguoi_dung");

    // Lọc danh sách tài khoản có ma_vai_tro === 3
    const taiKhoanQuanLyDoiBong = dataTaiKhoan.filter(tk => tk.ma_vai_tro === 3);

    // Lọc danh sách người dùng có tài khoản trong nhóm trên
    const nguoiDungQuanLyDoiBong = dataNguoiDung.filter(nd =>
        taiKhoanQuanLyDoiBong.some(tk => tk.tai_khoan === nd.tai_khoan)
    );
    nguoiDungQuanLyDoiBong.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_nguoi_dung;
        option.textContent = `${item.ma_nguoi_dung} - ${item.ho_ten}`;
        selectElement.appendChild(option);
    });
}