import { Outlet, useMatches } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

function Layout() {
    const matches = useMatches();
    const current = matches[matches.length - 1];
    const title = (current?.handle as { title?: string } | undefined)?.title ?? "대시보드";

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
