import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/layout.css";

const icons: Record<string, string> = {
    "대시보드": "▦",
    "회원 관리": "◉",
    "상품 관리": "◧",
    "재고 관리": "▤",
    "주문 관리": "▧",
    "결제 관리": "◈",
    "배송 관리": "▥",
    "관리자 관리": "⚙",
};

type MenuLeaf = {
    label: string;
    to: string;
};

type MenuItem =
    | ({ type: "link" } & MenuLeaf)
    | { type: "parent"; label: string; children: MenuLeaf[] };

type MenuGroup = {
    title: string;
    items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
    {
        title: "일반",
        items: [{ type: "link", label: "대시보드", to: "/" }],
    },
    {
        title: "고객",
        items: [
            {
                type: "parent",
                label: "회원 관리",
                children: [
                    { label: "회원 목록", to: "/members" },
                    { label: "운영진", to: "/members/staff" },
                    { label: "고객 설정", to: "/members/settings" },
                ],
            },
        ],
    },
    {
        title: "쇼핑",
        items: [
            { type: "link", label: "상품 관리", to: "/products" },
            { type: "link", label: "재고 관리", to: "/inventory" },
            { type: "link", label: "주문 관리", to: "/orders" },
            { type: "link", label: "결제 관리", to: "/payments" },
            { type: "link", label: "배송 관리", to: "/shipping" },
        ],
    },
    {
        title: "설정",
        items: [{ type: "link", label: "관리자 관리", to: "/admins" }],
    },
];

function Sidebar() {
    const location = useLocation();
    const [openParents, setOpenParents] = useState<Record<string, boolean>>({
        "회원 관리": location.pathname.startsWith("/members"),
    });

    const toggleParent = (label: string) => {
        setOpenParents((prev) => ({ ...prev, [label]: !prev[label] }));
    };

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

                        {group.items.map((item) => {
                            if (item.type === "link") {
                                return (
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
                                        <span className="admin-sidebar-icon">
                                            {icons[item.label]}
                                        </span>
                                        {item.label}
                                    </NavLink>
                                );
                            }

                            const isOpen = !!openParents[item.label];
                            const isChildActive = item.children.some(
                                (child) => location.pathname === child.to
                            );

                            return (
                                <div
                                    key={item.label}
                                    className="admin-sidebar-parent-wrap"
                                >
                                    <button
                                        type="button"
                                        className={
                                            isChildActive
                                                ? "admin-sidebar-link admin-sidebar-parent is-active"
                                                : "admin-sidebar-link admin-sidebar-parent"
                                        }
                                        onClick={() => toggleParent(item.label)}
                                    >
                                        <span className="admin-sidebar-icon">
                                            {icons[item.label]}
                                        </span>
                                        {item.label}
                                        <span
                                            className={
                                                isOpen
                                                    ? "admin-sidebar-caret up"
                                                    : "admin-sidebar-caret"
                                            }
                                        >
                                            ▾
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="admin-sidebar-submenu">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.to}
                                                    to={child.to}
                                                    end
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "admin-sidebar-sublink is-active"
                                                            : "admin-sidebar-sublink"
                                                    }
                                                >
                                                    {child.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
