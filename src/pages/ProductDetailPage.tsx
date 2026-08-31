import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/productdetail.css";

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

const STATUS_BADGE_CLASS: Record<ProductStatus, string> = {
  판매중: "product-detail__badge--active",
  품절: "product-detail__badge--soldout",
  숨김: "product-detail__badge--hidden",
};

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = (location.state as { product?: Product } | null)?.product;

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail__empty">
          <p>
            상품 정보를 찾을 수 없어요. 상품 목록에서 다시 들어와 주세요.
          </p>
          <button
            type="button"
            className="product-detail__btn product-detail__btn--outline"
            onClick={() => navigate("/products")}
          >
            상품 목록으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail__header">
        <button
          type="button"
          className="product-detail__back"
          onClick={() => navigate("/products")}
        >
          ← 목록으로
        </button>
        <div className="product-detail__header-actions">
          <button
            type="button"
            className="product-detail__btn product-detail__btn--outline"
            onClick={() => navigate("/products")}
          >
            목록으로
          </button>
          <button
            type="button"
            className="product-detail__btn product-detail__btn--primary"
            onClick={() =>
              navigate("/products/register", { state: { product } })
            }
          >
            수정
          </button>
        </div>
      </div>

      <div className="product-detail__card">
        <div className="product-detail__top">
          <div className="product-detail__thumb">{product.imageLabel}</div>
          <div className="product-detail__top-info">
            <span
              className={`product-detail__badge ${STATUS_BADGE_CLASS[product.status]}`}
            >
              {product.status}
            </span>
            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-detail__id">상품 번호 {id ?? product.id}</p>
            <p className="product-detail__price">
              ₩{product.price.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="product-detail__grid">
          <div className="product-detail__row">
            <span className="product-detail__label">즉시/기간 할인가</span>
            <span className="product-detail__value">
              {product.discountPrice}
            </span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">재고</span>
            <span className="product-detail__value">{product.stock}</span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">카테고리</span>
            <span className="product-detail__value">{product.category}</span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">기획전</span>
            <span className="product-detail__value">{product.promotion}</span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">등록일</span>
            <span className="product-detail__value">{product.createdAt}</span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">수정일</span>
            <span className="product-detail__value">{product.updatedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
