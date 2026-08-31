import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/layout.css";
import {
    DashboardIcon,
    MembersIcon,
    ProductsIcon,
    OrdersIcon,
    ShippingIcon,
    InquiriesIcon,
    ReviewsIcon,
    CouponsIcon,
    PointsIcon,
    BoardIcon,
    GeneralIcon,
    SeoIcon,
    TermsIcon,
    PaymentIcon,
} from "./icons/SidebarIcons";

const svgIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "대시보드": DashboardIcon,
    "회원 관리": MembersIcon,
    "상품": ProductsIcon,
    "주문": OrdersIcon,
    "배송": ShippingIcon,
    "상품문의": InquiriesIcon,
    "구매평": ReviewsIcon,
    "쿠폰": CouponsIcon,
    "적립금": PointsIcon,
    "게시판": BoardIcon,
    "일반": GeneralIcon,
    "SEO": SeoIcon,
    "약관": TermsIcon,
    "전자결제": PaymentIcon,
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
            { type: "link", label: "상품", to: "/products" },
            { type: "link", label: "주문", to: "/orders" },
            { type: "link", label: "배송", to: "/shipping" },
            { type: "link", label: "상품문의", to: "/products/inquiries" },
            { type: "link", label: "구매평", to: "/products/reviews" },
        ],
    },
    {
        title: "프로모션",
        items: [
            { type: "link", label: "쿠폰", to: "/promotions/coupons" },
            { type: "link", label: "적립금", to: "/promotions/points" },
        ],
    },
    {
        title: "게시판 관리",
        items: [{ type: "link", label: "게시판", to: "/boards" }],
    },
    {
        title: "설정",
        items: [
            { type: "link", label: "일반", to: "/settings/general" },
            { type: "link", label: "SEO", to: "/settings/seo" },
            { type: "link", label: "약관", to: "/settings/terms" },
            { type: "link", label: "전자결제", to: "/settings/payment" },
        ],
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

    const renderIcon = (label: string) => {
        const SvgIcon = svgIcons[label];
        if (SvgIcon) {
            return <SvgIcon className="admin-sidebar-icon-svg" />;
        }
        return null;
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
                                            {renderIcon(item.label)}
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
                                            {renderIcon(item.label)}
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
