// const params = new URLSearchParams(window.location.search);
// const id_nhaHang = params.get("id_nhaHang");

const btnDatBanLai = document.getElementById("dat_lai_ban");
const btnCapNhatThongTin = document.getElementById("cap_nhat_thongTin");
const btnThanhToan = document.getElementById("thanh_toan");
const ten_nhaHang = document.getElementById("ten_nhaHang");

const tableContainer = document.getElementById("table_danDatCoc");

const ho_ten = document.getElementById("ho_ten");
const sdt = document.getElementById("sdt");
const gmail = document.getElementById("gmail");

const ten_nhaHang_nho = document.getElementById("ten_nha_hang_nho");
const sdtnhaHang = document.getElementById("sdt_nha_hang");
const dtNhaHang = document.getElementById("address_nha_hang");

document.addEventListener("DOMContentLoaded", async function () {
    // console.log("Danh sách bàn đã chọn:");
    // console.log(DanhSach.getNhaHangDangChon());
    
    const id_nhaHang = DanhSach.getNhaHangDangChon();
    const nhaHang = (await hamChung.layThongTinTheo_ID("nha_hang", id_nhaHang));
    console.log(nhaHang);
    if(nhaHang === null){
        window.location.href = `/view/menu_main/list_nhahang.html`;
    }
    ten_nhaHang.textContent = nhaHang.ten;
    ten_nhaHang_nho.textContent = nhaHang.ten;
    sdtnhaHang.textContent = nhaHang.sdt;
    dtNhaHang.textContent = nhaHang.dia_chi;
    console.log("Danh sách bàn đã chọn sau khi load lại:", DanhSach.getListTables_duocChon());


    // DanhSach.setNhaHangDangChon("111");
    console.log(DanhSach.getNhaHangDangChon());

    viewThongTinDatBan();
    viewThongTinNguoiDat();
    viewThongTinDatBan();

    btnDatBanLai.addEventListener("click", function () {
        // window.location.href = "/view/khachhang/thongtindatban.html";
        window.location.href = `/view/khachhang/datbanan.html?id_nhaHang=${id_nhaHang}`;
    });
    btnCapNhatThongTin.addEventListener("click", function () {
        window.location.href = `/view/taikhoan/update_profile.html?taikhoanId=${GlobalStore.getUsername()}`;
    });
    btnThanhToan.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của button trong form
        thanh_toan();
    });




});
function viewThongTinDatBan() {
    const id_nhaHang = DanhSach.getNhaHangDangChon();
    // Lấy danh sách bàn đã chọn từ DanhSach
    const selectedTables = DanhSach.getListTables_duocChon();
    // Xóa nội dung cũ trước khi thêm mới
    tableContainer.innerHTML = "";
    // Thêm danh sách bàn được chọn vào
    selectedTables.forEach(table => {
        const p = document.createElement("p");
        const tableName = document.createElement("span");
        tableName.textContent = table.name; // Số bàn
        tableName.classList.add("price");

        const tableCapacity = document.createElement("span");
        tableCapacity.textContent = table.socho || "Không rõ"; // Sức chứa (nếu có)
        tableCapacity.classList.add("price");

        p.appendChild(tableName);
        p.appendChild(tableCapacity);
        tableContainer.appendChild(p);
    });

}
async function viewThongTinNguoiDat() {
    const id_nhaHang = DanhSach.getNhaHangDangChon();
    const thongTinNhaHang = await hamChung.layThongTinTheo_ID("nha_hang", id_nhaHang);
    const nguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());
    // console.log(GlobalStore.getUsername());
    // console.log(await hamChung.layThongTinTheo_ID("nguoi_dung",GlobalStore.getUsername()));
    // console.log(nguoiDung.ten);
    ho_ten.textContent = nguoiDung.ten;
    sdt.textContent = nguoiDung.sdt;
    gmail.textContent = nguoiDung.email;
    dtNhaHang.textContent = thongTinNhaHang.dia_chi;
}
async function thanh_toan() {
    console.log("Thanh toán");
    console.log("Danh sách bàn đã chọn:", DanhSach.getListTables_duocChon());

    const idDonDatBan = await hamChung.taoID_theoBang("don_dat_ban");
    
    post_don_dat_ban(idDonDatBan);
    post_ct_donDatBan(idDonDatBan);

   // đã có rồi 
    // put_trangThaiBan();
    // cho các thuôc tính trả về ban đầu 
    DanhSach.resetListTables_duocChon();
    alert("Đặt bàn thành công");

}
function post_don_dat_ban(idDonDatBan) {
    const them_don_dat_ban = {
        "id": idDonDatBan,
        "nguoi_dung_id": GlobalStore.getUsername(),
        "nha_hang_id": DanhSach.getNhaHangDangChon(),
        "trang_thai": "cho_xac_nhan"
    };
    console.log("Đơn đặt bàn đã tạo:", them_don_dat_ban);
    hamChung.them(them_don_dat_ban, "don_dat_ban");
}
async function post_ct_donDatBan(idDonDatBan) {
    const danhSachBan = DanhSach.getListTables_duocChon();

    let lastID = await hamChung.taoID_theoBang("chi_tiet_don_dat_ban"); // Lấy ID cuối cùng từ DB
    let number = parseInt(lastID.replace(/\D/g, ""), 10); // Tách số từ ID

    for (const ban of danhSachBan) { 
        number++; // Tăng số thứ tự
        let idChiTietDDB = `ctddb_${String(number).padStart(4, "0")}`; // Tạo ID mới đúng định dạng

        console.log("ID chi tiết đơn đặt bàn:", idChiTietDDB);

        const chiTiet = {
            "id": idChiTietDDB,
            "don_dat_ban_id": idDonDatBan,
            "ban_an_id": ban.id,
            "tong_tien": "100.00",
            "trang_thai": "cho_xu_ly"
        };

        console.log("Chi tiết đơn đặt bàn đã tạo:", chiTiet);

        await hamChung.them(chiTiet, "chi_tiet_don_dat_ban");  // Đợi thêm vào DB xong


        ///  nhớ mở commment cái này 
        await put_trangThaiBan(ban.id, "da_dat");
    }
}



function put_trangThaiBan(idBan, trangThai) {
    const data = {
        "id":idBan,
        "trang_thai": trangThai
    };
    hamChung.sua(data,"ban_an");
    
}