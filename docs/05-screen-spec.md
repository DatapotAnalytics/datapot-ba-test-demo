# Screen Specification — Màn hình prototype

> **Mục đích:** Mô tả chi tiết từng màn cốt lõi: ai dùng, câu hỏi nghiệp vụ cần trả lời,
> dữ liệu hiển thị, hành động người dùng, trạng thái UI, và bộ lọc.
>
> Điền vào đây **trước khi** code prototype — spec này là nguồn thật để prototype implement theo.

---

## Màn 1 — Xác nhận lịch (Bước 2)

**Đối tượng chính:** Giảng viên (GV), Trợ giảng (TA)

**Câu hỏi nghiệp vụ màn này phải trả lời:**
1. Tôi có buổi dạy nào đang chờ tôi xác nhận?
2. Tôi đã xác nhận / từ chối những buổi nào (và lý do)?
3. <<< thêm câu hỏi >>>

**Dữ liệu hiển thị:**

| Trường | Nguồn | Ghi chú |
|---|---|---|
| Tên buổi / môn học | Session.subject | |
| Ngày, giờ, phòng | Session.date / time / room | |
| Trạng thái xác nhận | Assignment.status | pending / confirmed / rejected |
| Lý do từ chối | Assignment.reject_reason | chỉ hiển thị nếu rejected |
| <<< thêm >>> | | |

**Hành động người dùng:**

| Hành động | Điều kiện | Kết quả |
|---|---|---|
| Xác nhận | status = pending | status → confirmed; gửi thông báo Coordinator |
| Từ chối (kèm lý do) | status = pending | status → rejected; lý do được lưu; gửi thông báo |
| <<< thêm >>> | | |

**Bộ lọc / điều hướng:**
- <<< lọc theo trạng thái (tất cả / chờ / đã xác nhận / từ chối) >>>
- <<< lọc theo khoảng thời gian >>>

**Trạng thái UI đặc biệt:**
- <<< màn trống khi không có buổi nào >>>
- <<< thông báo sau khi xác nhận / từ chối thành công >>>

---

## Màn 2 — Thay đổi lịch (Bước 4)

**Đối tượng:**
- GV / TA: gửi yêu cầu thay đổi
- Coordinator: xem danh sách yêu cầu và phê duyệt / từ chối

**Câu hỏi nghiệp vụ màn này phải trả lời:**
1. (GV/TA) Tôi cần đổi / hủy buổi nào, và yêu cầu của tôi đang ở trạng thái gì?
2. (Coordinator) Có bao nhiêu yêu cầu đang chờ tôi xử lý?
3. <<< thêm câu hỏi >>>

**Sub-view A — Form gửi yêu cầu (GV / TA):**

| Trường nhập | Bắt buộc | Ghi chú |
|---|---|---|
| Chọn buổi cần thay đổi | Yes | dropdown buổi đang active |
| Loại yêu cầu (đổi lịch / hủy) | Yes | |
| Ngày mới đề xuất | Nếu đổi lịch | |
| Lý do | Yes | |

**Sub-view B — Danh sách yêu cầu đang xử lý:**

| Trường | Nguồn | Ghi chú |
|---|---|---|
| Buổi liên quan | Session.subject + date | |
| Loại yêu cầu | ChangeRequest.type | |
| Người gửi | User.full_name | |
| Trạng thái | ChangeRequest.status | pending / approved / rejected |
| <<< thêm >>> | | |

**Hành động:**

| Hành động | Ai thực hiện | Kết quả |
|---|---|---|
| Gửi yêu cầu | GV / TA | tạo ChangeRequest status=pending; thông báo Coordinator |
| Phê duyệt | Coordinator | status → approved; <<< cập nhật Session? >>>; thông báo GV/TA |
| Từ chối | Coordinator | status → rejected; lý do; thông báo GV/TA |
| <<< thêm >>> | | |

**Câu hỏi mở cần làm rõ:**
- <<< Nếu Coordinator phê duyệt "đổi lịch", ai thực hiện đổi trên hệ thống (bước 1)? >>>
- <<< GV/TA có thể hủy yêu cầu đã gửi không? >>>

---

## Màn 3 — Lịch tổng & cá nhân (Bước 5)

**Đối tượng:**
- GV / TA: xem lịch cá nhân
- Coordinator: xem lịch tổng toàn bộ

**Câu hỏi nghiệp vụ màn này phải trả lời:**
1. Tuần / tháng này tôi có những buổi nào, vào lúc nào?
2. (Coordinator) Ai đang dạy buổi nào? Có buổi nào chưa có GV/TA không?
3. <<< thêm câu hỏi >>>

**Chế độ xem:**

| Chế độ | Mô tả |
|---|---|
| Tuần | lưới 7 cột, mỗi ô là 1 ngày, hiển thị buổi trong ngày |
| Tháng | <<< mô tả layout >>> |
| Danh sách | bảng sắp xếp theo ngày, kèm trạng thái |

**Dữ liệu hiển thị trên mỗi "event":**
- <<< tên môn, giờ, phòng, trạng thái >>>

**Bộ lọc:**
- <<< theo tuần / tháng >>>
- <<< (Coordinator) lọc theo GV hoặc TA cụ thể >>>
- <<< lọc theo trạng thái buổi >>>

**Hành động:**
- <<< bấm vào buổi → xem chi tiết / đi đến màn xác nhận >>>
- <<< xuất lịch (CSV / iCal)? >>>
