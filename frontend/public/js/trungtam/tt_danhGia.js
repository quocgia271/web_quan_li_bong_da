document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("danh_gia");
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.id}</td>
            <td style="text-align: center;">${item.nguoi_dung_id}</td>
            <td style="text-align: center;">${item.nha_hang_id}</td>
            <td style="text-align: center;">${item.diem_so}</td>
            <td>${item.binh_luan}</td>
            <td style="text-align: center;">${item.thoi_gian}</td>
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
            document.getElementById("id_chinh").value = row.cells[0].innerText;
            document.getElementById("nguoi_dung_id").value = row.cells[1].innerText;
            document.getElementById("nha_hang_id").value = row.cells[2].innerText;
            document.getElementById("diem_so").value = row.cells[3].innerText;
            document.getElementById("binh_luan").value = row.cells[4].innerText;
            document.getElementById("thoi_gian").value = row.cells[5].innerText;
        });
    });
}

function button_xoa(data, tableBody) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa ID: ${data[index].id_chinh}?`)) {
                data.splice(index, 1);
                tableBody.deleteRow(index);
            }
        });
    });
}