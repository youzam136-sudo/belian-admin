import { useState } from "react";
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

const MOCK_PRODUCTS: Product[] = [
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

function ProductsPage() {
  const [statusFilter, setStatusFilter] = useState<"전체" | ProductStatus>(
    "전체"
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isCategoryTab, setIsCategoryTab] = useState<
    "category" | "promotion" | "add"
  >("category");

  const counts = {
    전체: MOCK_PRODUCTS.length,
    판매중: MOCK_PRODUCTS.filter((p) => p.status === "판매중").length,
    품절: MOCK_PRODUCTS.filter((p) => p.status === "품절").length,
    숨김: MOCK_PRODUCTS.filter((p) => p.status === "숨김").length,
  };

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
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

  return (
    <div className="dashboard-page">
      <section className="dashboard-section products-page">
        <div className="products-page__header">
          <h2 className="products-page__title">상품</h2>
          <div className="products-page__header-actions">
            <button className="products-btn">상품 일괄 등록 및 수정</button>
            <button className="products-btn products-btn--primary">
              상품 등록
            </button>
          </div>
        </div>

        <div className="products-page__body">
          <aside className="products-sidebar">
            <div className="products-sidebar__tabs">
              <button
                className={`products-sidebar__tab ${
                  isCategoryTab === "category"
                    ? "products-sidebar__tab--active"
                    : ""
                }`}
                onClick={() => setIsCategoryTab("category")}
              >
                카테고리
              </button>
              <button
                className={`products-sidebar__tab ${
                  isCategoryTab === "promotion"
                    ? "products-sidebar__tab--active"
                    : ""
                }`}
                onClick={() => setIsCategoryTab("promotion")}
              >
                기획전
              </button>
              <button
                className={`products-sidebar__tab ${
                  isCategoryTab === "add" ? "products-sidebar__tab--active" : ""
                }`}
                onClick={() => setIsCategoryTab("add")}
              >
                추가
              </button>
            </div>

            <div className="products-sidebar__empty">
              <div className="products-sidebar__empty-icon">📄</div>
              <p className="products-sidebar__empty-title">
                아직 카테고리가 없어요
              </p>
              <p className="products-sidebar__empty-desc">
                상품을 체계적으로 관리하려면 카테고리를 만들어 보세요.
              </p>
              <button className="products-btn">카테고리 추가</button>
            </div>
          </aside>

          <div className="products-main">
            <div className="products-main__status-tabs">
              <button
                className={`products-status-tab ${
                  statusFilter === "전체" ? "products-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("전체")}
              >
                전체 <span className="products-status-tab__count">{counts.전체}</span>
              </button>
              <button
                className={`products-status-tab ${
                  statusFilter === "판매중"
                    ? "products-status-tab--active"
                    : ""
                }`}
                onClick={() => setStatusFilter("판매중")}
              >
                판매중 <span className="products-status-tab__count">{counts.판매중}</span>
              </button>
              <button
                className={`products-status-tab ${
                  statusFilter === "품절" ? "products-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("품절")}
              >
                품절 <span className="products-status-tab__count">{counts.품절}</span>
              </button>
              <button
                className={`products-status-tab ${
                  statusFilter === "숨김" ? "products-status-tab--active" : ""
                }`}
                onClick={() => setStatusFilter("숨김")}
              >
                숨김 <span className="products-status-tab__count">{counts.숨김}</span>
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
                      <td className="products-table__name-cell">
                        <span className="products-table__thumb">
                          {product.imageLabel}
                        </span>
                        <span>{product.name}</span>
                        <span className="products-table__link">↗</span>
                      </td>
                      <td>₩{product.price.toLocaleString()}</td>
                      <td>{product.discountPrice}</td>
                      <td>
                        <select className="products-status-select" defaultValue={product.status}>
                          <option>판매중</option>
                          <option>품절</option>
                          <option>숨김</option>
                        </select>
                      </td>
                      <td>{product.stock}</td>
                      <td>{product.category}</td>
                      <td>{product.promotion}</td>
                      <td>{product.createdAt}</td>
                      <td>{product.updatedAt}</td>
                      <td className="products-table__more">⋮</td>
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
    </div>
  );
}

export default ProductsPage;
