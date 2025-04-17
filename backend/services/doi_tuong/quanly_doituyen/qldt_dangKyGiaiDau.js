const btnLuuThayDoi = document.getElementById("button_luu");
const btnTaiLaiTrang = document.getElementById("button_taiLaiTrang");

document.addEventListener("DOMContentLoaded", function () {
    console.log("Đã vào trang qldt_dangKyGiaiDau");
    console.log(DoiTuyen.getDoiTuyen_dangChon());
    console.log(GlobalStore.getUsername());
    viewTbody();
    // Gán sự kiện cho nút
    // btnLuuThayDoi.addEventListener("click", handleLuuThayDoi);
    // btnTaiLaiTrang.addEventListener("click", handleTaiLaiTrang);
});

// Hiển thị danh sách giải đấu
async function viewTbody() {
    // const giaiDauThamGia = await tim_giaiDau_doiTuyen_thamGia(DoiTuyen.getDoiTuyen_dangChon());
    // console.log(giaiDauThamGia); // là 1 object

    const data = await hamChung.layDanhSach("giai_dau"); // Lấy danh sách giải đấu
    // tìm danh sách giải đấu mà đội tuyển đó tham gia 
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_giai_dau}</td>
            <td style="text-align: center;">${item.ten_giai_dau}</td>
            <td style="text-align: center;">${item.ten_to_chuc}</td>
            <td style="text-align: center;">${item.ngay_bat_dau}</td>
            <td style="text-align: center;">${item.ngay_ket_thuc}</td>
            <td style="text-align: center;">${item.gioi_tinh}</td>
            <td style="text-align: center;">${item.mo_ta || ""}</td>
            <td style="text-align: center;"><button class="sign_up-btn btn btn-warning btn-sm">Đăng ký</button></td>
            
        `;
        tableBody.appendChild(row);
    });

    button_dangKy(data);
 // button_xoa(data);


}


// Hàm xử lý tải lại trang
function handleTaiLaiTrang(event) {
    event.preventDefault();
    location.reload(); // Bỏ comment dòng này nếu muốn tải lại trang
}


// // Xử lý nút "Sửa"
// function button_dangKy(data) {
//     document.querySelectorAll(".sign_up-btn").forEach((btn, index) => {
//         btn.addEventListener("click", () => {
//             const item = data[index];
          
//             console.log(item.ma_giai_dau);



            
       
//         });
//     });
// }
function button_dangKy(data) {
    document.querySelectorAll(".sign_up-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const item = data[index];
            
            // Hiển thị thông tin vào modal
            document.getElementById("thongTinGiaiDau").innerHTML = `
                <p><strong>Mã Giải Đấu:</strong> ${item.ma_giai_dau}</p>
                <p><strong>Tên Giải Đấu:</strong> ${item.ten_giai_dau}</p>
                <p><strong>Tên Tổ Chức:</strong> ${item.ten_to_chuc}</p>
                <p><strong>Ngày Bắt Đầu:</strong> ${item.ngay_bat_dau}</p>
                <p><strong>Ngày Kết Thúc:</strong> ${item.ngay_ket_thuc}</p>
                <p><strong>Giới Tính:</strong> ${item.gioi_tinh}</p>
                <p><strong>Mô Tả:</strong> ${item.mo_ta || ""}</p>
            `;

            // Lưu tạm dữ liệu giải đấu nếu cần xử lý xác nhận
            window.giaiDauDangChon = item;

            // Hiển thị modal
            document.getElementById("modalDangKy").style.display = "flex";
        });
    });

    // Đóng modal
    document.getElementById("closeModal").onclick = () => {
        document.getElementById("modalDangKy").style.display = "none";
    };

    document.getElementById("huyDangKy").onclick = () => {
        document.getElementById("modalDangKy").style.display = "none";
    };

    // Xác nhận đăng ký
    document.getElementById("xacNhanDangKy").onclick = async () => {
        const selected = window.giaiDauDangChon;
        console.log("Đăng ký giải:", selected);

        // TODO: Gọi API xử lý đăng ký ở đây
        // await dangKyGiaiDau(selected);

        alert("Đăng ký thành công!");
        document.getElementById("modalDangKy").style.display = "none";
    };
}
