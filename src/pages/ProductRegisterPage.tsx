import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productregister.css";

const SECTIONS = [
  { id: "info", label: "상품 정보" },
  { id: "detail", label: "상품 상세 설명" },
  { id: "price", label: "가격" },
  { id: "discount", label: "할인 및 적립금 설정" },
  { id: "shipping", label: "배송" },
  { id: "option", label: "옵션" },
  { id: "highlight", label: "상품 강조 설정" },
  { id: "seo", label: "SEO(검색엔진 최적화)" },
  { id: "sale", label: "판매 설정" },
  { id: "related", label: "연관상품" },
  { id: "extra", label: "추가 상품" },
  { id: "display", label: "상품 전시" },
  { id: "limit", label: "구매 제한 및 기타 설정" },
];

function ProductRegisterPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState("info");

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [brand, setBrand] = useState("");
  const [shippingNote, setShippingNote] = useState("");

  const [gradeDiscount, setGradeDiscount] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(true);

  const [productWeight, setProductWeight] = useState(1);
  const [shippingTemplateMode, setShippingTemplateMode] = useState<
    "default" | "select"
  >("default");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoMeta, setSeoMeta] = useState("");
  const [excludeFromSearch, setExcludeFromSearch] = useState(false);

  const [minQty, setMinQty] = useState(0);
  const [maxQtyPerOrder, setMaxQtyPerOrder] = useState(0);
  const [maxQtyPerPerson, setMaxQtyPerPerson] = useState(0);
  const [minorRestricted, setMinorRestricted] = useState(false);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="dashboard-page">
      <div className="product-register">
        <div className="product-register__header">
          <button
            className="product-register__back"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h2 className="product-register__title">상품 등록</h2>
          <button
            className="product-register__complete-btn"
            onClick={() => setIsCompleteModalOpen(true)}
          >
            상품 등록 완료
          </button>
        </div>

        <div className="product-register__body">
          <nav className="product-register__nav">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                className={`product-register__nav-item ${
                  activeSection === section.id
                    ? "product-register__nav-item--active"
                    : ""
                }`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="product-register__main">
            {/* 상품 정보 */}
            <section id="section-info" className="product-register__card">
              <h3 className="product-register__card-title">상품 정보</h3>

              <div className="product-register__field">
                <label className="product-register__label">
                  이미지 <span className="product-register__required">•</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="product-register__file-input"
                  onChange={handleImageSelect}
                />

                {imagePreviewUrl ? (
                  <div className="product-register__image-preview-wrap">
                    <img
                      src={imagePreviewUrl}
                      alt="상품 이미지"
                      className="product-register__image-preview"
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <button
                      className="product-register__image-remove"
                      onClick={removeImage}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="product-register__image-upload"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>+</span>
                  </button>
                )}

                <p className="product-register__hint">
                  이미지 형식: PNG, GIF, JPG/JPEG, BMP | 권장 해상도
                  750px*750px 이상, GIF 3MB 이하 (초과 시 정지 이미지로 변환)
                </p>
              </div>

              <div className="product-register__row">
                <div className="product-register__field">
                  <label className="product-register__label">
                    상품명 <span className="product-register__required">•</span>
                  </label>
                  <input
                    type="text"
                    className="product-register__input"
                    placeholder="상품명을 입력해 주세요."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="product-register__field">
                  <label className="product-register__label">
                    카테고리 <span className="product-register__required">•</span>
                  </label>
                  <select
                    className="product-register__select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">카테고리 선택</option>
                  </select>
                </div>
              </div>

              <div className="product-register__field">
                <label className="product-register__label">
                  요약 설명(Meta, 크리테오 광고 시 필수 입력)
                </label>
                <div className="product-register__editor-toolbar">
                  <span>T</span>
                  <span>🎨</span>
                  <span>🖌</span>
                  <b>B</b>
                  <i>I</i>
                  <u>U</u>
                  <span>S</span>
                </div>
                <textarea
                  className="product-register__textarea"
                  placeholder="내용을 입력해주세요."
                  rows={5}
                />
              </div>

              <div className="product-register__subtitle">추가 정보</div>
              <div className="product-register__row product-register__row--three">
                <div className="product-register__field">
                  <label className="product-register__label">원산지</label>
                  <input
                    type="text"
                    className="product-register__input"
                    placeholder="원산지를 입력해 주세요."
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div className="product-register__field">
                  <label className="product-register__label">제조사</label>
                  <input
                    type="text"
                    className="product-register__input"
                    placeholder="제조사를 입력해 주세요."
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                </div>
                <div className="product-register__field">
                  <label className="product-register__label">브랜드</label>
                  <input
                    type="text"
                    className="product-register__input"
                    placeholder="브랜드를 입력해 주세요."
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 상품 상세 설명 */}
            <section id="section-detail" className="product-register__card">
              <h3 className="product-register__card-title">상품 상세 설명</h3>
              <textarea
                className="product-register__textarea"
                placeholder="상세 설명 내용을 입력해주세요."
                rows={6}
              />
            </section>

            {/* 가격 */}
            <section id="section-price" className="product-register__card">
              <div className="product-register__card-header-row">
                <h3 className="product-register__card-title">가격</h3>
                <div className="product-register__toggle-inline">
                  <span>가격 없음</span>
                  <label className="product-register__toggle">
                    <input type="checkbox" />
                    <span className="product-register__toggle-slider" />
                  </label>
                </div>
              </div>

              <div className="product-register__row">
                <div className="product-register__field">
                  <label className="product-register__label">
                    판매가 <span className="product-register__required">•</span>
                  </label>
                  <div className="product-register__input-with-unit">
                    <input
                      type="number"
                      className="product-register__input"
                      placeholder="0"
                    />
                    <span className="product-register__unit">KRW</span>
                  </div>
                </div>
                <div className="product-register__field">
                  <label className="product-register__label">정상가</label>
                  <div className="product-register__input-with-unit">
                    <input
                      type="number"
                      className="product-register__input"
                      placeholder="0"
                    />
                    <span className="product-register__unit">KRW</span>
                  </div>
                </div>
              </div>

              <label className="product-register__checkbox">
                <input type="checkbox" defaultChecked />
                세금이 포함된 가격
              </label>

              <div className="product-register__toggle-row">
                <span>즉시/기간할인</span>
                <label className="product-register__toggle">
                  <input type="checkbox" />
                  <span className="product-register__toggle-slider" />
                </label>
              </div>
            </section>

            {/* 할인 및 적립금 설정 */}
            <section id="section-discount" className="product-register__card">
              <h3 className="product-register__card-title">
                할인 및 적립금 설정
              </h3>

              <div className="product-register__field">
                <label className="product-register__label">
                  적용 가능 할인
                </label>
                <div className="product-register__checkbox-group">
                  <label className="product-register__checkbox">
                    <input
                      type="checkbox"
                      checked={gradeDiscount}
                      onChange={(e) => setGradeDiscount(e.target.checked)}
                    />
                    쇼핑 등급 할인
                  </label>
                  <label className="product-register__checkbox">
                    <input
                      type="checkbox"
                      checked={couponDiscount}
                      onChange={(e) => setCouponDiscount(e.target.checked)}
                    />
                    쿠폰 할인
                  </label>
                </div>
              </div>

              <div className="product-register__notice">
                <p>
                  여러 할인이 함께 적용되면, 즉시/기간 할인 적용 후 남은
                  금액에 앞 단계의 할인이 먼저 적용된 가격을 기준으로
                  계산돼요.
                </p>
                <p>
                  할인 설정을 끄면, 해당 할인은 적용 대상에서 제외돼요.
                  예를 들어 쿠폰 할인을 껐을 경우 '2만원 이상 구매 시 10%
                  할인' 조건이 있어도, 구매 금액 산정에 포함되지 않으며,
                  10% 할인도 적용되지 않아요.
                </p>
              </div>
            </section>

            {/* 배송 */}
            <section id="section-shipping" className="product-register__card">
              <h3 className="product-register__card-title">배송</h3>

              <div className="product-register__field">
                <label className="product-register__label">상품무게</label>
                <div className="product-register__input-with-unit">
                  <input
                    type="number"
                    className="product-register__input"
                    value={productWeight}
                    onChange={(e) =>
                      setProductWeight(Number(e.target.value))
                    }
                  />
                  <span className="product-register__unit">kg</span>
                </div>
              </div>

              <div className="product-register__field">
                <div className="product-register__label-row">
                  <label className="product-register__label">
                    배송 템플릿
                  </label>
                  <button className="product-register__link-btn">
                    배송 템플릿 설정 ↗
                  </button>
                </div>
                <div className="product-register__segment">
                  <button
                    className={`product-register__segment-item ${
                      shippingTemplateMode === "default"
                        ? "product-register__segment-item--active"
                        : ""
                    }`}
                    onClick={() => setShippingTemplateMode("default")}
                  >
                    기본 템플릿 연동
                  </button>
                  <button
                    className={`product-register__segment-item ${
                      shippingTemplateMode === "select"
                        ? "product-register__segment-item--active"
                        : ""
                    }`}
                    onClick={() => setShippingTemplateMode("select")}
                  >
                    배송 템플릿 선택
                  </button>
                </div>

                {shippingTemplateMode === "select" && (
                  <select className="product-register__select">
                    <option>배송 템플릿 A</option>
                  </select>
                )}

                <div className="product-register__summary-box">
                  <p className="product-register__summary-title">
                    배송 템플릿 정보
                  </p>
                  <div className="product-register__summary-row">
                    <span>배송 가능 국가</span>
                    <span>대한민국</span>
                  </div>
                  <div className="product-register__summary-row">
                    <span>배송방법</span>
                    <span>택배</span>
                  </div>
                  <div className="product-register__summary-row">
                    <span>배송비 결제방법</span>
                    <span>선결제</span>
                  </div>
                  <div className="product-register__summary-row">
                    <span>배송비</span>
                    <span>2,500 원 (50,000 원 이상 구매 시 무료배송)</span>
                  </div>
                </div>
              </div>

              <div className="product-register__field">
                <label className="product-register__label">
                  배송 관련 안내
                </label>
                <input
                  type="text"
                  className="product-register__input"
                  placeholder="입력된 배송 관련 안내가 없습니다."
                  value={shippingNote}
                  onChange={(e) => setShippingNote(e.target.value)}
                />
                <label className="product-register__checkbox">
                  <input type="checkbox" />
                  직접 입력
                </label>
              </div>
            </section>

            {/* 옵션 */}
            <section id="section-option" className="product-register__card">
              <h3 className="product-register__card-title">옵션</h3>
              <p className="product-register__placeholder-text">
                단일 옵션 상품으로 등록됩니다. 필요 시 옵션을 추가할 수
                있어요.
              </p>
            </section>

            {/* 상품 강조 설정 */}
            <section
              id="section-highlight"
              className="product-register__card"
            >
              <h3 className="product-register__card-title">
                상품 강조 설정
              </h3>
              <p className="product-register__placeholder-text">
                뱃지, 추천 표시 등은 추후 단계에서 설정할 수 있어요.
              </p>
            </section>

            {/* SEO */}
            <section id="section-seo" className="product-register__card">
              <h3 className="product-register__card-title">
                SEO(검색엔진 최적화)
              </h3>

              <div className="product-register__field">
                <label className="product-register__label">제목</label>
                <input
                  type="text"
                  className="product-register__input"
                  placeholder="입력하지 않으면, 상품명과 동일하게 적용됩니다."
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
              </div>

              <div className="product-register__field">
                <label className="product-register__label">메타 설명</label>
                <textarea
                  className="product-register__textarea"
                  placeholder="입력하지 않으면, 상품 상세에 입력한 텍스트가 적용됩니다."
                  rows={4}
                  value={seoMeta}
                  onChange={(e) => setSeoMeta(e.target.value)}
                />
              </div>

              <div className="product-register__toggle-row">
                <span>이 상품을 검색엔진에서 제외</span>
                <label className="product-register__toggle">
                  <input
                    type="checkbox"
                    checked={excludeFromSearch}
                    onChange={(e) => setExcludeFromSearch(e.target.checked)}
                  />
                  <span className="product-register__toggle-slider" />
                </label>
              </div>
            </section>

            {/* 판매 설정 */}
            <section id="section-sale" className="product-register__card">
              <h3 className="product-register__card-title">판매 설정</h3>
              <p className="product-register__placeholder-text">
                판매 기간, 판매 상태 등은 기본값으로 적용됩니다.
              </p>
            </section>

            {/* 연관상품 */}
            <section id="section-related" className="product-register__card">
              <h3 className="product-register__card-title">연관상품</h3>
              <p className="product-register__placeholder-text">
                등록된 연관상품이 없습니다.
              </p>
            </section>

            {/* 추가 상품 */}
            <section id="section-extra" className="product-register__card">
              <h3 className="product-register__card-title">추가 상품</h3>
              <p className="product-register__placeholder-text">
                등록된 추가 상품이 없습니다.
              </p>
            </section>

            {/* 상품 전시 */}
            <section id="section-display" className="product-register__card">
              <h3 className="product-register__card-title">상품 전시</h3>
              <label className="product-register__checkbox">
                <input type="checkbox" defaultChecked />
                ddddd (KR)
              </label>
            </section>

            {/* 구매 제한 및 기타 설정 */}
            <section id="section-limit" className="product-register__card">
              <h3 className="product-register__card-title">
                구매 제한 및 기타 설정
              </h3>

              <div className="product-register__field">
                <label className="product-register__label">
                  최소 구매수량
                </label>
                <div className="product-register__input-with-unit">
                  <input
                    type="number"
                    className="product-register__input"
                    value={minQty}
                    onChange={(e) => setMinQty(Number(e.target.value))}
                  />
                  <span className="product-register__unit">개</span>
                </div>
              </div>

              <div className="product-register__row">
                <div className="product-register__field">
                  <label className="product-register__label">
                    1회 최대 구매 수량
                  </label>
                  <div className="product-register__input-with-select">
                    <select className="product-register__select">
                      <option>본품/옵션수량 합산</option>
                    </select>
                    <input
                      type="number"
                      className="product-register__input"
                      value={maxQtyPerOrder}
                      onChange={(e) =>
                        setMaxQtyPerOrder(Number(e.target.value))
                      }
                    />
                    <span className="product-register__unit">개</span>
                  </div>
                </div>
                <div className="product-register__field">
                  <label className="product-register__label">
                    1인 최대 구매 수량
                  </label>
                  <div className="product-register__input-with-unit">
                    <input
                      type="number"
                      className="product-register__input"
                      value={maxQtyPerPerson}
                      onChange={(e) =>
                        setMaxQtyPerPerson(Number(e.target.value))
                      }
                    />
                    <span className="product-register__unit">개</span>
                  </div>
                </div>
              </div>

              <div className="product-register__field">
                <label className="product-register__label">
                  0원 선택 옵션 구매시 최대 구매 수량
                </label>
                <select className="product-register__select">
                  <option>본 상품 구매 수량 만큼 구매 가능</option>
                </select>
              </div>

              <div className="product-register__toggle-row">
                <span>미성년자 구매 불가능</span>
                <label className="product-register__toggle">
                  <input
                    type="checkbox"
                    checked={minorRestricted}
                    onChange={(e) => setMinorRestricted(e.target.checked)}
                  />
                  <span className="product-register__toggle-slider" />
                </label>
              </div>

              <div className="product-register__field">
                <label className="product-register__label">
                  개인통관고유부호 사용 설정
                </label>
                <select className="product-register__select">
                  <option>사용 안 함</option>
                  <option>사용</option>
                </select>
              </div>
            </section>
          </div>

          <div className="product-register__preview">
            <div className="product-register__phone">
              <div className="product-register__phone-statusbar">
                <span>9:41</span>
                <span>📶 🔋</span>
              </div>
              <div className="product-register__phone-body">
                <div className="product-register__preview-card">
                  <div
                    className="product-register__preview-image"
                    style={
                      imagePreviewUrl
                        ? {
                            backgroundImage: `url(${imagePreviewUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  />
                  <p className="product-register__preview-name">
                    {productName || "상품명"}
                  </p>
                  <p className="product-register__preview-price">0 원</p>
                  <div className="product-register__preview-icons">
                    <span>♡</span>
                    <span>↗</span>
                  </div>
                  <p className="product-register__preview-shipping">
                    배송 &nbsp; 택배 · 기본 2,500원
                    <br />
                    50,000원 이상 구매 시 무료배송
                  </p>
                  <div className="product-register__preview-buttons">
                    <button className="product-register__preview-btn">
                      장바구니
                    </button>
                    <button className="product-register__preview-btn product-register__preview-btn--primary">
                      구매하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="product-register__preview-note">
              디자인 모드의 상세 설정에 따라 실제와 다를 수 있어요
            </p>
          </div>
        </div>
      </div>

      {isCompleteModalOpen && (
        <div
          className="product-register-modal-overlay"
          onClick={() => setIsCompleteModalOpen(false)}
        >
          <div
            className="product-register-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="product-register-modal__header">
              <h3 className="product-register-modal__title">
                첫 상품 등록을 축하드려요!
              </h3>
              <button
                className="product-register-modal__close"
                onClick={() => setIsCompleteModalOpen(false)}
              >
                ×
              </button>
            </div>
            <p className="product-register-modal__desc">
              상품을 바로 판매해 볼까요?
            </p>

            <div className="product-register-modal__product">
              <div
                className="product-register-modal__product-image"
                style={
                  imagePreviewUrl
                    ? {
                        backgroundImage: `url(${imagePreviewUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              />
              <div className="product-register-modal__product-info">
                <span className="product-register-modal__product-name">
                  {productName || "상품명"}
                </span>
                <span className="product-register-modal__product-price">
                  0원
                </span>
              </div>
            </div>

            <button
              className="product-register-modal__sell-btn"
              onClick={() => setIsCompleteModalOpen(false)}
            >
              판매하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductRegisterPage;
