document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    // const data = await hamChung.layDanhSach("nha_hang");
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.id}</td>
            <td>${item.ten}</td>
            <td>${item.dia_chi}</td>
            <td>${item.sdt}</td>
            <td>${item.email}</td>
            <td>${item.mo_ta}</td>
            <td>${item.ngay_tao}</td>
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
            document.getElementById("id").value = row.cells[0].innerText;
            document.getElementById("ten").value = row.cells[1].innerText;
            document.getElementById("dia_chi").value = row.cells[2].innerText;
            document.getElementById("sdt").value = row.cells[3].innerText;
            document.getElementById("email").value = row.cells[4].innerText;
            document.getElementById("mo_ta").value = row.cells[5].innerText;
            document.getElementById("ngay_tao").value = row.cells[6].innerText;
        });
    });
}

function button_xoa(data, tableBody) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa ID: ${data[index].id}?`)) {
                data.splice(index, 1);
                tableBody.deleteRow(index);
            }
        });
    });
}
