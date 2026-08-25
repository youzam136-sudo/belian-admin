import { NavLink } from "react-router-dom";
import "../styles/layout.css";

const menuGroups = [
    {
        title: "일반",
        items: [{ label: "대시보드", to: "/" }],
    },
    {
        title: "고객",
        items: [{ label: "회원 관리", to: "/members" }],
    },
    {
        title: "쇼핑",
        items: [
            { label: "상품 관리", to: "/products" },
            { label: "재고 관리", to: "/inventory" },
            { label: "주문 관리", to: "/orders" },
            { label: "결제 관리", to: "/payments" },
            { label: "배송 관리", to: "/shipping" },
        ],
    },
    {
        title: "설정",
        items: [{ label: "관리자 관리", to: "/admins" }],
    },
];

function Sidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-logo">
                BELIAN <span>Admin</span>
            </div>

            <nav className="admin-sidebar-nav">
                {menuGroups.map((group) => (
                    <div className="admin-sidebar-group" key={group.title}>
                        <span className="admin-sidebar-group-title">
                            {group.title}
                        </span>

                        {group.items.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "admin-sidebar-link is-active"
                                        : "admin-sidebar-link"
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
