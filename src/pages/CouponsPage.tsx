import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/coupons.css";

interface Coupon {
  id: number;
  name: string;
  target: string;
  benefit: string;
  period: string;
  status: "대기" | "진행중" | "종료";
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: 1,
    name: "여름 기획전 10% 할인 쿠폰",
    target: "전체 회원",
    benefit: "3,000원 할인 (5만원 이상 구매시)",
    period: "2026.08.31 ~ 2026.09.07",
    status: "진행중",
  },
];

const COUPON_TYPES = [
  {
    key: "down",
    title: "고객 다운로드",
    desc: "고객이 직접 다운로드 받는 쿠폰을 만들어 보세요",
    tags: ["장바구니 쿠폰", "이벤트 쿠폰팩", "채널 친구 추가 쿠폰", "시크릿 쿠폰"],
  },
  {
    key: "auto",
    title: "자동 발행",
    desc: "조건을 만족한 고객에게 쿠폰을 자동으로 발행해요",
    tags: ["신규 회원 웰컴 쿠폰", "생일 쿠폰", "첫 구매 쿠폰", "쇼핑 등급업"],
  },
  {
    key: "create",
    title: "쿠폰 코드 생성",
    desc: "코드를 입력하여 사용하는 쿠폰을 발행해요",
    tags: ["레퍼럴 쿠폰"],
  },
  {
    key: "targeted",
    title: "지정 발행",
    desc: "특정 그룹 혹은 회원에게 쿠폰을 발행해요",
    tags: ["정기 멤버십", "재구매 쿠폰"],
  },
];

function CouponsPage() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [statusFilter, setStatusFilter] = useState<
    "전체" | "대기" | "진행중" | "종료"
  >("전체");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [isExposureOpen, setIsExposureOpen] = useState(false);
  const [showCouponButton, setShowCouponButton] = useState(false);
  const [showCouponApplied, setShowCouponApplied] = useState(false);

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [moreMenuOpenId, setMoreMenuOpenId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const counts = {
    전체: coupons.length,
    대기: coupons.filter((c) => c.status === "대기").length,
    진행중: coupons.filter((c) => c.status === "진행중").length,
    종료: coupons.filter((c) => c.status === "종료").length,
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesStatus =
      statusFilter === "전체" ? true : c.status === statusFilter;
    const matchesKeyword = c.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return matchesStatus && matchesKeyword;
  });

  const goToCreate = (type: string) => {
    setIsTypeModalOpen(false);
    navigate(`/promotions/coupons/new?type=${type}`);
  };

  const confirmDeleteCoupon = () => {
    setCoupons((prev) => prev.filter((c) => c.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  const goToEdit = (coupon: Coupon) => {
    navigate(`/promotions/coupons/edit/${coupon.id}`, { state: coupon });
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-section coupons-page">
        <div className="coupons-page__header">
          <h2 className="coupons-page__title">쿠폰</h2>
          <div className="coupons-page__header-actions">
            <div className="coupons-exposure-wrap">
              <button
                className="coupons-btn"
                onClick={() => setIsExposureOpen((prev) => !prev)}
              >
                쿠폰 노출 설정
              </button>
              {isExposureOpen && (
                <>
                  <div
                    className="coupons-dropdown-overlay"
                    onClick={() => setIsExposureOpen(false)}
                  />
                  <div className="coupons-exposure-panel">
                    <div className="coupons-exposure-row">
                      <span>쿠폰 받기 버튼 ⓘ</span>
                      <label className="coupons-toggle">
                        <input
                          type="checkbox"
                          checked={showCouponButton}
                          onChange={(e) =>
                            setShowCouponButton(e.target.checked)
                          }
                        />
                        <span className="coupons-toggle__slider" />
                      </label>
                    </div>
                    <div className="coupons-exposure-row">
                      <span>쿠폰 적용가 ⓘ</span>
                      <label className="coupons-toggle">
                        <input
                          type="checkbox"
                          checked={showCouponApplied}
                          onChange={(e) =>
                            setShowCouponApplied(e.target.checked)
                          }
                        />
                        <span className="coupons-toggle__slider" />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              className="coupons-btn coupons-btn--primary"
              onClick={() => setIsTypeModalOpen(true)}
            >
              쿠폰 만들기 ﹀
            </button>
          </div>
        </div>

        <div className="coupons-list">
          <div className="coupons-list__toolbar">
            <div className="coupons-status-tabs">
              <button
                className={`coupons-status-tab ${
                  statusFilter === "전체" ? "coupons-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("전체")}
              >
                전체{" "}
                <span className="coupons-status-tab__count">
                  {counts.전체}
                </span>
              </button>
              <button
                className={`coupons-status-tab ${
                  statusFilter === "대기" ? "coupons-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("대기")}
              >
                대기{" "}
                <span className="coupons-status-tab__count">
                  {counts.대기}
                </span>
              </button>
              <button
                className={`coupons-status-tab ${
                  statusFilter === "진행중"
                    ? "coupons-status-tab--active"
                    : ""
                }`}
                onClick={() => setStatusFilter("진행중")}
              >
                진행 중{" "}
                <span className="coupons-status-tab__count">
                  {counts.진행중}
                </span>
              </button>
              <button
                className={`coupons-status-tab ${
                  statusFilter === "종료" ? "coupons-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("종료")}
              >
                종료{" "}
                <span className="coupons-status-tab__count">
                  {counts.종료}
                </span>
              </button>
            </div>

            <input
              type="text"
              className="coupons-search"
              placeholder="쿠폰명"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="coupons-list__body">
            {filteredCoupons.length === 0 ? (
              <p className="coupons-list__empty">등록된 쿠폰이 없습니다.</p>
            ) : (
              <table className="coupons-table">
                <thead>
                  <tr>
                    <th>쿠폰명</th>
                    <th>발행 대상</th>
                    <th>혜택</th>
                    <th>기간</th>
                    <th>상태</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="coupons-table__row"
                      onClick={() => goToEdit(coupon)}
                    >
                      <td className="coupons-table__name-cell">
                        {coupon.name}
                      </td>
                      <td>{coupon.target}</td>
                      <td>{coupon.benefit}</td>
                      <td>{coupon.period}</td>
                      <td>
                        <span
                          className={`coupons-badge ${
                            coupon.status === "진행중"
                              ? "coupons-badge--active"
                              : coupon.status === "대기"
                              ? "coupons-badge--waiting"
                              : "coupons-badge--ended"
                          }`}
                        >
                          {coupon.status}
                        </span>
                      </td>
                      <td
                        className="coupons-table__more-cell"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="coupons-table__more"
                          onClick={() =>
                            setMoreMenuOpenId(
                              moreMenuOpenId === coupon.id
                                ? null
                                : coupon.id
                            )
                          }
                        >
                          ⋮
                        </button>
                        {moreMenuOpenId === coupon.id && (
                          <>
                            <div
                              className="coupons-dropdown-overlay"
                              onClick={() => setMoreMenuOpenId(null)}
                            />
                            <div className="coupons-table__menu">
                              <button
                                onClick={() => {
                                  setMoreMenuOpenId(null);
                                  goToEdit(coupon);
                                }}
                              >
                                수정
                              </button>
                              <button
                                className="coupons-table__menu-item--danger"
                                onClick={() => {
                                  setDeleteTargetId(coupon.id);
                                  setMoreMenuOpenId(null);
                                }}
                              >
                                삭제
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {isTypeModalOpen && (
        <div
          className="coupons-modal-overlay"
          onClick={() => setIsTypeModalOpen(false)}
        >
          <div
            className="coupons-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="coupons-modal__header">
              <h3 className="coupons-modal__title">쿠폰 유형 선택</h3>
              <button
                className="coupons-modal__close"
                onClick={() => setIsTypeModalOpen(false)}
              >
                ×
              </button>
            </div>

            <p className="coupons-modal__tip">
              Tip. 어떤 쿠폰을 만들어야 할지 고민이 될 때{" "}
              <span className="coupons-modal__tip-link">가이드</span>를
              확인해 보세요
            </p>

            <div className="coupons-type-grid">
              {COUPON_TYPES.map((type) => (
                <button
                  key={type.key}
                  className="coupons-type-card"
                  onClick={() => goToCreate(type.key)}
                >
                  <h4 className="coupons-type-card__title">{type.title}</h4>
                  <p className="coupons-type-card__desc">{type.desc}</p>
                  <div className="coupons-type-card__tags">
                    {type.tags.map((tag) => (
                      <span key={tag} className="coupons-type-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="coupons-modal__warning">
              ⚠ 한국인터넷진흥원 쿠폰 알림톡 정책이 강화되어 주의가
              필요해요{" "}
              <span className="coupons-modal__warning-link">
                지금처럼 알림톡 보낼 수 있는 방법 확인하기 ›
              </span>
            </div>
          </div>
        </div>
      )}

      {deleteTargetId !== null && (
        <div
          className="coupons-modal-overlay"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            className="coupons-modal coupons-modal--small"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="coupons-modal__header">
              <h3 className="coupons-modal__title">쿠폰 삭제</h3>
            </div>
            <p className="coupons-modal__confirm-text">
              이 쿠폰을 삭제하시겠어요? 삭제 후에는 복구할 수 없어요.
            </p>
            <div className="coupons-modal__footer">
              <button
                className="coupons-btn"
                onClick={() => setDeleteTargetId(null)}
              >
                취소
              </button>
              <button
                className="coupons-btn coupons-btn--danger"
                onClick={confirmDeleteCoupon}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponsPage;
