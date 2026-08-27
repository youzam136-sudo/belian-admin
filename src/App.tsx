import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import MembersPage from "./pages/MembersPage";
import StaffPage from "./pages/StaffPage";
import MemberBehaviorPage from "./pages/MemberBehaviorPage";
import MemberSettingsPage from "./pages/MemberSettingsPage";
import MemberSupportPage from "./pages/MemberSupportPage";
import ProductsPage from "./pages/ProductsPage";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentsPage from "./pages/PaymentsPage";
import ShippingPage from "./pages/ShippingPage";
import AdminsPage from "./pages/AdminsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        index
                        element={<DashboardPage />}
                        handle={{ title: "대시보드" }}
                    />

                    <Route
                        path="members"
                        element={<MembersPage />}
                        handle={{ title: "회원 목록" }}
                    />

                    <Route
                        path="members/staff"
                        element={<StaffPage />}
                        handle={{ title: "운영진" }}
                    />

                    <Route
                        path="members/behavior"
                        element={<MemberBehaviorPage />}
                        handle={{ title: "고객 행동 관리" }}
                    />

                    <Route
                        path="members/settings"
                        element={<MemberSettingsPage />}
                        handle={{ title: "고객 설정" }}
                    />

                    <Route
                        path="members/support"
                        element={<MemberSupportPage />}
                        handle={{ title: "고객 상담 채널" }}
                    />

                    <Route
                        path="products"
                        element={<ProductsPage />}
                        handle={{ title: "상품 관리" }}
                    />

                    <Route
                        path="inventory"
                        element={<InventoryPage />}
                        handle={{ title: "재고 관리" }}
                    />

                    <Route
                        path="orders"
                        element={<OrdersPage />}
                        handle={{ title: "주문 관리" }}
                    />

                    <Route
                        path="payments"
                        element={<PaymentsPage />}
                        handle={{ title: "결제 관리" }}
                    />

                    <Route
                        path="shipping"
                        element={<ShippingPage />}
                        handle={{ title: "배송 관리" }}
                    />

                    <Route
                        path="admins"
                        element={<AdminsPage />}
                        handle={{ title: "관리자 관리" }}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
