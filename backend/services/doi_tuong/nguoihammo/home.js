
const dayList = document.getElementById('day-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const loai_GiaiDau_all = "ALL_giaiDau_today";
const spanTieuDe = document.getElementById("tieuDeLichThi");

const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const matchListElement = document.getElementById("lichThiDauHomNay_list");
let offset = -5; // Bắt đầu từ 5 ngày trước hôm nay
const range = 10; // Số ngày hiển thị

let selectedDateElement = null;


const urlParams = new URLSearchParams(window.location.search);
let ngay_xem_param = urlParams.get('ngay_xem');
let ma_giai_dau_param = urlParams.get('ma_giai_dau'); // 123



const scheduleData = [
    {
        giai: "Ngoại hạng Anh",
        vong: "Vòng 29 - đá muộn",
        matches: [
            {
                time: "01:30 17/04",
                team1: "Newcastle United",
                logo1: "https://storage.googleapis.com/a1aa/image/7f6d2c3a-29ae-4421-671c-1f4721bcbb5a.jpg",
                score: "5 - 0",
                team2: "Crystal Palace",
                logo2: "https://storage.googleapis.com/a1aa/image/fbbc6447-ff4a-4c62-2e57-d9aefdc5b652.jpg",
            }
        ]
    },
    {
        giai: "CUP C1",
        vong: "Tứ kết",
        matches: [
            {
                time: "02:00 17/04",
                team1: "Real Madrid",
                logo1: "https://storage.googleapis.com/a1aa/image/c35fad8f-b462-4c02-1d22-6792534d490e.jpg",
                score: "1 - 2",
                team2: "Arsenal",
                logo2: "https://storage.googleapis.com/a1aa/image/801511bf-877a-4cb3-2c97-5f3b48391929.jpg",
            },
            {
                time: "02:00 17/04",
                team1: "Inter Milan",
                logo1: "https://storage.googleapis.com/a1aa/image/c32a2cb3-18e1-4de9-2dc1-c8a4632f478e.jpg",
                score: "2 - 2",
                team2: "Bayern Munich",
                logo2: "https://storage.googleapis.com/a1aa/image/1ff3853b-ec93-4cd1-4cd3-1f8f11028fbc.jpg",
            }
        ]
    },
    // Tương tự cho các giải đấu khác...
];




document.addEventListener("DOMContentLoaded", async function () {

    // Khởi tạo lịch ban đầu
    renderDays();

    // lichThiDauHomNay_list();
    // Lấy tham số từ URL hiện tại

    // nếu không thì lấy bình thường 
    if (urlParams.size === 0) {
        ma_giai_dau_param = loai_GiaiDau_all;
    }
    await view_danhSach_tranDau_vs_giaiDau(ngay_xem_param, ma_giai_dau_param);

    // await view_tranDau_nhieuGiai("schedule");

    // if (ma_giai_dau_param === "ALL_giaiDau_today") {
    //     view_ALL_giaiDau_toDay();
    //     await danhSach_giaiDau_HomNay
    // }
    // else {
    //     view_theoMaGiaiDau_toDay(ma_giai_dau_param);
    // }



    // Sự kiện cho các mục Bảng xếp hạng và Kết quả thi đấu
    document.getElementById("ranking").addEventListener("click", function () {
        console.log("Bạn đã chọn Bảng xếp hạng");
    });

    document.getElementById("result").addEventListener("click", function () {
        console.log("Bạn đã chọn Kết quả thi đấu");
    });
    // Xử lý nút next/prev để chuyển ngày
    prevBtn.addEventListener('click', () => {
        offset -= 1;
        renderDays();
    });

    nextBtn.addEventListener('click', () => {
        offset += 1;
        renderDays();
    });




});

// function view_theoMaGiaiDau_toDay(ma_giai_dau_param) {

// }
// function view_ALL_giaiDau_toDay() {

// }







document.getElementById('lich').addEventListener('click', function () {
    const calendarContainer = document.getElementById('calendarContainer');
    const dateInput = document.getElementById('ngayDienRa');

    // Nếu đang ẩn thì hiển thị trước
    const isHidden = calendarContainer.classList.contains('hidden');

    if (isHidden) {
        calendarContainer.classList.remove('hidden');

        // Đợi DOM cập nhật xong rồi mới gọi showPicker
        requestAnimationFrame(() => {
            if (typeof dateInput.showPicker === 'function') {
                dateInput.showPicker();
            } else {
                dateInput.focus();
            }
        });

        console.log("📅 Lịch đang hiển thị");
    } else {
        calendarContainer.classList.add('hidden');
        console.log("📅 Lịch đang ẩn");
    }
});

async function view_danhSach_tranDau_vs_giaiDau(ngay_xem_param, ma_giai_dau_param) {
    console.log("ma_giai_dau_param : ", ma_giai_dau_param);
    console.log("ngay_xem : ", ngay_xem_param);
    spanTieuDe.textContent = `Lịch thi ngày ${ngay_xem_param}`;

    // hiện thị danh sách giải
    await view_giaiDau_theoNgay(ngay_xem_param);

    // hiện thị danh sách trận đấu


    ///////////////////    // await view_tranDau_motGiai("schedule"); ////////////////////////////////////////////////////

    // test
    // await danhSach_tranDau_thuoc_giaiDau_TheoNgay(ngay_xem_param, ma_giai_dau_param);
    await view_tranDau_motGiai("schedule");

    // await view_


}



//ok
// Hàm render ngày
function renderDays() {
    dayList.innerHTML = ''; // Xóa nội dung cũ

    const today = new Date();
    for (let i = offset; i < offset + range; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);

        const isToday = i === 0;
        const dayName = isToday ? 'Hôm nay' : days[date.getDay()];
        const dayNumber = date.getDate();
        const fullDate = date.toISOString().split('T')[0];

        // Tạo phần tử cho ngày
        const dayItem = document.createElement('div');
        dayItem.className = `cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 ${isToday ? 'text-orange-500 font-bold' : ''}`;
        dayItem.setAttribute('data-date', fullDate);
        dayItem.innerHTML = `
                <div>${dayName}</div>
                <div class="font-bold text-gray-700 text-sm">${dayNumber}</div>
            `;

        // Sự kiện click vào ngày
        dayItem.addEventListener('click', function () {
            if (selectedDateElement) {
                selectedDateElement.classList.remove('bg-orange-100', 'ring', 'ring-orange-400');
            }
            dayItem.classList.add('bg-orange-100', 'ring', 'ring-orange-400');
            selectedDateElement = dayItem;

            console.log('Ngày được chọn:', fullDate);
            const url = `/frontend/view/nguoihammo/home.html?ngay_xem=${fullDate}&ma_giai_dau=${loai_GiaiDau_all}`;
            //frontend/view/nguoihammo/home.html?ngay_xem=1&ma_giai_dau=GD01
            window.location.href = url; // Chuyển trang
        });

        dayList.appendChild(dayItem);
    }
}

// trường họp có mã giải đấu trước đã
async function ham_danhSach_tranDau_thuoc_giaiDau_TheoNgay(ngay, maGiaiDau) {
    console.log(ngay);
    console.log(maGiaiDau);
    const data_tranDau = await hamChung.layDanhSach("tran_dau");
    const tranDau_theoNgay = data_tranDau.filter(tran => tran.ngay_dien_ra === ngay);
    console.log(tranDau_theoNgay);
    const tranDau_thuoc_giaiDau_theoNgay = tranDau_theoNgay.filter(tranD => tranD.ma_giai_dau === maGiaiDau);
    console.log(tranDau_thuoc_giaiDau_theoNgay);
    return tranDau_thuoc_giaiDau_theoNgay;
}

// ok
// Hàm lọc danh sách giải đấu theo ngày truyền vào
async function danhSach_giaiDau_TheoNgay(ngay) {
    const data_tranDau = await hamChung.layDanhSach("tran_dau");
    const tranDau_theoNgay = data_tranDau.filter(tran => tran.ngay_dien_ra === ngay);
    const maGiaiDauTheoNgay = tranDau_theoNgay.map(tran => tran.ma_giai_dau);
    const maGiaiDauDuyNhat = [...new Set(maGiaiDauTheoNgay)];
    return maGiaiDauDuyNhat;
}


// async function danhSach_tranDau_theo_giaiDau_theo_ngay(ma_giai_dau) {
//     const data_tranDau = await hamChung.layDanhSach("tran_dau");
//     const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng YYYY-MM-DD

//     const tranDau_theoGiaiDauHomNay = data_tranDau.filter(tran =>
//         tran.ngay_dien_ra === today && tran.ma_giai_dau === ma_giai_dau
//     );

//     return tranDau_theoGiaiDauHomNay;
// }

// ok
async function view_giaiDau_theoNgay(ngay) {
    // ok
    console.log(ngay);
    const maGiaiDauDuyNhat_theoNgay = await danhSach_giaiDau_TheoNgay(ngay);
    console.log(maGiaiDauDuyNhat_theoNgay);

    maGiaiDauDuyNhat_theoNgay.forEach(async maGiaiDau => {
        const giaiDau = await hamChung.layThongTinTheo_ID("giai_dau", maGiaiDau);

        // Tạo phần tử span cho mỗi giải đấu
        const span = document.createElement("span");
        span.textContent = giaiDau.ten_giai_dau; // In ra tên giải đấu
        span.classList.add("cursor-pointer", "p-2", "block", "text-gray-800", "hover:bg-gray-200", "rounded");

        // Thêm phần tử span vào danh sách
        matchListElement.appendChild(span);

        // Thêm sự kiện click cho mỗi lựa chọn
        span.addEventListener("click", () => {

            console.log(`Đã chọn giải đấu: ${giaiDau.ten_giai_dau}`);
            // const url = `/frontend/view/nguoihammo/home.html?ma_giai_dau=${giaiDau.ma_giai_dau}`;
            const url = `/frontend/view/nguoihammo/home.html?ngay_xem=${ngay}&ma_giai_dau=${giaiDau.ma_giai_dau}`;
            
            console.log(url);
            window.location.href = url; // Chuyển trang
        });
    });

    // Thêm sự kiện click vào phần tử span của tiêu đề
    const lichThiDauHomNayTitle = document.querySelector("#lichThiDauHomNay_list .text-green-600");
    lichThiDauHomNayTitle.addEventListener("click", () => {
        console.log("Đã chọn Lịch thi đấu hôm nay");
        const url = `/frontend/view/nguoihammo/home.html?ngay_xem=${ngay} ma_giai_dau=${loai_GiaiDau_all}`;
        window.location.href = url; // Chuyển trang
        console.log(url);
        // Xử lý khi người dùng click vào tiêu đề "Lịch thi đấu hôm nay"
    });


}


async function view_tranDau_nhieuGiai(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Xóa nội dung cũ

    scheduleData.forEach(giai => {
        // Hiển thị thông tin giải đấu
        const sectionHTML = `
            <div class="bg-gray-200 text-center py-2 mb-4 text-sm text-gray-700 font-semibold">
                Lịch thi đấu
                <span class="font-bold">${giai.giai}</span> -
                <span class="text-gray-500">${giai.vong}</span>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", sectionHTML);

        // Hiển thị các trận đấu trong giải
        giai.matches.forEach(match => {
            const matchHTML = `
                <div class="flex items-center justify-between border-b border-gray-200 py-3">
                    <div class="font-bold text-sm w-24">${match.time}</div>
                    <div class="flex items-center space-x-2 flex-1 justify-center text-sm">
                        <div>${match.team1}</div>
                        <img src="${match.logo1}" class="w-6 h-6" />
                        <div class="border border-green-600 rounded-full text-green-600 font-semibold px-3 py-0.5">${match.score}</div>
                        <img src="${match.logo2}" class="w-6 h-6" />
                        <div>${match.team2}</div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", matchHTML);
        });
    });
}


async function view_tranDau_motGiai(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !scheduleData || scheduleData.length === 0) return;

    container.innerHTML = ""; // Xóa nội dung cũ

    const giai = scheduleData[0]; // Chỉ lấy giải đầu tiên
    const dataDDanhSach_tranDau_thuoc_giaiDau_TheoNgay = await ham_danhSach_tranDau_thuoc_giaiDau_TheoNgay(ngay_xem_param, ma_giai_dau_param);
    const data = dataDDanhSach_tranDau_thuoc_giaiDau_TheoNgay;
    console.log(ngay_xem_param + " " + ma_giai_dau_param);

    console.log(data);
    // Hiển thị thông tin giải đấu
    const sectionHTML = `
        <div class="bg-gray-200 text-center py-2 mb-4 text-sm text-gray-700 font-semibold">
            Lịch thi đấu
            <span class="font-bold">${data.maGiaiDau}</span> -
            <span class="text-gray-500">${data.maGiaiDau}</span>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", sectionHTML);

    // Hiển thị các trận đấu trong giải
    data.forEach(match => {
        const matchHTML = `
            <div class="flex items-center justify-between border-b border-gray-200 py-3">
                <div class="font-bold text-sm w-24">${match.gio_dien_ra}</div>
                <div class="flex items-center space-x-2 flex-1 justify-center text-sm">
                    <div>${match.ma_doi_1}</div>
                    <img src="${match.logo1}" class="w-6 h-6" />
                    <div class="border border-green-600 rounded-full text-green-600 font-semibold px-3 py-0.5">${match.score}</div>
                    <img src="${match.logo2}" class="w-6 h-6" />
                    <div>${match.ma_doi_2}</div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", matchHTML);
    });
}

