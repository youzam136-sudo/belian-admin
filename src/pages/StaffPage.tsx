import { useState } from "react";
import "../styles/staff.css";

function StaffPage() {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="staff-page">
            <div className="staff-side">
                <div className="staff-count-card">
                    <span>전체 운영자</span>
                    <strong>0</strong>
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
                <div className="staff-tabs">
                    <span className="staff-tab is-active">운영진 목록</span>
                </div>

                <div className="staff-search">
                    <span className="staff-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="전체 운영자 검색"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                </div>

                <div className="staff-empty">
                    <p>Free 버전에서는 지원하지 않는 기능입니다.</p>
                    <a href="#">자세히 알아보기</a>
                </div>
            </div>
        </div>
    );
}

export default StaffPage;
