document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("vai_tro");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_vai_tro}</td>
            <td style="text-align: center;">${item.ten_vai_tro}</td>
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
            document.getElementById("maVaiTro").value = item.ma_vai_tro;
            document.getElementById("tenVaiTro").value = item.ten_vai_tro;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa vai trò ${data[index].ten_vai_tro}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
