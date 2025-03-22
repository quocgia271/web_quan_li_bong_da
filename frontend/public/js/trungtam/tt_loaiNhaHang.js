document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("loai_nha_hang");
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.id}</td>
            <td>${item.ten_loai}</td>
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
            document.getElementById("ten_loai").value = row.cells[1].innerText;
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