// ============================================================
// DỮ LIỆU MẪU — chỉnh sửa để thêm/bớt buổi, người dùng
// ============================================================

const USERS = {
  gv_a:  { name: 'Nguyễn Văn An',   role: 'gv' },
  gv_b:  { name: 'Phạm Thị Bích',   role: 'gv' },
  ta_c:  { name: 'Trần Văn Cường',   role: 'ta' },
  ta_d:  { name: 'Lê Thị Dung',      role: 'ta' },
  coord: { name: 'Hoàng Thu Hà',     role: 'coordinator' },
};

// sessions: giả định đã được tạo & phân công bởi bước 1
// status: 'pending' | 'confirmed' | 'rejected'
let sessions = [
  { id: 1, subject: 'Python cơ bản',     date: '2026-07-01', time: '08:00–10:00', room: 'P.201',  instructorId: 'gv_a', taId: 'ta_c', status: 'pending' },
  { id: 2, subject: 'SQL nâng cao',       date: '2026-07-02', time: '14:00–16:00', room: 'P.303',  instructorId: 'gv_a', taId: 'ta_d', status: 'confirmed' },
  { id: 3, subject: 'Data Visualization', date: '2026-07-03', time: '09:00–11:00', room: 'Lab 01', instructorId: 'gv_b', taId: 'ta_c', status: 'pending' },
  { id: 4, subject: 'Machine Learning',   date: '2026-07-07', time: '13:00–15:00', room: 'P.201',  instructorId: 'gv_a', taId: 'ta_d', status: 'rejected', rejectReason: 'Bận họp nội bộ' },
  { id: 5, subject: 'Thống kê ứng dụng', date: '2026-07-08', time: '08:00–10:00', room: 'P.102',  instructorId: 'gv_b', taId: 'ta_c', status: 'pending' },
];

// changeRequests: yêu cầu thay đổi lịch (bước 4)
// type: 'reschedule' | 'cancel'
// status: 'pending' | 'approved' | 'rejected'
let changeRequests = [
  { id: 1, sessionId: 2, requestedById: 'gv_a', type: 'reschedule', reason: 'Có lịch bận đột xuất', proposedDate: '2026-07-09', status: 'pending' },
];

// TODO: thay bằng user thực sau khi thêm đăng nhập
// currentUserId xác định buổi nào GV/TA "của tôi"
let currentRole = 'gv';
const ROLE_USER_MAP = { gv: 'gv_a', ta: 'ta_c', coordinator: 'coord' };

let pendingRejectSessionId = null;

// ============================================================
// TAB NAVIGATION
// ============================================================
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    render();
  });
});

document.getElementById('role-select').addEventListener('change', e => {
  currentRole = e.target.value;
  render();
});

// ============================================================
// RENDER DISPATCHER
// ============================================================
function render() {
  renderSessions();
  renderChangeTab();
  renderCalendar();
}

// ============================================================
// TAB 1 — XÁC NHẬN LỊCH
// ============================================================
function renderSessions() {
  const el = document.getElementById('session-list');
  const currentUserId = ROLE_USER_MAP[currentRole];

  // Coordinator thấy tất cả; GV/TA chỉ thấy buổi của mình
  const visible = sessions.filter(s => {
    if (currentRole === 'coordinator') return true;
    if (currentRole === 'gv') return s.instructorId === currentUserId;
    if (currentRole === 'ta') return s.taId === currentUserId;
    return false;
  });

  if (!visible.length) {
    el.innerHTML = '<div class="empty-state">Không có buổi dạy nào.</div>';
    return;
  }

  el.innerHTML = visible.map(s => {
    const rejectNote = s.rejectReason
      ? `<div class="card-note">Lý do từ chối: ${esc(s.rejectReason)}</div>`
      : '';

    // Chỉ GV/TA với buổi pending mới thấy nút hành động
    const canAct = s.status === 'pending' && currentRole !== 'coordinator';
    const actions = canAct
      ? `<div class="card-actions">
           <button class="btn btn-success btn-sm" onclick="confirmSession(${s.id})">Xác nhận</button>
           <button class="btn btn-danger  btn-sm" onclick="openRejectModal(${s.id})">Từ chối</button>
         </div>`
      : '';

    return `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${esc(s.subject)}</div>
            <div class="card-meta">${s.date} &nbsp;·&nbsp; ${s.time} &nbsp;·&nbsp; ${esc(s.room)}</div>
            <div class="card-meta">GV: ${esc(USERS[s.instructorId]?.name)} &nbsp;·&nbsp; TA: ${esc(USERS[s.taId]?.name)}</div>
            ${rejectNote}
          </div>
          <span class="badge badge-${s.status}">${statusLabel(s.status)}</span>
        </div>
        ${actions}
      </div>`;
  }).join('');
}

function confirmSession(id) {
  const s = sessions.find(x => x.id === id);
  if (s) { s.status = 'confirmed'; render(); }
}

function openRejectModal(id) {
  pendingRejectSessionId = id;
  document.getElementById('reject-reason').value = '';
  document.getElementById('reject-modal').classList.remove('hidden');
  document.getElementById('reject-reason').focus();
}

document.getElementById('reject-cancel-btn').addEventListener('click', () => {
  document.getElementById('reject-modal').classList.add('hidden');
});

document.getElementById('reject-confirm-btn').addEventListener('click', () => {
  const reason = document.getElementById('reject-reason').value.trim();
  if (!reason) { alert('Vui lòng nhập lý do từ chối.'); return; }
  const s = sessions.find(x => x.id === pendingRejectSessionId);
  if (s) { s.status = 'rejected'; s.rejectReason = reason; }
  document.getElementById('reject-modal').classList.add('hidden');
  render();
});

// ============================================================
// TAB 2 — THAY ĐỔI LỊCH
// ============================================================
function renderChangeTab() {
  populateSessionDropdown();
  renderChangeRequests();
}

function populateSessionDropdown() {
  const sel = document.getElementById('cr-session');
  const mySessions = sessions.filter(s => s.status !== 'cancelled');
  sel.innerHTML = mySessions
    .map(s => `<option value="${s.id}">${s.date} — ${esc(s.subject)}</option>`)
    .join('');
}

document.getElementById('cr-type').addEventListener('change', e => {
  document.getElementById('cr-newdate-row').style.display =
    e.target.value === 'reschedule' ? '' : 'none';
});

document.getElementById('change-form').addEventListener('submit', e => {
  e.preventDefault();
  const sessionId    = parseInt(document.getElementById('cr-session').value);
  const type         = document.getElementById('cr-type').value;
  const reason       = document.getElementById('cr-reason').value.trim();
  const proposedDate = document.getElementById('cr-newdate').value;

  if (!reason) { alert('Vui lòng nhập lý do.'); return; }
  if (type === 'reschedule' && !proposedDate) { alert('Vui lòng nhập ngày đề xuất.'); return; }

  const currentUserId = ROLE_USER_MAP[currentRole];
  changeRequests.push({
    id: changeRequests.length + 1,
    sessionId,
    requestedById: currentUserId,
    type,
    reason,
    proposedDate: type === 'reschedule' ? proposedDate : null,
    status: 'pending',
  });

  document.getElementById('cr-reason').value = '';
  document.getElementById('cr-newdate').value = '';
  render();
  alert('Đã gửi yêu cầu. Coordinator sẽ phê duyệt sớm.');
});

function renderChangeRequests() {
  const el = document.getElementById('change-request-list');

  if (!changeRequests.length) {
    el.innerHTML = '<div class="empty-state">Chưa có yêu cầu nào.</div>';
    return;
  }

  el.innerHTML = changeRequests.map(cr => {
    const session      = sessions.find(s => s.id === cr.sessionId);
    const typeLabel    = cr.type === 'reschedule' ? 'Đổi lịch' : 'Hủy buổi';
    const proposedInfo = cr.proposedDate ? ` &nbsp;→&nbsp; Ngày đề xuất: <strong>${cr.proposedDate}</strong>` : '';

    // Coordinator thấy nút phê duyệt / từ chối
    const coordActions = (currentRole === 'coordinator' && cr.status === 'pending')
      ? `<div class="card-actions">
           <button class="btn btn-success btn-sm" onclick="approveChange(${cr.id})">Phê duyệt</button>
           <button class="btn btn-danger  btn-sm" onclick="rejectChange(${cr.id})">Từ chối</button>
         </div>`
      : '';

    return `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">${typeLabel} — ${esc(session?.subject || '?')}</div>
            <div class="card-meta">Người gửi: ${esc(USERS[cr.requestedById]?.name)}${proposedInfo}</div>
            <div class="card-meta">Lý do: ${esc(cr.reason)}</div>
          </div>
          <span class="badge badge-${cr.status}">${statusLabel(cr.status)}</span>
        </div>
        ${coordActions}
      </div>`;
  }).join('');
}

function approveChange(id) {
  const cr = changeRequests.find(x => x.id === id);
  if (!cr) return;
  cr.status = 'approved';
  // TODO: cập nhật session (đổi ngày hoặc chuyển status → cancelled), gửi thông báo GV/TA
  render();
}

function rejectChange(id) {
  const cr = changeRequests.find(x => x.id === id);
  if (!cr) return;
  cr.status = 'rejected';
  // TODO: gửi thông báo từ chối cho GV/TA
  render();
}

// ============================================================
// TAB 3 — LỊCH CÁ NHÂN (tuần + danh sách)
// ============================================================
function renderCalendar() {
  renderWeekGrid();
  renderPersonalList();
}

function renderWeekGrid() {
  const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  // TODO: tính tuần hiện tại động, thêm nút điều hướng prev/next
  const weekStart = new Date('2026-06-29'); // Thứ 2 đầu tuần mẫu

  const grid = document.getElementById('week-grid');
  grid.className = 'week-grid';
  grid.innerHTML = DAY_LABELS.map((label, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    const dateStr = day.toISOString().slice(0, 10);

    const daySessions = sessions.filter(s => s.date === dateStr);
    const events = daySessions.map(s =>
      `<div class="week-event">${s.time.split('–')[0]} ${esc(s.subject)}</div>`
    ).join('');

    return `
      <div class="week-day">
        <div class="week-day-header">${label}<br/><small>${dateStr.slice(5)}</small></div>
        ${events}
      </div>`;
  }).join('');
}

function renderPersonalList() {
  const el = document.getElementById('personal-list');
  const currentUserId = ROLE_USER_MAP[currentRole];

  const mySessions = sessions
    .filter(s => {
      if (currentRole === 'coordinator') return true;
      if (currentRole === 'gv') return s.instructorId === currentUserId;
      return s.taId === currentUserId;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  if (!mySessions.length) {
    el.innerHTML = '<div class="empty-state">Không có buổi dạy nào.</div>';
    return;
  }

  el.innerHTML = mySessions.map(s => `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">${esc(s.subject)}</div>
          <div class="card-meta">${s.date} &nbsp;·&nbsp; ${s.time} &nbsp;·&nbsp; ${esc(s.room)}</div>
          <div class="card-meta">GV: ${esc(USERS[s.instructorId]?.name)} &nbsp;·&nbsp; TA: ${esc(USERS[s.taId]?.name)}</div>
        </div>
        <span class="badge badge-${s.status}">${statusLabel(s.status)}</span>
      </div>
    </div>`).join('');
}

// ============================================================
// HELPERS
// ============================================================
function statusLabel(status) {
  const labels = {
    pending:   'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    rejected:  'Từ chối',
    approved:  'Đã phê duyệt',
    cancelled: 'Đã hủy',
  };
  return labels[status] || status;
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================
// INIT
// ============================================================
render();
