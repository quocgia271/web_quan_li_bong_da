// Lưu menu đã chọn vào localStorage
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("#sidenavAccordion"); // Sidebar chính
    const storedMenu = localStorage.getItem("activeMenu"); // Lấy menu đã chọn từ localStorage

    if (storedMenu) {
        const activeMenu = document.querySelector(`#${storedMenu}`);
        if (activeMenu) {
            activeMenu.classList.add("show"); // Mở menu đã chọn
        }
    }

    // Lắng nghe sự kiện click trên các menu
    sidebar.querySelectorAll(".nav-link.collapsed").forEach(link => {
        link.addEventListener("click", function () {
            const targetId = this.getAttribute("data-bs-target").replace("#", ""); // Lấy ID menu
            localStorage.setItem("activeMenu", targetId); // Lưu vào localStorage
        });
    });
});

