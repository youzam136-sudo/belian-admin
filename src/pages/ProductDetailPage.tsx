import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/productdetail.css";
import { getProducts, type StoredProduct as Product } from "../utils/productsStore";

type ProductStatus = Product["status"];

const STATUS_BADGE_CLASS: Record<ProductStatus, string> = {
  판매중: "product-detail__badge--active",
  품절: "product-detail__badge--soldout",
  숨김: "product-detail__badge--hidden",
};

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stateProduct = (location.state as { product?: Product } | null)
    ?.product;
  const product =
    stateProduct ?? getProducts().find((p) => String(p.id) === id);

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
          <div className="product-detail__thumb">
            {product.imageDataUrl ? (
              <img
                src={product.imageDataUrl}
                alt={product.name}
                className="product-detail__thumb-img"
              />
            ) : (
              product.imageLabel
            )}
          </div>
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
              {typeof product.regularPrice === "number" &&
                product.regularPrice > 0 && (
                  <span className="product-detail__regular-price">
                    ₩{product.regularPrice.toLocaleString()}
                  </span>
                )}
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
            <span className="product-detail__label">원산지</span>
            <span className="product-detail__value">
              {product.origin || "-"}
            </span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">제조사</span>
            <span className="product-detail__value">
              {product.manufacturer || "-"}
            </span>
          </div>
          <div className="product-detail__row">
            <span className="product-detail__label">브랜드</span>
            <span className="product-detail__value">
              {product.brand || "-"}
            </span>
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

        {product.summary && (
          <div className="product-detail__text-section">
            <h3 className="product-detail__text-title">요약 설명</h3>
            <p className="product-detail__text-body">{product.summary}</p>
          </div>
        )}

        {product.description && (
          <div className="product-detail__text-section">
            <h3 className="product-detail__text-title">상품 상세 설명</h3>
            <p className="product-detail__text-body">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
