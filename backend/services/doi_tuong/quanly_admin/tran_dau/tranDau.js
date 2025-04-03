const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

const maTranDau = document.getElementById("maTranDau");
const maGiaiDau = document.getElementById("maGiaiDau");
const maDoi1 = document.getElementById("maDoi1");
const maDoi2 = document.getElementById("maDoi2");
const ngayDienRa = document.getElementById("ngayDienRa");
const gioDienRa = document.getElementById("gioDienRa");
const sanVanDong = document.getElementById("sanVanDong");
const maTrongTai = document.getElementById("maTrongTai");
const trangThai = document.getElementById("trangThai");
const maVongDau = document.getElementById("maVongDau");


document.addEventListener("DOMContentLoaded", function () {
    loadDanhSachGiaiDau();
    loadDanhSachDoiBong_maDoi1();
    loadDanhSachDoiBong_maDoi2();
    loadDanhSachTrongTai();
    loadDanhSachVongDau();

    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
});

// Hiển thị danh sách trận đấu
async function layKetQua(ma_tran_dau) {
    const data = await hamChung.layThongTinTheo_ID("ket_qua_tran_dau", ma_tran_dau);
    let stringKetQua = "--";
    if (data != null) {
        stringKetQua ="tiến";
        stringKetQua = data.ma_doi_thang + " " + data.so_ban_doi_1 + "/" + data.so_ban_doi_2;
    }

    return stringKetQua;

}
async function viewTbody() {
    const data = await hamChung.layDanhSach("tran_dau");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(async item => {
        const ketQua = await layKetQua(item.ma_tran_dau);
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
            <td style="text-align: center;">${ketQua}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa thông tin</button></td>
            <td style="text-align: center;"><button class="edit-kq-btn btn btn-warning btn-sm">Sửa kết quả </button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(data);
    button_sua_ket_qua();
    button_xoa(data);
}

// Thêm/Sửa trận đấu
async function handleLuuThayDoi(event) {
    event.preventDefault();

    const form = document.getElementById("inputForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let formData = {};
    if (maTranDau.value === "") {
        formData = {
            ma_tran_dau: await hamChung.taoID_theoBang("tran_dau"),
            ma_giai_dau: maGiaiDau.value,
            ma_doi_1: maDoi1.value,
            ma_doi_2: maDoi2.value,
            ngay_dien_ra: ngayDienRa.value,
            gio_dien_ra: gioDienRa.value,
            san_van_dong: sanVanDong.value,
            ma_trong_tai: maTrongTai.value,
            trang_thai: trangThai.value,
            ma_vong_dau: maVongDau.value
        };
        await hamChung.them(formData, "tran_dau");
        alert("Thêm thành công!");
    } else {
        formData = {
            ma_tran_dau: maTranDau.value,
            ma_giai_dau: maGiaiDau.value,
            ma_doi_1: maDoi1.value,
            ma_doi_2: maDoi2.value,
            ngay_dien_ra: ngayDienRa.value,
            gio_dien_ra: gioDienRa.value,
            san_van_dong: sanVanDong.value,
            ma_trong_tai: maTrongTai.value,
            trang_thai: trangThai.value,
            ma_vong_dau: maVongDau.value
        };
        await hamChung.sua(formData, "tran_dau");
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
            maTranDau.value = item.ma_tran_dau;
            maGiaiDau.value = item.ma_giai_dau;
            maDoi1.value = item.ma_doi_1;
            maDoi2.value = item.ma_doi_2;
            ngayDienRa.value = item.ngay_dien_ra;
            gioDienRa.value = item.gio_dien_ra;
            sanVanDong.value = item.san_van_dong;
            maTrongTai.value = item.ma_trong_tai;
            trangThai.value = item.trang_thai;
            maVongDau.value = item.ma_vong_dau;
        });
    });
}

function button_sua_ket_qua() {
    document.querySelectorAll(".edit-kq-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            // const item = data[index];
            // maTranDau.value = item.ma_tran_dau;
            // maGiaiDau.value = item.ma_giai_dau;
            // maDoi1.value = item.ma_doi_1;
            // maDoi2.value = item.ma_doi_2;
            // ngayDienRa.value = item.ngay_dien_ra;
            // gioDienRa.value = item.gio_dien_ra;
            // sanVanDong.value = item.san_van_dong;
            // maTrongTai.value = item.ma_trong_tai;
            // trangThai.value = item.trang_thai;
            // maVongDau.value = item.ma_vong_dau;
            console.log("Sửa kết quả trận đấu");
        });
    });
}
// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa trận đấu ${data[index].ma_tran_dau}?`)) {
                const formData = { ma_tran_dau: data[index].ma_tran_dau };
                await hamChung.xoa(formData, "tran_dau");
                viewTbody();
            }
        });
    });
}

async function loadDanhSachGiaiDau() {
    const selectElement = document.getElementById("maGiaiDau");
    selectElement.innerHTML = '<option value="">-- Chọn Mã Giải Đấu --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("giai_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_giai_dau;
        option.textContent = `${item.ma_giai_dau} - ${item.ten_giai_dau}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachDoiBong_maDoi1() {
    const selectElement = document.getElementById("maDoi1");
    selectElement.innerHTML = '<option value="">-- Chọn Đội 1 --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("doi_bong");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_doi_bong;
        option.textContent = `${item.ma_doi_bong} - ${item.ten_doi_bong}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachDoiBong_maDoi2() {
    const selectElement = document.getElementById("maDoi2");
    selectElement.innerHTML = '<option value="">-- Chọn Đội 2 --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("doi_bong");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_doi_bong;
        option.textContent = `${item.ma_doi_bong} - ${item.ten_doi_bong}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachTrongTai() {
    const selectElement = document.getElementById("maTrongTai");
    selectElement.innerHTML = '<option value="">-- Chọn Trọng Tài --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("trong_tai");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_trong_tai;
        option.textContent = `${item.ma_trong_tai} - ${item.ho_ten}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachVongDau() {
    const selectElement = document.getElementById("maVongDau");
    selectElement.innerHTML = '<option value="">-- Chọn Vòng Đấu --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("vong_dau");
    console.log(data);
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_vong_dau;
        option.textContent = `${item.ma_vong_dau} - ${item.ten_vong}`;
        selectElement.appendChild(option);
    });
}