import { useState } from "react";
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
        title: "결제 방법 추가",
        badge: "PG 가입 무료",
        items: [
            { label: "상품 등록하기", done: true },
            { label: "법적 필수 정보 입력하기", done: false },
            { label: "약관·개인정보처리방침 확인", done: false },
            { label: "PG 신청하기", done: false },
        ],
    },
    {
        title: "기본설정",
        items: [
            { label: "사이트 정보 설정하기", done: false },
            { label: "관리자 계정 설정하기", done: true },
            { label: "약관 설정하기", done: false },
            { label: "도메인 연결하기", done: false },
        ],
    },
    {
        title: "판매하기",
        items: [
            { label: "상품 추가하기", done: false },
            { label: "배송 설정하기", done: false },
            { label: "결제 수단 연결하기", done: false },
        ],
    },
    {
        title: "성장하기",
        items: [
            { label: "검색엔진 등록하기", done: false },
            { label: "쿠폰/이벤트 등록하기", done: false },
            { label: "SMS/알림톡 설정하기", done: false },
            { label: "방문자 분석하기", done: false },
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

const chartData = [
    { label: "08-20", pageviews: 0, visitors: 0 },
    { label: "08-21", pageviews: 0, visitors: 0 },
    { label: "08-22", pageviews: 0, visitors: 0 },
    { label: "08-23", pageviews: 0, visitors: 0 },
    { label: "08-24", pageviews: 1, visitors: 1 },
    { label: "08-25", pageviews: 0, visitors: 0 },
    { label: "08-26", pageviews: 1, visitors: 1 },
];

function DashboardPage() {
    const [memo, setMemo] = useState("");
    const [infoOpen, setInfoOpen] = useState(true);
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

    const chartWidth = 640;
    const chartHeight = 220;
    const maxValue = Math.max(1, ...chartData.map((d) => Math.max(d.pageviews, d.visitors)));
    const stepX = chartWidth / (chartData.length - 1);

    const getY = (value: number) =>
        chartHeight - (value / maxValue) * (chartHeight - 20) - 10;

    const linePoints = chartData
        .map((d, i) => `${i * stepX},${getY(d.pageviews)}`)
        .join(" ");

    const areaPoints =
        `0,${chartHeight} ` +
        chartData.map((d, i) => `${i * stepX},${getY(d.pageviews)}`).join(" ") +
        ` ${chartWidth},${chartHeight}`;

    return (
        <div className="dashboard-layout">

            <div className="dashboard-page">

                <section className="dashboard-section">
                    <h2>요약</h2>

                    <div className="dashboard-info-banner">
                        안전한 상품 판매를 위해 쇼핑몰에 결제 수단을 추가해 보세요
                        <a href="#">추가</a>
                    </div>

                    <div className="dashboard-checklist-grid">
                        {checklistCards.map((card) => {
                            const done = card.items.filter((item) => item.done).length;

                            return (
                                <div className="dashboard-checklist-card" key={card.title}>
                                    <div className="dashboard-checklist-head">
                                        <h3>
                                            {card.title}
                                            {card.badge && (
                                                <span className="dashboard-checklist-tag">
                                                    {card.badge}
                                                </span>
                                            )}
                                        </h3>
                                    </div>

                                    <span className="dashboard-checklist-count">
                                        {done}/{card.items.length}개 완료
                                    </span>

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
                                                <span className="dashboard-checklist-dot">
                                                    {item.done && "✓"}
                                                </span>
                                                {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </section>

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

                <section className="dashboard-section">
                    <h2>통계</h2>

                    <div className="dashboard-stats-grid">
                        <div className="dashboard-chart-card">
