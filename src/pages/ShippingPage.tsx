import { useState } from "react";
import "../styles/shipping.css";

function ShippingPage() {
  const [activeTab, setActiveTab] = useState<"template" | "origin">(
    "template"
  );

  const [bundleFeeRule, setBundleFeeRule] = useState<"lowest" | "highest">(
    "lowest"
  );
  const [tierBasis, setTierBasis] = useState<"beforeDiscount" | "final">(
    "beforeDiscount"
  );
  const [cashOnDeliveryDisplay, setCashOnDeliveryDisplay] = useState<
    "always" | "withAmount"
  >("withAmount");
  const [entrancePassword, setEntrancePassword] = useState<"none" | "use">(
    "none"
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateOrigin, setNewTemplateOrigin] = useState("");
  const [newTemplateNote, setNewTemplateNote] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [shippingMethodType, setShippingMethodType] = useState(
    "택배, 소포, 등기"
  );
  const [methodChecks, setMethodChecks] = useState({
    택배: true,
    방문수령: false,
    퀵서비스: false,
  });
  const [feeExempt, setFeeExempt] = useState(false);
  const [courierCompany, setCourierCompany] = useState("없음");
  const [feeType, setFeeType] = useState("조건부 무료배송");
  const [baseFee, setBaseFee] = useState(2500);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(50000);
  const [regionalFee, setRegionalFee] = useState("지역별 배송비 사용안함");
  const [returnExchangeEnabled, setReturnExchangeEnabled] = useState(true);
  const [returnExchangePeriod, setReturnExchangePeriod] = useState(
    "배송완료 후 14일 이내 가능"
  );
  const [returnFee, setReturnFee] = useState(2500);
  const [exchangeFee, setExchangeFee] = useState(5000);
  const [shippingDateOption, setShippingDateOption] = useState("사용안함");

  const [originMenuOpen, setOriginMenuOpen] = useState(false);

  const [isOriginAddModalOpen, setIsOriginAddModalOpen] = useState(false);
  const [originName, setOriginName] = useState("");
  const [shipZip, setShipZip] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipDetailAddress, setShipDetailAddress] = useState("");
  const [returnZip, setReturnZip] = useState("");
  const [returnAddress, setReturnAddress] = useState("");
  const [returnDetailAddress, setReturnDetailAddress] = useState("");
  const [originPhone, setOriginPhone] = useState("");

  const closeOriginAddModal = () => {
    setIsOriginAddModalOpen(false);
    setOriginName("");
    setShipZip("");
    setShipAddress("");
    setShipDetailAddress("");
    setReturnZip("");
    setReturnAddress("");
    setReturnDetailAddress("");
    setOriginPhone("");
  };

  const toggleMethodCheck = (key: keyof typeof methodChecks) => {
    setMethodChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewTemplateName("");
    setNewTemplateOrigin("");
    setNewTemplateNote("");
  };

  const continueToEdit = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(true);
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-section shipping-page">
        <h2 className="shipping-page__title">배송</h2>

        <div className="shipping-page__tabs">
          <button
            className={`shipping-page__tab ${
              activeTab === "template" ? "shipping-page__tab--active" : ""
            }`}
            onClick={() => setActiveTab("template")}
          >
            배송 템플릿 설정
          </button>
          <button
            className={`shipping-page__tab ${
              activeTab === "origin" ? "shipping-page__tab--active" : ""
            }`}
            onClick={() => setActiveTab("origin")}
          >
            출고 및 반품/교환지 설정
          </button>
        </div>

        {activeTab === "template" && (
          <div className="shipping-page__content">
            <div className="shipping-page__row">
              <div className="shipping-page__intro">
                <h3 className="shipping-page__intro-title">배송 템플릿</h3>
                <p className="shipping-page__intro-desc">
                  각 업체, 상품별로 배송 정책이 다른 경우 템플릿을 생성하여
                  적용할 수 있습니다. 템플릿 생성 시 출고 및 반품 교환지는
                  필수로 지정해야 합니다.
                </p>
                <button
                  className="shipping-page__link-btn"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  템플릿 추가
                </button>
              </div>

              <div className="shipping-page__template-panel">
                <div className="shipping-template-card">
                  <div className="shipping-template-card__header">
                    <span className="shipping-template-card__badge">
                      기본
                    </span>
                    <span className="shipping-template-card__name">
                      배송 템플릿 A
                    </span>
                    <button className="shipping-template-card__more">
                      ⋯
                    </button>
                  </div>
                  <p className="shipping-template-card__origin">
                    📍 출고 및 반품/교환지명 A
                  </p>

                  <div className="shipping-template-card__country">
                    <div className="shipping-template-card__country-header">
                      <span>대한민국</span>
                      <div className="shipping-template-card__country-actions">
                        <button
                          className="shipping-page__link-btn"
                          onClick={() => setIsEditModalOpen(true)}
                        >
                          수정
                        </button>
                        <span>﹀</span>
                      </div>
                    </div>

                    <div className="shipping-template-card__info-row">
                      <span>배송 및 결제방법</span>
                      <span>택배 / 선결제</span>
                    </div>
                    <div className="shipping-template-card__info-row">
                      <span>기본 배송비</span>
                      <span>KRW 2,500</span>
                    </div>
                    <div className="shipping-template-card__info-row">
                      <span>무료배송 조건</span>
                      <span>KRW 50,000 이상 구매시</span>
                    </div>
                    <div className="shipping-template-card__info-row">
                      <span>반품 배송비</span>
                      <span>KRW 2,500</span>
                    </div>
                    <div className="shipping-template-card__info-row">
                      <span>교환 배송비</span>
                      <span>KRW 5,000</span>
                    </div>
                  </div>

                  <button className="shipping-page__link-btn shipping-template-card__add-country">
                    배송가능 국가 추가
                  </button>
                </div>

                <button
                  className="shipping-page__btn shipping-page__btn--primary"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  템플릿 추가
                </button>
              </div>
            </div>

            <div className="shipping-page__row">
              <div className="shipping-page__intro">
                <h3 className="shipping-page__intro-title">
                  기타 배송 정책
                </h3>
                <p className="shipping-page__intro-desc">
                  사이트 전체 상품에 공통적으로 적용할 배송 정책을
                  설정합니다.
                </p>
              </div>

              <div className="shipping-page__policy-panel">
                <div className="shipping-page__policy-field">
                  <label className="shipping-page__policy-label">
                    묶음배송비 계산 방식
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="bundleFeeRule"
                      checked={bundleFeeRule === "lowest"}
                      onChange={() => setBundleFeeRule("lowest")}
                    />
                    가장 낮은 배송비로 부과
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="bundleFeeRule"
                      checked={bundleFeeRule === "highest"}
                      onChange={() => setBundleFeeRule("highest")}
                    />
                    가장 높은 배송비로 부과
                  </label>
                </div>

                <div className="shipping-page__policy-field">
                  <label className="shipping-page__policy-label">
                    조건부/금액별 차등 배송비 책정 조건
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="tierBasis"
                      checked={tierBasis === "beforeDiscount"}
                      onChange={() => setTierBasis("beforeDiscount")}
                    />
                    할인 전, 정상 판매가 기준
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="tierBasis"
                      checked={tierBasis === "final"}
                      onChange={() => setTierBasis("final")}
                    />
                    최종 결제 금액 기준
                  </label>
                </div>

                <div className="shipping-page__policy-field">
                  <label className="shipping-page__policy-label">
                    착불 배송비 표시 조건
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="codDisplay"
                      checked={cashOnDeliveryDisplay === "always"}
                      onChange={() => setCashOnDeliveryDisplay("always")}
                    />
                    항상 착불로 표시
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="codDisplay"
                      checked={cashOnDeliveryDisplay === "withAmount"}
                      onChange={() =>
                        setCashOnDeliveryDisplay("withAmount")
                      }
                    />
                    배송금액과 함께 착불로 표시
                  </label>
                </div>

                <div className="shipping-page__policy-field">
                  <label className="shipping-page__policy-label">
                    주문시 공동현관 비밀번호 입력
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="entrancePassword"
                      checked={entrancePassword === "none"}
                      onChange={() => setEntrancePassword("none")}
                    />
                    사용 안 함
                  </label>
                  <label className="shipping-page__radio">
                    <input
                      type="radio"
                      name="entrancePassword"
                      checked={entrancePassword === "use"}
                      onChange={() => setEntrancePassword("use")}
                    />
                    사용
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "origin" && (
          <div className="shipping-page__content">
            <div className="shipping-page__row">
              <div className="shipping-page__intro">
                <h3 className="shipping-page__intro-title">
                  출고 및 반품/교환지
                </h3>
                <p className="shipping-page__intro-desc">
                  취급하는 상품별로 출고, 반품/교환지가 다를 경우 추가
                  등록이 가능하며, 각기 다른 템플릿을 설정할 수 있습니다.
                </p>
                <p className="shipping-page__intro-desc">
                  예시) 의류 쇼핑몰 운영 중 거래처 혹은 발주사가 3곳일 경우
                  아래와 같이 등록합니다.
                  <br />
                  * 바지 브랜드 A 업체
                  <br />
                  * 바지 브랜드 B 업체
                  <br />* 바지 브랜드 C 업체
                </p>
                <button
                  className="shipping-page__link-btn"
                  onClick={() => setIsOriginAddModalOpen(true)}
                >
                  출고 및 반품/교환지 추가
                </button>
              </div>

              <div className="shipping-page__origin-panel">
                <h3 className="shipping-page__origin-panel-title">
                  출고 및 반품/교환지 목록
                </h3>

                <div className="shipping-page__origin-notice">
                  출고 및 반품/교환지는 하나의 지역 안에서 설정할 수
                  있습니다.
                  <br />
                  지역은 <b>환경설정 &gt; 사이트 설정</b>의 설정값을
                  따릅니다. 지역을 변경할 경우, 기존에 등록된 출고 및
                  반품/교환지 목록은 모두 초기화되며 배송 템플릿과의 연결도
                  해제됩니다.
                </div>

                <div className="shipping-page__origin-region-row">
                  <span>지역</span>
                  <span>대한민국</span>
                </div>

                <div className="shipping-origin-card">
                  <div className="shipping-origin-card__header">
                    <span className="shipping-origin-card__name">
                      📍 출고 및 반품/교환지명 A
                    </span>
                    <div className="shipping-origin-card__menu-wrap">
                      <button
                        className="shipping-template-card__more"
                        onClick={() => setOriginMenuOpen((prev) => !prev)}
                      >
                        ⋯
                      </button>
                      {originMenuOpen && (
                        <>
                          <div
                            className="shipping-dropdown-overlay"
                            onClick={() => setOriginMenuOpen(false)}
                          />
                          <div className="shipping-origin-card__menu">
                            <button
                              className="shipping-origin-card__menu-item"
                              onClick={() => setOriginMenuOpen(false)}
                            >
                              수정
                            </button>
                            <button
                              className="shipping-origin-card__menu-item shipping-origin-card__menu-item--danger"
                              onClick={() => setOriginMenuOpen(false)}
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="shipping-origin-card__row">
                    <span>출고지</span>
                    <span className="shipping-origin-card__placeholder">
                      출고지를 등록해 주세요.
                    </span>
                  </div>
                  <div className="shipping-origin-card__row">
                    <span>반품/교환지</span>
                    <span className="shipping-origin-card__placeholder">
                      반품/교환지를 등록해 주세요.
                    </span>
                  </div>
                  <div className="shipping-origin-card__row">
                    <span>대표 연락처</span>
                    <span className="shipping-origin-card__placeholder">
                      대표 연락처를 등록해 주세요.
                    </span>
                  </div>
                </div>

                <button
                  className="shipping-page__link-btn"
                  onClick={() => setIsOriginAddModalOpen(true)}
                >
                  출고 및 반품/교환지 추가
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 배송 템플릿 추가(기본) 모달 */}
      {isAddModalOpen && (
        <div className="shipping-modal-overlay" onClick={closeAddModal}>
          <div
            className="shipping-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipping-modal__header">
              <h3 className="shipping-modal__title">
                배송 템플릿 추가(기본)
              </h3>
              <button
                className="shipping-modal__close"
                onClick={closeAddModal}
              >
                ×
              </button>
            </div>

            <div className="shipping-modal__notice">
              배송 템플릿명과 배송비 정책을 적용할 출고 및 반품/교환지를
              선택해 주세요.
            </div>

            <div className="shipping-modal__body">
              <div className="shipping-modal__field">
                <label className="shipping-modal__label">템플릿명</label>
                <input
                  type="text"
                  className="shipping-modal__input"
                  placeholder="템플릿명 을(를) 입력하세요"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                />
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  출고 및 반품/교환지
                </label>
                <select
                  className="shipping-modal__select"
                  value={newTemplateOrigin}
                  onChange={(e) => setNewTemplateOrigin(e.target.value)}
                >
                  <option value="">
                    출고 및 반품/교환지를 선택해 주세요.
                  </option>
                  <option value="A">출고 및 반품/교환지명 A</option>
                </select>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  배송관련 안내
                </label>
                <input
                  type="text"
                  className="shipping-modal__input"
                  placeholder="예: 서울/경기 10,000원, 충청 이남 지역 20,000원"
                  value={newTemplateNote}
                  onChange={(e) => setNewTemplateNote(e.target.value)}
                />
              </div>
            </div>

            <div className="shipping-modal__footer">
              <button
                className="shipping-modal__btn"
                onClick={closeAddModal}
              >
                취소
              </button>
              <button
                className="shipping-modal__btn shipping-modal__btn--primary"
                disabled={newTemplateName.trim() === ""}
                onClick={continueToEdit}
              >
                계속
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 배송 템플릿 수정(세부) 모달 */}
      {isEditModalOpen && (
        <div
          className="shipping-modal-overlay"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="shipping-modal shipping-modal--wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipping-modal__header">
              <h3 className="shipping-modal__title">
                배송 템플릿 수정(세부)
              </h3>
              <button
                className="shipping-modal__close"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="shipping-modal__notice">
              배송 템플릿명과 배송비 정책을 적용할 출고 및 반품/교환지를
              선택해 주세요.
            </div>

            <div className="shipping-modal__body">
              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  배송 가능 국가
                </label>
                <div className="shipping-modal__tag">
                  대한민국 (Korea, Republic of)
                  <button>×</button>
                </div>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">배송방법</label>
                <select
                  className="shipping-modal__select"
                  value={shippingMethodType}
                  onChange={(e) => setShippingMethodType(e.target.value)}
                >
                  <option>택배, 소포, 등기</option>
                </select>
                <div className="shipping-modal__checkbox-box">
                  <label className="shipping-modal__checkbox">
                    <input
                      type="checkbox"
                      checked={methodChecks.택배}
                      onChange={() => toggleMethodCheck("택배")}
                    />
                    택배
                  </label>
                  <label className="shipping-modal__checkbox">
                    <input
                      type="checkbox"
                      checked={methodChecks.방문수령}
                      onChange={() => toggleMethodCheck("방문수령")}
                    />
                    방문수령
                  </label>
                  <label className="shipping-modal__checkbox">
                    <input
                      type="checkbox"
                      checked={methodChecks.퀵서비스}
                      onChange={() => toggleMethodCheck("퀵서비스")}
                    />
                    퀵서비스
                  </label>
                </div>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  배송비 결제방법
                </label>
                <select className="shipping-modal__select">
                  <option>선결제</option>
                  <option>착불</option>
                </select>
                <label className="shipping-modal__checkbox">
                  <input
                    type="checkbox"
                    checked={feeExempt}
                    onChange={(e) => setFeeExempt(e.target.checked)}
                  />
                  배송비 면세 (복합과세)
                </label>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  기본 택배사 선택
                </label>
                <select
                  className="shipping-modal__select"
                  value={courierCompany}
                  onChange={(e) => setCourierCompany(e.target.value)}
                >
                  <option>없음</option>
                  <option>CJ대한통운</option>
                  <option>우체국택배</option>
                </select>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">배송비</label>
                <select
                  className="shipping-modal__select"
                  value={feeType}
                  onChange={(e) => setFeeType(e.target.value)}
                >
                  <option>조건부 무료배송</option>
                  <option>무료배송</option>
                  <option>고정 배송비</option>
                </select>

                <div className="shipping-modal__fee-box">
                  <div className="shipping-modal__fee-row">
                    <span>기본 배송비</span>
                    <div className="shipping-modal__fee-input">
                      <span>KRW</span>
                      <input
                        type="number"
                        value={baseFee}
                        onChange={(e) =>
                          setBaseFee(Number(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="shipping-modal__fee-row">
                    <span>무료배송 조건</span>
                    <div className="shipping-modal__fee-input">
                      <span>KRW</span>
                      <input
                        type="number"
                        value={freeShippingThreshold}
                        onChange={(e) =>
                          setFreeShippingThreshold(Number(e.target.value))
                        }
                      />
                      <span>이상 구매시</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  지역별 배송비
                </label>
                <select
                  className="shipping-modal__select"
                  value={regionalFee}
                  onChange={(e) => setRegionalFee(e.target.value)}
                >
                  <option>지역별 배송비 사용안함</option>
                  <option>지역별 배송비 사용</option>
                </select>
                <p className="shipping-modal__hint">
                  제주 및 도서산간 또는 특정 지역에 추가 배송비를
                  부과합니다.
                </p>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__checkbox shipping-modal__checkbox--strong">
                  <input
                    type="checkbox"
                    checked={returnExchangeEnabled}
                    onChange={(e) =>
                      setReturnExchangeEnabled(e.target.checked)
                    }
                  />
                  반품/교환 기능 사용
                </label>
                {returnExchangeEnabled && (
                  <>
                    <select
                      className="shipping-modal__select"
                      value={returnExchangePeriod}
                      onChange={(e) =>
                        setReturnExchangePeriod(e.target.value)
                      }
                    >
                      <option>배송완료 후 14일 이내 가능</option>
                      <option>배송완료 후 7일 이내 가능</option>
                    </select>

                    <div className="shipping-modal__fee-box">
                      <div className="shipping-modal__fee-row">
                        <span>반품 배송비(편도)</span>
                        <div className="shipping-modal__fee-input">
                          <span>KRW</span>
                          <input
                            type="number"
                            value={returnFee}
                            onChange={(e) =>
                              setReturnFee(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div className="shipping-modal__fee-row">
                        <span>교환 배송비(왕복)</span>
                        <div className="shipping-modal__fee-input">
                          <span>KRW</span>
                          <input
                            type="number"
                            value={exchangeFee}
                            onChange={(e) =>
                              setExchangeFee(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <label className="shipping-modal__label shipping-modal__label--spaced">
                      반품/교환 불가능 사유
                    </label>
                    <div className="shipping-modal__editor-toolbar">
                      <span>T</span>
                      <span>🎨</span>
                      <span>🖌</span>
                      <b>B</b>
                      <i>I</i>
                      <u>U</u>
                      <span>S</span>
                    </div>
                    <ol className="shipping-modal__reasons-list">
                      <li>
                        소비자의 잘못으로 물건이 멸실되거나 훼손된 경우(단,
                        내용물을 확인하기 위해 포장을 훼손한 경우는 제외)
                      </li>
                      <li>
                        소비자가 사용해서 물건의 가치가 뚜렷하게 떨어진 경우
                      </li>
                      <li>
                        시간이 지나 다시 판매하기 곤란할 정도로 물건의
                        가치가 뚜렷하게 떨어진 경우
                      </li>
                      <li>
                        복제가 가능한 물건의 포장을 훼손한 경우 (CD, DVD,
                        GAME, 도서 등)
                      </li>
                      <li>
                        용역 또는 문화산업진흥 기본법 제2조제5호의
                        디지털콘텐츠의 제공이 게시된 경우 (단, 가분적 용역
                        또는 가분적 디지털콘텐츠로 구성된 계약의 경우 제공이
                        개시되지 않은 부분은 제외)
                      </li>
                      <li>
                        소비자의 주문에 따라 개별적으로 생산되는 상품이
                        제작에 들어간 경우
                      </li>
                    </ol>
                    <button className="shipping-page__link-btn">
                      기본값으로 되돌리기
                    </button>
                  </>
                )}
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  발송 및 배송 예정일
                </label>
                <select
                  className="shipping-modal__select"
                  value={shippingDateOption}
                  onChange={(e) => setShippingDateOption(e.target.value)}
                >
                  <option>사용안함</option>
                  <option>사용</option>
                </select>
              </div>
            </div>

            <div className="shipping-modal__footer">
              <button
                className="shipping-modal__btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                취소
              </button>
              <button
                className="shipping-modal__btn shipping-modal__btn--primary"
                onClick={() => setIsEditModalOpen(false)}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 출고 및 반품/교환지 추가 모달 */}
      {isOriginAddModalOpen && (
        <div
          className="shipping-modal-overlay"
          onClick={closeOriginAddModal}
        >
          <div
            className="shipping-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shipping-modal__header">
              <h3 className="shipping-modal__title">
                출고 및 반품/교환지 추가
              </h3>
              <button
                className="shipping-modal__close"
                onClick={closeOriginAddModal}
              >
                ×
              </button>
            </div>

            <div className="shipping-modal__body">
              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  출고 및 반품/교환지명
                </label>
                <input
                  type="text"
                  className="shipping-modal__input"
                  placeholder="출고 및 반품/교환지명 을(를) 입력하세요"
                  value={originName}
                  onChange={(e) => setOriginName(e.target.value)}
                />
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">출고지 주소</label>
                <div className="shipping-modal__address-group">
                  <div className="shipping-modal__zip-row">
                    <input
                      type="text"
                      className="shipping-modal__address-input"
                      placeholder="우편번호"
                      value={shipZip}
                      onChange={(e) => setShipZip(e.target.value)}
                    />
                    <button className="shipping-modal__zip-btn">
                      주소찾기
                    </button>
                  </div>
                  <input
                    type="text"
                    className="shipping-modal__address-input"
                    placeholder="주소"
                    value={shipAddress}
                    onChange={(e) => setShipAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    className="shipping-modal__address-input"
                    placeholder="상세주소"
                    value={shipDetailAddress}
                    onChange={(e) => setShipDetailAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">
                  반품/교환지 주소
                </label>
                <div className="shipping-modal__address-group">
                  <div className="shipping-modal__zip-row">
                    <input
                      type="text"
                      className="shipping-modal__address-input"
                      placeholder="우편번호"
                      value={returnZip}
                      onChange={(e) => setReturnZip(e.target.value)}
                    />
                    <button className="shipping-modal__zip-btn">
                      주소찾기
                    </button>
                  </div>
                  <input
                    type="text"
                    className="shipping-modal__address-input"
                    placeholder="주소"
                    value={returnAddress}
                    onChange={(e) => setReturnAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    className="shipping-modal__address-input"
                    placeholder="상세주소"
                    value={returnDetailAddress}
                    onChange={(e) => setReturnDetailAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="shipping-modal__field">
                <label className="shipping-modal__label">대표 연락처</label>
                <input
                  type="text"
                  className="shipping-modal__input"
                  placeholder="전화번호 을(를) 입력하세요"
                  value={originPhone}
                  onChange={(e) => setOriginPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="shipping-modal__footer">
              <button
                className="shipping-modal__btn"
                onClick={closeOriginAddModal}
              >
                취소
              </button>
              <button
                className="shipping-modal__btn shipping-modal__btn--primary"
                disabled={originName.trim() === ""}
                onClick={closeOriginAddModal}
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

export default ShippingPage;
