# Process Flow

> Vẽ sơ đồ bằng **Mermaid** (khối ` ```mermaid `). GitHub và nhiều editor (VS Code với extension) render trực tiếp.
> Tối thiểu cần 2 luồng chính: xác nhận/từ chối lịch và luồng yêu cầu → phê duyệt thay đổi.

---

## Ví dụ (xóa và thay bằng luồng của bạn)

```mermaid
flowchart TD
  A[GV nhận thông báo buổi mới] --> B{Xác nhận?}
  B -- Có --> C[Trạng thái: Đã xác nhận]
  B -- Không --> D[Nhập lý do từ chối]
  D --> E[Trạng thái: Từ chối]
  C --> F[Coordinator nhận thông báo]
  E --> F
```

---

## Luồng 1 — Xác nhận / từ chối lịch (Bước 2)

<<< vẽ luồng đầy đủ của bạn ở đây >>>

```mermaid
flowchart TD
  A[TODO] --> B[TODO]
```

## Luồng 2 — Yêu cầu → phê duyệt thay đổi (Bước 4)

<<< vẽ luồng đầy đủ của bạn ở đây >>>

```mermaid
flowchart TD
  A[TODO] --> B[TODO]
```

## Luồng 3 — Xem lịch (Bước 5) _(tùy chọn)_

<<< nếu có luồng phức tạp, vẽ thêm ở đây >>>
