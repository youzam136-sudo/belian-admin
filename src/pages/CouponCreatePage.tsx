import { useState } from "react";
import { useNavigate, useSearchParams, useParams, useLocation } from "react-router-dom";
import "../styles/couponcreate.css";

type CouponType = "down" | "auto" | "create" | "targeted";

const BANNER_INFO: Record<string, { icon: string; title: string; desc: string }> = {
  down: {
    icon: "⬇",
    title: "고객 다운로드",
    desc: "고객이 직접 다운로드 받는 쿠폰을 만들어 보세요",
  },
  auto: {
    icon: "◎",
    title: "자동발행",
    desc: "조건을 만족한 고객에게 쿠폰을 자동으로 발행해요",
  },
};

interface EditingCoupon {
  id: number;
  name: string;
  target: string;
  benefit: string;
  period: string;
  status: string;
}

function CouponCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = Boolean(id);
  const editingCoupon = location.state as EditingCoupon | undefined;

  const type = (searchParams.get("type") || "down") as CouponType;

  const parsedAmount = editingCoupon
    ? Number(editingCoupon.benefit.match(/([\d,]+)원/)?.[1]?.replace(/,/g, "") || 0)
    : 0;
  const parsedMinOrder = editingCoupon
    ? Number(
        editingCoupon.benefit.match(/\(([\d,]+)/)?.[1]?.replace(/,/g, "") || 0
      )
    : 0;
  const parsedStartDate = editingCoupon
    ? editingCoupon.period.split(" ~ ")[0]?.trim() || "2026.08.31"
    : "2026.08.31";
  const parsedEndDate = editingCoupon
    ? editingCoupon.period.split(" ~ ")[1]?.trim() || "2026.09.07"
    : "2026.09.07";
  const parsedTargetGeneral: "전체회원" | "특정그룹" | "특정회원" =
    editingCoupon?.target === "특정 그룹"
      ? "특정그룹"
      : editingCoupon?.target === "특정 회원"
      ? "특정회원"
      : "전체회원";

  const [couponName, setCouponName] = useState(editingCoupon?.name || "");

  const [issueTargetGeneral, setIssueTargetGeneral] = useState<
    "전체회원" | "특정그룹" | "특정회원"
  >(parsedTargetGeneral);
  const [issueTargetAuto, setIssueTargetAuto] = useState<
    "첫회원가입" | "첫주문완료" | "쇼핑등급변경" | "생일"
  >("첫회원가입");
  const [issueTargetCode, setIssueTargetCode] = useState<
    "회원" | "회원및비회원"
  >("회원");

  const [quantityModeDown, setQuantityModeDown] = useState<
    "제한없음" | "제한"
  >("제한없음");
  const [quantityModeCode, setQuantityModeCode] = useState<
    "단일생성" | "여러개생성"
  >("단일생성");
  const [couponCode, setCouponCode] = useState("");

  const [secretCoupon, setSecretCoupon] = useState(false);

  const [benefitType, setBenefitType] = useState<
    "금액할인" | "비율할인" | "배송비무료" | "고정가할인"
  >("금액할인");
  const [discountAmount, setDiscountAmount] = useState(parsedAmount);
  const [minOrderAmount, setMinOrderAmount] = useState(parsedMinOrder);
  const [duplicateDiscount, setDuplicateDiscount] = useState<"단독" | "함께">(
    "단독"
  );
  const [couponScope, setCouponScope] = useState<
    "모든상품" | "특정카테고리" | "특정상품"
  >("모든상품");
  const [excludeProducts, setExcludeProducts] = useState<
    "지정안함" | "상품지정"
  >("지정안함");

  const [discountPercent, setDiscountPercent] = useState(0);
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(0);
  const [fixedPrice, setFixedPrice] = useState(0);
  const [appliedProductQuery, setAppliedProductQuery] = useState("");

  const [operationMode, setOperationMode] = useState<
    "period" | "expiry" | "unlimited"
  >(type === "auto" ? "expiry" : "period");
  const [startDate, setStartDate] = useState(parsedStartDate);
  const [startHour, setStartHour] = useState("02");
  const [startMinute, setStartMinute] = useState("20");
  const [endDate, setEndDate] = useState(parsedEndDate);
  const [endHour, setEndHour] = useState("23");
  const [endMinute, setEndMinute] = useState("59");
  const [expiryDays, setExpiryDays] = useState(15);

  const [usageLimitMode, setUsageLimitMode] = useState<"제한" | "제한없음">(
    "제한"
  );
  const [usageLimitCount, setUsageLimitCount] = useState(1);

  const [issueAlertEnabled, setIssueAlertEnabled] = useState(false);
  const [expireAlertEnabled, setExpireAlertEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  const banner = BANNER_INFO[type];

  const handleCreate = () => {
    navigate("/promotions/coupons");
  };

  return (
    <div className="dashboard-page">
      <div className="coupon-create">
        <div className="coupon-create__header">
          <button className="coupon-create__back" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2 className="coupon-create__title">
            {isEditMode ? "쿠폰 수정" : "쿠폰 만들기"}
          </h2>
          <div className="coupon-create__header-actions">
            <button
              className="coupon-create__btn"
              onClick={() => navigate("/promotions/coupons")}
            >
              취소
            </button>
            <button
              className="coupon-create__btn coupon-create__btn--primary"
              onClick={handleCreate}
            >
              {isEditMode ? "저장" : "쿠폰 생성"}
            </button>
          </div>
        </div>

        {banner && !isEditMode && (
          <div className="coupon-create__banner">
            <span className="coupon-create__banner-icon">{banner.icon}</span>
            <div className="coupon-create__banner-text">
              <span className="coupon-create__banner-title">
                {banner.title}
              </span>
              <span className="coupon-create__banner-desc">
                {banner.desc}
              </span>
            </div>
            <span className="coupon-create__banner-link">
              🔔 쿠폰 발급·만료 알림톡 발송 가능
            </span>
          </div>
        )}

        <section className="coupon-create__card">
          <h3 className="coupon-create__card-title">
            <span className="coupon-create__step">1</span> 기본 설정
          </h3>

          <div className="coupon-create__field">
            <label className="coupon-create__label">쿠폰명</label>
            <div className="coupon-create__field-content">
              <input
                type="text"
                className="coupon-create__input"
                placeholder="쿠폰명을 입력해 주세요"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
              />
              <p className="coupon-create__hint">
                예시) 여름 기획전 할인 쿠폰
              </p>
            </div>
          </div>

          <div className="coupon-create__field">
            <label className="coupon-create__label">발행 대상</label>
            <div className="coupon-create__field-content">
              {type === "auto" ? (
                <div className="coupon-create__radio-row">
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetAuto === "첫회원가입"}
                      onChange={() => setIssueTargetAuto("첫회원가입")}
                    />
                    첫 회원가입 ⓘ
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetAuto === "첫주문완료"}
                      onChange={() => setIssueTargetAuto("첫주문완료")}
                    />
                    첫 주문 완료 ⓘ
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetAuto === "쇼핑등급변경"}
                      onChange={() => setIssueTargetAuto("쇼핑등급변경")}
                    />
                    쇼핑 등급 변경 ⓘ
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetAuto === "생일"}
                      onChange={() => setIssueTargetAuto("생일")}
                    />
                    생일 ⓘ
                  </label>
                </div>
              ) : type === "create" ? (
                <div className="coupon-create__radio-row">
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetCode === "회원"}
                      onChange={() => setIssueTargetCode("회원")}
                    />
                    회원
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetCode === "회원및비회원"}
                      onChange={() => setIssueTargetCode("회원및비회원")}
                    />
                    회원 및 비회원
                  </label>
                </div>
              ) : (
                <div className="coupon-create__radio-row">
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetGeneral === "전체회원"}
                      onChange={() => setIssueTargetGeneral("전체회원")}
                    />
                    전체 회원
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetGeneral === "특정그룹"}
                      onChange={() => setIssueTargetGeneral("특정그룹")}
                    />
                    특정 그룹
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={issueTargetGeneral === "특정회원"}
                      onChange={() => setIssueTargetGeneral("특정회원")}
                    />
                    특정 회원
                  </label>
                </div>
              )}
            </div>
          </div>

          {type === "down" && (
            <div className="coupon-create__field">
              <label className="coupon-create__label">쿠폰 수량</label>
              <div className="coupon-create__field-content">
                <div className="coupon-create__radio-row">
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={quantityModeDown === "제한없음"}
                      onChange={() => setQuantityModeDown("제한없음")}
                    />
                    제한 없음
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={quantityModeDown === "제한"}
                      onChange={() => setQuantityModeDown("제한")}
                    />
                    제한
                  </label>
                </div>
              </div>
            </div>
          )}

          {type === "create" && (
            <div className="coupon-create__field">
              <label className="coupon-create__label">쿠폰 수량</label>
              <div className="coupon-create__field-content">
                <div className="coupon-create__radio-row">
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={quantityModeCode === "단일생성"}
                      onChange={() => setQuantityModeCode("단일생성")}
                    />
                    단일 생성
                  </label>
                  <label className="coupon-create__radio">
                    <input
                      type="radio"
                      checked={quantityModeCode === "여러개생성"}
                      onChange={() => setQuantityModeCode("여러개생성")}
                    />
                    여러 개 생성
                  </label>
                </div>
                <input
                  type="text"
                  className="coupon-create__input"
                  placeholder="직접 쿠폰 코드를 입력하거나 비워두면 자동 생성돼요"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
            </div>
          )}

          {type === "down" && (
            <div className="coupon-create__field">
              <label className="coupon-create__label">시크릿 쿠폰</label>
              <div className="coupon-create__field-content">
                <label className="coupon-create__checkbox">
                  <input
                    type="checkbox"
                    checked={secretCoupon}
                    onChange={(e) => setSecretCoupon(e.target.checked)}
                  />
                  설정
                </label>
                <p className="coupon-create__hint">
                  시크릿 쿠폰으로 설정하면 쿠폰은 어디에도 노출되지 않으며
                  다운로드할 수 있는 링크만 생성해요.
                  <br />
                  이 링크는 특정 고객에게 개별로 보내거나 이벤트 페이지에
                  삽입해 활용할 수 있어요.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="coupon-create__card">
          <h3 className="coupon-create__card-title">
            <span className="coupon-create__step">2</span> 혜택 설정
          </h3>

          <label className="coupon-create__benefit-option">
            <input
              type="radio"
              checked={benefitType === "금액할인"}
              onChange={() => setBenefitType("금액할인")}
            />
            <div>
              <p className="coupon-create__benefit-title">금액 할인</p>
              <p className="coupon-create__benefit-desc">
                설정한 금액만큼 할인하는 혜택을 제공해요
              </p>

              {benefitType === "금액할인" && (
                <div className="coupon-create__benefit-detail">
                  <div className="coupon-create__row">
                    <label>할인 금액</label>
                    <div className="coupon-create__input-with-unit">
                      <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) =>
                          setDiscountAmount(Number(e.target.value))
                        }
                      />
                      <span>원</span>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>최소 주문 금액</label>
                    <div className="coupon-create__row-inputs">
                      <select>
                        <option>모든 상품</option>
                        <option>특정 카테고리</option>
                        <option>특정 상품</option>
                      </select>
                      <div className="coupon-create__input-with-unit">
                        <input
                          type="number"
                          value={minOrderAmount}
                          onChange={(e) =>
                            setMinOrderAmount(Number(e.target.value))
                          }
                        />
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>중복 할인 ⓘ</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={duplicateDiscount === "단독"}
                          onChange={() => setDuplicateDiscount("단독")}
                        />
                        단독으로만 사용 가능
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={duplicateDiscount === "함께"}
                          onChange={() => setDuplicateDiscount("함께")}
                        />
                        다른 쿠폰과 함께 사용 가능
                      </label>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>쿠폰 적용 범위</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "모든상품"}
                          onChange={() => setCouponScope("모든상품")}
                        />
                        모든 상품
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "특정카테고리"}
                          onChange={() => setCouponScope("특정카테고리")}
                        />
                        특정 카테고리
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "특정상품"}
                          onChange={() => setCouponScope("특정상품")}
                        />
                        특정 상품
                      </label>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>적용 제외 상품</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={excludeProducts === "지정안함"}
                          onChange={() => setExcludeProducts("지정안함")}
                        />
                        지정 안 함
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={excludeProducts === "상품지정"}
                          onChange={() => setExcludeProducts("상품지정")}
                        />
                        상품 지정
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>

          <label className="coupon-create__benefit-option">
            <input
              type="radio"
              checked={benefitType === "비율할인"}
              onChange={() => setBenefitType("비율할인")}
            />
            <div>
              <p className="coupon-create__benefit-title">비율 할인</p>
              <p className="coupon-create__benefit-desc">
                설정한 비율만큼 할인하는 혜택을 제공해요
              </p>

              {benefitType === "비율할인" && (
                <div className="coupon-create__benefit-detail">
                  <div className="coupon-create__row">
                    <label>할인 비율</label>
                    <div className="coupon-create__input-with-unit">
                      <input
                        type="number"
                        value={discountPercent}
                        onChange={(e) =>
                          setDiscountPercent(Number(e.target.value))
                        }
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>최소 주문 금액</label>
                    <div className="coupon-create__row-inputs">
                      <select>
                        <option>모든 상품</option>
                        <option>특정 카테고리</option>
                        <option>특정 상품</option>
                      </select>
                      <div className="coupon-create__input-with-unit">
                        <input
                          type="number"
                          value={minOrderAmount}
                          onChange={(e) =>
                            setMinOrderAmount(Number(e.target.value))
                          }
                        />
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>최대 할인 금액</label>
                    <div className="coupon-create__input-with-unit">
                      <input
                        type="number"
                        value={maxDiscountAmount}
                        onChange={(e) =>
                          setMaxDiscountAmount(Number(e.target.value))
                        }
                      />
                      <span>원</span>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>중복 할인 ⓘ</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={duplicateDiscount === "단독"}
                          onChange={() => setDuplicateDiscount("단독")}
                        />
                        단독으로만 사용 가능
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={duplicateDiscount === "함께"}
                          onChange={() => setDuplicateDiscount("함께")}
                        />
                        다른 쿠폰과 함께 사용 가능
                      </label>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>쿠폰 적용 범위</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "모든상품"}
                          onChange={() => setCouponScope("모든상품")}
                        />
                        모든 상품
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "특정카테고리"}
                          onChange={() => setCouponScope("특정카테고리")}
                        />
                        특정 카테고리
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "특정상품"}
                          onChange={() => setCouponScope("특정상품")}
                        />
                        특정 상품
                      </label>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>적용 제외 상품</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={excludeProducts === "지정안함"}
                          onChange={() => setExcludeProducts("지정안함")}
                        />
                        지정 안 함
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={excludeProducts === "상품지정"}
                          onChange={() => setExcludeProducts("상품지정")}
                        />
                        상품 지정
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>

          <label className="coupon-create__benefit-option">
            <input
              type="radio"
              checked={benefitType === "배송비무료"}
              onChange={() => setBenefitType("배송비무료")}
            />
            <div>
              <p className="coupon-create__benefit-title">배송비 무료</p>
              <p className="coupon-create__benefit-desc">
                설정한 최소 주문 금액을 충족하면 배송비 무료 혜택이
                적용돼요.
                <br />
                주문서의 모든 배송비가 무료로 적용되며, 주문서당 1개
                쿠폰만 사용할 수 있어요. 단, 반품·교환 시 발생하는
                배송비는 면제되지 않아요.
              </p>

              {benefitType === "배송비무료" && (
                <div className="coupon-create__benefit-detail">
                  <div className="coupon-create__row">
                    <label>최소 주문 금액</label>
                    <div className="coupon-create__row-inputs">
                      <select>
                        <option>모든 상품</option>
                        <option>특정 카테고리</option>
                        <option>특정 상품</option>
                      </select>
                      <div className="coupon-create__input-with-unit">
                        <input
                          type="number"
                          value={minOrderAmount}
                          onChange={(e) =>
                            setMinOrderAmount(Number(e.target.value))
                          }
                        />
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>최대 할인 금액</label>
                    <div className="coupon-create__input-with-unit">
                      <input
                        type="number"
                        value={maxDiscountAmount}
                        onChange={(e) =>
                          setMaxDiscountAmount(Number(e.target.value))
                        }
                      />
                      <span>원</span>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>중복 할인 ⓘ</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={duplicateDiscount === "단독"}
                          onChange={() => setDuplicateDiscount("단독")}
                        />
                        단독으로만 사용 가능
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={duplicateDiscount === "함께"}
                          onChange={() => setDuplicateDiscount("함께")}
                        />
                        다른 쿠폰과 함께 사용 가능
                      </label>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>쿠폰 적용 범위</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "모든상품"}
                          onChange={() => setCouponScope("모든상품")}
                        />
                        모든 상품
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "특정카테고리"}
                          onChange={() => setCouponScope("특정카테고리")}
                        />
                        특정 카테고리
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={couponScope === "특정상품"}
                          onChange={() => setCouponScope("특정상품")}
                        />
                        특정 상품
                      </label>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>적용 제외 상품</label>
                    <div className="coupon-create__radio-row">
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={excludeProducts === "지정안함"}
                          onChange={() => setExcludeProducts("지정안함")}
                        />
                        지정 안 함
                      </label>
                      <label className="coupon-create__radio">
                        <input
                          type="radio"
                          checked={excludeProducts === "상품지정"}
                          onChange={() => setExcludeProducts("상품지정")}
                        />
                        상품 지정
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>

          <label className="coupon-create__benefit-option">
            <input
              type="radio"
              checked={benefitType === "고정가할인"}
              onChange={() => setBenefitType("고정가할인")}
            />
            <div>
              <p className="coupon-create__benefit-title">고정가 할인</p>
              <p className="coupon-create__benefit-desc">
                상품 금액과 상관없이 설정한 금액으로 판매할 수 있어요. 예)
                100원딜
                <br />
                주문서당 1개 쿠폰만 적용 가능하며, 다른 쿠폰과 함께
                사용할 수 없어요. 쿠폰 적용 상품이 여러 개일 경우 판매가가
                가장 높은 상품에 자동 적용돼요.
              </p>

              {benefitType === "고정가할인" && (
                <div className="coupon-create__benefit-detail">
                  <div className="coupon-create__row">
                    <label>판매 고정가</label>
                    <div className="coupon-create__input-with-unit">
                      <input
                        type="number"
                        value={fixedPrice}
                        onChange={(e) =>
                          setFixedPrice(Number(e.target.value))
                        }
                      />
                      <span>원</span>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>최소 주문 금액</label>
                    <div className="coupon-create__row-inputs">
                      <select>
                        <option>모든 상품</option>
                        <option>특정 카테고리</option>
                        <option>특정 상품</option>
                      </select>
                      <div className="coupon-create__input-with-unit">
                        <input
                          type="number"
                          value={minOrderAmount}
                          onChange={(e) =>
                            setMinOrderAmount(Number(e.target.value))
                          }
                        />
                        <span>원</span>
                      </div>
                    </div>
                  </div>
                  <div className="coupon-create__row">
                    <label>쿠폰 적용 상품</label>
                    <div className="coupon-create__product-search">
                      <span>🔍</span>
                      <input
                        type="text"
                        placeholder="상품명 혹은 재고번호(SKU)로 검색해 주세요"
                        value={appliedProductQuery}
                        onChange={(e) =>
                          setAppliedProductQuery(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>
        </section>

        <section className="coupon-create__card">
          <h3 className="coupon-create__card-title">
            <span className="coupon-create__step">3</span> 운영 설정
          </h3>

          {type === "targeted" ? (
            <>
              <div className="coupon-create__field">
                <label className="coupon-create__label">사용 시작일</label>
                <div className="coupon-create__date-row">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="text"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                  />
                  <span>시</span>
                  <input
                    type="text"
                    value={startMinute}
                    onChange={(e) => setStartMinute(e.target.value)}
                  />
                  <span>분</span>
                </div>
              </div>
              <div className="coupon-create__field">
                <label className="coupon-create__label">사용 종료일</label>
                <div className="coupon-create__date-row">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <input
                    type="text"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                  />
                  <span>시</span>
                  <input
                    type="text"
                    value={endMinute}
                    onChange={(e) => setEndMinute(e.target.value)}
                  />
                  <span>분</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {(type === "down" || type === "create") && (
                <label className="coupon-create__benefit-option">
                  <input
                    type="radio"
                    checked={operationMode === "period"}
                    onChange={() => setOperationMode("period")}
                  />
                  <div>
                    <p className="coupon-create__benefit-title">
                      사용 기한 설정
                    </p>
                    {type === "down" && (
                      <p className="coupon-create__benefit-desc">
                        쿠폰의 사용 시작일, 종료일을 지정해요
                      </p>
                    )}
                    {operationMode === "period" && (
                      <div className="coupon-create__benefit-detail">
                        <div className="coupon-create__row">
                          <label>시작일</label>
                          <div className="coupon-create__date-row">
                            <input
                              type="text"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                            <input
                              type="text"
                              value={startHour}
                              onChange={(e) => setStartHour(e.target.value)}
                            />
                            <span>시</span>
                            <input
                              type="text"
                              value={startMinute}
                              onChange={(e) =>
                                setStartMinute(e.target.value)
                              }
                            />
                            <span>분</span>
                          </div>
                        </div>
                        <div className="coupon-create__row">
                          <label>종료일</label>
                          <div className="coupon-create__date-row">
                            <input
                              type="text"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                            <input
                              type="text"
                              value={endHour}
                              onChange={(e) => setEndHour(e.target.value)}
                            />
                            <span>시</span>
                            <input
                              type="text"
                              value={endMinute}
                              onChange={(e) => setEndMinute(e.target.value)}
                            />
                            <span>분</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              )}

              {(type === "down" || type === "auto") && (
                <label className="coupon-create__benefit-option">
                  <input
                    type="radio"
                    checked={operationMode === "expiry"}
                    onChange={() => setOperationMode("expiry")}
                  />
                  <div>
                    <p className="coupon-create__benefit-title">
                      만료일 설정
                    </p>
                    <p className="coupon-create__benefit-desc">
                      쿠폰 발급일로부터 사용 기한을 설정해요
                    </p>
                    {operationMode === "expiry" && (
                      <div className="coupon-create__benefit-detail">
                        <div className="coupon-create__expiry-row">
                          고객이 쿠폰을 발급받은 날부터{" "}
                          <input
                            type="number"
                            value={expiryDays}
                            onChange={(e) =>
                              setExpiryDays(Number(e.target.value))
                            }
                          />{" "}
                          일 후까지 사용 가능
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              )}

              <label className="coupon-create__benefit-option">
                <input
                  type="radio"
                  checked={operationMode === "unlimited"}
                  onChange={() => setOperationMode("unlimited")}
                />
                <div>
                  <p className="coupon-create__benefit-title">제한 없음</p>
                  <p className="coupon-create__benefit-desc">
                    사용 기한을 지정하지 않은 무기한 쿠폰을 생성해요
                  </p>
                </div>
              </label>
            </>
          )}

          <div className="coupon-create__field coupon-create__field--spaced">
            <label className="coupon-create__label">사용 횟수</label>
            <div className="coupon-create__field-content">
              <div className="coupon-create__radio-row">
                <label className="coupon-create__radio">
                  <input
                    type="radio"
                    checked={usageLimitMode === "제한"}
                    onChange={() => setUsageLimitMode("제한")}
                  />
                  제한
                </label>
                <label className="coupon-create__radio">
                  <input
                    type="radio"
                    checked={usageLimitMode === "제한없음"}
                    onChange={() => setUsageLimitMode("제한없음")}
                  />
                  제한 없음
                </label>
              </div>
              {usageLimitMode === "제한" && (
                <div className="coupon-create__expiry-row">
                  동일한 쿠폰을 최대{" "}
                  <input
                    type="number"
                    value={usageLimitCount}
                    onChange={(e) =>
                      setUsageLimitCount(Number(e.target.value))
                    }
                  />{" "}
                  회 까지 사용 가능
                </div>
              )}
            </div>
          </div>
        </section>

        {type !== "create" && (
          <section className="coupon-create__card">
            <div className="coupon-create__card-header-row">
              <h3 className="coupon-create__card-title">
                <span className="coupon-create__step">4</span> 알림 설정
              </h3>
              {(type === "down" || type === "auto") && (
                <span className="coupon-create__charge-info">
                  알림톡 발송 가능 <b>0</b> 건{" "}
                  <button className="coupon-create__charge-btn">충전</button>
                </span>
              )}
            </div>

            {(type === "down" || type === "auto") && (
              <>
                <div className="coupon-create__notify-row">
                  <div className="coupon-create__notify-label">
                    쿠폰 발급 알림{" "}
                    <span className="coupon-create__pill">알림톡</span>
                  </div>
                  <span className="coupon-create__notify-stat">
                    ↗ 최대 75% 사용률 증가
                  </span>
                  <label className="coupon-create__toggle">
                    <input
                      type="checkbox"
                      checked={issueAlertEnabled}
                      onChange={(e) =>
                        setIssueAlertEnabled(e.target.checked)
                      }
                    />
                    <span className="coupon-create__toggle-slider" />
                  </label>
                </div>
                <div className="coupon-create__notify-row">
                  <div className="coupon-create__notify-label">
                    쿠폰 소멸 알림{" "}
                    <span className="coupon-create__pill">알림톡</span>
                  </div>
                  <span className="coupon-create__notify-stat">
                    ↗ 최대 68% 사용률 증가
                  </span>
                  <label className="coupon-create__toggle">
                    <input
                      type="checkbox"
                      checked={expireAlertEnabled}
                      onChange={(e) =>
                        setExpireAlertEnabled(e.target.checked)
                      }
                    />
                    <span className="coupon-create__toggle-slider" />
                  </label>
                </div>
              </>
            )}

            <div className="coupon-create__notify-row">
              <div className="coupon-create__notify-label">
                웹·앱 푸시(앱 사용시) ⓘ
              </div>
              <label className="coupon-create__toggle">
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                />
                <span className="coupon-create__toggle-slider" />
              </label>
            </div>
          </section>
        )}

        <div className="coupon-create__bottom-actions">
          <button
            className="coupon-create__btn coupon-create__btn--primary"
            onClick={handleCreate}
          >
            {isEditMode ? "저장" : "쿠폰 생성"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponCreatePage;
