# Datapot BA Test — Hệ thống quản lý lịch dạy

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
| Dataset Contract | `docs/00-dataset-contract.md` | Giả định dữ liệu đầu vào từ bước 1 & 3 |
| Requirements | `docs/01-requirements.md` | Problem statement, actors, assumptions, glossary |
| User Stories | `docs/02-user-stories.md` | Stories theo format Given/When/Then + MoSCoW |
| Process Flow | `docs/03-process-flow.md` | Sơ đồ luồng bằng Mermaid |
| Data Model / ERD | `docs/04-data-model.md` | ERD bằng Mermaid + data dictionary field-level |
| Screen Spec | `docs/05-screen-spec.md` | Spec từng màn: câu hỏi nghiệp vụ, dữ liệu, hành động |
| Prototype tương tác | `prototype/index.html` | 3 màn cốt lõi, mở được trực tiếp trên browser |

> **Thứ tự khuyến nghị:** điền `00` (dataset contract) trước — giả định dữ liệu ảnh hưởng đến toàn bộ thiết kế phía sau. Xem chi tiết quy trình trong [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 3. Cách làm bài

1. **Fork** repo này về tài khoản GitHub cá nhân của bạn (nút **Fork** góc trên bên phải).
2. Clone về máy, làm bài trực tiếp trên nhánh `main`.
3. Điền theo thứ tự trong `docs/`: bắt đầu từ `00-dataset-contract.md` để xác định giả định dữ liệu, rồi lần lượt các file `01` → `05`.
   - Xóa các placeholder `<<< ... >>>` và thay bằng phân tích của bạn.
   - Xóa ví dụ mẫu (có nhãn "ví dụ — xóa") và thay bằng nội dung thực.
4. Mở rộng prototype trong `prototype/` — implement theo `docs/05-screen-spec.md`, hoàn thiện luồng, bổ sung validation.
5. Commit và push thường xuyên để Ban tổ chức có thể theo dõi tiến độ tư duy.
6. Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết commit style và checklist nộp bài.

---

## 4. Cách chạy prototype

Không cần cài đặt bất kỳ thứ gì. Mở file `prototype/index.html` bằng trình duyệt (Chrome / Edge / Firefox) là chạy được ngay.

```
datapot-ba-test-demo/
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

- [ ] `docs/00-dataset-contract.md` — đã điền thực thể đầu vào, fields, và ràng buộc.
- [ ] `docs/01-requirements.md` — đã điền đầy đủ: problem statement, actors, scope, assumptions, glossary.
- [ ] `docs/02-user-stories.md` — có ít nhất **3 user story** cho mỗi bước (2, 4, 5); mỗi story có AC (Given/When/Then) và priority MoSCoW.
- [ ] `docs/03-process-flow.md` — có ít nhất **2 sơ đồ luồng** chính (xác nhận lịch & yêu cầu thay đổi) vẽ bằng Mermaid.
- [ ] `docs/04-data-model.md` — ERD + data dictionary field-level (tên, kiểu, nullable, mô tả, ví dụ).
- [ ] `docs/05-screen-spec.md` — đã spec đủ 3 màn: câu hỏi nghiệp vụ, dữ liệu, hành động, filter.
- [ ] `prototype/index.html` — mở được ngay trên browser, 3 màn cốt lõi hoạt động.
- [ ] Repo đặt ở **Public** (hoặc đã add reviewer theo yêu cầu của BTC).
- [ ] Đã gửi link repo cho Ban tổ chức.
