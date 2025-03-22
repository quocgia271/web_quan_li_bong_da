
async function layDanhSach(table) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + table);
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi lấy danh sách ${table}:`, error);
        return [];
    }
}

// Hàm lấy chi tiết theo ID
async function layThongTinTheoID(table, id) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + `${table}/${id}`);
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin ${table} với ID ${id}:`, error);
        return null;
    }
}
// Hàm lấy chi tiết theo ID
async function themThongTinTheoID(table, id) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + `${table}/${id}`);
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin ${table} với ID ${id}:`, error);
        return null;
    }
}



document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
    document.getElementById("button_luu").addEventListener("click", button_luu);
});

async function viewTbody() {
    const data = await layDanhSach("nguoi_dung");
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_nguoi_dung}</td>
            <td>${item.tai_khoan}</td>
            <td>${item.email}</td>
            <td>${item.so_dien_thoai}</td>
            <td>${item.ma_vai_tro}</td>
            <td>${item.ngay_tao}</td>
            <td>${item.so_nam_kinh_nghiem}</td>
          
            <td style="text-align: center;"><button class="edit-btn">Sửa</button></td>
            <td style="text-align: center;"><button class="delete-btn">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    button_sua();
    button_xoa(data, tableBody);
}

function button_sua() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const row = btn.closest("tr");
            document.getElementById("ma_nguoi_dung").value = row.cells[0].innerText;
            document.getElementById("tai_khoan").value = row.cells[1].innerText;
            document.getElementById("email").value = row.cells[2].innerText;
            document.getElementById("so_dien_thoai").value = row.cells[3].innerText;
            document.getElementById("ma_vai_tro").value = row.cells[4].innerText;
            // document.getElementById("ngay_tao").value = row.cells[5].innerText;
            document.getElementById("so_nam_kinh_nghiem").value = row.cells[6].innerText;
        });
    });
}


function button_xoa(data, tableBody) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", async () => {
            const userId = data[index].ma_nguoi_dung;
            if (confirm(`Bạn có chắc chắn muốn xóa ID: ${userId}?`)) {
                try {
                    const response = await fetch(`http://localhost:4002/api/nguoi_dung/${userId}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        data.splice(index, 1);
                        tableBody.deleteRow(index);
                        alert("Xóa thành công!");
                    } else {
                        alert("Xóa thất bại!");
                    }
                } catch (error) {
                    console.error("Lỗi khi xóa:", error);
                    alert("Đã xảy ra lỗi khi xóa!");
                }
            }
        });
    });
}

function button_sua() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const row = btn.closest("tr");
            document.getElementById("ma_nguoi_dung").value = row.cells[0].innerText;
            document.getElementById("tai_khoan").value = row.cells[1].innerText;
            document.getElementById("email").value = row.cells[2].innerText;
            document.getElementById("so_dien_thoai").value = row.cells[3].innerText;
            document.getElementById("ma_vai_tro").value = row.cells[4].innerText;
            document.getElementById("ngay_tao").value = row.cells[5].innerText;
            document.getElementById("so_nam_kinh_nghiem").value = row.cells[6].innerText;
        });
    });
}