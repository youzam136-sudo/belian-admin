import "../styles/dashboard.css";

type ChecklistItem = {
    label: string;
    done: boolean;
};

type ChecklistCard = {
    title: string;
    badge?: string;
    items: ChecklistItem[];
};

const checklistCards: ChecklistCard[] = [
    {
        title: "기본설정",
        items: [
            { label: "사이트 정보 설정하기", done: true },
            { label: "관리자 계정 설정하기", done: true },
            { label: "약관 설정하기", done: false },
            { label: "도메인 연결하기", done: false },
        ],
    },
    {
        title: "판매하기",
        items: [
            { label: "상품 등록하기", done: true },
            { label: "배송비 설정하기", done: false },
            { label: "결제 수단 연결하기", done: false },
        ],
    },
    {
        title: "운영하기",
        items: [
            { label: "재고 관리 설정하기", done: false },
            { label: "쿠폰/이벤트 등록하기", done: false },
            { label: "게시판 관리하기", done: false },
        ],
    },
];

const todayTasks = [
    { label: "신규주문", count: 3 },
    { label: "취소관리", count: 0 },
    { label: "반품관리", count: 1 },
    { label: "교환관리", count: 0 },
    { label: "답변대기 문의", count: 2 },
];

const periodRows = [
    { date: "2026-08-24", orders: 4, sales: "128,000원", visitors: 152, signups: 2, inquiries: 1, reviews: 1 },
    { date: "2026-08-23", orders: 2, sales: "64,000원", visitors: 138, signups: 1, inquiries: 0, reviews: 0 },
    { date: "2026-08-22", orders: 6, sales: "215,000원", visitors: 201, signups: 3, inquiries: 2, reviews: 2 },
    { date: "2026-08-21", orders: 1, sales: "32,000원", visitors: 97, signups: 0, inquiries: 1, reviews: 0 },
    { date: "2026-08-20", orders: 3, sales: "89,000원", visitors: 124, signups: 1, inquiries: 0, reviews: 1 },
];

function DashboardPage() {
    const totalDone = checklistCards.reduce(
        (sum, card) => sum + card.items.filter((item) => item.done).length,
        0,
    );
    const totalItems = checklistCards.reduce(
        (sum, card) => sum + card.items.length,
        0,
    );

    return (
        <div className="dashboard-page">

            {/* 요약 */}
            <section className="dashboard-section">
                <h2>요약</h2>

                <div className="dashboard-checklist-grid">
                    {checklistCards.map((card) => {
                        const done = card.items.filter((item) => item.done).length;

                        return (
                            <div className="dashboard-checklist-card" key={card.title}>
                                <div className="dashboard-checklist-head">
                                    <h3>{card.title}</h3>
                                    <span>{done}/{card.items.length}개 완료</span>
                                </div>

                                <div className="dashboard-checklist-bar">
                                    <div
                                        className="dashboard-checklist-bar-fill"
                                        style={{
                                            width: `${(done / card.items.length) * 100}%`,
                                        }}
                                    />
                                </div>

                                <ul>
                                    {card.items.map((item) => (
                                        <li
                                            key={item.label}
                                            className={item.done ? "is-done" : ""}
                                        >
                                            <span className="dashboard-checklist-dot" />
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <p className="dashboard-checklist-total">
                    전체 설정 진행률 {totalDone}/{totalItems}개 완료
                </p>
            </section>

            {/* 오늘의 할일 */}
            <section className="dashboard-section">
                <h2>
                    오늘의 할일{" "}
                    <span className="dashboard-badge">
                        {todayTasks.reduce((sum, task) => sum + task.count, 0)}
                    </span>
                </h2>

                <div className="dashboard-today-row">
                    {todayTasks.map((task) => (
                        <div className="dashboard-today-item" key={task.label}>
                            <span>{task.label}</span>
                            <strong>{task.count}</strong>
                        </div>
                    ))}
                </div>
            </section>

            {/* 통계 */}
            <section className="dashboard-section">
                <h2>통계</h2>

                <div className="dashboard-stats-grid">
                    <div className="dashboard-chart-card">
                        <div className="dashboard-card-head">
                            <h3>방문자</h3>
                        </div>

                        <svg className="dashboard-chart" viewBox="0 0 320 140" preserveAspectRatio="none">
                            <polyline
                                points="0,110 53,90 106,70 160,95 213,60 266,80 320,40"
                                fill="none"
                                stroke="var(--admin-accent)"
                                strokeWidth="2"
                            />

                            {[110, 90, 70, 95, 60, 80, 40].map((y, index) => (
                                <circle
                                    key={index}
                                    cx={index * 53.3}
                                    cy={y}
                                    r={3}
                                    fill="var(--admin-accent)"
                                />
                            ))}
                        </svg>

                        <div className="dashboard-chart-labels">
                            {["08-18", "08-19", "08-20", "08-21", "08-22", "08-23", "08-24"].map(
                                (label) => (
                                    <span key={label}>{label}</span>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="dashboard-table-card">
                        <div className="dashboard-card-head">
                            <h3>기간별 분석</h3>
                        </div>

                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>일자</th>
                                    <th>주문수</th>
                                    <th>매출액</th>
                                    <th>방문자</th>
                                    <th>가입</th>
                                    <th>문의</th>
                                    <th>후기</th>
                                </tr>
                            </thead>

                            <tbody>
                                {periodRows.map((row) => (
                                    <tr key={row.date}>
                                        <td>{row.date}</td>
                                        <td>{row.orders}</td>
                                        <td>{row.sales}</td>
                                        <td>{row.visitors}</td>
                                        <td>{row.signups}</td>
                                        <td>{row.inquiries}</td>
                                        <td>{row.reviews}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default DashboardPage;
