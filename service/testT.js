const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Lưu file tạm trước khi upload lên Cloudinary

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: 'dyilzwziv',          // tên của dự án trên cloudinary
    api_key: '215441275658421',
    api_secret: 'pMiC5-j_zWwvmOlkgohQ62cyQsY'
});

// API để upload ảnh
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path); // Xóa file sau khi upload

        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Upload thất bại" });
    }
});

app.listen(3000, () => console.log("Server chạy trên cổng 3000"));
