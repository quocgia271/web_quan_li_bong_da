document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {

    const data = await hamChung.layDanhSach("nha_hang");

    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ nếu có

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td style="text-align: center;">${item.id}</td>
                <td>${item.ten}</td>
                <td>${item.dia_chi}</td>
                <td>${item.sdt}</td>
                <td>${item.mo_ta}</td>
                <td style="text-align: center;"><img src="${item.hinh_anh}" alt="Hình ảnh" width="50"></td>
                <td>${item.ngay_tao}</td>
                <td>${item.loai_id}</td>
                <td>${item.so_sao}</td>
                <td>${item.noidung}</td>
                <td style="text-align: center;"><button class="edit-btn">Sửa</button></td>
                <td style="text-align: center;"><button class="delete-btn">Xóa</button></td>
            `;
        tableBody.appendChild(row);
    });

    button_sua();
    button_xoa();


}

function button_sua() {
    document.querySelectorAll(".edit-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const row = btn.closest("tr"); // Lấy hàng chứa nút được nhấn

            // Lấy dữ liệu từ hàng đó
            document.getElementById("id").value = row.cells[0].innerText;
            document.getElementById("ten").value = row.cells[1].innerText;
            document.getElementById("dia_chi").value = row.cells[2].innerText;
            document.getElementById("sdt").value = row.cells[3].innerText;
            document.getElementById("mo_ta").value = row.cells[4].innerText;
            document.getElementById("hinh_anh").value = row.cells[5].querySelector("img").src;
            document.getElementById("ngay_tao").value = row.cells[6].innerText;
            document.getElementById("loai_id").value = row.cells[7].innerText;
            document.getElementById("so_sao").value = row.cells[8].innerText;
            document.getElementById("noidung").value = row.cells[9].innerText;
        });
    });
}

function button_xoa() {
    // Thêm sự kiện cho nút Sửa và Xóa
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa ID: ${data[index].id}?`)) {
                data.splice(index, 1);
                tableBody.deleteRow(index);
            }
        });
    });
}