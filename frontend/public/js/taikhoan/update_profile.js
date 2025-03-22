const tenNguoiDung = document.querySelector("input[name='name']");
const gmailNguoiDung = document.querySelector("input[name='email']");
const sdtNguoiDung = document.querySelector("input[name='number']");


document.addEventListener("DOMContentLoaded", function () {
    if (GlobalStore.getUsername() === "null") {
        console.log("Chuyển hướng đến login...");
        window.location.href = "/view/login.html";
    }
    viewThongTinNguoiDung();
    layForm();


});
async function viewThongTinNguoiDung() {
    const dataNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());
    console.log(dataNguoiDung);
    tenNguoiDung.value = dataNguoiDung.ten;
    gmailNguoiDung.value = dataNguoiDung.email;
    sdtNguoiDung.value = dataNguoiDung.sdt;
    gmailNguoiDung.readOnly = true;
}

async function layForm() {
    const dataNguoiDung = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());

    document.getElementById("updateProfileForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn form gửi đi mặc định

        let name = tenNguoiDung.value;
        let email = gmailNguoiDung.value.trim();
        let number = sdtNguoiDung.value.trim();
        let oldPass = document.querySelector("[name='old_pass']").value.trim();
        let newPass = document.querySelector("[name='new_pass']").value.trim();
        let confirmPass = document.querySelector("[name='confirm_pass']").value.trim();

        let isUpdatingInfo = (name !== dataNguoiDung.ten || number !== dataNguoiDung.sdt);
        let isUpdatingPassword = (oldPass || newPass || confirmPass);

        // Nếu có cập nhật số điện thoại, kiểm tra định dạng số điện thoại
        let numberPattern = /^[0-9]{10}$/;
        const taiKhoan = await hamChung.layThongTinTheo_ID("nguoi_dung", GlobalStore.getUsername());
        if (isUpdatingInfo && !numberPattern.test(number)) {
            alert("Số điện thoại phải có đúng 10 chữ số!");
            return;
        }

        // Kiểm tra nếu cập nhật mật khẩu
        if (isUpdatingPassword) {
            if (!oldPass || !newPass || !confirmPass) {
                alert("Vui lòng nhập đầy đủ mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu!");
                return;
            }
            if (newPass.length < 6) {
                alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
                return;
            }
            if (newPass !== confirmPass) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }

            if (taiKhoan.mat_khau !== oldPass) {
                console.log("Mật khẩu cũ:", oldPass);
                console.log("Mật khẩu cũ trong DB:", taiKhoan.mat_khau);
                alert("Mật khẩu cũ không đúng!");
                return;
            }
        }

        // Nếu không thay đổi gì cả
        if (!isUpdatingInfo && !isUpdatingPassword) {
            newPass = taiKhoan.mat_khau;
            console.log("Mật khẩu " + newPass);
            alert("Bạn chưa thay đổi thông tin gì!");

            return;
        }

        let formData = new FormData(this);
        let formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });



        newPass = taiKhoan.mat_khau;


        console.log("new_pass + " + newPass);
        console.log("Dữ liệu form gửi đi:", formObject);
        update_mk(GlobalStore.getUsername(), newPass);

        // trường hợp ko nhập mk thì mk đưa về
        update_profile(GlobalStore.getUsername(), formObject);
        DanhSach.resetListTables_duocChon();
        GlobalStore.setUsername(null);
        window.location.href = `/view/login.html`;
        return true;
    });
}


function update_mk(id, matKhau_new) {
    const data = {
        "id": id,
        "mat_khau": matKhau_new
    };
    hamChung.sua(data, "nguoi_dung");
}
function update_profile(id, formObject) {
    const data = {
        "id": id,
        "ten": formObject.name,
        "sdt": formObject.number,
        "email": formObject.email,
    };
    hamChung.sua(data, "nguoi_dung");
}
