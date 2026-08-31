import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/inquiries.css";
import { getInquiries } from "../utils/inquiriesStore";

function ProductInquiriesPage() {
  const navigate = useNavigate();
  const [inquiries] = useState(() => getInquiries());
  const [activeTab, setActiveTab] = useState<"전체" | "답변대기" | "답변완료">(
    "전체"
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchType, setSearchType] = useState("제목/본문");
  const [inquiryType, setInquiryType] = useState("전체");
  const [secretType, setSecretType] = useState("전체");
  const [periodRange, setPeriodRange] = useState("");

  const resetFilters = () => {
    setSearchType("제목/본문");
    setInquiryType("전체");
    setSecretType("전체");
    setPeriodRange("");
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesTab =
      activeTab === "전체" ? true : inquiry.status === activeTab;
    const matchesKeyword = inquiry.title
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return matchesTab && matchesKeyword;
  });

  return (
    <div className="dashboard-page">
      <section className="dashboard-section inquiries-page">
        <div className="inquiries-header">
          <div className="inquiries-tabs">
            <button
              className={`inquiries-tab ${
                activeTab === "전체" ? "inquiries-tab--active" : ""
              }`}
              onClick={() => setActiveTab("전체")}
            >
              전체
            </button>
            <button
              className={`inquiries-tab ${
                activeTab === "답변대기" ? "inquiries-tab--active" : ""
              }`}
              onClick={() => setActiveTab("답변대기")}
            >
              답변 대기
            </button>
            <button
              className={`inquiries-tab ${
                activeTab === "답변완료" ? "inquiries-tab--active" : ""
              }`}
              onClick={() => setActiveTab("답변완료")}
            >
              답변 완료
            </button>
          </div>

          <div className="inquiries-header__actions">
            <div className="inquiries-search">
              <span className="inquiries-search__icon">🔍</span>
              <input
                type="text"
                placeholder="문의 제목/본문 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            <div className="inquiries-filter-wrap">
              <button
                className={`inquiries-icon-btn ${
                  isFilterOpen ? "inquiries-icon-btn--active" : ""
                }`}
                onClick={() => setIsFilterOpen((prev) => !prev)}
              >
                ⚲
              </button>

              {isFilterOpen && (
                <>
                  <div
                    className="inquiries-dropdown-overlay"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="inquiries-filter-panel">
                    <div className="inquiries-filter-field">
                      <label>검색 유형</label>
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                      >
                        <option>제목/본문</option>
                        <option>제목</option>
                        <option>본문</option>
                      </select>
                    </div>

                    <div className="inquiries-filter-field">
                      <label>문의 유형</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                      >
                        <option>전체</option>
                        <option>상품 문의</option>
                        <option>배송 문의</option>
                        <option>교환/반품 문의</option>
                      </select>
                    </div>

                    <div className="inquiries-filter-field">
                      <label>비밀문의 여부</label>
                      <select
                        value={secretType}
                        onChange={(e) => setSecretType(e.target.value)}
                      >
                        <option>전체</option>
                        <option>비밀글</option>
                        <option>공개글</option>
                      </select>
                    </div>

                    <div className="inquiries-filter-field">
                      <label>기간</label>
                      <input
                        type="text"
                        className="inquiries-filter-field__date"
                        placeholder="시작일 → 종료일"
                        value={periodRange}
                        onChange={(e) => setPeriodRange(e.target.value)}
                      />
                    </div>

                    <div className="inquiries-filter-panel__footer">
                      <button
                        className="inquiries-filter-btn"
                        onClick={resetFilters}
                      >
                        초기화
                      </button>
                      <button
                        className="inquiries-filter-btn inquiries-filter-btn--primary"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="inquiries-body">
          {filteredInquiries.length === 0 ? (
            <div className="inquiries-empty">
              <div className="inquiries-empty__icon">📄</div>
              <p className="inquiries-empty__text">작성된 문의가 없어요</p>
            </div>
          ) : (
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>상태</th>
                  <th>문의 제목</th>
                  <th>상품명</th>
                  <th>작성자</th>
                  <th>비밀글</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <span
                        className={`inquiries-badge ${
                          inquiry.status === "답변완료"
                            ? "inquiries-badge--done"
                            : "inquiries-badge--pending"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td
                      className="inquiries-table__title-cell inquiries-table__title-cell--clickable"
                      onClick={() =>
                        navigate(`/products/inquiries/${inquiry.id}`, {
                          state: { inquiry },
                        })
                      }
                    >
                      {inquiry.title}
                    </td>
                    <td>{inquiry.productName}</td>
                    <td>{inquiry.authorName}</td>
                    <td>{inquiry.isSecret ? "비밀글" : "-"}</td>
                    <td>{inquiry.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductInquiriesPage;
