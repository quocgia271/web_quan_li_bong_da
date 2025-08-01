const btnLuuThayDoi = document.getElementById("button_luu");
//const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

const maCauThu = document.getElementById("maCauThu");
const hoTen = document.getElementById("hoTen");
const ngaySinh = document.getElementById("ngaySinh");
const soAo = document.getElementById("soAo");
const maGioiTinh = document.getElementById("maGioiTinh");
const maViTri = document.getElementById("maViTri");
const maDoiBong = document.getElementById("maDoiBong");
const hinhAnh = document.getElementById("hinhAnh");
const inputFile = document.getElementById("hinhAnhFile");
const form = document.getElementById("inputForm");

let user_name = null;

document.addEventListener("DOMContentLoaded", async function () {
    user_name = GlobalStore.getUsername();
    loadDanhSachViTri();
    await loadDanhSachDoiBong();
    
    
    document.getElementById("filterDoiBong").value = DoiTuyen.getDoiTuyen_dangChon();
    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);

    document.getElementById("filterDoiBong").addEventListener("change", async function () {

        viewTbody();
    });




});

// Hiển thị danh sách cầu thủ
async function viewTbody() {

    const maDoiBong = document.getElementById("filterDoiBong").value;
    const tableBody = document.getElementById("dataTable");
    // Lấy mã đội bóng user đã chọn
    console.log("Madb" + maDoiBong);
    let data = await hamChiTiet.laycauThuTheoQuanLy(user_name);
    console.log(data);
    if (maDoiBong !== "ALL") {
        console.log(maDoiBong);
        // console.log(data);

        data = data.filter(item => item.ma_doi_bong === maDoiBong);

    }
    console.log(data);



    tableBody.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        let hinh_anh;
        const row = document.createElement("tr");
        // C:\Users\vanti\Desktop\quan_ly_tran_dau\frontend\public\images\cat-2.png

        if (item.hinh_anh === null) {
            hinh_anh = "/frontend/public/images/cat-2.png";
        } else {
            hinh_anh = await hamChung.getImage(item.hinh_anh);
        }
        const viTriCT = await hamChung.layThongTinTheo_ID("vi_tri_cau_thu", item.ma_vi_tri);
        row.innerHTML = `
            <td style="text-align: start;">${item.ten_doi_bong}</td>
            <td style="text-align: start;">${item.ho_ten}</td>
            <td style="text-align: start;">${new Date(item.ngay_sinh).toLocaleDateString('vi-VN')}</td>
            <td style="text-align: start;">${item.so_ao}</td>
            
            <td style="text-align: start;">${viTriCT.ten_vi_tri}</td>
            
            <td style="text-align: start;"><img src="${hinh_anh}" alt="Hình ảnh" width="50"></td>
            <td style="text-align: start;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: start;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    }

    button_sua(data);
    button_xoa(data);
}
document.getElementById("hinhAnh").addEventListener("click", () => {
    document.getElementById("hinhAnhFile").click();
});

document.getElementById("hinhAnhFile").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        // Gán tên file vào ô text 
        document.getElementById("hinhAnh").value = file.name;

        // Hiển thị ảnh xem trước
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Thêm/Sửa cầu thủ
// Thêm/Sửa cầu thủ
async function handleLuuThayDoi(event) {
    event.preventDefault();
    // const inputFile = document.getElementById('hinhAnhFile'); // Thẻ input file

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    let formData = {};
    let id_Hinh_anh_thay = "";
    // nếu có hình ảnh mới thì lấy tên hình ảnh đó ra 
    if (inputFile.value === "")
        id_Hinh_anh_thay = hinhAnh.value;
    else {
        id_Hinh_anh_thay = inputFile.files[0].name; // Lấy tệp đầu tiên (nếu có)
    }
    id_Hinh_anh_thay = hamChung.doiKhoangTrangThanhGachDuoi(id_Hinh_anh_thay);

    console.log(id_Hinh_anh_thay);
    if (maCauThu.value === "") {
        formData = {
            ma_cau_thu: await hamChung.taoID_theoBang("cau_thu"),
            ho_ten: hoTen.value,
            ngay_sinh: ngaySinh.value,
            so_ao: soAo.value,
            ma_gioi_tinh: maGioiTinh.value,
            ma_vi_tri: maViTri.value,
            ma_doi_bong: maDoiBong.value,
            hinh_anh: id_Hinh_anh_thay
        };
        await hamChung.them(formData, "cau_thu");
        alert("Thêm thành công!");

        // update ảnh nếu cócó
    } else {
        formData = {
            ma_cau_thu: maCauThu.value,
            ho_ten: hoTen.value,
            ngay_sinh: ngaySinh.value,
            so_ao: soAo.value,
            gioi_tinh: maGioiTinh.value,
            ma_vi_tri: maViTri.value,
            ma_doi_bong: maDoiBong.value,
            hinh_anh: id_Hinh_anh_thay
        };
        await hamChung.sua(formData, "cau_thu");
        alert("Sửa thành công!");
    }

    console.log(formData);
    // phần này là phần cập nhật ảnh lên server
    if (inputFile.value != "") {
        await hamChung.uploadImage(inputFile.files[0]);
    }
    maCauThu.value = "";
    hoTen.value = "";
    ngaySinh.value = "";
    soAo.value = "";
    maGioiTinh.value = "";
    maViTri.value = "";
    maDoiBong.value = "";
    hinhAnhFile.value = null;
    hinhAnh.value = "";
    document.getElementById("previewImage").src = "https://cdn4.vectorstock.com/i/1000x1000/58/48/blank-photo-icon-vector-3265848.jpg"
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
            maCauThu.value = item.ma_cau_thu;
            hoTen.value = item.ho_ten;
            ngaySinh.value = item.ngay_sinh?.split("T")[0];//item.ngay_sinh;
            soAo.value = item.so_ao;
            maGioiTinh.value = item.gioi_tinh;
            maViTri.value = item.ma_vi_tri;
            maDoiBong.value = item.ma_doi_bong;
            console.log(item);
            hinhAnh.value = item.hinh_anh;
            document.getElementById("previewImage").src = "https://res.cloudinary.com/dyilzwziv/image/upload/" + item.hinh_anh;
        });
    });
}

// Xử lý nút "Xóa"
function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            if (confirm(`Bạn có chắc chắn muốn xóa cầu thủ ${data[index].ma_cau_thu}?`)) {
                const formData = { ma_cau_thu: data[index].ma_cau_thu };
                await hamChung.xoa(formData, "cau_thu");
                viewTbody();
            }
        });
    });
}

async function loadDanhSachViTri() {
    const selectElement = document.getElementById("maViTri");
    selectElement.innerHTML = '<option value="">-- Chọn Vị Trí --</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("vi_tri_cau_thu");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_vi_tri;
        option.textContent = `${item.ma_vi_tri} - ${item.ten_vi_tri}`;
        selectElement.appendChild(option);
    });
}

// async function loadDanhSachDoiBong() {
//     const selectElement = document.getElementById("maDoiBong");
//     selectElement.innerHTML = '<option value="">-- Chọn Đội Bóng --</option>'; // Reset danh sách
//     const data = await hamChiTiet.layDoiBongTheoQL("ND002");
//     data.forEach(item => {
//         const option = document.createElement("option");
//         option.value = item.ma_doi_bong;
//         option.textContent = `${item.ma_doi_bong} - ${item.ten_doi_bong}`;
//         selectElement.appendChild(option);
//     });
// }

async function loadDanhSachDoiBong() {
    // Thay vì getElementById, bạn lấy tất cả thẻ có class .comboboxDoiBong
    const selectElements = document.querySelectorAll(".comboboxDoiBong");

    // Gọi API để lấy danh sách đội bóng
    const data = await hamChiTiet.layDoiBongTheoQL(user_name);

    // Lặp qua từng <select> tìm được
    selectElements.forEach(selectElement => {
        // Reset option
        selectElement.innerHTML = '<option value="ALL">-- ALL đội --</option>';

        // Nạp dữ liệu
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.ma_doi_bong;
            option.textContent = `${item.ten_doi_bong}`;
            selectElement.appendChild(option);
        });
    });

}

//filter theo danh sách đội bóng
