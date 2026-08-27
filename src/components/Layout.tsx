import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

const titleMap: Record<string, string> = {
    "/": "BELIAN",
    "/members": "회원 목록",
    "/members/staff": "운영진",
    "/members/behavior": "고객 행동 관리",
    "/members/settings": "고객 설정",
    "/members/support": "고객 상담 채널",
    "/products": "상품 관리",
    "/inventory": "재고 관리",
    "/orders": "주문 관리",
    "/payments": "결제 관리",
    "/shipping": "배송 관리",
    "/admins": "관리자 관리",
};

function Layout() {
    const location = useLocation();
    const title = titleMap[location.pathname] ?? "BELIAN";

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
