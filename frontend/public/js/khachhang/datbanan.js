

/// trường hợp chưa đăng nhấp





let btnViewTables = document.getElementById("view-selected-tables");
// let id_nhaHang = "NH001";
const params = new URLSearchParams(window.location.search);
const id_nhaHang = params.get("id_nhaHang");
const name_nhaHang = document.getElementById("ten_nha_hang");

const listTables_duocChon = []; // Mảng lưu các bàn đã chọn

console.log("id_nhaHang = " + id_nhaHang);
document.addEventListener("DOMContentLoaded", function () {
    // console.log("tai khoan " + GlobalStore.getUsername());
    // // console.log("Giá trị getUsername():", GlobalStore.getUsername());
    // // console.log("Kiểu dữ liệu getUsername():", typeof GlobalStore.getUsername());

    if (GlobalStore.getUsername() === "null") {
        console.log("Chuyển hướng đến login...");
        window.location.href = "/view/login.html";
    }



    const selectedTables = DanhSach.getListTables_duocChon();
    const nhaHangDangChon = DanhSach.getNhaHangDangChon();

    console.log("Danh sách bàn đã chọn:", selectedTables);
    console.log("Nhà hàng đang chọn:", nhaHangDangChon);
    console.log("id_nhaHang = " + id_nhaHang);
    console.log(nhaHangDangChon === id_nhaHang);

    // đồng ý chọn bàn
    btnViewTables.addEventListener("click", function () {
        DanhSach.setNhaHangDangChon(id_nhaHang);
        window.location.href = `/view/khachhang/thongtindatban.html`;
    });

    viewtable_banAn(id_nhaHang, selectedTables); // Truyền danh sách bàn đã chọn
});

async function viewtable_banAn(id_nhaHang, selectedTables) {
    try {
        let data = await hamChung.layDanhSachBanAn_theoNhaHang(id_nhaHang);
        const nhaHang = await hamChung.layThongTinTheo_ID("nha_hang", id_nhaHang);

        name_nhaHang.textContent = nhaHang.ten;
        const tableBody = document.querySelector("#table_banan tbody");
        tableBody.innerHTML = ""; // Xóa dữ liệu cũ

        // Render bảng bàn ăn
        data.forEach(async (table) => {
            const row = document.createElement("tr");
            let statusText, statusClass, bookedInfo, action;


            if (table.trang_thai === "trong") {
                statusText = "✅ Còn trống";
                statusClass = "available";
                bookedInfo = "---";
                action = `<input type="checkbox" class="table-checkbox" data-id="${table.id}" 
                                                                        data-name="${table.so_ban}" 
                                                                        data-succhua="${table.suc_chua}">`;
            } else if (table.trang_thai === "da_dat") {
                statusText = `<i class="fas fa-ban"></i>  Đã đặt`;
                statusClass = "booked";
                // bookedInfo = table.trang_thai;

                // console.log("ID " + table.id);
                // const thoiGian = await hamChung.layThongTin_donDatBan_theoIDBan(table.id,'cho_xu_ly') ;


                // console.log("table_info: ", thoiGian);
                //    console.log(`Đã trôi qua: ${tinhSoPhutTrungGian(data.thoi_gian_tao_don)} phút`);
                const data = await hamChung.layThongTin_donDatBan_theoIDBan(table.id, 'cho_xu_ly');
                if (data != null)
                    bookedInfo = `${tinhSoPhutTrungGian(data.thoi_gian_tao_don)} phút`;
                else bookedInfo = "Không rõ";
                action = "❌";
            }
            else {
                statusText = "❌ Có Khách";
                statusClass = "booked";
                // bookedInfo = table.trang_thai;
                //   bookedInfo = "xử lý thời gian";
                const data = await hamChung.layThongTin_donDatBan_theoIDBan(table.id, 'hoan_thanh');
                if (data != null)
                    bookedInfo = `${tinhSoPhutTrungGian(data.thoi_gian_tao_don)} phút`;
                else bookedInfo = "Không rõ";
                action = "❌";
            }

            row.innerHTML = `
                <td>${table.so_ban}+ ${table.id}</td>
                <td>${table.suc_chua}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${bookedInfo}</td>
                <td>${action}</td>
            `;

            tableBody.appendChild(row);
        });

        // ✅ Đánh dấu checkbox ngay sau khi render xong
        // nếu chưa chuyển nhà hàng thì cho nó lấy giá trị cũ
        // ✅ Cập nhật danh sách bàn đã chọn
        ///////////////////   phài kiểm tra 1 số trường hợp nữa =>> ở đây chưa xử lý
        if (selectedTables.length > 0) {
            listTables_duocChon.splice(0, listTables_duocChon.length, ...selectedTables);
            console.log("Cập nhật danh sách bàn đã chọn:", listTables_duocChon);
        }
        if (selectedTables.length > 0) {
            document.querySelectorAll(".table-checkbox").forEach((checkbox) => {
                const tableId = checkbox.getAttribute("data-id");


                if (selectedTables.some(t => t.id === tableId)) {
                    checkbox.checked = true;
                }
            });
        }
        console.log("listTables_duocChon:", selectedTables);
        // Xử lý chọn/bỏ chọn bàn
        document.querySelectorAll(".table-checkbox").forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                const tableId = this.getAttribute("data-id");
                // console.log("tableId = " + tableId);

                const tableName = this.getAttribute("data-name");
                const tableSoCho = this.getAttribute("data-succhua");


                // console.log("ID " + tableId);
                // console.log(hamChung.layThongTin_donDatBan_theoIDBan(tableId));

                if (this.checked) {
                    listTables_duocChon.push({ id: tableId, name: tableName, socho: tableSoCho });
                } else {
                    const index = listTables_duocChon.findIndex((t) => t.id === tableId);
                    if (index !== -1) listTables_duocChon.splice(index, 1);
                }
                console.log("Danh sách bàn đã chọn:", listTables_duocChon);
                DanhSach.setListTables_duocChon(listTables_duocChon);
            });
        });

    }
    catch (error) {
        console.error("Lỗi khi lấy dữ liệu bàn:", error);
    }
}
function tinhSoPhutTrungGian(thoiGianTruoc) {
    const thoiDiemTruoc = new Date(thoiGianTruoc); // Chuyển đổi chuỗi thành đối tượng Date
    const thoiDiemHienTai = new Date(); // Lấy thời gian hiện tại

    const khoangThoiGianMs = thoiDiemHienTai - thoiDiemTruoc; // Chênh lệch tính bằng milliseconds
    const soPhut = Math.floor(khoangThoiGianMs / (1000 * 60)); // Chuyển đổi sang phút

    return soPhut;
}
