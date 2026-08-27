import { useMemo, useState } from "react";
import "../styles/members.css";

type Member = {
    id: string;
    name: string;
    email: string;
    grade: string;
    group: string;
    joinedAt: string;
    points: number;
    totalSpent: number;
    status: "active" | "dormant";
};

const members: Member[] = [
    {
        id: "m1",
        name: "관리자",
        email: "admin@belian.com",
        grade: "일반 회원",
        group: "그룹없음",
        joinedAt: "2024-03-12",
        points: 0,
        totalSpent: 0,
        status: "active",
    },
    {
        id: "m2",
        name: "김지현",
        email: "jihyun.kim@example.com",
        grade: "VIP",
        group: "우수고객",
        joinedAt: "2025-01-08",
        points: 12000,
        totalSpent: 486000,
        status: "active",
    },
    {
        id: "m3",
        name: "이서준",
        email: "seojun.lee@example.com",
        grade: "일반 회원",
        group: "그룹없음",
        joinedAt: "2025-05-21",
        points: 3200,
        totalSpent: 128000,
        status: "active",
    },
    {
        id: "m4",
        name: "박하은",
        email: "haeun.park@example.com",
        grade: "실버",
        group: "그룹없음",
        joinedAt: "2024-11-02",
        points: 800,
        totalSpent: 64000,
        status: "dormant",
    },
];

function MembersPage() {
    const [keyword, setKeyword] = useState("");

    const filtered = useMemo(() => {
        const q = keyword.trim().toLowerCase();
        if (!q) return members;
        return members.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.email.toLowerCase().includes(q)
        );
    }, [keyword]);

    return (
        <div className="members-page">
            <div className="members-toolbar">
                <div className="members-search">
                    <span className="members-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="이름, 아이디, 이메일, 연락처로 검색"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                </div>

                <button type="button" className="members-add-btn">
                    사용자 추가
                </button>
            </div>

            <span className="members-count">전체 회원 {filtered.length}명</span>

            <div className="members-table-card">
                {filtered.length === 0 ? (
                    <div className="members-empty">검색 결과가 없어요</div>
                ) : (
                    <table className="members-table">
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>계정</th>
                                <th>회원 유형</th>
                                <th>그룹</th>
                                <th>가입일</th>
                                <th>적립금</th>
                                <th>누적 구매금액</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((member) => (
                                <tr key={member.id}>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>
                                        <span className="member-grade">
                                            {member.grade}
                                        </span>
                                    </td>
                                    <td>{member.group}</td>
                                    <td>{member.joinedAt}</td>
                                    <td>{member.points.toLocaleString()}P</td>
                                    <td>{member.totalSpent.toLocaleString()}원</td>
                                    <td>
                                        <span
                                            className={`member-status ${member.status}`}
                                        >
                                            <span className="member-status-dot" />
                                            {member.status === "active"
                                                ? "정상"
                                                : "휴면"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default MembersPage;
