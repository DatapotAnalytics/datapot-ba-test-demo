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

> Dùng Claude Code trong toàn bộ vòng đời bài làm. Bảng dưới ánh xạ từng giai đoạn sang **skill command cụ thể** — theo đúng thứ tự nên gọi.

### 4.1 Bản đồ skill theo vòng đời

| Giai đoạn | Claude Skill | Gọi khi nào & để làm gì |
|---|---|---|
| **Khởi động repo** | `/init` | Việc đầu tiên sau khi fork & clone. Claude đọc toàn bộ repo → sinh `CLAUDE.md` ghi lại cấu trúc, mục đích từng file, quy ước. Mọi lệnh Claude tiếp theo sẽ có context chính xác hơn. |
| **00 Dataset Contract** | `/deep-research` | Research multi-source: entity nào scheduling system upstream thường expose, pattern data contract cho approval workflow, câu hỏi stakeholder interview cần hỏi. Claude fan-out 5 góc tìm kiếm, verify chéo các claim, trả về report có trích dẫn. |
| **01 Requirements** | `/deep-research` | Research: best practice requirements cho confirmation + change-request workflow, non-functional requirements phổ biến (SLA thông báo, retry logic), edge cases thường bị bỏ sót trong hệ thống lịch. |
| **02 User Stories** | *(Claude trực tiếp)* | Draft Given/When/Then → prompt *"Challenge AC này: điều kiện nào còn thiếu, unhappy path nào chưa cover?"* Không cần skill riêng — lặp nhanh hơn khi chat trực tiếp. |
| **03 Process Flow** | *(Claude trực tiếp)* | Mô tả luồng bằng text → Claude generate Mermaid. Paste vào [mermaid.live](https://mermaid.live) để preview. Hỏi tiếp: *"Luồng này bỏ sót nhánh nào?"* |
| **04 Data Model** | *(Claude trực tiếp)* | Generate `erDiagram` Mermaid → review normalization, cardinality, entity còn thiếu để support state machine. |
| **05 Screen Spec** | `/artifact-design` | Claude đọc screen spec của bạn → trả về hướng dẫn palette, typography, layout hierarchy phù hợp với từng màn (dashboard scan-first vs. form flow vs. calendar grid). Output có thể publish thành Artifact để share với team. |
| **Prototype — build** | *(Claude Code trực tiếp)* | Paste screen spec → Claude generate HTML/CSS/JS với dữ liệu mẫu và `// TODO:` comments. Iterate từng màn, commit sau mỗi màn hoàn thiện. |
| **Prototype — chạy thử** | `/run` | Claude mở `prototype/index.html` trên browser, thao tác thử từng role (GV → xác nhận, Coordinator → phê duyệt...), báo cáo lỗi UI mà đọc code không thấy. |
| **Prototype — dọn code** | `/simplify` | Sau khi tất cả luồng chạy đúng, gọi `/simplify` để Claude tìm và **tự áp dụng** các cleanup: code trùng lặp, biến thừa, logic rối. Không sửa bug — chỉ làm sạch. |
| **Prototype — review code** | `/code-review` | Chạy `/code-review --effort high` để Claude review kỹ: logic state management, edge cases chưa handle, XSS từ user input. Dùng `--fix` để Claude tự vá các lỗi tìm thấy. |
| **Prototype — security** | `/security-review` | Chạy trước khi nộp bài. Claude kiểm tra: lý do từ chối / lý do thay đổi được render có escape HTML không, input validation, dữ liệu mẫu có lộ thông tin nhạy cảm không. |
| **Prototype — verify AC** | `/verify` | Claude chạy lại từng luồng theo đúng Acceptance Criteria trong `docs/02-user-stories.md` — xác nhận prototype đáp ứng đủ trước khi push lần cuối. |
| **Nộp bài — pre-submit** | `/review` | Sau khi push, gọi `/review` để Claude đọc PR diff như một reviewer độc lập: docs có nhất quán với prototype không, checklist có đủ không, commit history có kể được câu chuyện tư duy không. |

---

### 4.2 Chi tiết từng skill

**`/init` — Khởi tạo context cho Claude**
Chạy ngay sau `git clone`. Claude đọc toàn bộ repo và viết `CLAUDE.md` mô tả cấu trúc, mục đích từng file, quy ước đặt tên. Kết quả: mọi lần bạn hỏi Claude trong phiên sau đều có context đúng mà không cần giải thích lại.

```
/init
```

---

**`/deep-research` — Research có trích dẫn, verify chéo**
Không phải "hỏi Claude một câu". Skill này fan-out 5 search agent song song trên nhiều góc độ, fetch 15+ nguồn, adversarially verify từng claim (3 vote — cần 2/3 refute để loại), rồi tổng hợp report có cite nguồn. Dùng khi bạn cần **sự thật đã được kiểm chứng**, không phải ý kiến.

```
/deep-research "best practices for schedule confirmation workflow in education management systems"
/deep-research "common edge cases in calendar change-request approval systems"
```

---

**`/artifact-design` — Thiết kế visual cho màn hình**
Gọi khi bạn đã có screen spec text và cần hướng dẫn thiết kế thực sự: Claude phân tích nội dung màn hình và trả về palette, font pairing, layout grid, spacing scale phù hợp — không template, không generic. Có thể output thành Artifact HTML để share.

```
/artifact-design      # sau đó paste nội dung screen spec vào
```

---

**`/run` — Chạy và quan sát prototype**
Claude tự mở `prototype/index.html`, thao tác như người dùng thật (click Xác nhận, mở modal Từ chối, gửi yêu cầu thay đổi, switch role Coordinator...), và báo cáo những gì thấy trên màn hình. Phát hiện lỗi hiển thị, state không reset, nút không phản hồi — những thứ đọc code không thấy.

```
/run
```

---

**`/simplify` — Dọn sạch code, tự áp dụng fix**
Sau khi prototype chạy đúng, skill này tìm: hàm trùng lặp, biến không dùng, logic rối, render thừa — rồi **tự sửa** vào file. Không săn bug (dùng `/code-review` cho việc đó). Mục tiêu: code đọc được, không cần giải thích.

```
/simplify
```

---

**`/code-review` — Review kỹ lỗi logic và quality**
Review diff hiện tại. Có 3 flag hữu ích:
- Không flag: medium effort — các lỗi rõ ràng.
- `--effort high`: broad coverage, bao gồm cả lỗi tinh vi.
- `--fix`: tự vá luôn các lỗi tìm thấy.
- `--comment`: post findings thành inline PR comments trên GitHub.

```
/code-review --effort high
/code-review --fix          # tự vá
/code-review --comment      # gắn comment lên PR
```

---

**`/security-review` — Kiểm tra bảo mật trước khi nộp**
Quan trọng với prototype này vì có nhiều chỗ render user input ra HTML (lý do từ chối, lý do thay đổi lịch). Claude kiểm tra XSS, injection, dữ liệu mẫu có expose thông tin nhạy cảm không. Chạy một lần trước khi push lần cuối.

```
/security-review
```

---

**`/verify` — Xác nhận prototype đáp ứng đúng AC**
Claude đọc Acceptance Criteria trong `docs/02-user-stories.md` rồi chạy prototype để verify từng điều kiện Given/When/Then. Khác `/run` ở chỗ: đây là **test có spec**, không phải khám phá tự do.

```
/verify
```

---

**`/review` — Đọc PR như reviewer độc lập**
Sau khi push và tạo PR trên GitHub, gọi `/review` để Claude đọc toàn bộ diff và đánh giá: docs có nhất quán với prototype không, commit history có kể được tiến trình tư duy không, checklist có mục nào thiếu không. Làm trước khi gửi link cho BTC.

```
/review
```

---

> **Lưu ý:** Reviewer đánh giá **tư duy phân tích** — không phải số skill đã gọi.
> Skill giúp bạn làm nhanh hơn và chắc hơn, nhưng nội dung trong `docs/` phải phản ánh suy luận của bạn, không phải output thô từ Claude.

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
