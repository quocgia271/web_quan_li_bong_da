document.addEventListener("DOMContentLoaded", function () {
    DanhSach.resetListTables_duocChon(); // Đặt lại mảng bàn đã chọn về rỗng
    DanhSach.setNhaHangDangChon(null); // Đặt lại nhà hàng đang chọn về rỗng
    GlobalStore.setUsername(null); // Đặt lại username về
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Ngăn chặn form submit mặc định

            // Lấy giá trị nhập vào từ người dùng
            const username = document.getElementById("tk").value.trim();
            const password = document.getElementById("mk").value.trim();

            if (username === "" || password === "") {
                alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
                return;
            }

            // Lấy danh sách người dùng từ hamChung
            var data = await hamChung.layDanhSach("nguoi_dung");


            // Kiểm tra xem username & password có khớp trong danh sách không
            var user = data.find(user => user.id === username && user.mat_khau === password);
            if (user) {
                GlobalStore.setUsername(username);
             
               
                let url = "";
                GlobalStore.setUsername(user.id);
                if (user.vai_tro == "trung_tam") {
                    url = "/view/trungtam/tt_trangchu.html";
                    alert("Đăng nhập thành công!");
                }
                else if (user.vai_tro == "quan_ly") {
                    console.log("Vai trò : " + user.vai_tro);
                    console.log(user.id);
                    
                    const thongTinNhaHang =await hamChung.layThongTinTheo_ID("nguoi_dung",user.id);
                    console.log(thongTinNhaHang);
                    console.log(thongTinNhaHang.id_nhaHangQuanLy);
                    if (thongTinNhaHang.id_nhaHangQuanLy) {
                        DanhSach.setNhaHangDangChon(thongTinNhaHang.id_nhaHangQuanLy);
                        url = "/view/quanlynhahang/ql_trangchu.html";
                    }
                    else {
                        alert("Tài khoản không có quyền quản lý nhà hàng!");
                        url = "/view/login.html";
                    }
                    //url = "/view/quanlynhahang/trangchu.html";
                }
                else if (user.vai_tro == "nguoi_dung") {
                  
                 url = "/view/menu_main/home.html";
                //  alert("Đăng nhập thành công!");
                }



                const baseURL = window.location.origin;
                window.location.href = `${baseURL}` + url;
            } else {
                console.log("Đăng nhập thất bại!");
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("mk");
    const showPasswordCheckbox = document.getElementById("showPassword");

    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener("change", function () {
            passwordInput.type = this.checked ? "text" : "password";
        });
    }
});
