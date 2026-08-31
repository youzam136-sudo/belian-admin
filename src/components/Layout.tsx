import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

const titleMap: Record<string, string> = {
    "/": "VELIAN",
    "/members": "회원 목록",
    "/members/staff": "운영진",
    "/members/settings": "고객 설정",
    "/products": "상품",
    "/orders": "주문",
    "/shipping": "배송",
    "/products/inquiries": "상품문의",
    "/products/reviews": "구매평",
    "/promotions/coupons": "쿠폰",
    "/promotions/points": "적립금",
    "/boards": "게시판",
    "/settings/general": "일반",
    "/settings/seo": "SEO",
    "/settings/terms": "약관",
    "/settings/payment": "전자결제",
    "/settings/security": "보안 개인정보보호",
};

function Layout() {
    const location = useLocation();
    const title = titleMap[location.pathname] ?? "VELIAN";

    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-main">
                <Header title={title} />

                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
