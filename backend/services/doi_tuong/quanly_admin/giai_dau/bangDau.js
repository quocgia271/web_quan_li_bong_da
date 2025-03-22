document.addEventListener("DOMContentLoaded", function () {
    viewTbody();
});

async function viewTbody() {
    const data = await hamChung.layDanhSach("bang_dau");
    console.log(data);
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align: center;">${item.ma_bang_dau}</td>
            <td style="text-align: center;">${item.ten_bang_dau}</td>
            <td style="text-align: center;">${item.ma_giai_dau}</td>
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
            document.getElementById("maBangDau").value = item.ma_bang_dau;
            document.getElementById("tenBangDau").value = item.ten_bang_dau;
            document.getElementById("maGiaiDau").value = item.ma_giai_dau;
        });
    });
}

function button_xoa(data) {
    document.querySelectorAll(".delete-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm(`Bạn có chắc chắn muốn xóa bảng đấu ${data[index].ten_bang_dau}?`)) {
                data.splice(index, 1);
                viewTbody();
            }
        });
    });
}
