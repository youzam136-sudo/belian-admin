import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/orderdetail.css";

interface Order {
  id: string;
  orderNo: string;
  orderDate: string;
  paymentStatus: string;
  productName: string;
  quantity: number;
  amount: number;
  buyerName: string;
  buyerPhone: string;
  shippingStatus: string;
}

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) {
    return (
      <div className="order-detail-page">
        <div className="order-detail__empty">
          <p>주문 정보를 찾을 수 없어요. 주문 목록에서 다시 들어와 주세요.</p>
          <button
            type="button"
            className="order-detail__btn order-detail__btn--outline"
            onClick={() => navigate("/orders")}
          >
            주문 목록으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <div className="order-detail__header">
        <button
          type="button"
          className="order-detail__back"
          onClick={() => navigate("/orders")}
        >
          ← 목록으로
        </button>
        <div className="order-detail__header-actions">
          <button
            type="button"
            className="order-detail__btn order-detail__btn--outline"
            onClick={() => navigate("/orders")}
          >
            목록으로
          </button>
        </div>
      </div>

      <div className="order-detail__card">
        <div className="order-detail__top">
          <div>
            <span className="order-detail__badge">{order.paymentStatus}</span>
            <h1 className="order-detail__orderno">{order.orderNo}</h1>
            <p className="order-detail__id">
              주문 번호(내부) {id ?? order.id} · 주문일 {order.orderDate}
            </p>
          </div>
          <span className="order-detail__shipping-badge">
            {order.shippingStatus}
          </span>
        </div>

        <div className="order-detail__section">
          <h3 className="order-detail__section-title">상품 정보</h3>
          <div className="order-detail__product">
            <span className="order-detail__product-thumb" />
            <div className="order-detail__product-info">
              <span className="order-detail__product-name">
                {order.productName}
              </span>
              <span className="order-detail__product-meta">
                수량 {order.quantity}개
              </span>
            </div>
            <span className="order-detail__product-amount">
              ₩{order.amount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="order-detail__grid">
          <div className="order-detail__row">
            <span className="order-detail__label">결제금액</span>
            <span className="order-detail__value">
              ₩{order.amount.toLocaleString()}
            </span>
          </div>
          <div className="order-detail__row">
            <span className="order-detail__label">결제상태</span>
            <span className="order-detail__value">{order.paymentStatus}</span>
          </div>
          <div className="order-detail__row">
            <span className="order-detail__label">주문자</span>
            <span className="order-detail__value">{order.buyerName}</span>
          </div>
          <div className="order-detail__row">
            <span className="order-detail__label">연락처</span>
            <span className="order-detail__value">{order.buyerPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
