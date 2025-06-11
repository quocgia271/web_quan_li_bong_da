const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");
const btn_xemTD_sap_dien_ra = document.getElementById("button_xemTD_sap_dien_ra");

const maGiaiDau = document.getElementById("maGiaiDau");
const maDoiBong = document.getElementById("maDoiBong");
const trangThai = document.getElementById("trangThai");
const lyDoTuChoi = document.getElementById("lyDoTuChoi");




const maGiaiDau_chon_viewbody = document.getElementById("maGiaiDau_chon_viewbody");


// Lấy các phần tử

const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");
let danhSachCauThu_thamGia_cua1doi;

document.addEventListener("DOMContentLoaded", function () {
    loadDanhSachGiaiDau();
    loadDanhSachDoiBong();
    loadDanhSachGiaiDau_chon();

    loadDanhSachGiaiDau_chon_viewBody();
    viewTbody();
    btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
    btn_xemTD_sap_dien_ra.addEventListener("click", handle_view_GiaiDau);

    maGiaiDau_chon_viewbody.addEventListener("change", async function () {
        console.log(maGiaiDau_chon_viewbody.value);
        // maVongDau_chon_viewbody.value = "All";
        let data = await hamChung.layDanhSach("dang_ky_tham_gia_giai");

        viewTbody(data);
    });

});

async function viewTbody(data) {
    // const data = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    if (data === undefined) {
        data = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    }
    if (maGiaiDau_chon_viewbody.value !== "All") {
        data = data.filter(item => item.ma_giai_dau === maGiaiDau_chon_viewbody.value);
    }
    const tableBody = document.getElementById("dataTable");
    console.log(data);
    tableBody.innerHTML = "";

    // for (const item of data) {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const row = document.createElement("tr");
        const data1giaiDau = await hamChung.layThongTinTheo_ID("giai_dau", item.ma_giai_dau);
        //  const data1doiBongTrongGiai = await hamChung.layThongTinTheo_2_ID("doi_bong_giai_dau", item.ma_doi_bong, item.ma_giai_dau);
        const dataDoiBongGiaiDau = await hamChung.layDanhSach("doi_bong_giai_dau");
        const data1doiBong_now = await hamChung.layThongTinTheo_ID("doi_bong", item.ma_doi_bong);
        console.log(data1doiBong_now);
        let tenDoiBong = data1doiBong_now.ten_doi_bong;

        const tim1doiBongGiaiDau = dataDoiBongGiaiDau.find(db => db.ma_doi_bong === item.ma_doi_bong && db.ma_giai_dau === item.ma_giai_dau);

        if (tim1doiBongGiaiDau != undefined) {
            tenDoiBong = tim1doiBongGiaiDau.ten_doi_bong;
        }
        console.log(tim1doiBongGiaiDau);
        console.log(tenDoiBong);
        // tenDoiBong = tim1doiBongGiaiDau ? tim1doiBongGiaiDau.ten_doi_bong ;
        row.innerHTML = `
            <td style="text-align: center;">${data1giaiDau.ten_giai_dau}</td>
            <td style="text-align: center;">${tenDoiBong}</td>
            <td style="text-align: center;">${item.thoi_gian_dang_ky}</td>
            <td style="text-align: center;">${item.trang_thai}</td>
            <td style="text-align: center;">${item.ly_do_tu_choi || ""}</td>
            <td style="text-align: center;"><button class="edit-btn btn btn-warning btn-sm">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn btn btn-danger btn-sm">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    }

    button_sua(data);
    button_xoa(data);
}

async function handleLuuThayDoi(event) {
    event.preventDefault();
    const form = document.getElementById("inputForm");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = {
        ma_giai_dau: maGiaiDau.value,
        ma_doi_bong: maDoiBong.value,
        trang_thai: trangThai.value,
        ly_do_tu_choi: lyDoTuChoi.value || null
    };

    // Kiểm tra tồn tại: nếu đã có thì sửa, chưa có thì thêm mới
    const data = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    const daTonTai = data.some(
        item => item.ma_giai_dau === formData.ma_giai_dau && item.ma_doi_bong === formData.ma_doi_bong
    );
    const dataDangKyThamGiaGiai = data.find(
        item => item.ma_giai_dau === formData.ma_giai_dau && item.ma_doi_bong === formData.ma_doi_bong
    );

    alert("Sửa thành công!");
    capNhat_doiBongGiaiDau_theo_trangThai_dangKyGiaiDau(dataDangKyThamGiaGiai, formData);
    if (daTonTai) {
        await hamChung.sua(formData, "dang_ky_tham_gia_giai");


        alert("Sửa thành công!");
    } else {
        await hamChung.them(formData, "dang_ky_tham_gia_giai");
        alert("Thêm thành công!");
    }


    // viewTbody();
}

function handleTaiLaiTrang(event) {
    event.preventDefault();
    location.reload();
}

function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            document.getElementById("maGiaiDau").disabled = true;

            document.getElementById("maDoiBong").disabled = true;
            const item = data[index];
            // const data1GiaiDau = await hamChung.layThongTinTheo_ID("giai_dau", item.ma_giai_dau);
            // const data1DoiBong = await hamChung.layThongTinTheo_ID("doi_bong", item.ma_doi_bong);
            maGiaiDau.value = item.ma_giai_dau;

            maDoiBong.value = item.ma_doi_bong;
            trangThai.value = item.trang_thai;
            lyDoTuChoi.value = item.ly_do_tu_choi || "";

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const item = data[index];
            if (confirm(`Bạn có chắc chắn muốn xóa đăng ký của đội "${item.ma_doi_bong}" tại giải "${item.ma_giai_dau}"?`)) {
                await hamChung.xoa({
                    ma_giai_dau: item.ma_giai_dau,
                    ma_doi_bong: item.ma_doi_bong
                }, "dang_ky_tham_gia_giai");
                viewTbody();
            }
        });
    });
}

function handle_view_GiaiDau(event) {
    console.log("tien");
    event.preventDefault();

    // Hiển thị bảng popupOverlay
    document.getElementById("popupOverlay").classList.remove("hidden");
    // Sự kiện khi nhấn nút "Đóng" trong bảng
    document.getElementById("closePopup").addEventListener("click", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        document.getElementById("popupOverlay").classList.add("hidden");
    });

    viewTbody_chon("All", "All");
    // (Tùy chọn) Hiển thị dữ liệu cho bảng (nếu có)
    // Gọi hàm viewTbody để lấy dữ liệu và hiển thị trong bảng
    document.getElementById("maGiaiDau_chon").addEventListener("change", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        console.log(document.getElementById("maGiaiDau_chon").value);
        viewTbody_chon(document.getElementById("maGiaiDau_chon").value, document.getElementById("trangThai_chon").value);
        // console.log(trangThaiDuyet.value);

    });
    document.getElementById("trangThai_chon").addEventListener("change", function () {
        // Ẩn bảng khi nhấn nút "Đóng"
        console.log(document.getElementById("maGiaiDau_chon").value);
        viewTbody_chon(document.getElementById("maGiaiDau_chon").value, document.getElementById("trangThai_chon").value);
        // console.log(trangThaiDuyet.value);

    });

    document.getElementById("button_duyet_tat_ca").addEventListener("click", function (e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định nếu cần
        document.getElementById("confirmModal").classList.remove("hidden");
    });

    document.getElementById("confirmYes").addEventListener("click", async function () {
        document.getElementById("confirmModal").classList.add("hidden");
        // Thêm hành động duyệt tất cả ở đây
        const ma_GiaiDau_chon = document.getElementById("maGiaiDau_chon").value;
        const trangThai_chon = document.getElementById("trangThai_chon").value;
        // const 
        const data_dangKyThamGiaGiai = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
        let data = data_dangKyThamGiaGiai;

        if (ma_GiaiDau_chon !== "All") {
            data = data.filter(item => item.ma_giai_dau === ma_GiaiDau_chon);
        }

        if (trangThai_chon !== "All") {
            data = data.filter(item => item.trang_thai === trangThai_chon);
        }
        data = data.filter(item => item.trang_thai === "Chờ duyệt");
        for (let i = 0; i < data.length; i++) {
            //  console.log(data[i]);
            const formData = {
                "ma_doi_bong": data[i].ma_doi_bong,
                "ma_giai_dau": data[i].ma_giai_dau,
                "trang_thai": "Đã duyệt"
            };
            hamChung.sua(formData, "dang_ky_tham_gia_giai");
            const dataDangKyThamGiaGiai_cu = await hamChung.layThongTinTheo_2_ID("dang_ky_tham_gia_giai", data[i].ma_giai_dau, data[i].ma_doi_bong);
            capNhat_doiBongGiaiDau_theo_trangThai_dangKyGiaiDau(dataDangKyThamGiaGiai_cu, formData);
            console.log(formData);
            // GỌI LẠI HÀM SAU KHI CẬP NHẬT DỮ LIỆU
            // await viewTbody_chon(ma_GiaiDau_chon, trangThai_chon);
        }
        await viewTbody_chon(ma_GiaiDau_chon, trangThai_chon);

        alert("Đã duyệt tất cả!");
    });
    //capNhat_doiBongGiaiDau_theo_trangThai_dangKyGiaiDau(dataDangKyThamGiaGiai, formData);

    document.getElementById("confirmNo").addEventListener("click", function () {
        document.getElementById("confirmModal").classList.add("hidden");
    });




    document.getElementById("btnChinhSua_cauThuThamGia").addEventListener("click", function () {
        console.log("Mở khóa checkbox");

        // Lấy tất cả các checkbox trong bảng (bạn có thể giới hạn phạm vi nếu cần)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        document.getElementById("btn_luuThongTinCauThuDa").classList.remove("hidden");
        // Tạo bản sao không thay đổi theo checkbox sau này
        danhSachCauThu_thamGia_cua1doi = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);  // chỉ lưu value, hoặc lưu {value, checked} nếu cần

        for (const checkbox of checkboxes) {
            checkbox.disabled = false; // Mở khóa
        }

    });

    document.getElementById("btn_luuThongTinCauThuDa").addEventListener("click", async function () {

        let maGiaiDau_chon;
        let maDoiBong_chon;
        // Lấy tất cả các checkbox trong bảng (bạn có thể giới hạn phạm vi nếu cần)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        if (checkboxes.length > 0) {
            const firstCheckbox = checkboxes[0];
            maGiaiDau_chon = firstCheckbox.dataset.maGiaiDau;
            maDoiBong_chon = firstCheckbox.dataset.maDoiBong;
        }
        for (const checkbox of checkboxes) {
            checkbox.disabled = true; // khoas
        }
        for (const value of danhSachCauThu_thamGia_cua1doi) {
            console.log(`Checkbox đã từng được chọn: ${value}`);
            let form_data = {
                ma_cau_thu: value,
                ma_doi_bong: maDoiBong_chon,
                ma_giai_dau: maGiaiDau_chon
            }
            await hamChung.xoa(form_data, "cau_thu_giai_dau");
            console.log(form_data);
        }
        // thêm mới
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                console.log(`Checkbox được chọn: ${checkbox.value}`);
                const data1CauThu_hienTai = await hamChung.layThongTinTheo_ID("cau_thu", checkbox.value);

                let form_data = {
                    ma_cau_thu: checkbox.value,
                    ma_doi_bong: maDoiBong_chon,
                    ma_giai_dau: maGiaiDau_chon,
                    ho_ten: data1CauThu_hienTai.ho_ten,
                    so_ao: data1CauThu_hienTai.so_ao,
                    hinh_anh: data1CauThu_hienTai.hinh_anh,
                    ma_vi_tri: data1CauThu_hienTai.ma_vi_tri
                }
                await hamChung.them(form_data, "cau_thu_giai_dau");
                console.log(form_data);
            }
        }
    });




}

async function viewTbody_chon(maGiaiDau, trangThai_chon) {
    console.log(maGiaiDau);
    console.log(trangThai_chon);
    const data_dangKyThamGiaGiai = await hamChung.layDanhSach("dang_ky_tham_gia_giai");
    let data = data_dangKyThamGiaGiai;

    if (maGiaiDau !== "All") {
        data = data.filter(item => item.ma_giai_dau === maGiaiDau);
    }

    if (trangThai_chon !== "All") {
        data = data.filter(item => item.trang_thai === trangThai_chon);
    }


    const tableBody = document.getElementById("dataTable_chon");
    tableBody.innerHTML = "";

    for (const item of data) {
        const row = document.createElement("tr");
        const data1giaiDau = await hamChung.layThongTinTheo_ID("giai_dau", item.ma_giai_dau);
        const data1doiBong = await hamChung.layThongTinTheo_ID("doi_bong", item.ma_doi_bong);

        row.innerHTML = `
            <td style="text-align: center;">${data1giaiDau.ten_giai_dau}</td>
            <td style="text-align: center;">${data1doiBong.ten_doi_bong}</td>
            <td style="text-align: center;">${item.thoi_gian_dang_ky}</td>
            <td style="text-align: center;">${item.ly_do_tu_choi || ""}</td>
            <td style="text-align: center;">
                <select class="status-select form-control form-control-sm">
                    <option value="Chờ duyệt" ${item.trang_thai === 'Chờ duyệt' ? 'selected' : ''} style="background-color: #f0ad4e; color: white;">Chờ duyệt</option>
                    <option value="Đã duyệt" ${item.trang_thai === 'Đã duyệt' ? 'selected' : ''} style="background-color: #5bc0de; color: white;">Đã duyệt</option>
                    <option value="Từ chối" ${item.trang_thai === 'Từ chối' ? 'selected' : ''} style="background-color: #d9534f; color: white;">Từ chối</option>
                </select>
            </td>
            <td style="text-align: center;"><button class="xem_doi btn btn-warning btn-sm">Xem Đội</button></td>
        `;
        tableBody.appendChild(row);

        // Lắng nghe sự kiện change của select
        const select = row.querySelector('.status-select');
        const options = select.querySelectorAll('option');

        const xemDoiBtn = row.querySelector('.xem_doi');
        // Hàm thay đổi màu nền của select khi thay đổi giá trị
        select.addEventListener('change', async (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedColor = selectedOption.style.backgroundColor;
            e.target.style.backgroundColor = selectedColor;
            // Cập nhật giá trị trang_thai khi người dùng thay đổi
            const newTrangThai = e.target.value;
            const maDoiBong = row.querySelector('td:nth-child(2)').textContent; // Lấy mã đội bóng (có thể thay đổi tuỳ theo cấu trúc dữ liệu)

            console.log(`Trạng thái đã thay đổi: ${newTrangThai} cho đội bóng: ${maDoiBong}`);
            const formData = {
                "ma_doi_bong": item.ma_doi_bong,
                "ma_giai_dau": item.ma_giai_dau,
                "trang_thai": newTrangThai
            };
            hamChung.sua(formData, "dang_ky_tham_gia_giai");
            const dataDangKyThamGiaGiai_cu = await hamChung.layThongTinTheo_2_ID("dang_ky_tham_gia_giai", item.ma_giai_dau, item.ma_doi_bong);
            capNhat_doiBongGiaiDau_theo_trangThai_dangKyGiaiDau(dataDangKyThamGiaGiai_cu, formData);
            console.log(formData);

        });

        // Đặt màu nền ban đầu của select khi trang thái đã chọn
        const selectedOption = Array.from(options).find(option => option.selected);
        if (selectedOption) {
            select.style.backgroundColor = selectedOption.style.backgroundColor;
        }
        xemDoiBtn.addEventListener('click', async () => {
            const maDoiBong = item.ma_doi_bong;
            const maGiaiDau = item.ma_giai_dau;

            console.log(`Xem đội: ${maDoiBong} trong giải đấu: ${maGiaiDau}`);


            await hienOverlayCauThu(maGiaiDau, maDoiBong); // Gọi hàm mở danh sách cầu thủ với mã đội bóng

            document.getElementById("btn_luuThongTinCauThuDa").classList.add("hidden");

        });
    }


}




// Mở overlay cầu thủ, ẩn overlay giải đấu
// Mở overlay cầu thủ, ẩn overlay giải đấu
async function hienOverlayCauThu(maGiaiDau, maDoiBong) {
    document.getElementById("popupOverlay").classList.add("hidden");
    document.getElementById("overlayCauThu").classList.remove("hidden");
    const layDoiBong = await hamChung.layThongTinTheo_ID("doi_bong", maDoiBong);
    const layGiaiDau = await hamChung.layThongTinTheo_ID("giai_dau", maGiaiDau);
    document.getElementById("value_thongTinCT").textContent = "Danh sách Cầu Thủ " + layDoiBong.ten_doi_bong +
        " - " + layGiaiDau.ten_giai_dau;

    // Gọi API lấy danh sách cầu thủ tham gia giải đấu
    const dataCauThu = await hamChung.layDanhSach("cau_thu");
    console.log(dataCauThu);
    console.log(maGiaiDau);
    console.log(maDoiBong);

    // Lọc danh sách theo mã đội bóng
    const dataLoc_doiBong = dataCauThu.filter(item => item.ma_doi_bong === maDoiBong);
    const dataSapXep = await sapXepLai(dataLoc_doiBong, maDoiBong, maGiaiDau);
    // danhSachCauThu_thamGia_cua1doi = dataSapXep;
    console.log(dataLoc_doiBong);

    const tbody = document.getElementById("playerListBody");
    tbody.innerHTML = "";


    // Duyệt qua từng cầu thủ để hiển thị và kiểm tra xem có tham gia giải đấu không
    for (const cauThu of dataSapXep) {
        // Kiểm tra xem cầu thủ đã tham gia giải đấu chưa
        const daThamGia = await check_cauThu_coThamGiaGiai(cauThu.ma_cau_thu, maDoiBong, maGiaiDau);

        const checked = daThamGia ? "checked" : ""; // Nếu tham gia thì checked

        const row = document.createElement("tr");
        const viTriCT = await hamChung.layThongTinTheo_ID("vi_tri_cau_thu", cauThu.ma_vi_tri);
        let hinh_anh;

        if (cauThu.hinh_anh === null) {
            hinh_anh = "/frontend/public/images/cat-2.png";
        } else {
            hinh_anh = await hamChung.getImage(cauThu.hinh_anh);
        }
        row.innerHTML = `
            <td>${cauThu.ho_ten}</td>
            <td>${cauThu.so_ao}</td>
            <td>${viTriCT.ten_vi_tri}</td>
            <td style="text-align: center;"><img src="${hinh_anh}" alt="Hình ảnh" width="50"></td>
            <td>
                    <input
                        type="checkbox"
                        value="${cauThu.ma_cau_thu}"
                        ${checked}
                        disabled
                        data-ma-giai-dau="${maGiaiDau}"
                        data-ma-doi-bong="${maDoiBong}"
                    >
            </td>

        `;
        tbody.appendChild(row);
    }
}


// Quay lại overlay danh sách giải đấu
document.getElementById("backToPopup").addEventListener("click", () => {
    document.getElementById("overlayCauThu").classList.add("hidden");
    document.getElementById("popupOverlay").classList.remove("hidden");

});

async function check_cauThu_coThamGiaGiai(maCauThu, maDoiBong, maGiaiDau) {
    const data = await hamChung.layDanhSach("cau_thu_giai_dau");

    const daTonTai = data.some(item =>
        item.ma_giai_dau === maGiaiDau &&
        item.ma_cau_thu === maCauThu &&
        item.ma_doi_bong === maDoiBong
    );

    return daTonTai;
}

async function sapXepLai(dataLoc_doiBong, maDoiBong, maGiaiDau) {
    // Lấy danh sách cầu thủ đã đăng ký tham gia giải đấu
    const dataCauThuGiaiDau = await hamChung.layDanhSach("cau_thu_giai_dau");
    const dataCauThuGiaiDau_doiBong = dataCauThuGiaiDau.filter(item => item.ma_doi_bong === maDoiBong);
    console.log(dataLoc_doiBong);
    // Lấy ra các mã cầu thủ thuộc đội bóng đó đã tham gia giải đấu cụ thể
    const maCauThuThamGia = dataCauThuGiaiDau_doiBong
        .filter(item => item.ma_giai_dau === maGiaiDau)
        .map(item => item.ma_cau_thu);

    // Sắp xếp: cầu thủ đã tham gia giải đấu lên trước
    const cauThuThamGia = dataLoc_doiBong.filter(cauThu =>
        maCauThuThamGia.includes(cauThu.ma_cau_thu)
    );

    const cauThuChuaThamGia = dataLoc_doiBong.filter(cauThu =>
        !maCauThuThamGia.includes(cauThu.ma_cau_thu)
    );

    // Trả về danh sách đã sắp xếp
    return [...cauThuThamGia, ...cauThuChuaThamGia];
}

async function loadDanhSachGiaiDau() {
    const selectElement = document.getElementById("maGiaiDau");
    selectElement.innerHTML = '<option value="">-- Chọn Giải Đấu--</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("giai_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_giai_dau;
        option.textContent = `${item.ten_giai_dau}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachDoiBong() {
    const selectElement = document.getElementById("maDoiBong");
    selectElement.innerHTML = '<option value="">-- Chọn Đội Bóng--</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("doi_bong");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_doi_bong;
        option.textContent = `${item.ten_doi_bong}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachGiaiDau_chon() {
    const selectElement = document.getElementById("maGiaiDau_chon");
    selectElement.innerHTML = '<option value="All">Tất Cả</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("giai_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_giai_dau;
        option.textContent = `${item.ten_giai_dau}`;
        selectElement.appendChild(option);
    });
}
async function loadDanhSachGiaiDau_chon_viewBody() {
    const selectElement = document.getElementById("maGiaiDau_chon_viewbody");
    selectElement.innerHTML = '<option value="All">Tất Cả</option>'; // Reset danh sách
    const data = await hamChung.layDanhSach("giai_dau");
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_giai_dau;
        option.textContent = `${item.ten_giai_dau}`;
        selectElement.appendChild(option);
    });
}

async function capNhat_doiBongGiaiDau_theo_trangThai_dangKyGiaiDau(dataDangKyThamGiaGiai_cu, dataDangKyThamGiaGiai_new) {
    let trangThai_them_hay_xoa = "K";
    const trangThaiMoi = dataDangKyThamGiaGiai_new.trang_thai;
    if (dataDangKyThamGiaGiai_cu.trang_thai === trangThaiMoi) {
        console.log("Trạng thai ko đổi");
        return;
    }
    // kiểm tra đã có trong đổi bóng giải đấu chưa
    const dataLoc_doiBongGiaiDau = await hamChung.layDanhSach("doi_bong_giai_dau");
    // Thay `idDoiBong` và `idGiaiDau` bằng giá trị thực tế bạn đang kiểm tra
    const check_trong_doiBongGiaiDau = dataLoc_doiBongGiaiDau.some(item =>
        item.ma_doi_bong === dataDangKyThamGiaGiai_cu.ma_doi_bong && item.ma_giai_dau === dataDangKyThamGiaGiai_cu.ma_giai_dau
    );
    if (check_trong_doiBongGiaiDau) {
        console.log("Đội bóng đã có trong giải đấu.");
        // đã có và đã duyệt
        if (trangThaiMoi === "Đã duyệt") {
            // ko cần thêm vào
            trangThai_them_hay_xoa = "K"
        }
        else if (trangThaiMoi === "Chờ duyệt") {
            // ko cần thêm vào
            trangThai_them_hay_xoa = "X"
        }
        else if (trangThaiMoi === "Từ chối") {
            // ko cần thêm vào
            trangThai_them_hay_xoa = "X"
        }

    }
    else {
        console.log("Đội bóng chưa có trong giải đấu.");
        // chưa có và đã duyệt
        if (trangThaiMoi === "Đã duyệt") {
            // ko cần thêm vào
            trangThai_them_hay_xoa = "T"
        }
        else if (trangThaiMoi === "Chờ duyệt") {
            // ko cần thêm vào
            trangThai_them_hay_xoa = "K"
        }
        else if (trangThaiMoi === "Từ chối") {
            // ko cần thêm vào
            trangThai_them_hay_xoa = "K"
        }


    }

    const data1DoiBong = await hamChung.layThongTinTheo_ID("doi_bong", dataDangKyThamGiaGiai_cu.ma_doi_bong);

    let formData = {
        ma_doi_bong: data1DoiBong.ma_doi_bong,
        ma_giai_dau: dataDangKyThamGiaGiai_cu.ma_giai_dau,

        ten_doi_bong: data1DoiBong.ten_doi_bong,
        logo: data1DoiBong.logo,
        quoc_gia: data1DoiBong.quoc_gia,
        // hat_giong: hatGiong.value,

    };


    if (trangThai_them_hay_xoa === "T") {
        await hamChung.them(formData, "doi_bong_giai_dau");
        
    }
    else if (trangThai_them_hay_xoa === "X") {
        await hamChung.xoa(formData, "doi_bong_giai_dau");
      
    }
    // else {
    //     alert("Khoong ddoiri thành công!");
    // }
}