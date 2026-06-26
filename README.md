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

## 4. Skills & công cụ theo từng phase

> Bạn được khuyến khích dùng Claude Code ở mọi phase. Bảng dưới chỉ rõ **Claude skill cụ thể** (`/skill-name`) nên gọi ở từng bước — không chỉ "dùng AI" chung chung.

| Phase | Kỹ năng BA cốt lõi | Claude Skill | Gọi skill để làm gì |
|---|---|---|---|
| **00** Dataset Contract | System boundary analysis · Data contract design | `/deep-research` | Research domain: entity nào upstream thường expose, pattern contract phổ biến cho scheduling system, câu hỏi cần hỏi stakeholder để làm rõ ranh giới hệ thống |
| **01** Requirements | Problem framing · Scope negotiation | `/deep-research` | Research bài toán: best practice requirements cho hệ thống xác nhận lịch, edge cases phổ biến trong approval workflow, non-functional requirements nên có |
| **02** User Stories | Story mapping · BDD · MoSCoW | *(Claude trực tiếp)* | Draft Given/When/Then, rồi prompt: *"Challenge AC của story này — điều kiện nào còn thiếu, unhappy path nào chưa có?"* |
| **03** Process Flow | BPMN · Swimlane · Decision tree | *(Claude trực tiếp)* | Mô tả luồng bằng text → generate Mermaid flowchart → hỏi: *"Nhánh nào bị bỏ sót?"* Render kết quả trên [mermaid.live](https://mermaid.live) để kiểm tra |
| **04** Data Model | ER modeling · Normalization · Cardinality | *(Claude trực tiếp)* | Generate Mermaid erDiagram từ entity list → review normalization, cardinality, missing entity để support state transitions |
| **05** Screen Spec | Information architecture · UX thinking | `/artifact-design` | Gọi `/artifact-design` để Claude hướng dẫn thiết kế layout, hierarchy, palette cho từng màn trước khi code. Output: wireframe Artifact có thể share với team |
| **Prototype — build** | HTML · CSS · Vanilla JS | *(Claude Code trực tiếp)* | Paste screen spec → Claude generate khung HTML/CSS/JS, dữ liệu mẫu, TODO comments. Iterate từng màn một |
| **Prototype — test** | Manual testing · Role-based walkthrough | `/run` | Gọi `/run` để Claude khởi động và thao tác thử prototype trên browser — phát hiện lỗi UI mà đọc code không thấy |
| **Prototype — review** | Code quality · Logic correctness | `/code-review` | Gọi `/code-review` sau khi hoàn thiện để Claude review: logic state management, edge cases chưa handle, code dư thừa |
| **Prototype — verify** | Acceptance testing | `/verify` | Gọi `/verify` để Claude chạy lại từng luồng theo AC trong user stories, xác nhận prototype đáp ứng đúng yêu cầu trước khi nộp |

**Cách gọi skill trong Claude Code:**
```
/deep-research      # research domain, best practices, edge cases
/artifact-design    # thiết kế layout & visual spec cho màn hình
/run                # chạy và thao tác thử prototype trên browser
/code-review        # review code prototype sau khi hoàn thiện
/verify             # xác nhận prototype đáp ứng đúng AC
```

> **Lưu ý đánh giá:** Reviewer đánh giá **tư duy phân tích và lý luận nghiệp vụ** — không phải khả năng gọi skill.
> Skill giúp bạn làm nhanh hơn và chắc hơn; nhưng nội dung trong `docs/` phải phản ánh suy luận của bạn, không phải output thô từ Claude.

---

## 5. Cách tiếp cận repo này — từng bước

> Đây là thứ tự được khuyến nghị khi bạn vừa fork repo này về. Mỗi bước có lý do — đừng bỏ qua hay đảo thứ tự.

### Bước 1 — Đọc và hiểu bộ khung trước khi viết bất cứ điều gì *(~20 phút)*

- Đọc README từ đầu đến cuối (bao gồm mục này).
- Mở `prototype/index.html` trên browser — dùng thử như GV, TA, Coordinator. Đây là điểm xuất phát, không phải đích đến.
- Lướt qua tất cả file trong `docs/` — đừng điền vội, chỉ đọc để nắm cấu trúc khung.
- Đọc `CONTRIBUTING.md` để biết commit style và thứ tự làm việc.

### Bước 2 — Phân tích bài toán trước khi mở editor *(~20 phút)*

Dùng giấy, whiteboard, hoặc Miro — không phải bàn phím.

- Vẽ nháp **system boundary**: bước 1 và bước 3 kết thúc ở đâu, bước 2, 4, 5 của bạn bắt đầu ở đâu?
- Xác định **dữ liệu nào đã tồn tại** khi hệ thống của bạn nhận vào.
- Ghi ra ít nhất **3 câu hỏi chưa rõ** — đây sẽ trở thành phần Assumptions và Câu hỏi mở trong docs.

> **Claude prompt gợi ý:** *"Đây là đề bài: [paste]. Vẽ system boundary: input gì từ upstream, output gì ra ngoài, scope của tôi ở đâu trong luồng 5 bước?"*

### Bước 3 — Dataset Contract (`docs/00-dataset-contract.md`) *(làm trước tiên)*

Đây là nền tảng của mọi thiết kế phía sau. Nếu giả định dữ liệu sai ở đây, requirements, ERD, và prototype đều sai theo.

- Liệt kê từng entity upstream cung cấp, kèm fields, types, nullable, ví dụ.
- Ghi rõ bước 1 tạo gì, bước 3 cập nhật gì.
- Ghi câu hỏi mở về dữ liệu nếu chưa chắc.

> **Claude prompt gợi ý:** *"Từ đề bài trên, liệt kê entity nào bước 1 và bước 3 cần cung cấp cho hệ thống tôi, với field name, type, nullable, ví dụ giá trị thực."*

### Bước 4 — Requirements rồi mới đến Stories (`docs/01` → `docs/02`)

Không viết đồng thời — requirements xong trước, stories viết sau dựa trên requirements.

- Mỗi user story phải trace được về ít nhất 1 functional requirement.
- Kiểm tra mỗi AC (Given/When/Then) có **testable** không — nếu không test được thì AC chưa rõ.

> **Claude prompt gợi ý (Requirements):** *"Từ đề bài và dataset contract, liệt kê: actors, functional requirements từng bước, non-functional requirements gợi ý, 5 câu hỏi cần hỏi thêm stakeholder."*
>
> **Claude prompt gợi ý (Stories):** *"Từ requirements này, draft user stories Given/When/Then với MoSCoW. Sau đó challenge: story nào AC còn thiếu điều kiện, story nào chưa có unhappy path?"*

### Bước 5 — Process Flow (`docs/03-process-flow.md`)

- Vẽ **Happy Path trước**, rồi mới thêm nhánh từ chối / lỗi / timeout.
- Đảm bảo mỗi trạng thái trong luồng nhất quán với stories ở bước 4.
- Tối thiểu 2 luồng: xác nhận lịch và yêu cầu thay đổi.

> **Claude prompt gợi ý:** *"Mô tả luồng [xác nhận lịch] bằng text: [mô tả]. Generate Mermaid flowchart bao gồm happy path và tất cả nhánh. Sau đó: luồng này bỏ sót trường hợp nào?"*

### Bước 6 — Data Model (`docs/04-data-model.md`)

- **Bắt đầu từ entities trong Dataset Contract** (bước 3), không phải từ không khí.
- Sau khi có ERD, tự hỏi: model này hỗ trợ được tất cả state transitions trong Process Flow không?
- Điền data dictionary field-level (tên, kiểu, nullable, mô tả, ví dụ) — không chỉ tên entity.

> **Claude prompt gợi ý:** *"Từ dataset contract và user stories này, generate Mermaid erDiagram. Kiểm tra: normalization có vấn đề gì, thiếu entity nào để support state transitions, cardinality có đúng không?"*

### Bước 7 — Screen Spec (`docs/05-screen-spec.md`) — spec TRƯỚC khi code

Viết spec trước, code sau — đừng code prototype rồi viết spec ngược lại.

- Mỗi màn phải trả lời được câu hỏi: *"Người dùng đến màn này để biết gì / làm gì?"*
- Liệt kê data fields, actions, filters, empty state, error state cho từng màn.

> **Claude prompt gợi ý:** *"Từ stories bước [2], spec màn Xác nhận lịch: ai xem, câu hỏi nghiệp vụ cần trả lời, data fields hiển thị, actions người dùng có thể thực hiện, filters, empty state khi không có buổi nào."*

### Bước 8 — Mở rộng Prototype

- Implement đúng theo spec trong `docs/05-screen-spec.md` — không thêm feature ngoài spec.
- Test từng luồng bằng cách **dùng thử như từng role**: GV, TA, Coordinator.
- Commit sau mỗi màn hoàn thiện — không gom thành 1 commit lớn cuối cùng.

> **Claude Code prompt gợi ý:** *"Đây là screen spec màn [Xác nhận lịch]: [paste spec]. Generate HTML/CSS/JS implement màn này, dữ liệu mẫu hardcode trong JS, TODO comments chỗ cần hoàn thiện."*

### Bước 9 — Dev-readiness review *(điểm cộng)*

Tự hỏi: *"Nếu tôi đưa bộ tài liệu này cho developer ngay bây giờ, họ có thể bắt đầu code mà không cần hỏi lại gì không?"*

Nếu chưa, bổ sung thêm:

| Artifact | Đặt ở đâu | Developer cần để làm gì |
|---|---|---|
| **State machine** — sơ đồ chuyển trạng thái Session & ChangeRequest | `docs/03-process-flow.md` hoặc `docs/06-state-machine.md` | Implement trạng thái & transitions chính xác |
| **Permission matrix** — ai được làm gì (✅/❌ theo role) | `docs/01-requirements.md` hoặc `docs/05-screen-spec.md` | Implement authorization |
| **Notification design** — trigger → recipient → nội dung | `docs/05-screen-spec.md` | Implement hệ thống thông báo |
| **Edge cases & validation rules** — trường hợp biên và ràng buộc | `docs/01-requirements.md` | Không bỏ sót case khi code |
| **API sketch** *(optional)* — phác thảo endpoint | Inline trong `docs/05-screen-spec.md` | Align backend/frontend boundary sớm |

### Bước 10 — Final review trước khi nộp

- Đọc lại toàn bộ `docs/` một lần — kiểm tra nhất quán: stories ↔ process flow ↔ data model ↔ screen spec.
- Mở prototype, chạy lại từng luồng chính.
- Run through Checklist mục 8.
- Push lần cuối — gửi link.

---

## 6. Cách chạy prototype

Không cần cài đặt bất kỳ thứ gì. Mở file `prototype/index.html` bằng trình duyệt (Chrome / Edge / Firefox) là chạy được ngay.

```
datapot-ba-test-demo/
└── prototype/
    └── index.html   ← mở file này
```

---

## 7. Cách nộp bài

1. Fork repo này về tài khoản GitHub cá nhân.
2. Làm bài trực tiếp trên nhánh `main`.
3. Push toàn bộ thay đổi lên GitHub.
4. Để repo ở chế độ **Public** (hoặc thêm reviewer theo hướng dẫn của Ban tổ chức).
5. Gửi **link repo cá nhân** của bạn cho Ban tổ chức qua kênh được chỉ định.

---

## 8. Checklist trước khi nộp

- [ ] `docs/00-dataset-contract.md` — đã điền thực thể đầu vào, fields, và ràng buộc.
- [ ] `docs/01-requirements.md` — đã điền đầy đủ: problem statement, actors, scope, assumptions, glossary.
- [ ] `docs/02-user-stories.md` — có ít nhất **3 user story** cho mỗi bước (2, 4, 5); mỗi story có AC (Given/When/Then) và priority MoSCoW.
- [ ] `docs/03-process-flow.md` — có ít nhất **2 sơ đồ luồng** chính (xác nhận lịch & yêu cầu thay đổi) vẽ bằng Mermaid.
- [ ] `docs/04-data-model.md` — ERD + data dictionary field-level (tên, kiểu, nullable, mô tả, ví dụ).
- [ ] `docs/05-screen-spec.md` — đã spec đủ 3 màn: câu hỏi nghiệp vụ, dữ liệu, hành động, filter.
- [ ] `prototype/index.html` — mở được ngay trên browser, 3 màn cốt lõi hoạt động.
- [ ] *(Dev-ready — điểm cộng)* State machine diagram cho Session & ChangeRequest.
- [ ] *(Dev-ready — điểm cộng)* Permission matrix đầy đủ.
- [ ] *(Dev-ready — điểm cộng)* Notification design (trigger, recipient, nội dung).
- [ ] *(Dev-ready — điểm cộng)* Edge cases & validation rules đã liệt kê.
- [ ] Repo đặt ở **Public** (hoặc đã add reviewer theo yêu cầu của BTC).
- [ ] Đã gửi link repo cho Ban tổ chức.
