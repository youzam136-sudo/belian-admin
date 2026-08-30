import { useState } from "react";
import "../styles/points.css";

interface PointHistory {
  id: number;
  date: string;
  memberName: string;
  amount: number; // 양수: 지급, 음수: 차감
  relatedOrder: string;
  reason: string;
  handler: string;
}

const MOCK_HISTORY: PointHistory[] = [
  {
    id: 1,
    date: "2026-08-29",
    memberName: "김벨리",
    amount: 500,
    relatedOrder: "-",
    reason: "구매평 작성 적립금 지급",
    handler: "관리자",
  },
];

function PointsPage() {
  const [history, setHistory] = useState<PointHistory[]>(MOCK_HISTORY);
  const [activeTab, setActiveTab] = useState<"전체" | "지급" | "차감">(
    "전체"
  );
  const [searchKeyword, setSearchKeyword] = useState("");

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueType, setIssueType] = useState<"지급" | "차감">("지급");
  const [issueMemberQuery, setIssueMemberQuery] = useState("");
  const [issueAmount, setIssueAmount] = useState(0);
  const [issueReason, setIssueReason] = useState("");

  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [expiryMonths, setExpiryMonths] = useState(12);

  const filteredHistory = history.filter((h) => {
    const matchesTab =
      activeTab === "전체"
        ? true
        : activeTab === "지급"
        ? h.amount > 0
        : h.amount < 0;
    const matchesKeyword = h.reason
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return matchesTab && matchesKeyword;
  });

  const closeIssueModal = () => {
    setIsIssueModalOpen(false);
    setIssueMemberQuery("");
    setIssueAmount(0);
    setIssueReason("");
    setIssueType("지급");
  };

  const submitIssue = () => {
    const newEntry: PointHistory = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      memberName: issueMemberQuery || "회원",
      amount: issueType === "지급" ? issueAmount : -issueAmount,
      relatedOrder: "-",
      reason: issueReason || (issueType === "지급" ? "관리자 지급" : "관리자 차감"),
      handler: "관리자",
    };
    setHistory((prev) => [newEntry, ...prev]);
    closeIssueModal();
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-section points-page">
        <div className="points-page__header">
          <h2 className="points-page__title">적립금</h2>
        </div>

        <div className="points-page__cards">
          <div className="points-card">
            <div className="points-card__icon points-card__icon--issue">
              💠
            </div>
            <h3 className="points-card__title">지급 · 차감</h3>
            <p className="points-card__desc">
              회원 적립금을 지급 · 차감할 수 있어요
            </p>
            <button
              className="points-card__btn"
              onClick={() => setIsIssueModalOpen(true)}
            >
              진행
            </button>
          </div>

          <div className="points-card">
            <div className="points-card__icon points-card__icon--expiry">
              📅
            </div>
            <h3 className="points-card__title">자동 소멸</h3>
            <p className="points-card__desc">
              적립금 소멸 시점을 설정할 수 있어요
            </p>
            <button
              className="points-card__btn"
              onClick={() => setIsExpiryModalOpen(true)}
            >
              설정
            </button>
          </div>
        </div>

        <div className="points-history">
          <div className="points-history__header">
            <h3 className="points-history__title">내역</h3>
            <button className="points-history__export">내보내기 ⬇</button>
          </div>

          <div className="points-history__toolbar">
            <div className="points-history__tabs">
              <button
                className={`points-history__tab ${
                  activeTab === "전체" ? "points-history__tab--active" : ""
                }`}
                onClick={() => setActiveTab("전체")}
              >
                전체
              </button>
              <button
                className={`points-history__tab ${
                  activeTab === "지급" ? "points-history__tab--active" : ""
                }`}
                onClick={() => setActiveTab("지급")}
              >
                지급
              </button>
              <button
                className={`points-history__tab ${
                  activeTab === "차감" ? "points-history__tab--active" : ""
                }`}
                onClick={() => setActiveTab("차감")}
              >
                차감
              </button>
            </div>

            <div className="points-history__search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="사유"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="points-history__empty">
              <div className="points-history__empty-icon">P</div>
              <p>적립금 지급 · 차감 내역이 없어요</p>
            </div>
          ) : (
            <table className="points-table">
              <thead>
                <tr>
                  <th>일자</th>
                  <th>이름(닉네임)</th>
                  <th>증감</th>
                  <th>연관 주문</th>
                  <th>사유</th>
                  <th>처리자</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((h) => (
                  <tr key={h.id}>
                    <td>{h.date}</td>
                    <td>{h.memberName}</td>
                    <td>
                      <span
                        className={
                          h.amount > 0
                            ? "points-table__amount points-table__amount--plus"
                            : "points-table__amount points-table__amount--minus"
                        }
                      >
                        {h.amount > 0 ? "+" : ""}
                        {h.amount.toLocaleString()}원
                      </span>
                    </td>
                    <td>{h.relatedOrder}</td>
                    <td>{h.reason}</td>
                    <td>{h.handler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {isIssueModalOpen && (
        <div className="points-modal-overlay" onClick={closeIssueModal}>
          <div
            className="points-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="points-modal__header">
              <h3 className="points-modal__title">적립금 지급 · 차감</h3>
              <button
                className="points-modal__close"
                onClick={closeIssueModal}
              >
                ×
              </button>
            </div>

            <div className="points-modal__body">
              <div className="points-modal__field">
                <label>회원 검색</label>
                <div className="points-modal__search">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder="이름, 아이디, 연락처로 검색"
                    value={issueMemberQuery}
                    onChange={(e) => setIssueMemberQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="points-modal__field">
                <label>유형</label>
                <div className="points-modal__radio-row">
                  <label className="points-modal__radio">
                    <input
                      type="radio"
                      checked={issueType === "지급"}
                      onChange={() => setIssueType("지급")}
                    />
                    지급
                  </label>
                  <label className="points-modal__radio">
                    <input
                      type="radio"
                      checked={issueType === "차감"}
                      onChange={() => setIssueType("차감")}
                    />
                    차감
                  </label>
                </div>
              </div>

              <div className="points-modal__field">
                <label>금액</label>
                <div className="points-modal__input-with-unit">
                  <input
                    type="number"
                    value={issueAmount}
                    onChange={(e) =>
                      setIssueAmount(Number(e.target.value))
                    }
                  />
                  <span>원</span>
                </div>
              </div>

              <div className="points-modal__field">
                <label>사유</label>
                <input
                  type="text"
                  className="points-modal__text-input"
                  placeholder="예) 이벤트 참여 적립금 지급"
                  value={issueReason}
                  onChange={(e) => setIssueReason(e.target.value)}
                />
              </div>
            </div>

            <div className="points-modal__footer">
              <button className="points-btn" onClick={closeIssueModal}>
                취소
              </button>
              <button
                className="points-btn points-btn--primary"
                disabled={
                  issueMemberQuery.trim() === "" || issueAmount <= 0
                }
                onClick={submitIssue}
              >
                {issueType === "지급" ? "지급하기" : "차감하기"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isExpiryModalOpen && (
        <div
          className="points-modal-overlay"
          onClick={() => setIsExpiryModalOpen(false)}
        >
          <div
            className="points-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="points-modal__header">
              <h3 className="points-modal__title">적립금 자동 소멸 설정</h3>
              <button
                className="points-modal__close"
                onClick={() => setIsExpiryModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="points-modal__body">
              <div className="points-modal__toggle-row">
                <span>자동 소멸 사용</span>
                <label className="points-toggle">
                  <input
                    type="checkbox"
                    checked={expiryEnabled}
                    onChange={(e) => setExpiryEnabled(e.target.checked)}
                  />
                  <span className="points-toggle__slider" />
                </label>
              </div>

              {expiryEnabled && (
                <div className="points-modal__field">
                  <label>소멸 기준</label>
                  <div className="points-modal__expiry-row">
                    적립일로부터{" "}
                    <input
                      type="number"
                      value={expiryMonths}
                      onChange={(e) =>
                        setExpiryMonths(Number(e.target.value))
                      }
                    />{" "}
                    개월 후 자동 소멸
                  </div>
                </div>
              )}
            </div>

            <div className="points-modal__footer">
              <button
                className="points-btn"
                onClick={() => setIsExpiryModalOpen(false)}
              >
                취소
              </button>
              <button
                className="points-btn points-btn--primary"
                onClick={() => setIsExpiryModalOpen(false)}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PointsPage;
