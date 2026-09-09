import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/productregister.css";
import { upsertProduct, type ProductStatus } from "../utils/productsStore";
import { SearchIcon } from "../components/icons/SearchIcon";

interface EditableProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  status?: ProductStatus;
  regularPrice?: number;
  summary?: string;
  description?: string;
  origin?: string;
  manufacturer?: string;
  brand?: string;
  imageDataUrl?: string;
  scheduledAt?: string;
  approvalRequired?: boolean;
}

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
  const location = useLocation();
  const editProduct = (location.state as { product?: EditableProduct } | null)
    ?.product;
  const isEditMode = Boolean(editProduct);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState("info");

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    editProduct?.imageDataUrl ?? null
  );
  const [productName, setProductName] = useState(editProduct?.name ?? "");
  const [category, setCategory] = useState(
    editProduct?.category && editProduct.category !== "미지정"
      ? editProduct.category
      : ""
  );
  const [productPrice, setProductPrice] = useState<number | "">(
    editProduct?.price ?? ""
  );
  const [regularPrice, setRegularPrice] = useState<number | "">(
    editProduct?.regularPrice ?? ""
  );
  const [summaryDescription, setSummaryDescription] = useState(
    editProduct?.summary ?? ""
  );
  const [description, setDescription] = useState(
    editProduct?.description ?? ""
  );
  const [origin, setOrigin] = useState(editProduct?.origin ?? "");
  const [manufacturer, setManufacturer] = useState(
    editProduct?.manufacturer ?? ""
  );
  const [brand, setBrand] = useState(editProduct?.brand ?? "");
  const [shippingNote, setShippingNote] = useState("");
  const [shippingNoteEnabled, setShippingNoteEnabled] = useState(false);

  const [gradeDiscount, setGradeDiscount] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(true);

  const [productWeight, setProductWeight] = useState(1);
  const [shippingTemplateMode, setShippingTemplateMode] = useState
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
    editProduct?.status && ["판매중", "품절", "숨김"].includes(editProduct.status)
      ? (editProduct.status as "판매중" | "품절" | "숨김")
      : "판매중"
  );
  const [salePeriodEnabled, setSalePeriodEnabled] = useState(false);

  // ===== 게시 예약 / 승인 후 게시 =====
  const [scheduledPublishEnabled, setScheduledPublishEnabled] = useState(
    Boolean(editProduct?.scheduledAt)
  );
  const [scheduledDate, setScheduledDate] = useState(
    editProduct?.scheduledAt ? editProduct.scheduledAt.slice(0, 10) : ""
  );
  const [scheduledTime, setScheduledTime] = useState(
    editProduct?.scheduledAt ? editProduct.scheduledAt.slice(11, 16) : ""
  );
  const [approvalRequired, setApprovalRequired] = useState(
    Boolean(editProduct?.approvalRequired)
  );

  const MOCK_SEARCH_PRODUCTS = [
    { id: 1, name: "벨리안 대표 상품" },
    { id: 2, name: "와일드 씨드 퍼밍 로션 200ml" },
    { id: 3, name: "와인베리 퍼밍 콜라겐 젤리" },
  ];

  const [relatedQuery, setRelatedQuery] = useState("");
  const [relatedDropdownOpen, setRelatedDropdownOpen] = useState(false);
  const [relatedCheckedIds, setRelatedCheckedIds] = useState<number[]>([]);
  const [relatedProducts, setRelatedProducts] = useState
    { id: number; name: string }[]
  >([]);

  const [extraQuery, setExtraQuery] = useState("");
  const [extraDropdownOpen, setExtraDropdownOpen] = useState(false);
  const [extraCheckedIds, setExtraCheckedIds] = useState<number[]>([]);
  const [extraProducts, setExtraProducts] = useState
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
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleComplete = () => {
    const scheduledAt =
      scheduledPublishEnabled && scheduledDate && scheduledTime
        ? `${scheduledDate}T${scheduledTime}`
        : undefined;

    upsertProduct({
      id: editProduct?.id,
      name: productName,
      price: typeof productPrice === "number" ? productPrice : 0,
      category,
      status: saleStatus,
      regularPrice: typeof regularPrice === "number" ? regularPrice : undefined,
      summary: summaryDescription,
      description,
      origin,
      manufacturer,
      brand,
      imageDataUrl: imagePreviewUrl ?? undefined,
      scheduledAt,
      approvalRequired,
    });
    setIsCompleteModalOpen(true);
  };

  const goToProductList = () => {
    setIsCompleteModalOpen(false);
    navigate("/products");
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
          <h2 className="product-register__title">
            {isEditMode ? "상품 수정" : "상품 등록"}
          </h2>
          <button
            className="product-register__complete-btn"
            onClick={handleComplete}
          >
            {isEditMode ? "수정 완료" : "상품 등록 완료"}
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
                  value={summaryDescription}
                  onChange={(e) => setSummaryDescription(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                      value={productPrice}
                      onChange={(e) =>
                        setProductPrice(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
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
                      value={regularPrice}
                      onChange={(e) =>
                        setRegularPrice(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
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
