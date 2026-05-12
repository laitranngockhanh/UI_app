# Music App - Modern Web Music Player

Ứng dụng trình phát nhạc trực tuyến với giao diện hiện đại, hỗ trợ quản lý album, danh sách phát và tích hợp thông tin thời tiết. Dự án được xây dựng theo mô hình PWA (Progressive Web App) cho phép trải nghiệm mượt mà ngay cả khi ngoại tuyến.

## 🌟 Tính năng chính

- **Trình phát nhạc chuyên nghiệp:** Đầy đủ các tính năng Play/Pause, Next/Prev, Random, Loop bài hát.
- **Quản lý Album & Playlist:** Tạo album mới, thêm/xóa bài hát vào album cá nhân một cách dễ dàng.
- **Đồng bộ hóa mượt mà:** Sử dụng API để quản lý bài hát và thông tin người dùng từ máy chủ.
- **Chế độ ngoại tuyến (Offline):** Tích hợp Service Worker và IndexedDB giúp lưu trữ và phát lại nhạc ngay cả khi không có kết nối mạng.
- **Thời tiết:** Xem thông tin thời tiết thời gian thực ngay trên giao diện ứng dụng.
- **Bảo mật:** Hệ thống đăng nhập/đăng xuất giúp bảo vệ dữ liệu cá nhân của người dùng.
- **Giao diện Responsive:** Thiết kế tối ưu cho cả máy tính để bàn và thiết bị di động.

## 🛠️ Công nghệ sử dụng

- **Frontend:** HTML5, CSS3 (Vanilla CSS), JavaScript (ES6+).
- **Storage:** IndexedDB (cho dữ liệu nhạc offline), LocalStorage (cho trạng thái người dùng).
- **Service Worker:** Quản lý cache và hỗ trợ PWA.
- **Icons:** FontAwesome & Boxicons.
- **Typography:** Google Fonts (Inter, Roboto, Outfit).

## 🚀 Cài đặt & Sử dụng

1. **Clone project:**
   ```bash
   git clone https://github.com/laitranngockhanh/UI_app.git
   ```
2. **Cấu hình:**
   Đảm bảo bạn có kết nối tới máy chủ API tại địa chỉ đã cấu hình trong `js/api.js`.
3. **Chạy ứng dụng:**
   Mở file `html/index.html` trên trình duyệt hoặc sử dụng các công cụ Live Server để có trải nghiệm tốt nhất.

## 📱 Trải nghiệm PWA

Ứng dụng hỗ trợ cài đặt trực tiếp lên màn hình điện thoại hoặc máy tính thông qua trình duyệt (Chrome, Edge, Safari) nhờ vào cấu hình `manifest.json` và Service Worker.

---

*Phát triển bởi [Ngọc Khánh](https://github.com/laitranngockhanh)*
