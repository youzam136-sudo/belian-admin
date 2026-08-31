import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import MembersPage from "./pages/MembersPage";
import StaffPage from "./pages/StaffPage";
import MemberSettingsPage from "./pages/MemberSettingsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductRegisterPage from "./pages/ProductRegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrdersPage from "./pages/OrdersPage";
import ShippingPage from "./pages/ShippingPage";
import ProductInquiriesPage from "./pages/ProductInquiriesPage";
import ReviewsPage from "./pages/ReviewsPage";
import CouponsPage from "./pages/CouponsPage";
import CouponCreatePage from "./pages/CouponCreatePage";
import PointsPage from "./pages/PointsPage";
import BoardPage from "./pages/BoardPage";
import GeneralSettingsPage from "./pages/GeneralSettingsPage";
import SeoSettingsPage from "./pages/SeoSettingsPage";
import TermsSettingsPage from "./pages/TermsSettingsPage";
import PaymentSettingsPage from "./pages/PaymentSettingsPage";
import SecuritySettingsPage from "./pages/SecuritySettingsPage";

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
                        path="members/settings"
                        element={<MemberSettingsPage />}
                        handle={{ title: "고객 설정" }}
                    />

                    <Route
                        path="products"
                        element={<ProductsPage />}
                        handle={{ title: "상품" }}
                    />
                    <Route
                        path="products/register"
                        element={<ProductRegisterPage />}
                        handle={{ title: "상품 등록" }}
                    />
                    <Route
                        path="products/:id"
                        element={<ProductDetailPage />}
                        handle={{ title: "상품 상세" }}
                    />
                    <Route
                        path="orders"
                        element={<OrdersPage />}
                        handle={{ title: "주문" }}
                    />
                    <Route
                        path="shipping"
                        element={<ShippingPage />}
                        handle={{ title: "배송" }}
                    />
                    <Route
                        path="products/inquiries"
                        element={<ProductInquiriesPage />}
                        handle={{ title: "상품문의" }}
                    />
                    <Route
                        path="products/reviews"
                        element={<ReviewsPage />}
                        handle={{ title: "구매평" }}
                    />

                    <Route
                        path="promotions/coupons"
                        element={<CouponsPage />}
                        handle={{ title: "쿠폰" }}
                    />
                    <Route
                        path="promotions/coupons/new"
                        element={<CouponCreatePage />}
                        handle={{ title: "쿠폰 만들기" }}
                    />
                    <Route
                        path="promotions/coupons/edit/:id"
                        element={<CouponCreatePage />}
                        handle={{ title: "쿠폰 수정" }}
                    />
                    <Route
                        path="promotions/points"
                        element={<PointsPage />}
                        handle={{ title: "적립금" }}
                    />

                    <Route
                        path="boards"
                        element={<BoardPage />}
                        handle={{ title: "게시판" }}
                    />

                    <Route
                        path="settings/general"
                        element={<GeneralSettingsPage />}
                        handle={{ title: "일반" }}
                    />
                    <Route
                        path="settings/seo"
                        element={<SeoSettingsPage />}
                        handle={{ title: "SEO" }}
                    />
                    <Route
                        path="settings/terms"
                        element={<TermsSettingsPage />}
                        handle={{ title: "약관" }}
                    />
                    <Route
                        path="settings/payment"
                        element={<PaymentSettingsPage />}
                        handle={{ title: "전자결제" }}
                    />
                    <Route
                        path="settings/security"
                        element={<SecuritySettingsPage />}
                        handle={{ title: "보안 개인정보보호" }}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
