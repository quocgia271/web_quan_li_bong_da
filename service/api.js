// còn cấu hình cho máy tính cùng mạng có thể cùng truy cập
// levantien123@
//J#P2?@eXnB$X*AJ
const express = require("express");
const mysql = require("mysql2");    // kết nối trực tiếp với mysql
const cors = require("cors");   // cho phép các tài nguyên được tải từ một tên miền khác với tên miền mà trang web đang chạy
// cấu hình upload ảnh
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;   // cấu hình cloudinary// hình như cho nó update
// const dotenv = require('dotenv');            // cấu hình biến môi trường
// const fs = require('fs');     
// const upload = multer({ dest: 'uploads/' }); // Lưu file tạm trước khi upload lên Cloudinary

// đọc file
// const path = require('path'); // Import path module  


//////// 
const app = express();       // tạo 1 ứng dụng express
const port = 4002;           // api chạy trên cổng

// dotenv.config();        // cấu hình biến môi trường 
// Cấu hình Cloudinary
// cloudinary.config({
//     cloud_name: 'dyilzwziv',          // tên của dự án trên cloudinary
//     api_key: '215441275658421',
//     api_secret: 'pMiC5-j_zWwvmOlkgohQ62cyQsY'
// });
// const cloudName = cloudinary.config().cloud_name;     // lấy tên cloud
// cái là là đường dẫn ảnh theo cái id á

// Sử dụng CORS cho tất cả các nguồn
app.use(cors());

// Middleware để phân tích cú pháp JSON
app.use(express.json());
// cd "C:\Users\vanti\Desktop\5_2\6A _ NMCN Phần Mềm_ Châu Văn Vân\DO_AN\quan_ly_tran_dau\service"

// Kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quan_ly_giai_dau_new",
});

// Kiểm tra kết nối
db.connect((err) => {
    if (err) {
        console.error("Không thể kết nối cơ sở dữ liệu:", err);
        return;
    }
    console.log("Kết nối cơ sở dữ liệu thành công!");
});



// Danh sách bảng và khóa chính tương ứng
const tables = {
    "tai_khoan": ["tai_khoan"],         // Khóa chính là tài khoản
    "nguoi_dung": ["ma_nguoi_dung"],      // Giữ mã người dùng thay vì tài khoản vì có thể có thông tin bổ sung
    "vai_tro": ["ma_vai_tro"],           // Khóa chính là mã vai trò
    "giai_dau": ["ma_giai_dau"],          // Khóa chính là mã giải đấu
    "doi_bong": ["ma_doi_bong"],          // Khóa chính là mã đội bóng
    "vi_tri_cau_thu": ["ma_vi_tri"],      // Đổi tên từ "vi_tri" thành "vi_tri_cau_thu" để khớp với CSDL
    "cau_thu": ["ma_cau_thu"],            // Khóa chính là mã cầu thủ
    "cau_thu_giai_dau": ["ma_cau_thu", "ma_giai_dau"], // Khóa chính là (ma_cau_thu, ma_giai_dau)
    "doi_bong_giai_dau": ["ma_doi_bong", "ma_giai_dau"], //// newwwww
    "trong_tai": ["ma_trong_tai"],        // Bảng trọng tài, khóa chính là mã trọng tài

    "vong_dau": ["ma_vong_dau"],         // Thêm bảng vòng đấu
    "tran_dau": ["ma_tran_dau"],          // Khóa chính là mã trận đấu
    "ket_qua_tran_dau": ["ma_tran_dau"],  // Sử dụng ma_tran_dau làm khóa chính thay vì tạo ma_ket_qua riêng
    "bang_dau": ["ma_bang_dau"],          // Thêm bảng bảng đấu
    // "bang_xep_hang_vong_loai": ["ma_doi_bong", "ma_bang_dau"], // Khóa chính là (ma_doi_bong, ma_bang_dau)
    "dang_ky_tham_gia_giai": ["ma_giai_dau", "ma_doi_bong"],         // Thêm bảng vòng đấu
    "loai_trong_tai": ["ma_loai_trong_tai"],
    "trong_tai_tran_dau": ["ma_tran_dau", "ma_trong_tai"],
    "san_van_dong": ["ma_san"],
};



Object.entries(tables).forEach(([table, keys]) => {
    // GET - Lấy tất cả dữ liệu
    const moment = require("moment");

    function convertToYYYYMMDD(isoString) {
        if (typeof isoString === "string" && !isNaN(Date.parse(isoString))) {
            return new Date(isoString).toISOString().split("T")[0]; // YYYY-MM-DD
        }
        return isoString; // Nếu không phải ngày hợp lệ, giữ nguyên
    }

    function convertToMySQLDate(dateString) {
        if (typeof dateString === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString; // Nếu đã là YYYY-MM-DD thì giữ nguyên
        }
        if (typeof dateString === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(dateString)) {
            return dateString.split("T")[0]; // Cắt bỏ phần giờ để lưu vào MySQL
        }
        return dateString; // Nếu không hợp lệ, giữ nguyên
    }
    app.get("/api", (req, res) => {
        const apiList = Object.entries(tables).map(([table, columns]) => {
            const idParams = columns.map((_, i) => `id${i + 1}`).join(":");
            return {
                tableName: table,
                endpoints: {
                    getAll: { path: `/api/${table}`, httpType: "GET" },
                    getOne: { path: `/api/${table}/:${idParams}`, httpType: "GET" },
                    create: { path: `/api/${table}`, httpType: "POST" },
                    update: { path: `/api/${table}/:${idParams}`, httpType: "PUT" },
                    delete: { path: `/api/${table}/:${idParams}`, httpType: "DELETE" }
                }
            };
        });

        apiList.push(
            {
                name: "imageCloudinary",
                endpoints: {
                    uploadImage: { path: "/api/imageCloudinary", httpType: "POST" },
                    getImage: { path: "/api/imageCloudinary/:public_id", httpType: "GET" },
                    updateImage: { path: "/api/imageCloudinary/:public_id", httpType: "PUT" },
                    deleteImage: { path: "/api/imageCloudinary/:public_id", httpType: "DELETE" }
                }
            }
        );

        res.json(apiList);
    });

    app.get("/api", (req, res) => {
        const apiList = Object.entries(tables).map(([table, columns]) => {
            const idParams = columns.map((_, i) => `id${i + 1}`).join(":");
            return {
                getAll: `/api/${table}`,
                getOne: `/api/${table}/:${idParams}`,
                create: `/api/${table}`,
                update: `/api/${table}/:${idParams}`,
                delete: `/api/${table}/:${idParams}`,
            };
        });

        apiList.push(
            { uploadImage: "/api/imageCloudinary" },
            { getImage: "/api/imageCloudinary/:public_id" },
            { updateImage: "/api/imageCloudinary/:public_id" },
            { deleteImage: "/api/imageCloudinary/:public_id" }
        );

        res.json(apiList);
    });

    /// nếu ko xử lý ngaỳ thì nó trả về dạng :  :::::   "ngay_tao": "2025-03-22T13:53:18.000Z"
    app.get(`/api/${table}`, (req, res) => {
        db.query(`SELECT * FROM ??`, [table], (err, results) => {
            if (err) return res.status(500).send(`Lỗi khi lấy dữ liệu từ ${table}`);

            // Kiểm tra và xử lý các trường ngày tháng
            const updatedResults = results.map(row => {
                Object.keys(row).forEach(key => {
                    let value = row[key];

                    // Nếu là object (có thể là kiểu Date của MySQL), chuyển thành chuỗi ISO
                    if (value instanceof Date) {
                        value = value.toISOString();
                    }

                    console.log(`Trước: ${key} =`, value); // Debug giá trị trước khi sửa

                    if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                        row[key] = convertToYYYYMMDD(moment.utc(value).add(1, 'day').toISOString());
                        console.log(`Sau: ${key} =`, row[key]); // Debug giá trị sau khi sửa
                    }
                });
                return row;
            });

            res.json(updatedResults);
        });
    });

    // GET - Lấy một bản ghi theo khóa chính
    app.get(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {
        const conditions = keys.map((key, i) => `?? = ?`).join(" AND ");
        const params = [table, ...keys.flatMap((key, i) => [key, req.params[`id${i + 1}`]])];

        db.query(`SELECT * FROM ?? WHERE ${conditions}`, params, (err, results) => {
            if (err) return res.status(500).send(`Lỗi khi lấy dữ liệu từ ${table}`);
            if (results.length === 0) return res.status(404).send(`Không tìm thấy dữ liệu trong ${table}`);

            let row = results[0];
            Object.keys(row).forEach(key => {
                let value = row[key];

                if (value instanceof Date) {
                    value = value.toISOString();
                }

                console.log(`Trước: ${key} =`, value); // Debug giá trị trước khi sửa

                if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                    row[key] = convertToYYYYMMDD(moment.utc(value).add(1, 'day').toISOString());
                    console.log(`Sau: ${key} =`, row[key]); // Debug giá trị sau khi sửa
                }
            });

            res.json(row);
        });
    });

    app.delete(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {

        const conditions = keys.map((key) => `\`${key}\` = ?`).join(" AND ");
        const params = [...keys.map((key, i) => req.params[`id${i + 1}`])];

        const sql = `DELETE FROM \`${table}\` WHERE ${conditions}`;
        console.log("SQL Query:", sql, "Params:", params); // Debug

        db.query(sql, params, (err) => {
            if (err) return res.status(500).send(`Lỗi khi xóa từ ${table}: ${err.message}`);
            res.send(`Xóa từ ${table} thành công`); // ✅ Phải có
        });

    });

    app.put(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send("Không có dữ liệu để cập nhật.");
        }

        // Chuyển đổi dữ liệu ngày tháng sang định dạng MySQL (YYYY-MM-DD)
        Object.keys(req.body).forEach(key => {
            req.body[key] = convertToMySQLDate(req.body[key]);
        });

        const updates = Object.keys(req.body).map(key => `\`${key}\` = ?`).join(", ");
        const values = [...Object.values(req.body), ...keys.map((_, i) => req.params[`id${i + 1}`])];

        const conditions = keys.map(key => `\`${key}\` = ?`).join(" AND ");
        const sql = `UPDATE \`${table}\` SET ${updates} WHERE ${conditions}`;

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).send(`Lỗi khi cập nhật ${table}: ${err.message}`);
            }
            if (result.affectedRows === 0) {
                return res.status(404).send(`Không tìm thấy bản ghi để cập nhật.`);
            }
            res.status(200).end(); // Thành công, không gửi nội dung

        });
    });



    app.post(`/api/${table}`, (req, res) => {
        // Chuyển đổi dữ liệu ngày tháng sang định dạng MySQL (YYYY-MM-DD)
        Object.keys(req.body).forEach(key => {
            req.body[key] = convertToMySQLDate(req.body[key]); // Chuyển đổi nếu là ngày hợp lệ
        });

        const columns = Object.keys(req.body);
        const values = Object.values(req.body);

        if (columns.length === 0) return res.status(400).send("Không có dữ liệu để thêm.");

        const sql = `INSERT INTO \`${table}\` (${columns.map(col => `\`${col}\``).join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`;

        db.query(sql, values, (err) => {
            if (err) return res.status(500).send(`Lỗi khi thêm vào ${table}: ${err.message}`);
            res.status(201).send(`Thêm vào ${table} thành công`);
            //res.send(`Xóa từ ${table} thành công`); // ✅ Phải có
        });
    });


    // Hàm chuyển đổi "YYYY-MM-DD" → "YYYY-MM-DDT00:00:00.000Z"

    //=================================================================API của quản lý===============================

    app.get('/api/cau_thu/doibong', (req, res) => {

        const { ma_doi_bong } = req.query;

        // Nếu có ma_doi_bong, thực hiện SELECT kèm WHERE
        const sql = `SELECT ct.*, db.ten_doi_bong 
    FROM cau_thu ct 
    JOIN doi_bong db ON ct.ma_doi_bong = db.ma_doi_bong 
    WHERE ct.ma_doi_bong = ?`;
        db.query(sql, [ma_doi_bong], (err, results) => {
            if (err) {
                return res.status(500).send('Lỗi khi lấy danh sách cầu thủ theo đội bóng.');
            }
            res.json(results);
        });

    });

    //get danh sách đôi bóng theo quản lý
    app.get('/api/doi_bong/quanly', (req, res) => {
        const { ma_ql_doi_bong } = req.query;

        var var_IDNguoiDung = null;

        const sql1 = 'SELECT * FROM nguoi_dung WHERE tai_khoan = ?';
        db.query(sql1, [ma_ql_doi_bong], (err, results) => {
            if (err) return res.status(500).send('Lỗi khi lấy dữ liệu đội bóng.');

            var_IDNguoiDung = results[0].ma_nguoi_dung

            const sql = `SELECT *
                FROM doi_bong db
                WHERE ma_ql_doi_bong = ?`;
            db.query(sql, [var_IDNguoiDung], (err, results) => {
                if (err) return res.status(500).send('Lỗi khi lấy dữ liệu đội bóng.');
                res.json(results);
            });
        });



    });
    // app.get('/api/get_user', (req, res) => {
    //     const { user_name } = req.query;

    //     const sql1 = 'SELECT * FROM nguoi_dung WHERE tai_khoan = ?';
    //     db.query(sql1, [user_name], (err, results) => {
    //         if (err) return res.status(500).send('Lỗi khi lấy dữ liệu đội bóng.');

    //         var_IDNguoiDung = results[0].ma_nguoi_dung
    //         res.json(results);
    //     });

    // });
    app.get('/api/get_user', (req, res) => {
        const { user_name } = req.query;

        if (!user_name) {
            return res.status(400).json({ error: 'Thiếu tham số user_name' });
        }

        const sql = 'SELECT * FROM nguoi_dung WHERE tai_khoan = ?';
        db.query(sql, [user_name], (err, results) => {
            if (err) {
                console.error('Lỗi SQL:', err); // Ghi log lỗi
                return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Không tìm thấy người dùng' });
            }

            res.json(results);
        });
    });


    //get danh sách cầu thủ theo quản lý
    app.get('/api/cauthu/quanly', (req, res) => {
        const { ma_ql_doi_bong } = req.query;
        const sql1 = 'SELECT * FROM nguoi_dung WHERE tai_khoan = ?';
        db.query(sql1, [ma_ql_doi_bong], (err, results) => {
            if (err) return res.status(500).send('Lỗi khi lấy dữ liệu đội bóng.');

            var_IDNguoiDung = results[0].ma_nguoi_dung
            console.log(var_IDNguoiDung)

            const sql = `
                            SELECT c.*, db.ten_doi_bong
                            FROM cau_thu c
                            JOIN doi_bong db ON c.ma_doi_bong = db.ma_doi_bong
                            WHERE db.ma_ql_doi_bong = ?
                            `;
            db.query(sql, [var_IDNguoiDung], (err, results) => {
                if (err) return res.status(500).send('Lỗi khi lấy dữ liệu đội bóng.');
                res.json(results);
            });
        });
    });

    // danh sách trận đấu theo quản lý
    app.get('/api/trandau/quanly', (req, res) => {
        const { maQL, ma_doi1, ma_giai_dau, ma_vong_dau, ma_san, date_from, date_to } = req.query;

        // lấy ID quản lý từ username
        const sql = 'SELECT ma_nguoi_dung FROM `nguoi_dung` WHERE tai_khoan = ?';
        db.query(sql, [maQL], (err, results) => {
            if (err) {
                return res.status(500).send('Lỗi khi xóa trận đấu.');
            }

            const id_quan_ly = results[0]?.ma_nguoi_dung;


            const sql1 = 'CALL sp_get_lich_thi_dau_theo_ql(?,?)';


            db.query(sql1, [id_quan_ly, ma_doi1], (err, results) => {
                if (err) return res.status(500).send('Lỗi khi lấy dữ liệu trận đấu');

                res.json(results[0]);
            });
        });
    });

    // danh sách đơn đăng ký giải theo quản lý
    app.get('/api/dondangky/quanly', (req, res) => {
        const { maQL } = req.query;

        // lấy ID quản lý từ username
        const sql = 'SELECT ma_nguoi_dung FROM `nguoi_dung` WHERE tai_khoan = ?';
        db.query(sql, [maQL], (err, results) => {
            if (err) {
                return res.status(500).send('Lỗi khi xóa trận đấu.');
            }

            const id_quan_ly = results[0]?.ma_nguoi_dung;

            const sql1 = 'CALL sp_danh_sach_don_dang_ky_giai(?)';


            db.query(sql1, [id_quan_ly], (err, results) => {
                if (err) return res.status(500).send('Lỗi khi lấy dữ liệu trận đấu');

                res.json(results[0]);
            });
        });
    });


    //=================================================================API đăng nhập===============================


    const jwt = require("jsonwebtoken");

    // Secret key dùng để ký JWT 
    const JWT_SECRET = "your_secret_key_here"; // => bạn có thể đổi thành biến .env

    // Đăng nhập tài khoản
    app.post("/api/dangnhap", (req, res) => {
        const { tai_khoan, mat_khau } = req.body;
        if (!tai_khoan || !mat_khau) {
            return res.status(400).json({ message: "Thiếu thông tin đăng nhập." });
        }

        // Truy vấn thông tin tài khoản từ DB
        const sql = `SELECT * FROM tai_khoan WHERE tai_khoan = ?`;

        db.query(sql, [tai_khoan], async (err, results) => {
            if (err) return res.status(500).json({ message: "Lỗi máy chủ." });


            if (results.length === 0) return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu." });

            const user = results[0];

            // So sánh mật khẩu - nếu bạn chưa mã hóa thì so sánh trực tiếp
            //const match = await bcrypt.compare(mat_khau, user.mat_khau);

            const match = (mat_khau == user.mat_khau);

            if (!match) {
                return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu." });
            }
            const roleMap = {
                1: "Admin",
                2: "Quản lý đội bóng"
            };

            // Tạo JWT token
            const token = jwt.sign(
                {
                    tai_khoan: user.tai_khoan,
                    role: roleMap[user.ma_vai_tro] || "Không xác định"
                },
                JWT_SECRET,
                { expiresIn: "24h" }
            );


            res.json({
                token,
                // role: user.vai_tro,
                user: {
                    tai_khoan: user.tai_khoan,
                    vai_tro: roleMap[user.ma_vai_tro] || "Không xác định"
                    // Bạn có thể thêm nhiều thông tin nữa nếu muốn
                }
            });
            //console.log(res);
            // return res.status(200).json({
            //     token,
            //     role: user.vai_tro,
            //     user: {
            //         tai_khoan: user.tai_khoan,
            //         vai_tro: user.vai_tro
            //     }
            // })
        });
    });


});





// // Khởi động server
// app.listen(port, () => {
//     console.log(`Server đang chạy tại http://localhost:${port}`);
// });
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
