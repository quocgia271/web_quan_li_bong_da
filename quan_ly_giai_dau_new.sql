-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 11, 2025 lúc 08:14 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quan_ly_giai_dau_new`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bang_dau`
--

CREATE TABLE `bang_dau` (
  `ma_bang_dau` varchar(255) NOT NULL,
  `ten_bang_dau` varchar(50) NOT NULL,
  `ma_giai_dau` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `bang_dau`
--

INSERT INTO `bang_dau` (`ma_bang_dau`, `ten_bang_dau`, `ma_giai_dau`) VALUES
('bd_0001', 'bảng C', 'gd_0001'),
('bd_0002', 'bảng B', 'gd_0001'),
('bd_0005', 'bảng c', 'gd_0005'),
('bd_0006', 'bảng A', 'gd_0001'),
('bd_0007', 'bảng chung kết', 'gd_0008'),
('bd_0008', 'bang a', 'gd_0009'),
('bd_0009', 'bang b', 'gd_0009'),
('bd_0010', 'Bảng A', 'gd_0010'),
('bd_0011', 'Bảng B', 'gd_0010'),
('bd_0012', 'Bảng C', 'gd_0010'),
('BD01', 'Bảng A - GD01', 'GD01'),
('BD02', 'Bảng B - GD01', 'GD01'),
('BD03', 'Bảng C - GD01', 'GD01'),
('BD04', 'Bảng A - GD02', 'GD02'),
('BD05', 'Bảng B - GD02', 'GD02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cau_thu`
--

CREATE TABLE `cau_thu` (
  `ma_cau_thu` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `so_ao` int(11) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `ma_vi_tri` varchar(255) NOT NULL,
  `ma_doi_bong` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `cau_thu`
--

INSERT INTO `cau_thu` (`ma_cau_thu`, `ho_ten`, `ngay_sinh`, `so_ao`, `hinh_anh`, `gioi_tinh`, `ma_vi_tri`, `ma_doi_bong`) VALUES
('ct_0001', 'lê văn tiến11', '2002-12-18', 8, 'Screenshot_2024-06-07_101114.png', 'nam', 'RWB', 'DB08'),
('ct_0002', 'lê văn tiến', '2025-04-02', 111, 'ct11.jpg', 'nam', 'RWB', 'DB04'),
('ct_0003', 'ttttt', '2025-04-18', 3, 'ct11.jpg', 'nam', 'RB', 'db_0003'),
('ct_0004', 'lê văn tiến111', '2025-04-14', 6, 'hd5.jpg', 'nữ', 'GK', 'db_0003'),
('ct_0005', 'lê van tiến test', '2025-05-16', 3, '3_8.png', 'nam', 'CB', 'DB05'),
('ct_0006', 'lê văn tiến ttt', '2025-04-30', 2, 'Screenshot_2024-06-04_163736.png', 'nữ', 'vtct_0001', 'db_0003'),
('ct_0007', 'tphcm 1', '2025-05-21', 1, 'tt5.jpg', 'nam', 'RWB', 'db_0001'),
('ct_0008', 'Nguyễn Văn A', '2000-01-14', 1, 'hoaDon.jpg', 'nam', 'GK', 'db_0001'),
('ct_0009', 'Trần Văn B', '1999-04-21', 2, 'hd4.webp', 'nam', 'CB', 'db_0001'),
('ct_0010', 'Lê Văn C', '2001-07-03', 3, 'Screenshot_2024-12-09_191727.png', 'nam', 'LB', 'db_0001'),
('ct_0011', 'Phạm Văn D', '2002-09-10', 4, 'Screenshot_2024-12-18_114625.png', 'nam', 'RB', 'db_0001'),
('ct_0012', 'Vũ Văn E', '1998-02-28', 5, 'ct12.jpg', 'nam', 'CM', 'db_0001'),
('ct_0013', 'Đỗ Văn F', '2003-03-19', 6, 'ct13.jpg', 'nam', 'CDM', 'db_0001'),
('ct_0014', 'Bùi Văn G', '2000-06-30', 7, 'ct14.jpg', 'nam', 'CAM', 'db_0001'),
('ct_0015', 'Lý Văn H', '2001-12-25', 8, 'ct15.jpg', 'nam', 'RW', 'db_0001'),
('ct_0016', 'Ngô Văn I', '1997-10-10', 9, 'ct16.jpg', 'nam', 'LW', 'db_0001'),
('ct_0017', 'Hoàng Văn K', '1999-08-08', 10, 'ct17.jpg', 'nam', 'ST', 'db_0001'),
('ct_0020', 'Lê Văn C', '2001-07-04', 3, 'Screenshot_2024-12-18_134333.png', 'nam', 'LB', 'db_0002'),
('ct_0021', 'Phạm Văn D', '2002-09-10', 4, 'Screenshot_2025-01-21_123105.png', 'nam', 'RB', 'db_0002'),
('ct_0022', 'Vũ Văn E', '1998-02-27', 5, 'Screenshot_2024-12-15_154702.png', 'nam', 'CM', 'db_0002'),
('ct_0023', 'Đỗ Văn F', '2003-03-18', 6, 'ic_word.png', 'nam', 'CDM', 'db_0002'),
('ct_0024', 'Bùi Văn G', '2000-06-29', 7, 'ic_box2.png', 'nam', 'CAM', 'db_0002'),
('ct_0025', 'Lý Văn H', '2001-12-25', 8, 'ct15.jpg', 'nam', 'RW', 'db_0002'),
('ct_0026', 'Ngô Văn I', '1997-10-10', 9, 'ct16.jpg', 'nam', 'LW', 'db_0002'),
('ct_0027', 'Hoàng Văn K', '1999-08-08', 10, 'ct17.jpg', 'nam', 'ST', 'db_0002'),
('ct_0028', 'Nguyễn Văn A', '2000-01-15', 1, 'ct8.jpg', 'nam', 'GK', 'db_0002'),
('ct_0029', 'Trần Văn B', '1999-04-22', 2, 'ct9.jpg', 'nam', 'CB', 'db_0002'),
('ct_0030', 'Lê Văn C', '2001-07-05', 3, 'ct10.jpg', 'nam', 'LB', 'DB01'),
('ct_0031', 'Phạm Văn D', '2002-09-11', 4, 'ct11.jpg', 'nam', 'RB', 'DB01'),
('ct_0032', 'Vũ Văn E', '1998-02-28', 5, 'ct12.jpg', 'nam', 'CM', 'DB01'),
('ct_0033', 'Đỗ Văn F', '2003-03-19', 6, 'ct13.jpg', 'nam', 'CDM', 'DB01'),
('ct_0034', 'Bùi Văn G', '2000-06-30', 7, 'ct14.jpg', 'nam', 'CAM', 'DB01'),
('ct_0035', 'Lý Văn H', '2001-12-25', 8, 'ct15.jpg', 'nam', 'RW', 'DB01'),
('ct_0036', 'Ngô Văn I', '1997-10-10', 9, 'ct16.jpg', 'nam', 'LW', 'DB01'),
('ct_0037', 'Hoàng Văn K', '1999-08-08', 10, 'ct17.jpg', 'nam', 'ST', 'DB01'),
('ct_0038', 'Nguyễn Văn A', '2000-01-15', 1, 'ct8.jpg', 'nam', 'GK', 'DB01'),
('ct_0039', 'Trần Văn B', '1999-04-22', 2, 'ct9.jpg', 'nam', 'CB', 'DB01'),
('ct_0040', 'Lê Văn C', '2001-07-05', 3, 'ct10.jpg', 'nam', 'LB', 'DB02'),
('ct_0041', 'Phạm Văn D', '2002-09-11', 4, 'ct11.jpg', 'nam', 'RB', 'DB02'),
('ct_0042', 'Vũ Văn E', '1998-02-28', 5, 'ct12.jpg', 'nam', 'CM', 'DB02'),
('ct_0043', 'Đỗ Văn F', '2003-03-19', 6, 'ct13.jpg', 'nam', 'CDM', 'DB01'),
('ct_0044', 'Bùi Văn G', '2000-06-30', 7, 'ct14.jpg', 'nam', 'CAM', 'DB02'),
('ct_0045', 'Lý Văn H', '2001-12-25', 8, 'ct15.jpg', 'nam', 'RW', 'DB02'),
('ct_0046', 'Ngô Văn I', '1997-10-10', 9, 'ct16.jpg', 'nam', 'LW', 'DB02'),
('ct_0047', 'Hoàng Văn K', '1999-08-08', 10, 'ct17.jpg', 'nam', 'ST', 'DB02'),
('ct_0048', 'Nguyễn Văn A', '2000-01-15', 1, 'ct8.jpg', 'nam', 'GK', 'DB02'),
('ct_0049', 'Trần Văn B', '1999-04-22', 2, 'ct9.jpg', 'nam', 'CB', 'DB02'),
('ct_0050', 'Lê Văn C', '2001-07-05', 3, 'ct10.jpg', 'nam', 'LB', 'DB04'),
('ct_0051', 'Phạm Văn D', '2002-09-11', 4, 'ct11.jpg', 'nam', 'RB', 'DB04'),
('ct_0052', 'Vũ Văn E', '1998-02-28', 5, 'ct12.jpg', 'nam', 'CM', 'DB04'),
('ct_0053', 'Đỗ Văn F', '2003-03-19', 6, 'ct13.jpg', 'nam', 'CDM', 'DB04'),
('ct_0054', 'Bùi Văn G', '2000-06-30', 7, 'ct14.jpg', 'nam', 'CAM', 'DB04'),
('ct_0055', 'Lý Văn H', '2001-12-25', 8, 'ct15.jpg', 'nam', 'RW', 'DB04'),
('ct_0056', 'Ngô Văn I', '1997-10-10', 9, 'ct16.jpg', 'nam', 'LW', 'DB04'),
('ct_0057', 'Hoàng Văn K', '1999-08-08', 10, 'ct17.jpg', 'nam', 'ST', 'DB04'),
('ct_0058', 'Nguyễn Văn A', '2000-01-15', 1, 'ct8.jpg', 'nam', 'GK', 'DB04'),
('ct_0059', 'Trần Văn B', '1999-04-22', 2, 'ct9.jpg', 'nam', 'CB', 'DB04'),
('ct_0060', 'họ và tên', '2025-06-20', 1, 'Screenshot_2024-12-13_170043.png', 'nam', 'vtct_0001', 'DB06'),
('ct_0061', 'Nguyễn Văn Quyết', '2025-06-01', 12, 'ct11.jpg', 'nam', 'LWB', 'DB06'),
('ct_0065', 'hiếu ', '2025-06-11', 112, '', 'nam', 'RWB', 'db_0002'),
('CT01', 'Nguyễn Văn Quyết', '1990-06-20', 10, 'ct9.jpg', 'nam', 'ST', 'db_0003'),
('CT02', 'Đỗ Hùng Dũng', '1993-09-08', 16, 'ct9.jpg', 'nam', 'CM', 'db_0003'),
('CT03', 'Quế Ngọc Hải', '1993-05-15', 3, NULL, 'nam', 'CB', 'db_0003'),
('CT04', 'Bùi Tiến Dũng', '1995-10-02', 4, 'ct9.jpg', 'nam', 'CB', 'db_0003'),
('CT05', 'Nguyễn Công Phượng', '1995-01-21', 10, 'ct9.jpg', 'nam', 'CF', 'db_0003'),
('CT06', 'Phan Văn Đức', '1996-04-11', 20, 'Screenshot_2025-01-11_214856.png', 'nam', 'LW', 'db_0003'),
('CT07', 'Văn Thanh', '1996-07-14', 17, '222.jpg', 'nam', 'RB', 'db_0003'),
('CT08', 'Đặng Văn Lâm', '1993-08-12', 1, 'ct9.jpg', 'nam', 'GK', 'db_0003'),
('CT09', 'Hà Đức Chinh', '1997-09-22', 9, '3333.png', 'nam', 'ST', 'db_0003'),
('CT10', 'Nguyễn Hoàng Đức', '1998-06-11', 14, '19_3.png', 'nam', 'CM', 'db_0003');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cau_thu_giai_dau`
--

CREATE TABLE `cau_thu_giai_dau` (
  `ma_cau_thu` varchar(255) NOT NULL,
  `ma_giai_dau` varchar(255) NOT NULL,
  `ma_doi_bong` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `so_ao` int(11) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `cau_thu_giai_dau`
--

INSERT INTO `cau_thu_giai_dau` (`ma_cau_thu`, `ma_giai_dau`, `ma_doi_bong`, `ho_ten`, `so_ao`, `hinh_anh`, `ma_vi_tri`) VALUES
('ct_0003', 'gd_0001', 'db_0003', 'ttttt', 3, 'Screenshot_2025-01-11_214856.png', 'RB'),
('ct_0003', 'GD01', 'db_0003', 'ttttt', 3, 'ct11.jpg', 'RB'),
('ct_0004', 'gd_0001', 'db_0003', 'lê văn tiến111', 6, 'z6418754535921_35d72cad7c7e34a996a2b45591bc61bf.jpg', 'GK'),
('ct_0004', 'GD01', 'db_0003', 'lê văn tiến111', 6, 'hd5.jpg', 'GK'),
('ct_0005', 'gd_0008', 'DB05', 'lê van tiến test', 3, '3_8.png', 'CB'),
('ct_0006', 'gd_0001', 'db_0003', 'lê văn tiến ttt', 2, 'Screenshot_2024-06-04_163736.png', 'vtct_0001'),
('ct_0006', 'GD01', 'db_0003', 'lê văn tiến ttt', 2, 'Screenshot_2024-06-04_163736.png', 'vtct_0001'),
('ct_0007', 'gd_0001', 'db_0001', 'tphcm 1', 1, 'tt5.jpg', 'RWB'),
('ct_0008', 'gd_0001', 'db_0001', 'Nguyễn Văn A', 1, 'hoaDon.jpg', 'GK'),
('ct_0009', 'gd_0001', 'db_0001', 'Trần Văn B', 2, 'hd4.webp', 'CB'),
('ct_0010', 'gd_0001', 'db_0001', 'Lê Văn C', 3, 'Screenshot_2024-12-09_191727.png', 'LB'),
('ct_0011', 'gd_0001', 'db_0001', 'Phạm Văn D', 4, 'Screenshot_2024-12-18_114625.png', 'RB'),
('ct_0012', 'gd_0001', 'db_0001', 'Vũ Văn E', 5, 'ct12.jpg', 'CM'),
('ct_0013', 'gd_0001', 'db_0001', 'Đỗ Văn F', 6, 'ct13.jpg', 'CDM'),
('ct_0014', 'gd_0001', 'db_0001', 'Bùi Văn G', 7, 'ct14.jpg', 'CAM'),
('ct_0015', 'gd_0001', 'db_0001', 'Lý Văn H', 8, 'ct15.jpg', 'RW'),
('ct_0040', 'gd_0001', 'DB02', 'Lê Văn C', 3, 'ct10.jpg', 'LB'),
('ct_0041', 'gd_0001', 'DB02', 'Phạm Văn D', 4, 'ct11.jpg', 'RB'),
('ct_0042', 'gd_0001', 'DB02', 'Vũ Văn E', 5, 'ct12.jpg', 'CM'),
('ct_0044', 'gd_0001', 'DB02', 'Bùi Văn G', 7, 'ct14.jpg', 'CAM'),
('ct_0045', 'gd_0001', 'DB02', 'Lý Văn H', 8, 'ct15.jpg', 'RW'),
('ct_0060', 'gd_0008', 'DB06', 'họ và tên', 1, 'Screenshot_2024-12-13_170043.png', 'vtct_0001'),
('ct_0061', 'gd_0008', 'DB06', 'Nguyễn Văn Quyết', 12, 'Screenshot_2024-12-15_232538.png', 'LWB'),
('CT01', 'GD01', 'db_0003', 'Nguyễn Văn Quyết', 10, 'ct9.jpg', 'ST'),
('CT02', 'GD01', 'db_0003', 'Đỗ Hùng Dũng', 16, 'ct9.jpg', 'CM'),
('CT03', 'GD01', 'db_0003', 'Quế Ngọc Hải', 3, NULL, 'CB'),
('CT04', 'GD01', 'db_0003', 'Bùi Tiến Dũng', 4, 'ct9.jpg', 'CB'),
('CT05', 'GD01', 'db_0003', 'Nguyễn Công Phượng', 10, 'ct9.jpg', 'CF'),
('CT06', 'GD01', 'db_0003', 'Phan Văn Đức', 20, 'Screenshot_2025-01-11_214856.png', 'LW'),
('CT07', 'GD01', 'db_0003', 'Văn Thanh', 17, '222.jpg', 'RB'),
('CT08', 'GD01', 'db_0003', 'Đặng Văn Lâm', 1, 'ct9.jpg', 'GK'),
('CT09', 'GD01', 'db_0003', 'Hà Đức Chinh', 9, '3333.png', 'ST'),
('CT10', 'GD01', 'db_0003', 'Nguyễn Hoàng Đức', 14, '19_3.png', 'CM');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dang_ky_tham_gia_giai`
--

CREATE TABLE `dang_ky_tham_gia_giai` (
  `ma_giai_dau` varchar(255) NOT NULL,
  `ma_doi_bong` varchar(255) NOT NULL,
  `thoi_gian_dang_ky` timestamp NOT NULL DEFAULT current_timestamp(),
  `trang_thai` enum('Chờ duyệt','Đã duyệt','Từ chối') DEFAULT 'Chờ duyệt',
  `ly_do_tu_choi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `dang_ky_tham_gia_giai`
--

INSERT INTO `dang_ky_tham_gia_giai` (`ma_giai_dau`, `ma_doi_bong`, `thoi_gian_dang_ky`, `trang_thai`, `ly_do_tu_choi`) VALUES
('gd_0001', 'db_0001', '2025-06-03 09:42:44', 'Từ chối', NULL),
('gd_0001', 'db_0002', '2025-06-03 09:42:54', 'Đã duyệt', NULL),
('gd_0001', 'db_0003', '2025-06-03 08:33:39', 'Đã duyệt', NULL),
('gd_0001', 'DB02', '2025-06-03 08:34:48', 'Đã duyệt', NULL),
('gd_0001', 'DB03', '2025-06-03 08:35:31', 'Đã duyệt', NULL),
('gd_0001', 'DB04', '2025-06-03 09:39:35', 'Đã duyệt', NULL),
('gd_0001', 'DB05', '2025-06-03 09:45:44', 'Đã duyệt', NULL),
('gd_0001', 'DB06', '2025-06-03 09:45:33', 'Đã duyệt', NULL),
('gd_0001', 'DB07', '2025-06-03 09:45:24', 'Đã duyệt', NULL),
('gd_0001', 'DB08', '2025-06-03 09:45:13', 'Đã duyệt', NULL),
('gd_0002', 'db_0001', '2025-06-10 05:42:31', 'Chờ duyệt', NULL),
('gd_0002', 'db_0003', '2025-06-03 08:33:43', 'Chờ duyệt', NULL),
('gd_0002', 'DB02', '2025-06-03 08:34:50', 'Chờ duyệt', NULL),
('gd_0002', 'DB03', '2025-06-03 08:35:33', 'Chờ duyệt', NULL),
('gd_0003', 'db_0001', '2025-06-11 04:13:03', 'Chờ duyệt', NULL),
('gd_0003', 'db_0003', '2025-06-03 08:33:45', 'Chờ duyệt', NULL),
('gd_0003', 'DB02', '2025-06-03 08:34:52', 'Đã duyệt', NULL),
('gd_0003', 'DB03', '2025-06-03 08:35:36', 'Đã duyệt', NULL),
('gd_0005', 'db_0003', '2025-06-03 08:33:48', 'Đã duyệt', NULL),
('gd_0005', 'DB02', '2025-06-03 08:34:55', 'Đã duyệt', NULL),
('gd_0005', 'DB03', '2025-06-03 08:35:38', 'Đã duyệt', NULL),
('gd_0006', 'db_0003', '2025-06-03 08:33:51', 'Từ chối', 'Không thích'),
('gd_0006', 'DB02', '2025-06-03 08:34:58', 'Đã duyệt', NULL),
('gd_0007', 'db_0003', '2025-06-03 08:33:54', 'Đã duyệt', NULL),
('gd_0007', 'DB02', '2025-06-03 08:35:01', 'Đã duyệt', NULL),
('gd_0007', 'DB03', '2025-06-03 08:35:41', 'Đã duyệt', NULL),
('gd_0008', 'db_0003', '2025-06-05 07:04:53', 'Từ chối', 'từ chối'),
('gd_0008', 'DB05', '2025-06-05 07:12:34', 'Đã duyệt', NULL),
('gd_0008', 'DB06', '2025-06-05 07:12:49', 'Đã duyệt', NULL),
('gd_0009', 'db_0001', '2025-06-07 01:21:58', 'Đã duyệt', NULL),
('gd_0010', 'db_0001', '2025-06-11 04:14:19', 'Đã duyệt', NULL),
('gd_0010', 'db_0002', '2025-06-11 04:22:08', 'Đã duyệt', NULL),
('gd_0010', 'db_0003', '2025-06-11 04:22:22', 'Đã duyệt', NULL),
('gd_0010', 'DB01', '2025-06-11 04:22:33', 'Đã duyệt', NULL),
('gd_0010', 'DB02', '2025-06-11 04:23:23', 'Đã duyệt', NULL),
('gd_0010', 'DB03', '2025-06-11 04:23:36', 'Đã duyệt', NULL),
('gd_0010', 'DB04', '2025-06-11 04:44:34', 'Đã duyệt', NULL),
('gd_0010', 'DB07', '2025-06-11 04:44:43', 'Đã duyệt', NULL),
('gd_0010', 'DB08', '2025-06-11 04:44:59', 'Đã duyệt', NULL),
('GD01', 'db_0002', '2025-06-07 01:30:31', 'Đã duyệt', NULL),
('GD01', 'db_0003', '2025-06-03 08:34:05', 'Đã duyệt', NULL),
('GD01', 'DB02', '2025-06-03 08:35:09', 'Đã duyệt', NULL),
('GD02', 'db_0003', '2025-06-03 08:34:08', 'Đã duyệt', NULL),
('GD02', 'DB02', '2025-06-03 08:35:12', 'Đã duyệt', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doi_bong`
--

CREATE TABLE `doi_bong` (
  `ma_doi_bong` varchar(255) NOT NULL,
  `ten_doi_bong` varchar(255) NOT NULL,
  `quoc_gia` varchar(255) NOT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `ma_ql_doi_bong` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `doi_bong`
--

INSERT INTO `doi_bong` (`ma_doi_bong`, `ten_doi_bong`, `quoc_gia`, `gioi_tinh`, `logo`, `ma_ql_doi_bong`) VALUES
('db_0001', 'TP.HCM FC1', 'Việt Nam', 'nữ', 'doiBong_1.jpg', 'ND002'),
('db_0002', 'TP.HCM FC2', 'Việt Nam', 'nam', 'Screenshot_2024-12-13_153759.png', 'ND002'),
('db_0003', 'Lê văn tiến', 'lê văn tiến', 'nữ', '', 'ND002'),
('DB01', 'Hà Nội FC', 'Việt Nam', 'nam', 'cau_thu3.jpg', 'ND002'),
('DB02', 'TP.HCM FC3', 'Việt Nam', 'nam', 'Screenshot_2025-03-25_100427.png', 'ND002'),
('DB03', 'Hoàng Anh Gia Lai', 'Việt Nam', 'nam', '111.png', 'ND002'),
('DB04', 'Sông Lam Nghệ An', 'Việt Nam', 'nam', 'dataDoiThang', 'ND002'),
('DB05', 'Bình Định FC', 'Việt Nam', 'nam', 'doiBong_1.jpg', 'nd_0002'),
('DB06', 'Công An Hà Nội', 'Việt Nam', 'nam', 'doiBong_1.jpg', 'nd_0003'),
('DB07', 'Đà Nẵng FC', 'Việt Nam', 'nam', 'doiBong_1.jpg', 'ND002'),
('DB08', 'Bình Dương FC', 'Việt Nam', 'nam', 'doiBong_1.jpg', 'ND002');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doi_bong_giai_dau`
--

CREATE TABLE `doi_bong_giai_dau` (
  `ma_doi_bong` varchar(255) NOT NULL,
  `ma_giai_dau` varchar(255) NOT NULL,
  `ten_doi_bong` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) NOT NULL,
  `ma_bang_dau` varchar(255) DEFAULT NULL,
  `hat_giong` enum('co','khong') NOT NULL DEFAULT 'khong',
  `diem_vong_loai` int(11) NOT NULL DEFAULT 0,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `doi_bong_giai_dau`
--

INSERT INTO `doi_bong_giai_dau` (`ma_doi_bong`, `ma_giai_dau`, `ten_doi_bong`, `logo`, `quoc_gia`, `ma_bang_dau`, `hat_giong`, `diem_vong_loai`, `ghi_chu`) VALUES
('db_0001', 'gd_0010', 'TP.HCM FC1', 'doiBong_1.jpg', 'Việt Nam', 'bd_0010', 'khong', 0, NULL),
('db_0002', 'gd_0001', 'TP.HCM FC2', 'Screenshot_2024-12-13_153759.png', 'Việt Nam', 'bd_0001', 'khong', 0, NULL),
('db_0002', 'gd_0010', 'TP.HCM FC2', 'Screenshot_2024-12-13_153759.png', 'Việt Nam', 'bd_0010', 'khong', 0, NULL),
('db_0003', 'gd_0001', 'Lê văn tiến', '', 'lê văn tiến', 'bd_0001', 'co', 0, NULL),
('db_0003', 'gd_0010', 'Lê văn tiến', '', 'lê văn tiến', 'bd_0010', 'co', 0, NULL),
('DB01', 'gd_0010', 'Hà Nội FC', 'cau_thu3.jpg', 'Việt Nam', 'bd_0011', 'khong', 0, NULL),
('DB02', 'gd_0001', 'TP.HCM FC3', 'Screenshot_2025-03-25_100427.png', 'Việt Nam', 'bd_0001', 'khong', 0, NULL),
('DB02', 'gd_0010', 'TP.HCM FC3', 'Screenshot_2025-03-25_100427.png', 'Việt Nam', 'bd_0011', 'co', 0, NULL),
('DB03', 'gd_0001', 'Hoàng Anh Gia Lai', '111.png', 'Việt Nam', 'bd_0002', 'co', 0, NULL),
('DB03', 'gd_0010', 'Hoàng Anh Gia Lai', '111.png', 'Việt Nam', 'bd_0011', 'khong', 0, NULL),
('DB04', 'gd_0001', 'Sông Lam Nghệ An', 'dataDoiThang', 'Việt Nam', 'bd_0001', 'khong', 0, NULL),
('DB04', 'gd_0010', 'Sông Lam Nghệ An', 'dataDoiThang', 'Việt Nam', 'bd_0012', 'co', 0, NULL),
('DB05', 'gd_0001', 'Bình Định FC', 'doiBong_1.jpg', 'Việt Nam', 'bd_0002', 'khong', 0, NULL),
('DB06', 'gd_0001', 'Công An Hà Nội', 'doiBong_1.jpg', 'Việt Nam', 'bd_0002', 'khong', 0, NULL),
('DB07', 'gd_0001', 'Đà Nẵng FC', 'doiBong_1.jpg', 'Việt Nam', 'bd_0006', 'khong', 0, NULL),
('DB07', 'gd_0010', 'Đà Nẵng FC', 'doiBong_1.jpg', 'Việt Nam', 'bd_0010', 'co', 0, NULL),
('DB08', 'gd_0001', 'Bình Dương FC', 'doiBong_1.jpg', 'Việt Nam', 'bd_0006', 'khong', 0, NULL),
('DB08', 'gd_0010', 'Bình Dương FC', 'doiBong_1.jpg', 'Việt Nam', 'bd_0012', 'khong', 0, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giai_dau`
--

CREATE TABLE `giai_dau` (
  `ma_giai_dau` varchar(255) NOT NULL,
  `ten_giai_dau` varchar(255) NOT NULL,
  `mo_ta` text DEFAULT NULL,
  `ngay_bat_dau` date NOT NULL,
  `ngay_ket_thuc` date NOT NULL,
  `ngay_ket_thuc_dang_ky_giai` date NOT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `ten_to_chuc` varchar(255) NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `giai_dau`
--

INSERT INTO `giai_dau` (`ma_giai_dau`, `ten_giai_dau`, `mo_ta`, `ngay_bat_dau`, `ngay_ket_thuc`, `ngay_ket_thuc_dang_ky_giai`, `gioi_tinh`, `ten_to_chuc`, `hinh_anh`) VALUES
('gd_0001', 'AFF333', 'gdhhdfddsf', '2000-01-02', '2002-02-03', '2026-01-01', 'nam', 'VFF', 'nor_circuit.png'),
('gd_0002', 'FIFA World Cup ', 'dsfsf', '2025-04-16', '2025-05-02', '2026-01-01', 'nam', 'dfsdf', 'cau_thu2.jpg'),
('gd_0003', 'UEFA Euro', 'giải đấu để kiểm trá', '2025-06-15', '2025-08-23', '2025-06-01', 'nam', 'dfsdf', 'tt4.jpg'),
('gd_0004', 'Giải Vô Địch Quốc Giadfsdf', 'sdfsdf', '2025-04-10', '2025-04-01', '2025-04-01', 'nam', 'sdfsdfds', NULL),
('gd_0005', 'bóng đá hhhhhh', 'ttttt', '2025-04-17', '2025-04-20', '2026-01-01', 'nam', 'lớp d22 new', NULL),
('gd_0006', 'Copa América ', 'caLe Văn Tiến', '2025-04-28', '2025-06-01', '2026-01-01', 'nam', 'Lê Văn Tiên', '0-Lê_Văn_Tiến.png'),
('gd_0007', 'Olympic Football', 'fgdfgdfh', '2025-06-01', '2025-06-08', '2026-01-01', 'nam', 'tiến tiến', 'Screenshot_2024-06-02_082426.png'),
('gd_0008', 'Hiếu', 'mô tả', '2025-06-14', '2025-06-28', '2025-06-07', 'nam', 'VFF', 'Screenshot_2024-12-15_154714.png'),
('gd_0009', 'tuaan', 'gdfsdfds', '2025-06-04', '2025-06-27', '2025-06-20', 'nam', 'giai dau tuan', 'debang.jpg'),
('gd_0010', 'Giải Đấu _ Lê Văn Tiến _main', 'test giải đấu', '2025-06-15', '2025-08-17', '2025-06-13', 'nam', 'Lê Văn Tiến', 'lich-thi-dau-bong-da-hom-nay-ngay12-41523479911-1280x800.jpg'),
('GD01', 'Giải Đấu Toàn Quốc', 'Giải đấu cấp quốc gia', '2025-05-01', '2025-12-01', '2025-12-01', 'nam', 'VFF', 'Screenshot_2024-06-18_115216.png'),
('GD02', 'Giải Trẻ Toàn Quốc', 'Giải đấu cho lứa trẻ', '2025-06-01', '2025-11-01', '2026-01-01', 'nữ', 'VFF', 'Screenshot_2025-05-03_162049.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ket_qua_tran_dau`
--

CREATE TABLE `ket_qua_tran_dau` (
  `ma_tran_dau` varchar(255) DEFAULT NULL,
  `so_ban_doi_1` int(11) DEFAULT 0,
  `so_ban_doi_2` int(11) DEFAULT 0,
  `ma_doi_thang` varchar(255) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_trong_tai`
--

CREATE TABLE `loai_trong_tai` (
  `ma_loai_trong_tai` varchar(255) NOT NULL,
  `ten_loai_trong_tai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `loai_trong_tai`
--

INSERT INTO `loai_trong_tai` (`ma_loai_trong_tai`, `ten_loai_trong_tai`) VALUES
('LT03', 'Trọng tài bàn'),
('LT01', 'Trọng tài chính'),
('LT02', 'Trọng tài phụ'),
('LT04', 'Trọng tài VAR');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `ma_nguoi_dung` varchar(255) NOT NULL,
  `tai_khoan` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(20) NOT NULL,
  `ngay_tao` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`ma_nguoi_dung`, `tai_khoan`, `ho_ten`, `gioi_tinh`, `email`, `so_dien_thoai`, `ngay_tao`) VALUES
('admin', 'admin', 'Lê Văn Tiến', 'nam', 'vantien18122002@gmail.com', '0123489785', '2025-06-04 17:00:00'),
('nd_0001', 'ql_doi1', 'Lê Văn Tuấn', 'nam', 'vantie11nn20dccn064@gmail.com', '033333333', '2025-05-28 17:00:00'),
('nd_0002', 'tk_0003', 'tk_0003', 'nam', '123@user.com', '1', '2025-06-04 17:00:00'),
('nd_0003', 'tk_0004', 'tk_0004', 'nam', '1111@gmail.com', '123', '2025-06-12 17:00:00'),
('ND002', 'user01', 'Trần Thị Miến', 'nữ', 'n20dccn064@student.ptithcm.edu.vn', '09123456781', '2025-03-22 10:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_van_dong`
--

CREATE TABLE `san_van_dong` (
  `ma_san` varchar(255) NOT NULL,
  `ten_san` varchar(255) NOT NULL,
  `dia_chi` text NOT NULL,
  `suc_chua` int(11) NOT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `san_van_dong`
--

INSERT INTO `san_van_dong` (`ma_san`, `ten_san`, `dia_chi`, `suc_chua`, `mo_ta`) VALUES
('SVD001', 'Sân Mỹ Đình', 'Hà Nội', 40000, 'Sân vận động lớn nhất Việt Nam'),
('SVD002', 'Sân Thống Nhất', 'TP. HCM', 25000, 'Sân vận động nổi tiếng ở TP. HCM'),
('SVD003', 'Sân Hòa Xuân', 'Đà Nẵng', 30000, 'Sân vận động tại Đà Nẵng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `tai_khoan` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `trang_thai` enum('Hoạt động','Bị khóa') DEFAULT 'Hoạt động',
  `ma_vai_tro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`tai_khoan`, `mat_khau`, `trang_thai`, `ma_vai_tro`) VALUES
('1111', '1111111111111111111111111', 'Hoạt động', 1),
('admin', '1', 'Hoạt động', 1),
('ql_doi1', '1', 'Bị khóa', 2),
('tk_0001', '1', 'Hoạt động', 2),
('tk_0002', '2', 'Hoạt động', 2),
('tk_0003', '1', 'Hoạt động', 2),
('tk_0004', '2', 'Hoạt động', 2),
('user01', '1', 'Hoạt động', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tran_dau`
--

CREATE TABLE `tran_dau` (
  `ma_tran_dau` varchar(255) NOT NULL,
  `ma_giai_dau` varchar(255) DEFAULT NULL,
  `ma_doi_1` varchar(255) DEFAULT NULL,
  `ma_doi_2` varchar(255) DEFAULT NULL,
  `ngay_dien_ra` date NOT NULL,
  `gio_dien_ra` time NOT NULL,
  `ma_san` varchar(255) DEFAULT NULL,
  `trang_thai` enum('Chưa diễn ra','Đang diễn ra','Hoàn tất','Hủy') DEFAULT 'Chưa diễn ra',
  `ma_vong_dau` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `tran_dau`
--

INSERT INTO `tran_dau` (`ma_tran_dau`, `ma_giai_dau`, `ma_doi_1`, `ma_doi_2`, `ngay_dien_ra`, `gio_dien_ra`, `ma_san`, `trang_thai`, `ma_vong_dau`) VALUES
('td_0001', 'gd_0010', 'db_0003', 'DB07', '2025-06-12', '12:51:00', 'SVD001', 'Chưa diễn ra', 'V1'),
('td_0002', 'gd_0010', 'db_0003', 'db_0002', '2025-06-12', '12:51:00', 'SVD003', 'Chưa diễn ra', 'V1'),
('td_0003', 'gd_0010', 'DB07', 'db_0001', '2025-06-12', '14:51:00', 'SVD001', 'Chưa diễn ra', 'V1'),
('td_0004', 'gd_0010', 'DB07', 'db_0002', '2025-06-12', '14:51:00', 'SVD002', 'Chưa diễn ra', 'V1'),
('td_0005', 'gd_0010', 'db_0001', 'db_0002', '2025-06-12', '14:51:00', 'SVD003', 'Chưa diễn ra', 'V1'),
('td_0006', 'gd_0010', 'DB02', 'DB01', '2025-06-12', '16:51:00', 'SVD001', 'Chưa diễn ra', 'V1'),
('td_0007', 'gd_0010', 'DB02', 'DB03', '2025-06-12', '16:51:00', 'SVD002', 'Chưa diễn ra', 'V1'),
('td_0008', 'gd_0010', 'DB01', 'DB03', '2025-06-12', '16:51:00', 'SVD003', 'Chưa diễn ra', 'V1'),
('td_0009', 'gd_0010', 'DB04', 'DB08', '2025-06-12', '18:51:00', 'SVD001', 'Chưa diễn ra', 'V1'),
('td_0010', 'gd_0010', 'db_0003', 'db_0001', '2025-06-12', '12:51:00', 'SVD002', 'Chưa diễn ra', 'V1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trong_tai`
--

CREATE TABLE `trong_tai` (
  `ma_trong_tai` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `gioi_tinh` enum('nam','nữ') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `trong_tai`
--

INSERT INTO `trong_tai` (`ma_trong_tai`, `ho_ten`, `ngay_sinh`, `hinh_anh`, `gioi_tinh`) VALUES
('tt_0002', 'Lê Văn Tuấn', '2025-05-16', 'tải_xuống.jpg', 'nam'),
('tt_0003', 'Lê Văn Tú', '2025-05-10', 'cau_thu2.jpg', 'nữ'),
('TT01', 'Nguyễn Văn tiến', '1985-05-15', 'tt3.jpg', 'nữ'),
('TT02', 'Trần Thị B', '1990-08-20', 'tt5.jpg', 'nữ'),
('TT03', 'Lê Minh C', '1987-11-10', 'tt4.jpg', 'nam'),
('TT04', 'Phạm Thị D', '1992-03-12', 'tt3.jpg', 'nữ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trong_tai_tran_dau`
--

CREATE TABLE `trong_tai_tran_dau` (
  `ma_tran_dau` varchar(255) NOT NULL,
  `ma_trong_tai` varchar(255) NOT NULL,
  `ma_loai_trong_tai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vai_tro`
--

CREATE TABLE `vai_tro` (
  `ma_vai_tro` int(11) NOT NULL,
  `ten_vai_tro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `vai_tro`
--

INSERT INTO `vai_tro` (`ma_vai_tro`, `ten_vai_tro`) VALUES
(1, 'Admin'),
(3, 'Người Dùng'),
(2, 'Quản lý đội bóng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vi_tri_cau_thu`
--

CREATE TABLE `vi_tri_cau_thu` (
  `ma_vi_tri` varchar(255) NOT NULL,
  `ten_vi_tri` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `vi_tri_cau_thu`
--

INSERT INTO `vi_tri_cau_thu` (`ma_vi_tri`, `ten_vi_tri`) VALUES
('vtct_0001', 'DD'),
('RWB', 'Hậu vệ cánh phải'),
('LWB', 'Hậu vệ cánh trái'),
('RB', 'Hậu vệ phải'),
('LB', 'Hậu vệ trái'),
('vtct_0002', 'Hậu vệ tráighfghgf'),
('CF', 'Hộ công'),
('GK', 'Thủ môn'),
('RW', 'Tiền đạo cánh phải'),
('LW', 'Tiền đạo cánh trái'),
('ST', 'Tiền đạo cắm'),
('RM', 'Tiền vệ cánh phải'),
('LM', 'Tiền vệ cánh trái'),
('CDM', 'Tiền vệ phòng ngự'),
('CAM', 'Tiền vệ tấn công'),
('CM', 'Tiền vệ trung tâm'),
('CB', 'Trung vệ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vong_dau`
--

CREATE TABLE `vong_dau` (
  `ma_vong_dau` varchar(255) NOT NULL,
  `ten_vong` varchar(50) NOT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `vong_dau`
--

INSERT INTO `vong_dau` (`ma_vong_dau`, `ten_vong`, `mo_ta`) VALUES
('V1', 'Vòng bảng', 'Giai đoạn vòng bảng của giải đấu'),
('V2', 'Tứ kết', 'Vòng tứ kết của giải đấu'),
('V3', 'Bán kết', 'Vòng bán kết của giải đấu'),
('V4', 'Chung kết', 'Trận chung kết của giải đấu');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bang_dau`
--
ALTER TABLE `bang_dau`
  ADD PRIMARY KEY (`ma_bang_dau`),
  ADD UNIQUE KEY `ma_bang_dau` (`ma_bang_dau`) USING BTREE,
  ADD UNIQUE KEY `uk_bang_giai` (`ma_bang_dau`,`ma_giai_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`);

--
-- Chỉ mục cho bảng `cau_thu`
--
ALTER TABLE `cau_thu`
  ADD PRIMARY KEY (`ma_cau_thu`),
  ADD KEY `ma_vi_tri` (`ma_vi_tri`),
  ADD KEY `ma_doi_bong` (`ma_doi_bong`);

--
-- Chỉ mục cho bảng `cau_thu_giai_dau`
--
ALTER TABLE `cau_thu_giai_dau`
  ADD PRIMARY KEY (`ma_cau_thu`,`ma_giai_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`),
  ADD KEY `ma_doi_bong` (`ma_doi_bong`),
  ADD KEY `ma_vi_tri` (`ma_vi_tri`);

--
-- Chỉ mục cho bảng `dang_ky_tham_gia_giai`
--
ALTER TABLE `dang_ky_tham_gia_giai`
  ADD PRIMARY KEY (`ma_giai_dau`,`ma_doi_bong`),
  ADD KEY `ma_doi_bong` (`ma_doi_bong`);

--
-- Chỉ mục cho bảng `doi_bong`
--
ALTER TABLE `doi_bong`
  ADD PRIMARY KEY (`ma_doi_bong`),
  ADD KEY `ma_ql_doi_bong` (`ma_ql_doi_bong`);

--
-- Chỉ mục cho bảng `doi_bong_giai_dau`
--
ALTER TABLE `doi_bong_giai_dau`
  ADD PRIMARY KEY (`ma_doi_bong`,`ma_giai_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`),
  ADD KEY `fk_bang_giai` (`ma_bang_dau`,`ma_giai_dau`);

--
-- Chỉ mục cho bảng `giai_dau`
--
ALTER TABLE `giai_dau`
  ADD PRIMARY KEY (`ma_giai_dau`);

--
-- Chỉ mục cho bảng `ket_qua_tran_dau`
--
ALTER TABLE `ket_qua_tran_dau`
  ADD UNIQUE KEY `ma_tran_dau` (`ma_tran_dau`),
  ADD KEY `ma_doi_thang` (`ma_doi_thang`);

--
-- Chỉ mục cho bảng `loai_trong_tai`
--
ALTER TABLE `loai_trong_tai`
  ADD PRIMARY KEY (`ma_loai_trong_tai`),
  ADD UNIQUE KEY `ten_loai_trong_tai` (`ten_loai_trong_tai`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`ma_nguoi_dung`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `tai_khoan` (`tai_khoan`);

--
-- Chỉ mục cho bảng `san_van_dong`
--
ALTER TABLE `san_van_dong`
  ADD PRIMARY KEY (`ma_san`),
  ADD UNIQUE KEY `ten_san` (`ten_san`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`tai_khoan`),
  ADD KEY `ma_vai_tro` (`ma_vai_tro`);

--
-- Chỉ mục cho bảng `tran_dau`
--
ALTER TABLE `tran_dau`
  ADD PRIMARY KEY (`ma_tran_dau`),
  ADD KEY `ma_giai_dau` (`ma_giai_dau`),
  ADD KEY `ma_doi_1` (`ma_doi_1`),
  ADD KEY `ma_doi_2` (`ma_doi_2`),
  ADD KEY `ma_san` (`ma_san`),
  ADD KEY `ma_vong_dau` (`ma_vong_dau`);

--
-- Chỉ mục cho bảng `trong_tai`
--
ALTER TABLE `trong_tai`
  ADD PRIMARY KEY (`ma_trong_tai`);

--
-- Chỉ mục cho bảng `trong_tai_tran_dau`
--
ALTER TABLE `trong_tai_tran_dau`
  ADD PRIMARY KEY (`ma_tran_dau`,`ma_trong_tai`),
  ADD KEY `ma_trong_tai` (`ma_trong_tai`),
  ADD KEY `ma_loai_trong_tai` (`ma_loai_trong_tai`);

--
-- Chỉ mục cho bảng `vai_tro`
--
ALTER TABLE `vai_tro`
  ADD PRIMARY KEY (`ma_vai_tro`),
  ADD UNIQUE KEY `ten_vai_tro` (`ten_vai_tro`);

--
-- Chỉ mục cho bảng `vi_tri_cau_thu`
--
ALTER TABLE `vi_tri_cau_thu`
  ADD PRIMARY KEY (`ma_vi_tri`),
  ADD UNIQUE KEY `ten_vi_tri` (`ten_vi_tri`);

--
-- Chỉ mục cho bảng `vong_dau`
--
ALTER TABLE `vong_dau`
  ADD PRIMARY KEY (`ma_vong_dau`),
  ADD UNIQUE KEY `ten_vong` (`ten_vong`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bang_dau`
--
ALTER TABLE `bang_dau`
  ADD CONSTRAINT `bang_dau_ibfk_1` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`);

--
-- Các ràng buộc cho bảng `cau_thu`
--
ALTER TABLE `cau_thu`
  ADD CONSTRAINT `cau_thu_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri_cau_thu` (`ma_vi_tri`),
  ADD CONSTRAINT `cau_thu_ibfk_2` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`);

--
-- Các ràng buộc cho bảng `cau_thu_giai_dau`
--
ALTER TABLE `cau_thu_giai_dau`
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_1` FOREIGN KEY (`ma_cau_thu`) REFERENCES `cau_thu` (`ma_cau_thu`),
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_2` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_3` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `cau_thu_giai_dau_ibfk_4` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri_cau_thu` (`ma_vi_tri`);

--
-- Các ràng buộc cho bảng `dang_ky_tham_gia_giai`
--
ALTER TABLE `dang_ky_tham_gia_giai`
  ADD CONSTRAINT `dang_ky_tham_gia_giai_ibfk_1` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `dang_ky_tham_gia_giai_ibfk_2` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`);

--
-- Các ràng buộc cho bảng `doi_bong`
--
ALTER TABLE `doi_bong`
  ADD CONSTRAINT `doi_bong_ibfk_1` FOREIGN KEY (`ma_ql_doi_bong`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`);

--
-- Các ràng buộc cho bảng `doi_bong_giai_dau`
--
ALTER TABLE `doi_bong_giai_dau`
  ADD CONSTRAINT `doi_bong_giai_dau_ibfk_1` FOREIGN KEY (`ma_doi_bong`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `doi_bong_giai_dau_ibfk_2` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `doi_bong_giai_dau_ibfk_3` FOREIGN KEY (`ma_bang_dau`) REFERENCES `bang_dau` (`ma_bang_dau`),
  ADD CONSTRAINT `fk_bang_giai` FOREIGN KEY (`ma_bang_dau`,`ma_giai_dau`) REFERENCES `bang_dau` (`ma_bang_dau`, `ma_giai_dau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `ket_qua_tran_dau`
--
ALTER TABLE `ket_qua_tran_dau`
  ADD CONSTRAINT `ket_qua_tran_dau_ibfk_1` FOREIGN KEY (`ma_tran_dau`) REFERENCES `tran_dau` (`ma_tran_dau`),
  ADD CONSTRAINT `ket_qua_tran_dau_ibfk_2` FOREIGN KEY (`ma_doi_thang`) REFERENCES `doi_bong` (`ma_doi_bong`);

--
-- Các ràng buộc cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD CONSTRAINT `nguoi_dung_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `tai_khoan` (`tai_khoan`);

--
-- Các ràng buộc cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `tai_khoan_ibfk_1` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vai_tro` (`ma_vai_tro`);

--
-- Các ràng buộc cho bảng `tran_dau`
--
ALTER TABLE `tran_dau`
  ADD CONSTRAINT `tran_dau_ibfk_1` FOREIGN KEY (`ma_giai_dau`) REFERENCES `giai_dau` (`ma_giai_dau`),
  ADD CONSTRAINT `tran_dau_ibfk_2` FOREIGN KEY (`ma_doi_1`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `tran_dau_ibfk_3` FOREIGN KEY (`ma_doi_2`) REFERENCES `doi_bong` (`ma_doi_bong`),
  ADD CONSTRAINT `tran_dau_ibfk_4` FOREIGN KEY (`ma_san`) REFERENCES `san_van_dong` (`ma_san`),
  ADD CONSTRAINT `tran_dau_ibfk_5` FOREIGN KEY (`ma_vong_dau`) REFERENCES `vong_dau` (`ma_vong_dau`);

--
-- Các ràng buộc cho bảng `trong_tai_tran_dau`
--
ALTER TABLE `trong_tai_tran_dau`
  ADD CONSTRAINT `trong_tai_tran_dau_ibfk_1` FOREIGN KEY (`ma_tran_dau`) REFERENCES `tran_dau` (`ma_tran_dau`),
  ADD CONSTRAINT `trong_tai_tran_dau_ibfk_2` FOREIGN KEY (`ma_trong_tai`) REFERENCES `trong_tai` (`ma_trong_tai`),
  ADD CONSTRAINT `trong_tai_tran_dau_ibfk_3` FOREIGN KEY (`ma_loai_trong_tai`) REFERENCES `loai_trong_tai` (`ma_loai_trong_tai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
