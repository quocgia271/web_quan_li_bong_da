const id = document.getElementById("id_chinh");
const ten = document.getElementById("ten");
const dia_chi = document.getElementById("dia_chi");
const sdt = document.getElementById("sdt");
const mo_ta = document.getElementById("mo_ta");
const hinh_anh = document.getElementById("hinh_anh");
const ngay_tao = document.getElementById("ngay_tao");
const loai_id = document.getElementById("loai_id");
const so_sao = document.getElementById("so_sao");
const noidung = document.getElementById("noidung");
const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");
// document.getElementById("ten").value = item.ten;
// document.getElementById("dia_chi").value = item.dia_chi;
// document.getElementById("sdt").value = item.sdt;
// document.getElementById("mo_ta").value = item.mo_ta;
// document.getElementById("hinh_anh").value = item.hinh_anh;
// document.getElementById("ngay_tao").value = item.ngay_tao.replace(" ", "T").substring(0, 16);
// document.getElementById("loai_id").value = item.loai_id;
// document.getElementById("so_sao").value = item.so_sao;
// document.getElementById("noidung").value = item.noidung;



document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});
async function viewTbody() {
    // Lấy dữ liệu
    const taiKhoan = await GlobalStore.getUsername();
    const thongTinNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", taiKhoan);
    const idNhaHangQuanLy = thongTinNguoiDung.id_nhaHangQuanLy;
    const data = await hamChung.layThongTinTheo_ID("nha_hang", idNhaHangQuanLy);

    console.log("Dữ liệu nhà hàng:", data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ nếu có

    // Chuyển dữ liệu thành mảng nếu chỉ có một phần tử
    const dataArray = Array.isArray(data) ? data : [data];

    loadLoaiID();

    dataArray.forEach((item, index) => {
        const row = document.createElement("tr");
        const ngayTaoFormatted = item.ngay_tao.replace(" ", "T").substring(0, 16);
        row.innerHTML = `
        <td style="text-align: center;">${item.id}</td>
        <td>${item.ten}</td>
        <td>${item.dia_chi}</td>
        <td>${item.sdt}</td>
        <td>${item.mo_ta}</td>
        <td style="text-align: center;">
            <img src="${item.hinh_anh}" alt="Hình ảnh" width="50" onerror="this.style.display='none'">
        </td>

        <td>${ngayTaoFormatted.replace("T", " ")}</td>
        <td>${item.loai_id}</td>
        <td>${item.so_sao}</td>
        <td>${item.noidung}</td>
        <td style="text-align: center;">
            <button class="edit-btn" data-index="${index}">Sửa</button>
        </td>
       
    `;
        tableBody.appendChild(row);
    });

    // Truyền dataArray vào button_sua
    button_sua(dataArray);
    button_luuThayDoi();
    btn_taiLaiTrang();
}


function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            const item = data[index];
            id.value = item.id;
            ten.value = item.ten;
            dia_chi.value = item.dia_chi;
            sdt.value = item.sdt;
            mo_ta.value = item.mo_ta;
            // Hiển thị đường dẫn ảnh dưới ô nhập file
            document.getElementById("hinh_anh-path").textContent = `Ảnh hiện tại: ${item.hinh_anh}`;
            ngay_tao.value = item.ngay_tao.replace(" ", "T").substring(0, 16);
            loai_id.value = item.loai_id;
            so_sao.value = item.so_sao;
            noidung.value = item.noidung;

        });
    });
}

function button_luuThayDoi() {

    btnLuuThayDoi.addEventListener("click", async () => {
        // Lấy thông tin từ các ô nhập
        const formData = {
            id: document.getElementById("id_chinh").value,
            ten: document.getElementById("ten").value,
            dia_chi: document.getElementById("dia_chi").value,
            // sdt: document.getElementById("sdt").value,
            mo_ta: document.getElementById("mo_ta").value,
            hinh_anh: document.getElementById("hinh_anh").value,
            // ngay_tao: document.getElementById("ngay_tao").value,
            loai_id: document.getElementById("loai_id").value,
            // so_sao: document.getElementById("so_sao").value,
            noidung: document.getElementById("noidung").value
        };

        console.log("Thông tin từ ô nhập:", formData);
        hamChung.sua(formData, "nha_hang");
        viewTbody();
    });
}
function btn_taiLaiTrang() {
    // location.reload(); // Tải lại trang
    btnTaiLaiTrang.addEventListener("click", async() => {
        location.reload(); // Tải lại trang
    })
}


async function loadLoaiID() {
    const loaiList = await hamChung.layDanhSach("loai_nha_hang");
    const loaiSelect = document.getElementById("loai_id");
    console.log("Danh sách loại:", loaiList);
    loaiList.forEach((loai) => {
        const option = document.createElement("option");
        option.value = loai.id;
        option.textContent = loai.ten_loai;
        loaiSelect.appendChild(option);
    });
}

