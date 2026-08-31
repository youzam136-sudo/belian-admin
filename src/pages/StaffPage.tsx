import { useMemo, useState } from "react";
import "../styles/staff.css";
import { SearchIcon } from "../components/icons/SearchIcon";

type StaffMember = {
    id: string;
    name: string;
    email: string;
    role: string;
    joinedAt: string;
};

const staffMembers: StaffMember[] = [
    {
        id: "s1",
        name: "관리자",
        email: "admin@belian.com",
        role: "소유자",
        joinedAt: "2026-08-21",
    },
];

function StaffPage() {
    const [keyword, setKeyword] = useState("");

    const filtered = useMemo(() => {
        const q = keyword.trim().toLowerCase();
        if (!q) return staffMembers;
        return staffMembers.filter(
            (s) =>
                s.name.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q)
        );
    }, [keyword]);

    return (
        <div className="staff-page">
            <div className="staff-side">
                <div className="staff-count-card">
                    <span>전체 운영자</span>
                    <strong>{staffMembers.length}</strong>
                </div>

                <button type="button" className="staff-new-group-btn">
                    새 운영진 그룹 만들기
                </button>

                <p className="staff-guide">
                    여러 사람과 함께 사이트를 관리할 수 있습니다. 믿을 수
                    있는 사용자 그룹에게만 조심해서 관리 권한을 주세요.
                </p>

                <p className="staff-guide">
                    각 항목에는 알림 발신 및 수신 권한과 사이트 내 조회 및
                    편집 권한을 포함하고 있습니다.
                </p>

                <p className="staff-guide">
                    회원가입과 관련된 설정은{" "}
                    <a href="#">가입 및 그룹설정</a> 및{" "}
                    <a href="#">소셜 로그인 설정</a>을 참고하세요.
                </p>
            </div>

            <div className="staff-main">
                <div className="staff-tabs-row">
                    <div className="staff-tabs">
                        <span className="staff-tab is-active">
                            운영진 목록
                        </span>
                    </div>

                    <button type="button" className="staff-add-btn">
                        운영자 추가
                    </button>
                </div>

                <div className="staff-search">
                    <span className="staff-search-icon"><SearchIcon className="search-icon-svg" /></span>
                    <input
                        type="text"
                        placeholder="전체 운영자 검색"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="staff-empty">
                        <p>검색 결과가 없어요</p>
                    </div>
                ) : (
                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>계정</th>
                                <th>권한</th>
                                <th>등록일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((staff) => (
                                <tr key={staff.id}>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td>
                                        <span className="staff-role">
                                            {staff.role}
                                        </span>
                                    </td>
                                    <td>{staff.joinedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default StaffPage;
