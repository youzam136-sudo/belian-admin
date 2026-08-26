/* ===== 대시보드 레이아웃 (좌: 본문 / 우: 사이드패널) ===== */
.dashboard-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
}

.dashboard-page {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 36px;
}

.dashboard-side {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* ===== 섹션 공통 ===== */
.dashboard-section h2 {
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 18px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.dashboard-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 6px;
    border-radius: 999px;
    background-color: #181a1e;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
}

.dashboard-info-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eef8ff;
    border-radius: 14px;
    padding: 18px 24px;
    font-size: 15px;
    font-weight: 600;
    color: #1c1c1e;
    margin-bottom: 24px;
}

.dashboard-info-banner a {
    color: var(--admin-accent-dark);
    font-weight: 700;
    text-decoration: none;
}

.dashboard-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
}

.dashboard-card-head h3 {
    font-size: 17px;
    font-weight: 700;
    margin: 0;
}

.dashboard-card-head a {
    font-size: 13px;
    color: var(--admin-text-muted);
    text-decoration: none;
}

/* ===== 요약 체크리스트 카드 ===== */
.dashboard-checklist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
}

.dashboard-checklist-card {
    background-color: #ffffff;
    border-radius: 18px;
    padding: 28px 26px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.dashboard-checklist-head h3 {
    font-size: 18px;
    font-weight: 800;
    margin: 0 0 14px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.dashboard-checklist-tag {
    font-size: 12px;
    font-weight: 700;
    color: var(--admin-accent-dark);
    background-color: var(--admin-accent-soft);
    padding: 4px 10px;
    border-radius: 999px;
}

.dashboard-checklist-count {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--admin-text-muted);
    margin-bottom: 10px;
}

.dashboard-checklist-bar {
    width: 100%;
    height: 10px;
    background-color: var(--admin-border);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 20px;
}

.dashboard-checklist-bar-fill {
    height: 100%;
    background-color: #181a1e;
    border-radius: 999px;
    transition: width 0.3s ease;
}

.dashboard-checklist-card ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.dashboard-checklist-card li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #15181E;
    transition: background-color 0.12s ease;
    cursor: pointer;
}

.dashboard-checklist-card li:hover {
    background-color: #f3f4f6;
}

.dashboard-checklist-card li.is-done {
    color: #9ca3af;
    text-decoration: line-through;
}

.dashboard-checklist-dot {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    font-size: 13px;
    font-weight: 800;
    color: transparent;
}

.dashboard-checklist-card li.is-done .dashboard-checklist-dot {
    border-color: #22c55e;
    background-color: #22c55e;
    color: #ffffff;
}

/* ===== 오늘의 할일 ===== */
.dashboard-today-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 20px;
    background-color: #ffffff;
    border-radius: 18px;
    padding: 26px;
}

.dashboard-today-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dashboard-today-item span {
    font-size: 15px;
    font-weight: 600;
    color: var(--admin-text-muted);
}

.dashboard-today-item strong {
    font-size: 30px;
    font-weight: 800;
    color: #15181E;
}

/* ===== 통계 ===== */
.dashboard-stats-grid {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 24px;
}

.dashboard-chart-card,
.dashboard-table-card,
.dashboard-content-card {
    background-color: #ffffff;
    border-radius: 18px;
    padding: 28px 26px;
}

.dashboard-chart-legend {
    display: flex;
    gap: 16px;
    margin-bottom: 14px;
}

.dashboard-chart-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--admin-text-muted);
}

.dashboard-chart-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
}

.dashboard-chart-dot.visitor {
    background-color: var(--admin-accent-dark);
}

.dashboard-chart-dot.pageview {
    background-color: var(--admin-accent-soft);
    border: 1px solid var(--admin-accent);
}

.dashboard-chart-wrap {
    position: relative;
    display: flex;
    gap: 8px;
}

.dashboard-chart-yaxis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    color: var(--admin-text-muted);
    padding: 4px 0;
}

.dashboard-chart {
    width: 100%;
    height: 200px;
}

.dashboard-chart-tooltip {
    position: absolute;
    transform: translate(-50%, -120%);
    background: #ffffff;
    border: 1px solid var(--admin-border);
    border-radius: 8px;
    padding: 8px 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    font-size: 13px;
    font-weight: 700;
    pointer-events: none;
    white-space: nowrap;
    z-index: 5;
}

.dashboard-chart-tooltip-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.dashboard-chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
    color: var(--admin-text-muted);
}

.dashboard-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
}

.dashboard-table th {
    text-align: left;
    font-size: 13px;
    font-weight: 700;
    color: #9ca3af;
    padding: 0 12px 14px;
    border-bottom: 1px solid var(--admin-border);
}

.dashboard-table td {
    padding: 16px 12px;
    border-bottom: 1px solid #f3f4f6;
    color: #15181E;
}

.dashboard-table-summary td {
    font-weight: 800;
    border-bottom: none;
    background-color: #f8fafc;
}

/* ===== 컨텐츠 ===== */
.dashboard-content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
}

.dashboard-content-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    color: #9ca3af;
    font-size: 15px;
}

/* ===== 오른쪽 사이드 패널 ===== */
.dashboard-profile-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background-color: #ffffff;
    border-radius: 18px;
    padding: 22px 24px;
}

.dashboard-profile-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #e5e7eb;
    flex-shrink: 0;
}

.dashboard-profile-avatar.small {
    width: 32px;
    height: 32px;
}

.dashboard-profile-card div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.dashboard-profile-card strong {
    font-size: 16px;
    font-weight: 800;
}

.dashboard-profile-card span {
    font-size: 13px;
    color: var(--admin-text-muted);
}

.dashboard-info-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dashboard-side-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 14px;
    padding: 16px 22px;
    font-size: 15px;
    font-weight: 600;
}

.dashboard-side-row.multiline {
    align-items: flex-start;
}

.dashboard-side-row strong {
    font-weight: 800;
}

.dashboard-side-row strong.is-warning {
    color: #ef4444;
}

.dashboard-side-row-value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
}

.dashboard-side-row-value em {
    font-style: normal;
    font-size: 12px;
    color: var(--admin-text-muted);
}

.dashboard-pg-btn {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 14px;
    background-color: var(--admin-accent);
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.dashboard-pg-btn:hover {
    background-color: var(--admin-accent-dark);
}

.dashboard-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    padding: 10px;
    border: none;
    background: transparent;
    color: var(--admin-text-muted);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
}

.dashboard-toggle-btn .arrow {
    display: inline-block;
    transition: transform 0.15s ease;
}

.dashboard-toggle-btn .arrow.up {
    transform: rotate(180deg);
}

.dashboard-side-card {
    background-color: #ffffff;
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.dashboard-side-card > strong {
    font-size: 15px;
    font-weight: 800;
}

.dashboard-side-member {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
}

.dashboard-side-member span {
    flex: 1;
    font-weight: 600;
}

.dashboard-side-member em {
    font-style: normal;
    color: var(--admin-text-muted);
    font-size: 13px;
}

.dashboard-memo-card {
    background-color: #fff9db;
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.dashboard-memo-card strong {
    font-size: 15px;
    font-weight: 800;
}

.dashboard-memo-card textarea {
    width: 100%;
    min-height: 90px;
    border: none;
    border-radius: 10px;
    padding: 12px;
    font-size: 14px;
    font-family: inherit;
    resize: vertical;
    background-color: #ffffff;
}

.dashboard-memo-card button {
    align-self: flex-end;
    padding: 8px 18px;
    border: none;
    border-radius: 8px;
    background-color: #181a1e;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
}
