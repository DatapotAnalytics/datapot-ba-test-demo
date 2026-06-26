# Requirements — Hệ thống quản lý lịch dạy

## Problem statement

<<< Mô tả vấn đề hiện tại: quản lý lịch dạy đang gặp khó khăn gì? Hệ thống này giải quyết điều gì? Mục tiêu cụ thể là gì? >>>

## Scope

**In scope (bạn cần phân tích & prototype):**
- Bước 2 — Nhận & xác nhận lịch
- Bước 4 — Thay đổi lịch
- Bước 5 — Xem lịch tổng & cá nhân

**Out of scope (giả định đã có sẵn):**
- Bước 1 — Tạo & phân công lịch
- Bước 3 — Phát hiện xung đột tự động

<<< Nêu rõ giả định về dữ liệu / đầu ra mà bước 1 và bước 3 cung cấp cho hệ thống của bạn >>>

## Actors

| Actor | Mô tả | Quyền chính |
|---|---|---|
| Coordinator | <<< mô tả vai trò >>> | <<< các quyền: tạo lịch, phê duyệt thay đổi, xem tổng... >>> |
| Giảng viên (GV) | <<< mô tả vai trò >>> | <<< các quyền: xác nhận lịch, yêu cầu thay đổi, xem lịch cá nhân... >>> |
| Trợ giảng (TA) | <<< mô tả vai trò >>> | <<< các quyền: tương tự GV hay khác? >>> |

## Functional Requirements

### Bước 2 — Nhận & xác nhận lịch
<<< liệt kê các yêu cầu chức năng >>>

### Bước 4 — Thay đổi lịch
<<< liệt kê các yêu cầu chức năng >>>

### Bước 5 — Xem lịch
<<< liệt kê các yêu cầu chức năng >>>

## Non-functional Requirements

<<< hiệu năng, bảo mật, khả năng dùng, thông báo real-time... >>>

## Assumptions

<<< các giả định cụ thể, ví dụ:
- Hệ thống bước 1 đã cung cấp danh sách buổi + phân công dưới dạng...
- Mỗi buổi chỉ có 1 GV và tối đa N TA
- ...
>>>

## Glossary

| Thuật ngữ | Định nghĩa |
|---|---|
| Buổi dạy | <<< >>> |
| Phân công | <<< >>> |
| Yêu cầu thay đổi | <<< >>> |
| Trạng thái buổi | <<< >>> |
