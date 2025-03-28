const hamChung = {

    async layDanhSach(table) {
        return await layDanhSach(table);
    },
    async layThongTinTheo_ID(table, id) {
        return await layThongTinTheo_ID(table, id);
    },

    taoID_theoBang(table) {
        return taoID_theoBang(table);
    },

    them(data, table_name) {
        return them(data, table_name)
    },
    sua(data, table_name) {
        return sua(data, table_name)
    },
    xoa(data, table_name) {
        return xoa(data, table_name)
    },
    getImage(public_id) {
        return getImage(public_id)
    },

    async uploadImage(file) {
        return uploadImage(file);
    },
    // uploadImage(imagePath) {
    //     return uploadImage(imagePath);
    // },
    // deleteImage(public_id) {
    //     return deleteImage(public_id);
    // },



};

async function layDanhSach(table) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + table);
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi lấy danh sách ${table}:`, error);
        return [];
    }
}

// Hàm lấy chi tiết theo ID
async function layThongTinTheo_ID(table, id) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + table + "/" + id);
        return await response.json();
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin ${table} với ID ${id}:`, error);
        return null;
    }
}

async function taoID_theoBang(table) {
    try {
        const response = await fetch(GlobalStore.getLinkCongAPI() + table);
        const danhSach = await response.json();

        // Chuyển "don_dat_ban" -> "ddb_"
        const prefix = table.split("_").map(word => word.charAt(0)).join("") + "_";

        if (!Array.isArray(danhSach) || danhSach.length === 0) {
            return `${prefix}0001`; // Nếu bảng rỗng, tạo ID đầu tiên
        }

        // Tìm ID lớn nhất trong danh sách
        const lastID = danhSach
            .map(item => item?.id) // Dùng optional chaining để tránh lỗi
            .filter(id => typeof id === "string" && id.startsWith(prefix)) // Kiểm tra kiểu dữ liệu
            .sort()
            .pop();


        if (!lastID) {
            return `${prefix}0001`; // Nếu không tìm thấy ID hợp lệ
        }

        // Lấy số cuối cùng, tăng lên 1
        const numberPart = parseInt(lastID.split("_")[1]) || 0;
        const newID = `${prefix}${(numberPart + 1).toString().padStart(4, "0")}`;

        return newID;
    } catch (error) {
        console.error(`Lỗi khi lấy danh sách ${table}:`, error);
        return `${table.split("_").map(w => w.charAt(0)).join("")}_0001`; // ID mặc định nếu lỗi
    }
}


function them(data, table_name) {

    const primaryKeys = {
        "tai_khoan": ["tai_khoan"],         // Khóa chính là tài khoản
        "vai_tro": ["ma_vai_tro"],           // Khóa chính là mã vai trò
        "nguoi_dung": ["ma_nguoi_dung"],      // Giữ mã người dùng thay vì tài khoản vì có thể có thông tin bổ sung
        "giai_dau": ["ma_giai_dau"],          // Khóa chính là mã giải đấu
        "doi_bong": ["ma_doi_bong"],          // Khóa chính là mã đội bóng
        "vi_tri_cau_thu": ["ma_vi_tri"],      // Đổi tên từ "vi_tri" thành "vi_tri_cau_thu" để khớp với CSDL
        "cau_thu": ["ma_cau_thu"],            // Khóa chính là mã cầu thủ
        "cau_thu_giai_dau": ["ma_cau_thu", "ma_giai_dau"], // Khóa chính là (ma_cau_thu, ma_giai_dau)
        "vong_dau": ["ma_vong_dau"],         // Thêm bảng vòng đấu
        "tran_dau": ["ma_tran_dau"],          // Khóa chính là mã trận đấu
        "ket_qua_tran_dau": ["ma_tran_dau"],  // Sử dụng ma_tran_dau làm khóa chính thay vì tạo ma_ket_qua riêng
        "trong_tai": ["ma_trong_tai"],        // Bảng trọng tài, khóa chính là mã trọng tài
        "bang_dau": ["ma_bang_dau"],          // Thêm bảng bảng đấu
        "bang_xep_hang_vong_loai": ["ma_doi_bong", "ma_bang_dau"] // Khóa chính là (ma_doi_bong, ma_bang_dau)

    }[table_name];

    if (!data) {
        console.error("Dữ liệu không hợp lệ!");
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    const url = `${GlobalStore.getLinkCongAPI()}${table_name}`;

    // console.log("Gửi POST request tới:", url);
    // console.log("Dữ liệu gửi đi:", data);

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(async response => {
            const text = await response.text();
            if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) {
                //      console.log("Phản hồi từ server:", text);
                return { message: text };
            }
            return JSON.parse(text);
        })
        .then(resData => {
            //      alert(resData.message || "Thêm dữ liệu thành công.");
            // table();
        })
        .catch(error => {
            console.error("Có lỗi xảy ra khi thêm:", error.message);
            alert(`Lỗi: ${error.message}`);
        });
}
function sua(data, table_name) {

    const primaryKeys = {
        "tai_khoan": ["tai_khoan"],         // Khóa chính là tài khoản
        "vai_tro": ["ma_vai_tro"],           // Khóa chính là mã vai trò
        "nguoi_dung": ["ma_nguoi_dung"],      // Giữ mã người dùng thay vì tài khoản vì có thể có thông tin bổ sung
        "giai_dau": ["ma_giai_dau"],          // Khóa chính là mã giải đấu
        "doi_bong": ["ma_doi_bong"],          // Khóa chính là mã đội bóng
        "vi_tri_cau_thu": ["ma_vi_tri"],      // Đổi tên từ "vi_tri" thành "vi_tri_cau_thu" để khớp với CSDL
        "cau_thu": ["ma_cau_thu"],            // Khóa chính là mã cầu thủ
        "cau_thu_giai_dau": ["ma_cau_thu", "ma_giai_dau"], // Khóa chính là (ma_cau_thu, ma_giai_dau)
        "vong_dau": ["ma_vong_dau"],         // Thêm bảng vòng đấu
        "tran_dau": ["ma_tran_dau"],          // Khóa chính là mã trận đấu
        "ket_qua_tran_dau": ["ma_tran_dau"],  // Sử dụng ma_tran_dau làm khóa chính thay vì tạo ma_ket_qua riêng
        "trong_tai": ["ma_trong_tai"],        // Bảng trọng tài, khóa chính là mã trọng tài
        "bang_dau": ["ma_bang_dau"],          // Thêm bảng bảng đấu
        "bang_xep_hang_vong_loai": ["ma_doi_bong", "ma_bang_dau"] // Khóa chính là (ma_doi_bong, ma_bang_dau)

    }[table_name];

    if (!data) {
        console.error("Dữ liệu không hợp lệ!");
        alert("Dữ liệu không hợp lệ!");
        return;
    }
    if (!primaryKeys) {
        console.error(`Bảng ${table_name} không hợp lệ.`);
        alert("Bảng không hợp lệ!");
        return;
    }

    const keyValues = primaryKeys.map(key => data[key]);
    if (keyValues.some(value => value === undefined)) {
        console.error("Thiếu thông tin khóa chính!", data);
        alert("Thiếu thông tin khóa chính!");
        return;
    }

    const idPath = keyValues.join("/");
    const url = `${GlobalStore.getLinkCongAPI()}${table_name}/${idPath}`;

    // console.log("Gửi PUT request tới:", url);
    // console.log("Dữ liệu gửi đi:", data);

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(async response => {
            const text = await response.text();

            // Kiểm tra nếu phản hồi trống hoặc không phải JSON
            if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) {
                //     console.log("Phản hồi từ server:", text);
                return { message: text }; // Trả về một object chứa message
            }

            return JSON.parse(text); // Nếu JSON hợp lệ, parse bình thường
        })
        .then(resData => {
            alert(resData.message || "Sửa dữ liệu thành công.");
            // table();
        })
        .catch(error => {
            console.error("Có lỗi xảy ra khi sửa:", error.message);
            alert(`Lỗi: ${error.message}`);
        });
}
async function xoa(keys, table_name) {
    const primaryKeysMap = {
        "tai_khoan": ["tai_khoan"],
        "vai_tro": ["ma_vai_tro"],
        "nguoi_dung": ["ma_nguoi_dung"],
        "giai_dau": ["ma_giai_dau"],
        "doi_bong": ["ma_doi_bong"],
        "vi_tri_cau_thu": ["ma_vi_tri"],
        "cau_thu": ["ma_cau_thu"],
        "cau_thu_giai_dau": ["ma_cau_thu", "ma_giai_dau"],
        "vong_dau": ["ma_vong_dau"],
        "tran_dau": ["ma_tran_dau"],
        "ket_qua_tran_dau": ["ma_tran_dau"],
        "trong_tai": ["ma_trong_tai"],
        "bang_dau": ["ma_bang_dau"],
        "bang_xep_hang_vong_loai": ["ma_doi_bong", "ma_bang_dau"]
    };

    // Kiểm tra xem bảng có hợp lệ không
    const primaryKeys = primaryKeysMap[table_name];
    if (!primaryKeys) {
        console.error(`Bảng ${table_name} không hợp lệ.`);
        alert("Bảng không hợp lệ!");
        return;
    }

    // Kiểm tra `keys` có hợp lệ không
    if (!keys || typeof keys !== "object") {
        console.error("Thiếu thông tin khóa chính để xóa!", keys);
        alert("Thiếu thông tin khóa chính để xóa!");
        return;
    }

    // Lấy danh sách giá trị của khóa chính
    const keyValues = primaryKeys.map(key => keys[key]);

    // Kiểm tra xem tất cả giá trị của khóa chính đã có chưa
    if (keyValues.some(value => value === undefined || value === null)) {
        console.error("Thiếu thông tin khóa chính!", keys);
        alert("Thiếu thông tin khóa chính!");
        return;
    }

    // Tạo đường dẫn DELETE từ khóa chính
    const idPath = keyValues.join("/");
    const url = `${GlobalStore.getLinkCongAPI()}${table_name}/${idPath}`;

    console.log("Gửi DELETE request tới:", url);

    try {
        const response = await fetch(url, { method: 'DELETE' });

        if (!response.ok) {
            console.error(`Lỗi HTTP ${response.status}: ${response.statusText}`);
            alert(`Lỗi xóa: ${response.statusText}`);
            return;
        }

        const text = await response.text();
        const resData = text.trim().startsWith("{") || text.trim().startsWith("[") ? JSON.parse(text) : { message: text };

        alert(resData.message || "Xóa dữ liệu thành công.");
    } catch (error) {
        console.error("Có lỗi xảy ra khi xóa:", error.message);
        alert(`Lỗi: ${error.message}`);
    }
}

/** 🔵 Hàm lấy ảnh từ Cloudinary theo `public_id` */
async function getImage(public_id) {
    const link = `imageCloudinary/${public_id}`;
    const url = `${GlobalStore.getLinkCongAPI()}${link}`;

    console.log("Gửi GET request tới:", url);

    try {
        const response = await fetch(url, { method: "GET" });

        const result = await response.json();
        // if (!response.ok) throw new Error(result.error || "Get image failed");

        // console.log("✅ Lấy ảnh thành công:", result);
        return result;
    } catch (error) {
        // console.error("❌ Lỗi lấy ảnh:", error.message);
        return null;
    }
}
async function uploadImage(filePath) {
    try {
        //'http://localhost:4002/api/imageCloudinary'
        const link = "imageCloudinary";
        const url = `${GlobalStore.getLinkCongAPI()}${link}`;
        // const url = `${GlobalStore.getLinkCongAPI()}${table_name}/${idPath}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imagePath: filePath })
        });

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
    return null;
}



// /** 🟡 Hàm cập nhật ảnh */
// async function updateImage(public_id, newImagePath) {
//     const link = "updateImage";
//     const url = `${GlobalStore.getLinkCongAPI()}${link}`;
//     const data = { public_id, newImagePath };

//     console.log("Gửi PUT request tới:", url);
//     console.log("Dữ liệu gửi đi:", data);

//     try {
//         const response = await fetch(url, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         if (!response.ok) throw new Error(result.error || "Update failed");

//         console.log("✅ Cập nhật ảnh thành công:", result);
//         return result;
//     } catch (error) {
//         console.error("❌ Lỗi cập nhật ảnh:", error.message);
//         return null;
//     }
// }

// /** 🔴 Hàm xóa ảnh */
// async function deleteImage(public_id) {
//     const link = "deleteImage";
//     const url = `${GlobalStore.getLinkCongAPI()}${link}`;
//     const data = { public_id };

//     console.log("Gửi DELETE request tới:", url);
//     console.log("Dữ liệu gửi đi:", data);

//     try {
//         const response = await fetch(url, {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         if (!response.ok) throw new Error(result.error || "Delete failed");

//         console.log("✅ Xóa ảnh thành công:", result);
//         return result;
//     } catch (error) {
//         console.error("❌ Lỗi xóa ảnh:", error.message);
//         return null;
//     }
// }


// Gắn vào window để có thể truy cập ở mọi nơi
window.hamChung = hamChung;
