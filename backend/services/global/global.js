const congAPI = 4002;
const IPv4_Address =  "192.168.1.136";
// const linkCongAPI = "http://localhost:" + congAPI + "/api/";
// ex : http://192.168.1.136:4002/api
// ex : http://localhost:4002/api

// const linkCongAPI = IPv4_Address +":"+ congAPI + "/api/";
const linkCongAPI = "http://"+IPv4_Address +":"+ congAPI + "/api/";

const urlFoderImage = 'C:/Users/vanti/Desktop/quan_ly_tran_dau/frontend/public/images/images_csdl/';

let listTables_duocChon = []; // Mảng lưu các bàn đã chọn
let nhaHangDangChon ;

const GlobalStore = {
    // Đặt giá trị vào localStorage
    setUsername(username) {
        localStorage.setItem("global_username", username);
    },

    // Lấy giá trị từ localStorage, mặc định trả về null nếu không có giá trị
    getUsername() {
        const username = localStorage.getItem("global_username");
        return username !== null ? username : null; // Nếu không có giá trị thì trả về null
    },

    getCongAPI() {
        return congAPI;
    },

    getLinkCongAPI() {
        return linkCongAPI;
    },
    getLinkFoderImage(){
        return urlFoderImage;
    }

};

const DanhSach = {

    setNhaHangDangChon(id_nhaHang) {
        nhaHangDangChon = id_nhaHang;
        localStorage.setItem("nhaHangDangChon", id_nhaHang); // Lưu vào localStorage
    },

    getNhaHangDangChon() {
        if (!nhaHangDangChon) {
            nhaHangDangChon = localStorage.getItem("nhaHangDangChon"); // Lấy từ localStorage nếu mất giá trị
        }
        return nhaHangDangChon;
    },
    setListTables_duocChon(danhSachDuocChon) {
        listTables_duocChon = danhSachDuocChon;
        localStorage.setItem("listTables_duocChon", JSON.stringify(danhSachDuocChon)); // Lưu vào localStorage
    },

    getListTables_duocChon() {
        const savedData = localStorage.getItem("listTables_duocChon");
        if (savedData) {
            listTables_duocChon = JSON.parse(savedData);
        }
        return listTables_duocChon;
    },
    resetListTables_duocChon() {
        listTables_duocChon = []; // Đặt lại mảng về rỗng
        localStorage.removeItem("listTables_duocChon"); // Xóa khỏi localStorage
    }
};

// Gắn vào window để có thể truy cập ở mọi nơi
window.GlobalStore = GlobalStore;
window.DanhSach = DanhSach;