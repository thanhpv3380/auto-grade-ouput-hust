# I. Hướng dẫn cài đặt  
1. Cài đặt nodejs: https://nodejs.org/en/download/
2. Clone code về máy:  
```
git clone https://github.com/thanhpv3380/auto-grade-ouput-hust.git && cd auto-grade-ouput-hust
```

3. Cài đặt các gói cần thiết 
``` 
npm install 
```

4. Cài đặt trình duyệt Microsoft Edge (nếu chưa có)

# II. Auto lấy bảng điểm cá nhân  
1. Tạo file .env theo mẫu trong file env
- **EMAIL** là mã số sinh viên do trường cung cấp  
- **PASSWORD** là mật khẩu để đăng nhập vào hệ thống ctt-sis  

2. Mở cmd của thư mục hiện tại và chạy code
```
npm start
```

3. Khi đăng nhập bạn sẽ có 8s để nhập mã captcha. Sau khi nhập xong **KHÔNG** được ấn nút **Đăng Nhập**, bot sẽ tự động thực hiện

4. Mọi thứ tiếp tục được chạy tự động, không can thiệp vào cửa sổ trình duyệt trong quá trình chạy. Sau khi bot chạy xong, bảng điểm sẽ được hiện lên màn hình console của cmd


