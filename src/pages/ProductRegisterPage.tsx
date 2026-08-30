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
  const [shippingNoteEnabled, setShippingNoteEnabled] = useState(false);

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

  const [showOptionForm, setShowOptionForm] = useState(false);
  const [optionGroups, setOptionGroups] = useState([
    {
      type: "선택형",
      name: "",
      values: [] as string[],
      valueInput: "",
      required: true,
    },
  ]);

  const updateOptionGroup = (index: number, patch: Partial<{
    type: string;
    name: string;
    values: string[];
    valueInput: string;
    required: boolean;
  }>) => {
    setOptionGroups((prev) =>
      prev.map((g, i) => (i === index ? { ...g, ...patch } : g))
    );
  };

  const handleOptionValueKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      e.preventDefault();
      const group = optionGroups[index];
      const trimmed = group.valueInput.trim();
      if (trimmed !== "") {
        updateOptionGroup(index, {
          values: [...group.values, trimmed],
          valueInput: "",
        });
      }
    }
  };

  const removeOptionValue = (groupIndex: number, valueIndex: number) => {
    const group = optionGroups[groupIndex];
    updateOptionGroup(groupIndex, {
      values: group.values.filter((_, i) => i !== valueIndex),
    });
  };

  const addOptionGroup = () => {
    setOptionGroups((prev) => [
      ...prev,
      { type: "선택형", name: "", values: [], valueInput: "", required: true },
    ]);
  };

  const cancelOptionForm = () => {
    setShowOptionForm(false);
    setOptionGroups([
      { type: "선택형", name: "", values: [], valueInput: "", required: true },
    ]);
  };

  const BADGE_LABELS = ["신상품", "베스트", "MD추천", "주문폭주", "오늘출발"];
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const toggleBadge = (label: string) => {
    setSelectedBadges((prev) =>
      prev.includes(label)
        ? prev.filter((b) => b !== label)
        : [...prev, label]
    );
  };

  const [topBadgeEnabled, setTopBadgeEnabled] = useState(false);
  const [topBadgeText, setTopBadgeText] = useState("");
  const [bottomBadgeEnabled, setBottomBadgeEnabled] = useState(false);
  const [bottomBadgeText, setBottomBadgeText] = useState("");

  const [saleStatus, setSaleStatus] = useState<"판매중" | "품절" | "숨김">(
    "판매중"
  );
  const [salePeriodEnabled, setSalePeriodEnabled] = useState(false);

  const MOCK_SEARCH_PRODUCTS = [
    { id: 1, name: "벨리안 대표 상품" },
    { id: 2, name: "와일드 씨드 퍼밍 로션 200ml" },
    { id: 3, name: "와인베리 퍼밍 콜라겐 젤리" },
  ];

  const [relatedQuery, setRelatedQuery] = useState("");
  const [relatedDropdownOpen, setRelatedDropdownOpen] = useState(false);
  const [relatedCheckedIds, setRelatedCheckedIds] = useState<number[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<
    { id: number; name: string }[]
  >([]);

  const [extraQuery, setExtraQuery] = useState("");
  const [extraDropdownOpen, setExtraDropdownOpen] = useState(false);
  const [extraCheckedIds, setExtraCheckedIds] = useState<number[]>([]);
  const [extraProducts, setExtraProducts] = useState<
    { id: number; name: string }[]
  >([]);

  const toggleCheckedId = (
    ids: number[],
    setIds: (ids: number[]) => void,
    id: number
  ) => {
    setIds(
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
  };

  const addRelatedProducts = () => {
    const toAdd = MOCK_SEARCH_PRODUCTS.filter(
      (p) => relatedCheckedIds.includes(p.id) && !relatedProducts.some((r) => r.id === p.id)
    );
    setRelatedProducts((prev) => [...prev, ...toAdd]);
    setRelatedCheckedIds([]);
    setRelatedDropdownOpen(false);
    setRelatedQuery("");
  };

  const addExtraProducts = () => {
    const toAdd = MOCK_SEARCH_PRODUCTS.filter(
      (p) => extraCheckedIds.includes(p.id) && !extraProducts.some((r) => r.id === p.id)
    );
    setExtraProducts((prev) => [...prev, ...toAdd]);
    setExtraCheckedIds([]);
    setExtraDropdownOpen(false);
    setExtraQuery("");
  };

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
                  disabled={!shippingNoteEnabled}
                  onChange={(e) => setShippingNote(e.target.value)}
                />
                <label className="product-register__checkbox">
                  <input
                    type="checkbox"
                    checked={shippingNoteEnabled}
                    onChange={(e) => setShippingNoteEnabled(e.target.checked)}
                  />
                  직접 입력
                </label>
              </div>
            </section>

            {/* 옵션 */}
            <section id="section-option" className="product-register__card">
              <h3 className="product-register__card-title">옵션</h3>

              {!showOptionForm ? (
                <div className="product-register__option-empty">
                  <div className="product-register__option-illustration">
                    🛒
                  </div>
                  <p className="product-register__option-desc">
                    옵션을 설정하면 고객이 상품을 구매할 때 원하는 항목을
                    선택할 수 있어요.
                    <br />
                    색상, 사이즈, 추가 구성품 등 여러 조건을 조합해 등록할
                    수 있어요.
                  </p>
                  <div className="product-register__option-actions">
                    <button
                      className="product-register__option-btn product-register__option-btn--primary"
                      onClick={() => setShowOptionForm(true)}
                    >
                      옵션추가
                    </button>
                    <button className="product-register__option-btn">
                      다른 상품 옵션 불러오기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="product-register__option-form-wrap">
                  {optionGroups.map((group, index) => (
                    <div
                      className="product-register__option-form"
                      key={index}
                    >
                      <div className="product-register__option-form-row">
                        <div className="product-register__option-form-field product-register__option-form-field--type">
                          <label className="product-register__option-form-label">
                            옵션 종류
                          </label>
                          <select
                            className="product-register__select"
                            value={group.type}
                            onChange={(e) =>
                              updateOptionGroup(index, {
                                type: e.target.value,
                              })
                            }
                          >
                            <option>선택형</option>
                            <option>직접입력형</option>
                          </select>
                        </div>

                        <div className="product-register__option-form-field product-register__option-form-field--name">
                          <label className="product-register__option-form-label">
                            옵션명
                          </label>
                          <input
                            type="text"
                            className="product-register__input"
                            placeholder="예시: 색상, 사이즈"
                            value={group.name}
                            onChange={(e) =>
                              updateOptionGroup(index, {
                                name: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="product-register__option-form-field product-register__option-form-field--values">
                          <label className="product-register__option-form-label">
                            옵션값
                          </label>
                          <div className="product-register__option-tag-input">
                            {group.values.map((value, vIndex) => (
                              <span
                                key={vIndex}
                                className="product-register__option-tag"
                              >
                                {value}
                                <button
                                  onClick={() =>
                                    removeOptionValue(index, vIndex)
                                  }
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            <input
                              type="text"
                              placeholder="텍스트 입력 후 Enter·Tab·콤마(,)로 구분해 등록해 보세요."
                              value={group.valueInput}
                              onChange={(e) =>
                                updateOptionGroup(index, {
                                  valueInput: e.target.value,
                                })
                              }
                              onKeyDown={(e) =>
                                handleOptionValueKeyDown(e, index)
                              }
                            />
                          </div>
                        </div>

                        <label className="product-register__checkbox product-register__option-required">
                          <input
                            type="checkbox"
                            checked={group.required}
                            onChange={(e) =>
                              updateOptionGroup(index, {
                                required: e.target.checked,
                              })
                            }
                          />
                          필수 옵션
                        </label>
                      </div>
                    </div>
                  ))}

                  <button
                    className="product-register__option-add-row"
                    onClick={addOptionGroup}
                  >
                    + 옵션
                  </button>

                  <div className="product-register__option-form-footer">
                    <button
                      className="product-register__option-btn"
                      onClick={cancelOptionForm}
                    >
                      취소
                    </button>
                    <button
                      className="product-register__option-btn product-register__option-btn--primary"
                      onClick={() => setShowOptionForm(true)}
                    >
                      옵션 목록에 적용
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* 상품 강조 설정 */}
            <section
              id="section-highlight"
              className="product-register__card"
            >
              <h3 className="product-register__card-title">
                상품 강조 설정
              </h3>

              <div className="product-register__field">
                <label className="product-register__label">상품 배지</label>
                <div className="product-register__checkbox-group">
                  {BADGE_LABELS.map((label) => (
                    <label
                      key={label}
                      className="product-register__checkbox"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBadges.includes(label)}
                        onChange={() => toggleBadge(label)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="product-register__toggle-row">
                <span>대표 이미지 좌상단 배지</span>
                <label className="product-register__toggle">
                  <input
                    type="checkbox"
                    checked={topBadgeEnabled}
                    onChange={(e) => setTopBadgeEnabled(e.target.checked)}
                  />
                  <span className="product-register__toggle-slider" />
                </label>
              </div>

              {topBadgeEnabled && (
                <div className="product-register__badge-input-row">
                  <span className="product-register__badge-swatch product-register__badge-swatch--dark" />
                  <div className="product-register__badge-input-wrap">
                    <input
                      type="text"
                      className="product-register__input"
                      placeholder="공백 포함 9자까지 입력할 수 있습니다."
                      maxLength={9}
                      value={topBadgeText}
                      onChange={(e) => setTopBadgeText(e.target.value)}
                    />
                    <span className="product-register__badge-counter">
                      {topBadgeText.length}/9
                    </span>
                  </div>
                </div>
              )}

              <div className="product-register__toggle-row">
                <span>대표 이미지 하단 강조 배지</span>
                <label className="product-register__toggle">
                  <input
                    type="checkbox"
                    checked={bottomBadgeEnabled}
                    onChange={(e) =>
                      setBottomBadgeEnabled(e.target.checked)
                    }
                  />
                  <span className="product-register__toggle-slider" />
                </label>
              </div>

              {bottomBadgeEnabled && (
                <div className="product-register__badge-input-row">
                  <span className="product-register__badge-swatch product-register__badge-swatch--gray" />
                  <div className="product-register__badge-input-wrap">
                    <input
                      type="text"
                      className="product-register__input"
                      placeholder="공백 포함 16자까지 입력할 수 있습니다."
                      maxLength={16}
                      value={bottomBadgeText}
                      onChange={(e) => setBottomBadgeText(e.target.value)}
                    />
                    <span className="product-register__badge-counter">
                      {bottomBadgeText.length}/16
                    </span>
                  </div>
                </div>
              )}
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

              <div className="product-register__field">
                <label className="product-register__label">판매 상태</label>
                <div className="product-register__radio-group">
                  {(["판매중", "품절", "숨김"] as const).map((status) => (
                    <label
                      key={status}
                      className="product-register__radio"
                    >
                      <input
                        type="radio"
                        name="saleStatus"
                        checked={saleStatus === status}
                        onChange={() => setSaleStatus(status)}
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              <div className="product-register__toggle-row">
                <span>판매기간 설정</span>
                <label className="product-register__toggle">
                  <input
                    type="checkbox"
                    checked={salePeriodEnabled}
                    onChange={(e) =>
                      setSalePeriodEnabled(e.target.checked)
                    }
                  />
                  <span className="product-register__toggle-slider" />
                </label>
              </div>
            </section>

            {/* 연관상품 */}
            <section id="section-related" className="product-register__card">
              <h3 className="product-register__card-title">연관상품</h3>

              <div className="product-register__field">
                <label className="product-register__label">
                  상품 추가 ⓘ
                </label>
                <div className="product-register__product-search">
                  <span className="product-register__product-search-icon">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="상품명으로 검색해 주세요"
                    value={relatedQuery}
                    onFocus={() => setRelatedDropdownOpen(true)}
                    onChange={(e) => setRelatedQuery(e.target.value)}
                  />
                </div>

                {relatedDropdownOpen && (
                  <>
                    <div
                      className="product-register__dropdown-overlay"
                      onClick={() => setRelatedDropdownOpen(false)}
                    />
                    <div className="product-register__product-dropdown">
                      <div className="product-register__product-dropdown-list">
                        {MOCK_SEARCH_PRODUCTS.filter((p) =>
                          p.name
                            .toLowerCase()
                            .includes(relatedQuery.toLowerCase())
                        ).map((p) => (
                          <label
                            key={p.id}
                            className="product-register__product-option"
                          >
                            <input
                              type="checkbox"
                              checked={relatedCheckedIds.includes(p.id)}
                              onChange={() =>
                                toggleCheckedId(
                                  relatedCheckedIds,
                                  setRelatedCheckedIds,
                                  p.id
                                )
                              }
                            />
                            <span className="product-register__product-option-thumb" />
                            {p.name}
                          </label>
                        ))}
                      </div>
                      <div className="product-register__product-dropdown-footer">
                        <button
                          className="product-register__option-btn product-register__option-btn--primary"
                          disabled={relatedCheckedIds.length === 0}
                          onClick={addRelatedProducts}
                        >
                          상품 추가
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {relatedProducts.length > 0 && (
                <div className="product-register__added-products">
                  {relatedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="product-register__added-product"
                    >
                      <span className="product-register__product-option-thumb" />
                      <span>{p.name}</span>
                      <button
                        onClick={() =>
                          setRelatedProducts((prev) =>
                            prev.filter((x) => x.id !== p.id)
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 추가 상품 */}
            <section id="section-extra" className="product-register__card">
              <h3 className="product-register__card-title">추가 상품</h3>

              <div className="product-register__field">
                <label className="product-register__label">
                  상품 추가 ⓘ
                </label>
                <div className="product-register__product-search">
                  <span className="product-register__product-search-icon">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="상품명으로 검색해 주세요"
                    value={extraQuery}
                    onFocus={() => setExtraDropdownOpen(true)}
                    onChange={(e) => setExtraQuery(e.target.value)}
                  />
                </div>

                {extraDropdownOpen && (
                  <>
                    <div
                      className="product-register__dropdown-overlay"
                      onClick={() => setExtraDropdownOpen(false)}
                    />
                    <div className="product-register__product-dropdown">
                      <div className="product-register__product-dropdown-list">
                        {MOCK_SEARCH_PRODUCTS.filter((p) =>
                          p.name
                            .toLowerCase()
                            .includes(extraQuery.toLowerCase())
                        ).map((p) => (
                          <label
                            key={p.id}
                            className="product-register__product-option"
                          >
                            <input
                              type="checkbox"
                              checked={extraCheckedIds.includes(p.id)}
                              onChange={() =>
                                toggleCheckedId(
                                  extraCheckedIds,
                                  setExtraCheckedIds,
                                  p.id
                                )
                              }
                            />
                            <span className="product-register__product-option-thumb" />
                            {p.name}
                          </label>
                        ))}
                      </div>
                      <div className="product-register__product-dropdown-footer">
                        <button
                          className="product-register__option-btn product-register__option-btn--primary"
                          disabled={extraCheckedIds.length === 0}
                          onClick={addExtraProducts}
                        >
                          상품 추가
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {extraProducts.length > 0 && (
                <div className="product-register__added-products">
                  {extraProducts.map((p) => (
                    <div
                      key={p.id}
                      className="product-register__added-product"
                    >
                      <span className="product-register__product-option-thumb" />
                      <span>{p.name}</span>
                      <button
                        onClick={() =>
                          setExtraProducts((prev) =>
                            prev.filter((x) => x.id !== p.id)
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
