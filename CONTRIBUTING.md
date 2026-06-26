# Hướng dẫn làm bài & nộp bài

Cảm ơn bạn đã tham gia đề bài BA của Datapot! Đây là repo **starter** — bạn fork về, làm trên `main`, rồi gửi link cho Ban tổ chức.

---

## Quy tắc cơ bản

- **Không commit dữ liệu thật** — nếu dùng dữ liệu mẫu, hãy tạo dữ liệu giả.
- **Không commit file nhị phân lớn** (ảnh screenshot > 2 MB, file Excel gốc...). Dùng link hoặc mô tả.
- **Không dùng build tool nặng** trong prototype — HTML + CSS + vanilla JS mở thẳng trên browser.
- **Để repo ở Public** (hoặc add reviewer theo hướng dẫn của BTC) trước khi nộp.

---

## Workflow khuyến nghị

1. **Fork** repo này → clone về máy.
2. Đọc `docs/00-dataset-contract.md` → điền giả định dữ liệu đầu vào trước khi làm.
3. Điền `docs/01-requirements.md` → rõ bài toán, actor, scope.
4. Viết `docs/02-user-stories.md` → story + AC + priority.
5. Vẽ `docs/03-process-flow.md` → luồng bằng Mermaid.
6. Thiết kế `docs/04-data-model.md` → ERD + data dictionary.
7. Spec màn hình `docs/05-screen-spec.md` → trả lời câu hỏi nghiệp vụ từng màn.
8. Mở rộng prototype `prototype/index.html` → implement theo spec.
9. Commit + push → gửi link.

---

## Commit style

Dùng prefix để commit rõ ràng:

| Prefix | Khi nào dùng |
|---|---|
| `docs:` | thêm / sửa tài liệu trong `docs/` |
| `feat:` | thêm tính năng mới cho prototype |
| `fix:` | sửa lỗi prototype |
| `refactor:` | tổ chức lại code / file không thay đổi logic |
| `chore:` | cấu hình, gitignore, tạo thư mục |

**Ví dụ:**
```
docs: điền requirements và actors cho bước 2
feat: hoàn thiện luồng xác nhận lịch màn 1
fix: sửa lỗi modal từ chối không đóng trên mobile
```

Không cần commit từng dòng — nhưng mỗi commit nên gói một **đơn vị công việc** rõ ràng để reviewer dễ theo dõi tiến độ tư duy.

---

## Checklist trước khi nộp

- [ ] `docs/00-dataset-contract.md` — đã điền đầy đủ thực thể và trường đầu vào.
- [ ] `docs/01-requirements.md` — đã điền problem statement, actors, scope, assumptions, glossary.
- [ ] `docs/02-user-stories.md` — ≥ 3 story / bước, mỗi story có AC (Given/When/Then) + MoSCoW.
- [ ] `docs/03-process-flow.md` — ≥ 2 sơ đồ luồng Mermaid.
- [ ] `docs/04-data-model.md` — ERD + data dictionary field-level.
- [ ] `docs/05-screen-spec.md` — đã spec đủ 3 màn: câu hỏi nghiệp vụ, dữ liệu, hành động.
- [ ] `prototype/index.html` — mở được ngay trên browser, 3 màn cốt lõi hoạt động.
- [ ] Repo ở **Public** hoặc đã add reviewer.
- [ ] Đã gửi link repo cho Ban tổ chức.

---

## Có vấn đề?

Mở một **GitHub Issue** trên repo gốc hoặc liên hệ Ban tổ chức qua kênh được chỉ định.
