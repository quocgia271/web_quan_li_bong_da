// const express = require('express');

// const cors = require('cors');
// const fs = require('fs');
// const path = require('path'); // Import path module

// dotenv.config();

// const app = express();
// const port = 3000;

// // Cấu hình Cloudinary
// cloudinary.config({ 
//     cloud_name: 'dyilzwziv', 
//     api_key: '215441275658421', 
//     api_secret: 'pMiC5-j_zWwvmOlkgohQ62cyQsY'
// });

// // Middleware
// app.use(express.json());
// app.use(cors());

// // API tải ảnh lên Cloudinary với tên file gốc
// app.post('/upload', async (req, res) => {
//     try {
//         const { imagePath } = req.body;

//         if (!imagePath) {
//             return res.status(400).json({ error: 'Image path is required' });
//         }

//         if (!fs.existsSync(imagePath)) {
//             return res.status(400).json({ error: 'File does not exist' });
//         }

//         // Lấy tên file từ đường dẫn
//         const fileName = path.basename(imagePath, path.extname(imagePath)); 

//         // Upload lên Cloudinary với public_id là tên file gốc
//         const uploadResult = await cloudinary.uploader.upload(imagePath, {
//             public_id: fileName
//         });

//         res.json({
//             message: 'Upload successful',
//             data: {
//                 public_id: uploadResult.public_id,
//                 url: uploadResult.secure_url
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Khởi động server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
// // 