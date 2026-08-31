import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";
import { ExcelDownloadIcon } from "../components/icons/ExcelDownloadIcon";

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

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNo: "20260828-0000123",
    orderDate: "2026-08-28",
    paymentStatus: "결제완료",
    productName: "와인베리 퍼밍 콜라겐 젤리",
    quantity: 1,
    amount: 30000,
    buyerName: "김벨리",
    buyerPhone: "010-1234-5678",
    shippingStatus: "배송대기",
  },
];

const INITIAL_TABS = [
  { key: "전체", count: MOCK_ORDERS.length },
  { key: "결제대기", count: 0 },
  { key: "상품준비중", count: 0 },
  { key: "배송대기", count: 1 },
  { key: "배송중", count: 0 },
  { key: "배송완료", count: 0 },
  { key: "취소접수", count: 0 },
  { key: "반품접수", count: 0 },
];

const FILTER_CHIPS = [
  "기간",
  "결제수단",
  "할인수단",
  "구매금액",
  "주문품목수",
  "회원구분",
  "주문정보",
  "배송방식",
  "상품검색",
];

function OrdersPage() {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const [activeTab, setActiveTab] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editingTabName, setEditingTabName] = useState("");

  const filteredOrders = MOCK_ORDERS.filter((o) => {
    const matchesTab =
      activeTab === "전체" ? true : o.shippingStatus === activeTab;
    const keyword = searchKeyword.toLowerCase();
    const matchesKeyword =
      o.buyerName.toLowerCase().includes(keyword) ||
      o.buyerPhone.includes(keyword) ||
      o.orderNo.toLowerCase().includes(keyword);
    return matchesTab && matchesKeyword;
  });

  const closeMenus = () => {
    setIsSettingsOpen(false);
  };

  const isDefaultTab = activeTab === "전체";

  const handleAddTab = () => {
    let name = "새 탭";
    let suffix = 2;
    const existingKeys = new Set(tabs.map((t) => t.key));
    while (existingKeys.has(name)) {
      name = `새 탭 ${suffix}`;
      suffix += 1;
    }
    setTabs((prev) => [...prev, { key: name, count: 0 }]);
    setActiveTab(name);
  };

  const handleDuplicateTab = () => {
    const current = tabs.find((t) => t.key === activeTab);
    if (!current) return;
    let name = `${current.key} 사본`;
    let suffix = 2;
    const existingKeys = new Set(tabs.map((t) => t.key));
    while (existingKeys.has(name)) {
      name = `${current.key} 사본 ${suffix}`;
      suffix += 1;
    }
    setTabs((prev) => [...prev, { key: name, count: current.count }]);
    setActiveTab(name);
    closeMenus();
  };

  const startEditTab = () => {
    if (isDefaultTab) return;
    setEditingTabName(activeTab);
    setEditingTab(activeTab);
    setIsSettingsOpen(false);
  };

  const cancelEditTab = () => {
    setEditingTab(null);
    setEditingTabName("");
  };

  const saveEditTab = () => {
    const trimmed = editingTabName.trim();
    if (!editingTab || !trimmed) {
      cancelEditTab();
      return;
    }
    if (trimmed !== editingTab && tabs.some((t) => t.key === trimmed)) {
      window.alert("이미 사용 중인 탭 이름이에요.");
      return;
    }
    setTabs((prev) =>
      prev.map((t) => (t.key === editingTab ? { ...t, key: trimmed } : t))
    );
    setActiveTab(trimmed);
    cancelEditTab();
  };

  const handleDeleteTab = () => {
    if (isDefaultTab) return;
    const ok = window.confirm(`"${activeTab}" 탭을 삭제할까요?`);
    if (!ok) return;
    setTabs((prev) => prev.filter((t) => t.key !== activeTab));
    setActiveTab("전체");
    closeMenus();
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-section orders-page">
        <div className="orders-tabs">
          {tabs.map((tab) =>
            editingTab === tab.key ? (
              <div key={tab.key} className="orders-tab orders-tab--editing">
                <input
                  type="text"
                  className="orders-tab__edit-input"
                  value={editingTabName}
                  autoFocus
                  onChange={(e) => setEditingTabName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEditTab();
                    if (e.key === "Escape") cancelEditTab();
                  }}
                />
                <button
                  type="button"
                  className="orders-tab__edit-confirm"
                  onClick={saveEditTab}
                >
                  ✓
                </button>
                <button
                  type="button"
                  className="orders-tab__edit-cancel"
                  onClick={cancelEditTab}
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                key={tab.key}
                className={`orders-tab ${
                  activeTab === tab.key ? "orders-tab--active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.key} <span className="orders-tab__count">{tab.count}</span>
              </button>
            )
          )}
          <button
            type="button"
            className="orders-tab orders-tab--add"
            onClick={handleAddTab}
          >
            + 새 탭
          </button>
        </div>

        <div className="orders-main">
          <div className="orders-main__header">
            <h2 className="orders-main__title">
              {activeTab}{" "}
              <span className="orders-main__count">
                {filteredOrders.length}
              </span>
            </h2>

            <div className="orders-main__actions">
              <div className="orders-search">
                <input
                  type="text"
                  placeholder="이름, 아이디, 연락처, 주문번호, 송장번호"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <button className="orders-icon-btn">
                <ExcelDownloadIcon className="excel-download-icon" /> 엑셀 다운로드
              </button>
              <div className="orders-filter-wrap">
                <button
                  className={`orders-icon-btn ${
                    isFilterOpen ? "orders-icon-btn--active" : ""
                  }`}
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                >
                  ⚲
                </button>

                {isFilterOpen && (
                  <>
                    <div
                      className="orders-dropdown-overlay"
                      onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="orders-filter-panel">
                      <div className="orders-filter-panel__header">
                        <div className="orders-filter-panel__tabs">
                          <button className="orders-filter-panel__tab orders-filter-panel__tab--active">
                            기본 필터 <span>5/20</span>
                          </button>
                          <button className="orders-filter-panel__add">
                            + 새 필터
                          </button>
                        </div>
                        <button
                          className="orders-filter-panel__close"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          닫기
                        </button>
                      </div>
                      <div className="orders-filter-panel__chips">
                        {FILTER_CHIPS.map((chip) => (
                          <button key={chip} className="orders-filter-chip">
                            {chip} +
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="orders-settings-wrap">
                <button
                  className="orders-icon-btn"
                  onClick={() => setIsSettingsOpen((prev) => !prev)}
                >
                  ⚙
                </button>
                {isSettingsOpen && (
                  <>
                    <div
                      className="orders-dropdown-overlay"
                      onClick={closeMenus}
                    />
                    <div className="orders-settings-menu">
                      <button
                        className={`orders-settings-menu__item ${
                          !isDefaultTab
                            ? "orders-settings-menu__item--enabled"
                            : ""
                        }`}
                        disabled={isDefaultTab}
                        onClick={startEditTab}
                      >
                        탭 수정
                      </button>
                      <button
                        className="orders-settings-menu__item orders-settings-menu__item--enabled"
                        onClick={handleDuplicateTab}
                      >
                        탭 복제
                      </button>
                      <button
                        className={`orders-settings-menu__item ${
                          !isDefaultTab
                            ? "orders-settings-menu__item--enabled orders-settings-menu__item--danger"
                            : ""
                        }`}
                        disabled={isDefaultTab}
                        onClick={handleDeleteTab}
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <table className="orders-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>주문번호</th>
                <th>주문일</th>
                <th>결제상태</th>
                <th>상품정보</th>
                <th>수량</th>
                <th>결제금액</th>
                <th>주문자</th>
                <th>연락처</th>
                <th>배송상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="orders-table__empty">
                    조회된 주문이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td
                      className="orders-table__orderno-cell"
                      onClick={() =>
                        navigate(`/orders/${order.id}`, {
                          state: { order },
                        })
                      }
                    >
                      {order.orderNo}
                    </td>
                    <td>{order.orderDate}</td>
                    <td>
                      <span className="orders-badge orders-badge--paid">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="orders-table__product-cell">
                      <span className="orders-table__thumb" />
                      {order.productName}
                    </td>
                    <td>{order.quantity}</td>
                    <td>₩{order.amount.toLocaleString()}</td>
                    <td>{order.buyerName}</td>
                    <td>{order.buyerPhone}</td>
                    <td>
                      <span className="orders-badge orders-badge--pending">
                        {order.shippingStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default OrdersPage;
