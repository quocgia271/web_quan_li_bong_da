// document.getElementById("maKetQua").value = item.ma_ket_qua;
// document.getElementById("soBanDoi1").value = item.so_ban_doi_1;
// document.getElementById("soBanDoi2").value = item.so_ban_doi_2;
// document.getElementById("maTranDau").value = item.ma_tran_dau;
// document.getElementById("maDoiThang").value = item.ma_doi_thang;
// document.getElementById("ghiChu").value = item.ghi_chu || "";
// const maKetQua = document.getElementById("maKetQua");
const soBanDoi1 = document.getElementById("soBanDoi1");
const soBanDoi2 = document.getElementById("soBanDoi2");
const maTranDau = document.getElementById("maTranDau");
const maDoiThang = document.getElementById("maDoiThang");
const ghiChu = document.getElementById("ghiChu");
const maGiaiDau = document.getElementById("maGiaiDau");


document.addEventListener("DOMContentLoaded", async function () {


    loadDanhSachGiaiDau();
    // bàn đầu thì hiện đủ 
    const data = await hamChung.layDanhSach("ket_qua_tran_dau");
    viewTbody(data);

    maGiaiDau.addEventListener("change", function () {
        loadDanhSachTranDau(maGiaiDau.value);
    });
    maTranDau.addEventListener("change", function () {
        loadDanhSachDoiBongThamGia(maTranDau.value);
    });

    // loc_Data();


});

async function viewTbody(data) {
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_tran_dau}</td>
            <td style="text-align: center;">${item.ma_doi_thang}</td>
            <td style="text-align: center;">${item.so_ban_doi_1}</td>
            <td style="text-align: center;">${item.so_ban_doi_2}</td>
            

            <td style="text-align: center;">${item.ghi_chu || ""}</td>
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
            // maKetQua.value = item.ma_ket_qua;
            soBanDoi1.value = item.so_ban_doi_1;
            soBanDoi2.value = item.so_ban_doi_2;
            maTranDau.value = item.ma_tran_dau;
            maDoiThang.value = item.ma_doi_thang;
            ghiChu.value = item.ghi_chu || "";

        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa kết quả ${data[index].ma_tran_dau}?`)) {
                data.splice(index, 1);
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

async function loadDanhSachTranDau(maGiaiDau) {
    const selectElement = document.getElementById("maTranDau");
    selectElement.innerHTML = '<option value="">-- Chọn Trận Đấu --</option>'; // Reset danh sách
    const dataTranDau = await hamChung.layDanhSach("tran_dau");
    // console.log(dataTranDau);
    const tranDauCanTim = dataTranDau.filter(item => item.ma_giai_dau === maGiaiDau); // Nếu ma_tran_dau là chuỗi
    // console.log(tranDauCanTim);
    tranDauCanTim.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ma_tran_dau;
        option.textContent = `${item.ma_tran_dau} - ${item.ma_tran_dau}`;
        selectElement.appendChild(option);
    });
}

async function loadDanhSachDoiBongThamGia(maTranDau) {
    const selectElement = document.getElementById("maDoiThang");
    selectElement.innerHTML = '<option value="">-- Chọn Đội Thắng --</option>'; // Reset danh sách
    const dataTranDau = await hamChung.layThongTinTheo_ID("tran_dau", maTranDau);
    console.log(dataTranDau);
    if (dataTranDau) {
        const { ma_doi_1, ma_doi_2 } = dataTranDau;
        
        const option1 = new Option(`Đội ${ma_doi_1}`, ma_doi_1);
        const option2 = new Option(`Đội ${ma_doi_2}`, ma_doi_2);
    
        selectElement.appendChild(option1);
        selectElement.appendChild(option2);
    }
    //const tranDauCanTim = dataTranDau.filter(item => item.ma_giai_dau === maTranDau); // Nếu ma_tran_dau là chuỗi
    // tranDauCanTim.forEach(item => {
    //     const option = document.createElement("option");
    //     option.value = item.ma_tran_dau;
    //     option.textContent = `${item.ma_tran_dau} - ${item.ma_tran_dau}`;
    //     selectElement.appendChild(option);
    // });

}

