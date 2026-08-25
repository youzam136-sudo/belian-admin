import "../styles/layout.css";

function Header({ title }: { title: string }) {
    return (
        <header className="admin-header">
            <h1>{title}</h1>

            <div className="admin-header-right">
                <span className="admin-header-user">관리자님</span>
                <button type="button">로그아웃</button>
            </div>
        </header>
    );
}

export default Header;
