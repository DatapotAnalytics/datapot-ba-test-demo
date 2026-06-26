# Dataset Contract — Hệ thống quản lý lịch dạy

> **Mục đích:** Tài liệu này mô tả **dữ liệu đầu vào** mà hệ thống của bạn (bước 2, 4, 5) nhận từ
> bước 1 (tạo & phân công lịch) và bước 3 (phát hiện xung đột tự động).
>
> Điền vào đây **trước khi** vẽ process flow và ERD — giả định dữ liệu quyết định thiết kế model.

---

## Producer — Consumer

| Vai trò | Hệ thống |
|---|---|
| **Producer** | Bước 1 — Tạo & phân công lịch; Bước 3 — Phát hiện xung đột |
| **Consumer** | Hệ thống của bạn: Bước 2 (xác nhận) · Bước 4 (thay đổi) · Bước 5 (xem lịch) |

---

## Thực thể đầu vào

> Với mỗi thực thể, liệt kê các trường mà upstream cung cấp. Đây là **giả định** — ghi rõ nếu không chắc.

### Session — Buổi dạy

| Trường | Kiểu dữ liệu | Nullable | Mô tả | Ví dụ |
|---|---|---|---|---|
| session_id | string / UUID | No | Mã định danh duy nhất của buổi | `"S-2026-001"` |
| subject | string | No | Tên môn / buổi học | `"Python cơ bản"` |
| date | date (YYYY-MM-DD) | No | Ngày diễn ra | `2026-07-01` |
| start_time | time (HH:MM) | No | Giờ bắt đầu | `08:00` |
| end_time | time (HH:MM) | No | Giờ kết thúc | `10:00` |
| room | string | Yes | Phòng học | `"P.201"` |
| status | enum | No | Trạng thái hiện tại | <<< liệt kê các giá trị có thể >>> |
| <<< thêm trường >>> | | | | |

### Assignment — Phân công

| Trường | Kiểu dữ liệu | Nullable | Mô tả | Ví dụ |
|---|---|---|---|---|
| assignment_id | string / UUID | No | Mã phân công | `"A-001"` |
| session_id | FK → Session | No | Buổi được phân công | |
| user_id | FK → User | No | Người được phân công | |
| role_in_session | enum | No | Vai trò trong buổi | `"gv"` / `"ta"` |
| assigned_at | datetime | No | Thời điểm phân công | |
| <<< thêm trường >>> | | | | |

### User — Người dùng

| Trường | Kiểu dữ liệu | Nullable | Mô tả | Ví dụ |
|---|---|---|---|---|
| user_id | string / UUID | No | Mã người dùng | |
| full_name | string | No | Họ tên | `"Nguyễn Văn An"` |
| role | enum | No | Vai trò trong hệ thống | `"gv"` / `"ta"` / `"coordinator"` |
| email | string | No | Email liên hệ & thông báo | |
| <<< thêm trường >>> | | | | |

### ConflictFlag — Xung đột (đầu ra từ bước 3)

> Bước 3 phát hiện xung đột và đánh dấu. Bạn cần biết hệ thống nhận thông tin này như thế nào.

| Trường | Kiểu dữ liệu | Nullable | Mô tả | Ví dụ |
|---|---|---|---|---|
| <<< tự định nghĩa dựa trên phân tích >>> | | | | |

---

## Ràng buộc & kỳ vọng

| Mục | Giá trị |
|---|---|
| Tần suất cập nhật dữ liệu từ bước 1 | <<< real-time / batch / on-demand >>> |
| Cơ chế truyền | <<< API call / event / shared DB / queue >>> |
| Encoding | <<< UTF-8 >>> |
| Xử lý khi thiếu trường | <<< mô tả >>> |
| Xử lý khi session bị xóa bởi bước 1 | <<< mô tả — ảnh hưởng đến assignment và change request >>> |

---

## Câu hỏi mở (ghi lại nếu chưa rõ)

<<< ví dụ:
- Một buổi có thể có nhiều GV không?
- Bước 3 có tự động reject assignment khi có xung đột, hay chỉ gắn cờ?
- Ai có quyền tạo User mới?
>>>
