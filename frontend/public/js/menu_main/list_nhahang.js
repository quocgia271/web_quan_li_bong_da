function viewDetail(id) {
    window.location.href = `/view/khachhang/home_nhahang.html?id_nhaHang=${id}`;
}

document.addEventListener("DOMContentLoaded", function () {
    btnLoaiNhaHang();
});

async function btnLoaiNhaHang() {
    const danhSachNhaHang = await hamChung.layDanhSach("nha_hang");
    const categories = document.querySelectorAll(".category .box");
    const listContainer = document.getElementById("list_nha_hang");
    const title = document.getElementById("loai_nha_hang");
    const paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    listContainer.after(paginationContainer);

    const itemsPerPage = 9;
    let currentPage = 1;
    let filteredList = [...danhSachNhaHang];

    function renderList(page = 1) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = filteredList.slice(start, end);

        listContainer.innerHTML = itemsToShow.length
            ? itemsToShow.map(nh => `
                <form class="box" data-id="${nh.id}" data-ten="${nh.ten}" data-img="${nh.hinh_anh}">
                    <button class="fas fa-eye view-btn" type="button"></button>
                    <button class="fas fa-shopping-cart cart-btn" type="button"></button>
                     <img src="${nh.hinh_anh}" alt="${nh.ten}" 
                            onerror="this.onerror=null; this.src='/public/images/images_csdl/default_image/restaurant_image.png';">

                    <div class="name">${nh.ten}</div>
                </form>
            `).join("")
            : "<p>Không có nhà hàng nào.</p>";

        addEventListeners();
        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredList.length / itemsPerPage);
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.innerText = i;
            button.classList.add("page-btn");
            if (i === currentPage) button.classList.add("active");
            button.addEventListener("click", () => renderList(i));
            paginationContainer.appendChild(button);
        }
    }

    function addEventListeners() {
        document.querySelectorAll(".view-btn").forEach(button => {
            button.addEventListener("click", function () {
                const parent = this.closest(".box");
                const id = parent.dataset.id;


                // if (DanhSach.getNhaHangDangChon() != id_nhaHang) {
                //     DanhSach.getNhaHangDangChon = id_nhaHang;
                //     DanhSach.resetListTables_duocChon();
                // }


                viewDetail(id);
            });
        });

        document.querySelectorAll(".cart-btn").forEach(button => {
            button.addEventListener("click", function () {
                const parent = this.closest(".box");
                const nhaHang = {
                    id: parent.dataset.id,
                    ten: parent.dataset.ten,
                    hinh_anh: parent.dataset.img
                };
                themVaoGioHang(nhaHang);
            });
        });
    }

    function themVaoGioHang(nhaHang) {
        console.log(nhaHang.id);
        window.location.href = `/view/khachhang/datbanan.html?id_nhaHang=${nhaHang.id}`;
    }

    categories.forEach(category => {
        category.addEventListener("click", function (event) {
            event.preventDefault();
            const loaiId = this.id;
            const loaiTen = this.querySelector("h3").innerText;
            title.innerText = loaiTen.toUpperCase();
            filteredList = danhSachNhaHang.filter(nh => nh.loai_id === loaiId);
            renderList(1);
        });
    });

    renderList();
}