const id = document.getElementById("id_chinh");
const nha_hang_id = document.getElementById("nha_hang_id");
const ten = document.getElementById("ten");
const mo_ta = document.getElementById("mo_ta");
const gia = document.getElementById("gia");
const hinh_anh = document.getElementById("hinh_anh");
const con_hang = document.getElementById("con_hang");
const loai_do_an = document.getElementById("loai_do_an");
const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const taiKhoan = await GlobalStore.getUsername();
    const thongTinNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", taiKhoan);
    const idNhaHangQuanLy = thongTinNguoiDung.id_nhaHangQuanLy;
    console.log(idNhaHangQuanLy);
    const data = await hamChung.layDanhSachMenu_theoNhaHang(idNhaHangQuanLy);

    console.log("Dữ liệu thực đơn:", data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    const dataArray = Array.isArray(data) ? data : [data];

    dataArray.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.ten}</td>
            <td>${item.mo_ta}</td>
            <td>${item.gia}</td>
            <td><img src="${item.hinh_anh}" alt="Hình ảnh" width="50" onerror="this.style.display='none'"></td>
            <td>${item.con_hang == 1 ? "Còn" : "Hết"}</td>
            <td>${item.loai_do_an}</td>
            <td><button class="edit-btn" data-index="${index}">Sửa</button></td>
            <td><button class="delete-btn" data-id="${item.id}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua(dataArray);
    button_xoa();
    button_luuThayDoi();
    btn_taiLaiTrang();
}

function button_sua(data) {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            const item = data[index];
            id.value = item.id;
            nha_hang_id.value = item.nha_hang_id;
            ten.value = item.ten;
            mo_ta.value = item.mo_ta;
            gia.value = item.gia;
            document.getElementById("hinh_anh-path").textContent = `Ảnh hiện tại: ${item.hinh_anh}`;
            con_hang.value = item.con_hang;
            loai_do_an.value = item.loai_do_an;
        });
    });
}

function button_luuThayDoi() {
    btnLuuThayDoi.addEventListener("click", async () => {
        event.preventDefault(); // Ngăn chặn việc gửi form đi
        const checkTrangThai = id.value;
        let formData = {};
        // trạng thái thêm
        if(checkTrangThai === null || checkTrangThai === "")
        {
            const thongTinNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());
            const idNhaHangQuanLy = thongTinNguoiDung.id_nhaHangQuanLy;
            formData = {
                // id: id.value,
                // nha_hang_id: nha_hang_id.value,
                id:await hamChung.taoID_theoBang("thuc_don"),
                nha_hang_id:idNhaHangQuanLy,
                ten: ten.value,
                mo_ta: mo_ta.value,
                gia: gia.value,
                hinh_anh: hinh_anh.value,
                con_hang: con_hang.value,
                loai_do_an: loai_do_an.value
            }
        }
        else (
            formData = {
                id: id.value,
                nha_hang_id: nha_hang_id.value,
                ten: ten.value,
                mo_ta: mo_ta.value,
                gia: gia.value,
                hinh_anh: hinh_anh.value,
                con_hang: con_hang.value,
                loai_do_an: loai_do_an.value
            }
        )
        if(checkTrangThai === null || checkTrangThai === ""){
            console.log("thêm");
            hamChung.them(formData,"thuc_don");
        }
        else{
            console.log("put");
            hamChung.sua(formData,"thuc_don");
        }





      
        console.log("Lưu dữ liệu thực đơn:", formData);
        // await hamChung.sua(formData, "thuc_don");
        // viewTbody();
    });
}

function button_xoa() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            await hamChung.xoa(id, "thuc_don");
            viewTbody();
        });
    });
}

function btn_taiLaiTrang() {
    btnTaiLaiTrang.addEventListener("click", () => {
        location.reload();
    });
}