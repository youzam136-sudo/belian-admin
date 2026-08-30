import { useState } from "react";
import "../styles/reviews.css";

function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<
    "list" | "connect" | "settings" | "addon"
  >("list");

  return (
    <div className="dashboard-page">
      <section className="dashboard-section reviews-page">
        <div className="reviews-page__tabs">
          <button
            className={`reviews-page__tab ${
              activeTab === "list" ? "reviews-page__tab--active" : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            구매평 목록
          </button>
          <button
            className={`reviews-page__tab ${
              activeTab === "connect" ? "reviews-page__tab--active" : ""
            }`}
            onClick={() => setActiveTab("connect")}
          >
            구매평 연결
          </button>
          <button
            className={`reviews-page__tab ${
              activeTab === "settings" ? "reviews-page__tab--active" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            구매평 설정
          </button>
          <button
            className={`reviews-page__tab ${
              activeTab === "addon" ? "reviews-page__tab--active" : ""
            }`}
            onClick={() => setActiveTab("addon")}
          >
            부가 서비스
          </button>
        </div>

        {activeTab === "list" && <ReviewsListTab />}
        {activeTab === "connect" && <ReviewsConnectTab />}
        {activeTab === "settings" && <ReviewsSettingsTab />}
        {activeTab === "addon" && (
          <p className="reviews-page__placeholder">
            이용 가능한 부가 서비스가 없습니다.
          </p>
        )}
      </section>
    </div>
  );
}

/* ---------------- 구매평 목록 ---------------- */

function ReviewsListTab() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [answerFilter, setAnswerFilter] = useState("답변 전체");
  const [starFilter, setStarFilter] = useState("별 점수");
  const [reviewTypeFilter, setReviewTypeFilter] = useState("구매평 유형");
  const [orderTypeFilter, setOrderTypeFilter] = useState("주문 유형");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gradeFilter, setGradeFilter] = useState("구매평 등급");
  const [authorName, setAuthorName] = useState("");
  const [productNo, setProductNo] = useState("");
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");

  const resetFilters = () => {
    setAnswerFilter("답변 전체");
    setStarFilter("별 점수");
    setReviewTypeFilter("구매평 유형");
    setOrderTypeFilter("주문 유형");
    setStartDate("");
    setEndDate("");
    setGradeFilter("구매평 등급");
    setAuthorName("");
    setProductNo("");
    setProductName("");
    setBrand("");
  };

  return (
    <div className="reviews-list">
      <div className="reviews-list__toolbar">
        <div className="reviews-filter-wrap">
          <button
            className="reviews-filter-trigger"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            필터 <span>﹀</span>
          </button>

          {isFilterOpen && (
            <>
              <div
                className="reviews-dropdown-overlay"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="reviews-filter-panel">
                <select
                  value={answerFilter}
                  onChange={(e) => setAnswerFilter(e.target.value)}
                >
                  <option>답변 전체</option>
                  <option>답변 대기</option>
                  <option>답변 완료</option>
                </select>
                <select
                  value={starFilter}
                  onChange={(e) => setStarFilter(e.target.value)}
                >
                  <option>별 점수</option>
                  <option>5점</option>
                  <option>4점</option>
                  <option>3점</option>
                  <option>2점</option>
                  <option>1점</option>
                </select>
                <select
                  value={reviewTypeFilter}
                  onChange={(e) => setReviewTypeFilter(e.target.value)}
                >
                  <option>구매평 유형</option>
                  <option>텍스트</option>
                  <option>포토</option>
                  <option>동영상</option>
                </select>
                <select
                  value={orderTypeFilter}
                  onChange={(e) => setOrderTypeFilter(e.target.value)}
                >
                  <option>주문 유형</option>
                  <option>일반 주문</option>
                  <option>정기구독</option>
                </select>
                <input
                  type="text"
                  placeholder="검색할 기간의 시작일"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="검색할 기간의 종료일"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                >
                  <option>구매평 등급</option>
                  <option>일반</option>
                  <option>우수</option>
                </select>
                <input
                  type="text"
                  placeholder="작성자명"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="상품번호"
                  value={productNo}
                  onChange={(e) => setProductNo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="상품명"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="브랜드"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />

                <div className="reviews-filter-panel__footer">
                  <button
                    className="reviews-btn"
                    onClick={resetFilters}
                  >
                    초기화
                  </button>
                  <button
                    className="reviews-btn reviews-btn--primary"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    검색
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="reviews-search">
          <input
            type="text"
            placeholder="내용 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="reviews-search__icon">🔍</span>
        </div>
      </div>

      <div className="reviews-list__header">
        <label className="reviews-list__select-all">
          <input type="checkbox" />
          구매평 <span className="reviews-list__count">0</span>
        </label>

        <div className="reviews-list__actions">
          <button
            className="reviews-list__export"
            onClick={() => setIsExportModalOpen(true)}
          >
            ☁ 내보내기
          </button>
          <select className="reviews-list__page-size">
            <option>5개씩 보기</option>
            <option>10개씩 보기</option>
            <option>20개씩 보기</option>
          </select>
        </div>
      </div>

      <div className="reviews-list__body">
        <p className="reviews-list__empty">작성된 구매평이 없습니다.</p>
      </div>

      {isExportModalOpen && (
        <div
          className="reviews-modal-overlay"
          onClick={() => setIsExportModalOpen(false)}
        >
          <div
            className="reviews-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reviews-modal__header">
              <h3 className="reviews-modal__title">구매평 엑셀 다운로드</h3>
              <button
                className="reviews-modal__close"
                onClick={() => setIsExportModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="reviews-modal__notice">
              현재 검색 및 필터된 구매평을 기준으로 다운로드 됩니다.
            </div>

            <div className="reviews-modal__body">
              <button className="reviews-btn reviews-btn--primary">
                엑셀 파일 요청
              </button>

              <table className="reviews-export-table">
                <thead>
                  <tr>
                    <th>요청 항목</th>
                    <th>요청 양식</th>
                    <th>요청 일시</th>
                    <th>다운로드 가능기한</th>
                    <th>다운로드</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="reviews-export-table__empty">
                      요청된 데이터가 없습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="reviews-modal__footer">
              <button
                className="reviews-btn"
                onClick={() => setIsExportModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- 구매평 연결 ---------------- */

function ReviewsConnectTab() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [connectMode, setConnectMode] = useState<"mutual" | "oneWay">(
    "mutual"
  );

  return (
    <div className="reviews-connect">
      <div className="reviews-connect__card">
        <h3 className="reviews-connect__title">
          상품별로 나뉜 구매평을 하나로 모아보세요
        </h3>
        <p className="reviews-connect__desc">
          비슷한 상품의 구매평을 함께 보여 고객이 더 쉽게 비교하고
          신뢰하며 구매를 결정할 수 있어요.
        </p>

        <div className="reviews-connect__actions">
          <button
            className="reviews-btn reviews-btn--dark"
            onClick={() => setIsConnectModalOpen(true)}
          >
            구매평 연결 추가
          </button>
          <button
            className="reviews-btn"
            onClick={() => setIsPreviewModalOpen(true)}
          >
            구매평 연결 미리 보기
          </button>
        </div>

        <div className="reviews-connect__example">
          <div className="reviews-connect__example-product">
            <div className="reviews-connect__example-thumb reviews-connect__example-thumb--gray" />
            <span>아임웹 티셔츠 (그레이)</span>
            <span className="reviews-connect__example-count">
              구매평 10개
            </span>
          </div>
          <span className="reviews-connect__example-link">🔗</span>
          <div className="reviews-connect__example-product">
            <div className="reviews-connect__example-thumb reviews-connect__example-thumb--pink" />
            <span>아임웹 티셔츠 (핑크)</span>
            <span className="reviews-connect__example-count">
              구매평 20개
            </span>
          </div>
        </div>
      </div>

      {isConnectModalOpen && (
        <div
          className="reviews-modal-overlay"
          onClick={() => setIsConnectModalOpen(false)}
        >
          <div
            className="reviews-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reviews-modal__header">
              <h3 className="reviews-modal__title">구매평 연결</h3>
              <button
                className="reviews-modal__close"
                onClick={() => setIsConnectModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="reviews-connect-modal__tabs">
              <button
                className={`reviews-connect-modal__tab ${
                  connectMode === "mutual"
                    ? "reviews-connect-modal__tab--active"
                    : ""
                }`}
                onClick={() => setConnectMode("mutual")}
              >
                서로 연결
              </button>
              <button
                className={`reviews-connect-modal__tab ${
                  connectMode === "oneWay"
                    ? "reviews-connect-modal__tab--active"
                    : ""
                }`}
                onClick={() => setConnectMode("oneWay")}
              >
                한쪽에 연결
              </button>
            </div>

            <div className="reviews-modal__body">
              {connectMode === "mutual" ? (
                <div className="reviews-connect-box">
                  <p className="reviews-connect-box__title">
                    연결 상품 (0/20)
                  </p>
                  <div className="reviews-connect-box__icons">
                    <span className="reviews-connect-box__icon" />
                    <span className="reviews-connect-box__link">🔗</span>
                    <span className="reviews-connect-box__icon" />
                  </div>
                  <p className="reviews-connect-box__desc">
                    구매평을 공유할 상품을 추가해 주세요.
                  </p>
                  <button className="reviews-btn">상품 추가</button>
                </div>
              ) : (
                <>
                  <div className="reviews-connect-box">
                    <p className="reviews-connect-box__title">
                      제공받을 상품 (0/1)
                    </p>
                    <div className="reviews-connect-box__icons">
                      <span className="reviews-connect-box__icon" />
                    </div>
                    <p className="reviews-connect-box__desc">
                      구매평이 필요한 상품을 추가해 주세요.
                    </p>
                    <button className="reviews-btn">상품 추가</button>
                  </div>

                  <div className="reviews-connect-box__arrow">↑</div>

                  <div className="reviews-connect-box">
                    <p className="reviews-connect-box__title">
                      제공할 상품 (0/20)
                    </p>
                    <div className="reviews-connect-box__icons">
                      <span className="reviews-connect-box__icon" />
                      <span className="reviews-connect-box__icon" />
                    </div>
                    <p className="reviews-connect-box__desc">
                      구매평을 제공할 상품을 추가해 주세요.
                    </p>
                    <button className="reviews-btn">상품 추가</button>
                  </div>
                </>
              )}
            </div>

            <div className="reviews-modal__footer">
              <button
                className="reviews-btn"
                onClick={() => setIsConnectModalOpen(false)}
              >
                취소
              </button>
              <button
                className="reviews-btn reviews-btn--primary"
                disabled
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {isPreviewModalOpen && (
        <div
          className="reviews-modal-overlay"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div
            className="reviews-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reviews-modal__header">
              <h3 className="reviews-modal__title">구매평 연결 미리 보기</h3>
              <button
                className="reviews-modal__close"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                ×
              </button>
            </div>

            <p className="reviews-preview__desc">
              연결된 상품의 구매평에는 '이 후기는 다른 상품에서 작성된
              후기입니다.' 문구가 고객에게 표시돼요.
            </p>

            <div className="reviews-preview__card">
              <div className="reviews-preview__item">
                <div className="reviews-preview__item-header">
                  <span>베이직 코튼 반팔 티셔츠(화이트 색상)</span>
                  <span
                    className="reviews-preview__badge"
                    title="이 후기는 다른 상품에서 작성된 후기입니다."
                  >
                    ⓘ
                  </span>
                </div>
                <p className="reviews-preview__option">[옵션] 사이즈: L</p>
                <p className="reviews-preview__text">
                  여름에 입기 딱 좋아요. 원단도 부드럽고 사이즈도
                  정사이즈에요.
                </p>
                <div className="reviews-preview__thumb" />
              </div>

              <div className="reviews-preview__item">
                <div className="reviews-preview__item-header">
                  <span>베이직 코튼 반팔 티셔츠(블랙 색상)</span>
                </div>
                <p className="reviews-preview__option">[옵션] 사이즈: L</p>
                <p className="reviews-preview__text">
                  배송 빠르고 포장 깔끔했어요. 살짝 머슬핏 느낌이에요.
                  <br />
                  목 늘어남 걱정했는데 생각보다 탄탄하네요.
                </p>
                <div className="reviews-preview__thumb-row">
                  <div className="reviews-preview__thumb" />
                  <div className="reviews-preview__thumb" />
                </div>
              </div>

              <p className="reviews-preview__caption">
                (예시) 상품 상세페이지 구매평 화면
              </p>
            </div>

            <div className="reviews-modal__footer">
              <button
                className="reviews-btn"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- 구매평 설정 ---------------- */

function ReviewsSettingsTab() {
  const [expandManage, setExpandManage] = useState(false);
  const [bestWorstOrder, setBestWorstOrder] = useState(true);
  const [showHiddenProductReviews, setShowHiddenProductReviews] =
    useState(false);
  const [writeGuideText, setWriteGuideText] = useState(
    ""
  );
  const [popupEnabled, setPopupEnabled] = useState(false);
  const [popupText, setPopupText] = useState("");

  return (
    <div className="reviews-settings">
      <div className="reviews-settings__intro">
        <h3 className="reviews-settings__intro-title">기본 설정</h3>
        <p className="reviews-settings__intro-desc">
          구매평 관련 적립금 설정은 쇼핑 &gt; 환경설정에서 해주세요.
        </p>
      </div>

      <div className="reviews-settings__panel">
        <div className="reviews-settings__field">
          <label className="reviews-settings__label">노출 설정</label>
          <div className="reviews-settings__checkbox-group">
            <label className="reviews-settings__checkbox">
              <input
                type="checkbox"
                checked={expandManage}
                onChange={(e) => setExpandManage(e.target.checked)}
              />
              구매평/QnA 관리 펼쳐보기
            </label>
            <label className="reviews-settings__checkbox">
              <input
                type="checkbox"
                checked={bestWorstOrder}
                onChange={(e) => setBestWorstOrder(e.target.checked)}
              />
              베스트/워스트 구매평 순서 조정
            </label>
            <label className="reviews-settings__checkbox">
              <input
                type="checkbox"
                checked={showHiddenProductReviews}
                onChange={(e) =>
                  setShowHiddenProductReviews(e.target.checked)
                }
              />
              숨김 상태의 상품에 작성된 구매평 노출하기
            </label>
          </div>
        </div>

        <div className="reviews-settings__field">
          <label className="reviews-settings__label">작성 안내 문구</label>
          <textarea
            className="reviews-settings__textarea"
            rows={4}
            placeholder={
              "미입력시 '어떤 점이 좋으셨나요?'가 표시됩니다.\n예) 후기를 작성해 주시면 500포인트를 드려요"
            }
            value={writeGuideText}
            onChange={(e) => setWriteGuideText(e.target.value)}
          />
        </div>

        <div className="reviews-settings__field">
          <label className="reviews-settings__label">구매평 유도 팝업</label>
          <label className="reviews-settings__checkbox">
            <input
              type="checkbox"
              checked={popupEnabled}
              onChange={(e) => setPopupEnabled(e.target.checked)}
            />
            배송완료 후 재접속 시 구매평 유도 팝업 알림
          </label>
          <textarea
            className="reviews-settings__textarea"
            rows={4}
            placeholder="예) 상품에 대한 후기를 남겨주시면 100포인트를 드려요"
            value={popupText}
            onChange={(e) => setPopupText(e.target.value)}
          />
          <p className="reviews-settings__hint">
            네이버페이, 비회원 주문은 해당되지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
