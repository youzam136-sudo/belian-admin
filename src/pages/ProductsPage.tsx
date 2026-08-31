import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/products.css";

type ProductStatus = "판매중" | "품절" | "숨김";

interface Product {
  id: number;
  name: string;
  imageLabel: string;
  price: number;
  discountPrice: string;
  status: ProductStatus;
  stock: string;
  category: string;
  promotion: string;
  createdAt: string;
  updatedAt: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "와인베리 퍼밍 콜라겐 젤리",
    imageLabel: "IMG",
    price: 30000,
    discountPrice: "-",
    status: "판매중",
    stock: "-",
    category: "미지정",
    promotion: "Belian",
    createdAt: "2026-08-21",
    updatedAt: "2026-08-28",
  },
];

const STATUS_OPTIONS: ProductStatus[] = ["판매중", "품절", "숨김"];

function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [statusFilter, setStatusFilter] = useState<"전체" | ProductStatus>(
    "전체"
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sidebarTab, setSidebarTab] = useState<"category" | "promotion">(
    "category"
  );

  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("전체 카테고리");

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryPermission, setCategoryPermission] = useState("모든 사용자");

  const [statusMenuOpenId, setStatusMenuOpenId] = useState<number | null>(
    null
  );
  const [moreMenuOpenId, setMoreMenuOpenId] = useState<number | null>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState<string | null>(
    null
  );

  const counts = {
    전체: products.length,
    판매중: products.filter((p) => p.status === "판매중").length,
    품절: products.filter((p) => p.status === "품절").length,
    숨김: products.filter((p) => p.status === "숨김").length,
  };

  const filteredProducts = products.filter((p) => {
    const matchesStatus =
      statusFilter === "전체" ? true : p.status === statusFilter;
    const matchesKeyword = p.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return matchesStatus && matchesKeyword;
  });

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredProducts.map((p) => p.id) : []);
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setCategoryName("");
    setCategoryPermission("모든 사용자");
  };

  const addCategory = () => {
    const trimmed = categoryName.trim();
    if (trimmed === "") return;
    setCategories((prev) => [...prev, trimmed]);
    setActiveCategory(trimmed);
    closeCategoryModal();
  };

  const closeAllMenus = () => {
    setStatusMenuOpenId(null);
    setMoreMenuOpenId(null);
    setCategoryMenuOpen(null);
  };

  const deleteCategory = (cat: string) => {
    setCategories((prev) => prev.filter((c) => c !== cat));
    if (activeCategory === cat) {
      setActiveCategory("전체 카테고리");
    }
    setCategoryMenuOpen(null);
  };

  const updateProductStatus = (id: number, status: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    setStatusMenuOpenId(null);
  };

  const moreMenuActions = [
    ["복제", "삭제", "진열 설정"],
    ["맨 위로", "위로", "아래로", "맨 아래로"],
  ];

  return (
    <div className="dashboard-page">
      <section className="dashboard-section products-page">
        <div className="products-page__header">
          <h2 className="products-page__title">상품</h2>
          <div className="products-page__header-actions">
            <button className="products-btn">상품 일괄 등록 및 수정</button>
            <button
              className="products-btn products-btn--primary"
              onClick={() => navigate("/products/register")}
            >
              상품 등록
            </button>
          </div>
        </div>

        <div className="products-page__body">
          <aside className="products-sidebar">
            <div className="products-sidebar__tabs">
              <button
                className={`products-sidebar__tab ${
                  sidebarTab === "category"
                    ? "products-sidebar__tab--active"
                    : ""
                }`}
                onClick={() => setSidebarTab("category")}
              >
                카테고리
              </button>
              <button
                className={`products-sidebar__tab ${
                  sidebarTab === "promotion"
                    ? "products-sidebar__tab--active"
                    : ""
                }`}
                onClick={() => setSidebarTab("promotion")}
              >
                기획전
              </button>
              <button
                className="products-sidebar__tab products-sidebar__tab--link"
                onClick={() => setIsCategoryModalOpen(true)}
              >
                추가
              </button>
            </div>

            {sidebarTab === "category" &&
              (categories.length === 0 ? (
                <div className="products-sidebar__empty">
                  <div className="products-sidebar__empty-icon">📄</div>
                  <p className="products-sidebar__empty-title">
                    아직 카테고리가 없어요
                  </p>
                  <p className="products-sidebar__empty-desc">
                    상품을 체계적으로 관리하려면 카테고리를 만들어 보세요.
                  </p>
                  <button
                    className="products-btn"
                    onClick={() => setIsCategoryModalOpen(true)}
                  >
                    카테고리 추가
                  </button>
                </div>
              ) : (
                <div className="products-category-list">
                  <button
                    className={`products-category-list__item products-category-list__item--all ${
                      activeCategory === "전체 카테고리"
                        ? "products-category-list__item--active"
                        : ""
                    }`}
                    onClick={() => setActiveCategory("전체 카테고리")}
                  >
                    전체 카테고리
                  </button>
                  {categories.map((cat) => (
                    <div key={cat} className="products-category-row">
                      <button
                        className={`products-category-list__item ${
                          activeCategory === cat
                            ? "products-category-list__item--active"
                            : ""
                        }`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat}
                      </button>
                      <button
                        className="products-category-row__more"
                        onClick={() =>
                          setCategoryMenuOpen(
                            categoryMenuOpen === cat ? null : cat
                          )
                        }
                      >
                        ⋮
                      </button>
                      {categoryMenuOpen === cat && (
                        <>
                          <div
                            className="products-dropdown-overlay"
                            onClick={closeAllMenus}
                          />
                          <div className="products-category-menu">
                            <button
                              className="products-category-menu__item"
                              onClick={() => setCategoryMenuOpen(null)}
                            >
                              편집
                            </button>
                            <button
                              className="products-category-menu__item products-category-menu__item--danger"
                              onClick={() => deleteCategory(cat)}
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}

            {sidebarTab === "promotion" && (
              <div className="products-sidebar__empty">
                <p className="products-sidebar__empty-desc">
                  등록된 기획전이 없습니다.
                </p>
              </div>
            )}
          </aside>

          <div className="products-main">
            <div className="products-main__status-tabs">
              <button
                className={`products-status-tab ${
                  statusFilter === "전체" ? "products-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("전체")}
              >
                전체{" "}
                <span className="products-status-tab__count">
                  {counts.전체}
                </span>
              </button>
              <button
                className={`products-status-tab ${
                  statusFilter === "판매중"
                    ? "products-status-tab--active"
                    : ""
                }`}
                onClick={() => setStatusFilter("판매중")}
              >
                판매중{" "}
                <span className="products-status-tab__count">
                  {counts.판매중}
                </span>
              </button>
              <button
                className={`products-status-tab ${
                  statusFilter === "품절" ? "products-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("품절")}
              >
                품절{" "}
                <span className="products-status-tab__count">
                  {counts.품절}
                </span>
              </button>
              <button
                className={`products-status-tab ${
                  statusFilter === "숨김" ? "products-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("숨김")}
              >
                숨김{" "}
                <span className="products-status-tab__count">
                  {counts.숨김}
                </span>
              </button>
            </div>

            <div className="products-main__toolbar">
              <select className="products-select">
                <option>기본</option>
              </select>
              <div className="products-search">
                <input
                  type="text"
                  placeholder="상품명, 상품 재고번호, 자체 상품 코드로 검색해 보세요."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <button className="products-btn products-btn--primary">
                검색
              </button>
              <button className="products-btn">⬇ 엑셀 다운로드</button>
            </div>

            <table className="products-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        selectedIds.length === filteredProducts.length
                      }
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th>상품 번호</th>
                  <th>상품명</th>
                  <th>판매가</th>
                  <th>즉시/기간 할인가</th>
                  <th>상태</th>
                  <th>재고</th>
                  <th>카테고리</th>
                  <th>기획전</th>
                  <th>등록일</th>
                  <th>수정일</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="products-table__empty">
                      등록된 상품이 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelectOne(product.id)}
                        />
                      </td>
                      <td>{product.id}</td>
                      <td
                        className="products-table__name-cell products-table__name-cell--clickable"
                        onClick={() =>
                          navigate(`/products/${product.id}`, {
                            state: { product },
                          })
                        }
                      >
                        <span className="products-table__thumb">
                          {product.imageLabel}
                        </span>
                        <span>{product.name}</span>
                        <span className="products-table__link">↗</span>
                      </td>
                      <td>₩{product.price.toLocaleString()}</td>
                      <td>{product.discountPrice}</td>
                      <td className="products-table__status-cell">
                        <button
                          className="products-status-trigger"
                          onClick={() =>
                            setStatusMenuOpenId(
                              statusMenuOpenId === product.id
                                ? null
                                : product.id
                            )
                          }
                        >
                          {product.status}{" "}
                          <span className="products-status-trigger__arrow">
                            {statusMenuOpenId === product.id ? "︿" : "﹀"}
                          </span>
                        </button>

                        {statusMenuOpenId === product.id && (
                          <>
                            <div
                              className="products-dropdown-overlay"
                              onClick={closeAllMenus}
                            />
                            <div className="products-status-menu">
                              {STATUS_OPTIONS.map((option) => (
                                <button
                                  key={option}
                                  className={`products-status-menu__item ${
                                    product.status === option
                                      ? "products-status-menu__item--active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    updateProductStatus(product.id, option)
                                  }
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                      <td>{product.stock}</td>
                      <td>{product.category}</td>
                      <td>{product.promotion}</td>
                      <td>{product.createdAt}</td>
                      <td>{product.updatedAt}</td>
                      <td className="products-table__more-cell">
                        <button
                          className="products-table__more"
                          onClick={() =>
                            setMoreMenuOpenId(
                              moreMenuOpenId === product.id ? null : product.id
                            )
                          }
                        >
                          ⋮
                        </button>

                        {moreMenuOpenId === product.id && (
                          <>
                            <div
                              className="products-dropdown-overlay"
                              onClick={closeAllMenus}
                            />
                            <div className="products-more-menu">
                              {moreMenuActions.map((group, i) => (
                                <div
                                  key={i}
                                  className="products-more-menu__group"
                                >
                                  {group.map((action) => (
                                    <button
                                      key={action}
                                      className="products-more-menu__item"
                                      onClick={closeAllMenus}
                                    >
                                      {action}
                                    </button>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="products-pagination">
              <button className="products-pagination__arrow">‹</button>
              <button className="products-pagination__page products-pagination__page--active">
                1
              </button>
              <button className="products-pagination__arrow">›</button>

              <select className="products-select products-select--right">
                <option>50개씩 보기</option>
                <option>100개씩 보기</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {isCategoryModalOpen && (
        <div className="products-modal-overlay" onClick={closeCategoryModal}>
          <div
            className="products-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="products-modal__header">
              <h3 className="products-modal__title">카테고리 추가</h3>
            </div>

            <div className="products-modal__body">
              <div className="products-modal__field">
                <label className="products-modal__label">카테고리 이름</label>
                <input
                  type="text"
                  className="products-modal__input"
                  placeholder="카테고리명을 입력해주세요"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              <div className="products-modal__field">
                <label className="products-modal__label">
                  판매가 표시 및 구매 권한
                </label>
                <select
                  className="products-modal__select"
                  value={categoryPermission}
                  onChange={(e) => setCategoryPermission(e.target.value)}
                >
                  <option>모든 사용자</option>
                  <option>회원만</option>
                  <option>특정 그룹</option>
                </select>
              </div>

              <div className="products-modal__notice">
                디자인 모드의 쇼핑 위젯 설정에서 카테고리를 선택하면 해당
                카테고리에 포함된 하위 카테고리는 자동 생성됩니다.
                <br />
                이 때 자동 생성된 메뉴명은 카테고리명이 사용됩니다.
              </div>
            </div>

            <div className="products-modal__footer">
              <button
                className="products-modal__btn"
                onClick={closeCategoryModal}
              >
                취소
              </button>
              <button
                className="products-modal__btn products-modal__btn--primary"
                disabled={categoryName.trim() === ""}
                onClick={addCategory}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
