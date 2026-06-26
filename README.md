# BA Take-Home — Hệ thống quản lý lịch dạy

## 1. Đề bài (tóm tắt)

Bạn được yêu cầu phân tích và prototype một **hệ thống quản lý lịch dạy** cho mảng đào tạo.

**Ba actor:** Coordinator (Điều phối), Giảng viên (GV), Trợ giảng (TA).

**Luồng đầy đủ gồm 5 bước** — bước 1 (tạo & phân công lịch) và bước 3 (phát hiện xung đột tự động) đã có sẵn trong hệ thống. Bạn chỉ cần phân tích và prototype 3 bước còn lại:

- **Bước 2 — Nhận & xác nhận lịch:** GV/TA xác nhận hoặc từ chối buổi dạy được phân công (kèm lý do nếu từ chối).
- **Bước 4 — Thay đổi lịch:** GV/TA gửi yêu cầu đổi/hủy buổi → Coordinator phê duyệt hoặc từ chối → hệ thống thông báo.
- **Bước 5 — Xem lịch tổng & cá nhân:** calendar theo tuần/tháng và danh sách buổi dạy của từng người.

---

## 2. Việc cần làm

| Output | File | Mô tả |
|---|---|---|
| Requirements | `docs/01-requirements.md` | Problem statement, actors, assumptions, glossary |
| User Stories | `docs/02-user-stories.md` | Stories theo format Given/When/Then + MoSCoW |
| Process Flow | `docs/03-process-flow.md` | Sơ đồ luồng bằng Mermaid |
| Data Model / ERD | `docs/04-data-model.md` | ERD bằng Mermaid + mô tả entity |
| Prototype tương tác | `prototype/index.html` | 3 màn cốt lõi, mở được trực tiếp trên browser |

---

## 3. Cách làm bài

1. **Fork** repo này về tài khoản GitHub cá nhân của bạn (nút **Fork** góc trên bên phải).
2. Clone về máy, làm bài trực tiếp trên nhánh `main`.
3. Mở và điền nội dung vào các file trong thư mục `docs/`:
   - Xóa các placeholder `<<< ... >>>` và thay bằng phân tích của bạn.
   - Xóa ví dụ mẫu (có nhãn "ví dụ — xóa") và thay bằng nội dung thực.
4. Mở rộng prototype trong `prototype/` — hoàn thiện luồng, bổ sung validation, thêm màn nếu cần.
5. Commit và push thường xuyên để Ban tổ chức có thể theo dõi tiến độ.

---

## 4. Cách chạy prototype

Không cần cài đặt bất kỳ thứ gì. Mở file `prototype/index.html` bằng trình duyệt (Chrome / Edge / Firefox) là chạy được ngay.

```
ba-take-home/
└── prototype/
    └── index.html   ← mở file này
```

---

## 5. Cách nộp bài

1. Fork repo này về tài khoản GitHub cá nhân.
2. Làm bài trực tiếp trên nhánh `main`.
3. Push toàn bộ thay đổi lên GitHub.
4. Để repo ở chế độ **Public** (hoặc thêm reviewer theo hướng dẫn của Ban tổ chức).
5. Gửi **link repo cá nhân** của bạn cho Ban tổ chức qua kênh được chỉ định.

---

## 6. Checklist trước khi nộp

- [ ] `docs/01-requirements.md` — đã điền đầy đủ: problem statement, actors, scope, assumptions, glossary.
- [ ] `docs/02-user-stories.md` — có ít nhất **3 user story** cho mỗi bước (2, 4, 5); mỗi story có AC (Given/When/Then) và priority MoSCoW.
- [ ] `docs/03-process-flow.md` — có ít nhất **2 sơ đồ luồng** chính (xác nhận lịch & yêu cầu thay đổi) vẽ bằng Mermaid.
- [ ] `docs/04-data-model.md` — ERD phản ánh đúng luồng nghiệp vụ, có mô tả thuộc tính từng entity.
- [ ] `prototype/index.html` — mở được ngay trên browser, 3 màn cốt lõi hoạt động (xác nhận, thay đổi, lịch cá nhân).
- [ ] Repo đặt ở **Public** (hoặc đã add reviewer theo yêu cầu của BTC).
- [ ] Đã gửi link repo cho Ban tổ chức.
