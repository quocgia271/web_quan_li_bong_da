const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 4002;

// Sử dụng CORS cho tất cả các nguồn
app.use(cors());

// Middleware để phân tích cú pháp JSON
app.use(express.json());

// Kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quan_ly_giai_dau",
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
    "tai_khoan": ["tai_khoan"],         // 
    "vai_tro": ["ma_vai_tro"],           //
    "nguoi_dung": ["ma_nguoi_dung"],      // có nên thay thế bằng tài khoản ko 
    "giai_dau": ["ma_giai_dau"],          // 
    "doi_bong": ["ma_doi_bong"],          // thay thế băng mã huấn luyện viên
    "vi_tri": ["ma_vi_tri"],              // 
    "cau_thu": ["ma_cau_thu"],            // 
    "cau_thu_giai_dau": ["ma_cau_thu", "ma_giai_dau"], // khóa phụ: ma_giai_dau, ma_doi_bong
    "tran_dau": ["ma_tran_dau"],            // 
    "ket_qua_tran_dau": ["ma_ket_qua"],        // hình nhu thay thế banwgf mã ma_tran_dau
    "loai_su_kien": ["ma_loai_su_kien"],        // khóa phụ: ten_loai_su_kien
    "su_kien_tran_dau": ["ma_su_kien"],       // 
    "bang_xep_hang": ["ma_xep_hang"]    // khóa phujj ma_giai_dau, ma_doi_bong
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
        const apiList = Object.keys(tables).map(table => ({
            getAll: `/api/${table}`,
            getOne: `/api/${table}/:${tables[table].map((_, i) => `id${i + 1}`).join("/:")}`,
            create: `/api/${table}`,
            update: `/api/${table}/:${tables[table].map((_, i) => `id${i + 1}`).join("/:")}`,
            delete: `/api/${table}/:${tables[table].map((_, i) => `id${i + 1}`).join("/:")}`,
        }));
    
        res.json(apiList);
    });
    
    
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



    // put - Cập nhật bản ghi
    // cần chỉnh sửa phần này 
    // với key là những kiểu dữ liệu ngày thì sao 




    app.delete(`/api/${table}/:${keys.map((_, i) => `id${i + 1}`).join("/:")}`, (req, res) => {

        const conditions = keys.map((key) => `\`${key}\` = ?`).join(" AND ");
        const params = [...keys.map((key, i) => req.params[`id${i + 1}`])];

        const sql = `DELETE FROM \`${table}\` WHERE ${conditions}`;
        console.log("SQL Query:", sql, "Params:", params); // Debug

        db.query(sql, params, (err) => {
            if (err) return res.status(500).send(`Lỗi khi xóa từ ${table}: ${err.message}`);
            res.send(`Xóa từ ${table} thành công`);
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
            res.send(`Cập nhật ${table} thành công!`);
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
        });
    });
    
    // Hàm chuyển đổi "YYYY-MM-DD" → "YYYY-MM-DDT00:00:00.000Z"



});





// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
